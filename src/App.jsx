import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: 'Rent Burden Lab',
    subtitle: 'Midterm - Revised',
    description:
      'A revised midterm project focused on making housing cost data easier to explore and understand. The redesign improved structure, visual hierarchy, and interaction flow so users could compare rent burden information with less friction. The result was a cleaner, more usable experience for navigating complex affordability data.',
    tags: ['UX Design', 'Web Dev', 'AI'],
    url: 'https://github.com/tmf24-ctrl/Rent_Burden_Lab',
  },
  {
    id: 2,
    title: 'AI Job Tech Project',
    description:
      'An AI-powered concept focused on helping users navigate job-related technology with more confidence. The UX work centered on making AI behavior understandable, reducing ambiguity in system responses, and designing interaction patterns that feel transparent, supportive, and easy to trust.',
    tags: ['AI UX', 'Interaction Design', 'Prototyping'],
    url: 'https://github.com/tmf24-ctrl/IS219_Final_API',
  },
];

const SKILL_CATEGORIES = [
  {
    category: 'UX & Design',
    accent: 'neon',
    skills: ['Web Design', 'Wireframing', 'Prototyping', 'User Flows', 'Anti-Pattern UI', 'Responsive Design'],
  },
  {
    category: 'Languages & Frameworks',
    accent: 'pink',
    skills: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C / C++ / C#', 'PHP', 'React', 'Node.js', 'Chart.js', 'HTML & CSS'],
  },
  {
    category: 'Tools & Platforms',
    accent: 'purple',
    skills: ['JIRA / Scrum', 'Apache', 'Linux & Ubuntu', 'Git & GitHub', 'Unity', 'Arduino', 'MATLAB', 'Microsoft 365'],
  },
];

const EXPERIENCE = [
  {
    id: 1,
    role: 'IT Service Desk / Student Assistant',
    org: 'New Jersey Institute of Technology',
    period: 'April 2024 – Present',
    location: 'Newark, NJ',
    bullets: [
      'Provided first-level IT support, troubleshooting hardware and software issues',
      'Resolved help desk tickets and assisted users with technical problems',
      'Delivered IT support via phone, email, and in person',
      'Diagnosed system issues and escalated complex problems as needed',
    ],
  },
  {
    id: 2,
    role: 'Software Development Intern — Roster Server',
    org: 'Classlink',
    period: 'June 2025 – August 2025',
    location: 'Clifton, NJ',
    bullets: [
      'Gained hands-on experience with full-stack development including data engineering and front-end visualization',
      'Enabled the company to proactively monitor data trends and assess the impact of system updates',
      'Designed and implemented backend data pipelines to warehouse, process, and analyze roster data for actionable insights',
    ],
  },
  {
    id: 3,
    role: 'Head Counselor',
    org: 'Musconetcong Valley Community Association',
    period: 'June 2018 – August 2025',
    location: 'Long Valley, NJ',
    bullets: [
      'Assisted with the planning, organization, and implementation of camp activities',
      'Supervised and participated in all activities including swimming, field trips, arts and crafts, and sports',
    ],
  },
];

const AWARDS = [
  'NCWIT Aspirations in Computing — National Certificate of Excellence',
  "NJIT Dean's List: Fall 2022, Spring 2023, Fall 2023, Spring 2024, Fall 2024, Spring 2025, Fall 2025",
  'National State Seal of Biliteracy — French Language',
];

