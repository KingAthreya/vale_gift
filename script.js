/**
 * VALENTINE SUCCESS PAGE - INTERACTIVE SCRIPT
 * Features: Floating hearts, music player, gift button navigation
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

// Main interactive elements
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const mainContainer = document.getElementById('mainContainer');
const audioContainer = document.getElementById('audioContainer');

// Heart emojis for floating animation
const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '🩷', '❤️'];

// Confetti emojis for celebration
const confettiEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '🩷', '❤️', '✨', '🎉', '🎊', '💐', '🌹'];

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================

/**
 * Creates a floating heart element with random properties
 * Each heart has random position, size, speed, and emoji
 */
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    // Random emoji from heart collection
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Random horizontal position (0-100%)
    heart.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (6-12 seconds for varied speeds)
    const duration = Math.random() * 6 + 6;
    heart.style.animationDuration = duration + 's';
    
    // Random size (1-2.5rem)
    const size = Math.random() * 1.5 + 1;
    heart.style.fontSize = size + 'rem';
    
    // Random opacity (0.3-0.7)
    heart.style.opacity = Math.random() * 0.4 + 0.3;
    
    // Add to container
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes to prevent DOM buildup
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

/**
 * Initialize floating hearts background
 * Creates hearts at intervals for continuous effect
 */
function initFloatingHearts() {
    // Create initial batch of hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
    
    // Continue creating hearts every 800ms
    setInterval(createFloatingHeart, 800);
}

// ============================================
// CONFETTI CELEBRATION
// ============================================

/**
 * Creates a confetti piece with random properties
 * @param {number} startX - Starting X position
 * @param {number} startY - Starting Y position
 */
function createConfettiPiece(startX, startY) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Random emoji
    confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
    
    // Starting position (with some randomness)
    const offsetX = (Math.random() - 0.5) * 200;
    confetti.style.left = (startX + offsetX) + 'px';
    confetti.style.top = startY + 'px';
    
    // Random size
    const size = Math.random() * 1.5 + 1;
    confetti.style.fontSize = size + 'rem';
    
    // Random animation delay
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    
    // Add to container
    confettiContainer.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
        confetti.remove();
    }, 3500);
}

/**
 * Triggers confetti celebration burst
 * Creates multiple confetti pieces from center of screen
 */
function triggerConfetti() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(centerX, centerY);
        }, i * 30);
    }
}

/**
 * Continuous confetti for celebration
 * Creates falling confetti from top of screen
 */
function startConfettiRain() {
    let count = 0;
    const maxConfetti = 100;
    
    const rainInterval = setInterval(() => {
        if (count >= maxConfetti) {
            clearInterval(rainInterval);
            return;
        }
        
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        
        // Random horizontal position
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        
        // Random size
        const size = Math.random() * 1.5 + 0.8;
        confetti.style.fontSize = size + 'rem';
        
        // Random animation duration
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
        
        count++;
    }, 50);
}

// ============================================
// GIFT BUTTON NAVIGATION
// ============================================

/**
 * Handles "Unlock Gift" button click
 * Navigates to Propose Day gift page (current day)
 */
function handleGiftClick() {
    // Navigate to Propose Day page (current unlockable day)
    window.location.href = 'proposeday.html';
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // "Unlock Gift" button click - navigate to Rose Day page
    const unlockGiftBtn = document.getElementById('unlockGiftBtn');
    if (unlockGiftBtn) {
        unlockGiftBtn.addEventListener('click', handleGiftClick);
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initEventListeners();
    
    // Trigger initial confetti celebration
    triggerConfetti();
    startConfettiRain();
    
    console.log('💕 Valentine Success Page initialized! 💕');
    console.log('She said YES!');
});
