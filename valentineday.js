/**
 * VALENTINE'S DAY - INTERACTIVE SCRIPT
 * Features: Floating hearts, sparkles, light beams, enhanced click effects
 * GPU-optimized with requestAnimationFrame + canvas
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const floatsContainer = document.getElementById('floatsContainer');
const particles = [];
const MAX_PARTICLES = 40;
let particleAnimationFrameId = null;
let ambientEffectIntervals = [];
let ambientEffectsRunning = false;

// Heart and love emojis for floating animation
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🌹', '✨', '💫', '🌟', '💍'];

// Star characters for twinkling background
const starChars = ['✦', '✧', '★', '⋆', '✶', '✹', '✨'];

// ============================================
// PARTICLE CANVAS — GPU Accelerated
// ============================================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 3 + 1,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 348 : 45, // crimson or gold
    };
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.0008;

        if (p.opacity <= 0 || p.y < -10) {
            particles.splice(i, 1);
            continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity * 0.3})`;
        ctx.fill();
    }

    // Spawn new particles slowly
    if (particles.length < MAX_PARTICLES && Math.random() > 0.92) {
        particles.push(createParticle());
    }

    particleAnimationFrameId = requestAnimationFrame(drawParticles);
}

function startParticleLoop() {
    if (particleAnimationFrameId !== null || document.hidden) return;
    drawParticles();
}

function stopParticleLoop() {
    if (particleAnimationFrameId === null) return;
    cancelAnimationFrame(particleAnimationFrameId);
    particleAnimationFrameId = null;
}

function addAmbientInterval(callback, delay) {
    const id = setInterval(callback, delay);
    ambientEffectIntervals.push(id);
}

function clearAmbientIntervals() {
    ambientEffectIntervals.forEach((id) => clearInterval(id));
    ambientEffectIntervals = [];
}

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================

/**
 * Creates a floating heart/love element
 */
function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');

    item.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    item.style.left = Math.random() * 100 + '%';

    const duration = Math.random() * 8 + 10;
    item.style.animationDuration = duration + 's';

    const size = Math.random() * 2 + 1.5;
    item.style.fontSize = size + 'rem';
    item.style.opacity = Math.random() * 0.3 + 0.5;
    item.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(item);

    setTimeout(() => { item.remove(); }, (duration + 3) * 1000);
}

/**
 * Creates a twinkling star at a random fixed position
 */
function createTwinkleStar() {
    const star = document.createElement('div');
    star.classList.add('twinkle-star');
    star.textContent = starChars[Math.floor(Math.random() * starChars.length)];

    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 60 + '%'; // keep in upper portion

    const size = Math.random() * 0.8 + 0.5;
    star.style.fontSize = size + 'rem';
    star.style.color = Math.random() > 0.5 ? '#ff4571' : '#ffd700';

    const duration = Math.random() * 2 + 2;
    star.style.animationDuration = duration + 's';
    star.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(star);

    // Replace star after a while
    setTimeout(() => { star.remove(); }, 15000);
}

/**
 * Creates a floating heart glow orb
 */
function createHeartOrb() {
    const orb = document.createElement('div');
    orb.classList.add('heart-orb');

    orb.style.left = Math.random() * 100 + '%';
    orb.style.top = Math.random() * 100 + '%';

    const size = Math.random() * 6 + 4;
    orb.style.width = size + 'px';
    orb.style.height = size + 'px';

    const hue = Math.random() > 0.5 ? '348' : '45'; // crimson or gold
    orb.style.background = `hsl(${hue}, 80%, 65%)`;
    orb.style.boxShadow = `0 0 ${size * 2}px ${size}px hsla(${hue}, 80%, 65%, 0.4)`;

    const duration = Math.random() * 4 + 6;
    orb.style.animationDuration = duration + 's';
    orb.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(orb);

    setTimeout(() => { orb.remove(); }, 20000);
}

/**
 * Creates a golden sparkle
 */
function createGoldenSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('golden-sparkle');

    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';

    const size = Math.random() * 4 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    const duration = Math.random() * 4 + 4;
    sparkle.style.animationDuration = duration + 's';
    sparkle.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(sparkle);

    setTimeout(() => { sparkle.remove(); }, 15000);
}

/**
 * Creates a light beam effect
 */
function createLightBeam() {
    const beam = document.createElement('div');
    beam.classList.add('light-beam');

    beam.style.left = Math.random() * 100 + '%';

    const duration = Math.random() * 10 + 15;
    beam.style.animationDuration = duration + 's';
    beam.style.animationDelay = Math.random() * 5 + 's';

    floatsContainer.appendChild(beam);

    setTimeout(() => { beam.remove(); }, 25000);
}

// ============================================
// SCROLL REVEAL — IntersectionObserver
// ============================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on data-index
                const idx = entry.target.dataset.index;
                const delay = idx !== undefined ? idx * 120 : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe activity cards
    document.querySelectorAll('.activity-card').forEach((card) => {
        observer.observe(card);
    });

    // Observe love letter
    const letter = document.querySelector('.love-letter');
    if (letter) observer.observe(letter);

    // Observe footer
    const footer = document.querySelector('.footer-section');
    if (footer) observer.observe(footer);
}

// ============================================
// MOUSE INTERACTION - ROMANTIC SPARKLES
// ============================================

function initMouseInteraction() {
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 130) return;
        lastTime = now;

        if (Math.random() > 0.6) {
            const sparkle = document.createElement('div');
            const hue = Math.random() > 0.5 ? '348' : '45'; // crimson or gold
            const size = Math.random() * 5 + 3;

            sparkle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: hsl(${hue}, 80%, 65%);
                box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, 80%, 65%, 0.5);
                pointer-events: none;
                z-index: 50;
                transition: all 1.2s ease-out;
                opacity: 0.9;
                will-change: transform, opacity;
            `;
            floatsContainer.appendChild(sparkle);

            requestAnimationFrame(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 30 + 15;
                sparkle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 20}px) scale(0)`;
                sparkle.style.opacity = '0';
            });

            setTimeout(() => { sparkle.remove(); }, 1200);
        }
    });
}

// ============================================
// CLICK INTERACTION - HEART BURST
// ============================================

/**
 * Creates a heart burst effect on click
 */
