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
}

export function LoadingBackground() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        top: randomBetween(0, 100),
        size: randomBetween(1, 3.5),
        delay: randomBetween(0, 5),
        duration: randomBetween(4, 9),
        // Har star ki chamak alag hogi
        opacityMin: randomBetween(0.1, 0.3),
        opacityMax: randomBetween(0.6, 1),
      })),
    [],
  );

  return (
    <div 
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: '#050508' }}
    >
      {/* Deep Cinematic Ambient Glow (Nebula Effect) */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(233,177,58,0.06) 0%, transparent 70%)'
        }} 
      />

      {/* Floating Framer Motion Stars */}
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            // Bade stars ko zyada bright aur glowing banaya hai
            backgroundColor: s.size > 2.5 ? '#fde047' : '#f3d98e',
            boxShadow: s.size > 2.5 ? '0 0 10px rgba(254, 240, 138, 0.6)' : 'none',
          }}
          initial={{ opacity: s.opacityMin, scale: 1 }}
          animate={{
            opacity: [s.opacityMin, s.opacityMax, s.opacityMin],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Cinematic Edge Vignette (Dark borders for focus) */}
      <div 
        className="absolute inset-0" 
        style={{ boxShadow: 'inset 0 0 150px 40px rgba(5,5,8,0.95)' }} 
      />
    </div>
  );
}
