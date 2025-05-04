// DOM Elements
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const songTitleElement = document.getElementById('song-title');
const artistNameElement = document.getElementById('artist-name');
const albumCoverElement = document.getElementById('album-cover');
const albumPlaceholder = document.getElementById('album-placeholder');
const playlistContainer = document.getElementById('playlist-container');

// Audio element
const audio = new Audio();
let isPlaying = false;
let currentSongIndex = 0;

// Your song collection with real file paths
const songs = [
    {
        title: "Chudi Jo Khanki",
        artist: "Me",
        image: "image/Chudi Jo Khanki.jpg",
        file: "Chudi Jo Khanki.mp3"
    },
    {
        title: "Line Without a Hook - (Reel)",
        artist: "Me",
        image: "image/Line Without a Hook.jpeg",
        file: "Line Without a Hook.mp3"
    },
    { 
        title: "Main Koi Aisa Geet Gaoon", 
        artist: "Me", 
        image: "image/Main Koi Aisa Geet Gaoon.jpg", 
        file: "Main Koi Aisa Geet Gaoon.mp3" 
    },
    { 
        title: "Bulleya", 
        artist: "Me", 
        image: "image/Bulleya.jpeg", 
        file: "Bulleya.mp3" 
    },
    { 
        title: "Husn", 
        artist: "Me", 
        image: "image/Husn.jpeg", 
        file: "Husn.mp3" 
    },
    { 
        title: "Kisi Ki Muskurahaton", 
        artist: "Me", 
        image: "image/Kisi Ki Muskurahaton.jpeg", 
        file: "Kisi Ki Muskurahaton.mp3" 
    },
    { 
        title: "Die With a Smile", 
        artist: "Me", 
        image: "image/Die With a Smile.jpeg", 
        file: "Die With a Smile.mp3" 
    }
];

// Event Listeners
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', songEnded);

// Initialize playlist
function initializePlaylist() {
    songs.forEach((song, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.dataset.index = index;

        playlistItem.innerHTML = `
            <div class="playlist-item-number">${index + 1}</div>
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div class="playlist-item-duration" id="duration-${index}">-:--</div>
        `;

        playlistItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        playlistContainer.appendChild(playlistItem);
        loadSongDuration(index);
    });
}

// Load durations for each song
function loadSongDuration(index) {
    const tempAudio = new Audio();
    tempAudio.src = songs[index].file;

    tempAudio.addEventListener('loadedmetadata', () => {
        const durationElement = document.getElementById(`duration-${index}`);
        if (durationElement) {
            durationElement.textContent = formatTime(tempAudio.duration);
        }
    }, { once: true });

    tempAudio.addEventListener('error', () => {
        const durationElement = document.getElementById(`duration-${index}`);
        if (durationElement) {
            durationElement.textContent = "--:--";
            console.error(`Failed to load duration for: ${songs[index].file}`);
        }
    }, { once: true });
}

// Load a song
function loadSong(index) {
    const song = songs[index];

    // Set the actual audio source
    audio.src = song.file;

    songTitleElement.textContent = song.title;
    artistNameElement.textContent = song.artist;

    // Set the album cover using the image
    if (song.image) {
        albumCoverElement.style.backgroundImage = `url("${song.image}")`; // Double quotes for safer URL
        albumCoverElement.style.backgroundColor = ''; // Clear previous background
        albumPlaceholder.style.display = 'none';

        // Debug image loading
        const img = new Image();
        img.src = song.image;
        img.onload = () => console.log(`Image loaded successfully: ${song.image}`);
        img.onerror = () => {
            console.error(`Failed to load image: ${song.image}`);
            albumCoverElement.style.backgroundImage = '';
            albumCoverElement.style.backgroundColor = '#888'; // Fallback
            albumPlaceholder.style.display = 'block';
        };
    } else {
        albumCoverElement.style.backgroundImage = '';
        albumCoverElement.style.backgroundColor = '#888'; // Fallback color
        albumPlaceholder.style.display = 'block';
    }

    // Update active playlist item
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.index) === index) {
            item.classList.add('active');
        }
    });

    // Reset progress bar
    progressBar.style.width = '0%';
    currentTimeElement.textContent = '0:00';

    // Set duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        durationElement.textContent = formatTime(audio.duration);
    }, { once: true });

    // Handle audio loading errors
    audio.addEventListener('error', () => {
        console.error(`Cannot load audio file: ${song.file}`);
        alert(`Cannot load audio file: ${song.file}`);
        durationElement.textContent = "--:--";
    }, { once: true });
}

// Functions
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        if (!songTitleElement.textContent || songTitleElement.textContent === 'Select a song') {
            loadSong(currentSongIndex);
        }
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    playPauseButton.textContent = '⏸';
    audio.play().catch(error => {
        console.error("Error playing audio:", error);
        alert("Error playing audio. Please ensure the audio file exists and is accessible.");
        isPlaying = false;
        playPauseButton.textContent = '▶';
    });
}

function pauseSong() {
    isPlaying = false;
    playPauseButton.textContent = '▶';
    audio.pause();
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Cleaner wrap-around
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Cleaner wrap-around
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100 || 0; // Handle NaN
    progressBar.style.width = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(currentTime);
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) audio.currentTime = (clickX / width) * duration;
}

function songEnded() {
    playNextSong();
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Initialize the app
initializePlaylist();
loadSong(currentSongIndex);