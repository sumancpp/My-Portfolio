import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroCanvas } from '../components/canvas/HeroCanvas';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ProjectCard3D } from '../components/ui/ProjectCard3D';
import { FiArrowUpRight, FiZap, FiAward, FiBookOpen } from 'react-icons/fi';

const techStack = [
  'REACT.JS',
  'NODE.JS',
  'EXPRESS.JS',
  'WEBRTC',
  'SOCKET.IO',
  'TAILWIND CSS',
  'JAVA',
  'C++',
  'DOCKER',
  'MONGODB',
  'C'
];

const defaultFeaturedProjects = [
  {
    id: '1',
    title: 'TALENT AI',
    tagline: 'AI-Powered Resume Search, ATS & Technical Evaluation Platform',
    category: 'MERN Stack & Gemini AI',
    year: '2026',
    image: '/project-images/talentai.png',
    slug: 'talent-ai',
    demoUrl: 'https://talentai.sumann.in/',
    githubUrl: 'https://github.com/sumancpp/ai-resume-ats',
    description: 'Engineered an AI-powered ATS automating resume parsing, candidate ranking, skill extraction, recruiter summaries, Monaco Editor coding sandbox, WebRTC video interviews, and automated PDF offer letters.',
    tags: ['MERN Stack', 'Gemini AI', 'WebRTC', 'Socket.IO', 'Tailwind CSS'],
  },
  {
    id: '2',
    title: 'BAATCHEET',
    tagline: 'AI-Powered Real-Time Chat & Collaboration Platform',
    category: 'Real-Time / Socket.IO / WebRTC',
    year: '2025',
    image: '/project-images/baatcheet-logo.png',
    slug: 'baatcheet',
    demoUrl: 'https://baatcheet.sumann.in/',
    githubUrl: 'https://github.com/sumancpp/RealTimeChat',
    description: 'Built a scalable real-time messaging platform supporting JWT auth, WebRTC audio/video calling, browser screen sharing, collaborative whiteboard, disappearing Ghost Ink messages, and Gemini AI code review.',
    tags: ['MERN Stack', 'Socket.IO', 'WebRTC', 'Google Gemini AI'],
  },
  {
    id: '3',
    title: 'PRIVATE PROPERTY RENTAL',
    tagline: 'Clean & Responsive Property Discovery & Listing Platform',
    category: 'React.js / Context API / UI Design',
    year: '2025',
    image: '/project-images/private-property-rental.png',
    slug: 'property-rental',
    demoUrl: 'https://private-property-rental-by-suman.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Personal%20Property%20Rental',
    description: 'Built a Private Property Rental platform allowing users to discover and list diverse rental properties (Houses, Rooms, Cabins, Farm & Pool Houses, Shops, Forest Houses) with clean UI, search filtering, direct Gmail contact, and smooth animations.',
    tags: ['React.js', 'React Router', 'Context API', 'UI/UX Design'],
  }
];

const normalizeImagePath = (img?: string) => {
  if (!img) return '/project-images/talentai.png';
  if (img.startsWith('/project-images/')) return img;
  const filename = img.split('/').pop();
  return `/project-images/${filename}`;
};

