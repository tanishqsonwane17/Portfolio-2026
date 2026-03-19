// ── Lenis Smooth Scroll ───────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ── Custom Cursor ─────────────────────────────────────
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; 
  my = e.clientY;
  gsap.to(dot, { x: mx, y: my, duration: 0.1, ease: 'power2.out' });
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// ── Navbar scroll ─────────────────────────────────────
const navbar = document.getElementById('navbar');
lenis.on('scroll', ({ scroll }) => {
  navbar.classList.toggle('scrolled', scroll > 60);
});

// ── GSAP ──────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 });
gsap.from('.hero-name .word', {
  opacity: 0, y: 80, skewY: 6,
  duration: 1, delay: 0.5,
  stagger: 0.12
});
gsap.from('.hero-desc', { opacity: 0, y: 24, duration: 0.8, delay: 1 });
gsap.from('.hero-actions', { opacity: 0, y: 24, duration: 0.8, delay: 1.1 });
gsap.from('.hero-pic-wrap', { opacity: 0, scale: 0.8, duration: 1, delay: 0.8 });
gsap.from('.stat-item', { opacity: 0, y: 20, duration: 0.6, delay: 1.2, stagger: 0.1 });

// Scroll Reveals
document.querySelectorAll('.reveal').forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.9,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      }
    }
  );
});

// Skill cards stagger
gsap.set('.skill-card', { opacity: 0, y: 40, scale: 0.95 });
gsap.to('.skill-card', {
  opacity: 1, y: 0, scale: 1,
  duration: 0.7,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.skills-grid',
    start: 'top 85%',
  }
});

// Nav active link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Project hover glow
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--gx', x + '%');
    card.style.setProperty('--gy', y + '%');
  });
});

// Contact button
document.querySelector('.btn-submit').addEventListener('click', () => {
  const btn = document.querySelector('.btn-submit');
  btn.textContent = '✓ Sent!';
  btn.style.background = '#fff';

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
  }, 2000);
});