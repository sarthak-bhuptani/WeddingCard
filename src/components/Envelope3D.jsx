import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
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
        <circle cx="14" cy="32" r="7" fill="none" stroke="#4d3107" strokeWidth="1.2" />
        <circle cx="14" cy="32" r="2.2" fill="#4d3107" />
        <path
          d="M6,16 L22,16 M6,48 L22,48"
          stroke="#593a09"
          strokeWidth="1.2"
        />
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
  const mountRef = useRef(null);
  const warpRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isUnrolling, setIsUnrolling] = useState(false);
  const [tilt, setTilt] = useState({ rx: 4, ry: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4D Z-axis drifting golden dust & soft petals
    const count = 300;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(0xd4b475),
      new THREE.Color(0xf5e2b8),
      new THREE.Color(0xc98a63),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const isWarping = warpRef.current;

      const speed = isWarping ? 11 : 0.75;
      const posAttr = geo.attributes.position;
      for (let i = 0; i < count; i++) {
        let z = posAttr.getZ(i) + dt * speed;
        if (z > 8) z = -12;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;

      if (isWarping) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.2, 0.035);
      } else {
        camera.position.x = THREE.MathUtils.lerp(
          camera.position.x,
          pointerRef.current.x * 0.55,
          0.04
        );
        camera.position.y = THREE.MathUtils.lerp(
          camera.position.y,
          -pointerRef.current.y * 0.4,
          0.04
        );
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handlePointerMove = (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    pointerRef.current = { x: nx * 2, y: ny * 2 };
    if (!isUnrolling) {
      setTilt({ rx: 4 - ny * 16, ry: nx * 20 });
    }
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
    if (!isUnrolling) setTilt({ rx: 4, ry: 0 });
  };

  const handleTriggerOpen = () => {
    if (isUnrolling) return;
    setIsUnrolling(true);
    setTilt({ rx: 0, ry: 0 });
    warpRef.current = true;
    onOpen();
  };

  return (
    <motion.section
      className="scroll-stage"
      aria-label="Royal Wedding Scroll for Jeel and Dhruv"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.06,
        transition: { duration: 0.85, ease: "easeInOut" },
      }}
    >
      {/* 4D Z-Axis Depth Particles */}
      <div ref={mountRef} className="scroll-4d-canvas" aria-hidden="true" />

      {/* 3D Tilted Orbiting Gold Halo behind Scroll */}
      <div className="scroll-3d-halo" aria-hidden="true" />

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

      {/* 3D Perspective Royal Parchment Scroll */}
      <div className="scroll-3d-perspective">
        <div
          className={`royal-scroll-assembly ${isUnrolling ? "is-unrolling" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Tap to unroll Jeel and Dhruv's wedding scroll"
          style={{
            transform: isUnrolling
              ? "rotateX(0deg) rotateY(0deg) translateZ(75px) scale(1.06)"
              : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          }}
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
