document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
    createParallaxItems();
});

function createStarfield() {
    const container = document.querySelector('.background-effects');
    if (!container) return;

    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

function createParallaxItems() {
    const container = document.querySelector('.background-effects');
    if (!container) return;

    const items = [
        { src: 'assets/images/planet1.png', speed: 0.1 },
        { src: 'assets/images/planet2.png', speed: 0.3 },
        { src: 'assets/images/blackhole.png', speed: 0.5 },
        { src: 'assets/images/ufo.png', speed: 0.8 },
    ];

    items.forEach(itemData => {
        const item = document.createElement('img');
        item.src = itemData.src;
        item.classList.add('parallax-item');
        item.style.setProperty('--speed', String(itemData.speed));
        item.style.left = `${Math.random() * 100}%`;
        item.style.top = `${Math.random() * 100}%`;
        container.appendChild(item);
    });

    document.addEventListener('mousemove', (e) => {
        const parallaxItems = document.querySelectorAll('.parallax-item') as NodeListOf<HTMLElement>;
        parallaxItems.forEach(item => {
            const speed = parseFloat(item.style.getPropertyValue('--speed'));
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            item.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}