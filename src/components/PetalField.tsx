import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { randomBetween, randomInt } from '../lib/utils';

interface PetalFieldProps {
  count?: number;
  className?: string;
}

interface PetalData {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotateStart: number;
  rotateEnd: number;
  color: string;
}

const PETAL_COLORS = [
  '#fbcfe8', // Soft Rose Pink
  '#f472b6', // Bright Petal Pink
  '#fda4af', // Blossom Peach
  '#fef08a', // Champagne Gold Petal
  '#fb7185', // Warm Coral
];

export function PetalField({ count = 18, className = '' }: PetalFieldProps) {
  const petals = useMemo<PetalData[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(2, 96),
        size: randomBetween(12, 22),
        duration: randomBetween(9, 16),
        delay: randomBetween(0, 8),
        drift: randomBetween(-70, 70),
        rotateStart: randomInt(-45, 45),
        rotateEnd: randomInt(180, 540),
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute -top-8"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.75,
            perspective: '500px',
          }}
          initial={{
            y: '-5vh',
            x: 0,
            opacity: 0,
            rotateZ: p.rotateStart,
          }}
          animate={{
            y: '108vh',
            x: [0, p.drift * 0.6, p.drift, p.drift * 0.4],
            opacity: [0, 0.85, 0.85, 0],
            rotateZ: [p.rotateStart, p.rotateEnd],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.85, 1],
          }}
        >
          {/* Sculpted Organic Petal Shape */}
          <svg
            viewBox="0 0 24 18"
            fill="none"
            className="w-full h-full"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
            }}
          >
            <path
              d="M12 0 C18 1, 24 6, 24 11 C24 16, 17 18, 12 18 C7 18, 0 16, 0 11 C0 6, 6 1, 12 0 Z"
              fill={p.color}
              opacity={0.82}
            />
            {/* Subtle Inner Vein Highlight */}
            <path
              d="M12 2 Q12 9 12 16"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
