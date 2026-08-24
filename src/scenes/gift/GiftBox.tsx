import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

export type GiftBoxPhase = 'idle' | 'shaking' | 'untying' | 'opening' | 'open';

interface GiftBoxProps {
  phase: GiftBoxPhase;
  onTap: () => void;
}

export function GiftBox({ phase, onTap }: GiftBoxProps) {
  const isOpen = phase === 'opening' || phase === 'open';

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-10" style={{ perspective: '1000px' }}>
      {/* Background Soft Glow Aura */}
      <motion.div
        className="absolute h-48 w-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(233, 177, 58, 0.28), transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: isOpen ? [1, 1.4, 1.2] : [0.9, 1.1, 0.9],
          opacity: isOpen ? 0.9 : 0.45,
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bursting Magical Stars when Opened */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {[-45, -20, 0, 20, 45].map((angle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8],
                  x: Math.sin((angle * Math.PI) / 180) * 110,
                  y: -Math.cos((angle * Math.PI) / 180) * 110 - 20,
                }}
                transition={{
                  duration: 1.4,
                  delay: i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                }}
                className="absolute text-[#fde047]"
              >
                {i % 2 === 0 ? <Sparkles size={20} /> : <Star size={16} className="fill-[#e9b13a]" />}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Gift Box Container */}
      <div className="relative z-10 cursor-pointer flex flex-col items-center" onClick={onTap}>
        {/* Animated Box Lid */}
        <motion.div
          className="relative z-20 flex flex-col items-center"
          animate={
            phase === 'shaking'
              ? { rotate: [0, -6, 6, -4, 4, 0], x: [0, -4, 4, -3, 3, 0] }
              : isOpen
                ? { y: -85, rotateX: -30, rotateZ: 10, opacity: 0.85, scale: 1.05 }
                : { rotate: 0, x: 0, y: 0, opacity: 1 }
          }
          transition={
            phase === 'shaking'
              ? { duration: 0.5, ease: 'easeInOut' }
              : { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }
          style={{ transformOrigin: 'center bottom', marginBottom: '-4px' }}
        >
          {/* Ribbon Bow */}
          <div className="relative flex items-center justify-center -mb-2 z-10">
            {/* Left Loop */}
            <div
              className="h-6 w-9 rounded-full -rotate-25"
              style={{
                background: 'linear-gradient(135deg, #fef08a, #e9b13a, #92400e)',
                boxShadow: '0 0 10px rgba(233,177,58,0.5)',
                border: '1px solid rgba(254,240,138,0.6)',
              }}
            />
            {/* Center Knot */}
            <div
              className="h-5 w-5 rounded-full z-10 -mx-1"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #fef08a, #d97706)',
                boxShadow: '0 0 8px rgba(233,177,58,0.7)',
              }}
            />
            {/* Right Loop */}
            <div
              className="h-6 w-9 rounded-full rotate-25"
              style={{
                background: 'linear-gradient(225deg, #fef08a, #e9b13a, #92400e)',
                boxShadow: '0 0 10px rgba(233,177,58,0.5)',
                border: '1px solid rgba(254,240,138,0.6)',
              }}
            />
          </div>

          {/* Lid Cap */}
          <div
            className="relative h-9 w-44 rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #22222f 0%, #12121a 100%)',
              border: '1px solid rgba(233, 177, 58, 0.4)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.15)',
            }}
          >
            {/* Vertical Ribbon */}
            <div
              className="h-full w-7"
              style={{
                background: 'linear-gradient(90deg, #b45309, #fde047 50%, #b45309)',
                boxShadow: '0 0 10px rgba(233,177,58,0.3)',
              }}
            />
          </div>
        </motion.div>

        {/* Box Base Body */}
        <motion.div
          className="relative z-10 flex items-center justify-center overflow-hidden rounded-xl"
          animate={phase === 'shaking' ? { rotate: [0, 3, -3, 2, -2, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          whileHover={phase === 'idle' ? { scale: 1.03 } : undefined}
          whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
          style={{
            height: '135px',
            width: '160px',
            background: 'linear-gradient(180deg, #181822 0%, #0c0c12 100%)',
            border: '1px solid rgba(233, 177, 58, 0.35)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.8), 0 0 25px rgba(233,177,58,0.12)',
          }}
        >
          {/* Vertical Ribbon */}
          <div
            className="h-full w-7"
            style={{
              background: 'linear-gradient(90deg, #92400e, #fde047 50%, #92400e)',
            }}
          />

          {/* Horizontal Ribbon */}
          <div
            className="absolute left-0 right-0 h-7"
            style={{
              background: 'linear-gradient(180deg, #92400e, #fde047 50%, #92400e)',
            }}
          />

          {/* Internal Glowing Surprise Beam when opened */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="h-28 w-28 rounded-full"
              style={{
                background: 'radial-gradient(circle, #fde047, #e9b13a 50%, transparent 80%)',
                filter: 'blur(10px)',
              }}
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floor Shadow */}
      <div
        className="mt-2 h-4 w-40 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.8), transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
            }
