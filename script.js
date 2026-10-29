/**
 * Imthiyaz Ahmed - Portfolio Website
 * Dynamic Interactions, Canvas Particles, Terminal CLI & Filter Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Particles Background
  initCanvasParticles();

  // 2. Typing Effect for Hero Subtitle
  initHeroTyping();

  // 3. Theme Toggle (Dark / Light)
  initThemeToggle();

  // 4. Scroll Reveal Animations & Nav Spy
  initScrollAnimations();

  // 5. Project Filtering
  initProjectFiltering();

  // 6. Project Modal Deep Dive
  initProjectModal();

  // 7. Interactive Dev Terminal
  initDevTerminal();

  // 8. Contact Form & Toast
  initContactForm();

  // 9. Mobile Navigation
  initMobileMenu();

  // 10. Lucide Icons instantiation
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ===================================================================
   1. Interactive Canvas Background
   =================================================================== */
function initCanvasParticles() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 120 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }

      this.draw();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect adjacent particles
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const opacity = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
      particles[a].update();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===================================================================
   2. Typing Effect for Hero
   =================================================================== */
function initHeroTyping() {
  const typingTarget = document.getElementById('typing-text');
  if (!typingTarget) return;

  const phrases = [
    'B.Tech CSE (Data Science) @ VIT Vellore',
    'Full-Stack Developer & Software Craftsman',
    'Aspiring Startup Founder & Dev Champion',
    'Python & Web Technologies Developer',
    'Mission: Empower Builders Over Gatekeeping',
    'Engineering Scalable & High-Impact Software'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const eraseSpeed = 40;
  const pauseEnd = 2000;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? eraseSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ===================================================================
   3. Theme Toggle (Dark / Light)
   =================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;

  // Read persisted theme or default to dark
  const savedTheme = localStorage.getItem('imthiyaz_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('imthiyaz_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.setAttribute('data-lucide', 'moon');
    } else {
      themeIcon.setAttribute('data-lucide', 'sun');
    }
    if (window.lucide) window.lucide.createIcons();
  }
}

/* ===================================================================
   4. Scroll Reveal Animations & Nav Spy
   =================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // Active section indicator in navigation
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
      }
    });
  });
}

/* ===================================================================
   5. Project Filtering
   =================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   6. Project Modal Deep Dive
   =================================================================== */
