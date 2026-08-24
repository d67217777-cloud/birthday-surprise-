import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface GlobalLoaderProps {
  visible: boolean;
}

export function GlobalLoader({ visible }: GlobalLoaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#050508' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Background Ambient Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(233, 177, 58, 0.12), transparent 50%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-7">
            {/* Premium Dual-Ring Spinner */}
            <div className="relative flex items-center justify-center h-20 w-20">
              {/* Outer Fast Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: '#e9b13a',
                  borderRightColor: 'rgba(233, 177, 58, 0.2)',
                  boxShadow: '0 0 15px rgba(233, 177, 58, 0.15)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner Slow Reverse Ring */}
              <motion.div
                className="absolute inset-2.5 rounded-full border-[1.5px] border-transparent"
                style={{
                  borderBottomColor: '#fde047',
                  borderLeftColor: 'rgba(254, 240, 138, 0.2)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center Pulsing Sparkle */}
              <motion.div
                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={20} className="text-[#fde047]" style={{ filter: 'drop-shadow(0 0 6px rgba(254,240,138,0.8))' }} />
              </motion.div>
            </div>

            {/* Typography */}
            <div className="flex flex-col items-center gap-2">
              <motion.p
                className="text-xs sm:text-sm tracking-[0.35em] text-[#e9b13a] uppercase font-medium"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ textShadow: '0 0 10px rgba(233, 177, 58, 0.3)' }}
              >
                Preparing Magic
              </motion.p>
              <p className="text-[9px] sm:text-[10px] tracking-widest text-[#c4c4cc]/50 uppercase font-light">
                Please wait a moment...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
