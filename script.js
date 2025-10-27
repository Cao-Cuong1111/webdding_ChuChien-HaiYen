// ===================================
// THIỆP CƯỚI ONLINE - ENHANCED VERSION
// ===================================

// Sample wedding images - Replace with actual wedding photos
const weddingImages = [
  "./img/z7152877471616_5792790765329f2605eec58b3bf97760.jpg",
  "./img/z7152877471720_1e6f78a263f859d98e3e4c04b8e0e597.jpg",
  "./img/z7152877495690_0f5c3e0ae4cdbe7602b9ba49d64d844a.jpg",
  "./img/z7152877496921_c9721190a996c17a89ff34294a38c4a9.jpg",
  "./img/z7152877498853_579a191826a7f96bfa252212c07a3843.jpg",
];

// Wedding date configuration
const weddingDate = new Date("2025-11-27T12:30:00");
const weddingDay = weddingDate.getDate();
const weddingMonth = weddingDate.getMonth();
const weddingYear = weddingDate.getFullYear();

let currentSlide = 0;
let slideInterval;
let isMusicPlaying = false;

// ===================================
// 1. CÁ NHÂN HÓA TÊN KHÁCH MỜI
// ===================================

function getGuestNameFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get("khach");

  if (guestName) {
    guestName = guestName.replace(/-/g, " ");
    guestName = guestName.charAt(0).toUpperCase() + guestName.slice(1);

    const guestElement = document.getElementById("guest-name");
    if (guestElement) {
      guestElement.innerHTML = `Gửi đến: <strong>${guestName}</strong>`;
    }
  }
}

// ===================================
// 2. SLIDESHOW FUNCTIONALITY
// ===================================

function initSlideshow() {
  const slideshowImage = document.getElementById("slideshow-image");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  const indicators = document.querySelectorAll(".indicator");

  function showSlide(index) {
    if (slideshowImage) {
      slideshowImage.src = weddingImages[index];
      slideshowImage.style.opacity = "0";

      setTimeout(() => {
        slideshowImage.style.opacity = "1";
      }, 100);

      // Update indicators
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % weddingImages.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + weddingImages.length) % weddingImages.length;
    showSlide(currentSlide);
  }

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });

  // Auto slideshow
  slideInterval = setInterval(nextSlide, 5000);

  // Pause slideshow on hover
  const slideshowContainer = document.querySelector(".slideshow-container");
  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    slideshowContainer.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }

  // Initialize first slide
  showSlide(0);
}

// ===================================
// 3. MUSIC PLAYER FUNCTIONALITY
// ===================================

function initMusicPlayer() {
  const musicToggle = document.getElementById("music-toggle");
  const backgroundMusic = document.getElementById("background-music");
  let isMusicPlaying = false;

  if (!musicToggle || !backgroundMusic) return;

  // Phát nhạc (có thể bị chặn)
  const playMusic = (unmuteAfter = 1500) => {
    // Phát im lặng trước
    backgroundMusic.muted = true;
    backgroundMusic
      .play()
      .then(() => {
        // Sau 1.5s bật tiếng nếu được phép
        setTimeout(() => {
          backgroundMusic.muted = false;
        }, unmuteAfter);

        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.style.color = "#4caf50";
        isMusicPlaying = true;
      })
      .catch((e) => {
        console.warn("Autoplay blocked, waiting for user gesture:", e);
      });
  };

  // Thử tự động phát khi tải trang
  playMusic();

  // Nếu bị chặn, phát khi người dùng chạm hoặc click đầu tiên
  const resumeMusicOnInteraction = () => {
    if (!isMusicPlaying) playMusic(0); // bật tiếng luôn
    document.removeEventListener("click", resumeMusicOnInteraction);
    document.removeEventListener("touchstart", resumeMusicOnInteraction);
  };
  document.addEventListener("click", resumeMusicOnInteraction);
  document.addEventListener("touchstart", resumeMusicOnInteraction);

  // Nút toggle bật/tắt nhạc
  musicToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
      backgroundMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-play"></i>';
      musicToggle.style.color = "#e91e63";
      isMusicPlaying = false;
    } else {
      playMusic(0);
    }
  });

  // Khi nhạc kết thúc
  backgroundMusic.addEventListener("ended", () => {
    musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    musicToggle.style.color = "#e91e63";
    isMusicPlaying = false;
  });
}