function createHeartBurst(x, y) {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🌹', '✨', '💫'];
    const count = Math.floor(Math.random() * 5) + 6;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const emoji = hearts[Math.floor(Math.random() * hearts.length)];
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const distance = Math.random() * 70 + 35;
            const duration = Math.random() * 0.5 + 0.7;

            heart.textContent = emoji;
            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 1.6rem;
                pointer-events: none;
                z-index: 55;
                will-change: transform, opacity;
                animation: heartBurst ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                --burst-x: ${Math.cos(angle) * distance}px;
                --burst-y: ${Math.sin(angle) * distance}px;
            `;

            floatsContainer.appendChild(heart);
            setTimeout(() => { heart.remove(); }, duration * 1000 + 100);
        }, i * 35);
    }
}

/**
 * Creates romantic sparkles on click
 */
function createRomanticSparkles(x, y) {
    const colors = [
        { h: 348, s: 80, l: 65 },  // crimson
        { h: 340, s: 80, l: 70 },  // rose
        { h: 45, s: 100, l: 65 },  // gold
        { h: 350, s: 80, l: 75 },  // pink
    ];

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;

            sparkle.style.cssText = `
                position: fixed;
                left: ${x + offsetX}px;
                top: ${y + offsetY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: hsl(${color.h}, ${color.s}%, ${color.l}%);
                box-shadow: 0 0 ${size * 2}px ${size / 2}px hsla(${color.h}, ${color.s}%, ${color.l}%, 0.5);
                pointer-events: none;
                z-index: 55;
                will-change: transform, opacity;
                animation: romanticSparkle 0.8s ease-out forwards;
            `;

            floatsContainer.appendChild(sparkle);
            setTimeout(() => { sparkle.remove(); }, 800);
        }, i * 45);
    }
}

/**
 * Creates a golden ring pulse on click
 */
function createGoldenRing(x, y) {
    const ring = document.createElement('div');
    ring.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        border: 2px solid rgba(255, 215, 0, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 54;
        transform: translate(-50%, -50%);
        animation: goldenRing 0.8s ease-out forwards;
    `;

    floatsContainer.appendChild(ring);
    setTimeout(() => { ring.remove(); }, 800);
}

/**
 * Initialize click interaction
 */
function initClickInteraction() {
    // Inject keyframes for click effects
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartBurst {
            0% {
                transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + var(--burst-x, 40px)),
                    calc(-50% + var(--burst-y, 40px))
                ) scale(0.7) rotate(20deg);
                opacity: 0;
            }
        }

        @keyframes romanticSparkle {
            0% {
                transform: scale(0.3);
                opacity: 1;
            }
            50% {
                transform: scale(1.3);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) translateY(-25px);
                opacity: 0;
            }
        }

        @keyframes goldenRing {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
                border-width: 3px;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
                border-width: 1px;
            }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('click', (e) => {
        // Don't trigger on links or buttons
        if (e.target.closest('a') || e.target.closest('button')) return;

        const x = e.clientX;
        const y = e.clientY;

        // Create heart burst
        createHeartBurst(x, y);

        // Create romantic sparkles
        createRomanticSparkles(x, y);

        // Create golden ring
        createGoldenRing(x, y);
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all floating effects
 */
function initEffects() {
    // Initial batch of floating items
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingItem, i * 500);
    }

    // Initial twinkling stars
    for (let i = 0; i < 25; i++) {
        setTimeout(createTwinkleStar, i * 200);
    }

    // Initial heart orbs
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeartOrb, i * 400);
    }

    // Initial golden sparkles
    for (let i = 0; i < 12; i++) {
        setTimeout(createGoldenSparkle, i * 300);
    }

    // Initial light beams
    for (let i = 0; i < 3; i++) {
        setTimeout(createLightBeam, i * 800);
    }

    startAmbientEffects();
}

function startAmbientEffects() {
    if (ambientEffectsRunning || document.hidden) return;
    ambientEffectsRunning = true;

    // Continuous floating items
    addAmbientInterval(createFloatingItem, 2400);

    // Continuous twinkling stars
    addAmbientInterval(createTwinkleStar, 1400);

    // Continuous heart orbs
    addAmbientInterval(createHeartOrb, 3200);

    // Continuous golden sparkles
    addAmbientInterval(createGoldenSparkle, 2800);

    // Continuous light beams
    addAmbientInterval(createLightBeam, 7500);
}

function stopAmbientEffects() {
    ambientEffectsRunning = false;
    clearAmbientIntervals();
}

function handlePageVisibilityChange() {
    if (document.hidden) {
        stopParticleLoop();
        stopAmbientEffects();
        return;
    }

    startParticleLoop();
    startAmbientEffects();
}

window.addEventListener('resize', resizeCanvas);
document.addEventListener('visibilitychange', handlePageVisibilityChange);
window.addEventListener('pagehide', () => {
    stopParticleLoop();
    stopAmbientEffects();
});
window.addEventListener('pageshow', () => {
    resizeCanvas();
    handlePageVisibilityChange();
});

document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();

    // Seed initial particles
    for (let i = 0; i < 15; i++) {
        const p = createParticle();
        p.y = Math.random() * canvas.height;
        particles.push(p);
    }

    startParticleLoop();
    initEffects();
    initScrollReveal();
    initMouseInteraction();
    initClickInteraction();

    console.log('❤️ Valentine\'s Day page initialized!');
    console.log('Happy Valentine\'s Day! 💕');
});
