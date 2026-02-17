document.addEventListener("DOMContentLoaded", function () {

  // AOS
  if (typeof (AOS) !== "undefined") {
    AOS.init();
  }

  // -------------------------  SWIPER  -----------------------------------

  // Customer feedback slider (.swiper-feedback) (index-invest.html)
  // NOTE: This slider uses 6 slides that are 2x duplicates of 3 items.
  // We want pagination to show only 3 bullets while staying in sync as slides change.
  const feedbackSwiperEl = document.querySelector(".swiper-feedback");
  if (feedbackSwiperEl) {
    const wrapper = feedbackSwiperEl.querySelector(".swiper-wrapper");
    if (wrapper) {
      const originalSlides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
      originalSlides.forEach((slide) => wrapper.appendChild(slide.cloneNode(true)));
    }
    const feedbackOriginalSlides = feedbackSwiperEl.querySelectorAll(
      ".swiper-wrapper > .swiper-slide"
    );
    const feedbackSlideCount = feedbackOriginalSlides.length;
    const feedbackPageCount =
      feedbackSlideCount > 0 && feedbackSlideCount % 2 === 0
        ? feedbackSlideCount / 2
        : feedbackSlideCount;

    const renderFeedbackPagination = (swiper) => {
      const activePageIndex =
        feedbackPageCount > 0 ? swiper.realIndex % feedbackPageCount : 0;

      let html = "";
      for (let i = 0; i < feedbackPageCount; i++) {
        const activeClass = i === activePageIndex ? " swiper-pagination-bullet-active" : "";
        html += `<span class="swiper-pagination-bullet${activeClass}" data-swiper-pagination-index="${i}" role="button" tabindex="0" aria-label="Go to slide ${i + 1}"></span>`;
      }
      return html;
    };

    const getClosestFeedbackSlideIndexForPage = (pageIndex, currentRealIndex) => {
      if (feedbackPageCount === feedbackSlideCount) return pageIndex;

      // Expecting a "double set": [0..pageCount-1] and [pageCount..slideCount-1]
      const a = pageIndex;
      const b = pageIndex + feedbackPageCount;
      if (b >= feedbackSlideCount) return a;
      return Math.abs(a - currentRealIndex) <= Math.abs(b - currentRealIndex) ? a : b;
    };

    let feedbackSwiper;
    feedbackSwiper = new Swiper(".swiper-feedback", {
      centeredSlides: true,
      loop: true,
      speed: 1000,
      spaceBetween: -20,
      slidesPerView: 1.15,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-feedback-pagination",
        type: "custom",
        renderCustom: (swiper) => renderFeedbackPagination(swiper),
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 2.9,
          spaceBetween: 20,
        },
      },
      loopedSlides: feedbackSlideCount,
    });

    // Make custom bullets clickable (event delegation so it survives re-render)
    const feedbackPaginationEl = document.querySelector(".swiper-feedback-pagination");
    if (feedbackPaginationEl) {
      feedbackPaginationEl.addEventListener("click", (e) => {
        const bullet = e.target.closest("[data-swiper-pagination-index]");
        if (!bullet) return;
        const pageIndex = Number(bullet.getAttribute("data-swiper-pagination-index"));
        if (Number.isNaN(pageIndex)) return;

        const targetSlideIndex = getClosestFeedbackSlideIndexForPage(
          pageIndex,
          feedbackSwiper.realIndex
        );

        if (typeof feedbackSwiper.slideToLoop === "function") {
          feedbackSwiper.slideToLoop(targetSlideIndex);
        } else {
          feedbackSwiper.slideTo(targetSlideIndex);
        }
      });
    }
  }

  // Scale active/other slides for .swiper-consultation
  // Duplicate 3 HTML slides to 6 in JS so loop works; pagination shows 3 bullets.
  const CONSULTATION_ORIGINAL_SLIDE_COUNT = 3;
  const consultationSwiperEl = document.querySelector(".swiper-consultation");
  if (consultationSwiperEl) {
    const wrapper = consultationSwiperEl.querySelector(".swiper-wrapper");
    if (wrapper && wrapper.children.length === CONSULTATION_ORIGINAL_SLIDE_COUNT) {
      const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
      slides.forEach((slide) => wrapper.appendChild(slide.cloneNode(true)));
    }
    const consultationOriginalSlides = consultationSwiperEl.querySelectorAll(
      ".swiper-wrapper > .swiper-slide"
    );
    const consultationSlideCount = consultationOriginalSlides.length;
    const consultationPageCount = CONSULTATION_ORIGINAL_SLIDE_COUNT;

    const renderConsultationPagination = (swiper) => {
      const activePageIndex =
        consultationPageCount > 0 ? swiper.realIndex % consultationPageCount : 0;

      let html = "";
      for (let i = 0; i < consultationPageCount; i++) {
        const activeClass = i === activePageIndex ? " swiper-pagination-bullet-active" : "";
        html += `<span class="swiper-pagination-bullet${activeClass}" data-swiper-pagination-index="${i}" role="button" tabindex="0" aria-label="Go to slide ${i + 1}"></span>`;
      }
      return html;
    };

    const getClosestSlideIndexForPage = (pageIndex, currentRealIndex) => {
      if (consultationPageCount === consultationSlideCount) return pageIndex;

      // Expecting a "double set": [0..pageCount-1] and [pageCount..slideCount-1]
      const a = pageIndex;
      const b = pageIndex + consultationPageCount;
      if (b >= consultationSlideCount) return a;
      return Math.abs(a - currentRealIndex) <= Math.abs(b - currentRealIndex) ? a : b;
    };

    let consultation_swiper;
    consultation_swiper = new Swiper(".swiper-consultation", {
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-consultation-pagination",
        type: "custom",
        renderCustom: (swiper) => renderConsultationPagination(swiper),
      },
      navigation: {
        nextEl: ".swiper-consultation-right-nav-btn",
        prevEl: ".swiper-consultation-left-nav-btn",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 1,
        },
        1280: {
          slidesPerView: 1.5,
        },
      },
      loopedSlides: CONSULTATION_ORIGINAL_SLIDE_COUNT,
      on: {
        init: function () {
          if (window.innerWidth >= 1440) { // Apply only on PC
            this.slides.forEach((slide, idx) => {
              if (idx === this.activeIndex) {
                slide.style.transform = 'scale(1.1)';
                slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
                slide.style.backgroundColor = 'rgb(245,247,249)';
              } else {
                slide.style.transform = 'scale(0.9)';
                slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
                slide.style.backgroundColor = 'rgb(186,191,200)';
              }
            });
          } else {
            // Reset scale for mobile/tablet
            this.slides.forEach((slide) => {
              slide.style.transform = '';
              slide.style.transition = 'background-color 0.7s ease';
              slide.style.backgroundColor = 'rgb(245,247,249)';;
            });
          }
        },
        slideChange: function () {
          if (window.innerWidth >= 1440) { // Apply only on PC
            this.slides.forEach((slide, idx) => {
              if (idx === this.activeIndex) {
                slide.style.transform = 'scale(1.1)';
                slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
                slide.style.backgroundColor = 'rgb(245,247,249)';
              } else {
                slide.style.transform = 'scale(0.9)';
                slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
                slide.style.backgroundColor = 'rgb(186,191,200)';
              }
            });
          } else {
            // Reset scale for mobile/tablet
            this.slides.forEach((slide) => {
              slide.style.transform = '';
              slide.style.transition = 'background-color 0.7s ease';
              slide.style.backgroundColor = 'rgb(245,247,249)';;
            });
          }
        }
      }
    });

    // Make custom bullets clickable (event delegation so it survives re-render)
    const consultationPaginationEl = document.querySelector(".swiper-consultation-pagination");
    if (consultationPaginationEl) {
      consultationPaginationEl.addEventListener("click", (e) => {
        const bullet = e.target.closest("[data-swiper-pagination-index]");
        if (!bullet) return;
        const pageIndex = Number(bullet.getAttribute("data-swiper-pagination-index"));
        if (Number.isNaN(pageIndex)) return;

        const targetSlideIndex = getClosestSlideIndexForPage(
          pageIndex,
          consultation_swiper.realIndex
        );

        if (typeof consultation_swiper.slideToLoop === "function") {
          consultation_swiper.slideToLoop(targetSlideIndex);
        } else {
          consultation_swiper.slideTo(targetSlideIndex);
        }
      });
    }
  }

  // Swiper for .swiper-investment-steps (SP only). 3 slides duplicated to 6; pagination shows 3 dots.
  let investmentStepsSwiper;
  let investmentStepsPaginationClickBound = false;
  const INVESTMENT_STEPS_ORIGINAL_SLIDE_COUNT = 3;
  const INVESTMENT_STEPS_PAGE_COUNT = 3;

  const renderInvestmentStepsPagination = (swiper) => {
    const activePageIndex = swiper.realIndex % INVESTMENT_STEPS_PAGE_COUNT;
    let html = "";
    for (let i = 0; i < INVESTMENT_STEPS_PAGE_COUNT; i++) {
      const activeClass = i === activePageIndex ? " swiper-pagination-bullet-active" : "";
      html += `<span class="swiper-pagination-bullet${activeClass}" data-swiper-pagination-index="${i}" role="button" tabindex="0" aria-label="Go to step ${i + 1}"></span>`;
    }
    return html;
  };

  const getClosestInvestmentStepsSlideIndexForPage = (pageIndex, currentRealIndex) => {
    const a = pageIndex;
    const b = pageIndex + INVESTMENT_STEPS_PAGE_COUNT;
    if (b >= INVESTMENT_STEPS_ORIGINAL_SLIDE_COUNT * 2) return a;
    return Math.abs(a - currentRealIndex) <= Math.abs(b - currentRealIndex) ? a : b;
  };

  function initInvestmentStepsSwiper() {
    const swiperEl = document.querySelector(".swiper-investment-steps");
    if (!swiperEl) return;

    const wrapper = swiperEl.querySelector(".swiper-wrapper");
    if (!wrapper) return;

    if (investmentStepsSwiper) {
      investmentStepsSwiper.destroy(true, true);
      investmentStepsSwiper = undefined;
      while (wrapper.children.length > INVESTMENT_STEPS_ORIGINAL_SLIDE_COUNT) {
        wrapper.removeChild(wrapper.lastChild);
      }
    }

    if (window.innerWidth < 768) {
      if (wrapper.children.length === INVESTMENT_STEPS_ORIGINAL_SLIDE_COUNT) {
        const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
        slides.forEach((slide) => wrapper.appendChild(slide.cloneNode(true)));
      }

      investmentStepsSwiper = new Swiper(swiperEl, {
        slidesPerView: 1.15,
        spaceBetween: -20,
        slidesPerGroup: 1,
        loop: true,
        centeredSlides: true,
        speed: 1000,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: ".swiper-investment-steps-pagination",
          type: "custom",
          renderCustom: (swiper) => renderInvestmentStepsPagination(swiper),
        },
      });

      if (!investmentStepsPaginationClickBound) {
        const paginationEl = document.querySelector(".swiper-investment-steps-pagination");
        if (paginationEl) {
          investmentStepsPaginationClickBound = true;
          paginationEl.addEventListener("click", (e) => {
            const bullet = e.target.closest("[data-swiper-pagination-index]");
            if (!bullet || !investmentStepsSwiper) return;
            const pageIndex = Number(bullet.getAttribute("data-swiper-pagination-index"));
            if (Number.isNaN(pageIndex)) return;
            const targetSlideIndex = getClosestInvestmentStepsSlideIndexForPage(
              pageIndex,
              investmentStepsSwiper.realIndex
            );
            if (typeof investmentStepsSwiper.slideToLoop === "function") {
              investmentStepsSwiper.slideToLoop(targetSlideIndex);
            } else {
              investmentStepsSwiper.slideTo(targetSlideIndex);
            }
          });
        }
      }
    }
  }

  window.addEventListener('resize', initInvestmentStepsSwiper);
  initInvestmentStepsSwiper();

  // Swiper for .swiper-property (index-invest.html)
  let propertySwiper;
  let propertyPaginationClickBound = false;
  const PROPERTY_ORIGINAL_SLIDE_COUNT = 3;
  const PROPERTY_PAGE_COUNT = 3;

  const renderPropertyPagination = (swiper) => {
    const activePageIndex = swiper.realIndex % PROPERTY_PAGE_COUNT;
    let html = "";
    for (let i = 0; i < PROPERTY_PAGE_COUNT; i++) {
      const activeClass = i === activePageIndex ? " swiper-pagination-bullet-active" : "";
      html += `<span class="swiper-pagination-bullet${activeClass}" data-swiper-pagination-index="${i}" role="button" tabindex="0" aria-label="Go to property ${i + 1}"></span>`;
    }
    return html;
  };
  const getClosestPropertySlideIndexForPage = (pageIndex, currentRealIndex) => {
    const a = pageIndex;
    const b = pageIndex + PROPERTY_PAGE_COUNT;
    if (b >= PROPERTY_ORIGINAL_SLIDE_COUNT * 2) return a;
    return Math.abs(a - currentRealIndex) <= Math.abs(b - currentRealIndex) ? a : b;
  };
  function initPropertySwiper() {
    const swiperEl = document.querySelector(".swiper-property");
    if (!swiperEl) return;
    const wrapper = swiperEl.querySelector(".swiper-wrapper");
    if (!wrapper) return;
    if (propertySwiper) {
      propertySwiper.destroy(true, true);
      propertySwiper = undefined;
    }
    if (wrapper.children.length === PROPERTY_ORIGINAL_SLIDE_COUNT) {
      const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
      slides.forEach((slide) => wrapper.appendChild(slide.cloneNode(true)));
    }

    propertySwiper = new Swiper(swiperEl, {
      slidesPerView: 1.15,
      spaceBetween: -20,
      slidesPerGroup: 1,
      loop: true,
      centeredSlides: true,
      speed: 1000,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-property-pagination",
        type: "custom",
        clickable: true,
        renderCustom: (swiper) => renderPropertyPagination(swiper),
      },
      navigation: {
        nextEl: ".swiper-property-right-nav-btn",
        prevEl: ".swiper-property-left-nav-btn",
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
          spaceBetween: -50,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 1.5,
          spaceBetween: -50,
        },
      },
      // loopedSlides: PROPERTY_ORIGINAL_SLIDE_COUNT,
    });
  }
  window.addEventListener('resize', initPropertySwiper);
  initPropertySwiper();


  let ourCasesSwiper;
  const OUR_CASES_ORIGINAL_SLIDE_COUNT = 2;

  function initOurCasesSwiper() {
    const swiperEl = document.querySelector(".swiper-our-cases");
    if (!swiperEl) return;

    const wrapper = swiperEl.querySelector(".swiper-wrapper");
    if (!wrapper) return;

    if (ourCasesSwiper) {
      ourCasesSwiper.destroy(true, true);
      ourCasesSwiper = undefined;
      // Remove JS-duplicated slides so we're back to original 2
      while (wrapper.children.length > OUR_CASES_ORIGINAL_SLIDE_COUNT) {
        wrapper.removeChild(wrapper.lastChild);
      }
    }

    if (window.innerWidth >= 768) {
      // Duplicate 2 slides to 4 via JS so loop works
      if (wrapper.children.length === OUR_CASES_ORIGINAL_SLIDE_COUNT) {
        const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
        slides.forEach((slide) => {
          wrapper.appendChild(slide.cloneNode(true));
        });
      }

      ourCasesSwiper = new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 25,
        slidesPerGroup: 1,
        loop: true,
        centeredSlides: false,
        speed: 1000,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 1.84,
            spaceBetween: -50,
          },
          1440: {
            slidesPerView: 1.84,
            spaceBetween: -50,
          },
        },
      });
    }
  }

  window.addEventListener('resize', initOurCasesSwiper);
  initOurCasesSwiper();

  // Our Cases panels (rebuilding.html): 2 flex items, hover grows one; dots set/reflect active
  const ourCasesPanelsEl = document.getElementById("our-cases-panels");
  if (ourCasesPanelsEl) {
    const panels = ourCasesPanelsEl.querySelectorAll(".cases-panel");
    const dots = ourCasesPanelsEl.querySelectorAll(".cases-dot");

    function setActiveIndex(index) {
      const i = Number(index);
      if (Number.isNaN(i) || i < 0 || i >= panels.length) return;
      panels.forEach((p) => p.classList.toggle("active", Number(p.getAttribute("data-index")) === i));
      dots.forEach((d) => d.classList.toggle("cases-dot-active", Number(d.getAttribute("data-index")) === i));
    }

    panels.forEach((panel) => {
      panel.addEventListener("mouseenter", () => setActiveIndex(panel.getAttribute("data-index")));
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => setActiveIndex(dot.getAttribute("data-index")));
    });
    setActiveIndex(0);

    const row = ourCasesPanelsEl.querySelector(".cases-panels-row");
    if (row) {
      requestAnimationFrame(() => {
        let height;
        if (window.matchMedia("(min-width: 1440px)").matches) {
          height = 445;
        } else if (window.matchMedia("(min-width: 1024px)").matches) {
          height = 378;
        } else if (window.matchMedia("(min-width: 768px)").matches) {
          height = 258;
        } else {
          height = null;
        }
        if (height) {
          row.style.height = `${height}px`;
        } else {
          row.style.height = "auto";
        }
      });
    }
  }

  // Initialize .swiper-research Swiper only on SP (< 768px). 3 slides duplicated to 6 for loop. Pagination: single track + one moving dot.
  const RESEARCH_SLIDE_COUNT = 3;
  const RESEARCH_SWIPER_SPEED = 1000;
  let researchSwiper;
  let researchPaginationClickBound = false;

  const renderResearchPagination = (swiper) => {
    const realIndex = swiper.realIndex % RESEARCH_SLIDE_COUNT;
    const leftPercent = realIndex === 0 ? 0 : realIndex === 1 ? 50 : 100;
    return `<div class="research-pagination-track" role="presentation" data-research-pagination>
      <span class="research-pagination-thumb" style="left: ${leftPercent}%"></span>
    </div>`;
  };

  function initResearchSwiper() {
    const swiperEl = document.querySelector(".swiper-research");
    if (!swiperEl) return;

    const wrapper = swiperEl.querySelector(".swiper-wrapper");
    if (!wrapper) return;

    if (researchSwiper) {
      researchSwiper.destroy(true, true);
      researchSwiper = undefined;
      while (wrapper.children.length > RESEARCH_SLIDE_COUNT) {
        wrapper.removeChild(wrapper.lastChild);
      }
    }

    if (window.innerWidth < 768) {
      if (wrapper.children.length === RESEARCH_SLIDE_COUNT) {
        const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
        slides.forEach((slide) => wrapper.appendChild(slide.cloneNode(true)));
      }

      researchSwiper = new Swiper(swiperEl, {
        loop: true,
        speed: RESEARCH_SWIPER_SPEED,
        spaceBetween: 10,
        slidesPerView: 1.2,
        loopedSlides: RESEARCH_SLIDE_COUNT,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: ".swiper-research-pagination",
          type: "custom",
          renderCustom: (swiper) => renderResearchPagination(swiper),
        },
      });

      // if (!researchPaginationClickBound) {
      //   const paginationEl = document.querySelector(".swiper-research-pagination");
      //   if (paginationEl) {
      //     researchPaginationClickBound = true;
      //     paginationEl.addEventListener("click", (e) => {
      //       const track = e.target.closest("[data-research-pagination]");
      //       if (!track || !researchSwiper) return;
      //       const rect = track.getBoundingClientRect();
      //       const x = e.clientX - rect.left;
      //       const pct = Math.max(0, Math.min(1, x / rect.width));
      //       const index = pct < 1 / 3 ? 0 : pct < 2 / 3 ? 1 : 2;
      //       if (typeof researchSwiper.slideToLoop === "function") {
      //         researchSwiper.slideToLoop(index, RESEARCH_SWIPER_SPEED);
      //       } else {
      //         researchSwiper.slideTo(index, RESEARCH_SWIPER_SPEED);
      //       }
      //     });
      //   }
      // }
    }
  }
  window.addEventListener('resize', initResearchSwiper);
  initResearchSwiper();


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

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Escape" || e.key === "Esc") && mobileNav && mobileNav.classList.contains("menu-open")) {
      closeMobileNav();
    }
  });

  // Reset menu state on window resize (if resizing from mobile/tablet to desktop)
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
      if (mobileNav) {
        mobileNav.style.maxHeight = "";
        mobileNav.classList.remove("menu-open");
      }
      if (hamburgerBtn) {
        hamburgerBtn.style.display = "";
      }
    }
  });

  // Company dropdown toggle (会社概要) - smooth slide from height 0
  const companyToggleBtn = document.getElementById("companyToggleBtn");
  const companyDropdownMenu = document.getElementById("companyDropdownMenu");
  const companyToggleBtnIcon = document.getElementById("companyToggleBtnIcon");
  let isCompanyMenuOpen = false;

  if (companyToggleBtn && companyDropdownMenu) {
    companyToggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      if (!isCompanyMenuOpen) {
        // Open: slide down from height 0
        const fullHeight = companyDropdownMenu.scrollHeight;
        companyDropdownMenu.style.maxHeight = fullHeight + "px";
        companyDropdownMenu.style.opacity = "1";
        if (companyToggleBtnIcon) {
          companyToggleBtnIcon.style.transform = "rotate(180deg)";
        }
        // Add white background on SP/tablet when open (< 1024)
        if (window.innerWidth < 1024) {
          companyToggleBtn.style.backgroundColor = "#DFE3E8";
          companyToggleBtn.style.color = "#193759";
          companyDropdownMenu.style.backgroundColor = "#DFE3E8";
        }
        isCompanyMenuOpen = true;
      } else {
        // Close: slide up to height 0
        companyDropdownMenu.style.maxHeight = "0";
        companyDropdownMenu.style.opacity = "0";
        if (companyToggleBtnIcon) {
          companyToggleBtnIcon.style.transform = "rotate(0deg)";
        }
        // Remove white background on SP/tablet when closed
        if (window.innerWidth < 1024) {
          companyToggleBtn.style.backgroundColor = "";
          companyToggleBtn.style.color = "";
          companyDropdownMenu.style.backgroundColor = "";
        }
        isCompanyMenuOpen = false;
      }
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (isCompanyMenuOpen && !companyToggleBtn.contains(e.target) && !companyDropdownMenu.contains(e.target)) {
        companyDropdownMenu.style.maxHeight = "0";
        companyDropdownMenu.style.opacity = "0";
        if (companyToggleBtnIcon) {
          companyToggleBtnIcon.style.transform = "rotate(0deg)";
        }
        // Remove white background on SP/tablet when closed
        if (window.innerWidth < 1024) {
          companyToggleBtn.style.backgroundColor = "";
          companyDropdownMenu.style.backgroundColor = "";
          companyToggleBtn.style.color = "";
        }
        isCompanyMenuOpen = false;
      }
    });
  }

});


