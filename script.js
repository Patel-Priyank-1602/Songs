/**
 * MYTUNES - PRIYANK PATEL VOCALS
 * Clean, modern, responsive music player logic
 * Fully synced across Desktop & Mobile Screens
 */

// ==========================================================================
// 1. SONG DATABASE (Priyank's Vocal Recordings)
// ==========================================================================
const songsData = [
    {
        id: "pal-pal-dil-ke-paas",
        title: "Pal Pal Dil Ke Paas",
        artist: "Priyank Patel",
        file: "Pal Pal Dil Ke Paas.mp3",
        image: "image/Pal Pal Dil Ke Paas.jpg",
        language: "hindi",
        durationSec: 316,
        durationFormatted: "5:16",
        category: "romantic",
        tag: "Classic Romantic"
    },
    {
        id: "husn",
        title: "Husn",
        artist: "Priyank Patel",
        file: "Husn.mp3",
        image: "image/Husn.jpeg",
        language: "hindi",
        durationSec: 117,
        durationFormatted: "1:57",
        category: "acoustic",
        tag: "Indie Soulful"
    },
    {
        id: "bulleya",
        title: "Bulleya",
        artist: "Priyank Patel",
        file: "Bulleya.mp3",
        image: "image/Bulleya.jpeg",
        language: "hindi",
        durationSec: 75,
        durationFormatted: "1:15",
        category: "acoustic",
        tag: "Sufi Rock"
    },
    {
        id: "chudi-jo-khanki",
        title: "Chudi Jo Khanki",
        artist: "Priyank Patel",
        file: "Chudi Jo Khanki.mp3",
        image: "image/Chudi Jo Khanki.jpg",
        language: "hindi",
        durationSec: 135,
        durationFormatted: "2:15",
        category: "romantic",
        tag: "Folk Melody"
    },
    {
        id: "main-koi-aisa-geet-gaoon",
        title: "Main Koi Aisa Geet Gaoon",
        artist: "Priyank Patel",
        file: "Main Koi Aisa Geet Gaoon.mp3",
        image: "image/Main Koi Aisa Geet Gaoon.jpg",
        language: "hindi",
        durationSec: 298,
        durationFormatted: "4:58",
        category: "romantic",
        tag: "Evergreen Classic"
    },
    {
        id: "kisi-ki-muskurahaton",
        title: "Kisi Ki Muskurahaton",
        artist: "Priyank Patel",
        file: "Kisi Ki Muskurahaton.mp3",
        image: "image/Kisi Ki Muskurahaton.jpeg",
        language: "hindi",
        durationSec: 191,
        durationFormatted: "3:11",
        category: "romantic",
        tag: "Golden Era"
    },
    {
        id: "die-with-a-smile",
        title: "Die With a Smile",
        artist: "Priyank Patel",
        file: "Die With a Smile.mp3",
        image: "image/Die With a Smile.jpeg",
        language: "english",
        durationSec: 76,
        durationFormatted: "1:16",
        category: "ballad",
        tag: "Pop Ballad"
    },
    {
        id: "line-without-a-hook",
        title: "Line Without a Hook",
        artist: "Priyank Patel",
        file: "Line Without a Hook.mp3",
        image: "image/Line Without a Hook.jpeg",
        language: "english",
        durationSec: 54,
        durationFormatted: "0:54",
        category: "acoustic",
        tag: "Acoustic Reel"
    }
];

// Lyrics & Recording Notes Database
const lyricsDatabase = {
    "pal-pal-dil-ke-paas": `Pal pal dil ke paas tum rehti ho
Jeevan meethi pyaas, yeh kehti ho
Pal pal dil ke paas tum rehti ho

Har shaam aankhon par tera aanchal lehraye
Har raat yaadon ki baarat le aaye
Main saans leta hoon, teri khushboo aati hai
Ek mehka mehka sa paigaam laati hai
Mere dil ki dhadkan bhi tere geet gaati hai

Pal pal dil ke paas tum rehti ho...
(Studio Vocal Cover recorded by Priyank Patel)`,

    "husn": `Dekho dekho kaisi baatein yahan ki
Hain saath par hain saath na bhi
Kya itni buri thi meri wafaa?
Kyun laapata sa main yahan...

Meri baaton mein tera zikr sada
Meri yaadon mein teri fikar sada
Kyun beparwah si hai yeh hawa?
Husn tera mere dil ko chhu gaya...
(Acoustic Vocal Take by Priyank Patel)`,

    "bulleya": `Meri rooh ka parinda phadphadaaye
Lekin sukoon ka jazeera mil na paaye
Ve ki karaan, ve ki karaan...

Ik baar ko tajalli toh dikha de
Jhoothi sahi magar tasalli toh dila de
Raanjhan de yaar Bulleya
Sun le pukaar Bulleya
Tu hi toh yaar Bulleya
Murshid mera, murshid mera...
(Sufi Rock Performance by Priyank Patel)`,

    "chudi-jo-khanki": `Chudi jo khanki haathon mein
Yaad piya ki aane lagi
Haye bheegi bheegi raaton mein
Khaabon ki baraat aane lagi

Tere bina ab jee na lage
Har pal teri yaad aane lagi
Chudi jo khanki haathon mein
Yaad piya ki aane lagi...
(Melodic Folk Cover by Priyank Patel)`,

    "main-koi-aisa-geet-gaoon": `Main koi aisa geet gaoon
Ke aarzoo jagaoon agar tum kaho
Main koi aisa geet gaoon
Ke aarzoo jagaoon agar tum kaho

Tumko bulaoon, yeh palkein bichhaoon
Kadam tum jahan jahan rakho
Zameen ko aasmaan banaoon
Sitaaron se sajaoon agar tum kaho...
(Evergreen Romantic Track sung by Priyank Patel)`,

    "kisi-ki-muskurahaton": `Kisi ki muskurahaton pe ho nisaar
Kisi ka dard mil sake to le udhaar
Kisi ke vaaste ho tere dil mein pyaar
Jeena issi ka naam hai

Maana apni jeb se fakeer hain
Phir bhi yaaro dil ke hum ameer hain
Mitte jo pyaar ke liye woh zindagi
Jale bahaar ke liye woh zindagi
Kisi ki muskurahaton pe ho nisaar...
(Golden Era Classic sung by Priyank Patel)`,

    "die-with-a-smile": `(Ooh, ooh)
I, I just woke up from a dream
Where you and I had to say goodbye
And I don't know what it all means
But since I survived, I realized

Wherever you go, that's where I'll follow
Nobody's promised tomorrow
So I'ma love you every night like it's the last night
Like it's the last night

If the world was ending, I'd wanna be next to you
If the party was over and our time on Earth was through
I'd wanna hold you just for a while and die with a smile
If the world was ending, I'd wanna be next to you...
(English Ballad Cover recorded by Priyank Patel)`,

    "line-without-a-hook": `I don't really give a damn about the way you touch me
When we're alone, you can hold my hand
If no one's home, do you like it when I'm away?
If I went and hurt my body, baby, would you love me the same?

Baby, I am a wreck when I'm without you
I need you here to stay
I broke all my bones that day I found you
Crying at the lake
Oh, all of my love just to keep you...
(Indie Reel Performance by Priyank Patel)`
};

