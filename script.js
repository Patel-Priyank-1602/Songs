const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const shuffleButton = document.getElementById('shuffle-button');
const repeatButton = document.getElementById('repeat-button');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const progressHoverTime = document.getElementById('progress-hover-time');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const songTitleElement = document.getElementById('song-title');
const artistNameElement = document.getElementById('artist-name');
const albumCoverElement = document.getElementById('album-cover');
const albumPlaceholder = document.getElementById('album-placeholder');
const playlistContainer = document.getElementById('playlist-container');
const albumPlayButton = document.getElementById('album-play-button');
const volumeSlider = document.getElementById('volume-slider');
const volumeProgress = document.getElementById('volume-progress');
const volumeKnob = document.getElementById('volume-knob');
const volumePercentage = document.getElementById('volume-percentage');
const volumeIcon = document.getElementById('volume-icon');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const nowPlayingIndicator = document.getElementById('now-playing-indicator');
const languageTabs = document.querySelectorAll('.language-tab');

// Audio element
const audio = new Audio();
let isPlaying = false;
let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;
let originalSongs = [];
let filteredSongs = [];
let playHistory = [];
let volume = 0.7; // Default volume (70%)
let currentLanguage = 'all'; // Default to show all songs

// Your song collection with real file paths and language info
const songs = [
    {
        title: "Chudi Jo Khanki",
        artist: "Me",
        image: "image/Chudi Jo Khanki.jpg",
        file: "Chudi Jo Khanki.mp3",
        language: "hindi"
    },
    {
        title: "Line Without a Hook - (Reel)",
        artist: "Me",
        image: "image/Line Without a Hook.jpeg",
        file: "Line Without a Hook.mp3",
        language: "english"
    },
    { 
        title: "Main Koi Aisa Geet Gaoon", 
        artist: "Me", 
        image: "image/Main Koi Aisa Geet Gaoon.jpg", 
        file: "Main Koi Aisa Geet Gaoon.mp3",
        language: "hindi"
    },
    { 
        title: "Bulleya", 
        artist: "Me", 
        image: "image/Bulleya.jpeg", 
        file: "Bulleya.mp3",
        language: "hindi"
    },
    { 
        title: "Husn", 
        artist: "Me", 
        image: "image/Husn.jpeg", 
        file: "Husn.mp3",
        language: "hindi"
    },
    { 
        title: "Kisi Ki Muskurahaton", 
        artist: "Me", 
        image: "image/Kisi Ki Muskurahaton.jpeg", 
        file: "Kisi Ki Muskurahaton.mp3",
        language: "hindi"
    },
    { 
        title: "Die With a Smile", 
        artist: "Me", 
        image: "image/Die With a Smile.jpeg", 
        file: "Die With a Smile.mp3",
        language: "english"
    }
];

// Initialize
originalSongs = [...songs];
filteredSongs = [...songs];

// Event Listeners
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);
shuffleButton.addEventListener('click', toggleShuffle);
repeatButton.addEventListener('click', toggleRepeat);
progressContainer.addEventListener('click', setProgress);
progressContainer.addEventListener('mousemove', showProgressHoverTime);
progressContainer.addEventListener('mouseleave', hideProgressHoverTime);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', songEnded);
albumPlayButton.addEventListener('click', togglePlayPause);
albumCoverElement.addEventListener('click', (e) => {
    // Prevent triggering if clicking on the album play button
    if (e.target !== albumPlayButton && !albumPlayButton.contains(e.target)) {
        togglePlayPause();
    }
});

// Volume control
volumeSlider.addEventListener('click', setVolume);
volumeSlider.addEventListener('mousemove', handleVolumeSliderHover);
volumeIcon.addEventListener('click', toggleMute);

// Search functionality
searchInput.addEventListener('input', filterPlaylist);

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Language tabs
languageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const language = tab.dataset.language;
        filterByLanguage(language);
        
        // Update active tab
        languageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Set initial volume
audio.volume = volume;
updateVolumeUI();

