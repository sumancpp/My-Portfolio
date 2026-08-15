import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const blogs = [
  {
    id: '1',
    title: 'Building 60 FPS WebGL Animations with Three.js & GSAP',
    slug: 'building-60fps-webgl-animations',
    excerpt: 'Deep dive into hardware acceleration, custom shader compilation, and Lenis smooth scroll integration.',
    readTime: '6 min read',
    date: 'AUG 2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Designing Luxury Digital Interfaces: The Trionn Philosophy',
    slug: 'designing-luxury-digital-interfaces',
    excerpt: 'How dark mode typography, micro-interactions, and magnetic cursors elevate user experience.',
    readTime: '8 min read',
    date: 'JUL 2026',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop'
  }
];

export const BlogsPage: React.FC = () => {
  return (
    <div className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-16">
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          THOUGHTS & INSIGHTS
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold text-textPrimary mt-4 leading-tight">
          Engineering & <span className="text-accentCyan font-extrabold">Design Articles</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {blogs.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1.02 }}
            viewport={{ amount: 0.35 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel rounded-2xl overflow-hidden border border-borderDark hover:border-accentCyan/50 transition-all duration-300 group"
          >
            <div className="aspect-video overflow-hidden">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-xs font-mono text-textMuted mb-3">
                <span>{b.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><FiClock /> {b.readTime}</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-textPrimary group-hover:text-accentCyan transition-colors mb-3">
                {b.title}
              </h2>
              <p className="text-textSecondary text-sm mb-6 leading-relaxed">
                {b.excerpt}
              </p>
              <Link to={`/blogs/${b.slug}`} className="inline-flex items-center gap-2 text-xs font-display font-bold text-accentCyan hover:underline">
                READ ARTICLE <FiArrowUpRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
