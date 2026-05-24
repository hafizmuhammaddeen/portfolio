// =============================================
//  PORTFOLIO SCRIPT — All Animations & Logic
// =============================================

/* ---- CUSTOM CURSOR ---- */
const cursorDot     = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

document.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;
  cursorDot.style.left     = x + 'px';
  cursorDot.style.top      = y + 'px';
  // Slight lag on outline for trail feel
  setTimeout(() => {
    cursorOutline.style.left = x + 'px';
    cursorOutline.style.top  = y + 'px';
  }, 60);
});

// Cursor scale on hoverable elements
document.querySelectorAll('a, button, .stat-card, .service-card, .portfolio-card, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%,-50%) scale(1.7)';
    cursorOutline.style.borderColor = 'rgba(245,197,24,0.85)';
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorOutline.style.borderColor = 'rgba(245,197,24,0.5)';
  });
});


/* ---- NAVBAR SCROLL + ACTIVE LINKS ---- */
const navbar    = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Navbar shadow
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Scroll to top button
  scrollTop.classList.toggle('visible', window.scrollY > 400);

  // Active nav link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });

  // AOS trigger
  triggerAOS();

  // Skill bars trigger
  triggerSkillBars();

  // Counter trigger
  triggerCounters();
});


/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav on link click (mobile)
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
  });
});


/* ---- HERO IMAGE 3D TILT ---- */
const heroWrapper = document.getElementById('heroImgWrapper');

if (heroWrapper) {
  heroWrapper.addEventListener('mousemove', (e) => {
    const rect  = heroWrapper.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    const rotX  = -dy * 12;  // max 12deg
    const rotY  =  dx * 12;
    heroWrapper.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });

  heroWrapper.addEventListener('mouseleave', () => {
    heroWrapper.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    heroWrapper.style.transition = 'transform 0.6s ease';
  });

  heroWrapper.addEventListener('mouseenter', () => {
    heroWrapper.style.transition = 'transform 0.08s ease-out';
  });
}


/* ---- COUNTER ANIMATION ---- */
let countersTriggered = false;

function triggerCounters() {
  if (countersTriggered) return;
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    countersTriggered = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      animateCounter(el, 0, target, 1800);
    });
  }
}

function animateCounter(el, start, end, duration) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(ease * (end - start) + start);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = end;
  }
  requestAnimationFrame(step);
}


/* ---- SKILL BARS ANIMATION ---- */
let skillsTriggered = false;

function triggerSkillBars() {
  if (skillsTriggered) return;
  const barsSection = document.querySelector('.skills-bars');
  if (!barsSection) return;
  const rect = barsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    skillsTriggered = true;
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const width = bar.dataset.width;
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 150);
    });
  }
}


/* ---- AOS (Animate On Scroll) ---- */
function triggerAOS() {
  document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(el => {
    const rect = el.getBoundingClientRect();
    const delay = parseInt(el.dataset.delay || 0);
    if (rect.top < window.innerHeight - 80) {
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}


/* ---- STAT CARDS GLOW ON HOVER (extra sparkle) ---- */
document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.stat-num').style.textShadow =
      '0 0 20px #f5c518, 0 0 40px rgba(245,197,24,0.5)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.stat-num').style.textShadow = '';
  });
});


/* ---- CONTACT FORM (Formspree AJAX) ---- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    const origTxt = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled    = true;

    const data = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST', body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        showModal('successModal');
      } else {
        showModal('errorModal');
      }
    } catch {
      showModal('errorModal');
    } finally {
      btn.textContent = origTxt;
      btn.disabled    = false;
    }
  });
}


/* ---- MODALS ---- */
function showModal(id) {
  document.getElementById(id).classList.add('show');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}
// Make closeModal global
window.closeModal = closeModal;

// Click outside to close
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
});


/* ---- SMOOTH SCROLL for nav links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ---- INIT on load ---- */
window.addEventListener('load', () => {
  triggerAOS();
  triggerCounters();
  triggerSkillBars();
});