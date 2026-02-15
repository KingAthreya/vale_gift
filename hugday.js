/**
 * HUG DAY - INTERACTIVE SCRIPT
 * Features: Floating crystals, prisms, sparkles, light refractions
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const floatsContainer = document.getElementById('floatsContainer');

// Prism and crystal emojis for floating animation
const prismEmojis = ['💎', '💠', '💜', '✨', '🔮', '💙', '💠', '💜', '✨', '💎'];

// ============================================
// FLOATING PRISM ITEMS
// ============================================

/**
 * Creates a floating prism/crystal element
 */
function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');

    item.textContent = prismEmojis[Math.floor(Math.random() * prismEmojis.length)];
    item.style.left = Math.random() * 100 + '%';

    const duration = Math.random() * 8 + 12;
    item.style.animationDuration = duration + 's';

    const size = Math.random() * 1.5 + 1.2;
    item.style.fontSize = size + 'rem';
    item.style.opacity = Math.random() * 0.3 + 0.4;
    item.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(item);

    setTimeout(() => { item.remove(); }, (duration + 3) * 1000);
}

// ============================================
// SPARKLES
// ============================================

/**
 * Creates a sparkle particle
 */
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';

    const size = Math.random() * 4 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    // Random color from prism spectrum
    const colors = [
        'rgba(155, 89, 182, 0.8)',  // violet
        'rgba(52, 152, 219, 0.8)',  // blue
        'rgba(72, 201, 176, 0.8)',  // cyan
        'rgba(255, 255, 255, 0.9)', // white
        'rgba(212, 165, 255, 0.8)'  // light purple
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 ${size * 3}px ${size}px ${color}`;

    const duration = Math.random() * 4 + 4;
    sparkle.style.animationDuration = duration + 's';
    sparkle.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(sparkle);

    setTimeout(() => { sparkle.remove(); }, 15000);
}

// ============================================
// LIGHT REFRACTION BEAMS
// ============================================

/**
 * Creates a light refraction beam
 */
function createRefractionBeam() {
    const beam = document.createElement('div');
    beam.classList.add('refraction-beam');

    beam.style.left = Math.random() * 100 + '%';
    beam.style.top = Math.random() * 50 + '%';

    const height = Math.random() * 100 + 50;
    beam.style.height = height + 'px';

    const duration = Math.random() * 6 + 8;
    beam.style.animationDuration = duration + 's';
    beam.style.animationDelay = Math.random() * 4 + 's';

    floatsContainer.appendChild(beam);

    setTimeout(() => { beam.remove(); }, 18000);
}

// ============================================
// RAINBOW PARTICLE
// ============================================

/**
 * Creates a small rainbow-colored particle
 */
function createRainbowParticle() {
    const particle = document.createElement('div');

    const size = Math.random() * 6 + 3;
    const hue = Math.random() * 360;

    particle.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: hsl(${hue}, 80%, 70%);
        box-shadow: 0 0 ${size * 2}px ${size / 2}px hsla(${hue}, 80%, 70%, 0.4);
        pointer-events: none;
        animation: rainbowDrift ${Math.random() * 6 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
        will-change: transform, opacity;
    `;

    floatsContainer.appendChild(particle);

    setTimeout(() => { particle.remove(); }, 18000);
}

// ============================================
// DYNAMIC KEYFRAMES INJECTION
// ============================================

/**
 * Inject dynamic keyframes for rainbow drift
 */
function injectKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbowDrift {
            0%, 100% {
                transform: translateY(0) translateX(0) scale(0.8);
                opacity: 0.3;
            }
            25% { transform: translateY(-25px) translateX(15px) scale(1); opacity: 0.7; }
            50% { transform: translateY(-10px) translateX(-10px) scale(0.9); opacity: 0.5; }
            75% { transform: translateY(-30px) translateX(20px) scale(1.1); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all floating and prism effects
 */
function initEffects() {
    // Inject dynamic keyframes
    injectKeyframes();

    // Initial batch of floating items
    for (let i = 0; i < 6; i++) {
        setTimeout(createFloatingItem, i * 600);
    }

    // Initial sparkles
    for (let i = 0; i < 15; i++) {
        setTimeout(createSparkle, i * 300);
    }

    // Initial refraction beams
    for (let i = 0; i < 5; i++) {
        setTimeout(createRefractionBeam, i * 500);
    }

    // Initial rainbow particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createRainbowParticle, i * 400);
    }

    // Continuous floating items
    setInterval(createFloatingItem, 3000);

    // Continuous sparkles
    setInterval(createSparkle, 1500);

    // Continuous refraction beams
    setInterval(createRefractionBeam, 4000);

    // Continuous rainbow particles
    setInterval(createRainbowParticle, 2500);
}

/**
 * Mouse interaction - prism sparkles follow cursor
 */
function initMouseInteraction() {
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 80) return;
        lastTime = now;

        if (Math.random() > 0.5) {
            const sparkle = document.createElement('div');
            const hue = Math.random() * 60 + 260; // purple-blue range
            const size = Math.random() * 4 + 3;

            sparkle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: hsl(${hue}, 80%, 75%);
                box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, 80%, 75%, 0.5);
                pointer-events: none;
                z-index: 50;
                transition: all 1s ease-out;
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

            setTimeout(() => { sparkle.remove(); }, 1000);
        }
    });
}

// ============================================
// CLICK INTERACTION - PRISM BURST
// ============================================

/**
 * Creates a prism burst effect on click
 */
function createPrismBurst(x, y) {
    const colors = [
        { h: 270, s: 70, l: 70 },  // violet
        { h: 260, s: 60, l: 65 },  // purple
        { h: 210, s: 70, l: 65 },  // blue
        { h: 175, s: 60, l: 60 },  // cyan
        { h: 280, s: 80, l: 75 },  // light purple
    ];

    const count = Math.floor(Math.random() * 6) + 8;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const distance = Math.random() * 80 + 40;
            const duration = Math.random() * 0.5 + 0.8;

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: hsl(${color.h}, ${color.s}%, ${color.l}%);
                box-shadow: 0 0 ${size}px ${size / 2}px hsla(${color.h}, ${color.s}%, ${color.l}%, 0.5);
                pointer-events: none;
                z-index: 55;
                will-change: transform, opacity;
                animation: prismBurst ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                --burst-x: ${Math.cos(angle) * distance}px;
                --burst-y: ${Math.sin(angle) * distance}px;
            `;

            floatsContainer.appendChild(particle);
            setTimeout(() => { particle.remove(); }, duration * 1000 + 100);
        }, i * 30);
    }
}

/**
 * Creates a sparkle burst on click
 */
function createSparkleBurst(x, y) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const size = Math.random() * 6 + 3;
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;

            sparkle.style.cssText = `
                position: fixed;
                left: ${x + offsetX}px;
                top: ${y + offsetY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: white;
                box-shadow: 0 0 ${size * 2}px ${size}px rgba(255, 255, 255, 0.6);
                pointer-events: none;
                z-index: 55;
                will-change: transform, opacity;
                animation: sparklePop 0.6s ease-out forwards;
            `;

            floatsContainer.appendChild(sparkle);
            setTimeout(() => { sparkle.remove(); }, 600);
        }, i * 50);
    }
}

/**
 * Initialize click interaction
 */
function initClickInteraction() {
    // Inject keyframes for click effects
    const style = document.createElement('style');
    style.textContent = `
        @keyframes prismBurst {
            0% {
                transform: translate(-50%, -50%) scale(0.3);
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + var(--burst-x, 50px)),
                    calc(-50% + var(--burst-y, 50px))
                ) scale(0.5);
                opacity: 0;
            }
        }

        @keyframes sparklePop {
            0% {
                transform: scale(0.3);
                opacity: 1;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) translateY(-20px);
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

        // Create prism burst
        createPrismBurst(x, y);

        // Create sparkle burst
        createSparkleBurst(x, y);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initEffects();
    initMouseInteraction();
    initClickInteraction();

    console.log('💜 Hug Day page initialized!');
    console.log('Happy Hug Day! 💎✨');
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});