// Playlists Definitions
const playlists = {
    chill: {
        id: "chill",
        title: "Chill Vibes",
        desc: "Relax, unwind and let the music flow with Priyank's soothing covers.",
        image: "image/Pal Pal Dil Ke Paas.jpg",
        songIds: ["pal-pal-dil-ke-paas", "husn", "kisi-ki-muskurahaton", "main-koi-aisa-geet-gaoon", "die-with-a-smile", "line-without-a-hook", "chudi-jo-khanki", "bulleya"]
    },
    hindi: {
        id: "hindi",
        title: "Hindi Romantics",
        desc: "Soulful Hindi melodies and classic love ballads sung by Priyank Patel.",
        image: "image/Chudi Jo Khanki.jpg",
        songIds: ["pal-pal-dil-ke-paas", "chudi-jo-khanki", "main-koi-aisa-geet-gaoon", "kisi-ki-muskurahaton", "husn", "bulleya"]
    },
    acoustic: {
        id: "acoustic",
        title: "Acoustic Hits",
        desc: "Raw, intimate vocals and acoustic arrangements by Priyank Patel.",
        image: "image/Husn.jpeg",
        songIds: ["husn", "bulleya", "die-with-a-smile", "line-without-a-hook"]
    },
    english: {
        id: "english",
        title: "English Ballads",
        desc: "Heartfelt English covers and vocal reels sung by Priyank Patel.",
        image: "image/Die With a Smile.jpeg",
        songIds: ["die-with-a-smile", "line-without-a-hook"]
    },
    liked: {
        id: "liked",
        title: "Liked Songs",
        desc: "Your personally favorited songs sung by Priyank Patel.",
        isLikedSpecial: true
    },
    all: {
        id: "all",
        title: "All Songs Collection",
        desc: "Complete studio & vocal recording portfolio of Priyank Patel.",
        image: "image/Pal Pal Dil Ke Paas.jpg",
        songIds: ["pal-pal-dil-ke-paas", "husn", "bulleya", "chudi-jo-khanki", "main-koi-aisa-geet-gaoon", "kisi-ki-muskurahaton", "die-with-a-smile", "line-without-a-hook"]
    }
};

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0 = off, 1 = repeat all, 2 = repeat one
let volume = 0.75;
let isMuted = false;
let currentView = "home"; // "home", "search", "playlist"
let activePlaylistKey = "chill";
let activePlaylistSongs = [...songsData];
let currentFilter = "all";
let searchQuery = "";
let likedSongIds = new Set();
const playHistory = [];

// Audio Element
const audio = document.getElementById("audio-engine");

// Views Containers
const homeView = document.getElementById("home-view");
const searchView = document.getElementById("search-view");
const playlistView = document.getElementById("playlist-view");
const contentScroll = document.getElementById("content-scroll");

// Search View Elements
const searchPageInput = document.getElementById("search-page-input");
const searchPageClearBtn = document.getElementById("search-page-clear-btn");
const searchResultsSection = document.getElementById("search-results-section");
const searchResultsList = document.getElementById("search-results-list");
const trendingList = document.getElementById("trending-list");
const trendingSeeAll = document.getElementById("trending-see-all");
const browseCards = document.querySelectorAll(".browse-card");

// Playlist View Elements
const backToHomeBtn = document.getElementById("back-to-home-btn");
const plArtwork = document.getElementById("pl-artwork");
const plArtworkHeart = document.getElementById("pl-artwork-heart");
const plTitle = document.getElementById("pl-title");
const plDesc = document.getElementById("pl-desc");
const plStats = document.getElementById("pl-stats");
const plPlayAllBtn = document.getElementById("pl-play-all-btn");
const plShuffleBtn = document.getElementById("pl-shuffle-btn");
const plHeartBtn = document.getElementById("pl-heart-btn");
const tracklistBody = document.getElementById("tracklist-body");

// Center View elements (Home)
const greetingText = document.getElementById("greeting-text");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");
const heroPlayBtn = document.getElementById("hero-play-btn");
const heroHeartBtn = document.getElementById("hero-heart-btn");
const heroMoreBtn = document.getElementById("hero-more-btn");
const quickPicksGrid = document.getElementById("quick-picks-grid");
const songCardsGrid = document.getElementById("song-cards-grid");
const mobileSongList = document.getElementById("mobile-song-list");
const filterChips = document.querySelectorAll(".filter-chip");
const globalSearch = document.getElementById("global-search");
const searchClearBtn = document.getElementById("search-clear-btn");
const likedSongsCount = document.getElementById("liked-songs-count");
const seeAllBtn = document.getElementById("see-all-btn");
const mixesSeeAll = document.getElementById("mixes-see-all");

// Topbar Elements
const historyBack = document.getElementById("history-back");
const historyForward = document.getElementById("history-forward");
const notifBtn = document.getElementById("notif-btn");
const topbarProfileTrigger = document.getElementById("topbar-profile-trigger");
const mobileBrandTrigger = document.getElementById("mobile-brand-trigger");
const brandLogoTrigger = document.getElementById("brand-logo-trigger");

// Right Panel (Desktop Now Playing) elements
const npAlbumArt = document.getElementById("np-album-art");
const npSongTitle = document.getElementById("np-song-title");
const npArtistName = document.getElementById("np-artist-name");
const npHeartBtn = document.getElementById("np-heart-btn");
const npProgressContainer = document.getElementById("np-progress-container");
const npProgressBar = document.getElementById("np-progress-bar");
const npProgressThumb = document.getElementById("np-progress-thumb");
const npTimeCurrent = document.getElementById("np-time-current");
const npTimeTotal = document.getElementById("np-time-total");
const npPlayPauseBtn = document.getElementById("np-play-pause-btn");
const npPrevBtn = document.getElementById("np-prev-btn");
const npNextBtn = document.getElementById("np-next-btn");
const npShuffleBtn = document.getElementById("np-shuffle-btn");
const npRepeatBtn = document.getElementById("np-repeat-btn");
const upNextList = document.getElementById("up-next-list");
const queueShuffleBtn = document.getElementById("queue-shuffle-btn");
const liveVisualizer = document.getElementById("live-visualizer");
const nowPlayingPanel = document.getElementById("now-playing-panel");
const closeNowPlaying = document.getElementById("close-now-playing");

// Desktop Bottom Player Bar elements
const playerMiniArt = document.getElementById("player-mini-art");
const playerMiniTitle = document.getElementById("player-mini-title");
const playerMiniArtist = document.getElementById("player-mini-artist");
const playerHeartBtn = document.getElementById("player-heart-btn");
const barPlayPauseBtn = document.getElementById("bar-play-pause-btn");
const barPrevBtn = document.getElementById("bar-prev-btn");
const barNextBtn = document.getElementById("bar-next-btn");
const barShuffleBtn = document.getElementById("bar-shuffle-btn");
const barRepeatBtn = document.getElementById("bar-repeat-btn");
const barScrubContainer = document.getElementById("bar-scrub-container");
const barScrubProgress = document.getElementById("bar-scrub-progress");
const barScrubThumb = document.getElementById("bar-scrub-thumb");
const barScrubHoverTime = document.getElementById("bar-scrub-hover-time");
const barCurrentTime = document.getElementById("bar-current-time");
const barDurationTime = document.getElementById("bar-duration-time");
const barVolumeBtn = document.getElementById("bar-volume-btn");
const barVolumeTrack = document.getElementById("bar-volume-track");
const barVolumeFill = document.getElementById("bar-volume-fill");
const barVolumeThumb = document.getElementById("bar-volume-thumb");
const barVolumePct = document.getElementById("bar-volume-pct");
const toggleQueueBtn = document.getElementById("toggle-queue-btn");
const toggleContactBtn = document.getElementById("toggle-contact-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const miniArtTrigger = document.getElementById("mini-art-trigger");

// Mobile Mini-Player elements
const mobileMiniPlayer = document.getElementById("mobile-mini-player");
const mmpOpenTrigger = document.getElementById("mmp-open-trigger");
const mmpArt = document.getElementById("mmp-art");
const mmpTitle = document.getElementById("mmp-title");
const mmpArtist = document.getElementById("mmp-artist");
const mmpHeartBtn = document.getElementById("mmp-heart-btn");
const mmpPlayBtn = document.getElementById("mmp-play-btn");
const mmpProgressBar = document.getElementById("mmp-progress-bar");

// Mobile Full-Screen Player (Screen 3)
const mobileFullPlayer = document.getElementById("mobile-full-player");
const mfpCollapseBtn = document.getElementById("mfp-collapse-btn");
const mfpContextName = document.getElementById("mfp-context-name");
const mfpMoreBtn = document.getElementById("mfp-more-btn");
const mfpArt = document.getElementById("mfp-art");
const mfpSongTitle = document.getElementById("mfp-song-title");
const mfpArtistName = document.getElementById("mfp-artist-name");
const mfpHeartBtn = document.getElementById("mfp-heart-btn");
const mfpProgressContainer = document.getElementById("mfp-progress-container");
const mfpProgressBar = document.getElementById("mfp-progress-bar");
const mfpProgressThumb = document.getElementById("mfp-progress-thumb");
const mfpTimeCurrent = document.getElementById("mfp-time-current");
const mfpTimeTotal = document.getElementById("mfp-time-total");
const mfpShuffleBtn = document.getElementById("mfp-shuffle-btn");
const mfpPrevBtn = document.getElementById("mfp-prev-btn");
const mfpPlayPauseBtn = document.getElementById("mfp-play-pause-btn");
const mfpNextBtn = document.getElementById("mfp-next-btn");
const mfpRepeatBtn = document.getElementById("mfp-repeat-btn");
const mfpDeviceBtn = document.getElementById("mfp-device-btn");
const mfpQueueBtn = document.getElementById("mfp-queue-btn");
const mfpLyricsCard = document.getElementById("mfp-lyrics-card");
const lyricsToggleTrigger = document.getElementById("lyrics-toggle-trigger");
const lyricsText = document.getElementById("lyrics-text");

// Mobile Navigation Bar
const mobNavHome = document.getElementById("mob-nav-home");
const mobNavSearch = document.getElementById("mob-nav-search");
const mobNavLibrary = document.getElementById("mob-nav-library");

// Settings Modal elements
const settingsModal = document.getElementById("settings-modal");
const settingsTrigger = document.getElementById("settings-trigger");
const modalClose = document.getElementById("modal-close");
const toastContainer = document.getElementById("toast-container");

// ==========================================================================
// 3. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    loadSavedData();
    updateGreeting();
    renderQuickPicks();
    renderSongCards();
    renderMobileSongList();
    renderTrendingList();
    updateLikedCount();
    
    // Set initial audio state
    audio.volume = volume;
    updateVolumeUI();
    
    // Load initial song (Pal Pal Dil Ke Paas)
    loadSong(currentSongIndex, false);
    
    // Attach event listeners
    initEventListeners();
    setupKeyboardShortcuts();
});

