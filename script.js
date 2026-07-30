document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.slide-in');
    hiddenElements.forEach((el) => observer.observe(el));

    // 2. Sakura Falling Petals Animation (Canvas)
    const canvas = document.getElementById("sakuraCanvas");
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalCount = 30;
    const petals = [];

    class Petal {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.size = Math.random() * 12 + 8;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = Math.random() * 1 - 0.5;
            this.angle = Math.random() * 360;
            this.spin = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.4;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * 0.01) + this.speedX;
            this.angle += this.spin;

            if (this.y > height + 20) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.angle * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            
            // Menggambar Kelopak Bunga Sakura
            ctx.beginPath();
            ctx.fillStyle = "#ffb7c5";
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }

    function animateSakura() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach((petal) => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animateSakura);
    }

    animateSakura();
});