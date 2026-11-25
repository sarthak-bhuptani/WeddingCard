import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WEDDING_DATA } from "./data/weddingData";
import { ambientAudio } from "./utils/audio";
import GoldParticles from "./components/GoldParticles";
import Envelope3D from "./components/Envelope3D";
import HeroSection from "./components/HeroSection";
import BlessingFlipCard from "./components/BlessingFlipCard";
import EventsSection from "./components/EventsSection";
import FloatingControls from "./components/FloatingControls";

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  const handleOpenEnvelope = () => {
    const started = ambientAudio.start();
    if (started) setIsMusicPlaying(true);
    setBurstCount((c) => c + 1);

    setTimeout(() => {
      setIsOpened(true);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 1350);
  };

  const handleSkipIntro = () => {
    const started = ambientAudio.start();
    if (started) setIsMusicPlaying(true);
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleReplay = () => {
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      ambientAudio.stop();
      setIsMusicPlaying(false);
    } else {
      const started = ambientAudio.start();
      if (started) setIsMusicPlaying(true);
    }
  };

  return (
    <>
      <GoldParticles burstTrigger={burstCount} />

      <FloatingControls
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        showReplay={isOpened}
        onReplay={handleReplay}
      />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <Envelope3D
            key="envelope-stage"
            onOpen={handleOpenEnvelope}
            onSkip={handleSkipIntro}
          />
        ) : (
          <main key="invite-content" className="invite-content">
            <HeroSection />
            <BlessingFlipCard />
            <EventsSection />

            <footer className="site-footer">
              <p className="footer-monogram">{WEDDING_DATA.couple.initials}</p>
              <p className="footer-note">
                Crafted with love for {WEDDING_DATA.couple.bride} &amp;{" "}
                {WEDDING_DATA.couple.groom} • 24.01.2027
              </p>
            </footer>
          </main>
        )}
      </AnimatePresence>
    </>
  );
}
