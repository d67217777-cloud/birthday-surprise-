import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { ParticleField } from '../../components';

const EASE = [0.16, 1, 0.3, 1] as const;

export function LoadingScene({ isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const managerRef = useRef(manager);
  managerRef.current = manager;

  useEffect(() => {
    if (!isActive) return;
    // Thoda sa time badhaya hai taaki animation feel ho sake (2800ms)
    const t = setTimeout(() => managerRef.current?.next(), 2800);
    return () => clearTimeout(t);
  }, [isActive]);

  return (
    <div 
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{ background: '#050508' }}
    >
      {/* Background Ambient Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(233,177,58,0.15), transparent 65%)' 
        }} 
      />

      {/* Floating Particles in Background */}
      <ParticleField count={25} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ 
          opacity: isActive ? 1 : 0, 
          scale: isActive ? 1 : 0.95, 
          y: isActive ? 0 : -15 
        }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {/* Premium Dual-Ring Magic Loader */}
        <div className="relative flex items-center justify-center h-24 w-24">
          {/* Outer Fast Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-[2px] border-transparent"
            style={{
              borderTopColor: '#e9b13a',
              borderRightColor: 'rgba(233, 177, 58, 0.2)',
              boxShadow: '0 0 20px rgba(233, 177, 58, 0.2)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Inner Slow Reverse Ring */}
          <motion.div
            className="absolute inset-3 rounded-full border-[1.5px] border-transparent"
            style={{
              borderBottomColor: '#fde047',
              borderLeftColor: 'rgba(254, 240, 138, 0.2)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center Pulsing Sparkle */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles 
              size={26} 
              className="text-[#fde047]" 
              style={{ filter: 'drop-shadow(0 0 8px rgba(254,240,138,0.8))' }} 
            />
          </motion.div>
        </div>

        {/* Typography */}
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <motion.p
            className="text-xl sm:text-2xl italic leading-relaxed"
            style={{ 
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: '#e9b13a',
              textShadow: '0 2px 15px rgba(233, 177, 58, 0.4)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Preparing something special...
          </motion.p>
          <motion.p
            className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#c4c4cc]/60 uppercase font-medium"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: EASE }}
          >
            Unlocking Memories
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
