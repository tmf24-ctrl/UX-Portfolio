import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom';
import projects from './data/projects.json';

const pages = [
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function AboutPage() {
  return (
    <section className="panel about">
      <h2>About This Designer</h2>
      <p>
        I am an aspiring UX designer focused on research-backed design, accessible interfaces, and
        strong visual narrative. I like turning friction points into flows that feel sharp and
        memorable.
      </p>
    </section>
  );
}

function ProjectsPage({ activeTag, setActiveTag }) {
  const tags = useMemo(() => ['All', ...new Set(projects.map((project) => project.tag))], []);

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') {
      return projects;
    }

    return projects.filter((project) => project.tag === activeTag);
  }, [activeTag]);

  return (
    <section className="panel">
      <div className="section-head">
        <h2>Projects</h2>
        <p>Filter by type and open live work or placeholders.</p>
      </div>

      <div className="filter-row" role="tablist" aria-label="Project categories">
        {tags.map((tag) => (
          <button
            key={tag}
            className={activeTag === tag ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <article key={project.id} className="project-card">
            <span className="project-tag">{project.tag}</span>
            <h3>{project.title}</h3>
            <p>{project.blurb}</p>
            <p className="status-text">{project.status}</p>
            <Link className="ghost-btn ghost-link" to={`/projects/${slugify(project.title)}`}>
              View Project Page
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((entry) => slugify(entry.title) === slug);

  if (!project) {
    return (
      <section className="panel">
        <h2>Project Not Found</h2>
        <p>This project page does not exist yet.</p>
        <Link className="ghost-btn ghost-link" to="/projects">
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="panel project-detail">
      <p className="project-tag">{project.tag}</p>
      <h2>{project.title}</h2>
      <p>{project.blurb}</p>
      <p className="status-text">{project.status}</p>
      <div className="detail-actions">
        {project.url ? (
          <a className="cta" href={project.url} rel="noreferrer">
            Open Live Project
          </a>
        ) : (
          <button className="ghost-btn" type="button">
            Upload Case Study Later
          </button>
        )}
        <Link className="ghost-btn ghost-link" to="/projects">
          Back to Projects
        </Link>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="panel contact">
      <h2>Let&apos;s Connect</h2>
      <p>Email: yourname@portfolio.com</p>
      <p>LinkedIn: linkedin.com/in/yourname</p>
    </section>
  );
}

function App() {
  const audioContextRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });
  const [activeTag, setActiveTag] = useState('All');

  const playHoverTone = () => {
    if (!soundEnabled || typeof window === 'undefined') {
      return;
    }

    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new Context();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.value = 165 + Math.random() * 90;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.12);
  };

  useEffect(() => {
    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
    };

    const onLeave = () => {
      setCursor((current) => ({ ...current, visible: false }));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  useEffect(() => {
    const interactives = document.querySelectorAll('a, button');
    interactives.forEach((element) => {
      element.addEventListener('mouseenter', playHoverTone);
      element.addEventListener('focus', playHoverTone);
    });

    return () => {
      interactives.forEach((element) => {
        element.removeEventListener('mouseenter', playHoverTone);
        element.removeEventListener('focus', playHoverTone);
      });
    };
  }, [soundEnabled]);

  return (
    <div className="page-shell">
      <div
        className={cursor.visible ? 'cursor-blade visible' : 'cursor-blade'}
        aria-hidden="true"
        style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
      />
      <div className="noise" aria-hidden="true" />
      <nav className="site-nav" aria-label="Main">
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) => (isActive ? 'nav-btn active-nav' : 'nav-btn')}
          >
            {page.label}
          </NavLink>
        ))}
        <button
          type="button"
          className={soundEnabled ? 'sound-btn on' : 'sound-btn'}
          onClick={() => setSoundEnabled((value) => !value)}
        >
          Hover Sound: {soundEnabled ? 'On' : 'Off'}
        </button>
      </nav>
      <header className="hero">
        <p className="stamp">Incoming UX Designer</p>
        <h1>
          Ripped Edges.
          <br />
          Real User Stories.
        </h1>
        <p className="intro">
          I design digital experiences with a punk spirit: honest, intentional, and made for real
          people. This portfolio is a living board for projects that are about to drop.
        </p>
        <Link to="/projects" className="cta">
          Enter Portfolio Pit
        </Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/projects"
            element={<ProjectsPage activeTag={activeTag} setActiveTag={setActiveTag} />}
          />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
