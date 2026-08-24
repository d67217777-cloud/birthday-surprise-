import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { GoldButton } from '../../components';
import { GiftBox, type GiftBoxPhase } from '../../components/GiftBox/GiftBox';
import { GiftBackground } from './GiftBackground';
import { ButterflyField } from '../../components/ButterflyField/ButterflyField';

const EASE = [0.16, 1, 0.3, 1] as const;

export function GiftScene({ isActive: _isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const [phase, setPhase] = useState<GiftBoxPhase>('idle');
  const [navigating, setNavigating] = useState(false);
  const managerRef = useRef(manager);
  managerRef.current = manager;

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('shaking');
    setTimeout(() => {
      setPhase('opening');
      setTimeout(() => setPhase('open'), 700);
    }, 500);
  }, [phase]);

  const handleContinue = useCallback(() => {
    if (navigating) return;
    setNavigating(true);
    setTimeout(() => managerRef.current?.next(), 800);
  }, [navigating]);

  const isOpen = phase === 'open' || phase === 'opening';

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-8 text-center">
      {/* Dynamic Midnight & Firefly Background */}
      <GiftBackground />

      {/* Magical Butterflies Flying upon Opening */}
      {isOpen && <ButterflyField count={16} />}

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6">
        {/* Top Header Tag */}
        <motion.div
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 bg-[#e9b13a]/10 border border-[#e9b13a]/25 text-[#f3d98e]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Sparkles size={14} className="text-[#e9b13a]" />
          <span className="text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">A Gift For You</span>
        </motion.div>

        {/* 3D Interactive Gift Box */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="my-2"
        >
          <GiftBox phase={phase} onTap={handleOpen} />
        </motion.div>

        {/* Action / Message Reveal */}
        <AnimatePresence mode="wait">
          {phase === 'idle' ? (
            <motion.p
              key="tap-hint"
              className="text-lg sm:text-xl italic text-[#e6e6ea]"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Tap the box to open your surprise ✨
            </motion.p>
          ) : phase === 'open' ? (
            <motion.div
              key="message"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p
                className="max-w-md text-xl sm:text-2xl italic font-medium text-[#fde047]"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  textShadow: '0 0 20px rgba(233,177,58,0.4)',
                }}
              >
                Before the main celebration begins, a few precious glimpses await...
              </p>

              <GoldButton
                variant="solid"
                onClick={handleContinue}
                className="px-10 py-3.5 text-base sm:text-lg flex items-center gap-2 shadow-[0_0_25px_rgba(233,177,58,0.35)]"
              >
                <span>Continue Journey</span>
                <ArrowRight size={20} />
              </GoldButton>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Scene Navigation Transition Curtain */}
      <AnimatePresence>
        {navigating && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 bg-[#050508]" />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(233,177,58,0.08), transparent 60%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
