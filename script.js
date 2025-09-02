/* Easybnb - Main JavaScript File */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Reusable Code for All Pages ---

    // A. Responsive Hamburger Menu
    const navLinks = document.querySelector('.nav-links');
    const registerBtn = document.querySelector('.register-btn');
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '&#9776;'; // Hamburger icon
    hamburger.classList.add('hamburger-menu');
    
    // Check if a nav element exists before trying to insert the hamburger menu
    const nav = document.querySelector('nav');
    if (nav) {
        nav.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            registerBtn.classList.toggle('active');
        });
    }

    // B. Sticky Navigation on Scroll (for Index Page)
    const header = document.querySelector('.header'); // This is specific to the index page
    const mainNav = document.querySelector('nav');
    
    if (header && mainNav) {
        window.addEventListener('scroll', () => {
            // The nav on the index page is inside the .header
            // We make it white and sticky when scrolling past the header
            if (window.scrollY > header.offsetHeight - 80) { // 80 is nav height
                mainNav.classList.add('navbar-white');
            } else {
                mainNav.classList.remove('navbar-white');
            }
        });
    }


    // --- 2. JavaScript for index.html ---
    const searchForm = document.querySelector('.search-bar form');
    if (searchForm) {
        const locationInput = searchForm.querySelector('.location-input input');
        
        searchForm.addEventListener('submit', (event) => {
            // Simple validation: prevent form submission if location is empty
            if (locationInput.value.trim() === '') {
                event.preventDefault(); // Stop the form from submitting
                alert('Please enter a destination.');
                locationInput.focus();
            }
        });

        // Enhance date inputs to use native date picker
        const dateInputs = searchForm.querySelectorAll('input[placeholder="Add Date"]');
        dateInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.type = 'date';
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.type = 'text';
                }
            });
        });
    }


    // --- 3. JavaScript for listing.html ---
    const filterCheckboxes = document.querySelectorAll('.filter input[type="checkbox"]');
    const houseList = document.querySelectorAll('.house');
    
    if (filterCheckboxes.length > 0 && houseList.length > 0) {
        
        const filterHouses = () => {
            const activeFilters = [];
            filterCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    activeFilters.push(checkbox.getAttribute('data-filter'));
                }
            });

            houseList.forEach(house => {
                const amenities = house.getAttribute('data-amenities').split(',');
                
                // Hide or show house based on filters
                if (activeFilters.length === 0 || activeFilters.every(filter => amenities.includes(filter))) {
                    house.style.display = 'flex';
                } else {
                    house.style.display = 'none';
                }
            });
        };

        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterHouses);
        });
    }
    
    // Pagination interaction
    const paginationSpans = document.querySelectorAll('.pagination span');
    if(paginationSpans.length > 0) {
        paginationSpans.forEach(span => {
            span.addEventListener('click', () => {
                document.querySelector('.pagination .current').classList.remove('current');
                span.classList.add('current');
                // In a real app, you would load new content here
            });
        });
    }


    // --- 4. JavaScript for travel_outside.html ---
    const galleryItems = document.querySelectorAll('.gallery .gallery-item, .Exclusvies div, .trending div');
    if (galleryItems.length > 0) {
        // Create the modal structure once
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
            <span class="modal-close">&times;</span>
            <img class="modal-content" src="">
        `;
        document.body.appendChild(modal);

        const modalImage = modal.querySelector('.modal-content');
        const closeBtn = modal.querySelector('.modal-close');

        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if(img){
                img.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modalImage.src = img.src;
                });
            }
        });

        // Close modal actions
        const closeModal = () => {
            modal.style.display = 'none';
        }
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }


    // --- 5. JavaScript for online_packages.html ---
    const bookNowButtons = document.querySelectorAll('.package-price .cta-btn');
    if(bookNowButtons.length > 0) {
        bookNowButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent following the '#' link
                alert('Thank you for your interest!\nPlease contact our travel experts at 1800-123-4567 to finalize your booking.');
            });
        });
    }

});
/* Easybnb - Main JavaScript File */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Reusable Code for All Pages ---

    // A. Responsive Hamburger Menu (No changes)
    const navLinks = document.querySelector('.nav-links');
    const registerBtn = document.querySelector('.register-btn');
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '&#9776;';
    hamburger.classList.add('hamburger-menu');
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.appendChild(hamburger);
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            registerBtn.classList.toggle('active');
        });
    }

    // B. Sticky Navigation on Scroll (for Index Page) (No changes)
    const header = document.querySelector('.header');
    const mainNav = document.querySelector('nav');
    
    if (header && mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > header.offsetHeight - 80) {
                mainNav.classList.add('navbar-white');
            } else {
                mainNav.classList.remove('navbar-white');
            }
        });
    }

    // --- NEW FUNCTIONALITY ---
    // C. Scroll-based Fade-in Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animation');
            } else {
                // Optional: remove class to re-animate on scroll up
                // entry.target.classList.remove('show-animation'); 
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden-animation');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- NEW FUNCTIONALITY ---
    // D. "Back to Top" Button
    const backToTopButton = document.getElementById('backToTopBtn');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after 300px of scroll
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll animation
            });
        });
    }


    // --- 2. JavaScript for index.html --- (No changes)
    const searchForm = document.querySelector('.search-bar form');
    if (searchForm) {
        // ... (code from previous step is unchanged) ...
    }


    // --- 3. JavaScript for listing.html ---
    const houseList = document.querySelectorAll('.house');
    
    if (houseList.length > 0) {
        const filterCheckboxes = document.querySelectorAll('.filter input[type="checkbox"]');
        const priceSlider = document.getElementById('priceSlider');
        const priceLabel = document.getElementById('priceLabel');

        const filterHouses = () => {
            const activeFilters = [];
            filterCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    activeFilters.push(checkbox.getAttribute('data-filter'));
                }
            });

            // --- NEW: Get price from slider ---
            const maxPrice = priceSlider ? parseInt(priceSlider.value) : 1000;
            if (priceLabel) {
                priceLabel.textContent = `$${maxPrice}`;
            }

            houseList.forEach(house => {
                const amenities = house.getAttribute('data-amenities').split(',');
                const price = parseInt(house.getAttribute('data-price'));

                const amenitiesMatch = activeFilters.length === 0 || activeFilters.every(filter => amenities.includes(filter));
                const priceMatch = price <= maxPrice;

                if (amenitiesMatch && priceMatch) {
                    house.style.display = 'flex';
                } else {
                    house.style.display = 'none';
                }
            });
        };
        
        filterCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterHouses));
        
        // --- NEW: Add event listener for slider ---
        if(priceSlider) {
            priceSlider.addEventListener('input', filterHouses);
        }
        
        // Initial filter call
        filterHouses();
    }
    
    // Pagination interaction (No changes)
    const paginationSpans = document.querySelectorAll('.pagination span');
    if(paginationSpans.length > 0) {
        // ... (code from previous step is unchanged) ...
    }


    // --- 4. JavaScript for travel_outside.html --- (No changes)
    const galleryItems = document.querySelectorAll('.gallery .gallery-item, .Exclusvies div, .trending div');
    if (galleryItems.length > 0) {
        // ... (code from previous step is unchanged) ...
    }


    // --- 5. JavaScript for online_packages.html --- (No changes)
    const bookNowButtons = document.querySelectorAll('.package-price .cta-btn');
    if(bookNowButtons.length > 0) {
        // ... (code from previous step is unchanged) ...
    }

});
// --- NEW: Dark Mode Toggle Functionality ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to apply the saved theme on page load
const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
};

// Event listener for the toggle switch
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark'); // Save preference
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light'); // Save preference
        }
    });
}

// Apply the saved theme when the page loads
applySavedTheme();

// --- (rest of your existing script.js code) ---
// --- 6. JavaScript for register.html ---
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the form from submitting initially

        // Get form fields
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');

        // Simple Validation Checks
        if (fullName.value.trim() === '') {
            alert('Please enter your full name.');
            return;
        }
        if (email.value.trim() === '' || !email.value.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        if (password.value.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }
        if (password.value !== confirmPassword.value) {
            alert('Passwords do not match.');
            return;
        }
        if (!terms.checked) {
            alert('You must agree to the Terms & Conditions.');
            return;
        }

        // If all checks pass
        alert(`Thank you for registering, ${fullName.value}!\nWelcome to Easybnb.`);
        registrationForm.reset(); // Clear the form
    });
}