// ==========================================================================
// 4. STORAGE & RESTORATION
// ==========================================================================
function loadSavedData() {
    try {
        const savedLikes = localStorage.getItem("mytunes_liked_songs");
        if (savedLikes) {
            likedSongIds = new Set(JSON.parse(savedLikes));
        } else {
            likedSongIds = new Set(["pal-pal-dil-ke-paas", "husn", "chudi-jo-khanki"]);
        }

        const savedVol = localStorage.getItem("mytunes_volume");
        if (savedVol !== null) {
            volume = parseFloat(savedVol);
        }

        const savedShuffle = localStorage.getItem("mytunes_shuffle");
        if (savedShuffle !== null) {
            isShuffle = savedShuffle === "true";
            updateShuffleUI();
        }
    } catch (e) {
        console.error("Storage error:", e);
    }
}

function saveLikedSongs() {
    try {
        localStorage.setItem("mytunes_liked_songs", JSON.stringify([...likedSongIds]));
        updateLikedCount();
    } catch (e) {
        console.error("Could not save likes:", e);
    }
}

// ==========================================================================
// 5. GREETING & DYNAMIC TIME
// ==========================================================================
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "Good Afternoon, Priyank";
    
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning, Priyank";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon, Priyank";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Good Evening, Priyank";
    } else {
        greeting = "Good Night, Priyank";
    }
    
    if (greetingText) {
        greetingText.innerHTML = `${greeting} <span class="wave-emoji">👋</span>`;
    }
}

// ==========================================================================
// 6. VIEW SWITCHING (HOME, SEARCH, PLAYLIST)
// ==========================================================================

function openHomeView() {
    currentView = "home";
    if (playlistView) playlistView.style.display = "none";
    if (searchView) searchView.style.display = "none";
    if (homeView) homeView.style.display = "flex";

    // Update Nav Highlights
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    const navHome = document.getElementById("nav-home");
    if (navHome) navHome.classList.add("active");

    document.querySelectorAll(".mobile-nav-item").forEach(m => m.classList.remove("active"));
    if (mobNavHome) mobNavHome.classList.add("active");

    document.querySelectorAll(".playlist-item").forEach(p => p.classList.remove("active-playlist"));

    if (contentScroll) contentScroll.scrollTo({ top: 0, behavior: "smooth" });
}

function openSearchView() {
    currentView = "search";
    if (homeView) homeView.style.display = "none";
    if (playlistView) playlistView.style.display = "none";
    if (searchView) searchView.style.display = "flex";

    // Update Nav Highlights
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    const navSearch = document.getElementById("nav-search");
    if (navSearch) navSearch.classList.add("active");

    document.querySelectorAll(".mobile-nav-item").forEach(m => m.classList.remove("active"));
    if (mobNavSearch) mobNavSearch.classList.add("active");

    if (contentScroll) contentScroll.scrollTo({ top: 0, behavior: "smooth" });

    // Focus input
    setTimeout(() => {
        if (searchPageInput) searchPageInput.focus();
    }, 100);
}

function openPlaylistView(playlistKey) {
    activePlaylistKey = playlistKey || "chill";
    currentView = "playlist";

    // Update Sidebar Highlights
    document.querySelectorAll(".playlist-item").forEach(item => {
        item.classList.toggle("active-playlist", item.dataset.playlist === activePlaylistKey);
    });
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    document.querySelectorAll(".mobile-nav-item").forEach(m => m.classList.remove("active"));

    // Switch Views
    if (homeView) homeView.style.display = "none";
    if (searchView) searchView.style.display = "none";
    if (playlistView) playlistView.style.display = "flex";

    if (contentScroll) contentScroll.scrollTo({ top: 0, behavior: "smooth" });

    // Determine songs
    if (activePlaylistKey === "liked") {
        activePlaylistSongs = songsData.filter(s => likedSongIds.has(s.id));
    } else if (playlists[activePlaylistKey]) {
        const idList = playlists[activePlaylistKey].songIds;
        activePlaylistSongs = idList.map(id => songsData.find(s => s.id === id)).filter(Boolean);
    } else {
        activePlaylistSongs = [...songsData];
    }

    // Update Playlist Hero Header
    const pInfo = playlists[activePlaylistKey] || {
        title: "Playlist",
        desc: "Collection of vocal recordings by Priyank Patel.",
        image: "image/Pal Pal Dil Ke Paas.jpg"
    };

    if (plTitle) plTitle.textContent = pInfo.title;
    if (plDesc) plDesc.textContent = pInfo.desc;
    if (mfpContextName) mfpContextName.textContent = pInfo.title;

    // Artwork
    if (pInfo.isLikedSpecial) {
        if (plArtworkHeart) plArtworkHeart.style.display = "flex";
        if (plArtwork) plArtwork.style.display = "none";
    } else {
        if (plArtworkHeart) plArtworkHeart.style.display = "none";
        if (plArtwork) {
            plArtwork.style.display = "block";
            plArtwork.src = pInfo.image || "image/Pal Pal Dil Ke Paas.jpg";
        }
    }

    // Stats
    const totalSecs = activePlaylistSongs.reduce((acc, s) => acc + s.durationSec, 0);
    const totalMins = Math.round(totalSecs / 60);
    if (plStats) {
        plStats.textContent = `${activePlaylistSongs.length} songs, ${totalMins} min`;
    }

    updatePlaylistPlayAllBtn();
    renderTracklistTable();
}

// ==========================================================================
// 7. REAL-TIME SEARCH FUNCTIONALITY (DESKTOP & MOBILE SCREEN 2)
// ==========================================================================

function handleLiveSearch(query) {
    searchQuery = query.trim();

    // Sync input fields
    if (globalSearch && globalSearch.value !== searchQuery) globalSearch.value = searchQuery;
    if (searchPageInput && searchPageInput.value !== searchQuery) searchPageInput.value = searchQuery;

    // Toggle clear buttons
    if (searchClearBtn) searchClearBtn.classList.toggle("visible", searchQuery.length > 0);
    if (searchPageClearBtn) searchPageClearBtn.classList.toggle("visible", searchQuery.length > 0);

    if (currentView === "search") {
        renderSearchResults();
    } else if (currentView === "home") {
        renderSongCards();
        renderMobileSongList();
    } else if (currentView === "playlist") {
        renderTracklistTable();
    }
}

