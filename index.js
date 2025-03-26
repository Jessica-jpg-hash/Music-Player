const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'MGMT - Kids (Lyrics).mp3',
        displayName: 'Kids',
        cover: 'MGMT.jpg',
        artist: 'MGMT',
    },
    {
        path: 'Surf Curse - Freaks [Official Audio].mp3',
        displayName: 'Freaks',
        cover: 'surf-curse.jpg',
        artist: 'Surf Curse',
    },
    {
        path: 'Square Hammer.mp3',
        displayName: 'Square Hammer',
        cover: 'square-hammer.jpg',
        artist: 'Ghost',
    },
    {
        path: 'Tame Impala - Let It Happen (Official Audio).mp3',
        displayName: 'Let it happen',
        cover: 'Tame.jpg',
        artist: 'Tame Impala',
    },
    {
        path: 'BØRNS - Electric Love.mp3',
        displayName: 'Electric love',
        cover: 'Electric.jpg',
        artist: 'Tame Impala',
    },
    {
        path: '5 Seconds of Summer - Youngblood (Alt Version).mp3',
        displayName: 'Youngblood',
        cover: '5SOS.jpg',
        artist: '5SOS',
    },
    {
        path: 'Cage The Elephant - Black Madonna (Official Audio).mp3',
        displayName: 'Black Madonna',
        cover: 'CTE.jpg',
        artist: 'Cage The Elephant',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);


loadMusic(songs[musicIndex]);

		 const fileInput = document.getElementById('file-input');
            function loadLocalSongs() {
                const files = fileInput.files;
                if (!files.length) return;
                
                Array.from(files).forEach(file => {
                    const url = URL.createObjectURL(file);
                    songs.push({
                        path: url,
                        displayName: file.name,
                        cover: 'default-cover.jpg', // Placeholder cover image
                        artist: 'Unknown Artist'
                    });
                });
                
                if (!isPlaying) {
                    musicIndex = songs.length - files.length;
                    loadMusic(songs[musicIndex]);
                }
            }