/* ===== CONFIGURAÇÃO — altere aqui ===== */
// Número no formato internacional, só dígitos (ex.: 5511999999999). PLACEHOLDER: substitua pelo número real da clínica.
const WHATSAPP_NUMBER = '5500000000000';
const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da Clínica Sorriso Prime e gostaria de agendar uma avaliação.';
/* ====================================== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// CTAs do WhatsApp: todos os [data-wa] usam o mesmo link central
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
$$('[data-wa]').forEach(a => { a.href = waUrl; a.target = '_blank'; a.rel = 'noopener noreferrer'; });
if (WHATSAPP_NUMBER === '5500000000000') console.warn('[Sorriso Prime] Defina o número real em js/main.js (WHATSAPP_NUMBER).');

// Header com fundo após o scroll
const header = $('.header'), onScroll = () => header.classList.toggle('scrolled', scrollY > 20);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Menu mobile (com bloqueio de scroll, Esc e fechamento ao navegar)
const burger = $('#burger'), menu = $('#menu');
const setMenu = open => {
  menu.classList.toggle('open', open); document.body.classList.toggle('lock', open);
  burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  burger.firstElementChild.firstElementChild.setAttribute('href', open ? '#i-x' : '#i-menu');
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); } });
matchMedia('(min-width:900px)').addEventListener('change', e => e.matches && setMenu(false));

// FAQ acessível (abre um por vez)
$$('.q').forEach(btn => btn.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  $$('.q').forEach(b => { b.setAttribute('aria-expanded', 'false'); b.closest('.qa').querySelector('.a').classList.remove('open'); });
  if (!open) { btn.setAttribute('aria-expanded', 'true'); btn.closest('.qa').querySelector('.a').classList.add('open'); }
}));

// Animações de entrada ao rolar (respeita prefers-reduced-motion via CSS)
const els = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  els.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
} else els.forEach(el => el.classList.add('in'));

$('#ano').textContent = new Date().getFullYear();