// ===================================
// 4. ENHANCED COUNTDOWN TIMER
// ===================================

function initCountdown() {
  // đếm ngược về ngày 07 tháng 11 năm 2025 18:00
  const targetTime = weddingDate.getTime(); // dùng biến weddingDate đã khai báo ở đầu file
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return;

  let intervalId;

  function updateCountdown() {
    const now = Date.now();
    const distance = targetTime - now;

    if (distance <= 0) {
      countdownElement.innerHTML = `
        <div class="celebration">
          <i class="fas fa-heart"></i>
          <span>LỄ CƯỚI SẮP DIỄN RA!</span>
          <i class="fas fa-heart"></i>
        </div>
      `;
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <div class="time-unit">
        <span class="time-value">${days}</span>
        <span class="time-label">Ngày</span>
      </div>
      <div class="time-unit">
        <span class="time-value">${hours}</span>
        <span class="time-label">Giờ</span>
      </div>
      <div class="time-unit">
        <span class="time-value">${minutes}</span>
        <span class="time-label">Phút</span>
      </div>
      <div class="time-unit">
        <span class="time-value">${seconds}</span>
        <span class="time-label">Giây</span>
      </div>
    `;
  }

  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
}

// ===================================
// 5. SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".info-card, .couple-names, .intro-section"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ===================================
// 6. TYPING EFFECT FOR GUEST NAME
// ===================================

function initTypingEffect() {
  const guestNameElement = document.getElementById("guest-name");
  if (guestNameElement) {
    const text = guestNameElement.innerHTML;
    guestNameElement.innerHTML = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        guestNameElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }
}

// ===================================
// 7. FLOATING ELEMENTS ANIMATION
// ===================================

function initFloatingElements() {
  const floatingElements = document.querySelectorAll(
    ".floating-heart, .floating-flower"
  );

  floatingElements.forEach((element) => {
    const randomDelay = Math.random() * 10;
    const randomDuration = 15 + Math.random() * 10;

    element.style.animationDelay = `${randomDelay}s`;
    element.style.animationDuration = `${randomDuration}s`;
  });
}

// ===================================
// 8. KEYBOARD NAVIGATION
// ===================================

function initKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        if (document.querySelector(".slideshow-container:hover")) {
          document.getElementById("prev-slide")?.click();
        }
        break;
      case "ArrowRight":
        if (document.querySelector(".slideshow-container:hover")) {
          document.getElementById("next-slide")?.click();
        }
        break;
      case " ":
        e.preventDefault();
        document.getElementById("music-toggle")?.click();
        break;
    }
  });
}

// ===================================
// 9. MOBILE OPTIMIZATIONS
// ===================================

function initMobileOptimizations() {
  // Add touch support for slideshow
  const slideshowContainer = document.querySelector(".slideshow-container");
  if (slideshowContainer && "ontouchstart" in window) {
    let touchStartX = 0;
    let touchEndX = 0;

    slideshowContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slideshowContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          document.getElementById("next-slide")?.click();
        } else {
          // Swipe right - previous slide
          document.getElementById("prev-slide")?.click();
        }
      }
    }
  }
}

// ===================================
// 10. CALENDAR FUNCTIONALITY
// ===================================

function initCalendar() {
  const currentMonthYear = document.getElementById("current-month-year");
  const calendarGrid = document.querySelector(".calendar-grid");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentDate = new Date(2025, 10, 1);
  // Ẩn hoặc vô hiệu nút chuyển tháng nếu tồn tại
  if (prevMonthBtn) prevMonthBtn.style.display = "none";
  if (nextMonthBtn) nextMonthBtn.style.display = "none";

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update month/year title
    const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    if (currentMonthYear) {
      currentMonthYear.textContent = `${monthNames[month]} ${year}`;
    }

    // Clear calendar grid
    if (calendarGrid) {
      calendarGrid.innerHTML = "";

      // Add day headers
      const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
      dayNames.forEach((day) => {
        const dayElement = document.createElement("div");
        dayElement.className = "calendar-day calendar-day-header";
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
      });

      // Get first day of month and number of days
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      // Add empty cells for days before month starts
      for (
        let i = 0;
        i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1);
        i++
      ) {
        const emptyDay = document.createElement("div");
        emptyDay.className = "calendar-day";
        calendarGrid.appendChild(emptyDay);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.className = "calendar-day";
        dayElement.textContent = day;

        // Check if this is today
        const today = new Date();
        if (
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          dayElement.classList.add("today");
        }

        // Check if this is the wedding day
        if (
          day === weddingDay &&
          month === weddingMonth &&
          year === weddingYear
        ) {
          dayElement.classList.add("wedding-day");
        }

        calendarGrid.appendChild(dayElement);
      }
    }
  }

  // Event listeners for month navigation
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  }

  // Initialize calendar
  renderCalendar(currentDate);
}

// ===================================
// 11. GIFT MODAL FUNCTIONALITY
// ===================================

function initGiftModal() {
  const giftBtn = document.getElementById("gift-btn");
  const giftModal = document.getElementById("gift-modal");
  const closeBtn = document.querySelector(".close-gift-modal");

  if (giftBtn && giftModal) {
    giftBtn.addEventListener("click", () => {
      giftModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      giftModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === giftModal) {
      giftModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && giftModal.style.display === "block") {
      giftModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// ===================================
// 12. GOOGLE MAPS INTEGRATION
// ===================================

function initGoogleMaps() {
  const getDirectionsBtn = document.getElementById("get-directions");

  if (getDirectionsBtn) {
    getDirectionsBtn.addEventListener("click", () => {
      // Replace with actual wedding venue coordinates
      const venueLat = 10.8231; // Example: Ho Chi Minh City coordinates
      const venueLng = 106.6297;
      const venueName = "Nhà hàng XYZ";

      const googleMapsUrl = `https://maps.app.goo.gl/qjTrcwB91J9Lewty7?g_st=az`;

      window.open(googleMapsUrl, "_blank");
    });
  }

  // You can also embed Google Maps if you have an API key
  // For now, we'll use a placeholder that opens Google Maps in a new tab
}

