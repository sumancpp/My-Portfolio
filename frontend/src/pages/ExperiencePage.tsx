import React from 'react';
import { FiBriefcase, FiBookOpen, FiAward, FiCheck } from 'react-icons/fi';

const timeline = [
  {
    type: 'Hackathon Achievement',
    role: 'Runner-Up — OMTECH 2026 Hackathon',
    company: 'OMTECH Competitive Hackathon',
    period: '2026',
    bullets: [
      'Developed an innovative software solution in a competitive hackathon and secured Runner-Up position.',
      'Demonstrated high-speed full-stack development, rapid prototyping, and real-time system architecture under strict time constraints.'
    ],
    tech: ['React-Native', 'Innovation', 'Hackathon']
  },
  {
    type: 'Work Experience',
    role: 'Web Developer Intern',
    company: 'CodeAlpha',
    period: 'OCT 2024 – JAN 2025',
    bullets: [
      'Developed responsive web applications using HTML, CSS, JavaScript and React.js.',
      'Built reusable UI components, integrated REST APIs and collaborated in Agile development.',
      'Debugged, tested and optimized application performance.'
    ],
    tech: ['JavaScript (ES6+)', 'HTML5 & CSS3', 'REST APIs',]
  },
];

export const ExperiencePage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          CAREER PROGRESSION & MILESTONES
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-textPrimary mt-4">
          Experience & <span className="text-outline">Education</span>
        </h1>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-borderDark pl-8 md:pl-12 space-y-16">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Icon Node */}
            <div className="absolute -left-[45px] md:-left-[61px] top-0 w-10 h-10 rounded-full bg-bgSecondary border border-accentCyan text-accentCyan flex items-center justify-center text-lg shadow-xl group-hover:bg-accentCyan group-hover:text-bgPrimary transition-all duration-300">
              {item.type === 'Hackathon Achievement' ? (
                <FiAward />
              ) : item.type === 'Work Experience' ? (
                <FiBriefcase />
              ) : (
                <FiBookOpen />
              )}
            </div>

            <div className="p-8 md:p-10 rounded-3xl glass-panel border border-borderDark group-hover:border-accentCyan/50 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-accentCyan px-3 py-1 rounded-full bg-accentCyan/10 border border-accentCyan/20 inline-block w-fit">
                  {item.period}
                </span>
                <span className="text-xs font-mono text-textMuted uppercase tracking-wider">{item.type}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-textPrimary mt-2">{item.role}</h2>
              <h3 className="text-lg font-display text-textSecondary font-semibold mb-6">{item.company}</h3>

              <ul className="space-y-3 mb-8 text-textSecondary text-sm md:text-base leading-relaxed">
                {item.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheck className="text-accentCyan text-lg shrink-0 mt-1" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {item.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-bgPrimary border border-borderDark text-textMuted group-hover:text-accentCyan transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
