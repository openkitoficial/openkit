// DOM Elements
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const lessonNumber = document.getElementById('lessonNumber');
const lessonDuration = document.getElementById('lessonDuration');
const lessonItems = document.querySelectorAll('.lesson-item');
const header = document.querySelector('.header');

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
    
    // Video events
    setupVideoEvents();
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
    
    // Update video
    updateVideo(videoId, title, lessonNum, duration);
    
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
    // Show loading state
    showVideoLoading();
    
    // Update video player source
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    
    // Update player with slight delay for smooth transition
    setTimeout(() => {
        videoPlayer.src = embedUrl;
        videoPlayer.title = title;
        hideVideoLoading();
    }, 500);
    
    // Update video info
    videoTitle.textContent = title;
    lessonNumber.textContent = `Aula ${lessonNum} de ${totalLessons}`;
    lessonDuration.textContent = duration;
    
    // Update page title
    document.title = `${title} - OpenKit`;
}

// Show video loading state
function showVideoLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-video';
    loadingDiv.id = 'videoLoading';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <span>Carregando vídeo...</span>
    `;
    
    const container = document.querySelector('.video-player-container');
    container.appendChild(loadingDiv);
}

// Hide video loading state
function hideVideoLoading() {
    const loadingDiv = document.getElementById('videoLoading');
    if (loadingDiv) {
        loadingDiv.remove();
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
            // Toggle video play/pause (YouTube iframe doesn't allow direct control)
            break;
        case 'Escape':
            // Focus management
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

// Setup video events for tracking
function setupVideoEvents() {
    // Note: Due to YouTube iframe restrictions, we can't directly listen to video events
    // You might need to use YouTube Player API for advanced video tracking
    
    // Basic visibility tracking
    let videoVisible = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === videoPlayer) {
                videoVisible = entry.isIntersecting;
                if (videoVisible) {
                    console.log('Video is visible');
                } else {
                    console.log('Video is not visible');
                }
            }
        });
    });
    
    observer.observe(videoPlayer);
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
    
    const colorMap = {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${iconMap[type]}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${colorMap[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        font-family: 'Inter', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
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

// Local storage for last watched lesson (optional)
function saveLastLesson(lessonNum) {
    try {
        localStorage.setItem('openkit_fileserver_last_lesson', lessonNum);
    } catch (error) {
        console.log('Could not save lesson to localStorage');
    }
}

function loadLastLesson() {
    try {
        const lastLesson = localStorage.getItem('openkit_fileserver_last_lesson');
        if (lastLesson) {
            const lessonElement = document.querySelector(`[data-lesson="${lastLesson}"]`);
            if (lessonElement) {
                // Don't auto-play, just highlight the last watched lesson
                setTimeout(() => {
                    lessonElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1000);
            }
        }
    } catch (error) {
        console.log('Could not load lesson from localStorage');
    }
}

// Load saved lesson on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLastLesson();
});

// Responsive utilities
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Handle window resize
window.addEventListener('resize', () => {
    // Adjust layout if needed
    if (isMobileDevice()) {
        console.log('Mobile layout active');
    } else {
        console.log('Desktop layout active');
    }
});

// Error handling for video loading
videoPlayer.addEventListener('error', () => {
    showNotification('Erro ao carregar o vídeo. Tente novamente.', 'error');
    hideVideoLoading();
});

// Analytics tracking (optional - replace with your analytics service)
function trackLessonView(lessonNum, lessonTitle) {
    // Example: Google Analytics, Mixpanel, etc.
    console.log(`Lesson viewed: ${lessonNum} - ${lessonTitle}`);
    
    // Uncomment and modify for your analytics service
    // gtag('event', 'lesson_view', {
    //     lesson_number: lessonNum,
    //     lesson_title: lessonTitle,
    //     course_name: 'File Server Linux'
    // });
}

document.addEventListener('DOMContentLoaded', function() {
    initializePlatform();
    setupEventListeners();

    // Seleciona automaticamente a primeira aula
    const primeiraAula = document.querySelector('.lesson-item[data-lesson="1"]');
    if (primeiraAula) {
        selectLesson(primeiraAula); // chama a função que carrega o vídeo
    }

    console.log('Plataforma OpenKit carregada com sucesso!');
});




console.log('OpenKit Platform JavaScript loaded successfully!');