import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Hls from "hls.js";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const VIDEO_SOURCE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4";

const navigation = [
  { label: "Market views", href: "market-views.html" },
  { label: "Topics", href: "topics.html" },
  { label: "Methodology", href: "methodology.html" },
  { label: "About", href: "about.html" },
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
      preload="auto"
      aria-hidden="true"
      onLoadedData={onReady}
    />
  );
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
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
          Latest view <ArrowUpRight size={15} strokeWidth={1.8} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
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
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className="mobile-menu"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mobile-menu-inner">
            {navigation.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -12 }}
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

function LatestView() {
  return (
    <motion.aside
      className="latest-view"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="latest-view-topline">
        <span>Latest market view</span>
        <span>EV004</span>
      </div>
      <a href="transformer-critical-path.html">
        <span>
          Transformer
          <br />
          critical path
        </span>
        <ArrowUpRight size={22} strokeWidth={1.45} />
      </a>
      <p>
        Power delivery is becoming a binding constraint on data-center and
        industrial growth.
      </p>
      <div className="latest-view-meta">
        <span>Power systems</span>
        <span>Source-linked</span>
      </div>
    </motion.aside>
  );
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.9;

  return (
    <main className={`landing ${videoReady ? "video-ready" : ""}`}>
      <VideoBackground muted={muted} onReady={() => setVideoReady(true)} />
      <div className="video-wash" aria-hidden="true" />
      <div className="frame-lines" aria-hidden="true" />

      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} close={() => setMenuOpen(false)} />

      <section className="hero" aria-labelledby="hero-title">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="eyebrow">
            <span aria-hidden="true" />
            Market intelligence for physical systems
          </p>
          <h1 id="hero-title">
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
              Read the latest view <ArrowRight size={18} strokeWidth={1.6} />
            </a>
            <a className="text-action" href="market-views.html">
              Explore all research
            </a>
          </div>
        </motion.div>

        <LatestView />
      </section>

      <div className="utility-rail">
        <span>{videoReady ? "Field signal / active" : "Loading field signal"}</span>
        <button
          type="button"
          className="sound-button"
          aria-label={muted ? "Turn background video sound on" : "Mute background video"}
          onClick={() => setMuted((value) => !value)}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      <p className="edition">ENGINEER VIEW / AUGUST 2026</p>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<Landing />);
