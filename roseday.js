/**
 * ROSE DAY - INTERACTIVE SCRIPT
 * Features: Floating roses animation
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const rosesContainer = document.getElementById('rosesContainer');

// Rose and flower emojis for floating animation
const flowerEmojis = ['🌹', '🌸', '🌺', '🌷', '💐', '🥀', '🏵️', '💮'];

// ============================================
// FLOATING ROSES BACKGROUND
// ============================================

/**
 * Creates a floating rose/flower element with random properties
 * Each flower has random position, size, speed, and emoji
 */
function createFloatingRose() {
    const rose = document.createElement('div');
    rose.classList.add('floating-rose');
    
    // Random emoji from flower collection
    rose.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    
    // Random horizontal position (0-100%)
    rose.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (8-15 seconds for varied speeds)
    const duration = Math.random() * 7 + 8;
    rose.style.animationDuration = duration + 's';
    
    // Random size (1.5-3rem)
    const size = Math.random() * 1.5 + 1.5;
    rose.style.fontSize = size + 'rem';
    
    // Random opacity (0.4-0.8)
    rose.style.opacity = Math.random() * 0.4 + 0.4;
    
    // Random delay before animation starts
    rose.style.animationDelay = Math.random() * 2 + 's';
    
    // Add to container
    rosesContainer.appendChild(rose);
    
    // Remove rose after animation completes to prevent DOM buildup
    setTimeout(() => {
        rose.remove();
    }, (duration + 2) * 1000);
}

/**
 * Initialize floating roses background
 * Creates roses at intervals for continuous effect
 */
function initFloatingRoses() {
    // Create initial batch of roses
    for (let i = 0; i < 12; i++) {
        setTimeout(createFloatingRose, i * 400);
    }
    
    // Continue creating roses every 1.2 seconds
    setInterval(createFloatingRose, 1200);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initFloatingRoses();
    
    console.log('🌹 Rose Day page initialized!');
    console.log('Happy Rose Day!');
});
