// Warm Romantic Harp Arpeggio & Soft String Pad + Optional Custom MP3 (/wedding-music.mp3)
const CHORD_PROGRESSION = [
  // Cmaj9 -> Am9 -> Fmaj7 -> G6
  [261.63, 329.63, 392.0, 493.88, 587.33],
  [220.0, 261.63, 329.63, 392.0, 493.88],
  [174.61, 220.0, 261.63, 329.63, 392.0],
  [196.0, 246.94, 293.66, 329.63, 392.0],
];

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.audioEl = null;
    this.usingMp3 = false;
    this.chordIndex = 0;
    this.arpIndex = 0;
    this.timer = null;
    this.isPlaying = false;
  }

  _playWarmPad(chord) {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    chord.slice(0, 3).forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * 0.5, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.9);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.7);
    });
  }

  _playHarpPluck(freq) {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 1.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  _tick() {
    if (!this.isPlaying) return;
    const chord = CHORD_PROGRESSION[this.chordIndex % CHORD_PROGRESSION.length];

    if (this.arpIndex === 0) {
      this._playWarmPad(chord);
    }

    const noteFreq = chord[this.arpIndex % chord.length];
    this._playHarpPluck(noteFreq);

    this.arpIndex += 1;
    if (this.arpIndex >= chord.length) {
      this.arpIndex = 0;
      this.chordIndex += 1;
    }

    this.timer = setTimeout(() => this._tick(), 620);
  }

  start() {
    if (this.isPlaying) return true;
    try {
      // If user placed public/wedding-music.mp3, play that real track
      if (!this.audioEl) {
        const audio = new Audio("/wedding-music.mp3");
        audio.loop = true;
        audio.volume = 0.45;
        this.audioEl = audio;
      }

      this.isPlaying = true;
      this.audioEl
        .play()
        .then(() => {
          this.usingMp3 = true;
        })
        .catch(() => {
          this.usingMp3 = false;
          this._startSynth();
        });

      return true;
    } catch {
      return this._startSynth();
    }
  }

  _startSynth() {
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;

      if (!this.ctx) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      this.isPlaying = true;
      this.chordIndex = 0;
      this.arpIndex = 0;
      this._tick();
      return true;
    } catch {
      return false;
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.audioEl && this.usingMp3) {
      this.audioEl.pause();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const ambientAudio = new AmbientAudioEngine();
