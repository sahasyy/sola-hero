/**
 * script.js - Sola Landing Page
 * JavaScript functionality for the enhanced Sola landing page
 */

// DOM Elements
const scrollIndicator = document.querySelector('.scroll-indicator');
const submitButton = document.querySelector('.hero .submit-button');
const valueSection = document.getElementById('valueSection');
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
  
  // Type out the greeting
  let i = 0;
  typedGreeting.textContent = ''; // Clear any existing text
  
  function type() {
    if (i < greeting.length) {
      typedGreeting.textContent += greeting.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  
  setTimeout(type, 500);
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
  });
}

/**
 * Check if elements are visible in viewport and animate them
 */
function checkVisibility() {
  animatedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = 
      rect.top <= (window.innerHeight * 0.85) && 
      rect.bottom >= (window.innerHeight * 0.15);
    
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
 * Set up event listeners
 */
function setupEventListeners() {
  // Submit button scrolls to waitlist
  if (submitButton && waitlistSection) {
    submitButton.addEventListener('click', function(e) {
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
  
  // Add hover effects to glass cards
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 15px 30px -10px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 15px -5px rgba(0, 0, 0, 0.1)';
    });
  });
}

/**
 * Validate email format
 */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
