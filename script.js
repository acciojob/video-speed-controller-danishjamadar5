// Get the required elements
const video = document.querySelector(".flex");
const progressBar = document.querySelector(".progress__filled");
const playButton = document.querySelector(".toggle");
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll("[data-skip]");
const speedBar = document.querySelector(".speed-bar");

// Add event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", updateProgress);
playButton.addEventListener("click", togglePlay);
volumeSlider.addEventListener("input", handleVolumeChange);
speedSlider.addEventListener("input", handleSpeedChange);
skipButtons.forEach((button) => button.addEventListener("click", skip));
speedBar.addEventListener("mousemove", handleSpeedBarMove);

// Function to toggle play/pause
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// Function to update the play/pause button
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playButton.textContent = icon;
}

// Function to update the progress bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Function to handle volume change
function handleVolumeChange() {
  video.volume = this.value;
}

// Function to handle speed change
function handleSpeedChange() {
  video.playbackRate = this.value;
}

// Function to skip ahead or back
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function to handle mouse movement on speed bar
function handleSpeedBarMove(event) {
  const barWidth = speedBar.offsetWidth;
  const mouseX = event.offsetX;
  const percent = (mouseX / barWidth) * 100;
  const minSpeed = 0.5;
  const maxSpeed = 4;
  const speed = (percent / 100) * (maxSpeed - minSpeed) + minSpeed;
  speedSlider.value = speed.toFixed(1);
  video.playbackRate = speed;
}

