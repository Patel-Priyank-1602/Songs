const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const albumPlayBtn = document.getElementById("album-play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const progressThumb = document.getElementById("progress-thumb");
const progressHoverTime = document.getElementById("progress-hover-time");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const songTitleElement = document.getElementById("song-title");
const artistNameElement = document.getElementById("artist-name");
const albumImage = document.getElementById("album-image");
const volumeIcon = document.getElementById("volume-icon");
const volumeSlider = document.getElementById("volume-slider");
const volumeProgress = document.getElementById("volume-progress");
const volumeThumb = document.getElementById("volume-thumb");
const volumePercentage = document.getElementById("volume-percentage");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const playlistContainer = document.getElementById("playlist-container");
const themeToggle = document.getElementById("theme-toggle");
const nowPlayingIndicator = document.getElementById("now-playing-indicator");
const languageTabs = document.querySelectorAll(".language-tab");
const loadingSpinner = document.getElementById("loading-spinner");
const toastContainer = document.getElementById("toast-container");
const mobileBottomPlayer = document.getElementById("mobile-bottom-player");
const mobileAlbumImage = document.getElementById("mobile-album-image");
const mobileSongTitle = document.getElementById("mobile-song-title");
const mobileArtistName = document.getElementById("mobile-artist-name");
const mobilePlayPauseBtn = document.getElementById("mobile-play-pause-btn");
const mobilePrevBtn = document.getElementById("mobile-prev-btn");
const mobileNextBtn = document.getElementById("mobile-next-btn");
const mobileProgressBar = document.getElementById("mobile-progress-bar");
const shuffleAllBtn = document.getElementById("shuffle-all-btn");
const playAllBtn = document.getElementById("play-all-btn");

let isPlaying = false;
let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;
let volume = 0.7;
let isMuted = false;
let currentLanguage = "all";
let searchTerm = "";
let isLoading = false;
let isDragging = false;
let hasUserInteracted = false;
const playHistory = [];

const songs = [
    {
        title: "Chudi Jo Khanki",
        artist: "Priyank Patel",
        image: "image/Chudi Jo Khanki.jpg?height=300&width=300",
        file: "Chudi Jo Khanki.mp3",
        language: "hindi",
    },
    {
        title: "Line Without a Hook - (Reel)",
        artist: "Priyank Patel",
        image: "image/Line Without a Hook.jpeg?height=300&width=300",
        file: "Line Without a Hook.mp3",
        language: "english",
    },
    {
        title: "Main Koi Aisa Geet Gaoon",
        artist: "Priyank Patel",
        image: "image/Main Koi Aisa Geet Gaoon.jpg?height=300&width=300",
        file: "Main Koi Aisa Geet Gaoon.mp3",
        language: "hindi",
    },
    {
        title: "Bulleya",
        artist: "Priyank Patel",
        image: "image/Bulleya.jpeg?height=300&width=300",
        file: "Bulleya.mp3",
        language: "hindi",
    },
    {
        title: "Husn",
        artist: "Priyank Patel",
        image: "image/Husn.jpeg?height=300&width=300",
        file: "Husn.mp3",
        language: "hindi",
    },
    {
        title: "Kisi Ki Muskurahaton",
        artist: "Priyank Patel",
        image: "image/Kisi Ki Muskurahaton.jpeg?height=300&width=300",
        file: "Kisi Ki Muskurahaton.mp3",
        language: "hindi",
    },
    {
        title: "Die With a Smile",
        artist: "Priyank Patel",
        image: "image/Die With a Smile.jpeg?height=300&width=300",
        file: "Die With a Smile.mp3",
        language: "english",
    },
];

let filteredSongs = [...songs];

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    initializePlaylist();
    loadSong(currentSongIndex);
    setVolume(volume);
    setupEventListeners();
    setupTouchEvents();
    checkMobileDevice();
    loadState();
});

