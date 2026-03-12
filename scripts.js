 /* Navbar scroll */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  /* Hamburger */
 (function () {
  'use strict';

  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var menuOverlay = document.getElementById('menuOverlay');
  var menuClose = document.getElementById('menuClose');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden'; /* trava scroll do body */
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Abrir pelo hamb�rguer */
  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  /* Fechar pelo bot�o X */
  menuClose.addEventListener('click', closeMenu);

  /* Fechar clicando no overlay escuro */
  menuOverlay.addEventListener('click', closeMenu);

  /* Fechar ao clicar em qualquer link do menu */
  document.querySelectorAll('.mob-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Fechar com tecla Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

}());
  /* Slider */
  let current = 0;
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slider-dot');
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5500); }

  document.getElementById('sliderPrev').addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  document.getElementById('sliderNext').addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.idx); resetTimer(); }));
  resetTimer();

  /* Touch swipe */
  let tx = 0;
  const sliderEl = document.querySelector('.slider');
  sliderEl.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  sliderEl.addEventListener('touchend', e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
  }, { passive: true });

  /* Fade-in on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* Active nav */
  const secs = document.querySelectorAll('section[id]');
  const nlinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    nlinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + cur); });
  });

  /* WhatsApp form */
  function sendWhatsApp() {
    const name    = document.getElementById('formName').value.trim();
    const phone   = document.getElementById('formPhone').value.trim();
    const service = document.getElementById('formService').value;
    const msg     = document.getElementById('formMsg').value.trim();

    if (!name)  { alert('Por favor, informe seu nome.'); return; }
    if (!phone) { alert('Por favor, informe seu telefone.'); return; }

    const text = `Olá, Infodraw Tecnologias! 👋\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Serviço:* ${service || 'Não informado'}\n*Mensagem:* ${msg || 'Sem mensagem adicional'}`;
    window.open(`https://wa.me/5554999158595?text=${encodeURIComponent(text)}`, '_blank');
  }
  (function () {
  'use strict';

  /* ── Accordion toggle ── */
  window.ifqToggle = function (questionEl) {
  'use strict';

  var item   = questionEl.closest('.ifq-item');
  var answer = item.querySelector('.ifq-answer');
  var inner  = item.querySelector('.ifq-answer-inner');
  var wasOpen = item.classList.contains('ifq-open');

  /* Fecha todos os itens abertos */
  document.querySelectorAll('.ifq-item.ifq-open').forEach(function (openItem) {
    var openAnswer = openItem.querySelector('.ifq-answer');
    openItem.classList.remove('ifq-open');
    openAnswer.style.maxHeight = '0';
  });

  /* Se estava fechado, abre com altura real do conteúdo */
  if (!wasOpen) {
    item.classList.add('ifq-open');

    /* Mede a altura real do conteúdo interno */
    var realHeight = inner.scrollHeight + 'px';

    /* Aplica via style inline — sobrescreve o max-height do CSS */
    answer.style.maxHeight = realHeight;

    /* Scroll suave para garantir visibilidade no mobile */
    setTimeout(function () {
      var rect = item.getBoundingClientRect();
      var isPartiallyHidden = rect.bottom > (window.innerHeight || document.documentElement.clientHeight);

      if (isPartiallyHidden) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 450); /* aguarda a animação terminar */
  }
};

  /* ── Category tabs ── */
  document.querySelectorAll('.ifq-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.ifq-tab').forEach(function (t) { t.classList.remove('ifq-active'); });
      tab.classList.add('ifq-active');

      var cat = tab.dataset.cat;
      var items = document.querySelectorAll('.ifq-item');
      var any = false;

      items.forEach(function (item) {
        var match = cat === 'all' || item.dataset.cat === cat;
        item.style.display = match ? '' : 'none';
        if (match) any = true;
      });

      document.getElementById('ifqEmpty').style.display = any ? 'none' : 'block';
    });
  });

  /* ── Search ── */
  document.getElementById('ifqSearch').addEventListener('input', function () {
    var q = this.value.toLowerCase().trim();
    var items = document.querySelectorAll('.ifq-item');
    var any = false;

    /* Reset tab active state when searching */
    if (q.length > 0) {
      document.querySelectorAll('.ifq-tab').forEach(function (t) { t.classList.remove('ifq-active'); });
      document.querySelector('.ifq-tab[data-cat="all"]').classList.add('ifq-active');
    }

    items.forEach(function (item) {
      if (q.length === 0) {
        item.style.display = '';
        any = true;
        return;
      }
      var text = (item.dataset.keywords || '') + ' ' + item.querySelector('strong').textContent;
      var match = text.toLowerCase().indexOf(q) !== -1;
      item.style.display = match ? '' : 'none';
      if (match) any = true;
    });

    var empty = document.getElementById('ifqEmpty');
    document.getElementById('ifqEmptyTerm').textContent = q;
    empty.style.display = (q.length > 0 && !any) ? 'block' : 'none';
  });

}());// JavaScript Document