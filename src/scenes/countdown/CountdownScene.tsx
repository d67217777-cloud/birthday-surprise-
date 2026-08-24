import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext, useCountdown, useDevMode } from '../../hooks';
import { GoldButton } from '../../components';
import { siteConfig } from '../../config/site';
import Lightning from '../../components/effects/Lightning/Lightning';
import { CountdownBackground } from './CountdownBackground';
import { CountdownDigit } from './CountdownDigit';

const EASE = [0.16, 1, 0.3, 1] as const;

export function CountdownScene({ isActive: _isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const managerRef = useRef(manager);
  managerRef.current = manager;

  const devMode = useDevMode();
  const simulated = devMode?.birthdaySimulated ?? false;
  const { days, hours, minutes, seconds, isComplete: realIsComplete } = useCountdown(siteConfig.birthday);
  const isComplete = realIsComplete || simulated;

  const [unlocked, setUnlocked] = useState(isComplete);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    if (isComplete) setUnlocked(true);
  }, [isComplete]);

  const handleContinue = useCallback(() => {
    if (navigating) return;
    setNavigating(true);
    setTimeout(() => managerRef.current?.next(), 800);
  }, [navigating]);

  // Auto-continue ONLY when the real countdown reaches zero.
  useEffect(() => {
    if (!realIsComplete || navigating) return;
    const t = setTimeout(() => handleContinue(), 1800);
    return () => clearTimeout(t);
  }, [realIsComplete, navigating, handleContinue]);

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: '#050508' }}
    >
      <CountdownBackground />

      {/* React Bits Lightning — animated background layer */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-80">
        <Lightning hue={40} xOffset={0.8} speed={0.7} intensity={1.9} size={1.9} />
      </div>

      {/* Cinematic Spotlight & Edge Vignette */}
      <div 
        className="pointer-events-none absolute inset-0 z-[2]" 
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.95) 90%)' 
        }} 
      />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="countdown"
            className="relative z-10 flex flex-col items-center gap-7 sm:gap-9 max-w-3xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {/* Header Section */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles 
                  className="text-[#fde047]" 
                  size={26} 
                  style={{ filter: 'drop-shadow(0 0 10px rgba(254,240,138,0.6))' }} 
                />
              </motion.div>
              <p className="text-xs sm:text-sm tracking-[0.4em] text-[#e9b13a]/80 uppercase font-medium">
                The Countdown
              </p>
            </div>

            {/* Main Title */}
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                background: 'linear-gradient(135deg, #fef08a 0%, #e9b13a 50%, #b87d1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 5px 20px rgba(233,177,58,0.25)'
              }}
            >
              Something beautiful is on its way
            </h2>

            {/* Timer Digits */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              {units.map((u) => (
                <CountdownDigit key={u.label} value={u.value} label={u.label} />
              ))}
            </motion.div>

            {/* Footer Text */}
            <motion.p 
              className="text-lg sm:text-xl italic text-[#c4c4cc] mt-2"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
            >
              Every second brings us closer to the celebration.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            className="relative z-10 flex flex-col items-center gap-8 max-w-2xl"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ 
              opacity: navigating ? 0 : 1, 
              scale: navigating ? 0.95 : 1,
              filter: navigating ? 'blur(10px)' : 'blur(0px)' 
            }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            {/* Grand Unlocked Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }} // Bouncy premium ease
            >
              <Sparkles 
                className="text-[#fde047]" 
                size={48} 
                style={{ filter: 'drop-shadow(0 0 20px rgba(254,240,138,0.8))' }} 
              />
            </motion.div>

            <h2 
              className="text-5xl sm:text-6xl font-bold leading-tight"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                background: 'linear-gradient(135deg, #fef08a 0%, #e9b13a 50%, #b87d1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 10px 30px rgba(233,177,58,0.3)'
              }}
            >
              The moment is here!
            </h2>

            <p 
              className="text-xl sm:text-2xl italic text-[#e6e6ea]"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              The wait is over. Your special journey begins now.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="mt-4"
            >
              <GoldButton variant="solid" onClick={handleContinue} className="px-10 py-4 text-base sm:text-lg">
                <span>Continue Journey</span>
                <ArrowRight size={20} />
              </GoldButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Fade Out Curtain */}
      <AnimatePresence>
        {navigating && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 bg-[#050508]" />
            <div 
              className="absolute inset-0" 
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(233,177,58,0.08), transparent 60%)' }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
