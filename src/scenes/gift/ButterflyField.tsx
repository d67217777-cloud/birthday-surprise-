import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { randomBetween } from '../../lib/utils';

interface ButterflyProps {
  count?: number;
  className?: string;
}

interface ButterflyData {
  id: number;
  startX: number;
  driftX: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  glowColor: string;
  wingDur: number;
  rotateDeg: number;
}

const PALETTES = [
  { wing: '#fde047', glow: 'rgba(253, 224, 71, 0.6)' }, // Gold
  { wing: '#f472b6', glow: 'rgba(244, 114, 182, 0.6)' }, // Rose Pink
  { wing: '#38bdf8', glow: 'rgba(56, 189, 248, 0.6)' },  // Fairy Blue
  { wing: '#fb923c', glow: 'rgba(251, 146, 60, 0.6)' },  // Warm Amber
  { wing: '#e879f9', glow: 'rgba(232, 121, 249, 0.6)' }, // Lavender
];

export function ButterflyField({ count = 14, className = '' }: ButterflyProps) {
  const butterflies = useMemo<ButterflyData[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const palette = PALETTES[i % PALETTES.length];
        return {
          id: i,
          startX: randomBetween(10, 90),
          driftX: randomBetween(-70, 70),
          size: randomBetween(20, 32),
          duration: randomBetween(6, 10),
          delay: randomBetween(0, 3),
          color: palette.wing,
          glowColor: palette.glow,
          wingDur: randomBetween(0.18, 0.32),
          rotateDeg: randomBetween(-18, 18),
        };
      }),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-0"
          style={{ left: `${b.startX}%` }}
          initial={{ opacity: 0, y: 30, x: 0, rotate: b.rotateDeg }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: '-105vh',
            x: [0, b.driftX * 0.5, b.driftX],
            rotate: [b.rotateDeg, b.rotateDeg + 12, b.rotateDeg - 10],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.12, 0.85, 1],
            repeat: Infinity,
            repeatDelay: randomBetween(0.5, 2.5),
          }}
        >
          <ButterflyItem
            size={b.size}
            color={b.color}
            glowColor={b.glowColor}
            wingDur={b.wingDur}
          />
        </motion.div>
      ))}
    </div>
  );
}

function ButterflyItem({
  size,
  color,
  glowColor,
  wingDur,
}: {
  size: number;
  color: string;
  glowColor: string;
  wingDur: number;
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size * 0.85,
        perspective: '400px',
        filter: `drop-shadow(0 0 6px ${glowColor})`,
      }}
    >
      <svg
        viewBox="0 0 50 42"
        width={size}
        height={size * 0.85}
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor={color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Left Wings */}
        <motion.g
          style={{ transformOrigin: '25px 21px' }}
          animate={{ rotateY: [0, 68, 0] }}
          transition={{
            duration: wingDur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Forewing */}
          <path
            d="M25 20 C22 10, 8 2, 4 11 C0 19, 13 24, 25 22 Z"
            fill={`url(#grad-${color})`}
          />
          {/* Hindwing */}
          <path
            d="M25 21 C19 23, 9 27, 11 35 C13 41, 23 35, 25 23 Z"
            fill={`url(#grad-${color})`}
            opacity="0.85"
          />
        </motion.g>

        {/* Right Wings */}
        <motion.g
          style={{ transformOrigin: '25px 21px' }}
          animate={{ rotateY: [0, -68, 0] }}
          transition={{
            duration: wingDur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Forewing */}
          <path
            d="M25 20 C28 10, 42 2, 46 11 C50 19, 37 24, 25 22 Z"
            fill={`url(#grad-${color})`}
          />
          {/* Hindwing */}
          <path
            d="M25 21 C31 23, 41 27, 39 35 C37 41, 27 35, 25 23 Z"
            fill={`url(#grad-${color})`}
            opacity="0.85"
          />
        </motion.g>

        {/* Butterfly Body */}
        <ellipse cx="25" cy="21" rx="1.5" ry="9" fill="#1e1e24" />
        {/* Antennas */}
        <path
          d="M24 13 Q21 8 19 7 M26 13 Q29 8 31 7"
          stroke="#1e1e24"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
