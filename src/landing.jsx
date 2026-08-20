import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Hls from "hls.js";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  Search,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const VIDEO_SOURCE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4";

const navigation = [
  { label: "Latest", href: "#latest" },
  { label: "Market views", href: "market-views.html" },
  { label: "Topics", href: "#topics" },
  { label: "Methodology", href: "methodology.html" },
  { label: "About", href: "about.html" },
];

const reports = [
  {
    code: "EV–004",
    format: "Infrastructure Brief",
    title: "The transformer is now part of the critical path.",
    description:
      "Why equipment, specifications, production capacity, and utility acceptance now belong in time-to-power analysis.",
    href: "transformer-critical-path.html",
    topics: ["Energy", "Industrial"],
    edition: "August 2026",
  },
  {
    code: "MV–001",
    format: "Market View",
    title: "Three signals. One systems test.",
    description:
      "Private credit, AI infrastructure, and public-market valuation examined through the structures beneath the headline.",
    href: "market-views-august-2026.html",
    topics: ["Capital", "Energy", "Technology"],
    edition: "August 2026",
  },
  {
    code: "EV–001",
    format: "Engineering Outlook",
    title: "The grid was designed for yesterday’s load.",
    description:
      "Data-center electricity demand, regional constraints, and a scenario-led framework for time-to-power.",
    href: "grid-load-growth.html",
    topics: ["Energy"],
    edition: "Research series",
  },
  {
    code: "EV–002",
    format: "Research Note",
    title: "The enterprise AI gap is organizational.",
    description:
      "What current Census data says about firm size, functional breadth, and the capacity to deploy AI.",
    href: "ai-diffusion.html",
    topics: ["Technology"],
    edition: "Research series",
  },
  {
    code: "EV–003",
    format: "Field Guide",
    title: "Before the digital factory.",
    description:
      "A maturity model for industrial teams moving from fragmented data to governed, adaptive operations.",
    href: "industrial-readiness.html",
    topics: ["Industrial", "Technology"],
    edition: "Research series",
  },
];

const signals = [
  {
    value: "1.9%",
    label: "Forecast U.S. electricity-load growth in 2026",
    type: "Forecast",
    source: "U.S. Energy Information Administration · March 2026",
    href: "https://www.eia.gov/todayinenergy/detail.php?id=67344",
  },
  {
    value: "4.4%",
    label: "Estimated share of U.S. electricity used by data centers in 2023",
    type: "Historical estimate",
    source: "U.S. Department of Energy / LBNL · December 2024",
    href: "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers",
  },
  {
    value: "+41%",
    label: "Reported change in distribution-transformer demand since 2019",
    type: "Reported change",
    source: "U.S. Department of Energy · March 2026",
    href: "https://www.energy.gov/oe/distribution-transformer-webinar-text-alternative",
  },
  {
    value: "17–20%",
    label: "Range of U.S. businesses reporting AI use, Dec. 2025–May 2026",
    type: "Survey range",
    source: "U.S. Census Bureau · May 2026",
    href: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
  },
];

const topics = [
  {
    number: "01",
    name: "Power & infrastructure",
    description:
      "Load growth, grid constraints, equipment supply, time-to-power, and the physical path from forecast to energized capacity.",
  },
  {
    number: "02",
    name: "AI & technology",
    description:
      "Compute infrastructure, enterprise adoption, workflow design, and the organizational conditions required for deployment.",
  },
  {
    number: "03",
    name: "Industrial systems",
    description:
      "Manufacturing readiness, operational data, supply chains, and the engineering systems behind productive capacity.",
  },
  {
    number: "04",
    name: "Capital & markets",
    description:
      "How financing structures, expectations, and price interact with physical capacity, timing, and operating reality.",
  },
];

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function VideoBackground({ muted, onReady }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let hls;
    const isHls = VIDEO_SOURCE.toLowerCase().includes(".m3u8");

    if (isHls && video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SOURCE;
    } else if (isHls && Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(VIDEO_SOURCE);
      hls.attachMedia(video);
    } else {
      video.src = VIDEO_SOURCE;
    }

    const attemptPlayback = () => video.play().catch(() => undefined);
    video.addEventListener("canplay", attemptPlayback, { once: true });
    attemptPlayback();

    return () => {
      video.removeEventListener("canplay", attemptPlayback);
      hls?.destroy();
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      poster="assets/engineer-view-hero-4k.jpg"
      autoPlay
      muted={muted}
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onLoadedData={onReady}
    />
  );
}

