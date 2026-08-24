import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { ParticleField } from '../../components';
import { getMemoryImages } from '../../config/images';
import Waves from '../../components/effects/Waves/Waves';

const EASE = [0.16, 1, 0.3, 1] as const;
const TRANSITION_DURATION = 0.55;
const FINAL_DELAY = 2200;

export function MemoryJourneyScene({ isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const managerRef = useRef(manager);
  managerRef.current = manager;

  const images = useMemo(() => getMemoryImages(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0);
      setDirection(0);
      setShowFinal(false);
      setNavigating(false);
    }
  }, [isActive]);

  const paginate = useCallback(
    (dir: number) => {
      if (showFinal || navigating) return;
      setDirection(dir);
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0 || next >= images.length) return prev;
        return next;
      });
    },
    [images.length, showFinal, navigating],
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (showFinal || navigating) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex, showFinal, navigating],
  );

  useEffect(() => {
    if (currentIndex !== images.length - 1 || showFinal || navigating) return;
    const t = setTimeout(() => setShowFinal(true), FINAL_DELAY);
    return () => clearTimeout(t);
  }, [currentIndex, images.length, showFinal, navigating]);

  useEffect(() => {
    if (!showFinal || navigating) return;
    const t = setTimeout(() => {
      setNavigating(true);
      setTimeout(() => managerRef.current?.next(), 1000);
    }, FINAL_DELAY);
    return () => clearTimeout(t);
  }, [showFinal, navigating]);

  useEffect(() => {
    if (!isActive) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      else if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, paginate]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 50) paginate(delta > 0 ? -1 : 1);
      touchStartX.current = null;
    },
    [paginate],
  );

  const current = images[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0, scale: 0.96 }),
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-8"
      style={{
        background: '#060609',
        paddingTop: 'max(4rem, env(safe-area-inset-top))',
        paddingBottom: 'max(5rem, env(safe-area-inset-bottom))',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(233,177,58,0.08), transparent 65%)',
        }}
      />

      {/* Waves Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60">
        <Waves
          lineColor="rgba(233,177,58,0.12)"
          backgroundColor="transparent"
          waveSpeedX={0.008}
          waveSpeedY={0.004}
          waveAmpX={18}
          waveAmpY={10}
          friction={0.93}
          tension={0.008}
          maxCursorMove={60}
          xGap={20}
          yGap={42}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/40" />
      <ParticleField count={30} />

      {/* Header Badge */}
      <motion.div
        className="relative z-20 mb-4 flex items-center gap-2 rounded-full px-4 py-1.5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: navigating ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          background: 'rgba(233,177,58,0.08)',
          border: '1px solid rgba(233,177,58,0.25)',
        }}
      >
        <Sparkles size={14} className="text-[#e9b13a]" />
        <span className="text-xs sm:text-sm tracking-[0.25em] text-[#f3d98e] uppercase font-medium">
          Memory Journey &bull; {currentIndex + 1}/{images.length}
        </span>
      </motion.div>

      {/* Main Slide Carousel */}
      <div className="relative z-20 flex w-full max-w-2xl flex-1 flex-col items-center justify-center">
        <div className="relative w-full flex items-center justify-center" style={{ minHeight: 'clamp(380px, 58vh, 560px)' }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: TRANSITION_DURATION, ease: EASE }}
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Image Frame */}
              <div
                className="relative overflow-hidden rounded-2xl p-1.5 backdrop-blur-md"
                style={{
                  background: 'linear-gradient(145deg, rgba(233,177,58,0.3), rgba(20,20,28,0.8))',
                  border: '1px solid rgba(233,177,58,0.4)',
                  boxShadow: '0 0 45px rgba(233,177,58,0.18), 0 20px 50px rgba(0,0,0,0.8)',
                }}
              >
                <img
                  src={current.src}
                  alt={current.alt || `Memory ${currentIndex + 1}`}
                  className="h-auto w-auto max-w-full rounded-xl object-contain max-h-[55vh] sm:max-h-[62vh]"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Caption */}
              <motion.p
                className="mt-5 max-w-lg px-4 text-center text-lg sm:text-2xl italic text-[#f4f4f8]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                }}
              >
                "{current.caption}"
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {!showFinal && (
          <div className="mt-6 flex items-center gap-6">
            <button
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              aria-label="Previous memory"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#e9b13a] transition-all hover:scale-110 active:scale-95 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
              style={{
                background: 'rgba(20, 20, 28, 0.8)',
                border: '1px solid rgba(233,177,58,0.35)',
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.id || i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to memory ${i + 1}`}
                  className="cursor-pointer p-1"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'h-2.5 w-7 bg-[#e9b13a] shadow-[0_0_12px_#e9b13a]'
                        : 'h-2 w-2 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              disabled={currentIndex === images.length - 1}
              aria-label="Next memory"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#e9b13a] transition-all hover:scale-110 active:scale-95 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
              style={{
                background: 'rgba(20, 20, 28, 0.8)',
                border: '1px solid rgba(233,177,58,0.35)',
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>

      {/* Transitioning to Next Scene Overlay */}
      <AnimatePresence>
        {showFinal && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="absolute inset-0 bg-[#060609]/85 backdrop-blur-md" />
            <motion.div
              className="relative z-20 text-center max-w-md"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <h2
                className="text-3xl sm:text-4xl italic font-semibold text-[#e9b13a]"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  textShadow: '0 0 25px rgba(233,177,58,0.4)',
                }}
              >
                Our journey doesn't end here...
              </h2>
              <p className="mt-3 text-sm text-[#f3d98e]/80 tracking-widest uppercase">
                Opening special letter ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
                            }
              
