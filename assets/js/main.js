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
      pauseOnMouseEnter: true,
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

  // Mobile Navigation Slide Animation
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const closeNavBtn = document.getElementById("closeNavBtn");

  function openMobileNav() {
    if (mobileNav && window.innerWidth < 1024) {
      // Temporarily remove max-height to get the natural height
      mobileNav.style.maxHeight = "none";
      hamburgerBtn.style.display = "none";
      const height = mobileNav.scrollHeight;
      // Set back to 0 to prepare for animation
      mobileNav.style.maxHeight = "0";
      // Force reflow
      mobileNav.offsetHeight;
      // Now animate to the actual height
      requestAnimationFrame(() => {
        mobileNav.style.maxHeight = "800px";
        mobileNav.classList.add("menu-open");
      });
    }
  }

  function closeMobileNav() {
    if (mobileNav && window.innerWidth < 1024) {
      // Get current height
      const height = mobileNav.scrollHeight;
      mobileNav.style.maxHeight = height + "px";
      // Force reflow
      mobileNav.offsetHeight;
      // Animate to 0
      requestAnimationFrame(() => {
        mobileNav.style.maxHeight = "0";
        mobileNav.classList.remove("menu-open");
      });
      hamburgerBtn.style.display = "block";
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openMobileNav();
    });
  }

  if (closeNavBtn) {
    closeNavBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeMobileNav();
    });
  }
});


