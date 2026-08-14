import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../ui/MagneticButton';
import { ApiMetricsBadge } from '../ui/ApiMetricsBadge';
import { FiArrowUp, FiArrowUpRight, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-bgPrimary border-t border-borderDark/80 pt-24 pb-12 px-6 md:px-12 overflow-hidden text-textPrimary">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accentCyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Luxury Hero CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-bgSecondary/90 via-bgCard/80 to-bgPrimary border border-borderDark/80 p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl backdrop-blur-2xl group">
          {/* Subtle Card Internal Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-accentCyan/20 rounded-full blur-3xl group-hover:bg-accentCyan/30 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accentCyan/10 border border-accentCyan/30 text-accentCyan font-mono text-xs font-semibold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-accentCyan animate-ping" />
                HAVE A VISIONARY PROJECT OR ROLE?
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-textPrimary tracking-tight leading-[0.95]">
                LET'S CREATE <br />
                <span className="text-accentCyan text-outline group-hover:text-accentCyan transition-colors duration-500">
                  SOMETHING ICONIC.
                </span>
              </h2>

              <p className="text-textSecondary text-base md:text-lg max-w-xl font-medium leading-relaxed">
               Full-Stack Developer focused on building high-impact software, scalable applications, and meaningful digital experiences.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <Link to="/contact" className="w-full sm:w-auto">
                <MagneticButton strength={0.35}>
                  <div className="w-full sm:w-auto px-8 py-4 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-sm md:text-base hover:bg-white hover:shadow-2xl hover:shadow-accentCyan/40 transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                    <span>START A CONVERSATION</span>
                    <FiSend className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </div>
                </MagneticButton>
              </Link>

              <a
                href="mailto:suuman.maity@gmail.com"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-bgPrimary/80 border border-borderDark hover:border-accentCyan text-textPrimary font-mono text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:text-accentCyan"
              >
                <FiMail className="text-accentCyan" />
                <span>DIRECT MAIL</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modern 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pt-6">
          {/* Col 1: Direct Contact Card (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-bgCard/40 border border-borderDark/60 p-6 sm:p-8 space-y-6 hover:border-accentCyan/30 transition-all">
            <div className="flex items-center gap-2 text-accentCyan font-mono text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accentCyan" />
              DIRECT CONTACT
            </div>

            <div className="space-y-4">
              <a
                href="mailto:suuman.maity@gmail.com"
                className="group flex items-center gap-3 p-3 rounded-xl bg-bgPrimary/50 border border-borderDark/40 hover:border-accentCyan/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accentCyan/10 flex items-center justify-center text-accentCyan text-base group-hover:bg-accentCyan group-hover:text-bgPrimary transition-colors">
                  <FiMail />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-textMuted uppercase tracking-wider block">EMAIL</span>
                  <span className="text-sm font-display font-bold text-textPrimary group-hover:text-accentCyan transition-colors truncate block">
                    suuman.maity@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+918597433833"
                className="group flex items-center gap-3 p-3 rounded-xl bg-bgPrimary/50 border border-borderDark/40 hover:border-accentCyan/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accentCyan/10 flex items-center justify-center text-accentCyan text-base group-hover:bg-accentCyan group-hover:text-bgPrimary transition-colors">
                  <FiPhone />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-textMuted uppercase tracking-wider block">PHONE</span>
                  <span className="text-sm font-display font-bold text-textPrimary group-hover:text-accentCyan transition-colors block">
                    +91 8597433833
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-bgPrimary/50 border border-borderDark/40">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-base">
                  <FiMapPin />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-textMuted uppercase tracking-wider block">LOCATION</span>
                  <span className="text-sm font-display font-semibold text-textPrimary block">
                    Howrah, Kolkata • West Bengal, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 rounded-2xl bg-bgCard/40 border border-borderDark/60 p-6 sm:p-8 space-y-4 hover:border-accentCyan/30 transition-all">
            <div className="flex items-center gap-2 text-accentCyan font-mono text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accentCyan" />
              NAVIGATION
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex items-center gap-2 py-1.5 text-xs font-mono text-textSecondary hover:text-accentCyan transition-colors"
                >
                  <span className="text-[10px] text-textMuted group-hover:text-accentCyan font-mono">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold tracking-wide">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Social & Professional Connect (3 cols) */}
          <div className="lg:col-span-3 rounded-2xl bg-bgCard/40 border border-borderDark/60 p-6 sm:p-8 space-y-4 hover:border-accentCyan/30 transition-all">
            <div className="flex items-center gap-2 text-accentCyan font-mono text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accentCyan" />
              SOCIAL PROFILES
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href="https://github.com/sumancpp"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-bgPrimary/50 border border-borderDark/40 hover:border-accentCyan/50 hover:bg-accentCyan/5 transition-all text-xs font-mono"
              >
                <div className="flex items-center gap-2 text-textPrimary group-hover:text-accentCyan font-bold">
                  <FiGithub className="text-base text-accentCyan" />
                  <span>GitHub</span>
                </div>
                <FiArrowUpRight className="text-textMuted group-hover:text-accentCyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/suman-maity-b84879292/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-bgPrimary/50 border border-borderDark/40 hover:border-accentCyan/50 hover:bg-accentCyan/5 transition-all text-xs font-mono"
              >
                <div className="flex items-center gap-2 text-textPrimary group-hover:text-accentCyan font-bold">
                  <FiLinkedin className="text-base text-accentCyan" />
                  <span>LinkedIn</span>
                </div>
                <FiArrowUpRight className="text-textMuted group-hover:text-accentCyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Col 4: Clock & Back To Top (2 cols) */}
          <div className="lg:col-span-2 rounded-2xl bg-bgCard/40 border border-borderDark/60 p-6 sm:p-8 flex flex-col justify-between items-center text-center space-y-6 hover:border-accentCyan/30 transition-all">
            <div>
              <span className="text-[10px] font-mono text-textMuted uppercase tracking-wider block mb-1">LOCAL TIME</span>
              <p className="text-xs font-mono text-accentCyan font-bold tracking-widest">
                KOLKATA [IST]
              </p>
              <p className="text-sm font-mono text-textPrimary font-extrabold mt-1">
                {time}
              </p>
            </div>

            <div>
              <MagneticButton strength={0.4} onClick={scrollToTop}>
                <button
                  className="w-14 h-14 rounded-full border border-accentCyan/40 bg-accentCyan/10 text-accentCyan hover:bg-accentCyan hover:text-bgPrimary flex items-center justify-center transition-all duration-300 shadow-lg shadow-accentCyan/10 group"
                  aria-label="Scroll to top"
                  title="Back to top"
                >
                  <FiArrowUp className="text-xl group-hover:-translate-y-1 transition-transform" />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Telemetry Row */}
        <div className="pt-6 border-t border-borderDark/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <ApiMetricsBadge />
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-matrix-mode'))}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 text-xs font-mono transition-all group shadow-lg"
            title="Toggle Green Matrix Code Rain Theme (Ctrl+Shift+M)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">MATRIX MODE</span>
            <kbd className="px-1.5 py-0.5 rounded bg-bgPrimary border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
              CTRL+SHIFT+M
            </kbd>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-textMuted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>INFRASTRUCTURE MONITORING ACTIVE</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-borderDark/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-textMuted gap-4">
          <p>© 2026 SUMAN MAITY • ALL RIGHTS RESERVED</p>
          <p className="text-right tracking-wider">DESIGNED & ENGINEERED FOR TRIONN LEVEL LUXURY EXPERIENCE</p>
        </div>
      </div>
    </footer>
  );
};
