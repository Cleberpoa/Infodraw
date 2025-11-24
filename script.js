(() => {
    // Tudo que estava dentro do DOMContentLoaded agora vem aqui dentro
    const body = document.body;

    // ========================================
    // 0. Botões Comprar no WhatsApp
    // ========================================
    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', () => {
            const nome = btn.dataset.nome || 'Produto';
            const preco = btn.dataset.preco || '0';
            const mensagem = `Olá! Quero comprar: *${nome}* por R$ ${preco}`;
            const url = `https://wa.me/5554999158595?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    });

    // ========================================
    // 1. MENU MOBILE (agora funcionando 100%)
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', e => {
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
        const showSlide = n => {
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

    // ========================================
    // 5. BOTÃO WHATSAPP FLUTUANTE (com pulse o tempo todo)
    // ========================================
    // 5. BOTÃO WHATSAPP FLUTUANTE – com altura diferente no celular
const botaoWhats = document.querySelector('.whatsapp-float');
const secaoServices = document.getElementById('services');

if (botaoWhats && secaoServices) {
    let fimDaSecao = secaoServices.offsetTop + secaoServices.offsetHeight;

    const verificar = () => {
        fimDaSecao = secaoServices.offsetTop + secaoServices.offsetHeight;
        const offset = (window.innerWidth <= 768) ? 1700 : 900;  // ← ajuste aqui se quiser

        if (window.pageYOffset + window.innerHeight > fimDaSecao - offset) {
            botaoWhats.classList.add('mostrar');
        } else {
            botaoWhats.classList.remove('mostrar');
        }
    };

    window.addEventListener('scroll', verificar);
    window.addEventListener('resize', verificar);
    verificar();
}

})();
