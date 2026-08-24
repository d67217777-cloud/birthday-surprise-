import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Sparkles, Heart } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { randomBetween } from '../../lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

interface GoldMote {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

export function MemoryAlbumScene({ isActive: _isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const managerRef = useRef(manager);
  managerRef.current = manager;

  const motes = useMemo<GoldMote[]>(
    () =>
      Array.from({ length: 28 }, () => ({
        left: randomBetween(0, 100),
        top: randomBetween(10, 90),
        size: randomBetween(2, 5),
        delay: randomBetween(0, 5),
        duration: randomBetween(8, 16),
        drift: randomBetween(-30, 30),
      })),
    [],
  );

  const handleReplay = () => managerRef.current?.goTo('welcome');
  const handleStart = () => managerRef.current?.goTo('loading');

  return (
    <motion.div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: EASE }}
    >
      {/* Deep Midnight Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a10] to-[#050508]" />
      
      {/* Radial Gold Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(233,177,58,0.1), transparent 70%)',
        }}
      />

      {/* Floating Gold Motes / Particles */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {motes.map((m, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              background: 'rgba(245,217,142,0.85)',
              boxShadow: '0 0 8px rgba(245,217,142,0.7)',
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, m.drift, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: m.duration,
              delay: m.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Edge Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.75)' }}
      />

      {/* Card Content */}
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-3xl p-6 sm:p-10 text-center backdrop-blur-md"
        initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
        style={{
          background:
            'linear-gradient(145deg, rgba(245,233,198,0.06), rgba(13,13,18,0.85))',
          border: '1px solid rgba(233,177,58,0.25)',
          boxShadow: '0 0 50px rgba(233,177,58,0.1), 0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top Floating Heart Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: 'rgba(233,177,58,0.12)',
            border: '1px solid rgba(233,177,58,0.3)',
          }}
        >
          <Sparkles size={22} className="text-[#e9b13a]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-semibold tracking-wide"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#e9b13a',
            textShadow: '0 0 24px rgba(233,177,58,0.4)',
          }}
        >
          Thank You
        </motion.h1>

        {/* Message */}
        <motion.p
          className="mt-5 text-base sm:text-lg leading-relaxed text-[#e6e6ea]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          Thank you for taking this beautiful journey.
          <br />
          I hope this little surprise brought a bright smile to your face today.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="mx-auto my-6 h-px w-24"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(233,177,58,0.6), transparent)',
          }}
        />

        {/* Birthday Wish Line */}
        <motion.p
          className="text-xl sm:text-2xl italic text-[#f3d98e]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.4, ease: EASE }}
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          Happy Birthday Once Again! ✨
        </motion.p>

        {/* Sign-off */}
        <motion.div
          className="mt-6 flex flex-col items-center justify-center gap-1 text-base text-[#c4c4cc]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.8, ease: EASE }}
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          <span className="flex items-center gap-1 text-sm italic text-[#e6e6ea]/80">
            With Lots of Love <Heart size={14} className="fill-[#e9b13a] text-[#e9b13a]" />
          </span>
          <span className="text-lg font-semibold text-[#e9b13a]">
            Deepak
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: EASE }}
        >
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #e9b13a, #b87d1c)',
              color: '#1a1208',
              border: '1px solid rgba(233,177,58,0.6)',
              boxShadow: '0 0 24px rgba(233,177,58,0.3)',
            }}
          >
            <RotateCcw size={18} />
            <span>Replay Journey</span>
          </button>
          
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:bg-[#e9b13a]/10 hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(13,13,18,0.6)',
              color: '#e9b13a',
              border: '1px solid rgba(233,177,58,0.4)',
            }}
          >
            <Home size={18} />
            <span>Back to Start</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
      }
          
