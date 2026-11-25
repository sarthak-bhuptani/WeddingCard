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

export default function HeroSection() {
  const [countdown, setCountdown] = useState(() =>
    getTimeRemaining(WEDDING_DATA.dateISO)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeRemaining(WEDDING_DATA.dateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      className="hero-section"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="royal-hero-card">
        {/* Top Sacred Mandala Watermark */}
        <div className="hero-top-mandala" aria-hidden="true">
          <svg viewBox="0 0 220 110" className="top-mandala-svg">
            <circle cx="110" cy="0" r="84" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
            <circle cx="110" cy="0" r="64" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="110" cy="0" r="42" fill="none" stroke="currentColor" strokeWidth="0.9" />
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse
                key={i}
                cx="110"
                cy="56"
                rx="7"
                ry="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                transform={`rotate(${(i - 5.5) * 16} 110 0)`}
              />
            ))}
          </svg>
        </div>

        <p className="hero-ganesh-en">SHRI GANESHAYA NAMAH</p>

        <p className="hero-family-invite">
          Together with {WEDDING_DATA.parents.brideParents},
          <br />
          invite you to the wedding of
        </p>

        <h1 className="hero-stacked-names">
          <span className="script-name">{WEDDING_DATA.couple.bride}</span>
          <span className="script-amp">&amp;</span>
          <span className="script-name">{WEDDING_DATA.couple.groom}</span>
        </h1>

        <p className="hero-groom-parents">
          Son of {WEDDING_DATA.parents.groomParents}
        </p>

        {/* Minimalist Gold Divider */}
        <div className="hero-gold-divider" aria-hidden="true">
          <span className="div-line" />
          <svg viewBox="0 0 40 16" className="div-crest">
            <path
              d="M2,8 Q10,16 20,8 Q30,16 38,8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="20" cy="8" r="2.2" fill="currentColor" />
          </svg>
          <span className="div-line" />
        </div>

        <div className="hero-date-pill">
          <span>{WEDDING_DATA.displayDate}</span>
          <span className="dot-sep">•</span>
          <span>{WEDDING_DATA.city}</span>
        </div>

        <div className="countdown-grid" aria-label="Wedding Countdown">
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Mins", value: countdown.mins },
            { label: "Secs", value: countdown.secs },
          ].map((item) => (
            <div className="count-box" key={item.label}>
              <span className="count-num">{item.value}</span>
              <span className="count-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Royal Couple & Procession Illustration */}
        <div className="hero-illustration-wrap">
          <img
            src="/royal-couple.jpg"
            alt="Traditional Indian wedding couple celebration"
            className="hero-illustration-img"
          />
        </div>
      </div>
    </motion.header>
  );
}
