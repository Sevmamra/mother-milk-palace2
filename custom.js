// custom.js
document.addEventListener('DOMContentLoaded', function() {
  // Preloader Animation
  setTimeout(function() {
    document.querySelector('.loader-wrapper').classList.add('hidden');
  }, 1500);

  // Notification Bar Close
  const notificationClose = document.querySelector('.notification-close');
  if (notificationClose) {
    notificationClose.addEventListener('click', function() {
      this.closest('.notification-bar').style.transform = 'translateY(-100%)';
      this.closest('.notification-bar').style.opacity = '0';
      setTimeout(() => {
        this.closest('.notification-bar').remove();
      }, 300);
    });
  }

  // Hero Slider Animation
  const heroSlider = document.querySelector('.hero-slider');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const sliderDots = document.querySelectorAll('.dot');
  const sliderPrev = document.querySelector('.slider-prev');
  const sliderNext = document.querySelector('.slider-next');
  let currentSlide = 0;

  function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[index].classList.add('active');
    sliderDots[index].classList.add('active');
    
    // Add animation to the active slide content
    const activeContent = heroSlides[index].querySelector('.hero-content');
    activeContent.style.animation = 'none';
    setTimeout(() => {
      activeContent.style.animation = 'fadeInUp 1s ease';
    }, 10);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    showSlide(currentSlide);
  }

  // Auto slide change every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  heroSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Navigation controls
  sliderNext.addEventListener('click', () => {
    nextSlide();
    clearInterval(slideInterval);
  });

  sliderPrev.addEventListener('click', () => {
    prevSlide();
    clearInterval(slideInterval);
  });

  // Dot navigation
  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      clearInterval(slideInterval);
    });
  });

  // Initialize first slide
  showSlide(currentSlide);

  // Mega Menu Dropdown Animation
  const categoryDropdown = document.querySelector('.category-dropdown');
  if (categoryDropdown) {
    categoryDropdown.addEventListener('mouseenter', function() {
      this.querySelector('.mega-menu').style.opacity = '1';
      this.querySelector('.mega-menu').style.visibility = 'visible';
      this.querySelector('.mega-menu').style.transform = 'translateY(0)';
    });

    categoryDropdown.addEventListener('mouseleave', function() {
      this.querySelector('.mega-menu').style.opacity = '0';
      this.querySelector('.mega-menu').style.visibility = 'hidden';
      this.querySelector('.mega-menu').style.transform = 'translateY(10px)';
    });
  }

  // Product Card Animations
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const img = this.querySelector('.product-img img');
      if (img) {
        img.style.transform = 'scale(1.05)';
      }
      
      const overlay = this.querySelector('.product-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
      }
      
      const quickView = this.querySelector('.quick-view');
      if (quickView) {
        quickView.style.opacity = '1';
        quickView.style.transform = 'translateY(0)';
      }
    });

    card.addEventListener('mouseleave', function() {
      const img = this.querySelector('.product-img img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
      
      const overlay = this.querySelector('.product-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }
      
      const quickView = this.querySelector('.quick-view');
      if (quickView) {
        quickView.style.opacity = '0';
        quickView.style.transform = 'translateY(20px)';
      }
    });
  });

  // Quantity Selector Functionality
  document.querySelectorAll('.quantity-plus').forEach(button => {
    button.addEventListener('click', function() {
      const quantityElement = this.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;
    });
  });

  document.querySelectorAll('.quantity-minus').forEach(button => {
    button.addEventListener('click', function() {
      const quantityElement = this.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
      }
    });
  });

  // Tab Functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Wishlist Toggle
  document.querySelectorAll('.wishlist').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      
      if (this.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        
        // Heart beat animation
        this.style.animation = 'heartBeat 0.5s ease';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  });

  // Add to Cart Animation
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Button animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      
      // Update cart count
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = count + 1;
        
        // Cart icon animation
        const cartIcon = document.querySelector('.cart-btn i');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
          cartIcon.style.transform = 'scale(1)';
        }, 300);
      }
      
      // Item fly animation
      const productCard = this.closest('.product-card');
      if (productCard) {
        const productImg = productCard.querySelector('.product-img img');
        if (productImg) {
          const imgClone = productImg.cloneNode(true);
          imgClone.style.position = 'fixed';
          imgClone.style.width = '50px';
          imgClone.style.height = '50px';
          imgClone.style.borderRadius = '50%';
          imgClone.style.objectFit = 'cover';
          imgClone.style.zIndex = '9999';
          imgClone.style.transition = 'all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
          
          const rect = productImg.getBoundingClientRect();
          imgClone.style.top = rect.top + 'px';
          imgClone.style.left = rect.left + 'px';
          document.body.appendChild(imgClone);
          
          const cartBtnRect = document.querySelector('.cart-btn').getBoundingClientRect();
          const cartBtnX = cartBtnRect.left + cartBtnRect.width / 2;
          const cartBtnY = cartBtnRect.top + cartBtnRect.height / 2;
          
          setTimeout(() => {
            imgClone.style.top = cartBtnY + 'px';
            imgClone.style.left = cartBtnX + 'px';
            imgClone.style.width = '10px';
            imgClone.style.height = '10px';
            imgClone.style.opacity = '0.5';
          }, 10);
          
          setTimeout(() => {
            imgClone.remove();
          }, 600);
        }
      }
    });
  });

  // Scroll to Top Button
  const scrollTopBtn = document.querySelector('.scroll-top-fab');
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Modal Functionality
  const loginBtn = document.querySelector('.login-btn');
  const loginModal = document.querySelector('.login-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close');

  if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loginModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Quick View Modal
  const quickViewBtns = document.querySelectorAll('.quick-view');
  const quickViewModal = document.querySelector('.quickview-modal');
  
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const productCard = this.closest('.product-card');
      const productTitle = productCard.querySelector('.product-title').textContent;
      const productPrice = productCard.querySelector('.current-price').textContent;
      
      // Here you would normally fetch more product details
      // For demo, we're just setting basic info
      quickViewModal.querySelector('.product-title').textContent = productTitle;
      quickViewModal.querySelector('.current-price').textContent = productPrice;
      
      quickViewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Thumbnail image switching in quick view
  const thumbnails = document.querySelectorAll('.thumbnail-images img');
  const mainImage = document.querySelector('.main-image img');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      mainImage.src = this.src;
      
      // Add zoom animation
      mainImage.style.transform = 'scale(1.1)';
      setTimeout(() => {
        mainImage.style.transform = 'scale(1)';
      }, 300);
    });
  });

  // Cart Sidebar Functionality
  const cartBtn = document.querySelector('.cart-btn');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartOverlay = document.querySelector('.cart-overlay');
  
  if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      cartSidebar.style.transform = 'translateX(0)';
      cartOverlay.style.opacity = '1';
      cartOverlay.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', function() {
      cartSidebar.style.transform = 'translateX(100%)';
      this.style.opacity = '0';
      this.style.visibility = 'hidden';
      document.body.style.overflow = '';
    });
  }
  
  // Remove item from cart
  document.querySelectorAll('.item-remove').forEach(btn => {
    btn.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      cartItem.style.transform = 'translateX(100%)';
      cartItem.style.opacity = '0';
      
      setTimeout(() => {
        cartItem.remove();
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          let count = parseInt(cartCount.textContent) || 0;
          if (count > 0) {
            cartCount.textContent = count - 1;
          }
        }
      }, 300);
    });
  });

  // Mobile Menu Toggle (will be added in responsive CSS)
  const mobileMenuToggle = document.createElement('div');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('.header').prepend(mobileMenuToggle);
  
  mobileMenuToggle.addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
  });

  // Deals of the Day Countdown Timer
  function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000;
    
    const timerCount = document.querySelector('.timer-count');
    if (timerCount) {
      timerCount.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  
  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call

  // Newsletter Form Submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('.email-input');
      
      if (emailInput.value && emailInput.value.includes('@')) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'newsletter-success';
        successMsg.textContent = 'Thank you for subscribing!';
        this.appendChild(successMsg);
        
        // Add animation
        successMsg.style.animation = 'fadeInUp 0.5s ease';
        
        // Reset form
        emailInput.value = '';
        
        // Remove message after 3 seconds
        setTimeout(() => {
          successMsg.style.animation = 'fadeOut 0.5s ease';
          setTimeout(() => {
            successMsg.remove();
          }, 500);
        }, 3000);
      } else {
        // Show error animation
        emailInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
          emailInput.style.animation = '';
        }, 500);
      }
    });
  }

  // Seasonal Specials Hover Effects
  const seasonalCards = document.querySelectorAll('.seasonal-card');
  seasonalCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const overlay = this.querySelector('.seasonal-overlay');
      overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)';
      
      const content = this.querySelector('.seasonal-content');
      content.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      const overlay = this.querySelector('.seasonal-overlay');
      overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)';
      
      const content = this.querySelector('.seasonal-content');
      content.style.transform = 'translateY(0)';
    });
  });

  // Brands Carousel Auto Scroll
  const brandsCarousel = document.querySelector('.brands-carousel');
  if (brandsCarousel) {
    let scrollAmount = 0;
    const scrollWidth = brandsCarousel.scrollWidth - brandsCarousel.clientWidth;
    
    function autoScrollBrands() {
      scrollAmount += 1;
      if (scrollAmount >= scrollWidth) {
        scrollAmount = 0;
      }
      brandsCarousel.scrollLeft = scrollAmount;
    }
    
    let scrollInterval = setInterval(autoScrollBrands, 30);
    
    brandsCarousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
    
    brandsCarousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(autoScrollBrands, 30);
    });
  }
});

