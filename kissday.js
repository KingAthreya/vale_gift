/**
 * KISS DAY - INTERACTIVE SCRIPT
 * Features: Floating kisses, perfume mist, snake rattle effects, kiss click interaction
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const floatsContainer = document.getElementById('floatsContainer');
const mistContainer = document.getElementById('mistContainer');

// Kiss and love emojis for floating animation
const kissEmojis = ['💋', '💜', '🐍', '✨', '💫', '🖤', '💖', '💘', '💕'];

// Perfume scent particles
const scentParticles = ['✧', '✦', '⋆', '✶', '✹', '·', '•'];

// ============================================
// FLOATING KISSES BACKGROUND
// ============================================

/**
 * Creates a floating kiss/heart element
 */
function createFloatingKiss() {
    const kiss = document.createElement('div');
    kiss.classList.add('floating-kiss');

    kiss.textContent = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
    kiss.style.left = Math.random() * 100 + '%';

    const duration = Math.random() * 8 + 10;
    kiss.style.animationDuration = duration + 's';

    const size = Math.random() * 1.5 + 1;
    kiss.style.fontSize = size + 'rem';
    kiss.style.opacity = Math.random() * 0.4 + 0.3;
    kiss.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(kiss);

    setTimeout(() => { kiss.remove(); }, (duration + 3) * 1000);
}

/**
 * Creates floating perfume mist
 */
function createPerfumeMist() {
    const mist = document.createElement('div');
    mist.classList.add('floating-mist');

    const size = Math.random() * 100 + 50;
    mist.style.width = size + 'px';
    mist.style.height = size + 'px';

    mist.style.left = Math.random() * 100 + '%';
    mist.style.top = Math.random() * 100 + '%';

    const duration = Math.random() * 10 + 15;
    mist.style.animationDuration = duration + 's';
    mist.style.animationDelay = Math.random() * 5 + 's';

    mistContainer.appendChild(mist);

    setTimeout(() => { mist.remove(); }, (duration + 5) * 1000);
}

/**
 * Creates floating perfume scent particles
 */
function createScentParticle() {
    const particle = document.createElement('div');
    particle.classList.add('floating-perfume');

    particle.textContent = scentParticles[Math.floor(Math.random() * scentParticles.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 80 + 10 + '%';

    const duration = Math.random() * 6 + 8;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';

    // Random purple-ish color
    const hue = Math.floor(Math.random() * 40) + 270; // 270-310 (purple range)
    particle.style.color = `hsl(${hue}, 70%, 70%)`;

    floatsContainer.appendChild(particle);

    setTimeout(() => { particle.remove(); }, (duration + 2) * 1000);
}

// ============================================
// SNAKE RATTLE EFFECT
// ============================================

/**
 * Creates a subtle rattle effect on the snake coils
 */
function initSnakeRattle() {
    const coils = document.querySelectorAll('.snake-coil');
    
    setInterval(() => {
        coils.forEach((coil, index) => {
            const randomRotation = (Math.random() - 0.5) * 6;
            const currentTransform = coil.style.transform || '';
            coil.style.transform = `translateX(-50%) rotate(${randomRotation}deg)`;
        });
    }, 200);
}

// ============================================
// MOUSE INTERACTION - VENOM TRAIL
// ============================================

/**
 * Mouse interaction - venom purple trail follows cursor
 */
function initMouseInteraction() {
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 100) return;
        lastTime = now;

        if (Math.random() > 0.6) {
            const trail = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const hue = Math.floor(Math.random() * 40) + 270;

            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: hsl(${hue}, 70%, 60%);
                box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, 70%, 60%, 0.4);
                pointer-events: none;
                z-index: 50;
                transition: all 1.2s ease-out;
                opacity: 0.8;
            `;
            floatsContainer.appendChild(trail);

            requestAnimationFrame(() => {
                trail.style.transform = `translateY(-60px) scale(0)`;
                trail.style.opacity = '0';
            });

            setTimeout(() => { trail.remove(); }, 1200);
        }
    });
}

// ============================================
// CLICK INTERACTION - KISS BURST
// ============================================

/**
 * Creates a kiss burst effect on click
 */
function createKissBurst(x, y) {
    const kisses = ['💋', '💜', '💖', '💘', '✨', '🐍'];
    const count = Math.floor(Math.random() * 4) + 6;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const kiss = document.createElement('div');
            const emoji = kisses[Math.floor(Math.random() * kisses.length)];
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const distance = Math.random() * 80 + 40;
            const duration = Math.random() * 0.5 + 0.7;

            kiss.textContent = emoji;
            kiss.classList.add('kiss-burst');
            kiss.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 1.8rem;
                pointer-events: none;
                z-index: 100;
                will-change: transform, opacity;
                animation: kissBurst ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                --burst-x: ${Math.cos(angle) * distance}px;
                --burst-y: ${Math.sin(angle) * distance}px;
            `;

            floatsContainer.appendChild(kiss);
            setTimeout(() => { kiss.remove(); }, duration * 1000 + 100);
        }, i * 30);
    }
}

