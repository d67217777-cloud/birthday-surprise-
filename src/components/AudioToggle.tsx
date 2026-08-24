import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useDevMode } from '../hooks';

interface AudioToggleProps {
  muted: boolean;
  onToggle: () => void;
}

export function AudioToggle({ muted, onToggle }: AudioToggleProps) {
  const devMode = useDevMode();

  const handleClick = useCallback(() => {
    onToggle();
    devMode?.registerTap();
  }, [onToggle, devMode]);

  return (
    <button
      onClick={handleClick}
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
      className="fixed right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer select-none"
      style={{
        top: 'max(1.2rem, env(safe-area-inset-top))',
        background: 'rgba(15, 15, 22, 0.75)',
        border: muted
          ? '1px solid rgba(255, 255, 255, 0.15)'
          : '1px solid rgba(233, 177, 58, 0.5)',
        boxShadow: muted
          ? '0 4px 15px rgba(0, 0, 0, 0.5)'
          : '0 0 20px rgba(233, 177, 58, 0.25), 0 4px 15px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Subtle Glowing Pulse Ring when Playing */}
      {!muted && (
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '1.5px solid rgba(233, 177, 58, 0.6)',
          }}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Icon Transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={muted ? 'muted' : 'unmuted'}
          initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.7, rotate: 15 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {muted ? (
            <VolumeX size={18} className="text-[#a1a1aa]" />
          ) : (
            <Volume2 size={19} className="text-[#e9b13a]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
