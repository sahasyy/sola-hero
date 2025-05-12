document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      
      if (navLinks.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
      }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
          navLinks.classList.remove('active');
          const spans = menuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
      });
  });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;

  function showSlide(index) {
      testimonials.forEach(testimonial => {
          testimonial.classList.remove('active');
      });
      
      dots.forEach(dot => {
          dot.classList.remove('active');
      });
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
  }

  if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', function() {
          currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
          showSlide(currentSlide);
      });
      
      nextBtn.addEventListener('click', function() {
          currentSlide = (currentSlide + 1) % testimonials.length;
          showSlide(currentSlide);
      });
  }

  if (dots.length > 0) {
      dots.forEach((dot, index) => {
          dot.addEventListener('click', function() {
              showSlide(index);
          });
      });
  }

  // Auto-advance testimonials
  setInterval(function() {
      if (testimonials.length > 0) {
          currentSlide = (currentSlide + 1) % testimonials.length;
          showSlide(currentSlide);
      }
  }, 8000);

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(faq => {
              faq.classList.remove('active');
          });
          
          // Open clicked FAQ item if it was not active
          if (!isActive) {
              item.classList.add('active');
          }
      });
  });

  // Waitlist form functionality
  const joinWaitlistBtn = document.getElementById('joinWaitlist');
  const finalCtaBtn = document.getElementById('finalCta');
  const firstNameInput = document.getElementById('firstName');
  const emailInput = document.getElementById('email');
  const researchAreaSelect = document.getElementById('researchArea');
  
  function scrollToWaitlist() {
      document.querySelector('.waitlist-form').scrollIntoView({ 
          behavior: 'smooth' 
      });
      firstNameInput.focus();
  }
  
  if (finalCtaBtn) {
      finalCtaBtn.addEventListener('click', scrollToWaitlist);
  }

  // Nav CTA button
  const navCtaBtn = document.querySelector('.nav-cta');
  if (navCtaBtn) {
      navCtaBtn.addEventListener('click', scrollToWaitlist);
  }
  
  function handleWaitlistSubmit() {
      // Simple form validation
      let isValid = true;
      
      if (!firstNameInput.value.trim()) {
          firstNameInput.style.borderColor = '#ff6b6b';
          isValid = false;
      } else {
          firstNameInput.style.borderColor = '';
      }
      
      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
          emailInput.style.borderColor = '#ff6b6b';
          isValid = false;
      } else {
          emailInput.style.borderColor = '';
      }
      
      if (isValid) {
          // Would normally send data to server here
          joinWaitlistBtn.textContent = 'Joining...';
          
          // Simulate API call
          setTimeout(function() {
              joinWaitlistBtn.textContent = 'Joined!';
              joinWaitlistBtn.style.background = '#4BB543';
              
              // Update counter
              const waitlistCount = document.getElementById('waitlistCount');
              if (waitlistCount) {
                  const currentCount = parseInt(waitlistCount.textContent);
                  waitlistCount.textContent = currentCount + 1;
              }
              
              // Reset form
              setTimeout(function() {
                  firstNameInput.value = '';
                  emailInput.value = '';
                  if (researchAreaSelect) {
                      researchAreaSelect.selectedIndex = 0;
                  }
                  joinWaitlistBtn.textContent = 'Join the waitlist';
                  joinWaitlistBtn.style.background = '';
              }, 3000);
          }, 1500);
      }
  }
  
  if (joinWaitlistBtn) {
      joinWaitlistBtn.addEventListener('click', handleWaitlistSubmit);
  }
  
  // Email validation helper
  function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  // Animation on scroll
  function animateOnScroll() {
      const elements = document.querySelectorAll('.features-grid .glass-card, .step, .testimonial, .faq-item, .cta-content');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  }
  
  // Set initial styles for animation
  document.querySelectorAll('.features-grid .glass-card, .step, .testimonial, .faq-item, .cta-content').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run once on page load
  setTimeout(animateOnScroll, 300);
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});