function setupEventListeners() {
    playPauseBtn.addEventListener("click", () => {
        hasUserInteracted = true;
        togglePlayPause();
    });
    albumPlayBtn.addEventListener("click", () => {
        hasUserInteracted = true;
        togglePlayPause();
    });
    mobilePlayPauseBtn.addEventListener("click", () => {
        hasUserInteracted = true;
        togglePlayPause();
    });
    prevBtn.addEventListener("click", playPrevious);
    nextBtn.addEventListener("click", playNext);
    mobilePrevBtn.addEventListener("click", playPrevious);
    mobileNextBtn.addEventListener("click", playNext);
    shuffleBtn.addEventListener("click", toggleShuffle);
    repeatBtn.addEventListener("click", toggleRepeat);
    shuffleAllBtn.addEventListener("click", shuffleAndPlay);
    playAllBtn.addEventListener("click", playAll);
    progressContainer.addEventListener("click", setProgress);
    progressContainer.addEventListener("mousemove", showProgressHover);
    progressContainer.addEventListener("mouseleave", hideProgressHover);
    volumeIcon.addEventListener("click", toggleMute);
    volumeSlider.addEventListener("click", handleVolumeClick);
    volumeSlider.addEventListener("mousemove", handleVolumeSliderHover);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);
    audio.addEventListener("error", handleAudioError);
    audio.addEventListener("loadstart", showLoading);
    audio.addEventListener("canplay", hideLoading);
    searchInput.addEventListener("input", handleSearch);
    searchClear.addEventListener("click", clearSearch);
    languageTabs.forEach((tab) => {
        tab.addEventListener("click", () => filterByLanguage(tab.dataset.language));
    });
    themeToggle.addEventListener("click", toggleTheme);
    document.addEventListener("keydown", handleKeyboard);
    window.addEventListener("resize", handleResize);
    window.addEventListener("beforeunload", saveState);
}

function setupTouchEvents() {
    let touchStartX = 0;
    let touchStartY = 0;
    if (mobileBottomPlayer) {
        mobileBottomPlayer.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        mobileBottomPlayer.addEventListener("touchend", (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) playPrevious();
                else playNext();
            }
        });
    }
    progressContainer.addEventListener("touchstart", handleProgressTouchStart);
    progressContainer.addEventListener("touchmove", handleProgressTouchMove);
    progressContainer.addEventListener("touchend", handleProgressTouchEnd);
    volumeSlider.addEventListener("touchstart", handleVolumeTouchStart);
    volumeSlider.addEventListener("touchmove", handleVolumeTouchMove);
    volumeSlider.addEventListener("touchend", handleVolumeTouchEnd);
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        if (!songTitleElement.textContent || songTitleElement.textContent === "Select a song") {
            loadSong(currentSongIndex, true);
        } else {
            playSong();
        }
    }
}

function playSong() {
    if (isLoading) return;
    showLoading();
    audio.play().then(() => {
        isPlaying = true;
        updatePlayButtons();
        showNowPlaying();
        showMobilePlayer();
        hideLoading();
        showToast(`Playing: ${filteredSongs[currentSongIndex].title}`, "success");
    }).catch((error) => {
        console.error("Error playing audio:", error);
        handleAudioError();
        hideLoading();
        showToast("Error playing audio", "error");
    });
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    updatePlayButtons();
    hideNowPlaying();
    showToast("Paused", "info");
}

function playPrevious() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }
    if (playHistory.length > 0) {
        currentSongIndex = playHistory.pop();
    } else {
        currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
    }
    loadSong(currentSongIndex, hasUserInteracted && isPlaying);
}

function playNext() {
    playHistory.push(currentSongIndex);
    if (playHistory.length > 20) playHistory.shift();
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * filteredSongs.length);
        } while (newIndex === currentSongIndex && filteredSongs.length > 1);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
    }
    loadSong(currentSongIndex, hasUserInteracted && isPlaying);
}

