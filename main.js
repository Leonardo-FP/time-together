// Data do início do relacionamento (substitua pela sua data)
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

// Inicializar carrossel
$(document).ready(function(){
    $('.photo-carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
});

// Botão para mostrar o contador
startBtn.addEventListener('click', function() {
    document.querySelector('.home-screen').style.display = 'none';
    counterScreen.style.display = 'flex';
    startHearts();
    updateCounter();
    setInterval(updateCounter, 1000);
});

// Atualizar contador
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    // Cálculo de anos e meses mais precisos
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    
    if (months < 0 || (months === 0 && now.getDate() < startDate.getDate())) {
        years--;
        months += 12;
    }
    
    // Cálculo da data exata do último "aniversário de namoro"
    let lastAnniversary = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());

    if (now < lastAnniversary) {
        lastAnniversary.setFullYear(lastAnniversary.getFullYear() - 1);
    }

    const daysSinceAnniversary = Math.floor((now - lastAnniversary) / (1000 * 60 * 60 * 24));
        
    // Horas, minutos e segundos do dia atual
    const hoursToday = now.getHours();
    const minutesToday = now.getMinutes();
    const secondsToday = now.getSeconds();
    
    yearsElement.textContent = years;
    monthsElement.textContent = months;
    daysElement.textContent = daysSinceAnniversary;
    hoursElement.textContent = hoursToday;
    minutesElement.textContent = minutesToday;
    secondsElement.textContent = secondsToday;
}

// Chuva de corações
function startHearts() {
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');
        
        // Posição aleatória na horizontal
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório
        const size = Math.random() * 30 + 10;
        heart.style.fontSize = size + 'px';
        
        // Duração da animação
        const duration = Math.random() * 3 + 2;
        heart.style.animationDuration = duration + 's';
        
        // Atraso aleatório
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        document.body.appendChild(heart);
        
        // Remover após a animação terminar
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // Criar corações periodicamente
    setInterval(createHeart, 300);
    
    // Criar alguns corações imediatamente
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// Atualizar contador imediatamente
updateCounter();