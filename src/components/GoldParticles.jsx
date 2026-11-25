import { useEffect, useRef } from "react";

const PARTICLE_COLORS = [
  "212, 180, 117", // Antique gold
  "245, 226, 184", // Soft champagne
  "148, 178, 240", // Royal sapphire mist
];

export default function GoldParticles({ burstTrigger }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (burst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 1.8 + Math.random() * 5.2 : 0.18 + Math.random() * 0.42;
      const color =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      return {
        x: burst ? canvas.width / 2 : Math.random() * canvas.width,
        y: burst ? canvas.height / 2 : Math.random() * canvas.height,
        vx: burst ? Math.cos(angle) * speed : (Math.random() - 0.5) * 0.28,
        vy: burst ? Math.sin(angle) * speed - 1.4 : -0.18 - Math.random() * 0.38,
        radius: burst ? 1.6 + Math.random() * 3.0 : 0.8 + Math.random() * 1.9,
        alpha: burst ? 1 : 0.22 + Math.random() * 0.52,
        decay: burst ? 0.014 : 0,
        color,
        burst,
      };
    };

    particlesRef.current = Array.from({ length: 56 }, () =>
      createParticle(false)
    );

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.burst) {
          p.vy += 0.05;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            list.splice(i, 1);
            continue;
          }
        } else {
          if (p.y < -10) p.y = canvas.height + 10;
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, p.alpha)})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!burstTrigger || !canvasRef.current) return;
    const canvas = canvasRef.current;
    for (let i = 0; i < 54; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 5.2;
      const color =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      particlesRef.current.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.3,
        radius: 1.6 + Math.random() * 3.0,
        alpha: 1,
        decay: 0.014,
        color,
        burst: true,
      });
    }
  }, [burstTrigger]);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
}
