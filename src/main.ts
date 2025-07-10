import { translations } from './lang.js';

declare const gsap: any;
declare const ScrollTrigger: any;

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    initLangSwitcher();
    playBackgroundMusic();
    initSoundEffects();
    initScrollAnimations();
    initPortfolioFilter();
    initTestimonialCarousel();
    initContactForm();
});

async function loadProfileData() {
    try {
        const response = await fetch('../data/profile.json');
        const profile = await response.json();

        // About Me
        const terminalOutput = document.querySelector('#about .terminal-output');
        if (terminalOutput) {
            terminalOutput.innerHTML = `
                <p><span class="prompt">></span> AI logging... Accessing profile for ${profile.name}</p>
                <p><span class="prompt">></span> Role: ${profile.role}</p>
                <p><span class="prompt">></span> Email: <a href="mailto:${profile.email}">${profile.email}</a></p>
                <p><span class="prompt">></span> Website: <a href="${profile.website}" target="_blank">${profile.website}</a></p>
                <p><span class="prompt">></span> Blog: <a href="${profile.blog}" target="_blank">${profile.blog}</a></p>
                <p><span class="prompt">></span> Location: ${profile.location}</p>
            `;
        }

        // Education
        const educationContainer = document.querySelector('#education .education-container');
        if (educationContainer) {
            educationContainer.innerHTML = profile.education.map((edu: any) => `
                <div class="education-item">
                    <h3>${edu.degree}</h3>
                    <p>${edu.school} (${edu.years})</p>
                </div>
            `).join('');
        }

        // Skills
        const skillsContainer = document.querySelector('#skills .skills-container');
        if (skillsContainer) {
            const { frontend, backend, versionControl, tools, gameDev } = profile.skills;
            skillsContainer.innerHTML = `
                <div class="skill-category">
                    <h3>Frontend</h3>
                    ${frontend.map((skill: string) => `<div class="skill"><p>${skill}</p><div class="skill-bar"><div class="skill-level" style="width: ${Math.random() * 40 + 60}%;"></div></div></div>`).join('')}
                </div>
                <div class="skill-category">
                    <h3>Backend</h3>
                    ${backend.map((skill: string) => `<div class="skill"><p>${skill}</p><div class="skill-bar"><div class="skill-level" style="width: ${Math.random() * 40 + 60}%;"></div></div></div>`).join('')}
                </div>
                <div class="skill-category">
                    <h3>Version Control</h3>
                    ${versionControl.map((skill: string) => `<div class="skill"><p>${skill}</p><div class="skill-bar"><div class="skill-level" style="width: ${Math.random() * 40 + 60}%;"></div></div></div>`).join('')}
                </div>
                <div class="skill-category">
                    <h3>Tools</h3>
                    ${tools.map((skill: string) => `<div class="skill"><p>${skill}</p><div class="skill-bar"><div class="skill-level" style="width: ${Math.random() * 40 + 60}%;"></div></div></div>`).join('')}
                </div>
                <div class="skill-category">
                    <h3>Game Development</h3>
                    ${gameDev.map((skill: string) => `<div class="skill"><p>${skill}</p><div class="skill-bar"><div class="skill-level" style="width: ${Math.random() * 40 + 60}%;"></div></div></div>`).join('')}
                </div>
            `;
        }

        // Experience
        const experienceContainer = document.querySelector('#experience .experience-container');
        if (experienceContainer) {
            experienceContainer.innerHTML = profile.experience.map((exp: any) => `
                <div class="experience-item">
                    <h3>${exp.role}</h3>
                    <p>${exp.company} | ${exp.period}</p>
                    ${exp.subjects ? `<p>Subjects: ${exp.subjects}</p>` : ''}
                </div>
            `).join('');
        }

        // Portfolio
        const portfolioGrid = document.querySelector('#portfolio .portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.innerHTML = profile.projects.map((project: any) => `
                <div class="portfolio-item" data-category="${project.role.includes('Game') ? 'game' : 'software'}">
                    <img src="assets/images/portfolio-placeholder.jpg" alt="${project.name}">
                    <div class="overlay">
                        <h3>${project.name}</h3>
                        <p>${project.role} (${project.date})</p>
                    </div>
                </div>
            `).join('');
        }

        // Achievements
        const achievementsContainer = document.querySelector('#achievements .achievements-container');
        if (achievementsContainer) {
            achievementsContainer.innerHTML = `
                <div class="achievement-category">
                    <h3>Academic</h3>
                    <ul>${profile.achievements.academic.map((ach: string) => `<li>${ach}</li>`).join('')}</ul>
                </div>
                <div class="achievement-category">
                    <h3>Sports</h3>
                    <ul>${profile.achievements.sports.map((ach: string) => `<li>${ach}</li>`).join('')}</ul>
                </div>
                <div class="achievement-category">
                    <h3>Pacing</h3>
                    <ul>${profile.achievements.pacing.map((ach: string) => `<li>${ach}</li>`).join('')}</ul>
                </div>
                <div class="achievement-category">
                    <h3>Community</h3>
                    <ul>${profile.achievements.community.map((ach: string) => `<li>${ach}</li>`).join('')}</ul>
                </div>
            `;
        }

        // Contact
        const contactContainer = document.querySelector('#contact .contact-container');
        if (contactContainer) {
            contactContainer.innerHTML = `
                <div class="contact-info">
                    <h3>Contact Info</h3>
                    <p>Email: <a href="mailto:${profile.email}">${profile.email}</a></p>
                    <p>Phone: ${profile.phone}</p>
                    <p>Location: ${profile.location}</p>
                    <div class="social-icons">
                        <a href="${profile.website}" target="_blank"><img src="assets/icons/website.svg" alt="Website"></a>
                        <a href="${profile.blog}" target="_blank"><img src="assets/icons/blog.svg" alt="Blog"></a>
                    </div>
                </div>
                <div class="contact-form">
                    <h3>Send a Message</h3>
                    <form>
                        <input type="text" name="name" placeholder="Your Name" required>
                        <input type="email" name="email" placeholder="Your Email" required>
                        <textarea name="message" placeholder="Your Message" required></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447176269153!2d106.6296636147499!3d10.77701959232098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529e7a77da5a7%3A0x23cd34859e5c2a3!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1678886375635!5m2!1sen!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            `;
        }

    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function initLangSwitcher() {
    const langButtons = document.querySelectorAll('.lang-switcher button');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });
}

function setLanguage(lang: string) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (key && translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

function playBackgroundMusic() {
    const music = document.getElementById('bg-music') as HTMLAudioElement;
    if (music) {
        music.volume = 0.3;
        music.play().catch(error => console.error("Autoplay was prevented:", error));
    }
}

function initSoundEffects() {
    const hoverElements = document.querySelectorAll('a, button');
    const hoverSound = document.getElementById('sfx-hover') as HTMLAudioElement;
    const clickSound = document.getElementById('sfx-click') as HTMLAudioElement;

    if (hoverSound && clickSound) {
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                hoverSound.currentTime = 0;
                hoverSound.play();
            });
            el.addEventListener('click', () => {
                clickSound.currentTime = 0;
                clickSound.play();
            });
        });
    }
}

function initScrollAnimations() {
    gsap.utils.toArray('section').forEach((section: any) => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.skill-level').forEach((level: any) => {
        gsap.to(level, {
            scaleX: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: level,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.from('#contact .contact-container', {
        rotationY: 360,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('#portfolio .filter-buttons button');
    const portfolioItems = document.querySelectorAll('#portfolio .portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Set active class on button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            portfolioItems.forEach((item: any) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initTestimonialCarousel() {
    const items = document.querySelectorAll('#testimonials .testimonial-item');
    const prevButton = document.querySelector('#testimonials .prev');
    const nextButton = document.querySelector('#testimonials .next');
    let currentIndex = 0;

    function showItem(index: number) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        });
    }
}

function initContactForm() {
    const form = document.querySelector('#contact .contact-form form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted! (This is a demo)');
            (form as HTMLFormElement).reset();
        });
    }
}