function loadSong(index, shouldPlay = false) {
    const song = filteredSongs[index];
    if (!song) return;
    showLoading();
    audio.src = song.file;
    audio.load();
    songTitleElement.textContent = song.title;
    artistNameElement.textContent = song.artist;
    albumImage.src = song.image;
    albumImage.alt = song.title;
    mobileSongTitle.textContent = song.title;
    mobileArtistName.textContent = song.artist;
    mobileAlbumImage.src = song.image;
    mobileAlbumImage.alt = song.title;
    updateActivePlaylistItem();
    resetProgress();
    const img = new Image();
    img.src = song.image;
    img.onerror = () => {
        console.error(`Failed to load image: ${song.image}`);
        albumImage.src = "";
        mobileAlbumImage.src = "";
    };
    audio.addEventListener("loadedmetadata", () => {
        durationElement.textContent = formatTime(audio.duration);
        if (shouldPlay) playSong();
    }, { once: true });
    audio.addEventListener("error", () => {
        console.error(`Cannot load audio file: ${song.file}`);
        durationElement.textContent = "--:--";
        isPlaying = false;
        updatePlayButtons();
        hideLoading();
        showToast(`Cannot load audio file: ${song.file}`, "error");
    }, { once: true });
    showNowPlaying();
}

function updatePlayButtons() {
    const playIcon = isPlaying ? "fa-pause" : "fa-play";
    playPauseBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
    albumPlayBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
    mobilePlayPauseBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);
    showToast(isShuffle ? "Shuffle enabled" : "Shuffle disabled", "info");
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active", isRepeat);
    showToast(isRepeat ? "Repeat enabled" : "Repeat disabled", "info");
}

function shuffleAndPlay() {
    hasUserInteracted = true;
    isShuffle = true;
    shuffleBtn.classList.add("active");
    currentSongIndex = Math.floor(Math.random() * filteredSongs.length);
    loadSong(currentSongIndex, true);
}

function playAll() {
    hasUserInteracted = true;
    currentSongIndex = 0;
    loadSong(currentSongIndex, true);
}

function updateProgress() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        mobileProgressBar.style.width = `${progressPercent}%`;
        currentTimeElement.textContent = formatTime(audio.currentTime);
    }
}

function updateDuration() {
    durationElement.textContent = formatTime(audio.duration);
    hideLoading();
}

function setProgress(e) {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const duration = audio.duration;
    if (duration) audio.currentTime = (clickX / rect.width) * duration;
}

function showProgressHover(e) {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const duration = audio.duration;
    if (duration) {
        const hoverTime = (clickX / rect.width) * duration;
        progressHoverTime.textContent = formatTime(hoverTime);
        progressHoverTime.style.display = "block";
        progressHoverTime.style.left = `${clickX}px`;
    }
}

function hideProgressHover() {
    progressHoverTime.style.display = "none";
}

function resetProgress() {
    progressBar.style.width = "0%";
    mobileProgressBar.style.width = "0%";
    currentTimeElement.textContent = "0:00";
    durationElement.textContent = "0:00";
}

function handleSongEnd() {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        playNext();
    }
}

function handleAudioError() {
    console.error("Audio error occurred");
    isPlaying = false;
    updatePlayButtons();
    hideNowPlaying();
    hideLoading();
    showToast("Failed to load audio file", "error");
}

function handleProgressTouchStart(e) {
    isDragging = true;
    e.preventDefault();
}

function handleProgressTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const rect = progressContainer.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const duration = audio.duration;
    if (duration) {
        const newTime = (touchX / rect.width) * duration;
        audio.currentTime = Math.max(0, Math.min(duration, newTime));
    }
}

function handleProgressTouchEnd(e) {
    isDragging = false;
}

function handleVolumeTouchStart(e) {
    e.preventDefault();
}

