import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { WEDDING_DATA } from "../data/weddingData";

function BotanicalSpray({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 260"
      className={`embossed-floral ${className}`}
      aria-hidden="true"
    >
      {/* Delicate embossed stem */}
      <path
        d="M60,248 C58,195 64,142 56,88 C52,58 58,34 62,16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Fine outlined & lightly filled leaves */}
      {[
        "M59,212 C42,202 35,190 40,182 C49,185 56,197 59,212 Z",
        "M60,192 C76,182 83,170 78,162 C69,165 63,177 60,192 Z",
        "M58,152 C40,141 32,128 37,119 C47,123 55,136 58,152 Z",
        "M59,130 C78,119 85,106 80,97 C70,101 62,114 59,130 Z",
        "M57,90 C42,79 37,68 42,60 C50,64 55,76 57,90 Z",
        "M58,68 C73,57 78,46 73,38 C65,42 60,54 58,68 Z",
      ].map((d, idx) => (
        <path
          key={idx}
          d={d}
          fill="rgba(255,255,255,0.45)"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.55"
        />
      ))}
      {/* Delicate embossed blossoms */}
      {[
        { cx: 45, cy: 164, r: 8 },
        { cx: 74, cy: 138, r: 9 },
        { cx: 46, cy: 102, r: 7.5 },
        { cx: 61, cy: 26, r: 6.5 },
      ].map((fl, i) => (
        <g key={i} transform={`translate(${fl.cx}, ${fl.cy})`}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy={-fl.r * 0.62}
              rx={fl.r * 0.38}
              ry={fl.r * 0.56}
              transform={`rotate(${deg})`}
              fill="rgba(255,255,255,0.5)"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.6"
            />
          ))}
          <circle cx="0" cy="0" r={fl.r * 0.22} fill="currentColor" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

export default function Envelope3D({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleTriggerOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpen();
  };

  return (
    <motion.section
      className="stationery-stage"
      aria-label="Wedding Invitation Envelope for Jeel and Dhruv"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.9, ease: "easeInOut" },
      }}
    >
      <div className="stationery-perspective">
        <div
          className={`stationery-envelope ${isOpening ? "is-open" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Tap wax seal to open Jeel and Dhruv's wedding invitation"
          onClick={handleTriggerOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTriggerOpen();
            }
          }}
        >
          {/* Envelope Paper Base */}
          <div className="paper-base" />

          {/* Inner Kankotri Card that rises slowly */}
          <div className="inner-invite-card">
            <div className="inner-card-frame">
              <p className="inner-shloka">{WEDDING_DATA.shloka}</p>
              <span className="inner-tag">SHUBH VIVAH</span>
              <h2 className="inner-names">
                {WEDDING_DATA.couple.bride} &amp; {WEDDING_DATA.couple.groom}
              </h2>
              <p className="inner-date">Sunday, 24th January 2027 • Udaipur</p>
            </div>
          </div>

          {/* Left & Right Flaps wrapped so drop-shadow is NOT clipped */}
          <div className="flap-shadow-wrap flap-shadow-left">
            <div className="flap-side flap-left">
              <BotanicalSpray className="spray-left" />
            </div>
          </div>
          <div className="flap-shadow-wrap flap-shadow-right">
            <div className="flap-side flap-right">
              <BotanicalSpray className="spray-right" />
            </div>
          </div>

          {/* Bottom Flap with realistic crease shadow */}
          <div className="flap-shadow-wrap flap-shadow-bottom">
            <div className="flap-bottom">
              <BotanicalSpray className="spray-bottom-l" />
              <BotanicalSpray className="spray-bottom-r" />
            </div>
          </div>

          {/* Top 3D Unfolding Flap with realistic crease shadow */}
          <div className="flap-top">
            <div className="flap-shadow-wrap flap-shadow-top">
              <div className="flap-top-outer">
                <BotanicalSpray className="spray-top-l" />
                <BotanicalSpray className="spray-top-r" />
              </div>
            </div>
            <div className="flap-top-inner" />
          </div>

          {/* Refined Circular Burgundy Wax Seal with Gold J&D */}
          <div className="burgundy-wax-seal">
            <svg viewBox="0 0 120 120" className="wax-blob-svg" aria-hidden="true">
              <defs>
                <radialGradient id="waxGrad" cx="32%" cy="28%" r="74%">
                  <stop offset="0%" stopColor="#a61e2f" />
                  <stop offset="50%" stopColor="#6b0d19" />
                  <stop offset="100%" stopColor="#38040b" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="60" r="54" fill="url(#waxGrad)" />
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#2b0207"
                strokeWidth="3"
                opacity="0.55"
              />
              <circle
                cx="60"
                cy="60"
                r="41"
                fill="none"
                stroke="#dfb368"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
            <span className="wax-monogram">
              {WEDDING_DATA.couple.bride[0]}
              <em>&amp;</em>
              {WEDDING_DATA.couple.groom[0]}
            </span>
          </div>

          {/* Always-visible Tap to Open Prompt directly below the seal */}
          <div className="tap-to-open-label">
            <ChevronUp size={15} strokeWidth={1.6} aria-hidden="true" />
            <span>TAP TO OPEN</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
