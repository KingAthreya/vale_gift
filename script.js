/**
 * VALENTINE SUCCESS PAGE - INTERACTIVE SCRIPT
 * Features: Floating hearts, music player, gift button navigation, particles
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

// Main interactive elements
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const mainContainer = document.getElementById('mainContainer');
const audioContainer = document.getElementById('audioContainer');
const bgParticles = document.getElementById('bgParticles');

// Heart emojis for floating animation
const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '🩷', '❤️', '🩶', '💜'];

// Confetti emojis for celebration
const confettiEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '🩷', '❤️', '✨', '🎉', '🎊', '💐', '🌹', '⭐', '🌟'];

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
// BACKGROUND PARTICLES
// ============================================

/**
 * Creates a background particle
 */
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 6 + 2;
    const hue = Math.random() * 30 + 330; // Pink/red range
    
    particle.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: hsla(${hue}, 80%, 80%, 0.4);
        box-shadow: 0 0 ${size * 2}px hsla(${hue}, 80%, 80%, 0.3);
        animation-duration: ${Math.random() * 15 + 15}s;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    bgParticles.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 30000);
}

/**
 * Initialize background particles
 */
function initParticles() {
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 500);
    }
    
    setInterval(createParticle, 2000);
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
    
    // Create 25 confetti pieces (reduced from 50)
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            createConfettiPiece(centerX, centerY);
        }, i * 50);
    }
}

/**
 * Continuous confetti for celebration
 * Creates falling confetti from top of screen
 */
function startConfettiRain() {
    let count = 0;
    const maxConfetti = 40; // Reduced from 100
    
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
    }, 100); // Slower interval
}

// ============================================
// GIFT BUTTON NAVIGATION
// ============================================

/**
 * Handles "Unlock Gift" button click
 * Navigates to Kiss Day gift page (current day)
 */
function handleGiftClick() {
    // Navigate to Kiss Day page (current unlockable day)
    window.location.href = 'kissday.html';
}

// ============================================
// MOUSE INTERACTION
// ============================================

/**
 * Creates sparkle effect on mouse move
 */
function initMouseInteraction() {
    let lastTime = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 100) return;
        lastTime = now;
        
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: rgba(255, 105, 180, 0.8);
                box-shadow: 0 0 10px 4px rgba(255, 105, 180, 0.4);
                pointer-events: none;
                z-index: 50;
                transition: all 0.8s ease-out;
                opacity: 0.9;
            `;
            document.body.appendChild(sparkle);
            
            requestAnimationFrame(() => {
                sparkle.style.transform = `translateY(-30px) scale(0)`;
                sparkle.style.opacity = '0';
            });
            
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
    });
}

// ============================================
// CLICK INTERACTION
// ============================================

/**
 * Creates heart burst on click
 */
function initClickInteraction() {
    document.addEventListener('click', (e) => {
        // Don't trigger on buttons or links
        if (e.target.closest('button') || e.target.closest('a')) return;
        
        // Create small heart burst
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                const angle = (Math.PI * 2 / 5) * i;
                const distance = 30 + Math.random() * 20;
                
                heart.textContent = emoji;
                heart.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    font-size: 1rem;
                    pointer-events: none;
                    z-index: 60;
                    transition: all 0.6s ease-out;
                    opacity: 1;
                `;
                document.body.appendChild(heart);
                
                requestAnimationFrame(() => {
                    heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`;
                    heart.style.opacity = '0';
                });
                
                setTimeout(() => {
                    heart.remove();
                }, 600);
            }, i * 50);
        }
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // "Unlock Gift" button click - navigate to Hug Day page
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
    initParticles();
    initEventListeners();
    initMouseInteraction();
    initClickInteraction();
    
    // Trigger initial confetti celebration
    triggerConfetti();
    startConfettiRain();
    
    console.log('💕 Valentine Success Page initialized! 💕');
    console.log('She said YES!');
});