function handleVolumeTouchMove(e) {
    e.preventDefault();
    const rect = volumeSlider.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, touchX / rect.width));
    setVolume(newVolume);
    isMuted = false;
    updateVolumeIcon();
}

function handleVolumeTouchEnd(e) {
    e.preventDefault();
}

function handleVolumeClick(e) {
    const rect = volumeSlider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(newVolume);
    isMuted = false;
    updateVolumeIcon();
}

function handleVolumeSliderHover(e) {
    if (e.buttons === 1) handleVolumeClick(e);
}

function setVolume(newVolume) {
    volume = newVolume;
    audio.volume = isMuted ? 0 : volume;
    updateVolumeUI();
}

function toggleMute() {
    isMuted = !isMuted;
    audio.volume = isMuted ? 0 : volume;
    updateVolumeUI();
    updateVolumeIcon();
    showToast(isMuted ? "Muted" : "Unmuted", "info");
}

function updateVolumeUI() {
    const displayVolume = isMuted ? 0 : volume;
    volumeProgress.style.width = `${displayVolume * 100}%`;
    volumeThumb.style.left = `${displayVolume * 100}%`;
    volumePercentage.textContent = `${Math.round(displayVolume * 100)}%`;
}

function updateVolumeIcon() {
    let iconClass = "fa-volume-up";
    if (isMuted || volume === 0) iconClass = "fa-volume-mute";
    else if (volume < 0.5) iconClass = "fa-volume-down";
    volumeIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
}

