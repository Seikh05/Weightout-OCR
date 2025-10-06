"# Weighout OCR - 7-Segment Display Reader

A real-time OCR web application for reading 7-segment displays using TensorFlow Lite. Built for SIH2025 (Smart India Hackathon 2025).

## 🚀 Features

- **Real-time OCR** - Live camera feed processing for 7-segment displays
- **Mobile-friendly** - Optimized for mobile devices with rear camera support
- **Image upload** - Process static images for OCR
- **TensorFlow Lite** - Fast inference using optimized float16 model
- **Web-based** - No app installation required, works in any browser
- **Camera switching** - Toggle between front and rear cameras on mobile

## 📋 Requirements

- Python 3.8+
- Webcam or mobile device with camera
- Modern web browser with camera permissions

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/Weightout-OCR.git](https://github.com/Seikh05/Weightout-OCR)
cd Weightout-OCR
```

### 2. Create Virtual Environment (Recommended)
```bash
# Using conda
conda create -n weighout python=3.9
conda activate weighout

# Or using venv
python -m venv weighout
# Windows
weighout\Scripts\activate
# Linux/Mac
source weighout/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

## 🚀 Quick Start

### 1. Run the Application
```bash
python app.py
```

### 2. Access the Web Interface
- **Local access**: Open `http://localhost:5000` in your browser
- **Mobile access**: Use your computer's IP address `http://192.168.1.XXX:5000`

### 3. Grant Camera Permissions
- Allow camera access when prompted by your browser
- For mobile: The app will automatically try to use the rear camera

## 📱 Mobile Usage

### Setup for Mobile Access
1. **Find your computer's IP address**:
   ```bash
   # Windows
   ipconfig
   
   # Linux/Mac
   ifconfig
   ```

2. **Run Flask with network access**:
   ```bash
   python app.py --host=0.0.0.0
   ```

3. **Access from mobile browser**:
   ```
   http://YOUR_COMPUTER_IP:5000
   ```

### Mobile Features
- **Rear camera default** - Automatically uses back camera for better OCR
- **Camera switching** - Tap "Switch Camera" to toggle front/rear
- **Touch-optimized** - Large buttons and responsive design
- **File upload** - Use camera to capture and process images

## 🎯 How to Use

### Real-time OCR (Webcam)
1. Click **"Start Camera"** button
2. Point camera at 7-segment display
3. OCR results appear in real-time (updates every 800ms)
4. Click **"Stop Camera"** to end session
5. Use **"Switch Camera"** on mobile to change cameras

### Image Upload OCR
1. Click **"Choose File"** or camera icon
2. Select image from device or take photo
3. OCR result displays immediately
4. Supports common image formats (JPG, PNG, etc.)

## 🧪 Testing

### Test with Sample Images
The project includes a Jupyter notebook for testing:

```bash
jupyter notebook test.ipynb
```

### Manual Testing
1. **7-segment displays** - Digital clocks, calculators, meters
2. **Good lighting** - Ensure clear visibility of segments
3. **Stable positioning** - Hold camera steady for best results
4. **Distance** - Position camera 10-30cm from display

### Expected Results
- **Numbers**: `0123456789`
- **Letters**: `abcdef` (common in hex displays)
- **Clean output**: No excessive dots or artifacts

## 📁 Project Structure

```
Weightout-OCR/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── model_float16.tflite  # TensorFlow Lite OCR model
├── README.md             # This documentation
├── test.ipynb            # Testing notebook
├── templates/
│   └── index.html        # Web interface
├── static/
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── webcam.js     # Camera and OCR logic
└── .gitignore           # Git ignore rules
```

## ⚙️ Configuration

### Model Settings
- **Input size**: 200x31 pixels (automatically resized)
- **Format**: Grayscale images
- **Model**: Float16 TensorFlow Lite for faster inference

### Performance Tuning
- **OCR frequency**: 800ms intervals (adjustable in `webcam.js`)
- **Image quality**: JPEG 80% compression for faster processing
- **Resolution**: 1280x720 camera input (mobile optimized)

### Performance Optimization
- **Good lighting** improves accuracy and speed
- **Stable camera** reduces processing time
- **Close distance** (10-30cm) works best
- **Clean displays** give better results




## 🙏 Credits & Acknowledgments

### Model Attribution
- **TensorFlow Lite Model**: `model_float16.tflite`
- **Model Type**: 7-Segment Display OCR Recognition
- **Format**: Float16 optimized for mobile/edge deployment
- **Training**: Custom trained model for digit and character recognition
- **Optimization**: Quantized to float16 for improved performance

### Technologies Used
- **TensorFlow Lite** - Model inference engine
- **Flask** - Web framework
- **OpenCV** - Image processing
- **PIL (Pillow)** - Image manipulation
- **NumPy** - Numerical computations

### Special Thanks
- TensorFlow team for TensorFlow Lite framework
- OpenCV community for computer vision tools
- Flask development team for the web framework

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check troubleshooting section above
- Ensure all dependencies are correctly installed

## 🔄 Version History

- **v1.0.0** - Initial release with basic OCR functionality
- **v1.1.0** - Added mobile support and camera switching
- **v1.2.0** - Performance optimizations and error handling
- **v1.3.0** - Improved CTC decoding and dot filtering

---
