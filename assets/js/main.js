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

  document.addEventListener("keydown", function (e) {
    if (
      (e.key === "Escape" || e.key === "Esc") &&
      !menu_modal.classList.contains("opacity-0")
    ) {
      toggleModal();
    }
  });

});