function renderSearchResults() {
    if (!searchResultsSection || !searchResultsList) return;

    if (searchQuery.length === 0) {
        searchResultsSection.style.display = "none";
        const browseAll = document.getElementById("browse-all-section");
        const trending = document.getElementById("trending-section");
        if (browseAll) browseAll.style.display = "flex";
        if (trending) trending.style.display = "flex";
        return;
    }

    // Show results section, hide browse & trending while typing
    searchResultsSection.style.display = "block";
    const browseAll = document.getElementById("browse-all-section");
    const trending = document.getElementById("trending-section");
    if (browseAll) browseAll.style.display = "none";
    if (trending) trending.style.display = "none";

    searchResultsList.innerHTML = "";
    const q = searchQuery.toLowerCase();

    const matches = songsData.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q) ||
        (lyricsDatabase[s.id] && lyricsDatabase[s.id].toLowerCase().includes(q))
    );

    if (matches.length === 0) {
        searchResultsList.innerHTML = `
            <div style="text-align: center; padding: 40px 16px; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 2.2rem; opacity: 0.3; margin-bottom: 12px; display: block;"></i>
                <p style="font-weight: 700; font-size: 1.1rem; color: var(--text-secondary);">No songs found for "${searchQuery}"</p>
                <p style="font-size: 0.85rem; margin-top: 4px;">Try searching for another song title like "Pal Pal", "Husn", or "Bulleya"</p>
            </div>
        `;
        return;
    }

    matches.forEach(song => {
        const originalIndex = songsData.findIndex(s => s.id === song.id);
        const isCurrent = originalIndex === currentSongIndex;
        const row = document.createElement("div");
        row.className = `trending-row ${isCurrent ? 'active' : ''}`;

        row.innerHTML = `
            <div class="tr-row-thumb">
                <img src="${song.image}" alt="${song.title}">
            </div>
            <div class="tr-row-info">
                <div class="tr-row-title">${highlightMatch(song.title, searchQuery)}</div>
                <div class="tr-row-artist">${song.artist} • ${song.tag}</div>
            </div>
            <button class="tr-row-btn" title="Play">
                <i class="fas ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
            </button>
        `;

        row.addEventListener("click", () => {
            currentSongIndex = originalIndex;
            loadSong(currentSongIndex, true);
        });

        searchResultsList.appendChild(row);
    });
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<span style="color: var(--accent-sunset); text-decoration: underline;">$1</span>`);
}

function clearAllSearch() {
    searchQuery = "";
    if (globalSearch) globalSearch.value = "";
    if (searchPageInput) searchPageInput.value = "";
    if (searchClearBtn) searchClearBtn.classList.remove("visible");
    if (searchPageClearBtn) searchPageClearBtn.classList.remove("visible");

    renderSearchResults();
    renderSongCards();
    renderMobileSongList();
    renderTracklistTable();
}

// ==========================================================================
// 8. RENDERING: QUICK PICKS, SONG CARDS, TRENDING & MOBILE LISTS
// ==========================================================================

function renderQuickPicks() {
    if (!quickPicksGrid) return;
    quickPicksGrid.innerHTML = "";

    const picks = songsData.slice(0, 6);

    picks.forEach((song, idx) => {
        const card = document.createElement("div");
        card.className = `quick-pick-card ${idx === currentSongIndex ? 'active' : ''}`;
        card.dataset.index = idx;

        const isCurrent = idx === currentSongIndex;

        card.innerHTML = `
            <div class="qp-thumb">
                <img src="${song.image}" alt="${song.title}" loading="lazy">
                ${isCurrent && isPlaying ? `
                    <div class="qp-wave-bars">
                        <span></span><span></span><span></span>
                    </div>
                ` : ''}
            </div>
            <div class="qp-info">
                <div class="qp-title">${song.title}</div>
                <div class="qp-subtitle">Priyank Patel • ${song.tag}</div>
            </div>
            <button class="qp-play-btn" title="Play ${song.title}">
                <i class="fas ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
            </button>
        `;

        card.addEventListener("click", () => {
            if (currentSongIndex === idx) {
                togglePlayPause();
            } else {
                currentSongIndex = idx;
                loadSong(currentSongIndex, true);
            }
        });

        quickPicksGrid.appendChild(card);
    });
}

function renderSongCards() {
    if (!songCardsGrid) return;
    songCardsGrid.innerHTML = "";

    let displayedSongs = [...songsData];

    if (currentFilter === "hindi") {
        displayedSongs = songsData.filter(s => s.language === "hindi");
    } else if (currentFilter === "english") {
        displayedSongs = songsData.filter(s => s.language === "english");
    } else if (currentFilter === "liked") {
        displayedSongs = songsData.filter(s => likedSongIds.has(s.id));
    }

    if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        displayedSongs = displayedSongs.filter(s => 
            s.title.toLowerCase().includes(q) || 
            s.tag.toLowerCase().includes(q) ||
            s.language.toLowerCase().includes(q)
        );
    }

    if (displayedSongs.length === 0) {
        songCardsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: var(--text-muted);">
                <i class="fas fa-music" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 12px; display: block;"></i>
                <p style="font-weight: 700; font-size: 1.1rem; color: var(--text-secondary);">No songs match your selection</p>
                <p style="font-size: 0.85rem; margin-top: 4px;">Try searching for another melody or clearing the filter</p>
            </div>
        `;
        return;
    }

    displayedSongs.forEach((song) => {
        const originalIndex = songsData.findIndex(s => s.id === song.id);
        const isCurrent = originalIndex === currentSongIndex;
        const isLiked = likedSongIds.has(song.id);

        const card = document.createElement("div");
        card.className = `song-card ${isCurrent ? 'active' : ''}`;
        card.dataset.index = originalIndex;

        card.innerHTML = `
            <div class="song-card-artwork">
                <img src="${song.image}" alt="${song.title}" loading="lazy">
                <button class="song-card-play-overlay" title="Play ${song.title}">
                    <i class="fas ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                </button>
            </div>
            <div class="song-card-info">
                <div class="song-card-title">${song.title}</div>
                <div class="song-card-meta-row">
                    <span class="song-card-artist">${song.artist}</span>
                    <button class="song-card-like-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}" title="Like">
                        <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        card.addEventListener("click", (e) => {
            if (e.target.closest(".song-card-like-btn")) {
                e.stopPropagation();
                toggleLikeSong(song.id);
                return;
            }
            if (currentSongIndex === originalIndex) {
                togglePlayPause();
            } else {
                currentSongIndex = originalIndex;
                loadSong(currentSongIndex, true);
            }
        });

        songCardsGrid.appendChild(card);
    });

    // Liked Songs Special Card
    if (currentFilter === "all" && searchQuery === "") {
        const likedCard = document.createElement("div");
        likedCard.className = "song-card liked-special-card";
        likedCard.innerHTML = `
            <div class="song-card-artwork liked-special-artwork">
                <i class="fas fa-heart"></i>
                <button class="song-card-play-overlay" title="Open Liked Songs">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="song-card-info">
                <div class="song-card-title">Liked Songs</div>
                <div class="song-card-meta-row">
                    <span class="song-card-artist">${likedSongIds.size} songs</span>
                    <i class="fas fa-sparkles" style="color: var(--accent-sunset); font-size: 0.8rem;"></i>
                </div>
            </div>
        `;
        likedCard.addEventListener("click", () => {
            openPlaylistView("liked");
        });
        songCardsGrid.appendChild(likedCard);
    }
}

// Mobile Vertical List for Screen 1 (Fully Filter-Aware for Mobile Responsive screen)
function renderMobileSongList() {
    if (!mobileSongList) return;
    mobileSongList.innerHTML = "";

    let displayedSongs = [...songsData];

    if (currentFilter === "hindi") {
        displayedSongs = songsData.filter(s => s.language === "hindi");
    } else if (currentFilter === "english") {
        displayedSongs = songsData.filter(s => s.language === "english");
    } else if (currentFilter === "liked") {
        displayedSongs = songsData.filter(s => likedSongIds.has(s.id));
    }

    if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        displayedSongs = displayedSongs.filter(s =>
            s.title.toLowerCase().includes(q) ||
            s.tag.toLowerCase().includes(q) ||
            s.language.toLowerCase().includes(q)
        );
    }

    if (displayedSongs.length === 0) {
        mobileSongList.innerHTML = `
            <div style="text-align: center; padding: 36px 16px; color: var(--text-muted); background: var(--card-bg); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); margin: 8px 0;">
                <i class="${currentFilter === 'liked' ? 'far fa-heart' : 'fas fa-music'}" style="font-size: 2rem; opacity: 0.45; margin-bottom: 10px; display: block; color: var(--accent-sunset);"></i>
                <p style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">
                    ${currentFilter === 'liked' ? 'No liked songs yet' : 'No songs found in this category'}
                </p>
                <p style="font-size: 0.8rem; margin-top: 4px; color: var(--text-muted);">
                    ${currentFilter === 'liked' ? 'Tap the heart icon on any song to save it here!' : 'Try selecting All Songs or clearing your search'}
                </p>
            </div>
        `;
        return;
    }

    displayedSongs.forEach((song) => {
        const originalIndex = songsData.findIndex(s => s.id === song.id);
        const isCurrent = originalIndex === currentSongIndex;
        const row = document.createElement("div");
        row.className = `mobile-song-row ${isCurrent ? 'active' : ''}`;
        row.dataset.index = originalIndex;

        row.innerHTML = `
            <div class="msr-thumb">
                <img src="${song.image}" alt="${song.title}" loading="lazy">
            </div>
            <div class="msr-info">
                <div class="msr-title">${song.title}</div>
                <div class="msr-artist">${song.artist} • ${song.durationFormatted}</div>
            </div>
            <button class="msr-play-btn" title="${isCurrent && isPlaying ? 'Pause' : 'Play'}">
                <i class="fas ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
            </button>
        `;

        row.addEventListener("click", () => {
            if (currentSongIndex === originalIndex) {
                togglePlayPause();
            } else {
                currentSongIndex = originalIndex;
                loadSong(currentSongIndex, true);
            }
        });

        mobileSongList.appendChild(row);
    });
}

// Trending List for Screen 2
function renderTrendingList() {
    if (!trendingList) return;
    trendingList.innerHTML = "";

    songsData.slice(0, 5).forEach((song, idx) => {
        const isCurrent = idx === currentSongIndex;
        const row = document.createElement("div");
        row.className = `trending-row ${isCurrent ? 'active' : ''}`;

        row.innerHTML = `
            <div class="tr-row-thumb">
                <img src="${song.image}" alt="${song.title}">
            </div>
            <div class="tr-row-info">
                <div class="tr-row-title">${song.title}</div>
                <div class="tr-row-artist">${song.artist}</div>
            </div>
            <button class="tr-row-btn" title="Options">
                <i class="fas fa-ellipsis-v"></i>
            </button>
        `;

        row.addEventListener("click", (e) => {
            if (e.target.closest(".tr-row-btn")) {
                e.stopPropagation();
                openSettingsModal();
                return;
            }
            currentSongIndex = idx;
            loadSong(currentSongIndex, true);
        });

        trendingList.appendChild(row);
    });
}

// Up Next Queue in Right Panel
function renderUpNextQueue() {
    if (!upNextList) return;
    upNextList.innerHTML = "";

    const queue = [];
    const total = songsData.length;

    for (let i = 1; i < total; i++) {
        const nextIdx = (currentSongIndex + i) % total;
        queue.push({ ...songsData[nextIdx], originalIndex: nextIdx });
    }

    queue.forEach((item) => {
        const row = document.createElement("div");
        row.className = "queue-item";
        row.innerHTML = `
            <div class="queue-thumb">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="queue-info">
                <div class="queue-name">${item.title}</div>
                <div class="queue-artist">${item.artist} • ${item.durationFormatted}</div>
            </div>
            <button class="queue-more-btn" title="Play Next">
                <i class="fas fa-play"></i>
            </button>
        `;

        row.addEventListener("click", () => {
            currentSongIndex = item.originalIndex;
            loadSong(currentSongIndex, true);
        });

        upNextList.appendChild(row);
    });
}

// Dedicated Tracklist Table (Playlist View)
function renderTracklistTable() {
    if (!tracklistBody) return;
    tracklistBody.innerHTML = "";

    let displayedSongs = [...activePlaylistSongs];

    if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        displayedSongs = displayedSongs.filter(s =>
            s.title.toLowerCase().includes(q) ||
            s.tag.toLowerCase().includes(q) ||
            s.language.toLowerCase().includes(q)
        );
    }

    if (displayedSongs.length === 0) {
        tracklistBody.innerHTML = `
            <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
                <i class="far fa-heart" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 12px; display: block;"></i>
                <p style="font-weight: 700; font-size: 1.1rem; color: var(--text-secondary);">No songs found in this playlist</p>
                <p style="font-size: 0.85rem; margin-top: 4px;">Click the heart icon on any song to add it here!</p>
            </div>
        `;
        return;
    }

    displayedSongs.forEach((song, trackIndex) => {
        const isCurrentSong = (songsData[currentSongIndex].id === song.id);
        const isCurrentActive = isCurrentSong && isPlaying;
        const isLiked = likedSongIds.has(song.id);

        const row = document.createElement("div");
        row.className = `tracklist-row ${isCurrentSong ? 'active' : ''} ${isCurrentActive ? 'playing' : ''}`;
        row.dataset.songId = song.id;

        row.innerHTML = `
            <div class="tr-col-num">
                <span class="tr-num-text">${trackIndex + 1}</span>
                <i class="fas ${isCurrentActive ? 'fa-pause' : 'fa-play'} tr-play-icon"></i>
                <div class="tr-equalizer">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <div class="tr-col-title">
                <div class="tr-thumb">
                    <img src="${song.image}" alt="${song.title}" loading="lazy">
                </div>
                <div class="tr-title-group">
                    <span class="tr-song-title">${song.title}</span>
                    <span class="tr-song-artist">${song.artist}</span>
                </div>
            </div>
            <div class="tr-col-tag">
                <span class="tr-tag-badge">${song.tag}</span>
            </div>
            <div class="tr-col-time">${song.durationFormatted}</div>
            <div class="tr-col-like">
                <button class="tr-like-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}" title="Like">
                    <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
        `;

        row.addEventListener("click", (e) => {
            if (e.target.closest(".tr-like-btn")) {
                e.stopPropagation();
                toggleLikeSong(song.id);
                return;
            }

            const targetIdx = songsData.findIndex(s => s.id === song.id);
            if (targetIdx !== -1) {
                if (currentSongIndex === targetIdx) {
                    togglePlayPause();
                } else {
                    currentSongIndex = targetIdx;
                    loadSong(currentSongIndex, true);
                }
            }
        });

        tracklistBody.appendChild(row);
    });
}

function updateTracklistUI() {
    if (!tracklistBody) return;
    const currentId = songsData[currentSongIndex].id;

    const rows = tracklistBody.querySelectorAll(".tracklist-row");
    rows.forEach(row => {
        const isCurrent = (row.dataset.songId === currentId);
        row.classList.toggle("active", isCurrent);
        row.classList.toggle("playing", isCurrent && isPlaying);

        const playIcon = row.querySelector(".tr-play-icon");
        if (playIcon) {
            playIcon.className = `fas ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'} tr-play-icon`;
        }
    });

    updatePlaylistPlayAllBtn();
}

