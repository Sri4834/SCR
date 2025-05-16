// main.js
// This script handles the mobile menu toggle, smooth scrolling, add to cart functionality, and search functionality.

document.addEventListener('DOMContentLoaded', function() {
    // Get the mobile menu button and menu elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu when the button is clicked
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle the 'active' class on the menu
            menu.classList.toggle('active');

            // Toggle between hamburger and close icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Handle dropdown menus in mobile view
    dropdowns.forEach(dropdown => {
        // Get the dropdown link (the one with the chevron)
        const dropdownLink = dropdown.querySelector('a');
        
        // In mobile view, prevent the default action and toggle the dropdown
        dropdownLink.addEventListener('click', function(e) {
            // Only apply this behavior in mobile view
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Toggle the chevron icon direction
                const chevron = this.querySelector('i');
                if (chevron) {
                    chevron.classList.toggle('fa-chevron-down');
                    chevron.classList.toggle('fa-chevron-up');
                }
            }
        });
    });

    // Close the mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        // If the click is outside the menu and the menu button, and the menu is active
        if (!menu.contains(e.target) && !mobileMenuBtn.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            
            // Reset the icon to hamburger
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close the mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            menu.classList.remove('active');
            
            // Reset the icon to hamburger
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Reset all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const chevron = dropdown.querySelector('i');
                if (chevron && chevron.classList.contains('fa-chevron-up')) {
                    chevron.classList.remove('fa-chevron-up');
                    chevron.classList.add('fa-chevron-down');
                }
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add to cart functionality
    const cartBtn = document.querySelector('.cart a');
    const buyNowBtns = document.querySelectorAll('.btn-outline');
    let cartCount = 0;

    if (cartBtn && buyNowBtns.length > 0) {
        buyNowBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (cartCount < 20) {
                    cartCount++;
                    updateCart();

                    // Show notification
                    showNotification('Product added to cart!');
                } else {
                    showNotification('You cannot add more than 20 items to the cart.');
                }
            });
        });
    }

    // CART EMPTY/NOT EMPTY LOGIC
    function updateCartEmptyDisplay() {
        var cartMainEmpty = document.getElementById('cart-main-empty');
        if (!cartMainEmpty) return;
        // Use the same cartCount variable as the rest of the cart logic
        if (cartCount === 0) {
            cartMainEmpty.style.display = 'flex';
        } else {
            cartMainEmpty.style.display = 'none';
        }
    }

    function updateCart() {
        if (cartBtn) {
            cartBtn.innerHTML = `<button><i class="fas fa-shopping-cart" style="color: rgb(255, 255, 255);font-size: 16px;"></i> CART (${cartCount})</button>`;
        }
        updateCartEmptyDisplay();
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#ffc107';
        notification.style.color = '#000';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';

            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');

    if (searchBox && searchBtn) {
        searchBtn.addEventListener('click', function () {
            performSearch();
        });

        searchBox.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchBox.value.trim().toLowerCase();
        if (searchTerm === '') return;

        // For demo purposes, just show a notification
        showNotification(`Searching for: ${searchTerm}`);
        searchBox.value = '';
    }

    // Also call on DOMContentLoaded
    updateCartEmptyDisplay();
});