const CHAPTERS = [
  { id: 'home', label: 'Intro' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const STATS = [
  { value: 6, label: "Dean's List Semesters", suffix: 'x' },
  { value: 3, label: 'Roles Held', suffix: '+' },
  { value: 5, label: 'Years Experience', suffix: '+' },
];

const MARQUEE_ITEMS = [
  'UX Design', 'React', 'AI Interfaces', 'Data Visualization', 'Prototyping',
  'JavaScript', 'Python', 'Node.js', 'Human-Centered', 'Interaction Design',
  'Full-Stack', 'Anti-Pattern UI', "Dean's List",
];

const TYPEWRITER_TEXT = 'I design AI tools that feel usable, understandable, and human.';

export default function App() {
  const audioContextRef = useRef(null);
  const heroContentRef = useRef(null);
  const statsRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });
  const [navOpen, setNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [statValues, setStatValues] = useState(STATS.map(() => 0));

  const playHoverTone = () => {
    if (!soundEnabled) return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    if (!audioContextRef.current) audioContextRef.current = new Context();
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 165 + Math.random() * 90;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  };

  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY, visible: true });
    const onLeave = () => setCursor((c) => ({ ...c, visible: false }));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('a, button');
    els.forEach((el) => el.addEventListener('mouseenter', playHoverTone));
    return () => els.forEach((el) => el.removeEventListener('mouseenter', playHoverTone));
  }, [soundEnabled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.fade-in, .scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      if (heroContentRef.current) {
        const offset = window.scrollY * 0.25;
        const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.7));
        heroContentRef.current.style.transform = `translateY(${offset}px)`;
        heroContentRef.current.style.opacity = fade;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking for chapter dots
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    setTypedText('');
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTypedText(TYPEWRITER_TEXT.slice(0, i));
        if (i >= TYPEWRITER_TEXT.length) clearInterval(interval);
      }, 38);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(delay);
  }, []);

  // Count-up stats
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      STATS.forEach((stat, i) => {
        const duration = 1400;
        const stepTime = 16;
        const totalSteps = duration / stepTime;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / totalSteps;
          const eased = 1 - Math.pow(1 - progress, 3);
          setStatValues((prev) => {
            const next = [...prev];
            next[i] = Math.round(eased * stat.value);
            return next;
          });
          if (step >= totalSteps) clearInterval(timer);
        }, stepTime);
      });
    }, { threshold: 0.5 });
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell">
      <div className="noise" aria-hidden="true" />
      <div
        className="scroll-progress-bar"
        aria-hidden="true"
        style={{ width: `${scrollProgress}%` }}
      />
      <div
        className={`cursor-blade${cursor.visible ? ' visible' : ''}`}
        aria-hidden="true"
        style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
      />
      {/* ── CHAPTER NAV DOTS ────────────────────────── */}
      <nav className="chapter-nav" aria-label="Chapter navigation">
        {CHAPTERS.map((ch) => (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            className={`chapter-dot${activeSection === ch.id ? ' active' : ''}`}
            aria-label={ch.label}
          >
            <span className="chapter-dot-label">{ch.label}</span>
          </a>
        ))}
      </nav>
      {/* ── NAV ────────────────────────────────────────── */}
      <nav className="site-nav" aria-label="Main navigation">
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((o) => !o)}
        >
          ☰
        </button>
        <ul className={`nav-links${navOpen ? ' open' : ''}`} role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" onClick={() => setNavOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`sound-btn${soundEnabled ? ' on' : ''}`}
          onClick={() => setSoundEnabled((v) => !v)}
        >
          ⟁ Sound {soundEnabled ? 'On' : 'Off'}
        </button>
      </nav>

      <main>
        {/* ── HERO ───────────────────────────────────────── */}
        <section id="home" className="hero-section">
          <div className="hero-content" ref={heroContentRef}>
            <p className="hero-eyebrow">UX Portfolio</p>
            <h1 className="hero-name glitch" data-text="Taryn Faccenda">
              Taryn Faccenda
            </h1>
            <p className="hero-title">Aspiring UX Designer for AI-Powered Applications</p>
            <p className="hero-statement">
              <span className="typewriter">{typedText}</span>
              <span className="typewriter-cursor" aria-hidden="true" />
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="https://github.com/tmf24-ctrl" target="_blank" rel="noreferrer" className="btn btn-ghost">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/taryn-faccenda-661848236/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                LinkedIn
              </a>
            </div>

            {/* ── STATS ──────────────────────────── */}
            <div className="hero-stats" ref={statsRef}>
              {STATS.map((stat, i) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-value">
                    {statValues[i]}<span className="stat-suffix">{stat.suffix}</span>
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="scroll-hint" aria-hidden="true">
            <span className="scroll-hint-text">Scroll</span>
            <div className="scroll-hint-arrow">↓</div>
          </div>

          <div className="hero-decor" aria-hidden="true" />
        </section>

        {/* ── MARQUEE ────────────────────────────────── */}
        <div className="marquee-track" aria-hidden="true">
          <div className="marquee-inner">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>

        <div className="section-divider" aria-hidden="true" />

        {/* ── PROJECTS ───────────────────────────────────── */}
        <section id="projects" className="section fade-in">
          <span className="chapter-num">Chapter 01</span>
          <p className="section-label">Featured Work</p>
          <h2 className="section-heading">Projects</h2>
          <div className="project-grid">
            {FEATURED_PROJECTS.map((p, i) => (
              <article key={p.id} className="project-card scroll-reveal reveal-up" style={{ '--delay': `${i * 150}ms` }}>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="project-title">{p.title}</h3>
                {p.subtitle && <p className="project-subtitle">{p.subtitle}</p>}
                <p className="project-desc">{p.description}</p>
                <a
                  href={p.url}
                  className="btn btn-ghost btn-sm"
                  target={p.url !== '#' ? '_blank' : undefined}
                  rel={p.url !== '#' ? 'noreferrer' : undefined}
                >
                  View Project
                </a>
              </article>
            ))}
          </div>
        </section>

        <div className="section-divider flip" aria-hidden="true" />

        {/* ── SKILLS ─────────────────────────────────────── */}
        <section id="skills" className="section fade-in">
          <span className="chapter-num">Chapter 02</span>
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading">Skills</h2>
          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={cat.category} className={`skill-card accent-${cat.accent} scroll-reveal reveal-up`} style={{ '--delay': `${i * 120}ms` }}>
                <h3 className="skill-category">{cat.category}</h3>
                <ul className="skill-list">
                  {cat.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── ABOUT ──────────────────────────────────────── */}
        {/* ── EXPERIENCE ─────────────────────────────────── */}
        <section id="experience" className="section fade-in">
          <span className="chapter-num">Chapter 03</span>
          <p className="section-label">Work History</p>
          <h2 className="section-heading">Experience</h2>
          <div className="exp-list">
            {EXPERIENCE.map((job, i) => (
              <div key={job.id} className="exp-item scroll-reveal reveal-left" style={{ '--delay': `${i * 100}ms` }}>
                <div className="exp-header">
                  <div>
                    <p className="exp-role">{job.role}</p>
                    <p className="exp-org">{job.org}</p>
                  </div>
                  <div className="exp-meta">
                    <span>{job.period}</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <ul className="exp-bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider flip" aria-hidden="true" />

        {/* ── ABOUT ──────────────────────────────────────── */}
        <section id="about" className="section fade-in">
          <span className="chapter-num">Chapter 04</span>
          <p className="section-label">Background</p>
          <h2 className="section-heading">About</h2>
          <div className="about-content">
            <p>
              I&apos;m an IT student at NJIT with a passion for building web applications and
              interfaces that actually make sense. My work spans full-stack development, data
              engineering, and UX design — always with the goal of making complex systems feel
              approachable and usable for real people.
            </p>
            <p>
              I&apos;m especially interested in the intersection of AI and product design: how do
              we build interfaces around intelligent systems without losing the human side? Whether
              it&apos;s fighting addictive UI patterns, surfacing data insights, or designing for
              mindful digital habits, I build with intention.
            </p>
          </div>
          <div className="awards-block">
            <p className="awards-label">Recognition</p>
            <ul className="awards-list">
              {AWARDS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="section-divider flip" aria-hidden="true" />

        {/* ── CONTACT ────────────────────────────────────── */}
        <section id="contact" className="section contact-section fade-in">
          <span className="chapter-num">Chapter 05</span>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-heading">Contact</h2>
          <p className="contact-intro">Open to collaborations, feedback, and opportunities.</p>
          <div className="contact-links">
            <a
              href="https://github.com/tmf24-ctrl"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <span className="contact-icon">⌥</span>
              <span>
                <strong>GitHub</strong>
                <span className="contact-sub">github.com/tmf24-ctrl</span>
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/taryn-faccenda-661848236/"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <span className="contact-icon">✦</span>
              <span>
                <strong>LinkedIn</strong>
                <span className="contact-sub">linkedin.com/in/taryn-faccenda</span>
              </span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Taryn Faccenda — UX Designer</p>
      </footer>
    </div>
  );
}
