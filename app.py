from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import io
import base64

app = Flask(__name__)

# Model path
model_path = "model_float16.tflite"

def create_interpreter():
    """Create a fresh interpreter instance to avoid memory reference issues"""
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter

# Alphabet for decoding
alphabet = "0123456789abcdefghijklmnopqrstuvwxyz."
blank_index = len(alphabet)

def preprocess_image(img_bytes):
    # Convert bytes to PIL Image
    image = Image.open(io.BytesIO(img_bytes)).convert('L')  # grayscale
    image = np.array(image, dtype=np.float32)  # Direct float32 conversion
    # Resize to model input (already done on frontend, but ensure correct size)
    if image.shape != (31, 200):
        img_resized = cv2.resize(image, (200, 31))
    else:
        img_resized = image
    img_resized = img_resized.astype('float32') / 255.0
    inp = np.expand_dims(img_resized, axis=(0,-1))  # [1,31,200,1]
    return inp

def decode_result(result):
    output_array = result[0]
    if output_array.ndim == 2:
        pred_indices = np.argmax(output_array, axis=-1)
    else:
        pred_indices = output_array.astype(int)
    
    # CTC decoding: remove consecutive duplicates and blanks
    decoded_chars = []
    prev_char = None
    
    for i in pred_indices:
        if i < len(alphabet):  # Valid character index
            char = alphabet[i]
            # Only add if it's different from previous character (CTC rule)
            if char != prev_char and char != '.':  # Skip dots and duplicates
                decoded_chars.append(char)
            prev_char = char
    
    # Join and clean up the result
    text = "".join(decoded_chars)
    
    # Remove excessive dots and clean up
    text = text.replace('..', '.')  # Replace double dots with single
    text = text.strip('.')  # Remove leading/trailing dots
    
    return text if text else "-"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        # Extract base64 image
        img_base64 = data['image'].split(",")[1]
        img_bytes = base64.b64decode(img_base64)
        inp = preprocess_image(img_bytes)
        
        # Create fresh interpreter instance to avoid reference issues
        interpreter = create_interpreter()
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        # Run inference
        interpreter.set_tensor(input_details[0]['index'], inp)
        interpreter.invoke()
        
        # Get result and copy immediately
        result = interpreter.get_tensor(output_details[0]['index']).copy()
        
        # Clean up interpreter
        del interpreter
        
        text = decode_result(result)
        return jsonify({"text": text})
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"text": "Error processing image"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
