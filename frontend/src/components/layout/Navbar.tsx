import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagneticButton } from '../ui/MagneticButton';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? 'py-3 sm:py-4 bg-bgPrimary/85 shadow-2xl border-b border-borderDark/30'
            : 'py-3.5 sm:py-6 bg-bgPrimary/0 border-b border-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/">
            <MagneticButton strength={0.3}>
              <div className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-accentCyan/10 border border-accentCyan/30 flex items-center justify-center font-display font-extrabold text-accentCyan group-hover:bg-accentCyan group-hover:text-bgPrimary transition-colors duration-300">
                  SM
                </div>
                <span className="font-display font-bold text-lg tracking-tight text-textPrimary group-hover:text-accentCyan transition-colors">
                  SUMAN<span className="text-accentCyan">.</span>MAITY
                </span>
              </div>
            </MagneticButton>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 bg-bgSecondary/60 backdrop-blur-md px-8 py-3 rounded-full border border-borderDark/80">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path}>
                  <MagneticButton strength={0.25}>
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-accentCyan font-bold'
                          : 'text-textSecondary hover:text-textPrimary'
                      }`}
                    >
                      {link.name}
                    </span>
                  </MagneticButton>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden sm:block">
              <MagneticButton strength={0.4}>
                <div className="px-6 py-2.5 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-sm hover:bg-white transition-all flex items-center gap-2 shadow-lg shadow-accentCyan/20">
                  LET'S TALK <FiArrowUpRight className="text-base" />
                </div>
              </MagneticButton>
            </Link>

            <MagneticButton strength={0.3} onClick={() => setIsOpen(!isOpen)}>
              <button
                className="w-12 h-12 rounded-full border border-borderDark bg-bgSecondary flex items-center justify-center text-textPrimary hover:border-accentCyan hover:text-accentCyan transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
              </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-bgSecondary flex flex-col justify-between p-6 sm:p-12 md:p-20 overflow-y-auto overscroll-contain text-textPrimary"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="pt-16 sm:pt-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 my-auto">
              <div className="flex flex-col gap-3 sm:gap-4">
                <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
                  NAVIGATE ARCHITECTURE
                </span>
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * idx, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center gap-3 sm:gap-4 text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-textPrimary hover:text-accentCyan transition-colors"
                    >
                      <span className="text-xs font-mono text-textMuted group-hover:text-accentCyan">
                        0{idx + 1}
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-borderDark pt-6 lg:pt-0 lg:pl-12">
                <div>
                  <h4 className="text-accentCyan font-mono text-xs tracking-widest uppercase mb-3">
                    DIRECT INQUIRIES
                  </h4>
                  <p className="text-lg sm:text-2xl font-display text-textPrimary font-semibold mb-2 break-all">
                    suuman.maity@gmail.com
                  </p>
                  <p className="text-textSecondary text-sm mb-2">
                    +91 8597433833
                  </p>
                  <p className="text-textMuted text-xs mb-6 sm:mb-8">
                    Howrah, India • Final-Year B.Tech CSE (OmDayal Group of Institutions)
                  </p>

                  <h4 className="text-accentCyan font-mono text-xs tracking-widest uppercase mb-4">
                    SOCIAL CONNECT
                  </h4>
                  <div className="flex flex-wrap gap-4 text-textSecondary font-medium">
                    <a
                      href="https://github.com/sumancpp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accentCyan transition-colors border border-borderDark px-4 py-2 rounded-full text-xs"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/suman-maity-b84879292/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accentCyan transition-colors border border-borderDark px-4 py-2 rounded-full text-xs"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>

                <div className="mt-12 text-xs font-mono text-textMuted">
                  SUMAN MAITY © 2026 TRIONN LUXURY EXPERIENCE
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
