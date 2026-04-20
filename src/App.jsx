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
    url: '#',
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

export default function App() {
  const audioContextRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });
  const [navOpen, setNavOpen] = useState(false);

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
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell">
      <div className="noise" aria-hidden="true" />
      <div
        className={`cursor-blade${cursor.visible ? ' visible' : ''}`}
        aria-hidden="true"
        style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
      />

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
          <div className="hero-content">
            <p className="hero-eyebrow">UX Portfolio</p>
            <h1 className="hero-name glitch" data-text="Taryn Faccenda">
              Taryn Faccenda
            </h1>
            <p className="hero-title">Aspiring UX Designer for AI-Powered Applications</p>
            <p className="hero-statement">
              I design AI tools that feel usable, understandable, and human.
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
          </div>
          <div className="hero-decor" aria-hidden="true" />
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── PROJECTS ───────────────────────────────────── */}
        <section id="projects" className="section fade-in">
          <p className="section-label">Featured Work</p>
          <h2 className="section-heading">Projects</h2>
          <div className="project-grid">
            {FEATURED_PROJECTS.map((p) => (
              <article key={p.id} className="project-card">
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
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading">Skills</h2>
          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.category} className={`skill-card accent-${cat.accent}`}>
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
          <p className="section-label">Work History</p>
          <h2 className="section-heading">Experience</h2>
          <div className="exp-list">
            {EXPERIENCE.map((job) => (
              <div key={job.id} className="exp-item">
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
