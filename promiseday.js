/**
 * PROMISE DAY - INTERACTIVE SCRIPT
 * Features: Floating ocean items, bubbles, pearls, whales, underwater particles
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const floatsContainer = document.getElementById('floatsContainer');

// Ocean-themed emojis for floating animation
const oceanEmojis = ['🐟', '🐠', '🐡', '🐚', '🌙', '✨', '💎', '🫧', '🪸', '🦪'];

// Whale emojis for occasional large floaters
const whaleEmojis = ['🐋', '🐳'];

// ============================================
// FLOATING OCEAN ITEMS
// ============================================

/**
 * Creates a floating ocean element (fish, shells, moonstone, etc.)
 */
function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');

    item.textContent = oceanEmojis[Math.floor(Math.random() * oceanEmojis.length)];
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
// BUBBLES
// ============================================

/**
 * Creates a rising bubble
 */
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 20 + 6;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';

    bubble.style.left = Math.random() * 100 + '%';

    const duration = Math.random() * 6 + 8;
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = Math.random() * 4 + 's';

    floatsContainer.appendChild(bubble);

    setTimeout(() => { bubble.remove(); }, (duration + 4) * 1000);
}

// ============================================
// PEARLS
// ============================================

/**
 * Creates a floating pearl at a random position
 */
function createPearl() {
    const pearl = document.createElement('div');
    pearl.classList.add('pearl');

    pearl.style.left = Math.random() * 100 + '%';
    pearl.style.top = Math.random() * 100 + '%';

    const size = Math.random() * 8 + 6;
    pearl.style.width = size + 'px';
    pearl.style.height = size + 'px';

    // Vary the pearl color slightly
    const hue = Math.random() * 20 + 200; // blue-ish range
    const lightness = Math.random() * 15 + 80;
    pearl.style.background = `radial-gradient(circle at 35% 35%, #ffffff, hsl(${hue}, 60%, ${lightness}%), hsl(${hue}, 50%, ${lightness - 10}%))`;
    pearl.style.boxShadow = `0 0 ${size}px ${size / 2}px hsla(${hue}, 60%, ${lightness}%, 0.4), inset 0 -2px 4px rgba(0,0,0,0.1)`;

    const duration = Math.random() * 6 + 10;
    pearl.style.animationDuration = duration + 's';
    pearl.style.animationDelay = Math.random() * 5 + 's';

    floatsContainer.appendChild(pearl);

    setTimeout(() => { pearl.remove(); }, 20000);
}

// ============================================
// UNDERWATER LIGHT PARTICLES
// ============================================

/**
 * Creates a small underwater light particle (plankton-like glow)
 */