// Initialize playlist
function initializePlaylist() {
    playlistContainer.innerHTML = ''; // Clear existing items
    
    filteredSongs.forEach((song, index) => {
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
            console.log(`Clicked song: ${song.title}, isPlaying: ${isPlaying}`);
            currentSongIndex = index;
            loadSong(currentSongIndex, isPlaying); // Pass isPlaying to loadSong
        });

        playlistContainer.appendChild(playlistItem);
        loadSongDuration(index);
    });
}

// Load durations for each song
function loadSongDuration(index) {
    const tempAudio = new Audio();
    tempAudio.src = filteredSongs[index].file;

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
            console.error(`Failed to load duration for: ${filteredSongs[index].file}`);
        }
    }, { once: true });
}

// Load a song
function loadSong(index, shouldPlay = false) {
    const song = filteredSongs[index];
    console.log(`Loading song: ${song.title}, shouldPlay: ${shouldPlay}`);

    // Set the actual audio source
    audio.src = song.file;
    audio.load(); // Ensure the audio element is reset

    songTitleElement.textContent = song.title;
    artistNameElement.textContent = song.artist;

    // Set the album cover using the image
    if (song.image) {
        albumCoverElement.style.backgroundImage = `url("${song.image}")`;
        albumCoverElement.style.backgroundColor = '';
        albumPlaceholder.style.display = 'none';

        const img = new Image();
        img.src = song.image;
        img.onload = () => console.log(`Image loaded successfully: ${song.image}`);
        img.onerror = () => {
            console.error(`Failed to load image: ${song.image}`);
            albumCoverElement.style.backgroundImage = '';
            albumCoverElement.style.backgroundColor = '#888';
            albumPlaceholder.style.display = 'block';
        };
    } else {
        albumCoverElement.style.backgroundImage = '';
        albumCoverElement.style.backgroundColor = '#888';
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

    // Set duration and play when metadata is loaded
    const onMetadataLoaded = () => {
        durationElement.textContent = formatTime(audio.duration);
        if (shouldPlay) {
            playSong();
        }
    };
    audio.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });

    // Handle audio loading errors
    audio.addEventListener('error', () => {
        console.error(`Cannot load audio file: ${song.file}`);
        alert(`Cannot load audio file: ${song.file}`);
        durationElement.textContent = "--:--";
        isPlaying = false;
    }, { once: true });

    // Show now playing indicator
    showNowPlayingIndicator();
}

// Functions
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        if (!songTitleElement.textContent || songTitleElement.textContent === 'Select a song') {
            loadSong(currentSongIndex, true);
        } else {
            playSong();
        }
    }
}

function playSong() {
    console.log(`Attempting to play song: ${songTitleElement.textContent}, audio.readyState: ${audio.readyState}`);
    isPlaying = true;
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    albumPlayButton.innerHTML = '<i class="fas fa-pause"></i>';
    document.body.classList.add('playing');

    audio.play().catch(error => {
        console.error("Error playing audio:", error);
        alert("Error playing audio. Please ensure the audio file exists and is accessible.");
        isPlaying = false;
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        albumPlayButton.innerHTML = '<i class="fas fa-play"></i>';
        document.body.classList.remove('playing');
    });

    showNowPlayingIndicator();
}

function pauseSong() {
    isPlaying = false;
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    albumPlayButton.innerHTML = '<i class="fas fa-play"></i>';
    document.body.classList.remove('playing');
    audio.pause();

    hideNowPlayingIndicator();
}

function playPreviousSong() {
    if (playHistory.length > 0 && audio.currentTime < 3) {
        currentSongIndex = playHistory.pop();
    } else {
        if (audio.currentTime >= 3) {
            audio.currentTime = 0;
            return;
        } else {
            currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
        }
    }

    loadSong(currentSongIndex, isPlaying);
}

function playNextSong() {
    playHistory.push(currentSongIndex);

    if (playHistory.length > 20) {
        playHistory.shift();
    }

    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * filteredSongs.length);
        } while (newIndex === currentSongIndex && filteredSongs.length > 1);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
    }

    loadSong(currentSongIndex, isPlaying);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active', isShuffle);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active', isRepeat);
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100 || 0;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(currentTime);
}

