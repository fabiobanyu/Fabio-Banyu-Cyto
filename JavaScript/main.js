// ===========================
// 1. SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll('section, .project-card, .non-project, .stat-item, .stat-item2, .stat-item3');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.classList.add('before-reveal');
  scrollObserver.observe(el);
});

// ===========================
// 2. TYPING EFFECT (NAME)
// ===========================
window.addEventListener('DOMContentLoaded', () => {
  const nameElement = document.querySelector('.hero-text .name');
  if (!nameElement) return;
  const fullText = nameElement.textContent;
  nameElement.textContent = '';
  let i = 0;
  (function typeName() {
    if (i < fullText.length) {
      nameElement.textContent += fullText.charAt(i++);
      setTimeout(typeName, 100);
    }
  })();
});

// ===========================
// 3. SMOOTH SCROLL NAVBAR
// ===========================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href');
    const target = document.querySelector(targetID);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ==================================
// 4. TILT EFFECT ON PROJECT CARDS
// ==================================
const tiltCards = document.querySelectorAll('.project-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  });
});

// ==================================
// 5. PROJECT MODAL
// ==================================
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const closeButton = modal.querySelector('.close-button');
  const modalImage = modal.querySelector('#modalImage');
  const modalTitle = modal.querySelector('#modalTitle');
  const modalDescription = modal.querySelector('#modalDescription');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      modalImage.src = card.dataset.image || '';
      modalTitle.textContent = card.dataset.title || '';
      modalDescription.textContent = card.dataset.description || '';
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  };

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });
});

// ===========================
// 6. BURGER MENU FUNCTIONALITY (Mobile Only)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const burgerIcon = document.querySelector('.burger-icon');
  const menu = document.querySelector('.Menu');

  if (!burgerIcon || !menu) return;

  function handleResize() {
    if (window.innerWidth <= 900) {
      burgerIcon.style.display = 'inline-flex';
      menu.classList.remove('active');
    } else {
      burgerIcon.style.display = 'none';
      menu.classList.remove('active');
      menu.style.display = '';
    }
  }

  burgerIcon.addEventListener('click', function() {
    menu.classList.toggle('active');
  });

  // Close menu when link is clicked (mobile only)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        menu.classList.remove('active');
      }
    });
  });

  window.addEventListener('resize', handleResize);
  handleResize();
});

