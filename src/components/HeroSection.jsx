import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
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
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="royal-hero-card">
        {/* Top Sacred Mandala Watermark */}
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
              r="64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle
              cx="110"
              cy="0"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
            />
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

        <motion.p className="hero-ganesh-en" {...fadeUp(0.1)}>
          SHRI GANESHAYA NAMAH
        </motion.p>

        <motion.p className="hero-family-invite" {...fadeUp(0.2)}>
          <span className="parents-highlight">
            {WEDDING_DATA.parents.brideParents}
          </span>
          <br />
          cordially invite you to the wedding of their daughter
        </motion.p>

        <motion.h1 className="hero-stacked-names" {...fadeUp(0.3)}>
          <span className="script-name">{WEDDING_DATA.couple.bride}</span>
          <span className="script-amp">&amp;</span>
          <span className="script-name">{WEDDING_DATA.couple.groom}</span>
        </motion.h1>

        <motion.p className="hero-groom-parents" {...fadeUp(0.4)}>
          Son of {WEDDING_DATA.parents.groomParents}
        </motion.p>

        {/* Minimalist Gold Divider */}
        <motion.div
          className="hero-gold-divider"
          aria-hidden="true"
          {...fadeUp(0.45)}
        >
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
        </motion.div>

        {/* Architectural Save-The-Date Showcase */}
        <motion.div className="save-date-showcase" {...fadeUp(0.55)}>
          <span className="save-date-kicker">
            <Calendar size={13} aria-hidden="true" />
            <span>SAVE THE DATE</span>
          </span>

          <div className="date-triptych">
            <span className="date-side">SUNDAY</span>
            <span className="date-day-num">24</span>
            <span className="date-side">JAN 2027</span>
          </div>

          <div className="date-venue-line">
            <MapPin size={14} aria-hidden="true" />
            <span>{WEDDING_DATA.city}</span>
          </div>
        </motion.div>

        {/* Animated Countdown */}
        <motion.div
          className="countdown-grid"
          aria-label="Wedding Countdown"
          {...fadeUp(0.65)}
        >
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Mins", value: countdown.mins },
            { label: "Secs", value: countdown.secs },
          ].map((item) => (
            <motion.div
              className="count-box"
              key={item.label}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <span className="count-num">{item.value}</span>
              <span className="count-label">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Artistic Gold-Foil & Watercolor Dulha-Dulhan Drawing */}
        <motion.div
          className="hero-illustration-wrap"
          {...fadeUp(0.75)}
        >
          <img
            src="/royal-couple.jpg"
            alt="Hand-drawn Dulha and Dulhan wedding illustration"
            className="hero-illustration-img"
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
