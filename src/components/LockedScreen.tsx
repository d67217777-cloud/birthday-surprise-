import { motion } from 'framer-motion';
import { Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { GoldButton } from './GoldButton';

interface LockedScreenProps {
  message: string;
  onBack: () => void;
}

export function LockedScreen({ message, onBack }: LockedScreenProps) {
  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: '#050508' }}
    >
      {/* Background Ambient Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at 50% 45%, rgba(233,177,58,0.1), transparent 65%)' 
        }} 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Animated Vault Lock Assembly */}
        <div className="relative flex items-center justify-center mt-4">
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-[#e9b13a]/35"
            style={{ width: '92px', height: '92px', margin: '-14px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <div 
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ 
              background: 'rgba(15, 15, 22, 0.85)', 
              border: '1px solid rgba(233, 177, 58, 0.4)', 
              boxShadow: '0 0 25px rgba(233, 177, 58, 0.2)', 
              backdropFilter: 'blur(12px)' 
            }}
          >
            <Lock size={26} className="text-[#e9b13a]" />
          </div>
          <Sparkles size={16} className="absolute -top-2 -right-3 text-[#fde047] opacity-80 animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col items-center gap-3">
          <motion.h3 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs tracking-[0.35em] text-[#e9b13a]/80 uppercase font-medium"
          >
            Access Restricted
          </motion.h3>
          <p 
            className="max-w-md text-xl sm:text-2xl italic leading-relaxed" 
            style={{ 
              fontFamily: '"Cormorant Garamond", Georgia, serif', 
              color: '#e6e6ea',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            {message}
          </p>
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-2"
        >
          <GoldButton variant="outline" onClick={onBack} className="px-7 py-3 text-sm sm:text-base">
            <ArrowLeft size={18} />
            <span>Return to Countdown</span>
          </GoldButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
