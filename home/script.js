// ===========================
// WILDIO ADVENTURES – script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Menu Toggle ──
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.textContent = '☰';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuToggle.textContent = '☰';
      }
    });
  }

  // ── Sticky Header Shadow ──
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // ── Scroll Reveal ──
  const revealTargets = document.querySelectorAll('.card, .tip-card, .faq-item, .info-card, .blog-featured');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.07}s`;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Add initial hidden state via JS (progressive enhancement)
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  // "revealed" class triggers animation
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // ── Contact Form ──
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.style.animation = 'fadeUp 0.5s ease both';
        }
      }, 1000);
    });
  }

  // ── Active Nav Highlight ──
  // Already set via class in HTML, but this handles hash/scroll if needed
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});
