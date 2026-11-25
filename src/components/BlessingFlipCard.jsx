import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

export default function BlessingFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.section
      className="section-block"
      aria-label="Traditional Kankotri Verse"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
    >
      <div className="section-header">
        <span className="section-eyebrow">Sacred Tradition</span>
        <h2 className="section-title">The Kankotri Patrika</h2>
        <p className="section-hint">
          Tap the card below to flip between Traditional &amp; English
        </p>
      </div>

      <div className="flip-card-scene">
        <div
          className={`flip-card ${isFlipped ? "is-flipped" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Flip Kankotri blessing card"
          onClick={() => setIsFlipped((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsFlipped((prev) => !prev);
            }
          }}
        >
          <div className="flip-face flip-front">
            <p className="flip-badge">॥ शुभ लग्न निमंत्रण ॥</p>
            <h3 className="flip-heading">स्नेहभर्युं आमंत्रण</h3>
            <p className="flip-body">
              परम कृपाळु परमात्मा नी असीम कृपा थी अने वडीलो ना आशीर्वाद थी,
              <br />
              अमारा आंगणे मंगल प्रसंग नो रुडो अवसर आव्यो छे.
              <br />
              आ शुभ प्रसंगे आपश्री ने सहपरिवार पधारवा भावभर्युं निमंत्रण छे.
            </p>
            <span className="flip-cta">
              <RotateCw size={13} aria-hidden="true" /> Tap to Read in English
            </span>
          </div>

          <div className="flip-face flip-back">
            <p className="flip-badge">WITH WARMEST REGARDS</p>
            <h3 className="flip-heading">A Celebration of Love &amp; Togetherness</h3>
            <p className="flip-body">
              By the grace of the Almighty and the blessings of our elders,
              <br />
              two families become one. Your presence, laughter, and blessings
              <br />
              will make this auspicious occasion truly unforgettable.
            </p>
            <span className="flip-cta">
              <RotateCw size={13} aria-hidden="true" /> Tap to View Traditional Verse
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
