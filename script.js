document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 0. Botão comprar no WhatsApp
    // ========================================        
    const buttons = document.querySelectorAll('.btn-buy');
    console.log('Botões encontrados:', buttons.length);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nome = btn.dataset.nome || 'Produto';
            const preco = btn.dataset.preco || '0';
            const mensagem = `Olá! Quero comprar: *${nome}* por R$ ${preco}`;
            const url = `https://wa.me/5554999158595?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    });

    // ========================================
    // 1. MOBILE MENU
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
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

    if (slides.length > 0) {
        const showSlide = (n) => {
            slides.forEach((s, i) => s.classList.toggle('active', i === n));
            dots.forEach((d, i) => d.classList.toggle('active', i === n));
        };

        dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // ========================================
    // 3. SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                // Fecha menu se aberto
                if (navLinks && navLinks.classList.contains('active')) {
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
