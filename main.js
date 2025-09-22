/**
 * Inicializa el tema (claro/oscuro) usando localStorage.
 * Si existe preferencia guardada, la aplica; si no, usa la preferencia del sistema.
 */
function initTheme(){
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
}

/**
 * Alterna el tema y lo guarda en localStorage.
 * Actualiza el atributo data-theme en <html> para cambiar variables CSS.
 */
function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

/**
 * Muestra u oculta el menú móvil.
 * Cambia aria-expanded para accesibilidad.
 */
function toggleMobileMenu(){
  const btn = document.getElementById('mobileToggle');
  const nav = document.getElementById('mobileNav');
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open');
}

/**
 * Maneja el envío del formulario de signup (demo).
 * Aquí simulamos envío y mostramos un mensaje de éxito.
 */
function handleSignupSubmit(e){
  e.preventDefault();
  const success = document.getElementById('signupSuccess');
  success.classList.add('show');
  setTimeout(()=> success.classList.remove('show'), 4000);
  e.target.reset();
}

/**
 * Handles contact form submission.
 * Simple validation and simulated success message.
 */
function handleContactSubmit(e){
  e.preventDefault();
  const success = document.getElementById('contactSuccess');
  // Simple validation
  const name = document.getElementById('name').value.trim();
  const msg = document.getElementById('message').value.trim();
  if(!name || !msg) return alert('Please complete name and message fields.');
  success.classList.add('show');
  setTimeout(()=> success.classList.remove('show'), 4000);
  e.target.reset();
}

/**
 * Handles newsletter form submission.
 * Simple validation and simulated success message.
 */
function handleNewsletterSubmit(e){
  e.preventDefault();
  const success = document.getElementById('newsletterSuccess');
  // Simple validation
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  if(!name || !email) return alert('Please complete name and email fields.');
  success.classList.add('show');
  setTimeout(()=> success.classList.remove('show'), 4000);
  e.target.reset();
}

/**
 * Observador para revelar elementos con animación cuando entran en pantalla.
 * Mejora la experiencia visual sin bloquear el hilo principal.
 */
function initRevealOnScroll(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRevealOnScroll();
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('mobileToggle').addEventListener('click', toggleMobileMenu);
  document.getElementById('signupForm').addEventListener('submit', handleSignupSubmit);
  document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
  document.getElementById('newsletterForm').addEventListener('submit', handleNewsletterSubmit);
  document.getElementById('year').textContent = new Date().getFullYear();

  // Close mobile menu when clicking on a link
  document.querySelectorAll('#mobileNav a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileNav').classList.remove('open');
      document.getElementById('mobileToggle').setAttribute('aria-expanded', 'false');
    });
  });

  // Enable smooth scroll for internal navigation
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
