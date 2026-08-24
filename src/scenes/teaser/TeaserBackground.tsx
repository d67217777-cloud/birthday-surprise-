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
  driftX: number;
  driftY: number;
}

interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export function TeaserBackground() {
  const fireflies = useMemo<Firefly[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: randomBetween(5, 95),
        top: randomBetween(10, 90),
        size: randomBetween(3, 5.5),
        delay: randomBetween(0, 5),
        duration: randomBetween(7, 13),
        driftX: randomBetween(-35, 35),
        driftY: randomBetween(-40, -15),
      })),
    [],
  );

  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: randomBetween(2, 98),
        top: randomBetween(2, 98),
        size: randomBetween(1.5, 3),
        delay: randomBetween(0, 4),
        duration: randomBetween(2.5, 5),
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ background: '#050508' }}>
      {/* Deep Midnight Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#090910] to-[#050508]" />

      {/* Warm Ambient Spotlight for Center Teaser Text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(233,177,58,0.11), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 15%, rgba(254,240,138,0.05), transparent 60%)',
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
            x: [0, f.driftX, 0],
            y: [0, f.driftY, 0],
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.2, 0.8],
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
                '0 0 10px rgba(233,177,58,0.85), 0 0 18px rgba(233,177,58,0.35)',
            }}
          />
        </motion.div>
      ))}

      {/* Twinkling Star Dust */}
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: '#ffffff',
            boxShadow: '0 0 6px rgba(255,255,255,0.7)',
          }}
          animate={{
            opacity: [0.1, 0.85, 0.1],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Edge Vignette */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 180px 55px rgba(0,0,0,0.85)' }}
      />
    </div>
  );
}
