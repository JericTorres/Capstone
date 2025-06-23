(function() {
  "use strict";

  /**
   * Apply .scrolled class to body on scroll (header sticky logic)
   */
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header) return;

    const stickyClasses = ['scroll-up-sticky', 'sticky-top', 'fixed-top'];
    if (!stickyClasses.some(cls => header.classList.contains(cls))) return;

    if (window.scrollY > 100) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  }

  /**
   * Mobile navigation toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function toggleMobileNav() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
  }

  /**
   * Hide mobile nav when clicking same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        toggleMobileNav();
      }
    });
  });

  /**
   * Mobile nav dropdown toggles
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const parent = toggle.parentNode;
      parent.classList.toggle('active');
      if (parent.nextElementSibling) {
        parent.nextElementSibling.classList.toggle('dropdown-active');
      }
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader removal after page load
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button behavior
   */
  const scrollTopBtn = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Animate on scroll initialization (AOS)
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initialize PureCounter if available
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Initialize Isotope filtering and layout
   */
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let isotopeInstance;
    const container = isotopeItem.querySelector('.isotope-container');

    if (typeof imagesLoaded !== 'undefined' && container) {
      imagesLoaded(container, () => {
        isotopeInstance = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
      filterBtn.addEventListener('click', () => {
        const active = isotopeItem.querySelector('.isotope-filters .filter-active');
        if (active) active.classList.remove('filter-active');
        filterBtn.classList.add('filter-active');
        if (isotopeInstance) {
          isotopeInstance.arrange({ filter: filterBtn.getAttribute('data-filter') });
        }
        aosInit();
      });
    });
  });

  /**
   * Initialize Swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      try {
        const configEl = swiperElement.querySelector(".swiper-config");
        if (!configEl) return;

        const config = JSON.parse(configEl.textContent.trim());

        if (swiperElement.classList.contains("swiper-tab")) {
          // Custom init for swiper-tab type (implement if needed)
          // For now, fallback to normal swiper
          new Swiper(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      } catch (err) {
        console.error("Failed to initialize swiper:", err);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Initialize GLightbox
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * CHATBOT TOGGLE LOGIC
   */
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');

  if (chatbotToggleBtn && chatbotContainer && chatbotCloseBtn) {
    // Open chatbot
    chatbotToggleBtn.addEventListener('click', e => {
      e.stopPropagation();
      chatbotContainer.style.display = 'flex';
      setTimeout(() => chatbotContainer.style.opacity = '1', 10);
      chatbotToggleBtn.style.display = 'none';
      chatbotContainer.setAttribute('aria-hidden', 'false');
    });

    // Close chatbot
    chatbotCloseBtn.addEventListener('click', e => {
      e.stopPropagation();
      chatbotContainer.style.opacity = '0';
      setTimeout(() => {
        chatbotContainer.style.display = 'none';
        chatbotToggleBtn.style.display = 'flex';
        chatbotContainer.setAttribute('aria-hidden', 'true');
      }, 300);
    });

    // Close chatbot if clicking outside
    document.addEventListener('click', e => {
      if (!chatbotContainer.contains(e.target) && e.target !== chatbotToggleBtn && chatbotContainer.style.display === 'flex') {
        chatbotContainer.style.opacity = '0';
        setTimeout(() => {
          chatbotContainer.style.display = 'none';
          chatbotToggleBtn.style.display = 'flex';
          chatbotContainer.setAttribute('aria-hidden', 'true');
        }, 300);
      }
    });

    // Close chatbot on ESC key press
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && chatbotContainer.style.display === 'flex') {
        chatbotContainer.style.opacity = '0';
        setTimeout(() => {
          chatbotContainer.style.display = 'none';
          chatbotToggleBtn.style.display = 'flex';
          chatbotContainer.setAttribute('aria-hidden', 'true');
        }, 300);
      }
    });
  }

  // Listen to scroll and load for header and scroll top toggles
  window.addEventListener('scroll', () => {
    toggleScrolled();
    toggleScrollTop();
  });
  window.addEventListener('load', () => {
    toggleScrolled();
    toggleScrollTop();
  });

})();
