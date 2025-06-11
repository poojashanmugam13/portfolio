document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement; // Get the root html element
 // Initialize Particles.js (if used) - Add this block
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#8A2BE2" // Using primary color variable, ensure this matches your CSS variable
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8A2BE2", // Using primary color variable, ensure this matches your CSS variable
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 180,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924", // This is a fallback, actual background is handled by CSS
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        });
    }
    // Set theme based on local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark-theme') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Default to dark theme if system preference is dark
        htmlElement.setAttribute('data-theme', 'dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'dark-theme') {
            htmlElement.setAttribute('data-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            htmlElement.setAttribute('data-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Update active link state immediately on click
            updateActiveNavLink(targetId);
        });
    });

    // Function to update active navigation link based on current section
    const updateActiveNavLink = (currentHash) => {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.classList.remove('active');
        });

        // Add 'active' class to the desktop nav link
        const desktopLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
        if (desktopLink) {
            desktopLink.classList.add('active');
        }

        // Add 'active' class to the mobile nav link
        const mobileLink = document.querySelector(`#mobileMenu a[href="${currentHash}"]`);
        if (mobileLink) {
            mobileLink.classList.add('active');
        }
    };

    // Observe sections for scroll-based active link highlighting and entry animations
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link'); // Note: navLinks is declared but not used in the observer callback
    const mobileNavLinks = document.querySelectorAll('#mobileMenu a'); // Note: mobileNavLinks is declared but not used in the observer callback

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class for entry animation
                entry.target.classList.add('visible');

                // Update active navigation link
                const currentId = `#${entry.target.id}`;
                updateActiveNavLink(currentId);
            } else {
                // Optionally remove 'visible' if scrolling away, though often not needed for one-time entry
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Set initial active link on page load
    const initialHash = window.location.hash;
    if (initialHash) {
        updateActiveNavLink(initialHash);
    } else {
        // If no hash, set 'About' as active initially (or the first section)
        updateActiveNavLink('#about');
    }


    // Ripple effect for buttons
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - (this.getBoundingClientRect().left + radius)}px`;
            circle.style.top = `${e.clientY - (this.getBoundingClientRect().top + radius)}px`;
            circle.classList.add('ripple-effect');

            const ripple = this.getElementsByClassName('ripple-effect')[0];

            if (ripple) {
                ripple.remove();
            }

            this.appendChild(circle);
        });
    });

    // Initialize Particles.js (if used)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#8A2BE2" // Using primary color variable
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8A2BE2", // Using primary color variable
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        });

        // Update particle color on theme change
        themeToggleBtn.addEventListener('click', () => {
            const newColor = htmlElement.getAttribute('data-theme') === 'dark-theme' ? '#FFD700' : '#8A2BE2'; // Gold for dark, purple for light
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS.particles) {
                window.pJSDom[0].pJS.particles.color.value = newColor;
                window.pJSDom[0].pJS.particles.line_linked.color = newColor;
                window.pJSDom[0].pJS.fn.particlesDraw(); // Redraw particles
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Modal / Project & Certificate Details
    const infoModal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Consolidated openModal function
    const openModal = (title, contentHTML, mediaSrc = null, isPDF = false) => {
        modalTitle.innerHTML = title;
        if (isPDF) {
            // For PDFs, open in a new tab instead of embedding in the modal
            window.open(mediaSrc, '_blank');
            closeModal(); // Close the modal immediately as content is opened in new tab
            return; // Exit the function
        } else if (mediaSrc) {
            modalBody.innerHTML = `<img src="${mediaSrc}" alt="${title}" class="w-full h-auto object-contain max-h-[70vh] mx-auto mb-4 rounded-lg shadow-md">`;
        } else {
            modalBody.innerHTML = contentHTML;
        }

        infoModal.classList.add('visible'); // Use 'visible' for opacity transition
        infoModal.classList.remove('hidden'); // Ensure it's not hidden by display:none
        document.body.style.overflow = 'hidden'; // Prevent scrolling on body
    };

    const closeModal = () => {
        infoModal.classList.remove('visible');
        // Give time for opacity transition before hiding with display:none
        setTimeout(() => {
            infoModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore body scrolling
        }, 300);
    };

    // Event listener for closing the modal
    modalCloseBtn.addEventListener('click', closeModal);
    infoModal.addEventListener('click', (e) => {
        // Close if click is on the overlay itself, not the content
        if (e.target === infoModal) {
            closeModal();
        }
    });

    // Handle project buttons
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const title = e.currentTarget.dataset.title;
            const description = e.currentTarget.dataset.description; // Get description
            const imageSrc = e.currentTarget.dataset.imageSrc; // Get image source

            let content = '';
            if (imageSrc) {
                content += `<img src="${imageSrc}" alt="${title}" class="w-full h-auto object-contain max-h-[70vh] mx-auto mb-4 rounded-lg shadow-md">`;
            }
            if (description) {
                content += `<p>${description}</p>`;
            }
            openModal(title, content, imageSrc); // Pass imageSrc
        });
    });

    // Handle certificate buttons (from Experience section)
    const viewCertificateButtons = document.querySelectorAll('.view-certificate-btn');
    viewCertificateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const title = e.currentTarget.dataset.title;
            const content = e.currentTarget.dataset.content;
            const pdfSrc = e.currentTarget.dataset.pdfSrc; // Get PDF source
            const imageSrc = e.currentTarget.dataset.imageSrc; // Get image source

            if (pdfSrc) {
                // If a PDF source exists, open it in a new tab
                openModal(title, '', pdfSrc, true); // Pass true for isPDF
            } else {
                // Otherwise, open in the modal as an image or content
                openModal(title, content, imageSrc);
            }
        });
    });

    // Handle achievement certificate buttons (new)
    const viewAchievementCertButtons = document.querySelectorAll('.view-achievement-cert-btn');
    viewAchievementCertButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const title = e.currentTarget.dataset.title;
            const pdfSrc = e.currentTarget.dataset.pdfSrc; // Check for PDF source
            const imageSrc = e.currentTarget.dataset.imageSrc; // Get image source

            if (pdfSrc) {
                openModal(title, '', pdfSrc, true); // Open PDF in new tab
            } else {
                // For achievements, we primarily want to show the image, or a generic message if no image
                const content = imageSrc ? '' : 'No detailed description available for this certificate, displaying image.';
                openModal(title, content, imageSrc);
            }
        });
    });
});