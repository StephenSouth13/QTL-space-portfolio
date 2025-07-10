"use strict";

document.addEventListener("DOMContentLoaded", () => {
    createStarfield();
    createShootingStars();
    createParallaxItems();
    animateParallaxItems();
});

function createStarfield() {
    const container = document.querySelector(".background-effects");
    if (!container) return;

    for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

function createShootingStars() {
    const container = document.querySelector(".background-effects");
    if (!container) return;

    for (let i = 0; i < 8; i++) {
        const comet = document.createElement("div");
        comet.classList.add("shooting-star");
        comet.style.left = `${Math.random() * 100}%`;
        comet.style.top = `${Math.random() * 100}%`;
        comet.style.animationDelay = `${Math.random() * 20}s`;
        container.appendChild(comet);
    }
}

function createParallaxItems() {
    const container = document.querySelector(".background-effects");
    if (!container) return;

    const items = [
        { src: "assets/extra/space.png", speed: 0.1 },
        { src: "assets/extra/planet1.png", speed: 0.15 },
        { src: "assets/extra/earth.png", speed: 0.3 },
        { src: "assets/extra/UFO.png", speed: 0.5 },
        { src: "assets/extra/blackhole.png", speed: 0.8 },
        { src: "assets/extra/moon.png", speed: 0.2 },
        { src: "assets/extra/asteroid.png", speed: 0.6 },
    ];

    items.forEach((itemData) => {
        const item = document.createElement("img");
        item.src = itemData.src;
        item.classList.add("parallax-item");
        item.style.setProperty("--speed", String(itemData.speed));
        item.style.left = `${Math.random() * 100}%`;
        item.style.top = `${Math.random() * 100}%`;
        container.appendChild(item);
    });
}

function animateParallaxItems() {
    document.addEventListener("mousemove", (e) => {
        const parallaxItems = document.querySelectorAll(".parallax-item");
        parallaxItems.forEach((item) => {
            const speed = parseFloat(item.style.getPropertyValue("--speed"));
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            item.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}
