import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { letterContent } from '../../config/letter';
import { useSceneManagerContext } from '../../hooks';

const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function LetterScene() {
  const manager = useSceneManagerContext();

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-y-auto px-4 py-8"
      style={{
        paddingTop: 'max(2rem, env(safe-area-inset-top))',
        paddingBottom: 'max(7rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Background Gradients */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 50%, #050508 100%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(233,177,58,0.12), transparent 70%)',
        }}
      />

      {/* Letter Card */}
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl p-6 sm:p-10 backdrop-blur-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          background:
            'linear-gradient(145deg, rgba(245,233,198,0.07), rgba(13,13,18,0.94))',
          border: '1px solid rgba(233,177,58,0.3)',
          boxShadow: '0 0 45px rgba(233,177,58,0.12), 0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top Decorative Icon */}
        <motion.div variants={itemVariants} className="flex justify-center mb-3">
          <Sparkles size={20} className="text-[#e9b13a] opacity-80" />
        </motion.div>

        {/* Greeting */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl text-center"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#e9b13a',
            fontWeight: 600,
          }}
        >
          {letterContent.greeting}
        </motion.h2>

        {/* Birthday Line */}
        <motion.p
          variants={itemVariants}
          className="mt-2 text-center text-lg sm:text-xl italic"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#f3d98e',
          }}
        >
          {letterContent.birthdayLine}
        </motion.p>

        {/* Golden Divider */}
        <motion.div
          variants={itemVariants}
          className="my-6 h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(233,177,58,0.45), transparent)',
          }}
        />

        {/* Paragraphs */}
        <div className="space-y-4 text-center sm:text-left">
          {letterContent.paragraphs.map((text, idx) => (
            <motion.p
              key={idx}
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                color: '#e6e6ea',
                fontStyle: 'italic',
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Sign-off */}
        <motion.div variants={itemVariants} className="mt-8 text-right">
          {letterContent.signoff.map((text, sIdx) => (
            <p
              key={sIdx}
              className="text-base sm:text-lg"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                color: sIdx === letterContent.signoff.length - 1 ? '#e9b13a' : '#c4c4cc',
                fontWeight: sIdx === letterContent.signoff.length - 1 ? 600 : 400,
                textShadow:
                  sIdx === letterContent.signoff.length - 1
                    ? '0 0 18px rgba(233,177,58,0.35)'
                    : 'none',
              }}
            >
              {text}
            </p>
          ))}
        </motion.div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-16 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10 max-w-lg mx-auto">
        <button
          type="button"
          disabled={!manager?.canGoPrev}
          onClick={() => manager?.prev()}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm sm:text-base transition-all active:scale-95"
          style={{
            background: 'rgba(13,13,18,0.7)',
            color: '#e9b13a',
            border: '1px solid rgba(233,177,58,0.4)',
            opacity: !manager?.canGoPrev ? 0.35 : 1,
            cursor: !manager?.canGoPrev ? 'not-allowed' : 'pointer',
          }}
        >
          <ArrowLeft size={18} />
          <span>Previous</span>
        </button>

        <button
          type="button"
          disabled={!manager?.canGoNext}
          onClick={() => manager?.next()}
          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm sm:text-base font-medium transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #e9b13a, #b87d1c)',
            color: '#1a1208',
            border: '1px solid rgba(233,177,58,0.6)',
            boxShadow: '0 0 24px rgba(233,177,58,0.3)',
            opacity: !manager?.canGoNext ? 0.35 : 1,
            cursor: !manager?.canGoNext ? 'not-allowed' : 'pointer',
          }}
        >
          <span>Next</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
