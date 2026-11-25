class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.intervalId = null;
    this.isPlaying = false;
  }

  start() {
    if (this.isPlaying) return true;
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;

      if (!this.ctx) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.08;
        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
      const playChime = () => {
        if (!this.isPlaying || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const freq = notes[Math.floor(Math.random() * notes.length)];

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(
          0.35,
          this.ctx.currentTime + 0.35
        );
        noteGain.gain.exponentialRampToValueAtTime(
          0.001,
          this.ctx.currentTime + 2.8
        );

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 2.9);
      };

      this.isPlaying = true;
      playChime();
      this.intervalId = setInterval(playChime, 1800);
      return true;
    } catch {
      return false;
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const ambientAudio = new AmbientAudioEngine();
