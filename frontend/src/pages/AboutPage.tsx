import React from 'react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { FiDownload, FiCheckCircle, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    const pdfUrl = '/Suman_Maity_Resume.pdf';
    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Suman_Maity_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const fallbackLink = document.createElement('a');
      fallbackLink.href = pdfUrl;
      fallbackLink.download = 'Suman_Maity_Resume.pdf';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-20">
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          WHO I AM & WHAT DRIVES ME
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-textPrimary mt-4 leading-tight">
        Building Scalable Software & <span className="text-outline">Intelligent Web Applications.</span>
        </h1>
      </div>

      {/* Main Grid: Card & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden border border-borderDark shadow-2xl bg-bgSecondary p-8 space-y-6 relative group">
            <div className="flex items-center gap-4 border-b border-borderDark pb-6">
              <div className="w-16 h-16 rounded-full bg-accentCyan/10 border border-accentCyan/30 flex items-center justify-center font-display font-extrabold text-2xl text-accentCyan">
                SM
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-textPrimary">Suman Maity</h3>
                <p className="text-accentCyan text-xs font-mono">Full-Stack & AI Software Engineer</p>
                <p className="text-textMuted text-xs font-mono">Howrah, India</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-borderDark/60 gap-1">
                <span className="text-textMuted font-mono text-[10px] sm:text-xs uppercase">DEGREE</span>
                <span className="font-display font-semibold text-textPrimary">B.Tech CSE (2027)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-borderDark/60 gap-1">
                <span className="text-textMuted font-mono text-[10px] sm:text-xs uppercase">INSTITUTION</span>
                <span className="font-display font-semibold text-textPrimary text-left sm:text-right">OmDayal Group of Inst.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-borderDark/60 gap-1">
                <span className="text-textMuted font-mono text-[10px] sm:text-xs uppercase">ACADEMIC SGPA</span>
                <span className="font-display font-bold text-accentCyan">7.64 / 10 (Till 6th Sem)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-borderDark/60 gap-1">
                <span className="text-textMuted font-mono text-[10px] sm:text-xs uppercase">INTERNSHIP</span>
                <span className="font-display font-semibold text-textPrimary">CodeAlpha Web Intern</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-1">
                <span className="text-textMuted font-mono text-[10px] sm:text-xs uppercase">HONOR</span>
                <span className="font-display font-semibold text-accentCyan">OMTECH '26 Hackathon Runner-Up</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-textSecondary text-lg leading-relaxed">
          <h2 className="text-3xl font-display font-bold text-textPrimary">
            Building scalable software where engineering meets intelligent experiences.
          </h2>
          <p>
            I’m a final-year Computer Science & Engineering student and Full-Stack Developer focused on turning complex ideas into reliable, production-ready software.
          </p>
          <p>
           I work across the stack—from React and modern UI systems to Node.js, Express, MongoDB, real-time Socket.IO/WebRTC communication, and AI-powered features with Google Gemini. I’m particularly interested in solving challenging engineering problems involving scalability, real-time systems, backend architecture, and seamless user experiences.
          </p>

          <div className="pt-4 flex items-center gap-6 flex-wrap">
            <a href="/Suman_Maity_Resume.pdf" download="Suman_Maity_Resume.pdf" onClick={handleDownloadResume}>
              <MagneticButton strength={0.4}>
                <div className="px-8 py-4 rounded-full bg-accentCyan text-bgPrimary font-display font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-accentCyan/20">
                  <FiDownload className="text-lg" /> DOWNLOAD RESUME PDF
                </div>
              </MagneticButton>
            </a>
            <Link to="/contact">
              <MagneticButton strength={0.3}>
                <span className="text-textPrimary font-display font-bold text-sm hover:text-accentCyan transition-colors">
                  START A CONVERSATION →
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Languages & Strengths Grid */}
      <div className="mb-28">
        <h2 className="text-3xl font-display font-bold text-textPrimary mb-8">Linguistic Fluency & Communication</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { lang: 'English', level: 'Professional & Technical Proficiency', icon: <FiGlobe className="text-accentCyan text-2xl" /> },
            { lang: 'Hindi', level: 'Native / Full Professional Proficiency', icon: <FiGlobe className="text-accentCyan text-2xl" /> },
            { lang: 'Bengali', level: 'Native / Mother Tongue', icon: <FiGlobe className="text-accentCyan text-2xl" /> }
          ].map((l, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel border border-borderDark flex items-center gap-4">
              <div className="p-3 rounded-xl bg-bgPrimary border border-borderDark">{l.icon}</div>
              <div>
                <h3 className="font-display font-bold text-textPrimary text-lg">{l.lang}</h3>
                <p className="text-xs font-mono text-textMuted">{l.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Engineering Principles */}
      <div className="border-t border-borderDark pt-20">
        <h2 className="text-3xl font-display font-bold text-textPrimary mb-12">
          Engineering & Design Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Scalable Software Architecture',
              desc: 'Designing maintainable full-stack applications with React, Node.js, Express.js, MongoDB, REST APIs, and secure authentication.'
            },
            {
              title: 'Real-Time & Intelligent Systems',
              desc: 'Building real-time applications with Socket.IO and WebRTC while integrating Google Gemini AI to create practical intelligent features.'
            },
            {
              title: 'Performance-Driven Design',
              desc: 'Crafting responsive, high-performance interfaces with thoughtful animations, micro-interactions, and modern UI/UX principles.'
            }
          ].map((principle, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-bgSecondary border border-borderDark hover:border-accentCyan/40 transition-all">
              <FiCheckCircle className="text-accentCyan text-3xl mb-4" />
              <h3 className="text-xl font-display font-bold text-textPrimary mb-2">{principle.title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
