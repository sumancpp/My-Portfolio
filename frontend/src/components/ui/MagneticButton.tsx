import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useCursor } from '../../context/CursorContext';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // magnetic strength factor
  cursorType?: 'hover' | 'project' | 'text' | 'default';
  cursorText?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.4,
  cursorType = 'hover',
  cursorText = '',
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: distanceX,
        y: distanceY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
      resetCursor();
    };

    const handleMouseEnter = () => {
      setHoverState(cursorType, cursorText);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength, cursorType, cursorText, setHoverState, resetCursor]);

  return (
    <div
      ref={buttonRef}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};
