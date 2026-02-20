document.addEventListener("DOMContentLoaded", function () {

  // AOS
  if (typeof (AOS) !== "undefined") {
    AOS.init();
  }

  // -------------------------  SWIPER  -----------------------------------

  let topFvSwiper;
  topFvSwiper = new Swiper(".swiper-fv-top", {
    centeredSlides: true,
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    effect: "fade",
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // Testimonial Swiper
  let testimonialSwiper = new Swiper(".swiper-testimonial", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1.3,
        centeredSlides: true,
        spaceBetween: 10,
      },
    },
    navigation: {
      nextEl: ".testimonial-button-next",
      prevEl: ".testimonial-button-prev",
    },
  });

  // -------------------------  Others  -----------------------------------

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    function toggleScrollToTopButton() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none");
        scrollToTopBtn.classList.add("opacity-100", "pointer-events-auto");
      } else {
        scrollToTopBtn.classList.add("opacity-0", "pointer-events-none");
        scrollToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
      }
    }

    // Scroll to top function
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Event listeners
    window.addEventListener("scroll", toggleScrollToTopButton);
    scrollToTopBtn.addEventListener("click", scrollToTop);

    // Initial check
    toggleScrollToTopButton();
  }

  // ------------------------------------------------------------

  // ------------------------------------------------------------

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const menu_modal = document.getElementById("menu_modal");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", toggleModal);
  }

  function toggleModal() {
    if (menu_modal.classList.contains("opacity-0")) {
      // open
      menu_modal.classList.remove("pointer-events-none", "opacity-0");
      menu_modal.classList.add("pointer-events-auto", "opacity-100");
    } else {
      // close
      menu_modal.classList.add("opacity-0");
      menu_modal.classList.remove("opacity-100", "pointer-events-auto");
      menu_modal.classList.add("pointer-events-none");
      document.body.style.overflow = "";
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleModal);
  }

  // Close modal when any in-modal anchor link is clicked (anchor navigation will then work)
  const menuModalLinks = menu_modal ? menu_modal.querySelectorAll('a[href^="#"]') : [];
  menuModalLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (!menu_modal.classList.contains("opacity-0")) {
        toggleModal();
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (
      (e.key === "Escape" || e.key === "Esc") &&
      !menu_modal.classList.contains("opacity-0")
    ) {
      toggleModal();
    }
  });

  // -------------------------  Nav active state (anchor links + scroll)  --------
  const navLinks = document.querySelectorAll('.nav-link[data-nav]');
  const sectionIds = ['home', 'concept', 'room', 'menu', 'item', 'access', 'qa'];

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('data-nav') === id) {
        link.classList.add('nav-active');
      } else {
        link.classList.remove('nav-active');
      }
    });
  }

  function updateActiveFromHash() {
    const hash = window.location.hash.slice(1);
    if (hash && sectionIds.includes(hash)) {
      setActiveNav(hash);
      return true;
    }
    return false;
  }

  // On load: if hash is set, use it; otherwise rely on Intersection Observer
  if (updateActiveFromHash()) {
    // hash drove state; observer will take over on scroll
  } else {
    setActiveNav('home');
  }

  window.addEventListener('hashchange', updateActiveFromHash);

  // Intersection Observer: set active nav from scroll position (which section is in view)
  const headerOffset = 120;
  const observerOptions = { root: null, rootMargin: `-${headerOffset}px 0px -60% 0px`, threshold: 0 };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (sectionIds.includes(id)) setActiveNav(id);
    });
  }, observerOptions);

  sectionIds.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});