import React, { useEffect, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const { cursorType, cursorText } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      gsap.to(dot, {
        x: x,
        y: y,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(ring, {
        x: x,
        y: y,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  let ringStyle = 'w-10 h-10 border border-accentCyan/50 bg-transparent';
  let dotStyle = 'w-2 h-2 bg-accentCyan';

  if (cursorType === 'hover') {
    ringStyle = 'w-16 h-16 border-accentCyan bg-accentCyan/10 scale-125';
    dotStyle = 'w-3 h-3 bg-accentCyan scale-150';
  } else if (cursorType === 'project') {
    ringStyle = 'w-24 h-24 bg-accentCyan text-bgPrimary border-none font-bold text-xs flex items-center justify-center scale-110 shadow-lg shadow-accentCyan/20';
    dotStyle = 'opacity-0';
  } else if (cursorType === 'hidden') {
    ringStyle = 'opacity-0 scale-0';
    dotStyle = 'opacity-0 scale-0';
  }

  return (
    <>
      {/* Tiny inner dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 hidden lg:block ${dotStyle}`}
      />
      {/* Outer follow ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out backdrop-blur-[2px] hidden lg:block ${ringStyle}`}
      >
        {cursorType === 'project' && (
          <span className="font-display uppercase tracking-wider font-extrabold text-[10px]">
            {cursorText || 'VIEW'}
          </span>
        )}
      </div>
    </>
  );
};
