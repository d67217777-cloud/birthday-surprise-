import { useEffect, useRef, useState, useCallback } from 'react';
import { musicConfig, musicSrc } from '../config/music';

const rampTo = (
  audio: HTMLAudioElement,
  target: number,
  durationMs: number,
) =>
  new Promise<void>((resolve) => {
    const start = audio.volume;
    const delta = target - start;
    if (Math.abs(delta) < 0.001 || durationMs <= 0) {
      audio.volume = target;
      resolve();
      return;
    }
    const steps = Math.max(1, Math.floor(durationMs / 16));
    let i = 0;
    const tick = () => {
      i += 1;
      audio.volume = Math.max(0, Math.min(1, start + delta * (i / steps)));
      if (i < steps) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  
  // useState ki jagah useRef use kiya taaki tap karne par component re-render na ho
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop = musicConfig.loop;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;

    const startOnInteraction = async () => {
      if (startedRef.current) return;
      
      try {
        startedRef.current = true;
        
        // Safari & Chrome require play() to be caught properly
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        
        await rampTo(audio, musicConfig.volume, musicConfig.fadeInMs);
      } catch (err) {
        // Agar browser rokey, toh false set karein taaki agle tap par fir try ho sake
        startedRef.current = false;
        console.warn("Autoplay blocked waiting for user tap...", err);
      }
    };

    const events = ['click', 'touchstart', 'keydown'] as const;
    
    // Window ki jagah document level par listeners lagaye hain mobile support ke liye
    events.forEach((e) =>
      document.addEventListener(e, startOnInteraction)
    );

    return () => {
      events.forEach((e) =>
        document.removeEventListener(e, startOnInteraction)
      );
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []); // <-- Khali Array! Ab yeh dobara run hoke music ko kill nahi karega.

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (audio) {
        if (next) {
          void rampTo(audio, 0, musicConfig.fadeOutMs);
        } else {
          // Agar user pehli baar bina kahin tap kiye seedha mute/unmute button dabaye
          if (!startedRef.current) {
            startedRef.current = true;
            audio.play().catch(() => { startedRef.current = false; });
          }
          void rampTo(audio, musicConfig.volume, musicConfig.fadeInMs);
        }
      }
      return next;
    });
  }, []);

  return { muted, toggleMute };
}
