let intervalId;
let currentStream;
let currentFacingMode = 'environment'; // Start with rear camera

async function startWebcam() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const resultDiv = document.getElementById('result');
    const startCamBtn = document.getElementById('startCamBtn');
    const stopCamBtn = document.getElementById('stopCamBtn');

    video.style.display = 'block';
    canvas.style.display = 'none';

    try {
        // Mobile-friendly camera constraints - prefer rear camera
        const constraints = {
            video: {
                facingMode: { ideal: currentFacingMode },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        currentStream = stream;
    } catch (error) {
        console.error('Camera access error:', error);
        resultDiv.textContent = 'Camera access denied or not available';
        return;
    }

    // Show stop and switch buttons, hide start button
    startCamBtn.style.display = 'none';
    stopCamBtn.style.display = 'inline-block';
    document.getElementById('switchCamBtn').style.display = 'inline-block';

    const ctx = canvas.getContext('2d');

    // Clear previous interval if exists
    if (intervalId) clearInterval(intervalId);

    // Run OCR every 800ms (reduced frequency for better performance)
    intervalId = setInterval(async () => {
        // Resize canvas to model input size for efficiency
        canvas.width = 200;
        canvas.height = 31;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/jpeg', 0.8);

        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: dataURL })
        });

        const data = await response.json();
        resultDiv.textContent = 'Detected Text: ' + data.text;
    }, 800); // Reduced from 200ms to 800ms
}

async function runImageOCR(file) {
    const resultDiv = document.getElementById('result');
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');

    // Stop webcam if running
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        video.style.display = 'none';
    }

    // Display uploaded image on canvas
    const img = new Image();
    img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.style.display = 'block';

        const dataURL = canvas.toDataURL('image/png');
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: dataURL })
        });

        const data = await response.json();
        resultDiv.textContent = 'Detected Text: ' + data.text;
    };
    img.src = URL.createObjectURL(file);
}
function stopWebcam() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startCamBtn = document.getElementById('startCamBtn');
    const stopCamBtn = document.getElementById('stopCamBtn');
    const resultDiv = document.getElementById('result');

    // Clear the interval
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    // Stop all video tracks
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }

    // Hide video and canvas
    video.style.display = 'none';
    canvas.style.display = 'none';
    video.srcObject = null;

    // Show start button, hide stop and switch buttons
    startCamBtn.style.display = 'inline-block';
    stopCamBtn.style.display = 'none';
    document.getElementById('switchCamBtn').style.display = 'none';

    // Reset result text
    resultDiv.textContent = 'Detected Text: -';
}async
 function switchCamera() {
    // Toggle between front and rear camera
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    
    // Stop current stream and restart with new camera
    if (currentStream) {
        stopWebcam();
        // Small delay to ensure camera is released
        setTimeout(() => {
            startWebcam();
        }, 100);
    }
}