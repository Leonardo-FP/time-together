const progressBar = document.getElementById('progressBar');
let updateInterval;

const sound = new Howl({
    src: ['musica.mp3'],
    html5: true,
    loop: true,
    onplay: () => {
        mostrarPause();
        updateInterval = setInterval(() => {
            const current = sound.seek();
            const duration = sound.duration();
            if (!isNaN(current) && !isNaN(duration)) {
                progressBar.value = (current / duration) * 100;
            }
        }, 500);
    },
    onpause: () => {
        clearInterval(updateInterval);
        mostrarPlay();
    },
    onstop: () => {
        clearInterval(updateInterval);
        mostrarPlay();
    }
});

// Configura o volume do áudio e o fade in
sound.volume(0);          // Começa mudo
sound.fade(0, 0.6, 10000); // Vai até 0.3 em 10 segundos

progressBar.addEventListener('input', () => {
    const duration = sound.duration();
    const newTime = (progressBar.value / 100) * duration;
    sound.seek(newTime);
});

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

playBtn.addEventListener('click', () => {
    sound.play();
    mostrarPause();
});

pauseBtn.addEventListener('click', () => {
    sound.pause();
    mostrarPlay();
});

function mostrarPlay() {
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function mostrarPause() {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
}

mostrarPlay();