/**
 * Creates venom sparkles on click
 */
function createVenomSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const size = Math.random() * 10 + 5;
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            const hue = Math.floor(Math.random() * 40) + 270;

            sparkle.classList.add('kiss-sparkle');
            sparkle.style.cssText = `
                position: fixed;
                left: ${x + offsetX}px;
                top: ${y + offsetY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: hsl(${hue}, 80%, 65%);
                box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, 80%, 65%, 0.6);
                pointer-events: none;
                z-index: 100;
                will-change: transform, opacity;
                animation: venomSparkle 0.8s ease-out forwards;
            `;

            floatsContainer.appendChild(sparkle);
            setTimeout(() => { sparkle.remove(); }, 800);
        }, i * 40);
    }
}

/**
 * Creates a kiss mark effect
 */
function createKissMark(x, y) {
    const kissMark = document.createElement('div');
    kissMark.textContent = '💋';
    kissMark.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 99;
        transform: translate(-50%, -50%) rotate(${Math.random() * 30 - 15}deg);
        animation: kissMarkAppear 1.5s ease-out forwards;
    `;

    floatsContainer.appendChild(kissMark);
    setTimeout(() => { kissMark.remove(); }, 1500);
}

/**
 * Initialize click interaction
 */
function initClickInteraction() {
    // Inject keyframes for click effects
    const style = document.createElement('style');
    style.textContent = `
        @keyframes kissBurst {
            0% {
                transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translate(
                    calc(-50% + var(--burst-x, 50px) * 0.5),
                    calc(-50% + var(--burst-y, 50px) * 0.5)
                ) scale(1) rotate(15deg);
                opacity: 0.9;
            }
            100% {
                transform: translate(
                    calc(-50% + var(--burst-x, 50px)),
                    calc(-50% + var(--burst-y, 50px))
                ) scale(0.5) rotate(30deg);
                opacity: 0;
            }
        }

        @keyframes venomSparkle {
            0% {
                transform: scale(0.2);
                opacity: 1;
            }
            40% {
                transform: scale(1.3);
                opacity: 0.9;
            }
            100% {
                transform: scale(0) translateY(-30px);
                opacity: 0;
            }
        }

        @keyframes kissMarkAppear {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 0;
            }
            30% {
                transform: translate(-50%, -50%) scale(1.3) rotate(${Math.random() * 30 - 15}deg);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1) rotate(${Math.random() * 30 - 15}deg);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0.8) rotate(${Math.random() * 30 - 15}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('click', (e) => {
        // Don't trigger on links or buttons
        if (e.target.closest('a') || e.target.closest('button')) return;

        const x = e.clientX;
        const y = e.clientY;

        // Create kiss burst
        createKissBurst(x, y);

        // Create venom sparkles
        createVenomSparkles(x, y);

        // Create kiss mark
        createKissMark(x, y);
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all floating and interactive effects
 */
function initEffects() {
    // Initial batch of floating kisses
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingKiss, i * 400);
    }

    // Initial perfume mist
    for (let i = 0; i < 8; i++) {
        setTimeout(createPerfumeMist, i * 600);
    }

    // Initial scent particles
    for (let i = 0; i < 15; i++) {
        setTimeout(createScentParticle, i * 300);
    }

    // Continuous floating kisses
    setInterval(createFloatingKiss, 1500);

    // Continuous perfume mist
    setInterval(createPerfumeMist, 3000);

    // Continuous scent particles
    setInterval(createScentParticle, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    initEffects();
    initMouseInteraction();
    initClickInteraction();
    initSnakeRattle();

    console.log('💋 Kiss Day page initialized!');
    console.log('Happy Kiss Day! 💜🐍');
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});

