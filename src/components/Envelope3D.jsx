import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WEDDING_DATA } from "../data/weddingData";

export default function Envelope3D({ onOpen }) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleTriggerOpen = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    onOpen();
  };

  return (
    <motion.section
      className="magazine-stage"
      aria-label="Wedding Magazine Cover for Jeel and Dhruv"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.55, ease: "easeInOut" },
      }}
    >
      <div className="magazine-perspective">
        <div
          className={`magazine-cover ${isFlipping ? "is-turning" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Tap to open Jeel and Dhruv's wedding magazine issue"
          onClick={handleTriggerOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTriggerOpen();
            }
          }}
        >
          {/* Glossy Spine & Light Sheen */}
          <div className="magazine-spine-shadow" aria-hidden="true" />
          <div className="magazine-gloss" aria-hidden="true" />

          {/* Clean Royal Header */}
          <header className="mag-header">
            <p className="mag-shloka">{WEDDING_DATA.shloka}</p>
            <h1 className="mag-masthead-clean">SHUBH VIVAH</h1>
            <p className="mag-date-sub">SUNDAY, 24TH JANUARY 2027</p>
            <div className="mag-rule" aria-hidden="true" />
          </header>

          {/* Center Editorial Feature */}
          <div className="mag-center-feature">
            <div className="mag-halo-ring" aria-hidden="true" />
            <p className="mag-kicker">CELEBRATING THE UNION OF</p>
            <h2 className="mag-couple-headline">
              <span className="shimmer-gold">{WEDDING_DATA.couple.bride}</span>
              <span className="mag-amp">&amp;</span>
              <span className="shimmer-gold">{WEDDING_DATA.couple.groom}</span>
            </h2>
            <p className="mag-subheadline">Two Hearts • One Forever</p>
          </div>

          {/* Side Editorial Callouts */}
          <div className="mag-callouts">
            <div className="mag-callout-box">
              <span className="callout-label">HOSTED BY</span>
              <span className="callout-val">Bhuptani Family</span>
            </div>
            <div className="mag-callout-box right">
              <span className="callout-label">DESTINATION</span>
              <span className="callout-val">City Palace, Udaipur</span>
            </div>
          </div>

          {/* Bottom Magazine Footer & CTA */}
          <footer className="mag-footer">
            <div className="mag-hashtag-block">
              <span className="mag-barcode" aria-hidden="true">
                ||| || ||| | |||| ||
              </span>
              <span className="mag-hash">{WEDDING_DATA.couple.hashtag}</span>
            </div>

            <button
              type="button"
              className="mag-open-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleTriggerOpen();
              }}
            >
              <span>OPEN ISSUE</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </footer>
        </div>
      </div>
    </motion.section>
  );
}
