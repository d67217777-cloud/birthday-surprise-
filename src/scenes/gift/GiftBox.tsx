import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

export type GiftBoxPhase = 'idle' | 'shaking' | 'untying' | 'opening' | 'open';

interface GiftBoxProps {
  phase: GiftBoxPhase;
  onTap: () => void;
}

const BOX_SIZE = 140; // width & depth in px
const BOX_HEIGHT = 130; // height in px
const LID_SIZE = 150;
const LID_HEIGHT = 32;

export function GiftBox({ phase, onTap }: GiftBoxProps) {
  const isOpen = phase === 'opening' || phase === 'open';

  return (
    <div
      className="relative flex items-center justify-center py-16 select-none"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 30%',
      }}
    >
      {/* Dynamic 3D Root Isometric Stage */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          width: BOX_SIZE,
          height: BOX_HEIGHT,
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-22deg) rotateY(38deg)',
        }}
        onClick={onTap}
        animate={
          phase === 'shaking'
            ? {
                rotateY: [38, 48, 28, 44, 32, 38],
                rotateX: [-22, -18, -26, -20, -24, -22],
                y: [0, -6, 0, -4, 0],
              }
            : phase === 'idle'
              ? {
                  rotateY: [35, 42, 35],
                  rotateX: [-20, -24, -20],
                }
              : { rotateX: -24, rotateY: 38 }
        }
        transition={
          phase === 'shaking'
            ? { duration: 0.5, ease: 'easeInOut' }
            : phase === 'idle'
              ? { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.8 }
        }
        whileHover={phase === 'idle' ? { scale: 1.05 } : undefined}
        whileTap={phase === 'idle' ? { scale: 0.96 } : undefined}
      >
        {/* Floor Contact Shadow (3D Flat Plane) */}
        <div
          className="absolute pointer-events-none rounded-2xl"
          style={{
            width: BOX_SIZE * 1.5,
            height: BOX_SIZE * 1.5,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, rgba(233,177,58,0.15) 45%, transparent 75%)',
            transform: `translateZ(-${BOX_HEIGHT / 2}px) translateY(${BOX_HEIGHT / 2 + 10}px) rotateX(90deg)`,
            filter: 'blur(10px)',
          }}
        />

        {/* Inner Magicial Light Pillar when Open */}
        <motion.div
          className="absolute pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: BOX_SIZE,
            height: BOX_HEIGHT * 2,
            transformStyle: 'preserve-3d',
            transform: `translateY(-${BOX_HEIGHT / 2}px)`,
          }}
        >
          <motion.div
            className="w-28 rounded-full"
            style={{
              height: '240px',
              background: 'linear-gradient(180deg, rgba(254,240,138,0.95), rgba(233,177,58,0.4) 60%, transparent)',
              filter: 'blur(12px)',
            }}
            animate={{
              scale: [0.9, 1.25, 0.9],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ---------------- 3D LID ASSEMBLY ---------------- */}
        <motion.div
          className="absolute"
          style={{
            width: LID_SIZE,
            height: LID_HEIGHT,
            top: -(LID_HEIGHT - 10),
            left: -(LID_SIZE - BOX_SIZE) / 2,
            transformStyle: 'preserve-3d',
          }}
          animate={
            isOpen
              ? {
                  y: -140,
                  rotateX: 35,
                  rotateZ: -20,
                  rotateY: 15,
                  opacity: 0.88,
                }
              : { y: 0, rotateX: 0, rotateZ: 0, rotateY: 0, opacity: 1 }
          }
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Lid Top Face */}
          <div
            className="absolute flex items-center justify-center overflow-hidden"
            style={{
              width: LID_SIZE,
              height: LID_SIZE,
              background: 'linear-gradient(135deg, #1f1f2b 0%, #111118 100%)',
              border: '1.5px solid rgba(233,177,58,0.55)',
              boxShadow: 'inset 0 0 15px rgba(233,177,58,0.2)',
              transform: `rotateX(90deg) translateZ(${LID_HEIGHT / 2}px)`,
            }}
          >
            {/* Top Ribbon Crossing */}
            <div className="absolute h-full w-6 bg-gradient-to-r from-[#92400e] via-[#fde047] to-[#92400e] shadow-[0_0_8px_rgba(233,177,58,0.6)]" />
            <div className="absolute w-full h-6 bg-gradient-to-b from-[#92400e] via-[#fde047] to-[#92400e] shadow-[0_0_8px_rgba(233,177,58,0.6)]" />

            {/* 3D Realistic Gold Ribbon Bow Knot */}
            <div className="relative z-10 flex items-center justify-center">
              <div
                className="h-7 w-11 rounded-full -rotate-30 -mr-2"
                style={{
                  background: 'linear-gradient(135deg, #fef08a, #e9b13a 60%, #92400e)',
                  boxShadow: '0 0 10px rgba(233,177,58,0.6)',
                  border: '1px solid rgba(254,240,138,0.8)',
                }}
              />
              <div
                className="h-6 w-6 rounded-full z-20"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fef08a, #d97706 70%, #78350f)',
                  boxShadow: '0 0 10px rgba(233,177,58,0.8)',
                }}
              />
              <div
                className="h-7 w-11 rounded-full rotate-30 -ml-2"
                style={{
                  background: 'linear-gradient(225deg, #fef08a, #e9b13a 60%, #92400e)',
                  boxShadow: '0 0 10px rgba(233,177,58,0.6)',
                  border: '1px solid rgba(254,240,138,0.8)',
                }}
              />
            </div>
          </div>

          {/* Lid Front Face */}
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{
              width: LID_SIZE,
              height: LID_HEIGHT,
              background: 'linear-gradient(180deg, #1c1c27, #0d0d13)',
              border: '1px solid rgba(233,177,58,0.4)',
              transform: `translateZ(${LID_SIZE / 2}px)`,
            }}
          >
            <div className="h-full w-6 bg-gradient-to-r from-[#92400e] via-[#fde047] to-[#92400e]" />
          </div>

          {/* Lid Right Face (Light Source Shadow) */}
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{
              width: LID_SIZE,
              height: LID_HEIGHT,
              background: 'linear-gradient(180deg, #15151f, #09090e)',
              border: '1px solid rgba(233,177,58,0.3)',
              transform: `rotateY(90deg) translateZ(${LID_SIZE / 2}px)`,
            }}
          >
            <div className="h-full w-6 bg-gradient-to-r from-[#78350f] via-[#d97706] to-[#78350f]" />
          </div>

          {/* Lid Left Face */}
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{
              width: LID_SIZE,
              height: LID_HEIGHT,
              background: 'linear-gradient(180deg, #242433, #12121a)',
              border: '1px solid rgba(233,177,58,0.4)',
              transform: `rotateY(-90deg) translateZ(${LID_SIZE / 2}px)`,
            }}
          >
            <div className="h-full w-6 bg-gradient-to-r from-[#92400e] via-[#fde047] to-[#92400e]" />
          </div>

          {/* Lid Back Face */}
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{
              width: LID_SIZE,
              height: LID_HEIGHT,
              background: '#09090d',
              transform: `rotateY(180deg) translateZ(${LID_SIZE / 2}px)`,
            }}
          >
            <div className="h-full w-6 bg-[#92400e]" />
          </div>
        </motion.div>

        {/* ---------------- 3D BOX BODY FACES ---------------- */}

        {/* Front Face */}
        <div
          className="absolute flex justify-center overflow-hidden rounded-sm"
          style={{
            width: BOX_SIZE,
            height: BOX_HEIGHT,
            background: 'linear-gradient(180deg, #171722 0%, #0c0c12 100%)',
            border: '1px solid rgba(233,177,58,0.35)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
            transform: `translateZ(${BOX_SIZE / 2}px)`,
          }}
        >
          <div className="h-full w-6 bg-gradient-to-r from-[#92400e] via-[#fde047] to-[#92400e] shadow-[0_0_10px_rgba(233,177,58,0.3)]" />
        </div>

        {/* Right Face (Deeper Shadow for 3D realism) */}
        <div
          className="absolute flex justify-center overflow-hidden rounded-sm"
          style={{
            width: BOX_SIZE,
            height: BOX_HEIGHT,
            background: 'linear-gradient(180deg, #101018 0%, #07070b 100%)',
            border: '1px solid rgba(233,177,58,0.25)',
            boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
            transform: `rotateY(90deg) translateZ(${BOX_SIZE / 2}px)`,
          }}
        >
          <div className="h-full w-6 bg-gradient-to-r from-[#78350f] via-[#d97706] to-[#78350f]" />
        </div>

        {/* Left Face (Highlight side) */}
        <div
          className="absolute flex justify-center overflow-hidden rounded-sm"
          style={{
            width: BOX_SIZE,
            height: BOX_HEIGHT,
            background: 'linear-gradient(180deg, #20202e 0%, #101017 100%)',
            border: '1px solid rgba(233,177,58,0.4)',
            transform: `rotateY(-90deg) translateZ(${BOX_SIZE / 2}px)`,
          }}
        >
          <div className="h-full w-6 bg-gradient-to-r from-[#92400e] via-[#fde047] to-[#92400e]" />
        </div>

        {/* Back Face */}
        <div
          className="absolute flex justify-center overflow-hidden"
          style={{
            width: BOX_SIZE,
            height: BOX_HEIGHT,
            background: '#09090d',
            transform: `rotateY(180deg) translateZ(${BOX_SIZE / 2}px)`,
          }}
        >
          <div className="h-full w-6 bg-[#78350f]" />
        </div>

        {/* Bottom Face */}
        <div
          className="absolute"
          style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            background: '#050508',
            transform: `rotateX(-90deg) translateZ(${BOX_HEIGHT / 2}px)`,
          }}
        />
      </motion.div>

      {/* Floating 3D Sparkle Burst when Opened */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
            {[-60, -35, -15, 15, 35, 60].map((angle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.3, 0.8],
                  x: Math.sin((angle * Math.PI) / 180) * 130,
                  y: -Math.cos((angle * Math.PI) / 180) * 120 - 40,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.09,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute text-[#fde047]"
              >
                {i % 2 === 0 ? <Sparkles size={22} /> : <Star size={18} className="fill-[#e9b13a]" />}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
