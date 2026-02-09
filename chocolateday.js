/**
 * CHOCOLATE DAY - INTERACTIVE SCRIPT
 * Features: Floating chocolates animation with sweet effects
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const chocolatesContainer = document.getElementById('chocolatesContainer');

// Chocolate and sweet emojis for floating animation
const chocolateEmojis = ['🍫', '🍬', '🍭', '🧁', '🎂', '🍩', '🍪', '🤎', '💝', '✨'];

// ============================================
// FLOATING CHOCOLATES BACKGROUND
// ============================================

/**
 * Creates a floating chocolate element with random properties
 * Each chocolate has random position, size, speed, and emoji
 */
function createFloatingChocolate() {
    const chocolate = document.createElement('div');
    chocolate.classList.add('floating-chocolate');
    
    // Random emoji from chocolate collection
    chocolate.textContent = chocolateEmojis[Math.floor(Math.random() * chocolateEmojis.length)];
    
    // Random horizontal position (0-100%)
    chocolate.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (8-16 seconds for varied speeds)
    const duration = Math.random() * 8 + 8;
    chocolate.style.animationDuration = duration + 's';
    
    // Random size (1.5-3.5rem)
    const size = Math.random() * 2 + 1.5;
    chocolate.style.fontSize = size + 'rem';
    
    // Random opacity (0.5-0.9)
    chocolate.style.opacity = Math.random() * 0.4 + 0.5;
    
    // Random delay before animation starts
    chocolate.style.animationDelay = Math.random() * 2 + 's';
    
    // Add to container
    chocolatesContainer.appendChild(chocolate);
    
    // Remove chocolate after animation completes to prevent DOM buildup
    setTimeout(() => {
        chocolate.remove();
    }, (duration + 2) * 1000);
}

/**
 * Creates chocolate drip effect at top of screen
 */
function createChocolateDrip() {
    const drip = document.createElement('div');
    drip.classList.add('chocolate-drip');
    
    // Random horizontal position
    drip.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 3 + 3;
    drip.style.animationDuration = duration + 's';
    
    // Random delay
    drip.style.animationDelay = Math.random() * 2 + 's';
    
    // Random opacity
    drip.style.opacity = Math.random() * 0.3 + 0.3;
    
    // Add to container
    chocolatesContainer.appendChild(drip);
    
    // Remove after some time
    setTimeout(() => {
        drip.remove();
    }, 20000);
}

/**
 * Creates a sparkle/heart burst effect at click position
 */
function createSweetBurst(x, y) {
    const burstEmojis = ['🤎', '💕', '✨', '🍫', '💖'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            transition: all 0.8s ease-out;
        `;
        particle.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
        
        document.body.appendChild(particle);
        
        // Animate outward
        const angle = (i / 8) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
            particle.style.opacity = '0';
        });
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

/**
 * Initialize floating chocolates background
 * Creates chocolates at intervals for continuous effect
 */
function initFloatingChocolates() {
    // Create initial batch of chocolates
    for (let i = 0; i < 12; i++) {
        setTimeout(createFloatingChocolate, i * 400);
    }
    
    // Create initial drips
    for (let i = 0; i < 5; i++) {
        setTimeout(createChocolateDrip, i * 1000);
    }
    
    // Continue creating chocolates every 1.2 seconds
    setInterval(createFloatingChocolate, 1200);
    
    // Continue creating drips every 4 seconds
    setInterval(createChocolateDrip, 4000);
}

/**
 * Add click interaction - create sweet burst on click
 */
function initClickInteraction() {
    document.addEventListener('click', (e) => {
        // Don't trigger on links or buttons
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
        
        createSweetBurst(e.clientX, e.clientY);
    });
}

/**
 * Add mousemove interaction - occasional floating chocolates near cursor
 */
function initMouseInteraction() {
    let lastChocolateTime = 0;
    const throttleTime = 200;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastChocolateTime < throttleTime) return;
        lastChocolateTime = now;
        
        // 15% chance to spawn a mini chocolate at cursor
        if (Math.random() > 0.85) {
            const miniChoco = document.createElement('div');
            miniChoco.textContent = '🤎';
            miniChoco.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 50;
                transition: all 1.5s ease-out;
                opacity: 0.8;
            `;
            
            chocolatesContainer.appendChild(miniChoco);
            
            // Float upward
            requestAnimationFrame(() => {
                miniChoco.style.transform = `translateY(-80px) rotate(${Math.random() * 360}deg)`;
                miniChoco.style.opacity = '0';
            });
            
            // Remove after animation
            setTimeout(() => {
                miniChoco.remove();
            }, 1500);
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initFloatingChocolates();
    initClickInteraction();
    initMouseInteraction();
    
    console.log('🍫 Chocolate Day page initialized!');
    console.log('Happy Chocolate Day! 🤎');
});
