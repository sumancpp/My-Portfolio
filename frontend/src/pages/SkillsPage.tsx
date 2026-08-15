import React from 'react';
import { GitHubActivityWidget } from '../components/ui/GitHubActivityWidget';
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiWebrtc,
  SiGoogle,
  SiCplusplus,
  SiC,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiJsonwebtokens,
} from 'react-icons/si';
import { FaJava, FaBrain } from 'react-icons/fa';
import {
  FiLayout,
  FiServer,
  FiZap,
  FiCpu,
  FiCode,
  FiLayers,
  FiGlobe,
  FiShare2,
  FiMonitor,
  FiRadio,
  FiSliders,
  FiFileText,
  FiEdit3,
  FiCloud,
  FiCheckCircle,
} from 'react-icons/fi';

interface Skill {
  name: string;
  level: number;
  logo: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <FiLayout className="text-3xl text-accentCyan" />,
    summary: 'React.js · JavaScript · HTML5 · CSS3 · Tailwind CSS · Redux Toolkit',
    skills: [
      { name: 'React.js', level: 95, logo: <SiReact className="text-cyan-400 text-xl" /> },
      { name: 'JavaScript', level: 95, logo: <SiJavascript className="text-yellow-400 text-xl" /> },
      { name: 'HTML5', level: 95, logo: <SiHtml5 className="text-orange-500 text-xl" /> },
      { name: 'CSS3', level: 90, logo: <SiCss className="text-blue-400 text-xl" /> },
      { name: 'Tailwind CSS', level: 95, logo: <SiTailwindcss className="text-teal-400 text-xl" /> },
      { name: 'Redux Toolkit', level: 88, logo: <SiRedux className="text-purple-400 text-xl" /> },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <FiServer className="text-3xl text-accentCyan" />,
    summary: 'Node.js · Express.js · REST APIs · JWT Authentication · MongoDB · Mongoose',
    skills: [
      { name: 'Node.js', level: 92, logo: <SiNodedotjs className="text-green-500 text-xl" /> },
      { name: 'Express.js', level: 92, logo: <SiExpress className="text-white text-xl" /> },
      { name: 'REST APIs', level: 94, logo: <FiGlobe className="text-blue-400 text-xl" /> },
      { name: 'JWT Authentication', level: 90, logo: <SiJsonwebtokens className="text-pink-400 text-xl" /> },
      { name: 'MongoDB', level: 90, logo: <SiMongodb className="text-green-400 text-xl" /> },
      { name: 'Mongoose', level: 90, logo: <SiMongodb className="text-emerald-500 text-xl" /> },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-Time Systems',
    icon: <FiZap className="text-3xl text-accentCyan" />,
    summary: 'Socket.IO · WebRTC · Peer-to-Peer Communication · Screen Sharing · Real-Time Signaling',
    skills: [
      { name: 'Socket.IO', level: 92, logo: <SiSocketdotio className="text-white text-xl" /> },
      { name: 'WebRTC', level: 88, logo: <SiWebrtc className="text-yellow-400 text-xl" /> },
      { name: 'Peer-to-Peer Communication', level: 88, logo: <FiShare2 className="text-cyan-400 text-xl" /> },
      { name: 'Screen Sharing', level: 86, logo: <FiMonitor className="text-indigo-400 text-xl" /> },
      { name: 'Real-Time Signaling', level: 88, logo: <FiRadio className="text-emerald-400 text-xl" /> },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Intelligent Applications',
    icon: <FiCpu className="text-3xl text-accentCyan" />,
    summary: 'Google Gemini API · Generative AI · AI Integration · Prompt Engineering · AI Code Analysis · AI Summarization',
    skills: [
      { name: 'Google Gemini API', level: 92, logo: <SiGoogle className="text-blue-400 text-xl" /> },
      { name: 'Generative AI', level: 90, logo: <FaBrain className="text-purple-400 text-xl" /> },
      { name: 'AI Integration', level: 92, logo: <FiCpu className="text-accentCyan text-xl" /> },
      { name: 'Prompt Engineering', level: 90, logo: <FiSliders className="text-amber-400 text-xl" /> },
      { name: 'AI Code Analysis', level: 88, logo: <FiCode className="text-green-400 text-xl" /> },
      { name: 'AI Summarization', level: 90, logo: <FiFileText className="text-pink-400 text-xl" /> },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: <FiCode className="text-3xl text-accentCyan" />,
    summary: 'Java · JavaScript · C++ · C',
    skills: [
      { name: 'Java', level: 85, logo: <FaJava className="text-red-400 text-xl" /> },
      { name: 'JavaScript', level: 95, logo: <SiJavascript className="text-yellow-400 text-xl" /> },
      { name: 'C++', level: 88, logo: <SiCplusplus className="text-blue-500 text-xl" /> },
      { name: 'C', level: 82, logo: <SiC className="text-blue-400 text-xl" /> },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infrastructure',
    icon: <FiLayers className="text-3xl text-accentCyan" />,
    summary: 'Git · GitHub · Docker · Cloudinary · Postman · Monaco Editor · PDFKit',
    skills: [
      { name: 'Git', level: 92, logo: <SiGit className="text-orange-500 text-xl" /> },
      { name: 'GitHub', level: 94, logo: <SiGithub className="text-white text-xl" /> },
      { name: 'Docker', level: 82, logo: <SiDocker className="text-blue-400 text-xl" /> },
      { name: 'Cloudinary', level: 88, logo: <FiCloud className="text-sky-400 text-xl" /> },
      { name: 'Postman', level: 90, logo: <SiPostman className="text-orange-400 text-xl" /> },
      { name: 'Monaco Editor', level: 86, logo: <FiEdit3 className="text-teal-400 text-xl" /> },
      { name: 'PDFKit', level: 85, logo: <FiFileText className="text-red-400 text-xl" /> },
    ],
  },
];

export const SkillsPage: React.FC = () => {
  return (
    <div className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      {/* Header */}
      <div>
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase flex items-center gap-2">
          <FiCheckCircle className="text-accentCyan" /> TECHNICAL CAPABILITIES
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold text-textPrimary mt-4 leading-tight">
          Core Stack & <span className="text-accentCyan font-extrabold">Engineering Expertise</span>
        </h1>
        <p className="text-textSecondary mt-4 max-w-3xl text-base md:text-lg leading-relaxed">
          Comprehensive breakdown of my technical proficiencies across modern frontend engineering, backend services, real-time protocols, generative AI architectures, programming languages, and dev infrastructure.
        </p>
      </div>

      {/* Grid of 6 Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-8 rounded-3xl glass-panel border border-borderDark hover:border-accentCyan/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-bgPrimary border border-borderDark shadow-inner group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-xs font-mono text-textMuted px-3 py-1 rounded-full bg-bgPrimary border border-borderDark">
                  {cat.skills.length} Techs
                </span>
              </div>

              <h2 className="text-2xl font-display font-bold text-textPrimary mb-3">
                {cat.title}
              </h2>

              {/* Text summary line matching standard text format */}
              <div className="mb-6 pb-4 border-b border-borderDark/60">
                <p className="text-xs font-mono text-accentCyan/90 leading-relaxed">
                  {cat.summary}
                </p>
              </div>

              {/* Detailed skill list with logos and animated bars */}
              <div className="space-y-5">
                {cat.skills.map((s, i) => (
                  <div key={i} className="group/item">
                    <div className="flex items-center justify-between text-sm font-display font-semibold mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-bgPrimary border border-borderDark group-hover/item:border-accentCyan/50 transition-colors">
                          {s.logo}
                        </div>
                        <span className="text-textPrimary group-hover/item:text-accentCyan transition-colors">
                          {s.name}
                        </span>
                      </div>
                      <span className="text-accentCyan font-mono text-xs">{s.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-bgPrimary rounded-full overflow-hidden border border-borderDark/80">
                      <div
                        className="h-full bg-accentCyan rounded-full transition-all duration-1000 group-hover/item:bg-white"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Live Activity & Contribution Widget */}
      <div className="pt-8">
        <GitHubActivityWidget />
      </div>
    </div>
  );
};

