import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MilkWave } from './components/MilkWave';
import { FarmerScene, STAGES } from './components/FarmerScene';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const USES_ITEMS = [
  { n: "01", title: "Coffee & lattes", text: "Silky foam, naturally sweet.", img: "/images/coffee.png", rotate: -6 },
  { n: "02", title: "Smoothies & shakes", text: "Blend it creamy, every morning.", img: "/images/shake.png", rotate: 5 },
  { n: "03", title: "Oats & cereal", text: "Creamy breakfasts, every day.", img: "/images/oats.png", rotate: -4 },
  { n: "04", title: "Desserts & baking", text: "Your new secret ingredient.", img: "/images/dessert.png", rotate: 6 }
];

const FOOTER_COLS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#home" },
      { label: "Our story", href: "#story" },
      { label: "Goodness", href: "#goodness" },
      { label: "The process", href: "#story" }
    ]
  },
  {
    title: "Enjoy",
    links: [
      { label: "Ways to enjoy", href: "#uses" },
      { label: "Buy now", href: "#cta" }
    ]
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "YouTube", href: "#" }
    ]
  }
];

export default function App() {
  const rootRef = useRef(null);
  const sceneTrackRef = useRef(null);
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const bottleRef = useRef(null);
  const coconutLeftRef = useRef(null);
  const coconutRightRef = useRef(null);
  const heroPanelRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroLabelsRef = useRef(null);
  const storyPanelRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const spotlightCopyRef = useRef(null);
  const badgeRef = useRef(null);
  const calloutsRef = useRef(null);
  const marqueeRef = useRef(null);

  const scrollProgressRef = useRef(0);
  const isVideoDoneRef = useRef(false);

  // Process section state
  const processTrackRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  // Uses hover state
  const usesListRef = useRef(null);
  const [hoveredUse, setHoveredUse] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle video playback & bottle reveal sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initially bottle is hidden while video plays the intro
    if (bottleRef.current) {
      gsap.set(bottleRef.current, { opacity: 0 });
    }

    const revealBottleLayer = () => {
      if (isVideoDoneRef.current) return;
      isVideoDoneRef.current = true;
      if (bottleRef.current && scrollProgressRef.current < 0.05) {
        // Seamlessly bring the bottle layer to opacity 1 over the video's settled bottle
        gsap.to(bottleRef.current, { opacity: 1, duration: 0.6, ease: 'power1.out' });
      }
    };

    const onTimeUpdate = () => {
      // The hero bottle reveal settles at ~5.6s - 5.8s in the video
      if (video.currentTime >= 5.6) {
        revealBottleLayer();
      }
    };

    const onEnded = () => {
      revealBottleLayer();
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    // Fallback: reveal bottle after 6s in case video is slow to buffer
    const timer = setTimeout(revealBottleLayer, 6000);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      clearTimeout(timer);
    };
  }, []);

  // GSAP Main Bottle Transition Timeline & ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mobile = window.innerWidth <= 768;

      // Initial positions setup
      gsap.set(bottleRef.current, {
        x: '0vw',
        y: '0vh',
        scale: mobile ? 0.95 : 1.0,
        rotate: -11.5,
        transformOrigin: '50% 50%'
      });

      gsap.set(storyPanelRef.current, {
        yPercent: 100
      });

      gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
        yPercent: 110,
        opacity: 0
      });

      gsap.set(spotlightCopyRef.current, {
        y: 28,
        opacity: 0
      });

      gsap.set(badgeRef.current, {
        scale: 0.5,
        opacity: 0
      });

      gsap.set(marqueeRef.current, {
        opacity: 0
      });

      if (calloutsRef.current) {
        const items = calloutsRef.current.querySelectorAll('.callout');
        items.forEach((item) => {
          gsap.set(item, { opacity: 0 });
          const line = item.querySelector('.callout-line');
          const body = item.querySelector('.callout-body');
          if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'right center' });
          if (body) gsap.set(body, { x: 20, opacity: 0 });
        });
      }

      // Master Scrubbed Timeline across the pinned scene track
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: sceneRef.current,
          pinSpacing: false,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;

            // Maintain bottle visibility during scroll, restore to video state when back at top
            if (bottleRef.current) {
              if (self.progress > 0.01) {
                gsap.set(bottleRef.current, { opacity: 1 });
              } else if (self.progress <= 0.001 && !isVideoDoneRef.current) {
                gsap.set(bottleRef.current, { opacity: 0 });
              }
            }
          }
        }
      });

      // 1. Video Container Fadeout on initial scroll (0.0 -> 0.08)
      tl.to(videoContainerRef.current, {
        opacity: 0,
        ease: 'power1.out',
        duration: 0.08
      }, 0);

      // 2. Hero Background & Copy Fadeout (0.04 -> 0.35)
      tl.to([heroPanelRef.current, heroLabelsRef.current], {
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.32
      }, 0.04);

      tl.to(heroCopyRef.current, {
        opacity: 0,
        y: '-8vh',
        ease: 'power2.inOut',
        duration: 0.32
      }, 0.04);

      // 3. Floating Coconuts drift outward and disappear (0.02 -> 0.36)
      tl.to(coconutLeftRef.current, {
        x: '-9vw',
        y: '-7vh',
        rotate: -16,
        opacity: 0,
        ease: 'power1.inOut',
        duration: 0.34
      }, 0.02);

      tl.to(coconutRightRef.current, {
        x: '9vw',
        y: '-11vh',
        rotate: 18,
        opacity: 0,
        ease: 'power1.inOut',
        duration: 0.34
      }, 0.02);

      // 4. Story Panel ("Naturally good." section) rises smoothly (0.02 -> 0.50)
      tl.to(storyPanelRef.current, {
        yPercent: 0,
        ease: 'power1.inOut',
        duration: 0.48
      }, 0.02);

      // 5. CONTINUOUS BOTTLE TRANSITION (0.02 -> 0.50)
      const destX = mobile ? '0vw' : '8vw';
      const destY = mobile ? '18vh' : '4vh';
      const destScale = mobile ? 0.64 : 0.80;

      // Smooth translation and scaling
      tl.to(bottleRef.current, {
        x: destX,
        y: destY,
        scale: destScale,
        ease: 'power2.inOut',
        duration: 0.48
      }, 0.02);

      // Rotation from -10deg tilted -> 4deg organic swing -> 0deg upright
      tl.to(bottleRef.current, {
        rotate: mobile ? -2 : 4,
        ease: 'power1.out',
        duration: 0.26
      }, 0.02);

      tl.to(bottleRef.current, {
        rotate: 0,
        ease: 'power2.out',
        duration: 0.22
      }, 0.28);

      // 6. Headline "Naturally good." reveals (0.28 -> 0.46)
      tl.to(titleLine1Ref.current, {
        yPercent: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: 0.16
      }, 0.28);

      tl.to(titleLine2Ref.current, {
        yPercent: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: 0.16
      }, 0.32);

      // 7. Subtext and button reveal (0.34 -> 0.50)
      tl.to(spotlightCopyRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        duration: 0.16
      }, 0.34);

      // 8. Circular Goodness Badge reveal (0.30 -> 0.48)
      tl.to(badgeRef.current, {
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.4)',
        duration: 0.18
      }, 0.30);

      // 9. Callouts staggered reveal on right side (0.34 -> 0.52)
      if (calloutsRef.current) {
        const items = calloutsRef.current.querySelectorAll('.callout');
        items.forEach((item, idx) => {
          const line = item.querySelector('.callout-line');
          const body = item.querySelector('.callout-body');
          const start = 0.34 + idx * 0.05;

          tl.to(item, {
            opacity: 1,
            duration: 0.12,
            ease: 'power1.out'
          }, start);

          if (line) {
            tl.to(line, {
              scaleX: 1,
              duration: 0.14,
              ease: 'power2.out'
            }, start);
          }

          if (body) {
            tl.to(body, {
              x: 0,
              opacity: 1,
              duration: 0.14,
              ease: 'power2.out'
            }, start + 0.02);
          }
        });
      }

      // 10. Watermark Marquee reveal (0.30 -> 0.50)
      tl.to(marqueeRef.current, {
        opacity: 1,
        ease: 'power2.out',
        duration: 0.18
      }, 0.30);

      // 11. Hold settled state stable while user continues scrolling (0.50 -> 1.00)
      tl.to({}, { duration: 0.50 }, 0.50);

      // 12. Process Section ScrollTrigger (Stage 0 -> 3)
      ScrollTrigger.create({
        trigger: processTrackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const stageIndex = Math.min(3, Math.max(0, Math.floor(self.progress * 4)));
          setActiveStage(stageIndex);
        }
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Handle pointer tracking for Uses hover preview
  const handleUsesPointerMove = (e) => {
    if (!usesListRef.current) return;
    const rect = usesListRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleStageClick = (idx) => {
    setActiveStage(idx);
    if (processTrackRef.current) {
      const rect = processTrackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top + (idx / 4) * rect.height;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  return (
    <div ref={rootRef} className="app-container">
      {/* Site Header */}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Cocuket home">
          <img src="/images/logo.png" alt="Cocuket" width="136" height="46" />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#story">Our story</a>
          <a href="#goodness">Goodness</a>
        </nav>
        <a className="buy-button" href="#cta">
          <span>Buy now</span>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M10 5l5 5-5 5" />
          </svg>
        </a>
      </header>

      {/* Pinned Scene Track: Hero + Continuous Bottle Transition + Naturally Good */}
      <section className="scene-track" ref={sceneTrackRef} id="home">
        <div className="scene" ref={sceneRef}>
          {/* 1. Hero Video Layer (Initial Playback with white opening, coconut break, milk splash) */}
          <div className="hero-video-container" ref={videoContainerRef}>
            <video
              ref={videoRef}
              className="hero-video"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster="/images/cocoket-hero-poster.png"
            >
              <source src="/videos/Cocoket-Hero.mp4" type="video/mp4" />
            </video>
          </div>

          {/* 2. Hero Background Panel & Composition Elements */}
          <div className="hero-panel" ref={heroPanelRef} aria-hidden="true" />

          <section className="hero-copy" ref={heroCopyRef} aria-labelledby="hero-title">
            <h1 className="hero-title" id="hero-title">
              <span>Coconut</span>
              <span>milk</span>
            </h1>
          </section>

          {/* Floating Coconut Pieces from the Hero Composition */}
          <div className="coconut coconut-left" ref={coconutLeftRef} aria-hidden="true">
            <img
              src="/images/left-piece.png"
              alt=""
              width="687"
              height="621"
            />
          </div>

          <div className="coconut coconut-right" ref={coconutRightRef} aria-hidden="true">
            <img
              src="/images/right-piece.png"
              alt=""
              width="582"
              height="570"
            />
          </div>

          {/* Hero floating labels */}
          <div className="hero-labels" ref={heroLabelsRef} aria-hidden="true">
            <div className="hero-label hero-label-1">
              <span className="hero-label-pill">
                <span className="hero-label-dot" />
                Zero preservatives
              </span>
            </div>
            <div className="hero-label hero-label-2">
              <span className="hero-label-pill">
                <span className="hero-label-dot" />
                Organic
              </span>
            </div>
            <div className="hero-scroll">
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </div>

          {/* 3. Story Panel: "Naturally good." Section with Ivory/Sand Background & Milk Waves */}
          <div className="story-panel" id="goodness" ref={storyPanelRef}>
            {/* Dynamic SVG Milk Wave at the top crest */}
            <MilkWave progressRef={scrollProgressRef} />

            {/* Left Headline & Content */}
            <div className="spotlight-copy">
              <h2 className="spotlight-title">
                <span className="mask-line" style={{ display: 'block', overflow: 'hidden' }}>
                  <span ref={titleLine1Ref} style={{ display: 'inline-block' }}>Naturally</span>
                </span>
                <span className="mask-line" style={{ display: 'block', overflow: 'hidden' }}>
                  <span ref={titleLine2Ref} style={{ display: 'inline-block' }}>
                    <em>good.</em>
                  </span>
                </span>
              </h2>

              <div ref={spotlightCopyRef}>
                <p className="spotlight-text">
                  Smooth, nourishing coconut milk made with goodness you can feel. Pour it, sip it, love it.
                </p>
                <a className="spotlight-link" href="#story">
                  Get to know us
                  <span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>

            {/* Circular Goodness Badge */}
            <div className="spotlight-badge" ref={badgeRef} aria-hidden="true">
              <svg viewBox="0 0 200 200">
                <defs>
                  <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text>
                  <textPath href="#badge-circle" textLength="486" lengthAdjust="spacing">
                    100% coconut · zero preservatives ·
                  </textPath>
                </text>
              </svg>
              <span className="badge-core">
                pure<br />goodness
              </span>
            </div>

            {/* Glowing aura under settled bottle */}
            <div className="bottle-glow" aria-hidden="true" />

            {/* Product Benefit Callouts on the Right */}
            <ul className="callouts" ref={calloutsRef} aria-label="Product Benefits">
              <li className="callout callout-1">
                <span className="callout-line" aria-hidden="true" />
                <div className="callout-body">
                  <span className="callout-num">01</span>
                  <strong>Organic</strong>
                  <span className="callout-text">From organically grown coconuts.</span>
                </div>
              </li>
              <li className="callout callout-2">
                <span className="callout-line" aria-hidden="true" />
                <div className="callout-body">
                  <span className="callout-num">02</span>
                  <strong>Low fat</strong>
                  <span className="callout-text">Light, creamy, everyday easy.</span>
                </div>
              </li>
              <li className="callout callout-3">
                <span className="callout-line" aria-hidden="true" />
                <div className="callout-body">
                  <span className="callout-num">03</span>
                  <strong>Zero preservatives</strong>
                  <span className="callout-text">Just coconut. Nothing extra.</span>
                </div>
              </li>
            </ul>

            {/* Oversized decorative typography marquee */}
            <div className="marquee" ref={marqueeRef} aria-hidden="true">
              <div className="marquee-track">
                <span>Organic · Low fat · Zero preservatives · Just coconut ·&nbsp;</span>
                <span>Organic · Low fat · Zero preservatives · Just coconut ·&nbsp;</span>
              </div>
            </div>
          </div>

          {/* 4. DEDICATED CONTINUOUS BOTTLE TRANSITION LAYER (Placed last so it stays visually in front) */}
          <div className="bottle" ref={bottleRef}>
            <div className="bottle-float">
              <img
                src="/images/bottle.png"
                alt="A bottle of Cocuket coconut milk"
                width="1022"
                height="1538"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section: "From palm to pour" */}
      <section className="process-track" id="story" ref={processTrackRef} aria-labelledby="process-title">
        <svg className="process-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="process-wave-back" d="M0,70 C180,30 360,30 540,62 C720,94 900,100 1080,72 C1260,44 1350,40 1440,52 C1500,58 1550,64 1600,66 L1600,120 L0,120 Z" />
          <path className="process-wave-front" d="M0,84 C200,56 380,58 600,80 C820,102 1000,104 1200,84 C1320,72 1390,70 1440,74 C1500,76 1550,80 1600,82 L1600,120 L0,120 Z" />
        </svg>

        <div className="process-sticky">
          <header className="process-header">
            <p className="process-eyebrow">The process</p>
            <h2 id="process-title">
              From palm <em>to pour.</em>
            </h2>
          </header>

          <div className="process-copy" aria-live="polite">
            <div key={activeStage} className="process-copy-anim">
              <span className="process-step-num" aria-hidden="true">
                {STAGES[activeStage].n}
              </span>
              <h3>{STAGES[activeStage].title}</h3>
              <p>{STAGES[activeStage].text}</p>
            </div>
          </div>

          <div className="process-stage">
            <FarmerScene active={activeStage} />
          </div>

          <div className="process-progress" aria-hidden="true">
            <span className="process-count">
              <strong>{STAGES[activeStage].n}</strong> / 0{STAGES.length}
            </span>
            <div className="process-line">
              <span
                className="process-line-fill"
                style={{
                  transform: `scaleX(${(activeStage + 1) / STAGES.length})`,
                  transition: 'transform 0.4s ease'
                }}
              />
              {STAGES.map((s, idx) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => handleStageClick(idx)}
                  className={`process-dot${idx <= activeStage ? ' is-on' : ''}`}
                  style={{ left: `${(idx / (STAGES.length - 1)) * 100}%` }}
                  aria-label={`Jump to stage ${s.title}`}
                >
                  <span className="process-dot-label">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Enjoy Section: "Made for every pour" */}
      <section className="uses" id="uses" aria-labelledby="uses-title">
        <svg className="uses-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="uses-wave-back" d="M0,62 C220,96 420,100 640,72 C860,44 1060,38 1260,62 C1340,72 1400,76 1440,74 C1500,72 1550,70 1600,70 L1600,120 L0,120 Z" />
          <path className="uses-wave-front" d="M0,80 C240,104 460,106 700,86 C940,66 1140,62 1320,80 C1380,86 1420,88 1440,88 C1500,88 1550,86 1600,86 L1600,120 L0,120 Z" />
        </svg>

        <div className="uses-inner">
          <header className="uses-header">
            <p className="uses-eyebrow">Ways to enjoy</p>
            <h2 id="uses-title">
              Made for <em>every pour.</em>
            </h2>
          </header>

          <div
            className="uses-list"
            ref={usesListRef}
            onPointerMove={handleUsesPointerMove}
            onPointerLeave={() => setHoveredUse(null)}
          >
            {USES_ITEMS.map((item, idx) => (
              <a
                key={item.n}
                href="#cta"
                className={`use-row${hoveredUse === idx ? ' is-hovered' : ''}${hoveredUse !== null && hoveredUse !== idx ? ' is-dimmed' : ''}`}
                onPointerEnter={() => setHoveredUse(idx)}
              >
                <span className="use-num">{item.n}</span>
                <span className="use-title">{item.title}</span>
                <span className="use-text">{item.text}</span>
                <span className="use-thumb" aria-hidden="true">
                  <img src={item.img} alt="" width="96" height="96" />
                </span>
                <span className="use-arrow" aria-hidden="true">↗</span>
              </a>
            ))}

            {/* Floating Image Following Cursor */}
            <div
              className="use-float"
              aria-hidden="true"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                opacity: hoveredUse !== null ? 1 : 0,
                pointerEvents: 'none'
              }}
            >
              {USES_ITEMS.map((item, idx) => (
                <img
                  key={item.n}
                  src={item.img}
                  alt=""
                  width="320"
                  height="320"
                  className={hoveredUse === idx ? 'is-shown' : ''}
                  style={{
                    transform: hoveredUse === idx ? `rotate(${item.rotate}deg)` : 'none',
                    transition: 'opacity 0.25s ease, transform 0.25s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* CTA Card Section */}
          <div className="cta-card" id="cta">
            <div className="cta-copy">
              <p className="cta-eyebrow">Just coconut. Just lovely.</p>
              <h2>
                Bring home<br />
                <em>the goodness.</em>
              </h2>
              <p className="cta-text">
                Smooth, nourishing coconut milk with zero preservatives — ready for your fridge, your coffee and everything in between.
              </p>
              <a className="cta-button" href="#home">
                <span>Buy now</span>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10h11M10 5l5 5-5 5" />
                </svg>
              </a>
            </div>

            <div className="cta-visual" aria-hidden="true">
              <div className="cta-glow" />
              <div className="cta-nut cta-nut-l">
                <img src="/images/left-piece.png" alt="" width="220" height="200" />
              </div>
              <div className="cta-nut cta-nut-r">
                <img src="/images/right-piece.png" alt="" width="200" height="195" />
              </div>
              <div className="cta-bottle">
                <img src="/images/bottle.png" alt="" width="260" height="390" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo.png" alt="Cocuket" width="145" height="49" className="footer-logo" />
            <p>Creamy, organic coconut milk with zero preservatives. Goodness, in its purest form.</p>
          </div>

          <nav className="footer-cols" aria-label="Footer">
            {FOOTER_COLS.map((col) => (
              <div key={col.title} className="footer-col">
                <p className="footer-col-title">{col.title}</p>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cocuket. All rights reserved.</span>
          <a href="#home" className="footer-top-link">Back to top ↑</a>
        </div>

        <p className="footer-wordmark" aria-hidden="true">cocuket</p>
      </footer>
    </div>
  );
}
