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
git clone https://github.com/yourusername/Weightout-OCR.git
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

## 🔧 Troubleshooting

### Common Issues

#### Camera Not Working
```bash
# Check camera permissions in browser
# Try different browser (Chrome recommended)
# Ensure no other apps are using camera
```

#### RuntimeError: TensorFlow Lite
```bash
# Already fixed in current version
# Each request uses fresh interpreter instance
```

#### Slow Performance
```bash
# Reduce OCR frequency in webcam.js (increase interval)
# Use better lighting for faster processing
# Close other browser tabs/apps
```

#### Mobile Camera Issues
```bash
# Grant camera permissions
# Use HTTPS for camera access (some browsers require it)
# Try different mobile browsers
```

### Performance Optimization
- **Good lighting** improves accuracy and speed
- **Stable camera** reduces processing time
- **Close distance** (10-30cm) works best
- **Clean displays** give better results

## 🚀 Deployment

### Local Network
```bash
python app.py --host=0.0.0.0 --port=5000
```

### Cloud Deployment
The app can be deployed to:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repository
- **Render**: Deploy from GitHub
- **PythonAnywhere**: Upload files and configure

### Docker (Optional)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 SIH2025

This project was developed for Smart India Hackathon 2025, focusing on innovative OCR solutions for industrial and consumer applications.

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

**Made with ❤️ for SIH2025**" 
