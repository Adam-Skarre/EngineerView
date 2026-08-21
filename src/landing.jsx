import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Research", href: "#research" },
  { label: "Market Views", href: "market-views.html" },
  { label: "Topics", href: "topics.html" },
  { label: "Methodology", href: "methodology.html" },
  { label: "About", href: "about.html" },
];

const reports = [
  {
    code: "EV–004",
    type: "Infrastructure Brief",
    date: "20 August 2026",
    title: "The transformer is now part of the critical path.",
    description: "Why equipment, specifications, production capacity, and utility acceptance now belong in time-to-power analysis.",
    href: "transformer-critical-path.html",
    topics: "Power · Infrastructure",
  },
  {
    code: "MV–001",
    type: "Market View",
    date: "August 2026",
    title: "Three signals. One systems test.",
    description: "Private credit, AI infrastructure, and public-market valuation examined through the structures beneath the headline.",
    href: "market-views-august-2026.html",
    topics: "Capital · Energy · Technology",
  },
  {
    code: "EV–001",
    type: "Engineering Outlook",
    date: "Research series",
    title: "The grid was designed for yesterday’s load.",
    description: "Data-center electricity demand, regional constraints, and a scenario-led framework for time-to-power.",
    href: "grid-load-growth.html",
    topics: "Energy · Data centers",
  },
  {
    code: "EV–002",
    type: "Research Note",
    date: "Research series",
    title: "The enterprise AI gap is organizational.",
    description: "What current Census data says about firm size, functional breadth, and the capacity to deploy AI.",
    href: "ai-diffusion.html",
    topics: "AI · Enterprise systems",
  },
];

function Mark() {
  return <img className="brand-mark" src="assets/engineer-view-mark.png" alt="" width="48" height="48" />;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.75, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header({ open, setOpen }) {
  return (
    <>
      <header className="site-header">
        <div className="page-shell header-inner">
          <a className="brand" href="index.html" aria-label="Engineer View home"><Mark /><span>ENGINEER VIEW</span></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="company-link" href="https://skartech.com">Skar Technologies <ArrowUpRight size={13} /></a>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="page-shell mobile-nav-inner">
              {navigation.map((item, index) => (
                <motion.a key={item.label} href={item.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index + 0.08 }}>
                  <span>0{index + 1}</span>{item.label}<ArrowUpRight size={18} />
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="hero">
      <div className="page-shell hero-grid">
        <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.85, delay: 0.08 }}>
          <p className="eyebrow">Independent market intelligence</p>
          <h1>See the market through an <em>engineer’s view.</em></h1>
          <p className="hero-lede">Source-linked research on the physical systems, operating constraints, and technical decisions shaping markets.</p>
          <div className="hero-actions">
            <a className="primary-link" href="transformer-critical-path.html">Read the latest view <ArrowRight size={16} /></a>
            <a className="quiet-link" href="#research">Explore research</a>
          </div>
        </motion.div>
        <motion.aside className="hero-motion" initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 1, delay: 0.22 }}>
          <video autoPlay muted loop playsInline preload="metadata" poster="assets/engineer-view-hero-4k.jpg" aria-label="Pulsing market data lines">
            <source src="assets/market-data-motion.mp4" type="video/mp4" />
          </video>
          <a className="hero-motion-note" href="transformer-critical-path.html">
            <span>Latest research · EV–004</span>
            <strong>The transformer is now part of the critical path.</strong>
            <ArrowUpRight size={18} />
          </a>
        </motion.aside>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="research-section" id="research">
      <div className="page-shell">
        <Reveal className="section-intro">
          <p className="section-label">Current research</p>
          <h2>Questions that move through systems.</h2>
          <p>Each report separates the observed record, the analytical interpretation, and the decision consequence.</p>
        </Reveal>
        <div className="report-list">
          {reports.map((report, index) => (
            <Reveal key={report.code} delay={index * 0.04}>
              <article className="report-row">
                <div className="report-id"><strong>{report.code}</strong><span>{report.type}</span></div>
                <div className="report-copy"><p>{report.topics}</p><h3><a href={report.href}>{report.title}</a></h3><span>{report.description}</span></div>
                <div className="report-date"><span>{report.date}</span><a href={report.href} aria-label={`Open ${report.title}`}><ArrowUpRight size={20} /></a></div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="all-research-link"><a href="market-views.html">View all Market Views <ArrowRight size={16} /></a></Reveal>
      </div>
    </section>
  );
}

function Standard() {
  return (
    <section className="standard-section">
      <div className="page-shell standard-grid">
        <Reveal><p className="section-label">Research standard</p><h2>Evidence before interpretation.</h2></Reveal>
        <Reveal className="standard-copy" delay={0.08}>
          <p>Engineer View follows a visible chain from primary evidence to system interpretation and decision consequence. Forecasts remain forecasts; estimates remain estimates; judgment stays visible.</p>
          <a href="methodology.html">Read the methodology <ArrowRight size={16} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand"><a className="brand light" href="index.html"><Mark /><span>ENGINEER VIEW</span></a><p>Always get an engineer’s view.</p></div>
        <div><strong>Research</strong><a href="market-views.html">Market Views</a><a href="topics.html">Topics</a><a href="methodology.html">Methodology</a></div>
        <div><strong>Institution</strong><a href="about.html">About</a><a href="https://skartech.com">Skar Technologies ↗</a></div>
        <div className="footer-note"><p>Source-linked analysis</p><p>© 2026 Engineer View</p></div>
      </div>
    </footer>
  );
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);
  return <div className="site"><Header open={menuOpen} setOpen={setMenuOpen} /><main><Hero /><Research /><Standard /></main><Footer /></div>;
}

createRoot(document.getElementById("root")).render(<Landing />);
