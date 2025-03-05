const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numParticles = Math.min(500, window.innerWidth / 3); // Adaptive particle count

// Mouse interaction
const mouse = { x: null, y: null, radius: 100 };
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Star colors
const starColors = ["#ffffff", "#ffcc00", "#ff4500", "#ff69b4", "#9370db", "#00ffff", "#1e90ff", "#ff1493"];

class Particle {
    constructor() {
        this.size = Math.random() * 2 + 1;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 0.4; // Reduced speed
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = starColors[Math.floor(Math.random() * starColors.length)];
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulseSpeed = Math.random() * 0.05 + 0.05; // Slower pulsing
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap-around effect (infinite space)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkling effect
        this.opacity += this.pulseSpeed;
        if (this.opacity > 1 || this.opacity < 0.3) this.pulseSpeed *= -1;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Instead of complex background
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

// Resize handler
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start animation
initParticles();
animateParticles();
