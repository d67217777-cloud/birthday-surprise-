import { motion, AnimatePresence } from 'framer-motion';
import type { SceneManager } from '../hooks/useSceneManager';
import { sceneFlow, sceneLabels } from '../config/scenes';
import type { SceneDefinition } from '../types';

interface SceneNavigationProps {
  manager: SceneManager;
  registry?: Record<string, SceneDefinition>;
}

export function SceneNavigation({ manager }: SceneNavigationProps) {
  return (
    <div className="fixed bottom-3 left-1/2 z-20 -translate-x-1/2 pointer-events-none select-none flex flex-col items-center">
      {/* Visual Progress Indicator */}
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md"
        style={{
          background: 'rgba(15, 15, 22, 0.65)',
          border: '1px solid rgba(233, 177, 58, 0.25)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
        }}
      >
        {sceneFlow.map((id, i) => (
          <span
            key={id}
            className="flex h-2 items-center"
            aria-label={sceneLabels[id] || id}
          >
            <motion.span
              className="block rounded-full"
              animate={{
                width: i === manager.index ? 20 : 6,
                backgroundColor: i === manager.index ? '#e9b13a' : '#4a4a55',
                boxShadow:
                  i === manager.index
                    ? '0 0 8px rgba(233, 177, 58, 0.8)'
                    : 'none',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ height: '5px' }}
            />
          </span>
        ))}
      </div>

      {/* Current Scene Name Label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={manager.current}
          className="mt-1.5 text-center text-[10px] tracking-[0.22em] text-[#f3d98e]/70 uppercase font-medium"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 0.85, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.3 }}
        >
          {sceneLabels[manager.current] || manager.current}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
