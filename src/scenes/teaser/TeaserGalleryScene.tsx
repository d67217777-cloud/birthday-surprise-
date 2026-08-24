import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MoveHorizontal } from 'lucide-react';
import { lazy, Suspense } from 'react';
import type { SceneComponentProps } from '../../types';
import { useSceneManagerContext } from '../../hooks';
import { getTeaserImages } from '../../config/images';
import { TeaserBackground } from './TeaserBackground';

const DomeGallery = lazy(() => import('../../components/DomeGallery/DomeGallery'));

const EASE = [0.16, 1, 0.3, 1] as const;

export function TeaserGalleryScene({ isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();
  const managerRef = useRef(manager);
  managerRef.current = manager;

  const teaserImages = useMemo(() => getTeaserImages(), []);
  const domeImages = useMemo(
    () => teaserImages.map((img) => ({ src: img.src, alt: img.alt })),
    [teaserImages],
  );

  const [showButton, setShowButton] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const buttonTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setShowButton(false);
      setNavigating(false);
      if (buttonTimerRef.current) clearTimeout(buttonTimerRef.current);
    } else {
      if (buttonTimerRef.current) clearTimeout(buttonTimerRef.current);
      buttonTimerRef.current = setTimeout(() => setShowButton(true), 2000);
    }
  }, [isActive]);

  const handleContinue = useCallback(() => {
    if (navigating) return;
    setNavigating(true);
    setTimeout(() => managerRef.current?.next(), 1000);
  }, [navigating]);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-6"
      style={{
        paddingTop: 'max(5.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(3rem, env(safe-area-inset-bottom))',
      }}
    >
      <TeaserBackground />

      {/* Header Area */}
      <motion.div
        className="relative z-20 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: navigating ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-2 bg-[#e9b13a]/10 border border-[#e9b13a]/30 text-[#f3d98e]">
          <Sparkles size={13} className="text-[#e9b13a]" />
          <span className="text-xs tracking-[0.25em] uppercase font-medium">A Glimpse Ahead</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e9b13a]"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            textShadow: '0 0 25px rgba(233,177,58,0.45)',
          }}
        >
          Teaser Gallery
        </h2>

        <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-[#c4c4cc]/75 tracking-wider">
          <MoveHorizontal size={14} className="text-[#e9b13a]" />
          <span>Swipe sphere to explore</span>
        </p>
      </motion.div>

      {/* 3D Dome Gallery Container */}
      <div
        className="relative z-10 w-full flex items-center justify-center flex-1"
        style={{ minHeight: '340px', maxHeight: '52vh' }}
      >
        {teaserImages.length > 0 ? (
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-full border-2 border-[#e9b13a]/20 border-t-[#e9b13a] animate-spin" />
                <span className="text-xs text-[#e9b13a]/70 tracking-widest uppercase">Loading Dome...</span>
              </div>
            }
          >
            <DomeGallery
              images={domeImages}
              fit={0.4}
              fitBasis="min"
              minRadius={140}
              maxRadius={260}
              segments={20}
              dragDampening={1.2}
              maxVerticalRotationDeg={12}
              grayscale={false}
              overlayBlurColor="#050508"
            />
          </Suspense>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: navigating ? 0 : 1 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="h-10 w-10 rounded-full border-2 border-[#e9b13a]/20 border-t-[#e9b13a] animate-spin" />
            <p className="text-sm text-[#c4c4cc]">Teaser photos coming soon</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Button Action */}
      <div className="relative z-20 w-full flex justify-center min-h-[56px]">
        <AnimatePresence>
          {showButton && (
            <motion.button
              type="button"
              onClick={handleContinue}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: navigating ? 0 : 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(233,177,58,0.4)]"
              style={{
                background: 'linear-gradient(135deg, #fde047, #e9b13a 60%, #b87d1c)',
                color: '#120d04',
                border: '1px solid rgba(254,240,138,0.8)',
              }}
            >
              <span>Continue Journey</span>
              <ArrowRight size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Curtain */}
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
