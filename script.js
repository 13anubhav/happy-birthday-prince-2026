// Create stars
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Create floating particles
const container = document.querySelector('.container');
const colors = ['#ff6ec4', '#7873f5', '#4facfe', '#00f2fe', '#ffd700'];
for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
    particle.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.position = 'fixed';
    particle.style.opacity = '0.6';
    document.body.appendChild(particle);
}

// Candle interactions
const candles = document.querySelectorAll('.candle');
let litCandles = 3;

candles.forEach((candle, index) => {
    candle.addEventListener('click', function() {
        const flame = this.querySelector('.flame');

        if (!flame.classList.contains('out')) {
            flame.classList.add('out');
            litCandles--;
            createSmoke(this);

            if (litCandles === 0) {
                setTimeout(() => {
                    createMassiveConfetti();
                    celebrate();
                }, 500);
            }
        } else {
            flame.classList.remove('out');
            litCandles++;
        }
    });
});

function createSmoke(candle) {
    const rect = candle.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        const smoke = document.createElement('div');
        smoke.style.position = 'fixed';
        smoke.style.width = '30px';
        smoke.style.height = '30px';
        smoke.style.background = 'radial-gradient(circle, rgba(200, 200, 200, 0.6), transparent)';
        smoke.style.borderRadius = '50%';
        smoke.style.left = rect.left + rect.width / 2 + 'px';
        smoke.style.top = rect.top - 40 + 'px';
        smoke.style.pointerEvents = 'none';
        smoke.style.zIndex = '1000';
        document.body.appendChild(smoke);

        let pos = 0;
        let drift = (Math.random() - 0.5) * 40;
        const smokeAnim = setInterval(() => {
            if (pos >= 80) {
                clearInterval(smokeAnim);
                smoke.remove();
            } else {
                pos += 2;
                smoke.style.top = rect.top - 40 - pos + 'px';
                smoke.style.left = rect.left + rect.width / 2 + (drift * (pos / 80)) + 'px';
                smoke.style.opacity = (1 - (pos / 80)) * 0.6;
                smoke.style.transform = `scale(${1 + pos / 40})`;
            }
        }, 30);
    }
}

function createMassiveConfetti() {
    const colors = ['#ff6ec4', '#7873f5', '#4facfe', '#00f2fe', '#ffd700', '#ff0080', '#00ff88'];
    const shapes = ['circle', 'square'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.background = color;
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '0';
            confetti.style.width = Math.random() * 15 + 8 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.boxShadow = `0 0 10px ${color}`;

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 6000);
        }, i * 20);
    }
}

function celebrate() {
    document.querySelector('h1').style.animation = 'gradientShift 0.5s ease infinite';
    setTimeout(() => {
        document.querySelector('h1').style.animation = 'gradientShift 3s ease infinite';
    }, 3000);
}

// Initial confetti burst
setTimeout(() => {
    createMassiveConfetti();
}, 2000);
