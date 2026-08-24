import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { ParticleField, GoldButton } from '../../components';

const EASE = [0.16, 1, 0.3, 1] as const;

export function WelcomeScene({ isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: '#050508' }}
    >
      {/* Deep Cinematic Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at 50% 45%, rgba(233,177,58,0.12), transparent 70%)' 
        }} 
      />
      
      {/* Floating Gold Dust */}
      <ParticleField count={35} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        {/* Pulsing Sparkle Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles 
              className="text-[#fde047]" 
              size={36} 
              style={{ filter: 'drop-shadow(0 0 12px rgba(254,240,138,0.6))' }} 
            />
          </motion.div>
        </motion.div>

        {/* Subtitle / Eyebrow */}
        <motion.p 
          className="text-xs sm:text-sm tracking-[0.4em] text-[#e9b13a]/80 uppercase font-medium mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
        >
          Welcome
        </motion.p>

        {/* Main Grand Title */}
        <motion.h1 
          className="text-5xl sm:text-7xl font-bold leading-tight"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            background: 'linear-gradient(135deg, #fef08a 0%, #e9b13a 50%, #b87d1c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(233,177,58,0.2)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: EASE }}
        >
          A Surprise<br />Awaits You
        </motion.h1>

        {/* Emotional Description */}
        <motion.p
          className="text-lg sm:text-xl italic text-[#c4c4cc] leading-relaxed mt-2 px-2"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
        >
          Someone has prepared something truly special for you.<br className="hidden sm:block" /> 
          Take a moment. Breathe it in. Let the journey begin.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
          className="mt-8"
        >
          <GoldButton 
            variant="solid" 
            onClick={() => manager?.next()} 
            className="px-10 py-4 text-base sm:text-lg"
          >
            <span>Begin the Journey</span>
            <ArrowRight size={20} />
          </GoldButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
