/**
 * PROPOSE DAY - INTERACTIVE SCRIPT
 * Features: Floating butterflies animation with sparkle effects
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const butterfliesContainer = document.getElementById('butterfliesContainer');

// Butterfly and related emojis for floating animation
const butterflyEmojis = ['🦋', '🫧', '✨', '💫', '💜', '🌟', '⭐', '🔮'];

// Sparkle characters for background effects
const sparkleChars = ['✨', '⭐', '💫', '✦', '✧', '★'];

// ============================================
// FLOATING BUTTERFLIES BACKGROUND
// ============================================

/**
 * Creates a floating butterfly element with random properties
 * Each butterfly has random position, size, speed, and emoji
 */
function createFloatingButterfly() {
    const butterfly = document.createElement('div');
    butterfly.classList.add('floating-butterfly');
    
    // Random emoji from butterfly collection
    butterfly.textContent = butterflyEmojis[Math.floor(Math.random() * butterflyEmojis.length)];
    
    // Random horizontal position (0-100%)
    butterfly.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (10-18 seconds for varied speeds)
    const duration = Math.random() * 8 + 10;
    butterfly.style.animationDuration = duration + 's';
    
    // Random size (1.5-3.5rem)
    const size = Math.random() * 2 + 1.5;
    butterfly.style.fontSize = size + 'rem';
    
    // Random opacity (0.5-0.9)
    butterfly.style.opacity = Math.random() * 0.4 + 0.5;
    
    // Random delay before animation starts
    butterfly.style.animationDelay = Math.random() * 3 + 's';
    
    // Add to container
    butterfliesContainer.appendChild(butterfly);
    
    // Remove butterfly after animation completes to prevent DOM buildup
    setTimeout(() => {
        butterfly.remove();
    }, (duration + 3) * 1000);
}

/**
 * Creates a sparkle effect at random position
 */
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Random sparkle character
    sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    
    // Random position
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 1 + 0.5;
    sparkle.style.fontSize = size + 'rem';
    
    // Random animation duration
    const duration = Math.random() * 2 + 2;
    sparkle.style.animationDuration = duration + 's';
    
    // Random delay
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    
    // Add to container
    butterfliesContainer.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, (duration + 2) * 1000);
}

/**
 * Initialize floating butterflies background
 * Creates butterflies and sparkles at intervals for continuous effect
 */
function initFloatingButterflies() {
    // Create initial batch of butterflies
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingButterfly, i * 500);
    }
    
    // Create initial sparkles
    for (let i = 0; i < 15; i++) {
        setTimeout(createSparkle, i * 300);
    }
    
    // Continue creating butterflies every 1.5 seconds
    setInterval(createFloatingButterfly, 1500);
    
    // Continue creating sparkles every 600ms
    setInterval(createSparkle, 600);
}

/**
 * Add mousemove interaction - create butterflies on cursor movement
 */
function initMouseInteraction() {
    let lastButterflyTime = 0;
    const throttleTime = 150; // Minimum ms between butterfly spawns
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastButterflyTime < throttleTime) return;
        lastButterflyTime = now;
        
        // 20% chance to spawn a butterfly at cursor
        if (Math.random() > 0.8) {
            const butterfly = document.createElement('div');
            butterfly.classList.add('floating-butterfly');
            butterfly.textContent = '🦋';
            butterfly.style.left = e.clientX + 'px';
            butterfly.style.top = e.clientY + 'px';
            butterfly.style.fontSize = '1.5rem';
            butterfly.style.opacity = '0.7';
            butterfly.style.animation = 'none';
            butterfly.style.transition = 'all 1s ease-out';
            
            butterfliesContainer.appendChild(butterfly);
            
            // Animate away
            requestAnimationFrame(() => {
                butterfly.style.transform = `translate(${(Math.random() - 0.5) * 100}px, -100px)`;
                butterfly.style.opacity = '0';
            });
            
            // Remove after animation
            setTimeout(() => {
                butterfly.remove();
            }, 1000);
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
    initFloatingButterflies();
    initMouseInteraction();
    
    console.log('🦋 Propose Day page initialized!');
    console.log('Happy Propose Day! 💜');
});
