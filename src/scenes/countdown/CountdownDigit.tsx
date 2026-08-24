import { motion, AnimatePresence } from 'framer-motion';

interface DigitProps {
  value: number;
  label: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function CountdownDigit({ value, label }: DigitProps) {
  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 3D Glass Morphism Container */}
      <div 
        className="relative flex h-20 w-16 sm:h-28 sm:w-24 items-center justify-center overflow-hidden rounded-xl"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 20, 28, 0.85) 0%, rgba(10, 10, 15, 0.95) 100%)',
          border: '1px solid rgba(233, 177, 58, 0.25)',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.8), inset 0 2px 15px rgba(233, 177, 58, 0.1)',
          backdropFilter: 'blur(16px)',
          perspective: '250px' // Enables 3D flip effect for the digits
        }}
      >
        {/* Subtle Top Glass Highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {/* Animated Digits */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            className="relative text-4xl sm:text-5xl font-bold tracking-tighter"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              background: 'linear-gradient(135deg, #fef08a 0%, #e9b13a 50%, #b87d1c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px rgba(233, 177, 58, 0.35))'
            }}
            initial={{ y: -30, opacity: 0, rotateX: 55, scale: 0.85, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ y: 30, opacity: 0, rotateX: -55, scale: 0.85, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {display}
          </motion.span>
        </AnimatePresence>

        {/* 3D Mechanical Split Flap Line */}
        <div className="absolute left-0 right-0 top-1/2 flex flex-col pointer-events-none z-10 opacity-70">
          <div className="h-[1.5px] bg-[#050508] shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
          <div className="h-[1px] bg-[rgba(254,240,138,0.15)]" />
        </div>
      </div>
      
      {/* Unit Label */}
      <span 
        className="font-body text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold"
        style={{ color: 'rgba(233, 177, 58, 0.7)' }}
      >
        {label}
      </span>
    </div>
  );
}