// ===================================
// 13. PERFORMANCE OPTIMIZATIONS
// ===================================

function initPerformanceOptimizations() {
  // Preload images
  weddingImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Lazy load background music
  const backgroundMusic = document.getElementById("background-music");
  if (backgroundMusic) {
    backgroundMusic.preload = "metadata";
  }
}

// ===================================
// 14. CURTAIN EFFECT FUNCTIONALITY
// ===================================

function initCurtainEffect() {
  window.addEventListener("load", () => {
    const curtainContainer = document.querySelector(".curtain-container");
    setTimeout(() => {
      curtainContainer.classList.add("open");
    }, 1000); // 1 giây sau khi tải xong
  });
}

// Alternative gift button functionality removed - using main gift button only

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎉 Khởi tạo thiệp cưới online với hiệu ứng đẹp!");

  // Initialize all features
  initCurtainEffect();
  getGuestNameFromUrl();
  initSlideshow();
  initMusicPlayer();
  initCountdown();
  initGiftModal();
  initGoogleMaps();
  initScrollAnimations();
  initTypingEffect();
  initFloatingElements();
  initKeyboardNavigation();
  initMobileOptimizations();
  initPerformanceOptimizations();

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 500);

  console.log("✅ Tất cả tính năng đã được khởi tạo thành công!");
});
