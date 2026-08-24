import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { randomBetween } from '../../lib/utils';

interface Firefly {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  xDrift: number;
  yDrift: number;
}

export function GiftBackground() {
  const fireflies = useMemo<Firefly[]>(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: randomBetween(5, 95),
        top: randomBetween(10, 90),
        size: randomBetween(3, 6),
        delay: randomBetween(0, 5),
        duration: randomBetween(7, 14),
        xDrift: randomBetween(-45, 45),
        yDrift: randomBetween(-50, -20),
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ background: '#050508' }}>
      {/* Deep Midnight Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0b0a12] to-[#050508]" />

      {/* Warm Golden Spotlight Glow for Gift Box */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(233,177,58,0.12), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 10%, rgba(254,240,138,0.06), transparent 50%)',
        }}
      />

      {/* Floating Glowing Fireflies */}
      {fireflies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
          }}
          animate={{
            x: [0, f.xDrift, 0],
            y: [0, f.yDrift, 0],
            opacity: [0.2, 0.95, 0.2],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span
            className="block rounded-full"
            style={{
              width: `${f.size}px`,
              height: `${f.size}px`,
              background: '#fef08a',
              boxShadow:
                '0 0 10px rgba(233,177,58,0.9), 0 0 20px rgba(233,177,58,0.4)',
            }}
          />
        </motion.div>
      ))}

      {/* Outer Dark Vignette for Cinematic Focus */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 180px 50px rgba(0,0,0,0.85)' }}
      />
    </div>
  );
}
