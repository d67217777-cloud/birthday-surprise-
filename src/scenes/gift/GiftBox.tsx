import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

export type GiftBoxPhase = 'idle' | 'shaking' | 'untying' | 'opening' | 'open';

interface GiftBoxProps {
  phase: GiftBoxPhase;
  onTap: () => void;
}

export function GiftBox({ phase, onTap }: GiftBoxProps) {
  const isOpen = phase === 'opening' || phase === 'open';

  return (
    <div
      className="relative flex items-center justify-center py-14 select-none"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 25%',
      }}
    >
      {/* Dynamic 3D Root Isometric Container */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          width: '140px',
          height: '120px',
          transformStyle: 'preserve-3d' as const,
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
              : { rotateX: -22, rotateY: 38 }
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
        {/* Floor Cinematic Shadow */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: '240px',
            height: '240px',
            background:
              'radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, rgba(233,177,58,0.25) 40%, transparent 70%)',
            transform: 'translateY(70px) rotateX(90deg)',
            filter: 'blur(12px)',
          }}
        />

        {/* Inner Glowing Light Beam when Open (Magical Gold Aura) */}
        <motion.div
          className="absolute pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            width: '140px',
            height: '240px',
            transformStyle: 'preserve-3d' as const,
            transform: 'translateY(-60px)',
          }}
        >
          <motion.div
            className="w-28 rounded-full"
            style={{
              height: '240px',
              background:
                'linear-gradient(180deg, rgba(254,240,138,0.95), rgba(233,177,58,0.6) 40%, transparent)',
              filter: 'blur(15px)',
              boxShadow: '0 0 60px rgba(254,240,138,0.6)',
            }}
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* 3D LID */}
        <motion.div
          className="absolute"
          style={{
            width: '148px',
            height: '30px',
            top: '-22px',
            left: '-4px',
            transformStyle: 'preserve-3d' as const,
          }}
          animate={
            isOpen
              ? {
                  y: -140,
                  rotateX: 45,
                  rotateZ: -25,
                  rotateY: 20,
                  opacity: 0, // Fades out slightly as it flies away
                }
              : { y: 0, rotateX: 0, rotateZ: 0, rotateY: 0, opacity: 1 }
          }
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Lid Top Face - Velvet with Gold Reflection */}
          <div
            className="absolute flex items-center justify-center overflow-hidden"
            style={{
              width: '148px',
              height: '148px',
              background: 'linear-gradient(135deg, #15151e 0%, #0a0a0f 100%)',
              border: '1.5px solid rgba(233,177,58,0.6)',
              boxShadow: 'inset 0 0 25px rgba(233,177,58,0.15)',
              transform: 'rotateX(90deg) translateZ(15px)',
            }}
          >
            {/* Silk Gold Ribbons */}
            <div className="absolute h-full w-7 bg-gradient-to-r from-[#78350f] via-[#fef08a] to-[#78350f] shadow-[0_0_12px_rgba(233,177,58,0.5)]" />
            <div className="absolute w-full h-7 bg-gradient-to-b from-[#78350f] via-[#fef08a] to-[#78350f] shadow-[0_0_12px_rgba(233,177,58,0.5)]" />

            {/* Premium Center Bow */}
            <div className="relative z-10 flex items-center justify-center">
              <div
                className="h-7 w-12 rounded-full -rotate-30 -mr-3"
                style={{
                  background: 'linear-gradient(135deg, #fef08a, #d97706 60%, #78350f)',
                  boxShadow: '0 0 10px rgba(233,177,58,0.7)',
                  border: '1px solid rgba(254,240,138,0.9)',
                }}
              />
              <div
                className="h-6 w-6 rounded-full z-20"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fffbeb, #e9b13a 60%, #78350f)',
                  boxShadow: '0 0 12px rgba(254,240,138,0.9)',
                  border: '1px solid rgba(255,255,255,0.5)',
                }}
              />
              <div
                className="h-7 w-12 rounded-full rotate-30 -ml-3"
                style={{
                  background: 'linear-gradient(225deg, #fef08a, #d97706 60%, #78350f)',
                  boxShadow: '0 0 10px rgba(233,177,58,0.7)',
                  border: '1px solid rgba(254,240,138,0.9)',
                }}
              />
            </div>
          </div>

          {/* Lid Edges (Front, Right, Left, Back) */}
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{ width: '148px', height: '30px', background: 'linear-gradient(180deg, #181822, #0c0c11)', border: '1px solid rgba(233,177,58,0.5)', transform: 'translateZ(74px)' }}
          >
            <div className="h-full w-7 bg-gradient-to-r from-[#78350f] via-[#fef08a] to-[#78350f]" />
          </div>
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{ width: '148px', height: '30px', background: 'linear-gradient(180deg, #12121a, #08080c)', border: '1px solid rgba(233,177,58,0.4)', transform: 'rotateY(90deg) translateZ(74px)' }}
          >
            <div className="h-full w-7 bg-gradient-to-r from-[#451a03] via-[#d97706] to-[#451a03]" />
          </div>
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{ width: '148px', height: '30px', background: 'linear-gradient(180deg, #1c1c28, #0f0f15)', border: '1px solid rgba(233,177,58,0.5)', transform: 'rotateY(-90deg) translateZ(74px)' }}
          >
            <div className="h-full w-7 bg-gradient-to-r from-[#78350f] via-[#fef08a] to-[#78350f]" />
          </div>
          <div
            className="absolute flex justify-center overflow-hidden"
            style={{ width: '148px', height: '30px', background: '#050508', transform: 'rotateY(180deg) translateZ(74px)' }}
          >
            <div className="h-full w-7 bg-[#78350f]" />
          </div>
        </motion.div>

        {/* 3D BOX BODY FACES (Velvet Matte Black with Edge Glow) */}
        {/* Front Face */}
        <div
          className="absolute flex justify-center overflow-hidden rounded-sm"
          style={{
            width: '140px',
            height: '120px',
            background: 'linear-gradient(180deg, #15151e 0%, #0a0a0f 100%)',
            border: '1px solid rgba(233,177,58,0.4)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), inset 0 0 10px rgba(233,177,58,0.1)',
            transform: 'translateZ(70px)',
          }}
        >
          <div className="h-full w-7 bg-gradient-to-r from-[#78350f] via-[#fef08a] to-[#78350f] shadow-[0_0_10px_rgba(233,177,58,0.4)]" />
        </div>

        {/* Right Face */}
        <div
          className="absolute flex justify-center overflow-hidden rounded-sm"
          style={{
            width: '140px',
            height: '120px',
            background: 'linear-gradient(180deg, #0d0d14 0%, #050508 100%)',
            border: '1px solid rgba(233,177,58,0.3)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.95)',
            transform: 'rotateY(90deg) translateZ(70px)',
          }}
        >
          <div className="h-full w-7 bg-gradient-to-r from-[#451a03] via-[#d97706] to-[#451a03]" />
        </div>

        {/* Left Face */}
        <div
          className="absolute flex justify-center overflow-hidden rounded-sm"
          style={{
            width: '140px',
            height: '120px',
            background: 'linear-gradient(180deg, #1a1a24 0%, #0e0e14 100%)',
            border: '1px solid rgba(233,177,58,0.45)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.85)',
            transform: 'rotateY(-90deg) translateZ(70px)',
          }}
        >
          <div className="h-full w-7 bg-gradient-to-r from-[#78350f] via-[#fef08a] to-[#78350f]" />
        </div>

        {/* Back Face */}
        <div
          className="absolute flex justify-center overflow-hidden"
          style={{ width: '140px', height: '120px', background: '#050508', transform: 'rotateY(180deg) translateZ(70px)' }}
        >
          <div className="h-full w-7 bg-[#451a03]" />
        </div>

        {/* Bottom Face */}
        <div
          className="absolute"
          style={{ width: '140px', height: '140px', background: '#020203', transform: 'rotateX(-90deg) translateZ(60px)' }}
        />
      </motion.div>

      {/* Bursting Magical Stars */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
            {[-65, -40, -15, 15, 40, 65].map((angle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0.5, 1.5, 1, 0.5],
                  x: Math.sin((angle * Math.PI) / 180) * 150,
                  y: -Math.cos((angle * Math.PI) / 180) * 140 - 50,
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                  ease: 'easeOut',
                }}
                className="absolute text-[#fde047]"
                style={{ filter: 'drop-shadow(0 0 10px rgba(254,240,138,0.8))' }}
              >
                {i % 2 === 0 ? <Sparkles size={26} /> : <Star size={20} className="fill-[#e9b13a]" />}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
