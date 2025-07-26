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

// Continue from previous code...

  // Advanced Cart Functionality
  class ShoppingCart {
    constructor() {
      this.cart = [];
      this.cartCount = document.querySelector('.cart-count');
      this.cartItemsContainer = document.querySelector('.cart-items');
      this.cartSubtotal = document.querySelector('.cart-summary .summary-row:nth-child(1) span:last-child');
      this.cartTotal = document.querySelector('.cart-summary .total span:last-child');
      this.init();
    }

    init() {
      this.loadCart();
      this.renderCart();
      this.setupEventListeners();
    }

    loadCart() {
      const savedCart = localStorage.getItem('motherMilkPalaceCart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }

    saveCart() {
      localStorage.setItem('motherMilkPalaceCart', JSON.stringify(this.cart));
      this.updateCartCount();
    }

    updateCartCount() {
      const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
      this.cartCount.textContent = totalItems;
      
      // Animation when count changes
      if (totalItems > 0) {
        this.cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
          this.cartCount.style.transform = 'scale(1)';
        }, 300);
      }
    }

    addItem(product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        this.cart.push(product);
      }
      
      this.saveCart();
      this.renderCart();
    }

    removeItem(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.saveCart();
      this.renderCart();
    }

    updateQuantity(productId, newQuantity) {
      const item = this.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
          this.removeItem(productId);
        } else {
          this.saveCart();
          this.renderCart();
        }
      }
    }

    calculateTotals() {
      const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      this.cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
      this.cartTotal.textContent = `₹${subtotal.toFixed(2)}`;
      return subtotal;
    }

    renderCart() {
      this.cartItemsContainer.innerHTML = '';
      
      if (this.cart.length === 0) {
        this.cartItemsContainer.innerHTML = `
          <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <p>Your cart is empty</p>
            <a href="#" class="btn-primary">Start Shopping</a>
          </div>
        `;
        this.calculateTotals();
        return;
      }
      
      this.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
            <h4 class="item-title">${item.name}</h4>
            <div class="item-price">₹${item.price.toFixed(2)} x ${item.quantity}</div>
            <div class="item-actions">
              <div class="item-quantity">
                <button class="quantity-minus">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-plus">+</button>
              </div>
              <button class="item-remove"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `;
        
        // Add event listeners to the new elements
        cartItem.querySelector('.quantity-minus').addEventListener('click', () => {
          this.updateQuantity(item.id, item.quantity - 1);
        });
        
        cartItem.querySelector('.quantity-plus').addEventListener('click', () => {
          this.updateQuantity(item.id, item.quantity + 1);
        });
        
        cartItem.querySelector('.item-remove').addEventListener('click', () => {
          this.removeItem(item.id);
          
          // Remove animation
          cartItem.style.transform = 'translateX(100%)';
          cartItem.style.opacity = '0';
          setTimeout(() => {
            cartItem.remove();
          }, 300);
        });
        
        this.cartItemsContainer.appendChild(cartItem);
      });
      
      this.calculateTotals();
    }

    setupEventListeners() {
      // Add to cart buttons
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const productCard = button.closest('.product-card');
          const product = {
            id: productCard.dataset.productId || Math.random().toString(36).substr(2, 9),
            name: productCard.querySelector('.product-title').textContent,
            price: parseFloat(productCard.querySelector('.current-price').textContent.replace('₹', '')),
            image: productCard.querySelector('.product-img img').src,
            quantity: 1
          };
          
          // Get quantity if available
          const quantityElement = productCard.querySelector('.quantity');
          if (quantityElement) {
            product.quantity = parseInt(quantityElement.textContent);
          }
          
          this.addItem(product);
          
          // Fly animation
          this.flyToCartAnimation(productCard);
        });
      });
    }

    flyToCartAnimation(productCard) {
      const productImg = productCard.querySelector('.product-img img');
      if (!productImg) return;
      
      const imgClone = productImg.cloneNode(true);
      imgClone.style.position = 'fixed';
      imgClone.style.width = '50px';
      imgClone.style.height = '50px';
      imgClone.style.borderRadius = '50%';
      imgClone.style.objectFit = 'cover';
      imgClone.style.zIndex = '9999';
      imgClone.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      
      const rect = productImg.getBoundingClientRect();
      imgClone.style.top = `${rect.top}px`;
      imgClone.style.left = `${rect.left}px`;
      document.body.appendChild(imgClone);
      
      const cartBtn = document.querySelector('.cart-btn');
      const cartBtnRect = cartBtn.getBoundingClientRect();
      const cartBtnX = cartBtnRect.left + cartBtnRect.width / 2;
      const cartBtnY = cartBtnRect.top + cartBtnRect.height / 2;
      
      setTimeout(() => {
        imgClone.style.top = `${cartBtnY}px`;
        imgClone.style.left = `${cartBtnX}px`;
        imgClone.style.width = '0';
        imgClone.style.height = '0';
        imgClone.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        imgClone.remove();
      }, 800);
      
      // Cart icon bounce animation
      const cartIcon = cartBtn.querySelector('i');
      cartIcon.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
      }, 300);
    }
  }

  // Initialize shopping cart
  const cart = new ShoppingCart();

  // Product Search Functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      if (searchTerm.length > 2) {
        // In a real app, you would make an API call here
        // For demo, we'll just highlight matching products
        document.querySelectorAll('.product-title').forEach(title => {
          const productCard = title.closest('.product-card');
          if (title.textContent.toLowerCase().includes(searchTerm)) {
            productCard.style.boxShadow = '0 0 0 2px var(--primary-color)';
            productCard.style.animation = 'pulse 1.5s infinite';
          } else {
            productCard.style.boxShadow = '';
            productCard.style.animation = '';
          }
        });
      } else {
        document.querySelectorAll('.product-card').forEach(card => {
          card.style.boxShadow = '';
          card.style.animation = '';
        });
      }
    });
  }

  // Advanced Product Filtering
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter products
      document.querySelectorAll('.product-card').forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Product Quick View with AJAX (simulated)
  document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.closest('.product-card').dataset.productId;
      
      // Show loading state
      const quickViewModal = document.querySelector('.quickview-modal');
      quickViewModal.classList.add('loading');
      
      // Simulate API call
      setTimeout(() => {
        // In a real app, you would fetch product details from your backend
        const productDetails = {
          id: productId,
          name: this.closest('.product-card').querySelector('.product-title').textContent,
          price: this.closest('.product-card').querySelector('.current-price').textContent,
          description: "This is a detailed description of the product that would come from your database.",
          details: [
            { label: "Brand", value: "Mother Milk" },
            { label: "Weight", value: "1kg" },
            { label: "Shelf Life", value: "6 months" },
            { label: "Ingredients", value: "Milk, Sugar, Natural Flavors" }
          ],
          images: [
            "https://via.placeholder.com/400x400?text=Product+Main",
            "https://via.placeholder.com/400x400?text=Product+Angle",
            "https://via.placeholder.com/400x400?text=Product+Closeup",
            "https://via.placeholder.com/400x400?text=Product+Package"
          ]
        };
        
        // Populate modal with product data
        const modalContent = quickViewModal.querySelector('.quickview-content');
        modalContent.innerHTML = `
          <div class="modal-close">
            <i class="fas fa-times"></i>
          </div>
          <div class="quickview-left">
            <div class="product-gallery">
              <div class="main-image">
                <img src="${productDetails.images[0]}" alt="${productDetails.name}" class="active">
              </div>
              <div class="thumbnail-images">
                ${productDetails.images.map((img, index) => `
                  <img src="${img}" alt="Thumbnail ${index + 1}" ${index === 0 ? 'class="active"' : ''}>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="quickview-right">
            <h2 class="product-title">${productDetails.name}</h2>
            <div class="product-meta">
              <div class="product-rating">
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
                <span class="rating-count">(128 reviews)</span>
                <span class="review-link"><a href="#">Write a review</a></span>
              </div>
              <div class="product-availability">In Stock (200+ units)</div>
            </div>
            <div class="product-price">
              <span class="current-price">${productDetails.price}</span>
              <span class="original-price">₹65.00</span>
              <span class="discount">20% OFF</span>
            </div>
            <div class="product-details">
              <h3 class="details-title">Product Details</h3>
              <p>${productDetails.description}</p>
              <ul class="details-list">
                ${productDetails.details.map(detail => `
                  <li><strong>${detail.label}:</strong> ${detail.value}</li>
                `).join('')}
              </ul>
            </div>
            <div class="product-actions">
              <div class="quantity-selector">
                <button class="quantity-minus">-</button>
                <span class="quantity">1</span>
                <button class="quantity-plus">+</button>
              </div>
              <button class="add-to-cart">Add to Cart</button>
              <button class="wishlist"><i class="far fa-heart"></i> Wishlist</button>
            </div>
            <div class="product-delivery">
              <div class="delivery-option">
                <i class="fas fa-truck"></i>
                <div class="delivery-info">
                  <span class="delivery-title">Standard Delivery</span>
                  <span class="delivery-time">Today, 3:00 PM - 5:00 PM</span>
                </div>
              </div>
              <div class="delivery-option">
                <i class="fas fa-bolt"></i>
                <div class="delivery-info">
                  <span class="delivery-title">Express Delivery</span>
                  <span class="delivery-time">Within 30 minutes (Extra ₹30)</span>
                </div>
              </div>
            </div>
            <div class="product-share">
              <span>Share this product:</span>
              <a href="#" class="share-link"><i class="fab fa-whatsapp"></i></a>
              <a href="#" class="share-link"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="share-link"><i class="fab fa-twitter"></i></a>
              <a href="#" class="share-link"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        `;
        
        // Remove loading state
        quickViewModal.classList.remove('loading');
        
        // Show modal
        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add event listeners to new elements
        setupQuickViewModal();
      }, 800);
    });
  });

  function setupQuickViewModal() {
    // Thumbnail image switching
    document.querySelectorAll('.thumbnail-images img').forEach(thumb => {
      thumb.addEventListener('click', function() {
        const quickViewModal = this.closest('.quickview-modal');
        const mainImage = quickViewModal.querySelector('.main-image img');
        
        // Update main image
        mainImage.src = this.src;
        mainImage.style.animation = 'zoomIn 0.3s ease';
        setTimeout(() => {
          mainImage.style.animation = '';
        }, 300);
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail-images img').forEach(img => {
          img.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
    
    // Quantity selector
    const quantityPlus = document.querySelector('.quickview-modal .quantity-plus');
    const quantityMinus = document.querySelector('.quickview-modal .quantity-minus');
    const quantityDisplay = document.querySelector('.quickview-modal .quantity');
    
    if (quantityPlus && quantityMinus && quantityDisplay) {
      quantityPlus.addEventListener('click', () => {
        let quantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = quantity + 1;
      });
      
      quantityMinus.addEventListener('click', () => {
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
          quantityDisplay.textContent = quantity - 1;
        }
      });
    }
    
    // Add to cart from quick view
    const quickViewAddToCart = document.querySelector('.quickview-modal .add-to-cart');
    if (quickViewAddToCart) {
      quickViewAddToCart.addEventListener('click', function() {
        const quickViewModal = this.closest('.quickview-modal');
        const product = {
          id: quickViewModal.dataset.productId || Math.random().toString(36).substr(2, 9),
          name: quickViewModal.querySelector('.product-title').textContent,
          price: parseFloat(quickViewModal.querySelector('.current-price').textContent.replace('₹', '')),
          image: quickViewModal.querySelector('.main-image img').src,
          quantity: parseInt(quickViewModal.querySelector('.quantity').textContent)
        };
        
        cart.addItem(product);
        
        // Close modal after adding to cart
        setTimeout(() => {
          quickViewModal.classList.remove('active');
          document.body.style.overflow = '';
        }, 500);
      });
    }
  }

  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        const animation = element.dataset.animate;
        element.style.animation = `${animation} 1s ease forwards`;
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load

  // Additional Animations
  const seasonalCards = document.querySelectorAll('.seasonal-card');
  seasonalCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.dataset.animate = 'fadeInUp';
  });

  // App Download Section Animation
  const appSection = document.querySelector('.app-section');
  if (appSection) {
    appSection.dataset.animate = 'fadeIn';
  }

  // Process Steps Animation
  const processSteps = document.querySelectorAll('.step-item');
  processSteps.forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.2}s`;
    step.dataset.animate = 'fadeInUp';
  });

  // Brand Logos Animation
  const brandLogos = document.querySelectorAll('.brand-logo');
  brandLogos.forEach((logo, index) => {
    logo.style.transitionDelay = `${index * 0.05}s`;
    logo.dataset.animate = 'fadeIn';
  });

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes zoomIn {
      from { transform: scale(0.9); }
      to { transform: scale(1); }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(93, 156, 236, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(93, 156, 236, 0); }
      100% { box-shadow: 0 0 0 0 rgba(93, 156, 236, 0); }
    }
    
    @keyframes heartBeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.3); }
      28% { transform: scale(1); }
      42% { transform: scale(1.3); }
      70% { transform: scale(1); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    [data-animate] {
      opacity: 0;
    }
    
    .quickview-modal.loading .quickview-content {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 300px;
    }
    
    .quickview-modal.loading .quickview-content::after {
      content: 'Loading...';
      font-size: 1.2rem;
      color: var(--text-light);
    }
  `;
  document.head.appendChild(style);
});

