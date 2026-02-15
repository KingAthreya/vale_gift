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
const musicPlayer = document.getElementById('musicPlayer');

// Heart emojis for floating animation
const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '🩷', '❤️', '🩶', '💜'];

// Confetti emojis for celebration
const confettiEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '🩷', '❤️', '✨', '🎉', '🎊', '💐', '🌹', '⭐', '🌟'];

// Music player state
let isPlaying = false;
let youtubePlayer = null;
let playerReady = false;

// ============================================
// MUSIC PLAYER TOGGLE
// ============================================

/**
 * Initialize YouTube IFrame API
 */
function initYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

/**
 * Called by YouTube API when ready
 */
window.onYouTubeIframeAPIReady = function() {
    youtubePlayer = new YT.Player('youtubePlayer', {
        height: '1',
        width: '1',
        videoId: 'OTOmQmOFeVo',
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': 'OTOmQmOFeVo',
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'modestbranding': 1,
            'playsinline': 1,
            'origin': window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

/**
 * Called when player is ready
 */
function onPlayerReady(event) {
    playerReady = true;
    console.log('🎵 Music player ready');
    // Try autoplay — browsers may block this without user gesture
    event.target.playVideo();
    // Check after a short delay if it actually started
    setTimeout(() => {
        if (youtubePlayer && youtubePlayer.getPlayerState) {
            const state = youtubePlayer.getPlayerState();
            // YT.PlayerState.PLAYING = 1
            if (state === 1) {
                isPlaying = true;
                updateMusicPlayerUI(true);
            } else {
                // Autoplay was blocked — show paused state, user click will start it
                isPlaying = false;
                updateMusicPlayerUI(false);
                console.log('🎵 Autoplay blocked — click music player to start');
            }
        }
    }, 1000);
}

/**
 * Called when player state changes
 */
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        updateMusicPlayerUI(true);
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        updateMusicPlayerUI(false);
    } else if (event.data === YT.PlayerState.ENDED) {
        // Loop — restart
        event.target.playVideo();
    }
}

/**
 * Toggle music play/pause
 */
function toggleMusic() {
    if (!youtubePlayer || !playerReady) return;
    
    // Check actual player state instead of relying on flag
    const state = youtubePlayer.getPlayerState ? youtubePlayer.getPlayerState() : -1;
    
    if (state === 1) { // YT.PlayerState.PLAYING
        youtubePlayer.pauseVideo();
        isPlaying = false;
        updateMusicPlayerUI(false);
    } else {
        youtubePlayer.playVideo();
        isPlaying = true;
        updateMusicPlayerUI(true);
    }
}

/**
 * Update music player visual state
 */
function updateMusicPlayerUI(playing) {
    const musicIcon = document.querySelector('.music-icon');
    const musicLabel = document.querySelector('.music-label');
    
    if (playing) {
        if (musicIcon) musicIcon.textContent = '🎵';
        if (musicLabel) musicLabel.textContent = 'Now Playing';
        if (musicPlayer) musicPlayer.classList.remove('paused');
    } else {
        if (musicIcon) musicIcon.textContent = '🔇';
        if (musicLabel) musicLabel.textContent = 'Tap to Play';
        if (musicPlayer) musicPlayer.classList.add('paused');
    }
}

/**
 * Initialize music player click handler
 */
function initMusicPlayer() {
    if (musicPlayer) {
        musicPlayer.style.cursor = 'pointer';
        musicPlayer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMusic();
        });
        // Start in paused visual state until autoplay is confirmed
        updateMusicPlayerUI(false);
    }
}

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
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 500);
    }
    
    // Continue creating hearts every 1.5s (reduced for smoothness)
    setInterval(createFloatingHeart, 1500);
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
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 800);
    }
    
    setInterval(createParticle, 3500);
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
    
    // Create 15 confetti pieces (reduced for performance)
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createConfettiPiece(centerX, centerY);
        }, i * 60);
    }
}

/**
 * Continuous confetti for celebration
 * Creates falling confetti from top of screen
 */
function startConfettiRain() {
    let count = 0;
    const maxConfetti = 20; // Reduced for smoothness
    
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
    }, 150); // Slower interval for smoothness
}

// ============================================
// GIFT BUTTON NAVIGATION
// ============================================

/**
 * Handles "Unlock Gift" button click
 * Navigates to Kiss Day gift page (current day)
 */
function handleGiftClick() {
    window.location.href = 'valentineday.html';
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
        if (now - lastTime < 200) return; // Increased throttle
        lastTime = now;
        
        if (Math.random() > 0.8) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: rgba(255, 105, 180, 0.7);
                box-shadow: 0 0 8px 3px rgba(255, 105, 180, 0.3);
                pointer-events: none;
                z-index: 50;
                transition: all 0.6s ease-out;
                opacity: 0.8;
                will-change: transform, opacity;
            `;
            document.body.appendChild(sparkle);
            
            requestAnimationFrame(() => {
                sparkle.style.transform = `translateY(-25px) scale(0)`;
                sparkle.style.opacity = '0';
            });
            
            setTimeout(() => sparkle.remove(), 600);
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
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                const angle = (Math.PI * 2 / 4) * i;
                const distance = 25 + Math.random() * 15;
                
                heart.textContent = emoji;
                heart.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    font-size: 0.9rem;
                    pointer-events: none;
                    z-index: 60;
                    transition: all 0.5s ease-out;
                    opacity: 1;
                    will-change: transform, opacity;
                `;
                document.body.appendChild(heart);
                
                requestAnimationFrame(() => {
                    heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`;
                    heart.style.opacity = '0';
                });
                
                setTimeout(() => heart.remove(), 500);
            }, i * 40);
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
    initYouTubeAPI();
    initMusicPlayer();
    
    // Trigger initial confetti celebration
    triggerConfetti();
    startConfettiRain();
    
    console.log('💕 Valentine Success Page initialized! 💕');
    console.log('She said YES!');
});