const getProjectsFromCMS = () => {
  const saved = localStorage.getItem('suman_cms_projects');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p: any) => ({
          id: p.id || String(Date.now()),
          title: p.title || 'Untitled Project',
          category: p.category || 'MERN Stack',
          year: p.year || '2026',
          image: normalizeImagePath(p.image),
          tagline: p.tagline || p.description || '',
          slug: p.slug || (p.title ? p.title.toLowerCase().replace(/\s+/g, '-') : 'project'),
          demoUrl: p.demo || p.demoUrl || 'https://github.com/sumancpp',
          githubUrl: p.github || p.githubUrl || 'https://github.com/sumancpp',
          description: p.description || p.tagline || '',
          tags: p.tags || [p.category || 'MERN Stack']
        }));
      }
    } catch {
      // Fallback
    }
  }
  return defaultFeaturedProjects;
};

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>(getProjectsFromCMS);

  useEffect(() => {
    // Load from local storage
    const cmsProjects = getProjectsFromCMS();
    setFeaturedProjects(cmsProjects);

    // Fetch from Backend API if available
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const apiProjects = data.data.map((p: any) => ({
            id: p._id || p.id,
            title: p.title,
            category: p.category || 'MERN Stack',
            year: p.year || '2026',
            image: p.image || '/talentai.png',
            tagline: p.tagline || p.description || '',
            slug: p.slug,
            demoUrl: p.demoUrl || p.demo || 'https://github.com/sumancpp',
            githubUrl: p.githubUrl || p.github || 'https://github.com/sumancpp',
            description: p.description || p.tagline || '',
            tags: p.tags || [p.category || 'MERN Stack']
          }));
          setFeaturedProjects(apiProjects);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative">
      {/* 3D WebGL Canvas Hero with Portrait */}
      <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <HeroCanvas />

        <div className="relative z-10 my-auto pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accentCyan/10 border border-accentCyan/30 text-accentCyan font-mono text-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-accentCyan animate-ping" />
            AVAILABLE FOR FULL-STACK & AI ROLES
          </div>

          {/* Hero Grid: Text Left + Portrait Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-26 items-start">
            {/* Left: Name & Title */}
            <div className="lg:col-span-6">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold text-textPrimary tracking-tighter leading-none mb-6">
                SUMAN<br />MAITY
                <div className="flex items-center gap-3 flex-wrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 pb-1 pr-6">
                  <span>FULL-STACK </span>
                  <span className="text-accentCyan text-outline inline-block pr-4 py-1">DEVELOPER</span>
                </div>
              </h1>

              <p className="text-textSecondary text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-medium">
               Full-Stack Developer building production-ready web applications with React, Node.js, MongoDB, WebRTC, Socket.IO, and Google Gemini AI. Final-year Computer Science & Engineering student focused on scalable software and real-world engineering problems.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link to="/projects">
                  <MagneticButton strength={0.4}>
                    <div className="px-8 py-4 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-sm hover:bg-white hover:shadow-xl hover:shadow-accentCyan/30 transition-all flex items-center gap-2">
                      <span>VIEW PROJECTS</span>
                      <FiArrowUpRight className="text-lg" />
                    </div>
                  </MagneticButton>
                </Link>

                <Link to="/contact">
                  <MagneticButton strength={0.3}>
                    <div className="px-8 py-4 rounded-full border border-borderDark bg-bgSecondary text-textPrimary font-display font-bold text-sm hover:border-accentCyan hover:text-accentCyan transition-all">
                      GET IN TOUCH
                    </div>
                  </MagneticButton>
                </Link>
              </div>
            </div>

            {/* Right: Clean Portrait */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl transform lg:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-accentCyan/25 rounded-full blur-3xl -z-10" />
                <img
                  src="/suman-maity-portrait.png"
                  alt="Suman Maity"
                  style={{ transform: 'scaleX(-1)' }}
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_45px_rgba(0,240,255,0.3)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Bar */}
        <div className="relative z-10 pt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-borderDark/60">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs font-mono text-textMuted uppercase">LOCATION</div>
              <div className="text-sm font-display font-bold text-textPrimary">Kolkata, WB, India</div>
            </div>
            <div className="h-8 w-px bg-borderDark" />
            <div>
              <div className="text-xs font-mono text-textMuted uppercase">DEGREE</div>
              <div className="text-sm font-display font-bold text-textPrimary">B.Tech CSE (2027)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-textMuted">
            <FiZap className="text-accentCyan" />
            <span>MERN • WEBRTC • GEMINI AI • JAVA</span>
          </div>
        </div>
      </section>

      {/* Infinite Tech Ticker */}
      <section className="py-8 bg-bgSecondary border-y border-borderDark overflow-hidden">
        <div className="flex space-x-12 animate-marquee whitespace-nowrap">
          {techStack.concat(techStack).map((tech, idx) => (
            <span key={idx} className="font-display font-bold text-lg sm:text-xl text-textMuted/60 hover:text-accentCyan transition-colors cursor-default flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accentCyan" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Bio & Highlights Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-8">
          <div>
            <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
             ENGINEER BACKGROUND & VISION
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-textPrimary mt-2 leading-tight">
              Building High-Performance <span className="text-outline">Digital Systems.</span>
            </h2>
          </div>

          <p className="text-textSecondary text-base sm:text-lg leading-relaxed">
           I am a Full-Stack Developer passionate about transforming complex ideas into scalable, production-ready software. My work spans modern frontend development, backend architecture, real-time WebRTC communication, Socket.IO systems, and AI-powered application features with Google Gemini. I focus on combining solid engineering, performance, and refined user experiences to build software that feels as good as it works.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-borderDark">
            <div className="flex items-start gap-3 p-4 rounded-2xl glass-panel border border-borderDark">
              <FiAward className="text-accentCyan text-xl shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-bold text-sm text-textPrimary">OMTECH 2026 Runner-Up</h4>
                <p className="text-xs text-textMuted mt-0.5">Competitive Hackathon Winner</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl glass-panel border border-borderDark">
              <FiBookOpen className="text-accentCyan text-xl shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-bold text-sm text-textPrimary">CodeAlpha Web Intern</h4>
                <p className="text-xs text-textMuted mt-0.5">Oct 2024 – Jan 2025</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link to="/about">
              <MagneticButton strength={0.3}>
                <div className="px-6 py-3 rounded-full border border-borderDark text-textPrimary font-display font-bold text-xs hover:border-accentCyan hover:text-accentCyan transition-colors flex items-center gap-2">
                  READ FULL BIOGRAPHY <FiArrowUpRight />
                </div>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-borderDark">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
              FEATURED FULL STACK & AI PROJECTS
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary mt-2">
              Innovative Systems
            </h2>
          </div>

          <Link to="/projects">
            <MagneticButton strength={0.3}>
              <span className="text-accentCyan font-display font-bold text-sm hover:underline flex items-center gap-2">
                VIEW ALL PROJECTS ({featuredProjects.length}) <FiArrowUpRight />
              </span>
            </MagneticButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featuredProjects.map((proj) => (
            <ProjectCard3D key={proj.id} project={proj} />
          ))}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 bg-bgSecondary border-y border-borderDark px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { number: '7.64', label: 'B.Tech SGPA (Till 6th Sem)' },
            { number: '2+', label: 'Flagship Full Stack Apps' },
            { number: '2026', label: 'Hackathon Runner-Up (OMTECH)' },
            { number: '100%', label: 'Commitment to Quality' },
          ].map((stat, idx) => (
            <div key={idx} className="p-6">
              <div className="font-display font-extrabold text-4xl md:text-6xl text-accentCyan mb-2">
                {stat.number}
              </div>
              <div className="text-xs font-mono text-textMuted uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
