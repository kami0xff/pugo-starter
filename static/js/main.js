// Xlovecam Support Center JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // ===================================
  // Language Dropdown
  // ===================================
  const langToggle = document.getElementById('langToggle');
  const langDropdown = langToggle?.closest('.language-dropdown');
  
  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    
    document.addEventListener('click', function(e) {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
      }
    });
  }
  
  // ===================================
  // Mobile Menu
  // ===================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
    });
  }
  
  // ===================================
  // Search Clear Button
  // ===================================
  const searchInput = document.querySelector('.search-input');
  const searchClear = document.querySelector('.search-clear');
  
  if (searchInput && searchClear) {
    searchClear.addEventListener('click', function() {
      searchInput.value = '';
      searchInput.focus();
    });
  }
  
  // ===================================
  // FAQ Accordion
  // ===================================
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const content = this.nextElementSibling;
      
      // Close all other accordions
      accordionTriggers.forEach(otherTrigger => {
        if (otherTrigger !== this) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherTrigger.nextElementSibling.hidden = true;
        }
      });
      
      // Toggle current accordion
      this.setAttribute('aria-expanded', !isExpanded);
      content.hidden = isExpanded;
    });
  });
  
  // ===================================
  // Smooth Scroll for Anchor Links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ===================================
  // Popular Search Tags
  // ===================================
  const searchTags = document.querySelectorAll('.search-tag');
  
  searchTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const searchText = this.textContent.trim();
      if (searchInput) {
        searchInput.value = searchText;
        searchInput.focus();
      }
    });
  });

  // ===================================
  // Video Modal
  // ===================================
  const videoModal = document.getElementById('videoModal');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');
  const tutorialCards = document.querySelectorAll('.tutorial-card[data-video-url]');

  function openVideoModal(videoUrl, title) {
    if (!videoModal || !videoPlayer || !videoSource) return;
    
    videoSource.src = videoUrl;
    videoPlayer.load();
    videoModalTitle.textContent = title || 'Video Tutorial';
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Auto-play after a short delay
    setTimeout(() => {
      videoPlayer.play().catch(() => {
        // Autoplay blocked, user will need to click play
      });
    }, 300);
  }

  function closeVideoModal() {
    if (!videoModal || !videoPlayer) return;
    
    videoPlayer.pause();
    videoModal.classList.remove('open');
    document.body.style.overflow = '';
    
    // Clear source after animation
    setTimeout(() => {
      videoSource.src = '';
      videoPlayer.load();
    }, 300);
  }

  tutorialCards.forEach(card => {
    card.addEventListener('click', function() {
      const videoUrl = this.dataset.videoUrl;
      const title = this.dataset.videoTitle;
      if (videoUrl) {
        openVideoModal(videoUrl, title);
      }
    });
  });

  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }

  if (videoModalBackdrop) {
    videoModalBackdrop.addEventListener('click', closeVideoModal);
  }

  // ===================================
  // Image Lightbox
  // ===================================
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxTriggers = document.querySelectorAll('.image-lightbox');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImage) return;
    
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
    lightboxCaption.textContent = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      lightboxImage.src = '';
    }, 300);
  }

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const src = this.href;
      const alt = this.dataset.alt || '';
      openLightbox(src, alt);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox || e.target.classList.contains('image-lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }

});

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', function(e) {
  // Close dropdowns and modals on Escape
  if (e.key === 'Escape') {
    const openDropdowns = document.querySelectorAll('.language-dropdown.open');
    openDropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }

    // Close video modal
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoModal?.classList.contains('open')) {
      videoPlayer?.pause();
      videoModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Close image lightbox
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox?.classList.contains('open')) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  
  // Focus search on /
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

