import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "../data/weddingData";

function getTimeRemaining(targetISO) {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
  return {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    mins: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
    secs: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  const [countdown, setCountdown] = useState(() =>
    getTimeRemaining(WEDDING_DATA.dateISO)
  );
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeRemaining(WEDDING_DATA.dateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 7, ry: x * 9 });
  };

  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.header
      className="hero-section full-screen-hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* 3D Depth Stage */}
      <div
        className="hero-3d-stage"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {/* Slowly Rotating 3D Golden Orbit Halo behind Names */}
        <div className="hero-3d-halo" aria-hidden="true" />

        {/* Top Sacred Mandala */}
        <div className="hero-top-mandala" aria-hidden="true">
          <svg viewBox="0 0 220 110" className="top-mandala-svg">
            <circle
              cx="110"
              cy="0"
              r="84"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <circle
              cx="110"
              cy="0"
              r="62"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse
                key={i}
                cx="110"
                cy="54"
                rx="6.5"
                ry="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                transform={`rotate(${(i - 5.5) * 16} 110 0)`}
              />
            ))}
          </svg>
        </div>

        <motion.p className="hero-ganesh-en" {...fadeUp(0.1)}>
          SHRI GANESHAYA NAMAH
        </motion.p>

        <motion.p className="hero-family-invite" {...fadeUp(0.2)}>
          <span className="parents-highlight">
            {WEDDING_DATA.parents.brideParents}
          </span>
          <br />
          cordially invite you to the wedding of
        </motion.p>

        {/* Elevated 3D Layer Couple Names */}
        <motion.h1
          className="hero-stacked-names hero-layer-front"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="script-name shimmer-gold">
            {WEDDING_DATA.couple.bride}
          </span>
          <span className="script-amp">&amp;</span>
          <span className="script-name shimmer-gold">
            {WEDDING_DATA.couple.groom}
          </span>
        </motion.h1>

        <motion.p className="hero-groom-parents" {...fadeUp(0.4)}>
          S/o {WEDDING_DATA.parents.groomParents}
        </motion.p>

        {/* Minimal Gold Divider */}
        <motion.div
          className="hero-gold-divider"
          aria-hidden="true"
          {...fadeUp(0.48)}
        >
          <span className="div-line" />
          <i className="div-diamond" />
          <span className="div-line" />
        </motion.div>

        {/* Clean Minimal Date & Venue */}
        <motion.div className="minimal-date-block" {...fadeUp(0.56)}>
          <p className="minimal-date-main">{WEDDING_DATA.displayDate}</p>
          <p className="minimal-venue-sub">{WEDDING_DATA.city}</p>
        </motion.div>

        {/* Sleek 3D-Lifted Inline Countdown Strip */}
        <motion.div
          className="minimal-countdown-strip hero-layer-mid"
          aria-label="Wedding Countdown"
          {...fadeUp(0.66)}
        >
          {[
            { label: "Days", value: countdown.days },
            { label: "Hrs", value: countdown.hours },
            { label: "Min", value: countdown.mins },
            { label: "Sec", value: countdown.secs },
          ].map((item) => (
            <div className="strip-unit" key={item.label}>
              <span className="strip-num">{item.value}</span>
              <span className="strip-lbl">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Transparent Engraved Gold Kalash & Lotus Crest (Zero Box!) */}
        <motion.div
          className="hero-kalash-crest"
          aria-hidden="true"
          {...fadeUp(0.76)}
        >
          <svg viewBox="0 0 280 120" className="kalash-crest-svg">
            <defs>
              <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9c7228" />
                <stop offset="50%" stopColor="#f5e2b8" />
                <stop offset="100%" stopColor="#9c7228" />
              </linearGradient>
            </defs>
            {/* Ornamental Floral Swirl Base */}
            <motion.path
              d="M20,96 Q80,68 140,96 Q200,68 260,96"
              fill="none"
              stroke="url(#crestGold)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <path
              d="M50,104 Q95,86 140,104 Q185,86 230,104"
              fill="none"
              stroke="url(#crestGold)"
              strokeWidth="0.9"
              opacity="0.55"
            />
            {/* Sacred Mangal Kalash */}
            <path
              d="M124,54 C116,66 118,86 140,88 C162,86 164,66 156,54 Z"
              fill="rgba(212, 180, 117, 0.1)"
              stroke="url(#crestGold)"
              strokeWidth="1.4"
            />
            <path
              d="M126,54 Q140,48 154,54"
              fill="none"
              stroke="url(#crestGold)"
              strokeWidth="1.3"
            />
            {/* Coconut & Mango Leaves */}
            <ellipse
              cx="140"
              cy="43"
              rx="9"
              ry="11"
              fill="rgba(212, 180, 117, 0.14)"
              stroke="url(#crestGold)"
              strokeWidth="1.2"
            />
            <path
              d="M132,48 Q116,38 112,48 Q122,52 132,50 M148,48 Q164,38 168,48 Q158,52 148,50"
              fill="none"
              stroke="url(#crestGold)"
              strokeWidth="1.15"
            />
            {/* Lotus Petals flanking Kalash */}
            <path
              d="M116,84 Q96,70 86,84 Q102,90 116,84 Z M164,84 Q184,70 194,84 Q178,90 164,84 Z"
              fill="rgba(212, 180, 117, 0.08)"
              stroke="url(#crestGold)"
              strokeWidth="1.1"
            />
          </svg>
        </motion.div>
      </div>
    </motion.header>
  );
}
