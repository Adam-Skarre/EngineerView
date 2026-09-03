import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Market Views", href: "/market-views/" },
  { label: "Topics", href: "/topics/" },
  { label: "About", href: "/about/" },
];

const reports = [
  {
    code: "EV–004",
    type: "Infrastructure Brief",
    date: "20 August 2026",
    title: "The transformer is now part of the critical path.",
    description: "Why equipment, specifications, production capacity, and utility acceptance now belong in time-to-power analysis.",
    href: "/transformer-critical-path/",
    topics: "Power · Infrastructure",
  },
  {
    code: "MV–001",
    type: "Market View",
    date: "August 2026",
    title: "Three signals. One systems test.",
    description: "Private credit, AI infrastructure, and public-market valuation examined through the structures beneath the headline.",
    href: "/market-views-august-2026/",
    topics: "Capital · Energy · Technology",
  },
  {
    code: "EV–001",
    type: "Engineering Outlook",
    date: "Research series",
    title: "The grid was designed for yesterday’s load.",
    description: "Data-center electricity demand, regional constraints, and a scenario-led framework for time-to-power.",
    href: "/grid-load-growth/",
    topics: "Energy · Data centers",
  },
  {
    code: "EV–002",
    type: "Research Note",
    date: "Research series",
    title: "The enterprise AI gap is organizational.",
    description: "What current Census data says about firm size, functional breadth, and the capacity to deploy AI.",
    href: "/ai-diffusion/",
    topics: "AI · Enterprise systems",
  },
];

const signals = [
  {
    value: "1.9%",
    label: "Forecast U.S. electricity-load growth in 2026",
    kind: "Forecast",
    source: "U.S. EIA · March 2026",
    href: "https://www.eia.gov/todayinenergy/detail.php?id=67344",
  },
  {
    value: "4.4%",
    label: "Estimated U.S. electricity used by data centers in 2023",
    kind: "Historical estimate",
    source: "DOE / LBNL · December 2024",
    href: "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers",
  },
  {
    value: "+41%",
    label: "Reported change in distribution-transformer demand since 2019",
    kind: "Reported change",
    source: "U.S. DOE · March 2026",
    href: "https://www.energy.gov/oe/distribution-transformer-webinar-text-alternative",
  },
  {
    value: "17–20%",
    label: "U.S. businesses reporting AI use, Dec. 2025–May 2026",
    kind: "Survey range",
    source: "U.S. Census Bureau · May 2026",
    href: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
  },
];

function Mark() {
  return <img className="brand-mark" src="/assets/engineer-view-mark.png" alt="" width="48" height="48" />;
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
          <a className="brand" href="/" aria-label="Engineer View home"><Mark /><span>ENGINEER VIEW</span></a>
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
                  {item.label}<ArrowUpRight size={18} />
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
      <div className="hero-lines" aria-hidden="true">
        {[0.25, 0.38, 0.51].map((delay) => (
          <motion.i key={delay} initial={reducedMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reducedMotion ? 0 : 1.2, delay }} />
        ))}
      </div>
      <div className="page-shell hero-grid">
        <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.85, delay: 0.08 }}>
          <p className="eyebrow">Power · Infrastructure · Industrial systems</p>
          <h1>See the market<br />through an<br /><em>engineer’s view.</em></h1>
          <p className="hero-lede">Source-linked research on power, infrastructure, industrial capacity, and technology—focused on the physical constraints that shape operating and capital decisions.</p>
          <div className="hero-actions">
            <a className="primary-link" href="/transformer-critical-path/">Read the latest view <ArrowRight size={16} /></a>
            <a className="quiet-link" href="#research">Explore research</a>
          </div>
        </motion.div>
        <motion.aside className="latest-panel" initial={reducedMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.85, delay: 0.35 }}>
          <div className="latest-meta"><span>Latest research</span><span>EV–004</span></div>
          <p>Infrastructure Brief · 20 August 2026</p>
          <h2><a href="/transformer-critical-path/">The transformer is now part of the critical path.</a></h2>
          <p className="latest-summary">Equipment, specifications, production capacity, and utility acceptance now belong in time-to-power analysis.</p>
          <a className="latest-open" href="/transformer-critical-path/">Open report <ArrowUpRight size={18} /></a>
        </motion.aside>
      </div>
      <div className="page-shell hero-foot"><span>Evidence</span><i /><span>Systems</span><i /><span>Consequence</span></div>
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
        <Reveal className="all-research-link"><a href="/market-views/">View all Market Views <ArrowRight size={16} /></a></Reveal>
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section className="evidence-section">
      <div className="page-shell">
        <Reveal className="evidence-heading">
          <div><p className="section-label light">Current infrastructure signals</p><h2>Four measures in view.</h2></div>
          <p>Each measure is labeled by type, dated, and linked directly to its primary public source.</p>
        </Reveal>
        <div className="evidence-grid">
          {signals.map((signal, index) => (
            <Reveal key={signal.label} delay={index * 0.05} className="evidence-card">
              <span>{signal.kind}</span><strong>{signal.value}</strong><p>{signal.label}</p>
              <a href={signal.href} target="_blank" rel="noopener noreferrer">{signal.source} <ArrowUpRight size={13} /></a>
            </Reveal>
          ))}
        </div>
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
          <a href="/methodology/">Read the methodology <ArrowRight size={16} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand"><a className="brand light" href="/"><Mark /><span>ENGINEER VIEW</span></a><p>Always get an engineer’s view.</p></div>
        <div><strong>Research</strong><a href="/market-views/">Market Views</a><a href="/topics/">Topics</a><a href="/methodology/">Methodology</a></div>
        <div><strong>Institution</strong><a href="/about/">About</a><a href="https://skartech.com">Skar Technologies <ArrowUpRight size={13} aria-hidden="true" /></a></div>
        <div className="footer-note"><p>Research by Skar Technologies</p><p>© 2026 Engineer View</p></div>
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
  return <div className="site"><Header open={menuOpen} setOpen={setMenuOpen} /><main><Hero /><Research /><Evidence /><Standard /></main><Footer /></div>;
}

createRoot(document.getElementById("root")).render(<Landing />);