// Continue from previous code...

  // User Authentication System
  class AuthSystem {
    constructor() {
      this.currentUser = null;
      this.initAuth();
    }

    initAuth() {
      // Check if user is already logged in
      const savedUser = localStorage.getItem('motherMilkPalaceUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
        this.updateAuthUI();
      }
    }

    login(email, password) {
      // In a real app, this would be an API call to your backend
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful login
          if (email && password) {
            this.currentUser = {
              email,
              name: email.split('@')[0],
              token: Math.random().toString(36).substr(2)
            };
            
            localStorage.setItem('motherMilkPalaceUser', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            resolve(this.currentUser);
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 800); // Simulate network delay
      });
    }

    logout() {
      localStorage.removeItem('motherMilkPalaceUser');
      this.currentUser = null;
      this.updateAuthUI();
      
      // Show logout notification
      this.showNotification('You have been logged out', 'success');
    }

    updateAuthUI() {
      const loginBtn = document.querySelector('.login-btn');
      if (!loginBtn) return;
      
      if (this.currentUser) {
        loginBtn.innerHTML = `
          <i class="fas fa-user"></i>
          <span>${this.currentUser.name}</span>
          <div class="user-dropdown">
            <a href="#" class="dropdown-item">My Account</a>
            <a href="#" class="dropdown-item">My Orders</a>
            <a href="#" class="dropdown-item logout-btn">Logout</a>
          </div>
        `;
        
        // Add event listener to logout button
        const logoutBtn = loginBtn.querySelector('.logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
          });
        }
        
        // User dropdown functionality
        loginBtn.addEventListener('mouseenter', () => {
          loginBtn.querySelector('.user-dropdown').style.display = 'block';
        });
        
        loginBtn.addEventListener('mouseleave', () => {
          loginBtn.querySelector('.user-dropdown').style.display = 'none';
        });
      } else {
        loginBtn.innerHTML = `
          <i class="far fa-user"></i>
          <span>Login</span>
        `;
      }
    }

    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.innerHTML = `
        <div class="notification-content">
          <span class="notification-icon">
            ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
             type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
             '<i class="fas fa-info-circle"></i>'}
          </span>
          <span class="notification-text">${message}</span>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Add animation
      notification.style.animation = 'slideIn 0.3s ease forwards';
      
      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 3000);
    }
  }

  // Initialize authentication system
  const auth = new AuthSystem();

  // Login Form Submission
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('#login-email').value;
      const password = this.querySelector('#login-password').value;
      const submitBtn = this.querySelector('.login-btn');
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
      
      auth.login(email, password)
        .then(user => {
          // Close modal
          this.closest('.modal').classList.remove('active');
          document.body.style.overflow = '';
          
          // Show success notification
          auth.showNotification(`Welcome back, ${user.name}!`, 'success');
        })
        .catch(error => {
          // Show error
          auth.showNotification(error.message, 'error');
          
          // Reset form
          submitBtn.disabled = false;
          submitBtn.textContent = 'Login';
        });
    });
  }

  // Social Login Buttons
  document.querySelectorAll('.social-login').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const provider = this.classList.contains('google-login') ? 'Google' : 'Facebook';
      
      // Show loading state
      const originalText = this.innerHTML;
      this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Continuing with ${provider}...`;
      
      // Simulate social login
      setTimeout(() => {
        auth.login(`${provider.toLowerCase()}user@example.com`, 'socialpassword')
          .then(user => {
            // Close modal
            document.querySelector('.login-modal').classList.remove('active');
            document.body.style.overflow = '';
            
            // Show success notification
            auth.showNotification(`Welcome, ${user.name}!`, 'success');
          })
          .catch(error => {
            auth.showNotification(`Failed to login with ${provider}`, 'error');
            this.innerHTML = originalText;
          });
      }, 1000);
    });
  });

  // Payment Gateway Integration (Simulated)
  class PaymentSystem {
    constructor() {
      this.paymentMethods = {
        creditCard: {
          name: 'Credit Card',
          icon: 'far fa-credit-card'
        },
        upi: {
          name: 'UPI',
          icon: 'fas fa-mobile-alt'
        },
        netbanking: {
          name: 'Net Banking',
          icon: 'fas fa-university'
        },
        wallet: {
          name: 'Wallet',
          icon: 'fas fa-wallet'
        },
        cod: {
          name: 'Cash on Delivery',
          icon: 'fas fa-money-bill-wave'
        }
      };
    }

    initCheckout() {
      const checkoutBtn = document.querySelector('.checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.showPaymentModal();
        });
      }
    }

    showPaymentModal() {
      const modal = document.createElement('div');
      modal.className = 'modal payment-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-close">
            <i class="fas fa-times"></i>
          </div>
          <h2 class="modal-title">Select Payment Method</h2>
          <div class="payment-methods">
            ${Object.entries(this.paymentMethods).map(([key, method]) => `
              <div class="payment-method" data-method="${key}">
                <div class="method-icon">
                  <i class="${method.icon}"></i>
                </div>
                <div class="method-name">${method.name}</div>
                <i class="fas fa-chevron-right"></i>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Add animation
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
      
      // Close modal
      modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.remove();
          document.body.style.overflow = '';
        }, 300);
      });
      
      // Payment method selection
      modal.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', () => {
          const methodKey = method.dataset.method;
          this.processPayment(methodKey);
        });
      });
    }

    processPayment(method) {
      // Show processing state
      const paymentModal = document.querySelector('.payment-modal');
      paymentModal.querySelector('.modal-content').innerHTML = `
        <div class="payment-processing">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
          <h3>Processing your ${this.paymentMethods[method].name} payment...</h3>
        </div>
      `;
      
      // Simulate payment processing
      setTimeout(() => {
        // Randomly decide if payment is successful (80% chance)
        const isSuccess = Math.random() > 0.2;
        
        if (isSuccess) {
          paymentModal.querySelector('.modal-content').innerHTML = `
            <div class="payment-success">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h2>Payment Successful!</h2>
              <p>Your order has been placed successfully.</p>
              <p>Order ID: MMP${Math.floor(Math.random() * 1000000)}</p>
              <button class="btn-primary continue-shopping">Continue Shopping</button>
            </div>
          `;
          
          // Clear cart
          cart.cart = [];
          cart.saveCart();
          cart.renderCart();
        } else {
          paymentModal.querySelector('.modal-content').innerHTML = `
            <div class="payment-failed">
              <div class="failed-icon">
                <i class="fas fa-times-circle"></i>
              </div>
              <h2>Payment Failed</h2>
              <p>We couldn't process your payment. Please try again.</p>
              <button class="btn-primary try-again">Try Again</button>
              <button class="btn-secondary choose-different">Choose Different Method</button>
            </div>
          `;
          
          // Add event listeners
          paymentModal.querySelector('.try-again').addEventListener('click', () => {
            this.processPayment(method);
          });
          
          paymentModal.querySelector('.choose-different').addEventListener('click', () => {
            this.showPaymentModal();
            paymentModal.remove();
          });
        }
        
        // Continue shopping button
        const continueBtn = paymentModal.querySelector('.continue-shopping');
        if (continueBtn) {
          continueBtn.addEventListener('click', () => {
            paymentModal.style.opacity = '0';
            setTimeout(() => {
              paymentModal.remove();
              document.body.style.overflow = '';
            }, 300);
          });
        }
      }, 2000);
    }
  }

  // Initialize payment system
  const paymentSystem = new PaymentSystem();
  paymentSystem.initCheckout();

  // Product Review System
  class ReviewSystem {
    constructor() {
      this.reviews = {};
      this.init();
    }

    init() {
      // Load sample reviews
      this.reviews = {
        'product1': [
          { user: 'Priya S.', rating: 5, comment: 'Excellent quality! Will buy again.', date: '2023-05-15' },
          { user: 'Rahul M.', rating: 4, comment: 'Good product, fast delivery.', date: '2023-05-10' }
        ],
        'product2': [
          { user: 'Ananya P.', rating: 5, comment: 'Love this product!', date: '2023-05-18' }
        ]
      };
      
      // Initialize review forms
      document.querySelectorAll('.review-form').forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const productId = form.dataset.productId;
          const rating = form.querySelector('input[name="rating"]:checked')?.value;
          const comment = form.querySelector('textarea').value;
          
          if (rating && comment) {
            this.addReview(productId, parseInt(rating), comment);
            form.reset();
            auth.showNotification('Thank you for your review!', 'success');
          } else {
            auth.showNotification('Please provide both rating and comment', 'error');
          }
        });
      });
    }

    addReview(productId, rating, comment) {
      if (!this.reviews[productId]) {
        this.reviews[productId] = [];
      }
      
      this.reviews[productId].push({
        user: auth.currentUser ? auth.currentUser.name : 'Anonymous',
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      });
      
      this.displayReviews(productId);
    }

    displayReviews(productId) {
      const reviewsContainer = document.querySelector(`[data-reviews-for="${productId}"]`);
      if (!reviewsContainer) return;
      
      const productReviews = this.reviews[productId] || [];
      const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length || 0;
      
      reviewsContainer.innerHTML = `
        <div class="average-rating">
          <div class="rating-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(averageRating))}
            ${averageRating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
            ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(averageRating))}
          </div>
          <div class="rating-text">${averageRating.toFixed(1)} out of 5 (${productReviews.length} reviews)</div>
        </div>
        <div class="review-list">
          ${productReviews.map(review => `
            <div class="review-item">
              <div class="review-header">
                <div class="review-user">${review.user}</div>
                <div class="review-rating">
                  ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                  ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                </div>
                <div class="review-date">${review.date}</div>
              </div>
              <div class="review-comment">${review.comment}</div>
            </div>
          `).join('')}
        </div>
        <form class="review-form" data-product-id="${productId}">
          <h4>Write a Review</h4>
          <div class="rating-input">
            <span>Rating:</span>
            <div class="stars">
              ${[1, 2, 3, 4, 5].map(i => `
                <input type="radio" id="rating-${productId}-${i}" name="rating" value="${i}">
                <label for="rating-${productId}-${i}"><i class="far fa-star"></i></label>
              `).join('')}
            </div>
          </div>
          <textarea placeholder="Share your experience..." required></textarea>
          <button type="submit" class="btn-primary">Submit Review</button>
        </form>
      `;
      
      // Initialize star rating input
      reviewsContainer.querySelectorAll('.rating-input input').forEach(input => {
        input.addEventListener('change', function() {
          const rating = parseInt(this.value);
          const labels = this.parentElement.querySelectorAll('label');
          
          labels.forEach((label, index) => {
            const icon = label.querySelector('i');
            if (index < rating) {
              icon.classList.remove('far');
              icon.classList.add('fas');
            } else {
              icon.classList.remove('fas');
              icon.classList.add('far');
            }
          });
        });
      });
    }
  }

  // Initialize review system
  const reviewSystem = new ReviewSystem();

  // Analytics Tracking
  class Analytics {
    static track(eventName, data = {}) {
      // In a real app, this would send data to your analytics platform
      console.log(`[Analytics] ${eventName}`, data);
      
      // Simulate tracking
      const events = JSON.parse(localStorage.getItem('motherMilkPalaceAnalytics') || '[]');
      events.push({
        event: eventName,
        data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('motherMilkPalaceAnalytics', JSON.stringify(events));
    }

    static pageView() {
      this.track('page_view', {
        page: window.location.pathname,
        referrer: document.referrer
      });
    }

    static productView(productId) {
      this.track('product_view', { productId });
    }

    static addToCart(productId, quantity) {
      this.track('add_to_cart', { productId, quantity });
    }

    static initiateCheckout() {
      this.track('initiate_checkout', {
        items: cart.cart,
        total: cart.calculateTotals()
      });
    }

    static purchase(orderId, amount) {
      this.track('purchase', { orderId, amount });
    }
  }

  // Track initial page view
  Analytics.pageView();

  // Track product views when quick view is opened
  document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.closest('.product-card').dataset.productId;
      Analytics.productView(productId);
    });
  });

  // Track add to cart events
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productId = productCard.dataset.productId;
      const quantity = parseInt(productCard.querySelector('.quantity')?.textContent || '1');
      Analytics.addToCart(productId, quantity);
    });
  });

  // Track checkout initiation
  document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    Analytics.initiateCheckout();
  });

  // Service Worker for Offline Capabilities
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('ServiceWorker registration successful');
      }).catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  `;
  document.head.appendChild(additionalStyles);
});