function UtilityBar() {
  return (
    <div className="utility-bar">
      <div className="shell utility-bar-inner">
        <span>Engineer View · Market intelligence</span>
        <a href="https://skartech.com">
          A Skar Technologies company <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="index.html" aria-label="Engineer View home">
          <Mark />
          <span>ENGINEER VIEW</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href="transformer-critical-path.html">
            Read EV–004 <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, close }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") close();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className="mobile-menu"
          aria-label="Mobile navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mobile-menu-inner shell">
            {navigation.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={close}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index + 0.08 }}
              >
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function Hero({ muted, setMuted, videoReady, setVideoReady }) {
  const reduceMotion = useReducedMotion();
  return (
    <section className={`hero ${videoReady ? "video-ready" : ""}`}>
      <VideoBackground muted={muted} onReady={() => setVideoReady(true)} />
      <div className="video-wash" aria-hidden="true" />
      <div className="hero-rule" aria-hidden="true" />

      <div className="shell hero-inner">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: 0.12 }}
        >
          <p className="eyebrow">
            <span aria-hidden="true" />
            Market intelligence for physical systems
          </p>
          <h1>
            See the system
            <br />
            before the market
            <br />
            <em>prices it.</em>
          </h1>
          <p className="hero-lede">
            Independent, source-linked research on power, AI infrastructure,
            industrial capacity, and the constraints shaping capital deployment.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="transformer-critical-path.html">
              Read the latest view <ArrowRight size={17} />
            </a>
            <a className="text-action" href="#library">
              Browse the research library
            </a>
          </div>
        </motion.div>

        <motion.aside
          className="hero-latest"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.52 }}
        >
          <div className="hero-latest-topline">
            <span>Latest research</span>
            <span>EV–004</span>
          </div>
          <p className="hero-latest-format">Infrastructure Brief · August 2026</p>
          <a href="transformer-critical-path.html">
            The transformer is now part of the critical path.
            <ArrowUpRight size={25} />
          </a>
          <p>
            Equipment, specifications, capacity, and utility acceptance now belong
            in time-to-power analysis.
          </p>
          <div className="hero-latest-meta">
            <span>Power systems</span>
            <span>Source-linked</span>
          </div>
        </motion.aside>
      </div>

      <div className="shell hero-utility">
        <a href="#latest">
          Latest research <ArrowDown size={15} />
        </a>
        <button
          type="button"
          className="sound-button"
          aria-label={muted ? "Turn background video sound on" : "Mute background video"}
          onClick={() => setMuted((value) => !value)}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          <span>{muted ? "Sound off" : "Sound on"}</span>
        </button>
      </div>
    </section>
  );
}

function ResearchRibbon() {
  const items = [
    {
      eyebrow: "Featured publication",
      title: "Transformer critical path",
      detail: "EV–004 · August 2026",
      href: "transformer-critical-path.html",
    },
    {
      eyebrow: "Current edition",
      title: "Three signals. One systems test.",
      detail: "MV–001 · Market View",
      href: "market-views-august-2026.html",
    },
    {
      eyebrow: "Research standard",
      title: "Evidence before interpretation",
      detail: "Methodology & disclosures",
      href: "methodology.html",
    },
  ];

  return (
    <section className="research-ribbon" aria-label="Research entry points">
      <div className="shell research-ribbon-grid">
        {items.map((item) => (
          <a href={item.href} key={item.title}>
            <div>
              <small>{item.eyebrow}</small>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
            <ArrowUpRight size={19} />
          </a>
        ))}
      </div>
    </section>
  );
}

