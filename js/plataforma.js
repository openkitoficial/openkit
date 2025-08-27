
// DOM Elements
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const lessonNumber = document.getElementById('lessonNumber');
const lessonDuration = document.getElementById('lessonDuration');
const lessonItems = document.querySelectorAll('.lesson-item');
const header = document.querySelector('.header');
const loadingOverlay = document.getElementById('loadingOverlay');

// Course data and state
let currentLesson = 1;
const totalLessons = 18;

// Initialize the platform
document.addEventListener('DOMContentLoaded', function() {
    initializePlatform();
    setupEventListeners();
    
    console.log('Plataforma OpenKit carregada com sucesso!');
});

// Initialize platform
function initializePlatform() {
    // Set first lesson as active by default
    const firstLesson = document.querySelector('.lesson-item[data-lesson="1"]');
    if (firstLesson) {
        firstLesson.classList.add('active');
        // Carrega o primeiro vídeo automaticamente
        selectLesson(firstLesson);
    }
    
    // Add fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.video-section, .lessons-sidebar').forEach(el => {
            el.classList.add('fade-in-up');
        });
    }, 100);
}

// Setup event listeners
function setupEventListeners() {
    // Lesson click events
    lessonItems.forEach(lesson => {
        lesson.addEventListener('click', () => {
            selectLesson(lesson);
        });
        
        // Keyboard accessibility
        lesson.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                lesson.click();
            }
        });
        
        // Make lessons focusable
        lesson.setAttribute('tabindex', '0');
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Video load event
    videoPlayer.addEventListener('load', hideLoadingOverlay);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Select and load lesson
function selectLesson(lessonElement) {
    const videoId = lessonElement.getAttribute('data-video');
    const title = lessonElement.getAttribute('data-title');
    const duration = lessonElement.getAttribute('data-duration');
    const lessonNum = parseInt(lessonElement.getAttribute('data-lesson'));
    
    // Validation
    if (!videoId || videoId === 'VIDEO_ID_AQUI') {
        showNotification('Vídeo ainda não disponível para esta aula.', 'warning');
        return;
    }
    
    // Update active lesson
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('active');
    });
    lessonElement.classList.add('active');
    
    // Show loading animation
    showLoadingOverlay();
    
    // Update video with delay for loading animation
    setTimeout(() => {
        updateVideo(videoId, title, lessonNum, duration);
    }, 500);
    
    // Update current lesson
    currentLesson = lessonNum;
    
    // Scroll to active lesson on mobile
    if (window.innerWidth <= 768) {
        lessonElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Save last watched lesson
    saveLastLesson(lessonNum);
}

// Update video player
function updateVideo(videoId, title, lessonNum, duration) {
    // Update video player source
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    
    videoPlayer.src = embedUrl;
    videoPlayer.title = title;
    
    // Update video info
    videoTitle.textContent = title;
    lessonNumber.textContent = `Aula ${lessonNum} de ${totalLessons}`;
    lessonDuration.textContent = duration;
    
    // Update page title
    document.title = `${title} - OpenKit`;
    
    // Hide loading after a realistic delay
    setTimeout(() => {
        hideLoadingOverlay();
    }, 2000);
}

// Show loading overlay
function showLoadingOverlay() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

// Hide loading overlay
function hideLoadingOverlay() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

// Header scroll effects
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(23, 23, 26, 0.98)';
        header.style.borderBottom = '1px solid rgba(118, 65, 230, 0.2)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(23, 23, 26, 0.95)';
        header.style.borderBottom = '1px solid rgba(118, 65, 230, 0.1)';
        header.style.boxShadow = 'none';
    }
}

// Handle window resize
function handleResize() {
    // Adjust layout if needed based on new window size
    if (window.innerWidth <= 768) {
        console.log('Mobile layout active');
    } else {
        console.log('Desktop layout active');
    }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Only handle shortcuts when not in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            navigateLesson('previous');
            break;
        case 'ArrowDown':
            e.preventDefault();
            navigateLesson('next');
            break;
        case ' ':
            e.preventDefault();
            break;
        case 'Escape':
            document.activeElement.blur();
            break;
    }
}

// Navigate between lessons
function navigateLesson(direction) {
    const currentLessonElement = document.querySelector('.lesson-item.active');
    let targetLesson;
    
    if (direction === 'next') {
        targetLesson = currentLessonElement?.nextElementSibling;
    } else {
        targetLesson = currentLessonElement?.previousElementSibling;
    }
    
    if (targetLesson && targetLesson.classList.contains('lesson-item')) {
        targetLesson.click();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        if (window.innerWidth <= 480) {
            notification.classList.add('show');
        } else {
            notification.style.transform = 'translateX(0)';
        }
    }, 100);
    
    // Auto hide
    setTimeout(() => {
        if (window.innerWidth <= 480) {
            notification.classList.remove('show');
        } else {
            notification.style.transform = 'translateX(400px)';
        }
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Utility functions
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    }
}

// Local storage functions (using variables instead for browser compatibility)
let savedData = {
    lastLesson: null
};

function saveLastLesson(lessonNum) {
    savedData.lastLesson = lessonNum;
    console.log('Lesson saved:', lessonNum);
}

function loadLastLesson() {
    if (savedData.lastLesson) {
        const lessonElement = document.querySelector(`[data-lesson="${savedData.lastLesson}"]`);
        if (lessonElement) {
            setTimeout(() => {
                lessonElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
        }
    }
}

// Error handling
videoPlayer.addEventListener('error', () => {
    showNotification('Erro ao carregar o vídeo. Tente novamente.', 'error');
    hideLoadingOverlay();
});

// Track lesson views
function trackLessonView(lessonNum, lessonTitle) {
    console.log(`Lesson viewed: ${lessonNum} - ${lessonTitle}`);
}

console.log('OpenKit Platform JavaScript loaded successfully!');
   