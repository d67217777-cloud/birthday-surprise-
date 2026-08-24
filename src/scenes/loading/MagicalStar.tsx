import { motion } from 'framer-motion';

interface MagicalStarProps {
  intensity: number;
  dissolving: boolean;
}

export function MagicalStar({ intensity, dissolving }: MagicalStarProps) {
  // Intensity ke hisaab se core scale aur glow calculate karna
  const baseScale = 0.8 + intensity * 0.45;
  const glowOpacity = 0.4 + intensity * 0.6;

  return (
    <motion.div
      className="relative flex items-center justify-center pointer-events-none"
      // Dissolve hone par pehle flash karega, fir vanish hoga
      animate={
        dissolving
          ? { scale: [baseScale, baseScale * 1.6, 0], opacity: [1, 1, 0], rotate: 180 }
          : { scale: baseScale, opacity: 1, rotate: 0 }
      }
      transition={
        dissolving
          ? { duration: 1.2, times: [0, 0.3, 1], ease: 'easeInOut' }
          : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {/* Continuous Rotation & Breathing Effect */}
      <motion.div
        animate={!dissolving ? { rotate: 360, scale: [1, 1.08, 1] } : {}}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <defs>
            {/* Ambient Background Glow */}
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(254,240,138,0.9)" />
              <stop offset="35%" stopColor="rgba(233,177,58,0.6)" />
              <stop offset="70%" stopColor="rgba(184,125,28,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            
            {/* Core Golden Gradient */}
            <linearGradient id="starCore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#e9b13a" />
            </linearGradient>
          </defs>

          {/* Glowing Halo */}
          <circle cx="50" cy="50" r="46" fill="url(#starGlow)" opacity={glowOpacity} />

          {/* Primary 4-Pointed Flare */}
          <path
            d="M50 10 C50 38, 62 50, 90 50 C62 50, 50 62, 50 90 C50 62, 38 50, 10 50 C38 50, 50 38, 50 10 Z"
            fill="url(#starCore)"
            style={{ filter: 'drop-shadow(0 0 12px rgba(254,240,138,0.8))' }}
          />
          
          {/* Inner Diagonal Core Sparkle */}
          <path
            d="M50 25 C50 42, 58 50, 75 50 C58 50, 50 58, 50 75 C50 58, 42 50, 25 50 C42 50, 50 42, 50 25 Z"
            fill="#ffffff"
            opacity="0.9"
            transform="rotate(45 50 50)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
