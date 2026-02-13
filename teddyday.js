/**
 * TEDDY DAY - INTERACTIVE SCRIPT
 * Features: Floating teddies, pandas, twinkling stars, warm light orbs
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const floatsContainer = document.getElementById('floatsContainer');

// Teddy and panda emojis for floating animation
const teddyEmojis = ['🐼', '🧸', '🐻', '💛', '🌙', '⭐', '✨', '💫', '🌟'];

// Star characters for twinkling background
const starChars = ['✦', '✧', '★', '⋆', '✶', '✹'];

// ============================================
// FLOATING TEDDIES BACKGROUND
// ============================================

/**
 * Creates a floating teddy/panda element
 */
function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');

    item.textContent = teddyEmojis[Math.floor(Math.random() * teddyEmojis.length)];
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
    star.style.top = Math.random() * 60 + '%'; // keep in upper portion like a night sky

    const size = Math.random() * 0.8 + 0.5;
    star.style.fontSize = size + 'rem';
    star.style.color = Math.random() > 0.5 ? '#ffc947' : '#ffffff';

    const duration = Math.random() * 2 + 2;
    star.style.animationDuration = duration + 's';
    star.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(star);

    // Replace star after a while (cycle through)
    setTimeout(() => { star.remove(); }, 15000);
}

/**
 * Creates a floating warm light orb
 */
function createLightOrb() {
    const orb = document.createElement('div');
    orb.classList.add('light-orb');

    orb.style.left = Math.random() * 100 + '%';
    orb.style.top = Math.random() * 100 + '%';

    const size = Math.random() * 6 + 4;
    orb.style.width = size + 'px';
    orb.style.height = size + 'px';

    const hue = Math.random() > 0.5 ? '45' : '30'; // warm yellow or orange
    orb.style.background = `hsl(${hue}, 100%, 70%)`;
    orb.style.boxShadow = `0 0 ${size * 2}px ${size}px hsla(${hue}, 100%, 70%, 0.4)`;

    const duration = Math.random() * 4 + 6;
    orb.style.animationDuration = duration + 's';
    orb.style.animationDelay = Math.random() * 3 + 's';

    floatsContainer.appendChild(orb);

    setTimeout(() => { orb.remove(); }, 20000);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all floating and twinkling effects
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

    // Initial light orbs
    for (let i = 0; i < 10; i++) {
        setTimeout(createLightOrb, i * 400);
    }

    // Continuous floating items
    setInterval(createFloatingItem, 1800);

    // Continuous twinkling stars
    setInterval(createTwinkleStar, 800);

    // Continuous light orbs
    setInterval(createLightOrb, 2500);
}

/**
 * Mouse interaction - gentle glow particles follow cursor
 */
function initMouseInteraction() {
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 120) return;
        lastTime = now;

        if (Math.random() > 0.7) {
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #ffc947;
                box-shadow: 0 0 10px 4px rgba(255, 201, 71, 0.5);
                pointer-events: none;
                z-index: 50;
                transition: all 1s ease-out;
                opacity: 0.9;
            `;
            floatsContainer.appendChild(glow);

            requestAnimationFrame(() => {
                glow.style.transform = `translateY(-50px) scale(0)`;
                glow.style.opacity = '0';
            });

            setTimeout(() => { glow.remove(); }, 1000);
        }
    });
}

// ============================================
// CLICK INTERACTION - TEDDY BURST
// ============================================

/**
 * Creates a teddy burst effect on click
 */
function createTeddyBurst(x, y) {
    const teddies = ['🧸', '🐼', '🐻', '💛', '⭐', '✨'];
    const count = Math.floor(Math.random() * 4) + 5;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const teddy = document.createElement('div');
            const emoji = teddies[Math.floor(Math.random() * teddies.length)];
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const distance = Math.random() * 60 + 30;
            const duration = Math.random() * 0.4 + 0.6;

            teddy.textContent = emoji;
            teddy.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 55;
                will-change: transform, opacity;
                animation: teddyBurst ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                --burst-x: ${Math.cos(angle) * distance}px;
                --burst-y: ${Math.sin(angle) * distance}px;
            `;

            floatsContainer.appendChild(teddy);
            setTimeout(() => { teddy.remove(); }, duration * 1000 + 100);
        }, i * 40);
    }
}

/**
 * Creates warm sparkles on click
 */
function createWarmSparkles(x, y) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;
            const hue = Math.random() > 0.5 ? '45' : '30';

            sparkle.style.cssText = `
                position: fixed;
                left: ${x + offsetX}px;
                top: ${y + offsetY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: hsl(${hue}, 100%, 70%);
                box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, 100%, 70%, 0.5);
                pointer-events: none;
                z-index: 55;
                will-change: transform, opacity;
                animation: warmSparkle 0.7s ease-out forwards;
            `;

            floatsContainer.appendChild(sparkle);
            setTimeout(() => { sparkle.remove(); }, 700);
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
        @keyframes teddyBurst {
            0% {
                transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + var(--burst-x, 40px)),
                    calc(-50% + var(--burst-y, 40px))
                ) scale(0.6) rotate(20deg);
                opacity: 0;
            }
        }

        @keyframes warmSparkle {
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

        // Create teddy burst
        createTeddyBurst(x, y);

        // Create warm sparkles
        createWarmSparkles(x, y);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initEffects();
    initMouseInteraction();
    initClickInteraction();

    console.log('🐼 Teddy Day page initialized!');
    console.log('Happy Teddy Day! 💛');
});
