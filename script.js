// Initialize AOS if available
if (window.AOS) {
  AOS.init({ duration: 1000, once: true });
}

// Counter animation with requestAnimationFrame and ARIA live region
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  // Add ARIA live region for accessibility
  counter.setAttribute('aria-live', 'polite');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 200;

      function animateCounter() {
        if (count < target) {
          count = Math.min(target, Math.ceil(count + increment));
          counter.innerText = count;
          window.requestAnimationFrame(animateCounter);
        } else {
          counter.innerText = target;
        }
      }
      animateCounter();
      observer.unobserve(counter);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

// 🌙 Dark mode toggle with localStorage
const toggleBtn = document.getElementById('toggleMode');
if (toggleBtn) {
  // Set initial mode from localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Mobile menu toggle (requires .menu-toggle button and .nav-menu)
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Lazy loading images (for images with loading="lazy")
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
  });
});

// Form validation (if you add a contact form with id="contactForm")
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const email = contactForm.querySelector('input[type="email"]');
    if (email && !email.value.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      email.focus();
    }
  });
}
