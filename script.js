// Select the video element and button
const videoElement = document.getElementById('webcam');
const startButton = document.getElementById('toggleButton');

// Constraints for the video stream (resolution, frame rate, etc.)
const constraints = {
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
    }
};

let stream; // To store the webcam stream

// Function to start or resume the webcam feed
async function startWebcam() {
    try {
        // Request access to the webcam
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        // Set the video source to the webcam stream
        videoElement.srcObject = stream;
        // Play the video once the stream is set
        videoElement.play();
        // Update button text to "Pause Video"
        toggleButton.textContent = 'Pause Video';
    } catch (error) {
        console.error('Error accessing the webcam:', error);
    }
}

// Function to toggle the video playback
function toggleVideo() {
    if (!stream) {
        // If the stream is not started yet, start it
        startWebcam();
    } else if (videoElement.paused) {
        // If the video is paused, play it
        videoElement.play();
        toggleButton.textContent = 'Pause Video'; // Update button text to "Pause"
    } else {
        // If the video is playing, pause it
        videoElement.pause();
        toggleButton.textContent = 'Resume Video'; // Update button text to "Resume"
    }
}

// Event listener for the button click to toggle video play/pause
toggleButton.addEventListener('click', toggleVideo);