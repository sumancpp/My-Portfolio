import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { useCursor } from '../../context/CursorContext';
import { FiArrowUpRight, FiExternalLink, FiGithub, FiLayers } from 'react-icons/fi';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  tagline: string;
  slug: string;
  demoUrl: string;
  githubUrl: string;
  description: string;
  tags: string[];
}

interface ProjectCard3DProps {
  project: ProjectData;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project }) => {
  const { setHoverState, resetCursor } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  // Dynamic holographic glare gradient position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverState('project', 'EXPLORE');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetCursor();
    x.set(0);
    y.set(0);
  };

  const handleCardClick = () => {
    navigate(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className="relative group rounded-3xl bg-gradient-to-br from-bgSecondary/90 via-bgCard/80 to-bgPrimary border border-borderDark/80 hover:border-accentCyan/60 transition-colors duration-500 overflow-hidden shadow-2xl backdrop-blur-2xl flex flex-col justify-between cursor-pointer"
    >
      {/* Dynamic Holographic Glare Overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl z-30 opacity-40 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(0, 240, 255, 0.25), transparent 70%)`,
          }}
        />
      )}

      {/* Image Preview Box with 3D Pop Out */}
      <div className="relative overflow-hidden aspect-video bg-black/90 flex items-center justify-center p-6 border-b border-borderDark/60 group">
        {/* Glow backdrop behind image */}
        <div className="absolute inset-0 bg-accentCyan/10 rounded-3xl blur-2xl group-hover:bg-accentCyan/20 transition-all duration-500 pointer-events-none" />

        <motion.div
          style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)' }}
          className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300"
        >
          <img
            src={project.image}
            alt={project.title}
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,240,255,0.2)] group-hover:scale-108 transition-transform duration-500"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('/project-images/')) {
                target.src = target.src.replace('/project-images/', '/');
              } else {
                const parts = target.src.split('/');
                const filename = parts[parts.length - 1];
                if (filename) target.src = `/project-images/${filename}`;
              }
            }}
          />
        </motion.div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          {(() => {
            const isFullStack =
              project.slug === 'talent-ai' ||
              project.slug === 'baatcheet' ||
              (project.category && project.category.toLowerCase().includes('full stack'));

            return (
              <span className={`px-3 py-1 rounded-full bg-bgPrimary/80 backdrop-blur-md border ${isFullStack ? 'border-accentCyan/30 text-accentCyan' : 'border-purple-500/30 text-purple-400'} font-mono text-[10px] font-bold flex items-center gap-1.5`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isFullStack ? 'bg-emerald-400' : 'bg-purple-400'} animate-pulse`} />
                {isFullStack ? 'FLAGSHIP MERN' : 'FRONTEND PROJECT'}
              </span>
            );
          })()}
        </div>

        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-bgPrimary/80 backdrop-blur-md border border-borderDark text-textMuted font-mono text-[10px]">
          {project.year}
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-accentCyan font-mono text-xs font-semibold">
            <FiLayers />
            <span>{project.category}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-textPrimary group-hover:text-accentCyan transition-colors">
            {project.title}
          </h3>

          <p className="text-textSecondary text-xs sm:text-sm leading-relaxed font-medium">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((t, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-3 py-1 rounded-lg bg-bgPrimary/80 border border-borderDark/60 text-textMuted group-hover:border-accentCyan/30 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between gap-3 flex-wrap relative z-20">
          <div className="flex items-center gap-2">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <MagneticButton strength={0.3}>
                <div className="px-4 py-2 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-xs flex items-center gap-1.5 hover:bg-white hover:shadow-lg hover:shadow-accentCyan/30 transition-all">
                  <span>LIVE DEMO</span>
                  <FiExternalLink />
                </div>
              </MagneticButton>
            </a>

            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <MagneticButton strength={0.3}>
                <div className="px-4 py-2 rounded-full border border-borderDark bg-bgPrimary text-textPrimary font-display font-bold text-xs hover:border-accentCyan hover:text-accentCyan transition-all flex items-center gap-1.5">
                  <FiGithub />
                  <span>CODE</span>
                </div>
              </MagneticButton>
            </a>
          </div>

          <Link to={`/projects/${project.slug}`} onClick={(e) => e.stopPropagation()}>
            <MagneticButton strength={0.3}>
              <div className="px-4 py-2 rounded-full border border-borderDark/60 text-textMuted font-display font-bold text-xs hover:border-textSecondary hover:text-textPrimary transition-all flex items-center gap-1">
                <span>CASE STUDY</span>
                <FiArrowUpRight />
              </div>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