function updatePlaylistPlayAllBtn() {
    if (!plPlayAllBtn) return;
    const isThisPlaylistPlaying = isPlaying && activePlaylistSongs.some(s => s.id === songsData[currentSongIndex].id);
    plPlayAllBtn.innerHTML = `
        <i class="fas ${isThisPlaylistPlaying ? 'fa-pause' : 'fa-play'}"></i>
        <span>${isThisPlaylistPlaying ? 'Pause' : 'Play All'}</span>
    `;
}

function updateLikedCount() {
    if (likedSongsCount) {
        likedSongsCount.textContent = `${likedSongIds.size} songs`;
    }
}

// ==========================================================================
// 9. AUDIO ENGINE & PLAYBACK CONTROLS
// ==========================================================================

function loadSong(index, autoPlay = false) {
    if (index < 0 || index >= songsData.length) return;
    currentSongIndex = index;
    const song = songsData[currentSongIndex];

    audio.src = song.file;
    audio.load();

    // 1. Desktop Right Panel
    if (npAlbumArt) npAlbumArt.src = song.image;
    if (npSongTitle) npSongTitle.textContent = song.title;
    if (npArtistName) npArtistName.textContent = song.artist;
    if (npTimeCurrent) npTimeCurrent.textContent = "0:00";
    if (npTimeTotal) npTimeTotal.textContent = song.durationFormatted;
    if (npProgressBar) npProgressBar.style.width = "0%";
    if (npProgressThumb) npProgressThumb.style.left = "0%";

    // 2. Desktop Bottom Player Bar
    if (playerMiniArt) playerMiniArt.src = song.image;
    if (playerMiniTitle) playerMiniTitle.textContent = song.title;
    if (playerMiniArtist) playerMiniArtist.textContent = song.artist;
    if (barCurrentTime) barCurrentTime.textContent = "0:00";
    if (barDurationTime) barDurationTime.textContent = song.durationFormatted;
    if (barScrubProgress) barScrubProgress.style.width = "0%";
    if (barScrubThumb) barScrubThumb.style.left = "0%";

    // 3. Mobile Mini-Player
    if (mmpArt) mmpArt.src = song.image;
    if (mmpTitle) mmpTitle.textContent = song.title;
    if (mmpArtist) mmpArtist.textContent = song.artist;
    if (mmpProgressBar) mmpProgressBar.style.width = "0%";

    // 4. Mobile Full-Screen Player (Screen 3)
    if (mfpArt) mfpArt.src = song.image;
    if (mfpSongTitle) mfpSongTitle.textContent = song.title;
    if (mfpArtistName) mfpArtistName.textContent = song.artist;
    if (mfpTimeCurrent) mfpTimeCurrent.textContent = "0:00";
    if (mfpTimeTotal) mfpTimeTotal.textContent = song.durationFormatted;
    if (mfpProgressBar) mfpProgressBar.style.width = "0%";
    if (mfpProgressThumb) mfpProgressThumb.style.left = "0%";

    // 5. Lyrics Content
    if (lyricsText) {
        lyricsText.textContent = lyricsDatabase[song.id] || "Lyrics not available for this recording.";
    }

    // 6. Heart Buttons Sync
    const isLiked = likedSongIds.has(song.id);
    updateHeartButtons(isLiked);

    // 7. Media Session
    updateMediaSession(song);

    // 8. Re-render UI highlights
    renderQuickPicks();
    renderSongCards();
    renderMobileSongList();
    renderTrendingList();
    renderUpNextQueue();
    updateTracklistUI();

    if (autoPlay) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    audio.play().then(() => {
        isPlaying = true;
        updatePlayPauseUI();
        if (liveVisualizer) liveVisualizer.classList.add("playing");
    }).catch(err => {
        console.warn("Audio play prevented:", err);
        isPlaying = false;
        updatePlayPauseUI();
    });
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
    updatePlayPauseUI();
    if (liveVisualizer) liveVisualizer.classList.remove("playing");
}