const serviceToggleSlideBtn = document.getElementById('serviceToggleSlideBtn');
const serviceSlideContent = document.getElementById('serviceSlideContent');

// Slide down utility
function slideDown(element) {
  element.style.display = 'flex';
  element.style.height = 'auto';
  let height = element.scrollHeight + 'px';
  element.style.height = '0px';
  if (window.innerWidth < 768) {
    element.style.padding = '0px 24px';
  } else {
    element.style.padding = '0px 82px';
  }
  element.style.marginTop = '0px';

  setTimeout(() => {
    element.style.duration = '0.5s';
    element.style.height = height;
    if (window.innerWidth < 768) {
      element.style.padding = '24px 24px';
    } else {
      element.style.padding = '48px 82px';
    }
    element.style.marginTop = '40px';
  }, 10);

  element.addEventListener('transitionend', function handler() {
    element.style.height = 'auto';
    element.style.transition = '';
    element.removeEventListener('transitionend', handler);
  });
}

// Slide up utility
function slideUp(element) {
  element.style.height = element.scrollHeight + 'px';
  if (window.innerWidth < 768) {
    element.style.padding = '40px 24px';
  } else {
    element.style.padding = '48px 82px';
  }
  element.style.marginTop = '40px';
  setTimeout(() => {
    element.style.duration = '0.5s';
    element.style.height = '0px';
    if (window.innerWidth < 768) {
      element.style.padding = '0px 24px';
    } else {
      element.style.padding = '0px 82px';
    }
    element.style.marginTop = '0px';
  }, 10);

  element.addEventListener('transitionend', function handler() {
    element.style.display = 'none';
    element.style.transition = '';
    element.removeEventListener('transitionend', handler);
  });
}

// State
let shown = false;
if (serviceToggleSlideBtn) {
  serviceToggleSlideBtn.addEventListener('click', function () {
    if (!shown) {
      slideDown(serviceSlideContent);
      serviceToggleSlideBtn.innerHTML = '閉じる &nbsp;&nbsp; <svg id="serviceToggleSlideBtnIcon" viewBox="0 0 20 20" aria-hidden="true" style="width: 1em; height: 1em; transition: transform 150ms; color: currentColor;"><path d="M5 12.5L10 7.5L15 12.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';
    } else {
      slideUp(serviceSlideContent);
      serviceToggleSlideBtn.innerHTML = 'もっとみる &nbsp;&nbsp; <svg id="serviceToggleSlideBtnIcon" viewBox="0 0 20 20" aria-hidden="true" style="width: 1em; height: 1em; transition: transform 150ms; color: currentColor;"><path d="M5 7.5L10 12.5L15 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';
    }
    shown = !shown;
  });
}



