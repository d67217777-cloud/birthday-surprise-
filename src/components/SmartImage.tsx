import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SmartImage({ src, alt, className = '' }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state if image source changes
    setLoaded(false);
    setError(false);
  }, [src]);

  // Premium Error State
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-[#0a0a0f] border border-white/5 ${className}`}
        aria-label={alt}
        role="img"
      >
        <ImageOff size={24} className="text-[#c4c4cc]/20" />
      </div>
    );
  }

  return (
    <>
      {/* Skeleton Pulse Loading State */}
      {!loaded && (
        <div
          className={`absolute inset-0 animate-pulse bg-[#0a0a0f] ${className}`}
          style={{
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)',
          }}
        />
      )}
      
      {/* Cinematic Image Reveal */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
        } transition-all duration-700 ease-out`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          willChange: 'opacity, transform', // Hardware acceleration for mobile smoothness
        }}
      />
    </>
  );
}
