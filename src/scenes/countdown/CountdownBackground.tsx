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

export function CountdownBackground() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        top: randomBetween(0, 100),
        size: randomBetween(1, 3.5),
        delay: randomBetween(0, 5),
        duration: randomBetween(4, 9),
        opacityMin: randomBetween(0.1, 0.4),
        opacityMax: randomBetween(0.6, 1),
        isGolden: Math.random() > 0.6, // Kuch stars ko special golden aura denge
      })),
    [],
  );

  return (
    <div 
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: '#050508' }}
    >
      {/* Deep Night Sky Base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(20,20,30,0.6) 0%, rgba(5,5,8,1) 100%)'
        }}
      />

      {/* Cinematic Drifting Fog (Framer Motion) */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: '30%',
          height: '45%',
          background: 'linear-gradient(to right, transparent, rgba(233,177,58,0.05), transparent)',
        }}
        animate={{ 
          x: ['-20%', '20%', '-20%'], 
          opacity: [0.3, 0.7, 0.3] 
        }}
        transition={{ 
          duration: 28, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      />

      {/* Ambient Center Spotlight for Digits */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(233,177,58,0.08) 0%, transparent 65%)'
        }}
      />

      {/* Animated Twinkling Stars */}
      {stars.map((s) => (
        <motion.span
          key={`star-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.isGolden ? '#fde047' : '#e6e6ea',
            boxShadow: s.isGolden ? '0 0 8px rgba(254, 240, 138, 0.5)' : 'none',
          }}
          initial={{ opacity: s.opacityMin }}
          animate={{
            opacity: [s.opacityMin, s.opacityMax, s.opacityMin],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Heavy Cinematic Edge Vignette */}
      <div 
        className="absolute inset-0" 
        style={{ boxShadow: 'inset 0 0 180px 60px rgba(5,5,8,0.95)' }} 
      />
    </div>
  );
}
