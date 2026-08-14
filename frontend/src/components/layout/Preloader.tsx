import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["FULL STACK", "GEMINI AI", "WEBRTC & SOCKET.IO", "REAL-TIME APPS", "SUMAN MAITY"];

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(wordTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[10000] bg-bgPrimary flex flex-col justify-between p-8 md:p-16 select-none"
    >
      <div className="flex justify-between items-center text-textMuted text-xs font-mono tracking-widest uppercase">
        <span>SUMAN MAITY // PORTFOLIO</span>
        <span>2026 EDITION</span>
      </div>

      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div className="h-16 overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.h2
              key={wordIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display font-extrabold text-3xl md:text-5xl tracking-widest text-accentCyan"
            >
              {words[wordIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="w-64 h-1 bg-borderDark rounded-full overflow-hidden mt-6">
          <motion.div
            className="h-full bg-accentCyan"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="font-display text-6xl md:text-8xl font-black text-textPrimary tracking-tight">
          {progress}<span className="text-accentCyan font-normal text-4xl">%</span>
        </div>
        <div className="text-right text-xs font-mono text-textMuted">
          <p>LOADING EXPERIENCES</p>
          <p className="text-accentTeal">PLEASE WAIT</p>
        </div>
      </div>
    </motion.div>
  );
};
