/* =========================================================
   GYMFIT — CORE SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 400);
  });

  /* ---------- SCROLL PROGRESS BAR ---------- */
  const progress = document.querySelector('.scroll-progress');
  function updateProgress(){
    if(!progress) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive:true });

  /* ---------- NAVBAR ---------- */
  const navbar = document.querySelector('.navbar');
  function toggleNavBg(){
    if(!navbar) return;
    if(window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', toggleNavBg, { passive:true });
  toggleNavBg();

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle){
    function openMenu(){
      navToggle.classList.add('open');
      navLinks.classList.add('open');
      document.body.classList.add('nav-open');
    }
    function closeMenu(){
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
    navToggle.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
      if(navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)){
        closeMenu();
      }
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
    });
  }

  /* ---------- MARK ACTIVE NAV LINK ---------- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === current) a.classList.add('active');
  });

  /* ---------- BUTTON RIPPLE ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- BACK TO TOP ---------- */
  const backTop = document.querySelector('.back-top');
  if(backTop){
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 800);
    }, { passive:true });
    backTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }

  /* ---------- INTERSECTION OBSERVER REVEALS ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- ACCORDION ---------- */
  document.querySelectorAll('.acc-head').forEach(head => {
    head.addEventListener('click', () => {
      const item = head.closest('.acc-item');
      const body = item.querySelector('.acc-body');
      const isOpen = item.classList.contains('open');

      item.parentElement.querySelectorAll('.acc-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.acc-body').style.maxHeight = null;
      });

      if(!isOpen){
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---------- MOUSE TILT ---------- */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });

  /* ---------- BEFORE/AFTER SLIDER ---------- */
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const after = slider.querySelector('.after');
    const handle = slider.querySelector('.ba-handle');
    function move(x){
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
    }
    let dragging = false;
    slider.addEventListener('mousedown', (e) => { dragging = true; move(e.clientX); });
    window.addEventListener('mousemove', (e) => { if(dragging) move(e.clientX); });
    window.addEventListener('mouseup', () => dragging = false);
    slider.addEventListener('mousemove', (e) => { if(!dragging) move(e.clientX); });
    /* touch: swipe-friendly, prevents page scroll while dragging the handle */
    slider.addEventListener('touchstart', (e) => { move(e.touches[0].clientX); }, { passive:true });
    slider.addEventListener('touchmove', (e) => { move(e.touches[0].clientX); e.preventDefault(); }, { passive:false });
  });

  /* ---------- FAQ FLIP CARDS (myth vs fact) ---------- */
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  /* ---------- NUTRITION CARD TAP-TO-FLIP (touch devices) ---------- */
  document.querySelectorAll('.nutri-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  /* ---------- NUTRITION FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const nutriCards = document.querySelectorAll('.nutri-card');
  if(filterBtns.length){
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        nutriCards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* =========================================================
     GSAP SUBTLE SCROLL PARALLAX (used by hero athlete image +
     any other element carrying the .parallax-img class)
     ========================================================= */
  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.parallax-img').forEach(img => {
      gsap.to(img, {
        yPercent:-10, ease:'none',
        scrollTrigger:{ trigger: img.closest('section') || img, start:'top bottom', end:'bottom top', scrub:true }
      });
    });
  }

});
