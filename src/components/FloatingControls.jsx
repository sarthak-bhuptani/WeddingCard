import { RotateCcw, Volume2, VolumeX } from "lucide-react";

export default function FloatingControls({
  isMusicPlaying,
  onToggleMusic,
  showReplay,
  onReplay,
}) {
  return (
    <div className="floating-controls">
      <button
        type="button"
        className={`control-btn ${isMusicPlaying ? "playing" : ""}`}
        onClick={onToggleMusic}
        aria-label="Toggle ambient music"
      >
        {isMusicPlaying ? (
          <Volume2 size={15} aria-hidden="true" />
        ) : (
          <VolumeX size={15} aria-hidden="true" />
        )}
        <span>{isMusicPlaying ? "Music On" : "Music Off"}</span>
      </button>

      {showReplay && (
        <button
          type="button"
          className="control-btn"
          onClick={onReplay}
          aria-label="Replay 3D card opening"
        >
          <RotateCcw size={14} aria-hidden="true" />
          <span>Replay Card</span>
        </button>
      )}
    </div>
  );
}
