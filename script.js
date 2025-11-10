// ========================================
// 1. MOBILE MENU: X VISÍVEL + SCROLL BLOQUEADO
// ========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (menuToggle && navLinks) {
  const icon = menuToggle.querySelector('i');

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('active');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fecha menu ao clicar em qualquer link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
      body.style.overflow = '';
    });
  });
}

// ========================================
// 2. HERO SLIDER
// ========================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === n);
        dots[i].classList.toggle('active', i === n);
    });
}

dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// ========================================
// 3. SMOOTH SCROLL + FECHA MENU
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Fecha menu se aberto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
                body.style.overflow = '';
            }
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// 4. SHARE BUTTON
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const shareToggle = document.querySelector('.share-toggle');
    const shareLinks = document.querySelector('.share-links');

    if (shareToggle && shareLinks) {
        shareToggle.addEventListener('click', e => {
            e.stopPropagation();
            shareLinks.classList.toggle('active');
        });

        document.addEventListener('click', () => shareLinks.classList.remove('active'));
        shareLinks.addEventListener('click', e => e.stopPropagation());
    }
});