function createLightParticle() {
    const particle = document.createElement('div');

    particle.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        border-radius: 50%;
        background: rgba(196, 224, 249, ${Math.random() * 0.5 + 0.3});
        box-shadow: 0 0 ${Math.random() * 8 + 4}px rgba(196, 224, 249, 0.4);
        pointer-events: none;
        animation: particleDrift ${Math.random() * 8 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
    `;

    floatsContainer.appendChild(particle);

    setTimeout(() => { particle.remove(); }, 18000);
}

// ============================================
// OCCASIONAL WHALE SWIM-BY
// ============================================

/**
 * Creates a whale that swims across the screen occasionally
 */
function createSwimmingWhale() {
    const whale = document.createElement('div');
    const emoji = whaleEmojis[Math.floor(Math.random() * whaleEmojis.length)];
    const fromLeft = Math.random() > 0.5;
    const yPos = Math.random() * 60 + 20; // 20-80% from top
    const duration = Math.random() * 10 + 15;

    whale.textContent = emoji;
    whale.style.cssText = `
        position: absolute;
        top: ${yPos}%;
        ${fromLeft ? 'left: -80px' : 'right: -80px'};
        font-size: ${Math.random() * 2 + 2.5}rem;
        opacity: 0.15;
        pointer-events: none;
        transition: none;
        animation: whalePass${fromLeft ? 'Right' : 'Left'} ${duration}s linear forwards;
        filter: drop-shadow(0 4px 15px rgba(133, 193, 233, 0.2));
        ${fromLeft ? '' : 'transform: scaleX(-1);'}
    `;

    floatsContainer.appendChild(whale);

    setTimeout(() => { whale.remove(); }, duration * 1000);
}

// ============================================
// DYNAMIC KEYFRAMES INJECTION
// ============================================

/**
 * Inject dynamic keyframes for whale swim-by and particle drift
 */
function injectKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes whalePassRight {
            0% { left: -100px; opacity: 0; }
            5% { opacity: 0.15; }
            95% { opacity: 0.15; }
            100% { left: calc(100% + 100px); opacity: 0; }
        }

        @keyframes whalePassLeft {
            0% { right: -100px; opacity: 0; }
            5% { opacity: 0.15; }
            95% { opacity: 0.15; }
            100% { right: calc(100% + 100px); opacity: 0; }
        }

        @keyframes particleDrift {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
            50% { transform: translateY(-5px) translateX(-8px); opacity: 1; }
            75% { transform: translateY(-15px) translateX(12px); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all floating and underwater effects
 */
function initEffects() {
    // Inject dynamic keyframes
    injectKeyframes();

    // Initial batch of floating ocean items
    for (let i = 0; i < 6; i++) {
        setTimeout(createFloatingItem, i * 600);
    }

    // Initial bubbles
    for (let i = 0; i < 15; i++) {
        setTimeout(createBubble, i * 300);
    }

    // Initial pearls
    for (let i = 0; i < 12; i++) {
        setTimeout(createPearl, i * 400);
    }

    // Initial light particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createLightParticle, i * 200);
    }

    // Continuous floating items
    setInterval(createFloatingItem, 2200);

    // Continuous bubbles
    setInterval(createBubble, 1200);

    // Continuous pearls
    setInterval(createPearl, 3000);

    // Continuous light particles
    setInterval(createLightParticle, 1500);

    // Occasional whale swim-by (every 20-40 seconds)
    function scheduleWhale() {
        const delay = Math.random() * 20000 + 20000;
        setTimeout(() => {
            createSwimmingWhale();
            scheduleWhale();
        }, delay);
    }
    // First whale after 5 seconds
    setTimeout(() => {
        createSwimmingWhale();
        scheduleWhale();
    }, 5000);
}

/**
 * Mouse interaction - underwater glow particles follow cursor
 */
function initMouseInteraction() {
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 100) return;
        lastTime = now;

        if (Math.random() > 0.6) {
            const glow = document.createElement('div');
            const isBlue = Math.random() > 0.3;
            glow.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: ${Math.random() * 4 + 4}px;
                height: ${Math.random() * 4 + 4}px;
                border-radius: 50%;
                background: ${isBlue ? 'rgba(196, 224, 249, 0.8)' : 'rgba(72, 201, 176, 0.7)'};
                box-shadow: 0 0 ${Math.random() * 8 + 6}px ${isBlue ? 'rgba(196, 224, 249, 0.5)' : 'rgba(72, 201, 176, 0.4)'};
                pointer-events: none;
                z-index: 50;
                transition: all 1.2s ease-out;
                opacity: 0.9;
            `;
            floatsContainer.appendChild(glow);

            requestAnimationFrame(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 40 + 20;
                glow.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 30}px) scale(0)`;
                glow.style.opacity = '0';
            });

            setTimeout(() => { glow.remove(); }, 1200);
        }
    });
}

/**
 * Touch interaction for mobile - create bubbles on tap
 */
function initTouchInteraction() {
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.style.cssText = `
                    position: fixed;
                    left: ${touch.clientX + (Math.random() - 0.5) * 40}px;
                    top: ${touch.clientY + (Math.random() - 0.5) * 40}px;
                    width: ${Math.random() * 12 + 4}px;
                    height: ${Math.random() * 12 + 4}px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(196,224,249,0.2), transparent);
                    border: 1px solid rgba(255,255,255,0.2);
                    pointer-events: none;
                    z-index: 50;
                    transition: all 1.5s ease-out;
                    opacity: 0.8;
                `;
                floatsContainer.appendChild(bubble);

                requestAnimationFrame(() => {
                    bubble.style.transform = `translateY(-${Math.random() * 80 + 40}px) scale(${Math.random() * 0.5 + 0.5})`;
                    bubble.style.opacity = '0';
                });

                setTimeout(() => { bubble.remove(); }, 1500);
            }, i * 100);
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
    initEffects();
    initMouseInteraction();
    initTouchInteraction();

    console.log('🌊 Promise Day page initialized!');
    console.log('Happy Promise Day! 🐚🌙');
});
