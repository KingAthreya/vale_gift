/**
 * VALENTINE PROPOSAL - INTERACTIVE SCRIPT
 * Features: Floating hearts, playful "No" button, confetti celebration
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

// Main interactive elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const successMessage = document.getElementById('successMessage');
const proposalContainer = document.querySelector('.proposal-container');

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
// PLAYFUL "NO" BUTTON
// ============================================

/**
 * Moves the "No" button to a random position when hovered
 * Creates a playful, hard-to-click effect
 */
function moveNoButton() {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Calculate safe area (keep button within viewport with padding)
    const padding = 20;
    const maxX = viewportWidth - btnWidth - padding;
    const maxY = viewportHeight - btnHeight - padding;
    
    // Generate random position
    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;
    
    // Apply new position with smooth transition
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '10';
    
    // Add playful rotation
    const rotation = Math.random() * 20 - 10;
    noBtn.style.transform = `rotate(${rotation}deg)`;
}

/**
 * Reset "No" button position (for mobile/touch devices)
 */
function resetNoButton() {
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.transform = 'none';
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
// SUCCESS STATE
// ============================================

/**
 * Handles "Yes" button click
 * Shows success message and triggers celebrations
 */
function handleYesClick() {
    // Immediately show success message
    successMessage.classList.add('show');
    
    // Start playing music and update player UI
    startMusic();
    updateMusicPlayer();
    
    // Trigger confetti celebrations
    triggerConfetti();
    startConfettiRain();
    
    // Create additional burst after a delay
    setTimeout(triggerConfetti, 500);
    setTimeout(triggerConfetti, 1000);
}

/**
 * Starts playing the YouTube music
 * Creates and inserts the iframe after user interaction
 */
function startMusic() {
    const audioContainer = document.getElementById('audioContainer');
    
    // Create the iframe for YouTube audio
    const iframe = document.createElement('iframe');
    iframe.width = '0';
    iframe.height = '0';
    iframe.src = 'https://www.youtube.com/embed/OTOmQmOFeVo?autoplay=1&loop=1&playlist=OTOmQmOFeVo';
    iframe.title = 'You & Me - James TW';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    
    // Insert the iframe
    audioContainer.appendChild(iframe);
    
    console.log('🎵 Music started playing!');
}

/**
 * Updates the music player UI to show "Now Playing"
 */
function updateMusicPlayer() {
    const musicLabel = document.querySelector('.music-label');
    if (musicLabel) {
        musicLabel.textContent = 'Now Playing';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // "Yes" button click - celebrate!
    yesBtn.addEventListener('click', handleYesClick);
    
    // "No" button hover - move away playfully (desktop only)
    if (window.matchMedia('(pointer: fine)').matches) {
        noBtn.addEventListener('mouseenter', moveNoButton);
    }
    
    // "No" button click - playful message
    noBtn.addEventListener('click', () => {
        // Show playful alert
        const messages = [
            'Nice try! 😄',
            'You can\'t say no to love! 💕',
            'Try clicking Yes instead! 💖',
            'My heart says you mean Yes! 💗'
        ];
        alert(messages[Math.floor(Math.random() * messages.length)]);
    });
    
    // Handle window resize - reset no button if needed
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            resetNoButton();
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
    initFloatingHearts();
    initEventListeners();
    
    console.log('💕 Valentine Proposal initialized! 💕');
    console.log('Will you be my Valentine?');
});
