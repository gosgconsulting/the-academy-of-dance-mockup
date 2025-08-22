/**
 * Academy of Dance Theme JavaScript
 * 
 * @package AcademyOfDance
 */

jQuery(document).ready(function($) {
    'use strict';

    // Smooth scrolling for anchor links
    $('a[href*="#"]:not([href="#"])').click(function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 // Offset for fixed header
                }, 1000, 'easeInOutQuad');
                
                // Close mobile menu if open
                $('#mobile-menu').addClass('hidden');
                return false;
            }
        }
    });

    // Mobile menu toggle
    $('#mobile-menu-toggle').on('click', function() {
        $('#mobile-menu').toggleClass('hidden');
        $(this).find('svg').toggleClass('rotate-90');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#mobile-menu-toggle, #mobile-menu').length) {
            $('#mobile-menu').addClass('hidden');
        }
    });

    // Header scroll effect
    var header = $('nav');
    var scrollThreshold = 50;
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > scrollThreshold) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-fade-up');
            }
        });
    }

    // Initial check and scroll event
    animateOnScroll();
    $(window).scroll(animateOnScroll);

    // Gallery lightbox (if using a lightbox library)
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2'
        });
    }

    // Contact form handling (if contact form exists)
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        var form = $(this);
        var formData = new FormData(this);
        formData.append('action', 'academy_contact_form');
        formData.append('nonce', academy_ajax.nonce);

        $.ajax({
            url: academy_ajax.ajax_url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                form.find('button[type="submit"]').prop('disabled', true).text('Sending...');
            },
            success: function(response) {
                if (response.success) {
                    form[0].reset();
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                } else {
                    showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                }
            },
            error: function() {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            },
            complete: function() {
                form.find('button[type="submit"]').prop('disabled', false).text('Send Message');
            }
        });
    });

    // Notification system
    function showNotification(message, type) {
        var notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
        $('body').append(notification);
        
        setTimeout(function() {
            notification.addClass('show');
        }, 100);
        
        setTimeout(function() {
            notification.removeClass('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Testimonials slider (if using a slider)
    if ($('.testimonials-slider').length) {
        $('.testimonials-slider').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            arrows: false,
            fade: true,
            speed: 800,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }

    // Stats counter animation
    function animateCounter() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when in viewport
    var counterTriggered = false;
    $(window).scroll(function() {
        if (!counterTriggered && $('.counter').length) {
            var counterTop = $('.counter').first().offset().top;
            var viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (viewportBottom > counterTop) {
                animateCounter();
                counterTriggered = true;
            }
        }
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var rate = scrolled * -0.5;
        
        $('.parallax-bg').css('transform', 'translateY(' + rate + 'px)');
    });

    // FAQ accordion
    $('.faq-question').on('click', function() {
        var answer = $(this).next('.faq-answer');
        var icon = $(this).find('.faq-icon');
        
        $('.faq-answer').not(answer).slideUp();
        $('.faq-icon').not(icon).removeClass('rotate-180');
        
        answer.slideToggle();
        icon.toggleClass('rotate-180');
    });

    // Back to top button
    var backToTop = $('#back-to-top');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });
    
    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // WhatsApp button animation
    $('.whatsapp-button').hover(
        function() {
            $(this).addClass('animate-pulse');
        },
        function() {
            $(this).removeClass('animate-pulse');
        }
    );

    // Initialize tooltips if using Bootstrap or similar
    if (typeof $().tooltip === 'function') {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Form validation
    $('form').on('submit', function(e) {
        var valid = true;
        var form = $(this);
        
        form.find('input[required], textarea[required], select[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('error');
                valid = false;
            } else {
                $(this).removeClass('error');
            }
        });
        
        // Email validation
        form.find('input[type="email"]').each(function() {
            var email = $(this).val();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                $(this).addClass('error');
                valid = false;
            }
        });
        
        if (!valid) {
            e.preventDefault();
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });

    // Remove error class on input
    $('input, textarea, select').on('input change', function() {
        $(this).removeClass('error');
    });

    console.log('Academy of Dance theme JavaScript loaded successfully!');
});

// Smooth scroll polyfill for older browsers
(function() {
    'use strict';
    
    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = function(options) {
            var element = this;
            var body = document.body;
            var html = document.documentElement;
            var scrollTop = Math.max(body.scrollTop, html.scrollTop);
            var clientTop = Math.max(body.clientTop, html.clientTop) || 0;
            var top = element.getBoundingClientRect().top + scrollTop - clientTop;
            
            if (options && options.behavior === 'smooth') {
                jQuery('html, body').animate({ scrollTop: top }, 1000);
            } else {
                window.scrollTo(0, top);
            }
        };
    }
})();