function togglePlayPause() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playNextSong() {
    playHistory.push(currentSongIndex);
    if (playHistory.length > 20) playHistory.shift();

    if (isShuffle) {
        let randIdx;
        do {
            randIdx = Math.floor(Math.random() * songsData.length);
        } while (randIdx === currentSongIndex && songsData.length > 1);
        currentSongIndex = randIdx;
    } else {
        currentSongIndex = (currentSongIndex + 1) % songsData.length;
    }

    loadSong(currentSongIndex, true);
    showToast(`Playing ${songsData[currentSongIndex].title}`, "fa-play");
}

function playPrevSong() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }

    if (playHistory.length > 0) {
        currentSongIndex = playHistory.pop();
    } else {
        currentSongIndex = (currentSongIndex - 1 + songsData.length) % songsData.length;
    }

    loadSong(currentSongIndex, true);
    showToast(`Playing ${songsData[currentSongIndex].title}`, "fa-play");
}

function updatePlayPauseUI() {
    const playIcon = isPlaying ? "fa-pause" : "fa-play";

    if (npPlayPauseBtn) npPlayPauseBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
    if (barPlayPauseBtn) barPlayPauseBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
    if (heroPlayBtn) heroPlayBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
    if (mmpPlayBtn) mmpPlayBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;
    if (mfpPlayPauseBtn) mfpPlayPauseBtn.innerHTML = `<i class="fas ${playIcon}"></i>`;

    renderQuickPicks();
    renderSongCards();
    renderMobileSongList();
    renderTrendingList();
    updateTracklistUI();
}

function updateHeartButtons(isLiked) {
    const iconClass = isLiked ? "fas fa-heart" : "far fa-heart";

    if (npHeartBtn) {
        npHeartBtn.innerHTML = `<i class="${iconClass}"></i>`;
        npHeartBtn.classList.toggle("liked", isLiked);
    }
    if (playerHeartBtn) {
        playerHeartBtn.innerHTML = `<i class="${iconClass}"></i>`;
        playerHeartBtn.classList.toggle("liked", isLiked);
    }
    if (heroHeartBtn) {
        heroHeartBtn.innerHTML = `<i class="${iconClass}"></i>`;
        heroHeartBtn.classList.toggle("active", isLiked);
    }
    if (mmpHeartBtn) {
        mmpHeartBtn.innerHTML = `<i class="${iconClass}"></i>`;
        mmpHeartBtn.classList.toggle("liked", isLiked);
    }
    if (mfpHeartBtn) {
        mfpHeartBtn.innerHTML = `<i class="${iconClass}"></i>`;
        mfpHeartBtn.classList.toggle("liked", isLiked);
    }
}

function toggleLikeSong(songId) {
    if (!songId) songId = songsData[currentSongIndex].id;

    if (likedSongIds.has(songId)) {
        likedSongIds.delete(songId);
        showToast("Removed from Liked Songs", "fa-heart-crack");
    } else {
        likedSongIds.add(songId);
        showToast("Saved to Liked Songs", "fa-heart");
    }

    saveLikedSongs();
    const isCurrentLiked = likedSongIds.has(songsData[currentSongIndex].id);
    updateHeartButtons(isCurrentLiked);
    renderSongCards();
    renderMobileSongList();
    renderTracklistTable();
}

function updateMediaSession(song) {
    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            album: "Priyank Patel Vocal Sessions",
            artwork: [
                { src: song.image, sizes: "512x512", type: "image/jpeg" }
            ]
        });

        navigator.mediaSession.setActionHandler("play", playAudio);
        navigator.mediaSession.setActionHandler("pause", pauseAudio);
        navigator.mediaSession.setActionHandler("previoustrack", playPrevSong);
        navigator.mediaSession.setActionHandler("nexttrack", playNextSong);
    }
}

// ==========================================================================
// 10. PROGRESS & SCRUBBING
// ==========================================================================

audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const current = audio.currentTime;
    const total = audio.duration;
    const pct = (current / total) * 100;
    const formattedCurrent = formatTime(current);

    // Desktop Right Panel
    if (npProgressBar) npProgressBar.style.width = `${pct}%`;
    if (npProgressThumb) npProgressThumb.style.left = `${pct}%`;
    if (npTimeCurrent) npTimeCurrent.textContent = formattedCurrent;

    // Desktop Bottom Bar
    if (barScrubProgress) barScrubProgress.style.width = `${pct}%`;
    if (barScrubThumb) barScrubThumb.style.left = `${pct}%`;
    if (barCurrentTime) barCurrentTime.textContent = formattedCurrent;

    // Mobile Mini-Player
    if (mmpProgressBar) mmpProgressBar.style.width = `${pct}%`;

    // Mobile Full-Screen Player
    if (mfpProgressBar) mfpProgressBar.style.width = `${pct}%`;
    if (mfpProgressThumb) mfpProgressThumb.style.left = `${pct}%`;
    if (mfpTimeCurrent) mfpTimeCurrent.textContent = formattedCurrent;
});

audio.addEventListener("loadedmetadata", () => {
    const formatted = formatTime(audio.duration);
    if (npTimeTotal) npTimeTotal.textContent = formatted;
    if (barDurationTime) barDurationTime.textContent = formatted;
    if (mfpTimeTotal) mfpTimeTotal.textContent = formatted;
});

audio.addEventListener("ended", () => {
    if (repeatMode === 2) {
        audio.currentTime = 0;
        playAudio();
    } else {
        playNextSong();
    }
});

function handleScrub(e, container) {
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = Math.max(0, Math.min(1, clickX / width));

    if (audio.duration) {
        audio.currentTime = ratio * audio.duration;
    }
}

// ==========================================================================
// 11. VOLUME & CONTROLS
// ==========================================================================

function setVolume(val) {
    volume = Math.max(0, Math.min(1, val));
    isMuted = (volume === 0);
    audio.volume = isMuted ? 0 : volume;
    localStorage.setItem("mytunes_volume", volume.toString());
    updateVolumeUI();
}

function toggleMute() {
    isMuted = !isMuted;
    audio.volume = isMuted ? 0 : volume;
    updateVolumeUI();
}

function updateVolumeUI() {
    const displayVol = isMuted ? 0 : volume;
    const pct = Math.round(displayVol * 100);

    if (barVolumeFill) barVolumeFill.style.width = `${pct}%`;
    if (barVolumeThumb) barVolumeThumb.style.left = `${pct}%`;
    if (barVolumePct) barVolumePct.textContent = `${pct}%`;

    let icon = "fa-volume-high";
    if (isMuted || displayVol === 0) icon = "fa-volume-xmark";
    else if (displayVol < 0.45) icon = "fa-volume-low";

    if (barVolumeBtn) barVolumeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    localStorage.setItem("mytunes_shuffle", isShuffle.toString());
    updateShuffleUI();
    showToast(isShuffle ? "Shuffle turned ON" : "Shuffle turned OFF", "fa-shuffle");
}

function updateShuffleUI() {
    if (npShuffleBtn) npShuffleBtn.classList.toggle("active", isShuffle);
    if (barShuffleBtn) barShuffleBtn.classList.toggle("active", isShuffle);
    if (mfpShuffleBtn) mfpShuffleBtn.classList.toggle("active", isShuffle);
}

function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    const labels = ["Repeat: Off", "Repeat: All Tracks", "Repeat: Single Track"];
    const icons = ["fa-repeat", "fa-repeat", "fa-1"];

    if (npRepeatBtn) {
        npRepeatBtn.classList.toggle("active", repeatMode > 0);
        npRepeatBtn.innerHTML = `<i class="fas ${icons[repeatMode]}"></i>`;
    }
    if (barRepeatBtn) {
        barRepeatBtn.classList.toggle("active", repeatMode > 0);
        barRepeatBtn.innerHTML = `<i class="fas ${icons[repeatMode]}"></i>`;
    }
    if (mfpRepeatBtn) {
        mfpRepeatBtn.classList.toggle("active", repeatMode > 0);
        mfpRepeatBtn.innerHTML = `<i class="fas ${icons[repeatMode]}"></i>`;
    }

    showToast(labels[repeatMode], "fa-repeat");
}

