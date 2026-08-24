import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Sparkles, Heart } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { randomBetween } from '../../lib/utils';

export function MemoryAlbumScene({ isActive: _isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const managerRef = useRef(manager);
  managerRef.current = manager;

  const motes = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        left: randomBetween(5, 95),
        top: randomBetween(5, 95),
        size: randomBetween(3, 6),
        delay: randomBetween(0, 4),
        duration: randomBetween(6, 12),
        drift: randomBetween(-25, 25),
      })),
    [],
  );

  return (
    <motion.div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ background: '#08080c' }}
    >
      {/* Background radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(233,177,58,0.18), transparent 65%)',
        }}
      />

      {/* Floating Gold Stars/Particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {motes.map((m, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              background: '#fde047',
              boxShadow: '0 0 10px #e9b13a',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, m.drift, 0],
              opacity: [0.3, 1, 0.3],
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

      {/* Main Glassmorphism Card */}
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-3xl p-8 sm:p-12 text-center"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          background: 'rgba(18, 18, 26, 0.85)',
          border: '1.5px solid rgba(233,177,58,0.4)',
          boxShadow: '0 0 50px rgba(233,177,58,0.18), 0 25px 60px rgba(0,0,0,0.8)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Floating Sparkle Icon Badge */}
        <div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(233,177,58,0.25), rgba(233,177,58,0.05))',
            border: '1px solid rgba(233,177,58,0.5)',
            boxShadow: '0 0 20px rgba(233,177,58,0.3)',
          }}
        >
          <Sparkles size={24} className="text-[#e9b13a]" />
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#e9b13a',
            textShadow: '0 0 25px rgba(233,177,58,0.45)',
          }}
        >
          Thank You
        </h1>

        {/* Message */}
        <p
          className="mt-5 text-base sm:text-lg leading-relaxed text-[#f4f4f6]"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          Thank you for taking this beautiful journey.
          <br />
          I hope this little surprise brought a bright smile to your face today.
        </p>

        {/* Golden Divider */}
        <div
          className="mx-auto my-6 h-[1.5px] w-32"
          style={{
            background: 'linear-gradient(90deg, transparent, #e9b13a, transparent)',
          }}
        />

        {/* Birthday Wish Line */}
        <p
          className="text-2xl sm:text-3xl italic font-medium text-[#fde047]"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          Happy Birthday Once Again! ✨
        </p>

        {/* Sign-off */}
        <div
          className="mt-6 flex flex-col items-center justify-center gap-1"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          <span className="flex items-center gap-1.5 text-sm text-[#d4d4d8]">
            With Lots of Love <Heart size={15} className="fill-[#e9b13a] text-[#e9b13a]" />
          </span>
          <span className="text-xl font-bold text-[#e9b13a] tracking-wide">
            Deepak
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => managerRef.current?.goTo('welcome')}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #e9b13a, #b87d1c)',
              color: '#120d04',
              boxShadow: '0 0 25px rgba(233,177,58,0.4)',
            }}
          >
            <RotateCcw size={18} />
            <span>Replay Journey</span>
          </button>

          <button
            type="button"
            onClick={() => managerRef.current?.goTo('loading')}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#e9b13a',
              border: '1px solid rgba(233,177,58,0.4)',
            }}
          >
            <Home size={18} />
            <span>Back to Start</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