function LatestResearch() {
  return (
    <section className="section latest-section" id="latest">
      <div className="shell">
        <Reveal className="section-heading">
          <div>
            <p className="section-kicker">Latest research</p>
            <h2>The systems beneath the signal.</h2>
          </div>
          <p>
            Analysis organized around the decision, the operating constraint, and
            the evidence—not simply the headline.
          </p>
        </Reveal>

        <div className="latest-grid">
          <Reveal className="feature-report">
            <a className="feature-media" href="transformer-critical-path.html">
              <img
                src="assets/transformer-supply-4k.jpg"
                alt="Copper windings and steel cores on a transformer assembly line"
                width="3840"
                height="2880"
                loading="lazy"
              />
              <span>EV / 004</span>
            </a>
            <div className="feature-copy">
              <p className="report-meta">Infrastructure Brief · August 2026</p>
              <h3>
                <a href="transformer-critical-path.html">
                  The transformer is now part of the critical path.
                </a>
              </h3>
              <p>
                Why equipment, specifications, production capacity, and utility
                acceptance now belong in time-to-power analysis.
              </p>
              <div className="report-footer">
                <div><span>Energy</span><span>Infrastructure</span></div>
                <a href="transformer-critical-path.html">
                  Read the brief <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="latest-list">
            {reports.slice(1, 4).map((report, index) => (
              <Reveal key={report.code} delay={index * 0.07}>
                <article>
                  <div className="report-index">
                    <span>{report.code}</span>
                    <small>{report.format}</small>
                  </div>
                  <h3><a href={report.href}>{report.title}</a></h3>
                  <p>{report.description}</p>
                  <a className="row-link" href={report.href} aria-label={`Read ${report.title}`}>
                    <ArrowUpRight size={19} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalBoard() {
  return (
    <section className="signal-board" id="signals">
      <div className="shell">
        <Reveal className="signal-heading">
          <div>
            <p className="section-kicker light">Current field signals</p>
            <h2>Evidence in view.</h2>
          </div>
          <p>
            Observed, estimated, forecast, and survey measures are labeled as such.
            Source scope and dates are retained.
          </p>
        </Reveal>

        <div className="signal-grid">
          {signals.map((signal, index) => (
            <Reveal className="signal-card" key={signal.label} delay={index * 0.06}>
              <span className="signal-type">{signal.type}</span>
              <strong>{signal.value}</strong>
              <p>{signal.label}</p>
              <a href={signal.href} target="_blank" rel="noopener noreferrer">
                {signal.source} <ArrowUpRight size={14} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchLibrary() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filters = ["All", "Energy", "Industrial", "Technology", "Capital"];

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesFilter = filter === "All" || report.topics.includes(filter);
      const searchable = [
        report.code,
        report.format,
        report.title,
        report.description,
        ...report.topics,
      ].join(" ").toLowerCase();
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [filter, query]);

  return (
    <section className="section library-section" id="library">
      <div className="shell">
        <Reveal className="section-heading library-heading">
          <div>
            <p className="section-kicker">Research library</p>
            <h2>Browse every current view.</h2>
          </div>
          <a href="market-views.html">
            Open the Market Views index <ArrowUpRight size={17} />
          </a>
        </Reveal>

        <div className="library-toolbar">
          <div className="filter-group" aria-label="Filter research by topic">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? "active" : ""}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search research</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles, topics, or systems"
            />
          </label>
        </div>

        <div className="report-table" aria-live="polite">
          {filteredReports.map((report) => (
            <article key={report.code}>
              <div className="report-code">
                <strong>{report.code}</strong>
                <span>{report.edition}</span>
              </div>
              <div className="report-summary">
                <p className="report-meta">{report.format}</p>
                <h3><a href={report.href}>{report.title}</a></h3>
                <p>{report.description}</p>
                <ul>
                  {report.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </div>
              <a className="report-open" href={report.href} aria-label={`Open ${report.title}`}>
                <ArrowUpRight size={22} />
              </a>
            </article>
          ))}
          {filteredReports.length === 0 && (
            <p className="empty-state">No current research matches this search.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function TopicSection() {
  return (
    <section className="section topics-section" id="topics">
      <div className="shell">
        <Reveal className="section-heading">
          <div>
            <p className="section-kicker">Topics in focus</p>
            <h2>Four systems. One analytical discipline.</h2>
          </div>
          <p>
            Coverage follows the systems where engineering realities and market
            expectations most directly meet.
          </p>
        </Reveal>

        <div className="topic-grid">
          {topics.map((topic, index) => (
            <Reveal key={topic.name} delay={index * 0.06}>
              <article>
                <span>{topic.number}</span>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <a href="topics.html">
                  Explore topic <ArrowRight size={15} />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologyBand() {
  const steps = [
    ["Define", "Make the system and decision boundary explicit."],
    ["Locate", "Find the constraint that governs timing or value."],
    ["Test", "Separate evidence, estimates, scenarios, and inference."],
    ["Translate", "Show what changes the decision and what remains unresolved."],
  ];

  return (
    <section className="methodology-band">
      <div className="shell methodology-grid">
        <Reveal className="methodology-intro">
          <p className="section-kicker light">The Engineer View lens</p>
          <h2>Evidence before assumption.</h2>
          <p>
            Every view follows a visible chain from source evidence to system
            interpretation and decision consequence.
          </p>
          <a href="methodology.html">
            Read the research standard <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <div className="methodology-steps">
          {steps.map(([title, description], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <a className="brand light" href="index.html">
            <Mark />
            <span>ENGINEER VIEW</span>
          </a>
          <p>Always get an engineer’s view.</p>
        </div>
        <div>
          <strong>Research</strong>
          <a href="market-views.html">Market Views</a>
          <a href="#library">Research library</a>
          <a href="topics.html">Topics</a>
        </div>
        <div>
          <strong>Standards</strong>
          <a href="methodology.html">Methodology</a>
          <a href="about.html">About</a>
          <a href="https://skartech.com">Skar Technologies ↗</a>
        </div>
        <div className="footer-note">
          <p>New York</p>
          <p>Independent analysis</p>
          <p>© 2026 Engineer View</p>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className="site">
      <UtilityBar />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} close={() => setMenuOpen(false)} />
      <main>
        <Hero
          muted={muted}
          setMuted={setMuted}
          videoReady={videoReady}
          setVideoReady={setVideoReady}
        />
        <ResearchRibbon />
        <LatestResearch />
        <SignalBoard />
        <ResearchLibrary />
        <TopicSection />
        <MethodologyBand />
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Landing />);
