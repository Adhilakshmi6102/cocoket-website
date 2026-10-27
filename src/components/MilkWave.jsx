import React, { useEffect, useRef } from 'react';

const clamp01 = (t) => Math.min(1, Math.max(0, t));

const WAVE_CONFIG = [
  { base: 110, amp: 85, f1: 2.2, f2: 3.9, s1: 0.9, s2: -0.55, phase: 0, fill: "rgb(255 255 255 / 55%)" },
  { base: 190, amp: 72, f1: 1.7, f2: 3.1, s1: -0.7, s2: 0.8, phase: 2.1, fill: "rgb(236 246 251 / 92%)" },
  { base: 270, amp: 62, f1: 1.3, f2: 2.6, s1: 0.6, s2: -0.9, phase: 4.2, fill: "#fbf8f0" }
];

function buildWavePath(cfg, time, progress, ampMultiplier) {
  const step = 2 * Math.PI / 1440;
  let d = "";
  for (let x = 0; x <= 1440; x += 12) {
    const y = cfg.base + cfg.amp * ampMultiplier * (
      0.65 * Math.sin(x * step * cfg.f1 + time * cfg.s1 + cfg.phase + 9 * progress) +
      0.35 * Math.sin(x * step * cfg.f2 + time * cfg.s2 - 6 * progress)
    );
    d += `${x === 0 ? "M" : "L"}${x},${y.toFixed(1)}`;
  }
  return d;
}

const buildFillPath = (d) => `${d}L1440,404L0,404Z`;

export function MilkWave({ progressRef }) {
  const fillRefs = useRef([]);
  const crestRefs = useRef([]);

  useEffect(() => {
    let animId = 0;
    const start = performance.now();

    const loop = (now) => {
      const p = progressRef ? progressRef.current : 0;
      const h = clamp01(p / 0.7);
      const ampMultiplier = 0.45 + 0.75 * Math.sin(Math.PI * h);
      const elapsed = (now - start) / 1000;

      WAVE_CONFIG.forEach((cfg, idx) => {
        const crestD = buildWavePath(cfg, elapsed, p, ampMultiplier);
        const fillD = buildFillPath(crestD);

        if (fillRefs.current[idx]) {
          fillRefs.current[idx].setAttribute("d", fillD);
        }
        if (crestRefs.current[idx]) {
          crestRefs.current[idx].setAttribute("d", crestD);
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [progressRef]);

  return (
    <svg className="milk-wave" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
      {WAVE_CONFIG.map((cfg, idx) => (
        <g key={idx}>
          <path
            ref={(el) => { fillRefs.current[idx] = el; }}
            fill={cfg.fill}
            d={buildFillPath(buildWavePath(cfg, 0, 0, 1))}
          />
          <path
            className="milk-crest"
            ref={(el) => { crestRefs.current[idx] = el; }}
            d={buildWavePath(cfg, 0, 0, 1)}
          />
        </g>
      ))}
    </svg>
  );
}