const projectData = {
  pageora: {
    title: 'Pageora — Book Reading & Designing Platform',
    badge: 'Flagship Platform',
    category: 'Full-Stack Web & Creative Typography',
    summary:
      'An end-to-end digital sanctuary for readers and book designers. Pageora blends distraction-free reading with a precision typography layout suite, empowering book enthusiasts to format, style, and read literature with bespoke typographic elegance.',
    highlights: [
      'Custom Layout Engine: Dynamic margin tuning, font pairing previews, line-height calibration, and chapter styler.',
      'Distraction-Free Reader Mode: Night/Sepia themes, bookmarking, smooth progression tracking, and reading speed analytics.',
      'Interactive Cover & Book Designer: Visual tools to arrange front-matter, chapter header artwork, and export-ready reading palettes.',
      'Local Persistence & Library: IndexedDB/LocalStorage based offline library management with reading progress synchronization.'
    ],
    techStack: ['JavaScript (ES6+)', 'HTML5 Canvas', 'Tailwind CSS', 'IndexedDB', 'Web Typography API', 'Responsive UI/UX'],
    problemSolved:
      'Standard digital readers offer rigid, uninspired formatting that ignores typographic aesthetics. Pageora gives bibliophiles and indie creators the ability to both read comfortably and visually architect book layouts without bloated desktop software.'
  },
  studytool: {
    title: 'StudyPulse — Personalized Individual Study Companion',
    badge: 'Adaptive EdTech Tool',
    category: 'Productivity, Learning Science & Data Tracking',
    summary:
      'A streamlined, scientific study assistant built specifically to empower an individual student to maximize information retention, manage revision sprints, and eliminate academic burnout using spaced repetition and structured focus cycles.',
    highlights: [
      'Adaptive Spaced Repetition (SM-2 inspired): Schedules review intervals dynamically based on individual topic difficulty ratings.',
      'Deep Work Pomodoro Hub: Integrated 25/5 & 50/10 focus intervals with audio cues and real-time task progression tracking.',
      'Syllabus & Retention Heatmap: Visual matrix charting conceptual mastery across courses and highlighting overdue revision topics.',
      'Quick-Capture Flashcard Suite: Fast keyboard-driven card creation, markdown support for formulas/code snippets, and active recall testing.'
    ],
    techStack: ['Python / JS Engine', 'Data Analytics', 'Local Storage Engine', 'Chart.js / SVG Visualizer', 'CSS Grid & Flexbox'],
    problemSolved:
      'Students often rely on passive re-reading and messy bookmarks. This study companion provides an active, feedback-driven study loop tailored for individual pacing, ensuring consistent progress across complex college coursework.'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const openButtons = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-badge').textContent = data.badge;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-summary').textContent = data.summary;
    document.getElementById('modal-problem').textContent = data.problemSolved;

    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-sm text-slate-300';
      li.innerHTML = `<span class="text-cyan-400 font-bold">✓</span> <span>${item}</span>`;
      highlightsList.appendChild(li);
    });

    const stackContainer = document.getElementById('modal-techstack');
    stackContainer.innerHTML = '';
    data.techStack.forEach((tech) => {
      const badge = document.createElement('span');
      badge.className = 'px-2.5 py-1 text-xs rounded-md bg-indigo-950/70 text-indigo-300 border border-indigo-700/40 font-mono';
      badge.textContent = tech;
      stackContainer.appendChild(badge);
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ===================================================================
   7. Interactive Dev Terminal (CLI Easter Egg)
   =================================================================== */
function initDevTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  if (!terminalInput || !terminalOutput) return;

  const terminalCommands = {
    help: () => `Available commands:
  • <span class="text-cyan-400">about</span>     : Who is Imthiyaz Ahmed?
  • <span class="text-cyan-400">goals</span>     : Startup ambition & mission to empower developers
  • <span class="text-cyan-400">projects</span>  : Flagship creations (Pageora & Study Tool)
  • <span class="text-cyan-400">skills</span>    : Tech stack (Python, JS, SQL, Web)
  • <span class="text-cyan-400">education</span> : VIT Vellore degree info
  • <span class="text-cyan-400">dob</span>       : Age & Date of Birth
  • <span class="text-cyan-400">contact</span>   : Social & email links
  • <span class="text-cyan-400">clear</span>     : Clear the terminal console`,

    about: () => `Imthiyaz Ahmed
  • Age: 19 | DOB: 20 March 2007
  • First Year CSE (Data Science) undergraduate at VIT Vellore.
  • Mission: Build a high-impact startup that gives deserving developers the recognition and platform they earn.`,

    goals: () => `My Ultimate Goal & Mission:
  • <span class="text-emerald-400 font-bold">Found a High-Impact Startup:</span> Build an ecosystem that eliminates traditional hiring barriers.
  • <span class="text-cyan-400 font-bold">Champion Deserving Developers:</span> Ensure brilliant, hardworking builders receive the recognition, rewards, and visibility their craftsmanship deserves.`,

    vision: () => `My Ultimate Goal & Mission:
  • <span class="text-emerald-400 font-bold">Found a High-Impact Startup:</span> Build an ecosystem that eliminates traditional hiring barriers.
  • <span class="text-cyan-400 font-bold">Champion Deserving Developers:</span> Ensure brilliant, hardworking builders receive the recognition, rewards, and visibility their craftsmanship deserves.`,

    projects: () => `Key Projects:
  1. <span class="text-cyan-400 font-semibold">Pageora</span>: Book reading & creative layout designing platform.
  2. <span class="text-emerald-400 font-semibold">Helpful Study Tool</span>: Adaptive individual study & spaced-repetition assistant.`,

    skills: () => `Tech Stack:
  • Languages: Python (Primary), JavaScript (ES6+), SQL, HTML5 & CSS3
  • Data & AI: Pandas, NumPy, Matplotlib, Exploratory Data Analysis (EDA)
  • Web Dev: Responsive Design, Tailwind CSS, DOM Architecture, UI/UX
  • Tools: Git, GitHub, VS Code, Linux/Bash`,

    education: () => `Education:
  • <span class="text-cyan-300 font-semibold">Vellore Institute of Technology (VIT), Vellore</span>
    Degree: B.Tech in Computer Science & Engineering (Spec. in Data Science)
    Register No: 26BDS0307
    Status: 1st Year (2026 - 2030)
    Coursework: Problem Solving & Programming in Python, Discrete Math, Calculus, Linear Algebra.`,

    dob: () => `Date of Birth: 20 March 2007 (Age: 19 years old)`,

    contact: () => `Let's connect:
  • Email: imthiyazahmed.m2026@vitstudent.ac.in
  • GitHub: https://github.com/ImthiyazAhmed07
  • LinkedIn: https://www.linkedin.com/in/imthiyaz-ahmed-bb4807394?utm_source=share_via&utm_content=profile&utm_medium=member_android
  • Location: VIT Vellore, Tamil Nadu, India`,

    clear: () => {
      terminalOutput.innerHTML = '';
      return null;
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';

      if (!rawInput) return;

      // Echo command
      const cmdEcho = document.createElement('div');
      cmdEcho.className = 'text-slate-400 mb-1';
      cmdEcho.innerHTML = `<span class="text-emerald-400 font-mono">visitor@portfolio:~$</span> <span class="text-white">${rawInput}</span>`;
      terminalOutput.appendChild(cmdEcho);

      if (rawInput === 'clear') {
        terminalCommands.clear();
        return;
      }

      const responseEl = document.createElement('div');
      responseEl.className = 'mb-3 text-slate-300 leading-relaxed font-mono text-xs sm:text-sm pl-2 border-l-2 border-indigo-500/40';

      if (terminalCommands[rawInput]) {
        responseEl.innerHTML = terminalCommands[rawInput]().replace(/\n/g, '<br/>');
      } else {
        responseEl.innerHTML = `Command not recognized: <span class="text-rose-400">"${rawInput}"</span>. Type <span class="text-cyan-400 font-bold">help</span> to view all commands.`;
      }

      terminalOutput.appendChild(responseEl);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

/* ===================================================================
   8. Contact Form Handling & Toast Notification
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');
  const gmailWebBtn = document.getElementById('gmail-web-btn');

  if (!form) return;

  function buildEmailPayload() {
    const nameInput = document.getElementById('sender-name');
    const emailInput = document.getElementById('sender-email');
    const subjectInput = document.getElementById('sender-subject');
    const messageInput = document.getElementById('sender-message');

    const name = nameInput.value.trim() || 'Portfolio Visitor';
    const email = emailInput.value.trim() || 'Not specified';
    const subject = subjectInput.value.trim() || `Portfolio Contact from ${name}`;
    const rawMessage = messageInput.value.trim();

    const body = `Hi Imthiyaz,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${rawMessage}\n\n---\nSent from your Portfolio Website`;

    return { name, email, subject, rawMessage, body };
  }

  // 1. Submit Form: Directly launches email app
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const { subject, rawMessage, body } = buildEmailPayload();

    if (!rawMessage) {
      showToast('Please type your message before sending!', 'error');
      return;
    }

    const mailtoUrl = `mailto:imthiyazahmed.m2026@vitstudent.ac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showToast('Redirecting to your mail client...', 'success');

    // Trigger mail client immediately
    window.location.href = mailtoUrl;
  });

  // 2. Direct Web Gmail Composer Button
  if (gmailWebBtn) {
    gmailWebBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const { subject, rawMessage, body } = buildEmailPayload();

      const finalBody = rawMessage ? body : 'Hi Imthiyaz,\n\nI came across your portfolio and wanted to connect.\n\n---\nSent via Portfolio Website';
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=imthiyazahmed.m2026@vitstudent.ac.in&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(finalBody)}`;

      showToast('Opening Gmail composer in a new tab...', 'success');
      window.open(gmailUrl, '_blank');
    });
  }

  function showToast(message, type) {
    if (!toast) return;
    toastMessage.textContent = message;
    if (type === 'error') {
      toast.classList.remove('border-emerald-500', 'bg-emerald-950/80');
      toast.classList.add('border-rose-500', 'bg-rose-950/80');
    } else {
      toast.classList.remove('border-rose-500', 'bg-rose-950/80');
      toast.classList.add('border-emerald-500', 'bg-emerald-950/80');
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

/* ===================================================================
   9. Mobile Menu
   =================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}
