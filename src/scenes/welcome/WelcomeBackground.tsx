import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { randomBetween } from '../../lib/utils';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacityMin: number;
  opacityMax: number;
  isGolden: boolean;
}

interface GlowOrb {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
}

export function WelcomeBackground() {
  // Enhanced Magical Stars
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        top: randomBetween(0, 100),
        size: randomBetween(1, 3.5),
        delay: randomBetween(0, 5),
        duration: randomBetween(3, 8),
        opacityMin: randomBetween(0.1, 0.4),
        opacityMax: randomBetween(0.7, 1),
        isGolden: Math.random() > 0.6, // 40% stars golden honge
      })),
    [],
  );

  // Cinematic Drifting Nebula Orbs
  const orbs = useMemo<GlowOrb[]>(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: randomBetween(10, 90),
        top: randomBetween(10, 90),
        size: randomBetween(150, 350),
        delay: randomBetween(0, 5),
        duration: randomBetween(15, 25),
        driftX: randomBetween(-40, 40), // Left-right float
        driftY: randomBetween(-30, 30), // Up-down float
      })),
    [],
  );

  return (
    <div 
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: '#050508' }}
    >
      {/* Deep Space Base Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(30,25,20,0.8) 0%, rgba(5,5,8,1) 100%)'
        }}
      />

      {/* Organic Nebula Orbs (Framer Motion) */}
      {orbs.map((o) => (
        <motion.div
          key={`orb-${o.id}`}
          className="absolute rounded-full"
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            background: 'radial-gradient(circle, rgba(233,177,58,0.06) 0%, transparent 70%)',
            marginTop: `-${o.size / 2}px`,
            marginLeft: `-${o.size / 2}px`,
          }}
          animate={{
            x: [0, o.driftX, 0],
            y: [0, o.driftY, 0],
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Atmospheric Fog Layers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[60%]"
        style={{ background: 'linear-gradient(to top, rgba(15,15,22,0.8), transparent)' }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] left-0 right-0 h-[40%]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(233,177,58,0.03), transparent)' }}
        animate={{ x: ['-10%', '10%', '-10%'], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Smooth Twinkling Stars */}
      {stars.map((s) => (
        <motion.span
          key={`star-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.isGolden ? '#fde047' : '#f3d98e',
            boxShadow: s.isGolden ? '0 0 8px rgba(254, 240, 138, 0.6)' : 'none',
          }}
          initial={{ opacity: s.opacityMin }}
          animate={{
            opacity: [s.opacityMin, s.opacityMax, s.opacityMin],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Heavy Cinematic Vignette */}
      <div 
        className="absolute inset-0" 
        style={{ boxShadow: 'inset 0 0 150px 50px rgba(5,5,8,0.95)' }} 
      />
    </div>
  );
}