function showProgressHoverTime(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    if (duration) {
        const hoverTime = (clickX / width) * duration;
        progressHoverTime.textContent = formatTime(hoverTime);
        progressHoverTime.style.display = 'block';
        progressHoverTime.style.left = `${clickX}px`;
    }
}

function hideProgressHoverTime() {
    progressHoverTime.style.display = 'none';
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) audio.currentTime = (clickX / width) * duration;
}

function songEnded() {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        playNextSong();
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function setVolume(e) {
    const rect = volumeSlider.getBoundingClientRect();
    const width = rect.width;
    const clickX = e.clientX - rect.left;
    volume = clickX / width;

    volume = Math.max(0, Math.min(1, volume));

    audio.volume = volume;
    updateVolumeUI();
}

function handleVolumeSliderHover(e) {
    if (e.buttons === 1) {
        setVolume(e);
    }
}

function toggleMute() {
    if (audio.volume > 0) {
        audio.dataset.previousVolume = audio.volume;
        audio.volume = 0;
        volume = 0;
    } else {
        volume = parseFloat(audio.dataset.previousVolume || 0.7);
        audio.volume = volume;
    }

    updateVolumeUI();
}

function updateVolumeUI() {
    volumeProgress.style.width = `${volume * 100}%`;
    volumeKnob.style.left = `${volume * 100}%`;
    volumePercentage.textContent = `${Math.round(volume * 100)}%`;

    if (volume === 0) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

function filterPlaylist() {
    const searchTerm = searchInput.value.toLowerCase();

    let languageFiltered = originalSongs;
    if (currentLanguage !== 'all') {
        languageFiltered = originalSongs.filter(song => song.language === currentLanguage);
    }

    if (searchTerm === '') {
        filteredSongs = [...languageFiltered];
    } else {
        filteredSongs = languageFiltered.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );
    }

    initializePlaylist();

    const currentSongInFiltered = filteredSongs.findIndex(song => 
        song.title === originalSongs[currentSongIndex].title && 
        song.artist === originalSongs[currentSongIndex].artist
    );

    if (currentSongInFiltered === -1 && filteredSongs.length > 0) {
        currentSongIndex = 0;
        loadSong(currentSongIndex, isPlaying);
    } else if (filteredSongs.length > 0) {
        currentSongIndex = currentSongInFiltered;
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.dataset.index) === currentSongIndex) {
                item.classList.add('active');
            }
        });
    }
}

function filterByLanguage(language) {
    currentLanguage = language;

    searchInput.value = '';

    if (language === 'all') {
        filteredSongs = [...originalSongs];
    } else {
        filteredSongs = originalSongs.filter(song => song.language === language);
    }

    initializePlaylist();

    if (filteredSongs.length > 0) {
        const currentSongInFiltered = filteredSongs.findIndex(song => 
            song.title === originalSongs[currentSongIndex].title && 
            song.artist === originalSongs[currentSongIndex].artist
        );

        if (currentSongInFiltered === -1) {
            currentSongIndex = 0;
            loadSong(currentSongIndex, isPlaying);
        } else {
            currentSongIndex = currentSongInFiltered;
            const playlistItems = document.querySelectorAll('.playlist-item');
            playlistItems.forEach(item => {
                item.classList.remove('active');
                if (parseInt(item.dataset.index) === currentSongIndex) {
                    item.classList.add('active');
                }
            });
        }
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
}

function showNowPlayingIndicator() {
    nowPlayingIndicator.classList.add('visible');

    setTimeout(() => {
        hideNowPlayingIndicator();
    }, 3000);
}

function hideNowPlayingIndicator() {
    nowPlayingIndicator.classList.remove('visible');
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Initialize the app
loadThemePreference();
initializePlaylist();
loadSong(currentSongIndex);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlayPause();
    }

    if (e.code === 'ArrowLeft' && e.target.tagName !== 'INPUT') {
        playPreviousSong();
    }

    if (e.code === 'ArrowRight' && e.target.tagName !== 'INPUT') {
        playNextSong();
    }

    if (e.code === 'KeyM' && e.target.tagName !== 'INPUT') {
        toggleMute();
    }
});