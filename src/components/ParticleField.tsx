import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  isBright: boolean;
}

export function ParticleField({ count = 28, className = '' }: ParticleFieldProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 5,
      driftX: (Math.random() - 0.5) * 50,
      driftY: -80 - Math.random() * 90,
      isBright: i % 3 === 0,
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.isBright
              ? 'rgba(254, 240, 138, 0.95)'
              : 'rgba(233, 177, 58, 0.75)',
            boxShadow: p.isBright
              ? '0 0 8px rgba(254, 240, 138, 0.8), 0 0 16px rgba(233, 177, 58, 0.4)'
              : '0 0 6px rgba(233, 177, 58, 0.4)',
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, p.isBright ? 0.9 : 0.65, 0],
            y: [0, p.driftY],
            x: [0, p.driftX],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
