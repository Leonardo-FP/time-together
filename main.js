// Data do início do relacionamento
const startDate = new Date('2024-07-05T00:00:00');

// Elementos DOM
const startBtn = document.getElementById('startBtn');
const counterScreen = document.getElementById('counterScreen');
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Mostrar contador após clicar no botão
startBtn.addEventListener('click', function () {
    document.querySelector('.home-screen').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'flex';

    // Toca a música logo após o clique
    sound.play();

    // Dá tempo de mostrar o loading antes de exibir o contador
    setTimeout(() => {
        showCounterScreen();
    }, 2000); // Delay só pra tela de loading respirar e aparecer
});

let screenShown = false;

function showCounterScreen() {
    if (screenShown) return;
    screenShown = true;

    document.getElementById('loadingScreen').style.display = 'none';
    counterScreen.style.display = 'flex';

    // Inicializa o carrossel de fotos
    $('.photo-carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 7000
    });

    startHearts();
    updateCounter();
    setInterval(updateCounter, 1000);
}

// Atualiza o contador de tempo
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0 || (months === 0 && now.getDate() < startDate.getDate())) {
        years--;
        months += 12;
    }

    let lastAnniversary = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (now < lastAnniversary) {
        lastAnniversary.setFullYear(lastAnniversary.getFullYear() - 1);
    }

    const daysSinceAnniversary = Math.floor((now - lastAnniversary) / (1000 * 60 * 60 * 24));

    yearsElement.textContent = years;
    monthsElement.textContent = months;
    daysElement.textContent = daysSinceAnniversary;
    hoursElement.textContent = now.getHours();
    minutesElement.textContent = now.getMinutes();
    secondsElement.textContent = now.getSeconds();
}

// Chuva de corações
function startHearts() {
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');

        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 30 + 10;
        heart.style.fontSize = size + 'px';
        const duration = Math.random() * 3 + 2;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    setInterval(createHeart, 300);
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 100);
    }
}