// ==========================================================================
// 12. EVENT LISTENERS SETUP
// ==========================================================================
function initEventListeners() {
    // 1. Play / Pause
    if (npPlayPauseBtn) npPlayPauseBtn.addEventListener("click", togglePlayPause);
    if (barPlayPauseBtn) barPlayPauseBtn.addEventListener("click", togglePlayPause);
    if (heroPlayBtn) heroPlayBtn.addEventListener("click", togglePlayPause);
    if (mmpPlayBtn) mmpPlayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePlayPause();
    });
    if (mfpPlayPauseBtn) mfpPlayPauseBtn.addEventListener("click", togglePlayPause);

    // 2. Prev / Next
    if (npPrevBtn) npPrevBtn.addEventListener("click", playPrevSong);
    if (npNextBtn) npNextBtn.addEventListener("click", playNextSong);
    if (barPrevBtn) barPrevBtn.addEventListener("click", playPrevSong);
    if (barNextBtn) barNextBtn.addEventListener("click", playNextSong);
    if (mfpPrevBtn) mfpPrevBtn.addEventListener("click", playPrevSong);
    if (mfpNextBtn) mfpNextBtn.addEventListener("click", playNextSong);

    // 3. Shuffle & Repeat
    if (npShuffleBtn) npShuffleBtn.addEventListener("click", toggleShuffle);
    if (barShuffleBtn) barShuffleBtn.addEventListener("click", toggleShuffle);
    if (mfpShuffleBtn) mfpShuffleBtn.addEventListener("click", toggleShuffle);
    if (npRepeatBtn) npRepeatBtn.addEventListener("click", toggleRepeat);
    if (barRepeatBtn) barRepeatBtn.addEventListener("click", toggleRepeat);
    if (mfpRepeatBtn) mfpRepeatBtn.addEventListener("click", toggleRepeat);

    // 4. Like Buttons
    if (npHeartBtn) npHeartBtn.addEventListener("click", () => toggleLikeSong());
    if (playerHeartBtn) playerHeartBtn.addEventListener("click", () => toggleLikeSong());
    if (heroHeartBtn) heroHeartBtn.addEventListener("click", () => toggleLikeSong());
    if (mmpHeartBtn) mmpHeartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLikeSong();
    });
    if (mfpHeartBtn) mfpHeartBtn.addEventListener("click", () => toggleLikeSong());

    // 5. Scrubbing
    if (npProgressContainer) {
        npProgressContainer.addEventListener("click", (e) => handleScrub(e, npProgressContainer));
    }
    if (mfpProgressContainer) {
        mfpProgressContainer.addEventListener("click", (e) => handleScrub(e, mfpProgressContainer));
    }
    if (barScrubContainer) {
        barScrubContainer.addEventListener("click", (e) => handleScrub(e, barScrubContainer));
        barScrubContainer.addEventListener("mousemove", (e) => {
            const rect = barScrubContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = Math.max(0, Math.min(1, clickX / rect.width));
            if (audio.duration && barScrubHoverTime) {
                barScrubHoverTime.textContent = formatTime(ratio * audio.duration);
                barScrubHoverTime.style.display = "block";
                barScrubHoverTime.style.left = `${clickX}px`;
            }
        });
        barScrubContainer.addEventListener("mouseleave", () => {
            if (barScrubHoverTime) barScrubHoverTime.style.display = "none";
        });
    }

    // 6. Volume
    if (barVolumeBtn) barVolumeBtn.addEventListener("click", toggleMute);
    if (barVolumeTrack) {
        barVolumeTrack.addEventListener("click", (e) => {
            const rect = barVolumeTrack.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            setVolume(clickX / rect.width);
        });
    }

    // 7. Live Search Inputs
    if (globalSearch) {
        globalSearch.addEventListener("input", (e) => handleLiveSearch(e.target.value));
    }
    if (searchPageInput) {
        searchPageInput.addEventListener("input", (e) => handleLiveSearch(e.target.value));
    }
    if (searchClearBtn) {
        searchClearBtn.addEventListener("click", clearAllSearch);
    }
    if (searchPageClearBtn) {
        searchPageClearBtn.addEventListener("click", clearAllSearch);
    }

    // 8. Filter Chips on Home (Works on both Desktop & Mobile Responsive screen)
    filterChips.forEach(chip => {
        chip.addEventListener("click", () => {
            currentFilter = chip.dataset.filter;
            filterChips.forEach(c => c.classList.toggle("active", c === chip));
            renderSongCards();
            renderMobileSongList();
        });
    });

    // 9. Playlist Navigation
    const playlistItems = document.querySelectorAll(".playlist-item");
    playlistItems.forEach(item => {
        item.addEventListener("click", () => openPlaylistView(item.dataset.playlist));
    });

    if (backToHomeBtn) backToHomeBtn.addEventListener("click", openHomeView);
    if (seeAllBtn) seeAllBtn.addEventListener("click", () => openPlaylistView("all"));
    if (mixesSeeAll) mixesSeeAll.addEventListener("click", () => openPlaylistView("all"));
    if (trendingSeeAll) trendingSeeAll.addEventListener("click", () => openPlaylistView("all"));

    if (heroTitle) {
        heroTitle.addEventListener("click", () => openPlaylistView("chill"));
    }

    // Browse All Category Cards in Search View (Screen 2)
    browseCards.forEach(card => {
        card.addEventListener("click", () => {
            const pKey = card.dataset.playlist;
            if (pKey) openPlaylistView(pKey);
        });
    });

    // Playlist Action Buttons
    if (plPlayAllBtn) {
        plPlayAllBtn.addEventListener("click", () => {
            if (activePlaylistSongs.length === 0) return;
            const isCurrentInPlaylist = activePlaylistSongs.some(s => s.id === songsData[currentSongIndex].id);
            if (isCurrentInPlaylist) {
                togglePlayPause();
            } else {
                const targetIdx = songsData.findIndex(s => s.id === activePlaylistSongs[0].id);
                if (targetIdx !== -1) {
                    currentSongIndex = targetIdx;
                    loadSong(currentSongIndex, true);
                }
            }
        });
    }

    if (plShuffleBtn) {
        plShuffleBtn.addEventListener("click", () => {
            if (activePlaylistSongs.length === 0) return;
            isShuffle = true;
            updateShuffleUI();
            const randItem = activePlaylistSongs[Math.floor(Math.random() * activePlaylistSongs.length)];
            const targetIdx = songsData.findIndex(s => s.id === randItem.id);
            if (targetIdx !== -1) {
                currentSongIndex = targetIdx;
                loadSong(currentSongIndex, true);
                showToast(`Shuffled: ${randItem.title}`, "fa-shuffle");
            }
        });
    }

    if (plHeartBtn) {
        plHeartBtn.addEventListener("click", () => {
            activePlaylistSongs.forEach(s => likedSongIds.add(s.id));
            saveLikedSongs();
            renderTracklistTable();
            renderSongCards();
            renderMobileSongList();
            showToast("Saved all songs in this playlist to Liked Songs!", "fa-heart");
        });
    }

    // 10. Mobile Full-Screen Player Open & Collapse (Screen 3)
    if (mmpOpenTrigger) {
        mmpOpenTrigger.addEventListener("click", () => {
            if (mobileFullPlayer) mobileFullPlayer.classList.add("open");
        });
    }
    if (mfpCollapseBtn) {
        mfpCollapseBtn.addEventListener("click", () => {
            if (mobileFullPlayer) mobileFullPlayer.classList.remove("open");
        });
    }
    if (miniArtTrigger) {
        miniArtTrigger.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                if (mobileFullPlayer) mobileFullPlayer.classList.add("open");
            } else {
                if (nowPlayingPanel) nowPlayingPanel.classList.toggle("open");
            }
        });
    }

    // Expandable Lyrics Drawer in MFP
    if (lyricsToggleTrigger) {
        lyricsToggleTrigger.addEventListener("click", () => {
            if (mfpLyricsCard) mfpLyricsCard.classList.toggle("expanded");
        });
    }

    // MFP Utility Buttons
    if (mfpDeviceBtn) {
        mfpDeviceBtn.addEventListener("click", () => {
            showToast("Audio output: High Fidelity Stereo Audio", "fa-podcast");
        });
    }
    if (mfpQueueBtn) {
        mfpQueueBtn.addEventListener("click", () => {
            if (mobileFullPlayer) mobileFullPlayer.classList.remove("open");
            openPlaylistView(activePlaylistKey);
        });
    }
    if (mfpMoreBtn) {
        mfpMoreBtn.addEventListener("click", openSettingsModal);
    }

    // 11. Navigation Items (Desktop & Mobile)
    const navHome = document.getElementById("nav-home");
    const navSearch = document.getElementById("nav-search");
    const navLibrary = document.getElementById("nav-library");

    if (navHome) navHome.addEventListener("click", openHomeView);
    if (navSearch) navSearch.addEventListener("click", openSearchView);
    if (navLibrary) navLibrary.addEventListener("click", () => openPlaylistView("all"));

    if (mobNavHome) mobNavHome.addEventListener("click", openHomeView);
    if (mobNavSearch) mobNavSearch.addEventListener("click", openSearchView);
    if (mobNavLibrary) mobNavLibrary.addEventListener("click", () => openPlaylistView("all"));

    if (mobileBrandTrigger) mobileBrandTrigger.addEventListener("click", openHomeView);
    if (brandLogoTrigger) brandLogoTrigger.addEventListener("click", openHomeView);

    // 12. History Controls
    if (historyBack) {
        historyBack.addEventListener("click", () => {
            if (currentView !== "home") {
                openHomeView();
            } else {
                playPrevSong();
            }
        });
    }
    if (historyForward) {
        historyForward.addEventListener("click", playNextSong);
    }

    // 13. Notifications, Modals & Fullscreen
    if (notifBtn) {
        notifBtn.addEventListener("click", () => {
            showToast("Latest vocal release: Pal Pal Dil Ke Paas - Priyank Patel", "fa-bell");
        });
    }
    if (heroMoreBtn) heroMoreBtn.addEventListener("click", openSettingsModal);
    if (queueShuffleBtn) {
        queueShuffleBtn.addEventListener("click", () => {
            toggleShuffle();
            renderUpNextQueue();
        });
    }
    if (toggleQueueBtn) {
        toggleQueueBtn.addEventListener("click", () => {
            if (nowPlayingPanel) nowPlayingPanel.classList.toggle("open");
        });
    }
    if (closeNowPlaying) {
        closeNowPlaying.addEventListener("click", () => {
            if (nowPlayingPanel) nowPlayingPanel.classList.remove("open");
        });
    }
    if (toggleContactBtn) toggleContactBtn.addEventListener("click", openSettingsModal);
    if (topbarProfileTrigger) topbarProfileTrigger.addEventListener("click", openSettingsModal);
    if (settingsTrigger) settingsTrigger.addEventListener("click", openSettingsModal);
    if (modalClose) modalClose.addEventListener("click", closeSettingsModal);
    if (settingsModal) {
        settingsModal.addEventListener("click", (e) => {
            if (e.target === settingsModal) closeSettingsModal();
        });
    }
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        });
    }
}

function openSettingsModal() {
    if (settingsModal) settingsModal.classList.add("active");
}

function closeSettingsModal() {
    if (settingsModal) settingsModal.classList.remove("active");
}

// ==========================================================================
// 13. KEYBOARD SHORTCUTS
// ==========================================================================
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        switch (e.code) {
            case "Space":
                e.preventDefault();
                togglePlayPause();
                break;
            case "ArrowRight":
                if (audio.duration) {
                    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
                }
                break;
            case "ArrowLeft":
                audio.currentTime = Math.max(0, audio.currentTime - 5);
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
            case "KeyL":
                toggleLikeSong();
                break;
            case "Escape":
                closeSettingsModal();
                if (nowPlayingPanel) nowPlayingPanel.classList.remove("open");
                if (mobileFullPlayer) mobileFullPlayer.classList.remove("open");
                if (currentView !== "home") openHomeView();
                break;
        }
    });
}

// ==========================================================================
// 14. TOAST NOTIFICATIONS & UTILS
// ==========================================================================
function showToast(message, icon = "fa-info-circle") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === null) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}
