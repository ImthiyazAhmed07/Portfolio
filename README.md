# Imthiyaz Ahmed — Personal Portfolio Website

A modern, high-performance, futuristic personal portfolio website engineered for **Imthiyaz Ahmed** — First-Year B.Tech Computer Science and Engineering (Spec. in Data Science) student at **Vellore Institute of Technology (VIT), Vellore**.

Featuring a sleek dark/light aesthetic, glassmorphic UI, ambient canvas particle interactions, interactive CLI terminal, and deep-dive showcases for flagship projects: **Pageora** and **StudyPulse**.

---

## 🌟 Key Features

1. **Futuristic Hero Section with Typing Animation**:
   - Dynamic typing roles cycling through Data Science, Pageora, Study Tools, and Startup Ambitions.
   - Live availability badge for Summer Internships & Research Collaborations.
   - Quick bio metric card highlighting DOB (20 March 2007), Age (19), Campus, and cohort.

2. **Dedicated "Career Goals" Section**:
   - Standalone feature section detailing your long-term roadmap: **Founding a High-Impact Startup & Championing Deserving Developers**.
   - Dismantling conventional hiring barriers, prioritizing raw engineering merit over gatekeeping, and empowering talented builders globally.

3. **Featured Flagship Projects**:
   - **Pageora (Book Reading & Designing Platform)**:
     - Distraction-free reader mode with customizable contrast palettes (Sepia, OLED Dark, Ivory).
     - Interactive Book Cover & Interior Page layout engine for book lovers and designers.
     - Offline library management with reading speed analytics & progress tracking.
   - **Helpful Study Tool for an Individual**:
     - SM-2 inspired spaced repetition interval scheduler.
     - Deep work Pomodoro timer with structured 25/5 & 50/10 focus intervals.
     - Concept retention heatmap matrix to target weak areas.

4. **Interactive Project Modal (Deep-Dive Architecture)**:
   - Click "Deep Dive Architecture" on any project card to open an interactive modal with problem statements, architectural highlights, and tech stacks.

5. **Interactive Developer Console / CLI (Easter Egg)**:
   - A built-in terminal window for tech recruiters and developers.
   - Type commands:
     - `help` — Show list of commands
     - `about` — Background & bio
     - `goals` — Startup ambition & developer recognition mission
     - `projects` — Key projects summary
     - `skills` — Technical skills breakdown (Python, JS, SQL, Web)
     - `education` — VIT Vellore academic details
     - `dob` — Date of birth & age
     - `contact` — Social links and email
     - `clear` — Clear the console

6. **VIT Vellore Academic Pathway**:
   - Dedicated timeline for B.Tech in CSE with Data Science (2026–2030, Register No: `26BDS0307`).
   - Core courses highlighted: Problem Solving & Algorithms in Python, Calculus & Linear Algebra, Discrete Math, and Data Analysis.

7. **Direct Mail Redirection**:
   - Form directly launches the user's default email client or Gmail Web composer pre-filled with their inquiry addressed to student college email `imthiyazahmed.m2026@vitstudent.ac.in`.
   - Zero intermediate servers or deliverability risks — 100% direct communication to your inbox.

6. **Interactive Background & Micro-Interactions**:
   - Canvas-based particle constellation backdrop that reacts to mouse movement.
   - Ambient glowing orbs with smooth CSS floating keyframe animations.
   - Dark Mode / Light Mode toggle with automatic `localStorage` memory.
   - Contact form with instant client-side validation and toast notifications.

---

## 📁 File Structure

```
Personal Portfolio/
├── index.html       # Semantic, accessible HTML5 structure with Tailwind CSS & Lucide icons
├── styles.css       # Custom design tokens, glassmorphism, glowing accents & animations
├── script.js        # Particles canvas, typing effect, terminal CLI, modal & filters
├── package.json     # Node script configuration (optional runner)
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (Zero Installation)
Simply double-click `index.html` or open it with any web browser (Chrome, Firefox, Edge, Safari).

### Option 2: Using Node.js (Local Web Server)
In this folder, open PowerShell or Terminal and run:

```bash
# Start local server on http://localhost:3000
npm start
```
or:
```bash
npx serve . -l 3000
```

---

## 🌐 How to Deploy for Free

### 1. GitHub Pages (Recommended)
1. Initialize a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Imthiyaz Ahmed Portfolio"
   ```
2. Create a repository on GitHub named `imthiyaz-portfolio` (or `<your-username>.github.io`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/imthiyaz-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repository settings: **Settings > Pages > Branch: `main` / `/ (root)` > Save**.
5. Your portfolio is live at `https://<your-username>.github.io/imthiyaz-portfolio/`!

### 2. Vercel / Netlify (Drag & Drop)
- Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
- Drag and drop this folder (`Personal Portfolio`) directly into their dashboard for an instant HTTPS URL with global CDN delivery.

---

## ⚙️ Configured Profile Details

- **GitHub**: [https://github.com/ImthiyazAhmed07](https://github.com/ImthiyazAhmed07)
- **LinkedIn**: [https://www.linkedin.com/in/imthiyaz-ahmed-bb4807394](https://www.linkedin.com/in/imthiyaz-ahmed-bb4807394)
- **Email**: [imthiyazahmed.m2026@vitstudent.ac.in](mailto:imthiyazahmed.m2026@vitstudent.ac.in)
- **Resume Link**: Place your PDF resume in this folder (e.g., `resume.pdf`) and link it in the header or hero button.

---

Designed & Built for **Imthiyaz Ahmed** • First Year B.Tech CSE (Data Science) @ VIT Vellore.
