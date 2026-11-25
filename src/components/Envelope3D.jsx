import { useState } from "react";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "../data/weddingData";

function CornerFiligree({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`velvet-corner ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4,4 C34,4 54,18 62,40 C42,36 28,46 26,64 C14,48 4,32 4,4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M10,4 C50,4 78,24 94,58 M4,10 C4,50 24,78 58,94"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <path
        d="M18,18 Q42,14 48,36 Q26,38 18,18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.85"
      />
    </svg>
  );
}

function OrnateKalashCap({ side }) {
  return (
    <div className={`kalash-cap kalash-${side}`} aria-hidden="true">
      <svg viewBox="0 0 56 64" className="kalash-svg">
        <defs>
          <linearGradient id={`kalashGrad-${side}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8e3a8" />
            <stop offset="45%" stopColor="#c7953b" />
            <stop offset="100%" stopColor="#5e3e0c" />
          </linearGradient>
        </defs>
        {/* Ornate barrel collar */}
        <rect
          x="2"
          y="6"
          width="24"
          height="52"
          rx="4"
          fill={`url(#kalashGrad-${side})`}
          stroke="#432a06"
          strokeWidth="1"
        />
        {/* Carved floral motif on collar */}
        <circle cx="14" cy="32" r="7" fill="none" stroke="#4d3107" strokeWidth="1.2" />
        <circle cx="14" cy="32" r="2.2" fill="#4d3107" />
        <path
          d="M6,16 L22,16 M6,48 L22,48"
          stroke="#593a09"
          strokeWidth="1.2"
        />
        {/* Stepped dome & finial tip */}
        <path
          d="M26,12 C36,14 42,22 44,32 C42,42 36,50 26,52 Z"
          fill={`url(#kalashGrad-${side})`}
          stroke="#432a06"
          strokeWidth="1"
        />
        <circle
          cx="49"
          cy="32"
          r="5"
          fill={`url(#kalashGrad-${side})`}
          stroke="#432a06"
          strokeWidth="0.9"
        />
      </svg>
    </div>
  );
}

export default function Envelope3D({ onOpen }) {
  const [isUnrolling, setIsUnrolling] = useState(false);

  const handleTriggerOpen = () => {
    if (isUnrolling) return;
    setIsUnrolling(true);
    onOpen();
  };

  return (
    <motion.section
      className="scroll-stage"
      aria-label="Royal Wedding Scroll for Jeel and Dhruv"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.85, ease: "easeInOut" },
      }}
    >
      {/* Subtle Gold Filigree Corner Flourishes */}
      <CornerFiligree className="corner-tl" />
      <CornerFiligree className="corner-tr" />
      <CornerFiligree className="corner-bl" />
      <CornerFiligree className="corner-br" />

      {/* Clean Serif Couple Title */}
      <motion.h1
        className="scroll-couple-top"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        {WEDDING_DATA.couple.bride} &amp; {WEDDING_DATA.couple.groom}
      </motion.h1>

      {/* Realistic Rolled Parchment Scroll */}
      <div
        className={`royal-scroll-assembly ${isUnrolling ? "is-unrolling" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Tap to unroll Jeel and Dhruv's wedding scroll"
        onClick={handleTriggerOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTriggerOpen();
          }
        }}
      >
        {/* Top Rolled Parchment Cylinder */}
        <div className="scroll-top-roll" aria-hidden="true" />

        {/* Unrolling Parchment Sheet */}
        <div className="scroll-parchment-body">
          <div className="parchment-inner-border">
            <span className="parchment-tag">SHAHI NIMANTRAN</span>
            <h2 className="parchment-names">
              {WEDDING_DATA.couple.bride} &amp; {WEDDING_DATA.couple.groom}
            </h2>
            <div className="parchment-divider" aria-hidden="true" />
            <p className="parchment-verse">
              Cordially invite you to celebrate their sacred union
            </p>
            <p className="parchment-date">{WEDDING_DATA.displayDate}</p>
          </div>
        </div>

        {/* Bottom Main Parchment Roll + Ornate Gold Kalash End-Caps */}
        <div className="scroll-bottom-unit">
          <OrnateKalashCap side="left" />
          <div className="scroll-bottom-roll" />
          <OrnateKalashCap side="right" />
        </div>

        {/* Twisted Crimson & Gold Silk Cord + Hanging Tassel */}
        <div className="silk-tie-wrap" aria-hidden="true">
          <div className="twisted-cord-loop" />
          <div className="twisted-cord-wraps">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="silk-tassel">
            <span className="tassel-bead" />
            <span className="tassel-cap" />
            <span className="tassel-threads" />
          </div>
        </div>
      </div>

      {/* Minimalist Tap to Unroll Footer */}
      <motion.button
        type="button"
        className={`scroll-tap-prompt ${isUnrolling ? "is-hidden" : ""}`}
        onClick={handleTriggerOpen}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.2 }}
      >
        <span>TAP TO UNROLL</span>
        <span className="tap-underline" aria-hidden="true">
          <i />
        </span>
      </motion.button>
    </motion.section>
  );
}
