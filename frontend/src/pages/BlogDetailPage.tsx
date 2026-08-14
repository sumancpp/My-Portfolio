import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams();

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <Link to="/blogs" className="inline-flex items-center gap-2 text-textMuted hover:text-accentCyan text-sm font-mono mb-8">
        <FiArrowLeft /> BACK TO ARTICLES
      </Link>

      <div className="mb-12">
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          INSIGHTS & ENGINEERING
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary mt-4 leading-tight">
          {slug?.replace(/-/g, ' ').toUpperCase() || 'ARTICLE TITLE'}
        </h1>
        <div className="flex items-center gap-4 text-xs font-mono text-textMuted mt-4">
          <span>PUBLISHED AUG 2026</span>
          <span>•</span>
          <span>6 MIN READ</span>
        </div>
      </div>

      <div className="aspect-video rounded-2xl overflow-hidden mb-12 border border-borderDark">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" alt="Blog cover" className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-invert max-w-none text-textSecondary text-lg leading-relaxed space-y-6">
        <p>
          High-performance web motion graphics require a careful blend of hardware-accelerated shaders, optimized render loops, and buttery smooth input listeners...
        </p>
        <p>
          When designing Trionn-inspired interfaces, every pixel and every scroll tick matters. Using Lenis for custom smooth scroll allows GSAP ScrollTrigger to remain perfectly synchronized...
        </p>
      </div>
    </div>
  );
};
