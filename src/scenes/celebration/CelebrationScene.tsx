import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Home, Sparkles } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { randomBetween } from '../../lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

type Phase = 'burst' | 'settle' | 'calm' | 'finale';

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  color: string;
  size: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  delay: number;
  color: string;
  scale: number;
}

interface GoldMote {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

const CONFETTI_COLORS = ['#fde047', '#e9b13a', '#b87d1c', '#fdf8ec', '#f3d98e'];
const FIREWORK_COLORS = ['#fde047', '#e9b13a', '#ffffff', '#f3d98e'];

export function CelebrationScene({ isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const managerRef = useRef(manager);
  managerRef.current = manager;

  const [phase, setPhase] = useState<Phase>('burst');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Enhanced 3D Confetti
  const confetti = useMemo<Confetti[]>(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: randomBetween(-5, 105),
        delay: randomBetween(0, 1.5),
        duration: randomBetween(3.5, 6),
        drift: randomBetween(-150, 150),
        rotateX: randomBetween(0, 360),
        rotateY: randomBetween(0, 360),
        rotateZ: randomBetween(0, 360),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: randomBetween(8, 14),
      })),
    [],
  );

  // Grand Fireworks
  const fireworks = useMemo<Firework[]>(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        x: randomBetween(15, 85),
        y: randomBetween(15, 50),
        delay: randomBetween(0, 2.5),
        color: FIREWORK_COLORS[i % FIREWORK_COLORS.length],
        scale: randomBetween(0.8, 1.6),
      })),
    [],
  );

  // Ambient Gold Motes
  const motes = useMemo<GoldMote[]>(
    () =>
      Array.from({ length: 35 }, () => ({
        left: randomBetween(0, 100),
        top: randomBetween(10, 90),
        size: randomBetween(2, 5),
        delay: randomBetween(0, 5),
        duration: randomBetween(10, 20),
        drift: randomBetween(-40, 40),
      })),
    [],
  );

  useEffect(() => {
    if (!isActive) return;
    const schedule: [Phase, number][] = [
      ['settle', 4200],
      ['calm', 7800],
      ['finale', 10000],
    ];
    const created = schedule.map(([p, delay]) => setTimeout(() => setPhase(p), delay));
    timersRef.current = created;
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [isActive]);

  const showConfetti = phase === 'burst' || phase === 'settle';
  const showFireworks = phase === 'burst' || phase === 'settle';
  const showMotes = phase === 'calm' || phase === 'finale';
  const showCard = phase === 'finale';

  const handleReplay = () => managerRef.current?.goTo('welcome');
  const handleStart = () => managerRef.current?.goTo('loading');

  return (
    <motion.div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6"
      style={{ backgroundColor: '#050508' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
    >
      {/* Deep Cinematic Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 40%, rgba(233,177,58,0.25), transparent 65%)',
            'radial-gradient(ellipse at 50% 45%, rgba(233,177,58,0.12), transparent 70%)',
            'radial-gradient(ellipse at 50% 50%, rgba(233,177,58,0.05), transparent 75%)',
          ],
        }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      />

      {/* Supernova Fireworks */}
      <AnimatePresence>
        {showFireworks && (
          <div className="pointer-events-none absolute inset-0 z-[1]">
            {fireworks.map((fw) => (
              <motion.div
                key={fw.id}
                className="absolute flex items-center justify-center"
                style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, fw.scale, fw.scale * 1.1], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, delay: fw.delay, ease: 'easeOut' }}
              >
                {/* Core Flash */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: '#ffffff',
                    boxShadow: `0 0 60px 15px ${fw.color}, 0 0 100px 30px ${fw.color}80`,
                  }}
                />
                {/* Expanding Particles */}
                {Array.from({ length: 18 }).map((_, j) => {
                  const angle = (j / 18) * Math.PI * 2;
                  const r = 110 * fw.scale;
                  return (
                    <motion.span
                      key={j}
                      className="absolute rounded-full"
                      style={{
                        width: 3.5,
                        height: 3.5,
                        background: fw.color,
                        boxShadow: `0 0 10px ${fw.color}`,
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos(angle) * r,
                        y: Math.sin(angle) * r + 20, // Slight gravity effect
                        opacity: 0,
                        scale: 0.2,
                      }}
                      transition={{ duration: 1.8, delay: fw.delay, ease: 'easeOut' }}
                    />
                  );
                })}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 3D Tumbling Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" style={{ perspective: '800px' }}>
            {confetti.map((c) => (
              <motion.div
                key={c.id}
                className="absolute top-[-10%]"
                style={{
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size * 0.45,
                  background: c.color,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
                initial={{ y: 0, opacity: 1, rotateX: c.rotateX, rotateY: c.rotateY, rotateZ: c.rotateZ }}
                animate={{
                  y: ['0vh', '115vh'],
                  x: [0, c.drift],
                  opacity: phase === 'settle' ? [1, 1, 0] : [1, 1, 1],
                  rotateX: c.rotateX + 720,
                  rotateY: c.rotateY + 360,
                  rotateZ: c.rotateZ + 180,
                }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  repeat: phase === 'burst' ? Infinity : 0,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Ambient Gold Motes */}
      <AnimatePresence>
        {showMotes && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: EASE }}
          >
            {motes.map((m, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${m.left}%`,
                  top: `${m.top}%`,
                  width: m.size,
                  height: m.size,
                  background: 'rgba(254, 240, 138, 0.8)',
                  boxShadow: '0 0 10px rgba(233, 177, 58, 0.6)',
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, m.drift, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: m.duration,
                  delay: m.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heavy Cinematic Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{ boxShadow: 'inset 0 0 250px 80px rgba(5,5,8,0.9)' }}
      />

      {/* Finale: Premium Glassmorphic Thank You Card */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            className="relative z-10 w-full max-w-xl text-center rounded-2xl p-8 sm:p-12"
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: EASE }}
            style={{
              background: 'linear-gradient(145deg, rgba(20, 20, 28, 0.7) 0%, rgba(10, 10, 15, 0.9) 100%)',
              border: '1px solid rgba(233, 177, 58, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(233, 177, 58, 0.05)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            >
              <Sparkles className="text-[#fde047] opacity-80" size={28} />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                background: 'linear-gradient(135deg, #fef08a 0%, #e9b13a 50%, #b87d1c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 5px 25px rgba(233,177,58,0.3)',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
            >
              Thank You
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg leading-relaxed text-[#c4c4cc]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
            >
              Thank you for taking this beautiful journey.
              <br className="hidden sm:block" />
              I hope this little surprise made your birthday even more special.
            </motion.p>

            <motion.p
              className="mt-6 text-2xl sm:text-3xl italic"
              style={{ 
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                color: '#f3d98e'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.9, ease: EASE }}
            >
              Happy Birthday Once Again
            </motion.p>

            <motion.p
              className="mt-6 text-base sm:text-lg text-[#e6e6ea]"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.4, ease: EASE }}
            >
              Warm regards,
              <br />
              <span className="text-xl text-[#e9b13a] font-medium">Deepak</span>
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3, ease: EASE }}
            >
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #e9b13a, #b87d1c)',
                  color: '#1a1208',
                  border: '1px solid rgba(254,240,138,0.6)',
                  boxShadow: '0 0 20px rgba(233,177,58,0.3)',
                }}
              >
                <RotateCcw size={18} />
                <span>Replay Journey</span>
              </button>
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(15, 15, 22, 0.6)',
                  color: '#f3d98e',
                  border: '1px solid rgba(233,177,58,0.4)',
                }}
              >
                <Home size={18} />
                <span>Back to Start</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
