// Getting all necessary DOM elements
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeControl = document.getElementById("volume-control");
const playlistItems = document.querySelectorAll("#playlist-items li");
const dropArea = document.getElementById("drop-area");

// Initializes currentTrack to the first item in the playlist
let currentTrack = 0;

// Loads the currently selected track into the audio player
function loadTrack() {
audioPlayer.src = playlistItems[currentTrack].getAttribute("data-src");
audioPlayer.load();
}

// Playing the currently selected track
function playTrack() {
audioPlayer.play();
}

// Pause the currently playing track
function pauseTrack() {
audioPlayer.pause();
}

// Going to the next track in the playlist
function nextTrack() {
currentTrack++;
if (currentTrack > playlistItems.length - 1) {
currentTrack = 0;
}
loadTrack();
playTrack();
setActiveTrack();
}

// Going to the previous track in the playlist
function prevTrack() {
currentTrack--;
if (currentTrack < 0) {
currentTrack = playlistItems.length - 1;
}
loadTrack();
playTrack();
setActiveTrack();
}

// Setting the volume of the audio player
function setVolume() {
audioPlayer.volume = volumeControl.value;
}

// Setting the active track in the playlist
function setActiveTrack() {
playlistItems.forEach((item) => {
item.classList.remove("active");
});
playlistItems[currentTrack].classList.add("active");
}

// Playing the next track when the current track ends
function playNextTrack() {
if (currentTrack < playlistItems.length - 1) {
nextTrack();
} else {
currentTrack = 0;
loadTrack();
playTrack();
setActiveTrack();
}
}

// Adding an event listener to the audio player to play the next track when the current track ends
audioPlayer.addEventListener("ended", playNextTrack);

// Loading the first track in the playlist
loadTrack();

// Adding event listeners for all necessary DOM elements
playBtn.addEventListener("click", playTrack);
pauseBtn.addEventListener("click", pauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
volumeControl.addEventListener("input", setVolume);

// Adding click event listeners to all playlist items
playlistItems.forEach((item, index) => {
item.addEventListener("click", () => {
currentTrack = index;
loadTrack();
playTrack();
setActiveTrack();
});

// Making playlist items draggable
item.setAttribute("draggable", "true");
item.addEventListener("dragstart", (event) => {
event.dataTransfer.setData("text/plain", index);
});
});

// Preventing the default dragover behavior for the drop area
dropArea.addEventListener("dragover", (event) => {
event.preventDefault();
});

// Updated the 'drop' event listener 
dropArea.addEventListener("drop", (event) => {
event.preventDefault();
const newIndex = event.dataTransfer.getData("text/plain");
currentTrack = parseInt(newIndex, 10);
loadTrack();
playTrack();
setActiveTrack();

toggleDropAreaActive();
setTimeout(() => {
toggleDropAreaActive();
}, 1000);
});

