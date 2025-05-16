/**
 * script.js - Sola Landing Page
 * JavaScript functionality for the enhanced Sola landing page
 */

// DOM Elements
const scrollIndicator = document.querySelector('.scroll-indicator');
const ctaButton = document.querySelector('.cta-button');
const valueSection = document.getElementById('valueSection');
const testimonialsSection = document.getElementById('testimonialsSection');
const waitlistSection = document.getElementById('waitlist');
const emailInput = document.querySelector('.email-input');
const waitlistForm = document.querySelector('.waitlist-form');
const yearElement = document.getElementById('current-year');
const typedGreeting = document.querySelector('.typed-greeting');

// Animation elements
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Init
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  yearElement.textContent = new Date().getFullYear();
  
  // Initialize typed greeting
  typeGreeting();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Set up event listeners
  setupEventListeners();
});

/**
 * Type out the greeting message based on time of day
 */
function typeGreeting() {
  // Get the current hour
  const hour = new Date().getHours();
  
  // Set the greeting based on time of day
  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = 'good morning, sunshine';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'hello, bright mind';
  } else if (hour >= 17 && hour < 22) {
    greeting = 'good evening, stargazer';
  } else {
    greeting = 'welcome, night owl';
  }
  
  let i = 0;
  
  function type() {
    if (i < greeting.length) {
      typedGreeting.textContent += greeting.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  
  setTimeout(type, 1000);
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  // Check initial visibility of elements
  checkVisibility();
  
  // Add scroll event listener for animations
  window.addEventListener('scroll', function() {
    checkVisibility();
    parallaxEffect();
  });
}

/**
 * Check if elements are visible in viewport and animate them
 */
function checkVisibility() {
  animatedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = 
      rect.top <= (window.innerHeight * 0.8) && 
      rect.bottom >= (window.innerHeight * 0.2);
    
    if (isVisible) {
      // Use the data-delay attribute if it exists
      const delay = element.dataset.delay || 0;
      setTimeout(() => {
        element.classList.add('visible');
      }, delay);
    }
  });
}

/**
 * Apply parallax effect to background elements
 */
function parallaxEffect() {
  const scrollY = window.scrollY;
  
  // Hero parallax
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.transform = `scale(${1 + scrollY * 0.0005})`;
  }
  
  // Section images parallax
  const sectionImages = document.querySelectorAll('.section-image');
  sectionImages.forEach((image, index) => {
    // Skip first image (hero) as it's handled separately
    if (index > 0) {
      const section = image.closest('section');
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = scrollY - sectionTop;
      
      if (scrollPosition > -window.innerHeight && scrollPosition < sectionHeight) {
        const parallaxValue = scrollPosition * 0.0003;
        image.style.transform = `scale(${1 + Math.abs(parallaxValue)})`;
      }
    }
  });
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // CTA button scrolls to waitlist
  if (ctaButton && waitlistSection) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Scroll indicator scrolls to value section
  if (scrollIndicator && valueSection) {
    scrollIndicator.addEventListener('click', function() {
      valueSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Form submission
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = emailInput.value;
      
      if (validateEmail(email)) {
        // In a real implementation, you would send this to your server
        // For demo purposes, show a success message
        alert('Thank you for joining the waitlist! We\'ll be in touch soon.');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
}

/**
 * Validate email format
 */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