function initializePlaylist() {
    playlistContainer.innerHTML = "";
    if (filteredSongs.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fas fa-music" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No songs found</p>
                <p style="font-size: 0.875rem;">Try adjusting your search or filter</p>
            </div>
        `;
        playlistContainer.appendChild(emptyState);
        return;
    }
    filteredSongs.forEach((song, index) => {
        const songItem = createSongItem(song, index);
        playlistContainer.appendChild(songItem);
        loadSongDuration(index);
    });
}

function createSongItem(song, index) {
    const songItem = document.createElement("div");
    songItem.className = "song-item";
    songItem.dataset.index = index;
    songItem.innerHTML = `
        <div class="song-thumbnail">
            <img src="${song.image}" alt="${song.title}" loading="lazy">
            <div class="playing-indicator">
                <div class="playing-spinner"></div>
            </div>
        </div>
        <div class="song-details">
            <div class="song-item-title">${song.title}</div>
            <div class="song-item-artist">${song.artist}</div>
            <span class="song-language ${song.language}">${song.language}</span>
            <div class="song-item-duration" id="duration-${index}">--:--</div>
        </div>
        <button class="song-play-btn" title="Play ${song.title}">
            <i class="fas fa-play"></i>
        </button>
    `;
    songItem.addEventListener("click", (e) => {
        if (!e.target.closest(".song-play-btn")) playSongAtIndex(index);
    });
    const playBtn = songItem.querySelector(".song-play-btn");
    playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playSongAtIndex(index);
    });
    return songItem;
}

function loadSongDuration(index) {
    const tempAudio = new Audio();
    tempAudio.src = filteredSongs[index].file;
    tempAudio.addEventListener("loadedmetadata", () => {
        const durationElement = document.getElementById(`duration-${index}`);
        if (durationElement) durationElement.textContent = formatTime(tempAudio.duration);
    }, { once: true });
    tempAudio.addEventListener("error", () => {
        const durationElement = document.getElementById(`duration-${index}`);
        if (durationElement) durationElement.textContent = "--:--";
        console.error(`Failed to load duration for: ${filteredSongs[index].file}`);
    }, { once: true });
}

function playSongAtIndex(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex, hasUserInteracted);
    if (!hasUserInteracted) {
        hasUserInteracted = true;
        playSong();
    }
}

function updateActivePlaylistItem() {
    const songItems = document.querySelectorAll(".song-item");
    songItems.forEach((item, index) => {
        item.classList.toggle("active", index === currentSongIndex);
    });
}

function handleSearch() {
    searchTerm = searchInput.value.toLowerCase();
    filterSongs();
}

function clearSearch() {
    searchInput.value = "";
    searchTerm = "";
    filterSongs();
}

function filterByLanguage(language) {
    currentLanguage = language;
    languageTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.language === language);
    });
    filterSongs();
}

function filterSongs() {
    const currentSong = songs.find(
        (song) => song.title === songTitleElement.textContent && song.artist === artistNameElement.textContent
    );
    filteredSongs = songs.filter((song) => {
        const matchesSearch = song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm);
        const matchesLanguage = currentLanguage === "all" || song.language === currentLanguage;
        return matchesSearch && matchesLanguage;
    });
    initializePlaylist();
    if (currentSong) {
        const newIndex = filteredSongs.findIndex(
            (song) => song.title === currentSong.title && song.artist === currentSong.artist
        );
        if (newIndex !== -1) {
            currentSongIndex = newIndex;
        }
    }
    updateActivePlaylistItem();
}

function checkMobileDevice() {
    const isMobile = window.innerWidth < 1024;
    if (isMobile && filteredSongs.length > 0) showMobilePlayer();
}

function showMobilePlayer() {
    if (window.innerWidth < 1024) mobileBottomPlayer.classList.add("active");
}

function hideMobilePlayer() {
    mobileBottomPlayer.classList.remove("active");
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    themeToggle.innerHTML = `<i class="fas fa-${isLight ? "sun" : "moon"}"></i>`;
    localStorage.setItem("theme", isLight ? "light" : "dark");
    showToast(`${isLight ? "Light" : "Dark"} theme enabled`, "info");
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function showLoading() {
    isLoading = true;
    loadingSpinner.classList.add("active");
}

function hideLoading() {
    isLoading = false;
    loadingSpinner.classList.remove("active");
}

function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.parentNode?.removeChild(toast), 300);
    }, 3000);
}

function showNowPlaying() {
    nowPlayingIndicator.classList.add("visible");
    setTimeout(hideNowPlaying, 3000);
}

function hideNowPlaying() {
    nowPlayingIndicator.classList.remove("visible");
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function handleKeyboard(e) {
    if (e.target.tagName === "INPUT") return;
    switch (e.code) {
        case "Space":
            e.preventDefault();
            hasUserInteracted = true;
            togglePlayPause();
            break;
        case "ArrowLeft":
            playPrevious();
            break;
        case "ArrowRight":
            playNext();
            break;
        case "KeyM":
            toggleMute();
            break;
        case "KeyS":
            toggleShuffle();
            break;
        case "KeyR":
            toggleRepeat();
            break;
    }
}

function handleResize() {
    checkMobileDevice();
    if (window.innerWidth >= 1024) hideMobilePlayer();
}

function saveState() {
    const state = {
        currentSongIndex,
        volume,
        isShuffle,
        isRepeat,
        currentTime: audio.currentTime,
        hasUserInteracted,
    };
    localStorage.setItem("musicPlayerState", JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem("musicPlayerState");
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            currentSongIndex = state.currentSongIndex || 0;
            volume = state.volume || 0.7;
            isShuffle = state.isShuffle || false;
            isRepeat = state.isRepeat || false;
            hasUserInteracted = state.hasUserInteracted || false;
            shuffleBtn.classList.toggle("active", isShuffle);
            repeatBtn.classList.toggle("active", isRepeat);
            setVolume(volume);
            if (state.currentTime) {
                audio.addEventListener("loadedmetadata", () => {
                    audio.currentTime = state.currentTime;
                }, { once: true });
            }
        } catch (error) {
            console.error("Error loading saved state:", error);
        }
    }
}

audio.volume = volume;
updateVolumeUI();
updateVolumeIcon();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
            (registration) => console.log("SW registered: ", registration),
            (error) => console.log("SW registration failed: ", error)
        );
    });
}