import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/api';
import {
  FiFolder,
  FiCpu,
  FiMessageSquare,
  FiLogOut,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheckCircle,
  FiAward,
  FiFileText,
  FiSave,
  FiX,
  FiUser
} from 'react-icons/fi';

// Initial CMS Mock State (backed by localStorage for persistence across reloads)
const getInitialProjects = () => {
  const saved = localStorage.getItem('suman_cms_projects');
  if (saved) return JSON.parse(saved);
  return [
    {
      id: '1',
      title: 'TALENT AI',
      category: 'Full Stack / MERN & Gemini AI',
      projectType: 'Full Stack',
      year: '2026',
      image: '/project-images/talentai.png',
      tagline: 'AI-Powered Resume Search, ATS & Technical Evaluation Platform',
      slug: 'talent-ai',
      demoUrl: 'https://talentai.sumann.in/',
      demo: 'https://talentai.sumann.in/',
      githubUrl: 'https://github.com/sumancpp/ai-resume-ats',
      github: 'https://github.com/sumancpp/ai-resume-ats',
      description: 'Engineered an AI-powered ATS automating resume parsing, candidate ranking, skill extraction, recruiter summaries, Monaco Editor coding sandbox, WebRTC video interviews, and automated PDF offer letters.',
      tags: ['Full Stack', 'MERN Stack', 'Gemini AI', 'WebRTC', 'Socket.IO', 'Tailwind CSS']
    },
    {
      id: '2',
      title: 'BAATCHEET',
      category: 'Full Stack / Socket.IO & WebRTC',
      projectType: 'Full Stack',
      year: '2025',
      image: '/project-images/baatcheet-logo.png',
      tagline: 'AI Powered Real-Time Chat & Collaboration Platform',
      slug: 'baatcheet',
      demoUrl: 'https://baatcheet.sumann.in/',
      demo: 'https://baatcheet.sumann.in/',
      githubUrl: 'https://github.com/sumancpp/RealTimeChat',
      github: 'https://github.com/sumancpp/RealTimeChat',
      description: 'Built a scalable real-time messaging platform supporting JWT auth, WebRTC audio/video calling, browser screen sharing, collaborative whiteboard, disappearing Ghost Ink messages, and Gemini AI code review.',
      tags: ['Full Stack', 'MERN Stack', 'Socket.IO', 'WebRTC', 'Google Gemini AI']
    },
    {
      id: '3',
      title: 'SHIFRA 2.0',
      category: 'Frontend / React.js & Web Speech API',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/Shifra2.0.png',
      tagline: 'Voice-Powered Virtual Assistant with Real-Time Speech Recognition & Synthesis',
      slug: 'shifra-2',
      demoUrl: 'https://virtual-assistant-eight-omega.vercel.app/',
      demo: 'https://virtual-assistant-eight-omega.vercel.app/',
      githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant',
      github: 'https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant',
      description: 'Engineered a voice-powered virtual assistant built with React.js, Speech Recognition, and Web Speech API. Features real-time voice input transcription, AI responses, microphone permission handling, and dynamic UI states.',
      tags: ['Frontend', 'React.js', 'Web Speech API', 'Speech Recognition', 'AI Integration', 'Tailwind CSS']
    },
    {
      id: '4',
      title: 'SUMAN CAFE (FOOD DELIVERY)',
      category: 'Frontend / React.js & Redux',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/Food_delivery.png',
      tagline: 'Responsive Food Delivery Platform with Category Filtering & Dynamic Cart System',
      slug: 'food-delivery',
      demoUrl: 'https://suman-cafe.netlify.app/',
      demo: 'https://suman-cafe.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery',
      github: 'https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery',
      description: 'Built a feature-rich Food Delivery application in React.js featuring category-based food filtering, dynamic cart management with real-time add/remove calculations, custom timed toast notifications, Redux + Context state management, and responsive UI design.',
      tags: ['Frontend', 'React.js', 'Redux', 'Context API', 'Tailwind CSS', 'Netlify']
    },
    {
      id: '5',
      title: 'BACKGROUND REMOVER TOOL',
      category: 'Frontend / JavaScript & Remove.bg API',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/RemoveBg.png',
      tagline: 'Instant Web-Based Background Removal Tool with Real-Time Preview & Transparent PNG Download',
      slug: 'background-remover',
      demoUrl: 'https://remove-image-background-and-download.netlify.app/',
      demo: 'https://remove-image-background-and-download.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover',
      github: 'https://github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover',
      description: 'Built a web-based background removal tool using Vanilla JavaScript, HTML5, CSS3, and the Remove.bg API. Supports instant image file upload via FileReader API, before/after side-by-side preview, transparent PNG download, and responsive UI transitions.',
      tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Remove.bg API', 'FileReader API', 'Netlify']
    },
    {
      id: '6',
      title: 'YOUR GYM CENTER',
      category: 'Frontend / HTML5 & CSS3',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/gym.png',
      tagline: 'Sleek, Responsive & Interactive Fitness & Gym Website built from scratch',
      slug: 'your-gym',
      demoUrl: 'https://your-gym-center.netlify.app/',
      demo: 'https://your-gym-center.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Your%20Gym',
      github: 'https://github.com/sumancpp/Projects/tree/main/Your%20Gym',
      description: 'Built a modern, fully functional Gym & Fitness website using HTML5, CSS3, and JavaScript. Features responsive layout design, interactive membership enrollment forms, dynamic content filtering, smooth scroll animations, and user-friendly navigation.',
      tags: ['Frontend', 'HTML5 & CSS3', 'JavaScript', 'Responsive Web Design', 'CSS Animations', 'Netlify']
    },
    {
      id: '7',
      title: 'REAL-TIME WEATHER APP',
      category: 'Frontend / JavaScript & Weather API',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/weather.png',
      tagline: 'Real-Time Global Weather Data Fetching with Location Search & Dynamic Climate Metrics',
      slug: 'weather-app',
      demoUrl: 'https://weather-app-by-suman.netlify.app/',
      demo: 'https://weather-app-by-suman.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Weather%20App',
      github: 'https://github.com/sumancpp/Projects/tree/main/Weather%20App',
      description: 'Built a responsive Weather web application using HTML5, CSS3, and Vanilla JavaScript (Fetch API). Fetches real-time temperature, humidity, wind speed, atmospheric condition icons, and location search results via live Weather API integration.',
      tags: ['Frontend', 'JavaScript (ES6+)', 'OpenWeather API', 'Fetch API', 'HTML5 & CSS3', 'Netlify']
    },
    {
      id: '8',
      title: 'RESPONSIVE SNAKE GAME',
      category: 'Frontend / JavaScript & HTML5 Canvas',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/snakeGame.png',
      tagline: 'Classic Interactive Arcade Snake Game with Cross-Device Touch & Keyboard Controls',
      slug: 'snake-game',
      demoUrl: 'https://suman-snake-game.netlify.app/',
      demo: 'https://suman-snake-game.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Snake%20Game',
      github: 'https://github.com/sumancpp/Projects/tree/main/Snake%20Game',
      description: 'Engineered a fully responsive, cross-device Snake game using HTML5, CSS3, and Vanilla JavaScript. Features real-time collision detection, dynamic score tracking, adaptive grid rendering, touch gesture controls for mobile/tablet, and keyboard arrow controls for desktop.',
      tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 Canvas', 'Game Development', 'Responsive Design', 'Netlify']
    },
    {
      id: '9',
      title: 'TIC TAC TOE GAME',
      category: 'Frontend / JavaScript & Game Logic',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/TicTacToe.png',
      tagline: 'Interactive 2-Player & AI Web Game with Win Pattern Detection & Score Tracking',
      slug: 'tic-tac-toe',
      demoUrl: 'https://aquamarine-khapse-997869.netlify.app/',
      demo: 'https://aquamarine-khapse-997869.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe',
      github: 'https://github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe',
      description: 'Built a classic interactive Tic Tac Toe web game using HTML5, CSS3, and Vanilla JavaScript. Features real-time win condition evaluation algorithm, interactive turn indicators, game reset capabilities, score tracking, and responsive UI design.',
      tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Game Logic', 'DOM Manipulation', 'Netlify']
    },
    {
      id: '10',
      title: 'REAL-TIME EMAIL VALIDATOR',
      category: 'Frontend / JavaScript & Validation API',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/email.png',
      tagline: 'Real-Time Email Address Verification & MX Record/Syntax Checking Utility',
      slug: 'email-validator',
      demoUrl: 'https://jocular-souffle-aaf03b.netlify.app/',
      demo: 'https://jocular-souffle-aaf03b.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Email%20Validator',
      github: 'https://github.com/sumancpp/Projects/tree/main/Email%20Validator',
      description: 'Engineered a web-based Email Validation tool using HTML5, CSS3, and Vanilla JavaScript. Verifies email address syntax, domain MX record validity, disposable email detection, and delivers instant visual status feedback.',
      tags: ['Frontend', 'JavaScript (ES6+)', 'Regex Validation', 'API Integration', 'HTML5 & CSS3', 'Netlify']
    },
    {
      id: '11',
      title: 'SPOTIFY MUSIC PLAYER',
      category: 'Frontend / JavaScript & HTML5 Audio',
      projectType: 'Frontend',
      year: '2026',
      image: '/project-images/spotify.png',
      tagline: 'Functional Spotify Web Player Clone with Custom Seek Bar, Playlist Tracks & Audio Controls',
      slug: 'spotify-player',
      demoUrl: 'https://stately-llama-c0f7e4.netlify.app/',
      demo: 'https://stately-llama-c0f7e4.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Spotify',
      github: 'https://github.com/sumancpp/Projects/tree/main/Spotify',
      description: 'Engineered a functional Spotify web application using HTML5, CSS3, and Vanilla JavaScript. Features real-time audio playback controls (Play, Pause, Next, Previous), custom seek bar time updates, volume sliders, playlist track switching, and dark Spotify UI styling.',
      tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 Audio API', 'Spotify UI', 'CSS Grid & Flexbox', 'Netlify']
    },
    {
      id: '12',
      title: 'PRIVATE PROPERTY RENTAL',
      category: 'Frontend / React.js & Context API',
      projectType: 'Frontend',
      year: '2025',
      image: '/project-images/private-property-rental.png',
      tagline: 'Clean & Responsive Property Discovery & Listing Platform',
      slug: 'property-rental',
      demoUrl: 'https://private-property-rental-by-suman.netlify.app/',
      demo: 'https://private-property-rental-by-suman.netlify.app/',
      githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Personal%20Property%20Rental',
      github: 'https://github.com/sumancpp/React-Projects/tree/main/Personal%20Property%20Rental',
      description: 'Built a Private Property Rental platform allowing users to discover and list diverse rental properties (Houses, Rooms, Cabins, Farm & Pool Houses, Shops, Forest Houses) with clean UI, search filtering, direct Gmail contact, and smooth animations.',
      tags: ['Frontend', 'React.js', 'React Router', 'Context API', 'UI/UX Design', 'Tailwind CSS']
    }
  ];
};

const getInitialCertificates = () => {
  const saved = localStorage.getItem('suman_cms_certs');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
  }
  return [
    {
      id: '1',
      title: 'OMTECH 2026 Hackathon - 1st Runner-Up Certificate of Merit',
      issuer: 'OmDayal Group of Institutions (Department of CSE, IIC & IQAC)',
      date: 'MAY 2026',
      image: '/project-images/omtech-certificate.png',
      desc: 'Awarded 1st Runner-Up at the OMTECH 2026 Hackathon Program for building AuraVision – Accessibility for Everyone. Features Text-to-Image generation for blind users (Hindi, English & Bengali), 3-language Morse Code system for deaf users, offline local AI chatbot, and Text-to-Sign & Sign-to-Text conversion.'
    },
    {
      id: '2',
      title: 'CodeAlpha Virtual Web Development Internship - Certificate of Completion',
      issuer: 'CodeAlpha (Student ID: CA/S3/8251)',
      date: 'JAN 2025',
      image: '/project-images/codealpha-certificate.png',
      desc: 'Successfully completed a 3-month Virtual Web Development Internship at CodeAlpha (10th Oct 2024 to 10th Jan 2025). Gained hands-on experience building frontend web applications with React.js, JavaScript (ES6+), REST API integration, and responsive UI design.'
    },
    {
      id: '3',
      title: 'TechZeathon 2026 National Hackfest - Certificate of Participation',
      issuer: 'Swami Vivekananda Institute of Science and Technology (SVIST)',
      date: 'MAY 2026',
      image: '/project-images/techzeathon-2026-certificate.png',
      desc: 'Participated in TechZeathon 2026 National Hackfest organized by SVIST & Institution\'s Innovation Council on 28th–29th May 2026 under the theme "Innovate • Collaborate • Sustain".'
    },
    {
      id: '4',
      title: 'VOYAGE 2025 Technical Fest - Project Exhibition & Poster Presentation',
      issuer: 'OmDayal Group of Institutions (IIC & IQAC)',
      date: 'APR 2025',
      image: '/project-images/voyage-2025-certificate.png',
      desc: 'Participated in the Project Exhibition & Poster Presentation at VOYAGE 2025 Technical Fest organized by IIC & IQAC at OmDayal Group of Institutions on 11th–12th April 2025.'
    }
  ];
};

const getInitialSiteContent = () => {
  const saved = localStorage.getItem('suman_cms_site');
  if (saved) return JSON.parse(saved);
  return {
    name: 'Suman Maity',
    headline: 'FULL-STACK & AI ENGINEER',
    subtext: 'Final-year B.Tech CSE student at OmDayal Group of Institutions (7.64 SGPA). Specializing in MERN stack development, AI-powered systems (Google Gemini AI), real-time streaming (WebRTC, Socket.IO), and Java backend engineering.',
    email: 'suuman.maity@gmail.com',
    phone: '+91 8597433833',
    location: 'Howrah, India',
    portraitUrl: '/suman-maity-portrait.jpg',
    sgpa: '7.64'
  };
};

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'certificates' | 'site_content' | 'messages'>('overview');
  const navigate = useNavigate();

  // CMS State
  const [projects, setProjects] = useState(getInitialProjects);
  const [certificates, setCertificates] = useState(getInitialCertificates);
  const [siteContent, setSiteContent] = useState(getInitialSiteContent);
  const [messages, setMessages] = useState([
    { id: '1', name: 'Tech Recruiter', email: 'recruiter@techcorp.com', subject: 'Full-Stack Developer Opportunity', date: 'AUG 2026', body: 'We reviewed your TalentAI project and would love to schedule an interview.' },
    { id: '2', name: 'Startup Founder', email: 'founder@ai-studio.io', subject: 'Gemini AI Consulting', date: 'AUG 2026', body: 'Looking for a WebRTC & Gemini AI specialist to assist with a real-time web platform.' }
  ]);

  // Modals / Editors
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({
    id: '',
    title: '',
    slug: '',
    projectType: 'Frontend',
    category: 'Frontend / React.js',
    year: '2026',
    image: '/project-images/',
    tagline: '',
    demoUrl: '',
    githubUrl: '',
    description: '',
    tags: ''
  });

  const [isEditingCert, setIsEditingCert] = useState(false);
  const [currentCert, setCurrentCert] = useState<any>({ id: '', title: '', issuer: '', date: '2026', desc: '', image: '' });

  const [saveAlert, setSaveAlert] = useState('');

  const triggerAlert = (msg: string) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('suman_admin_authenticated');
    navigate('/login');
  };

  const openNewProject = () => {
    setCurrentProject({
      id: '',
      title: '',
      slug: '',
      projectType: 'Frontend',
      category: 'Frontend / React.js & Context API',
      year: '2026',
      image: '/project-images/',
      tagline: '',
      demoUrl: '',
      githubUrl: '',
      description: '',
      tags: 'Frontend, React.js, Tailwind CSS'
    });
    setIsEditingProject(true);
  };

  const openEditProject = (p: any) => {
    const isFullStack =
      p.projectType === 'Full Stack' ||
      p.slug === 'talent-ai' ||
      p.slug === 'baatcheet' ||
      (p.category && p.category.toLowerCase().includes('full stack')) ||
      (p.tags && p.tags.some((t: string) => t.toLowerCase() === 'full stack'));

    const tagsString = Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || '');

    setCurrentProject({
      id: p.id || '',
      title: p.title || '',
      slug: p.slug || '',
      projectType: isFullStack ? 'Full Stack' : (p.projectType || 'Frontend'),
      category: p.category || (isFullStack ? 'Full Stack / MERN' : 'Frontend / React.js'),
      year: p.year || '2026',
      image: p.image || '',
      tagline: p.tagline || '',
      demoUrl: p.demoUrl || p.demo || '',
      githubUrl: p.githubUrl || p.github || '',
      description: p.description || p.tagline || '',
      tags: tagsString
    });
    setIsEditingProject(true);
  };

  // Fetch live projects from MongoDB Atlas on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((p: any) => ({
            id: p._id || p.id || String(Date.now()),
            _id: p._id,
            title: p.title || '',
            slug: p.slug || '',
            projectType: p.category && p.category.toLowerCase().includes('full stack') ? 'Full Stack' : 'Frontend',
            category: p.category || 'Full Stack',
            year: p.year || '2026',
            image: p.coverImage || (p.images && p.images[0]) || '/project-images/talentai.png',
            tagline: p.tagline || '',
            demoUrl: p.liveUrl || p.demoUrl || p.demo || '',
            demo: p.liveUrl || p.demoUrl || p.demo || '',
            githubUrl: p.githubUrl || p.github || '',
            github: p.githubUrl || p.github || '',
            description: p.description || p.tagline || '',
            tags: p.techStack || p.tags || []
          }));
          setProjects(mapped);
          localStorage.setItem('suman_cms_projects', JSON.stringify(mapped));
        }
      })
      .catch((err) => {
        console.warn('[Dashboard CMS]: Using offline project cache.', err.message);
      });
  }, []);

  // Projects CRUD connected to MongoDB Atlas
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedTags = typeof currentProject.tags === 'string'
      ? currentProject.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : (Array.isArray(currentProject.tags) ? currentProject.tags : []);

    if (currentProject.projectType === 'Full Stack' && !formattedTags.includes('Full Stack')) {
      formattedTags.unshift('Full Stack');
    } else if (currentProject.projectType === 'Frontend' && !formattedTags.includes('Frontend')) {
      formattedTags.unshift('Frontend');
    }

    const generatedSlug = currentProject.slug
      ? currentProject.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : currentProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      title: currentProject.title,
      slug: generatedSlug,
      category: currentProject.category || (currentProject.projectType === 'Full Stack' ? 'Full Stack' : 'Frontend'),
      tagline: currentProject.tagline || '',
      description: currentProject.description || currentProject.tagline || '',
      featured: currentProject.projectType === 'Full Stack',
      coverImage: currentProject.image || '/project-images/talentai.png',
      images: [currentProject.image || '/project-images/talentai.png'],
      year: currentProject.year || '2026',
      role: currentProject.projectType === 'Full Stack' ? 'Full Stack Developer' : 'Frontend Developer',
      techStack: formattedTags,
      liveUrl: currentProject.demoUrl || currentProject.demo || '',
      githubUrl: currentProject.githubUrl || currentProject.github || '',
      overview: currentProject.description || currentProject.tagline || '',
    };

    const targetId = currentProject._id || currentProject.id;
    const isExisting = Boolean(targetId && projects.some((p: any) => p._id === targetId || p.id === targetId));

    try {
      const token = localStorage.getItem('suman_admin_jwt');
      const url = isExisting ? `${API_BASE_URL}/api/projects/${targetId}` : `${API_BASE_URL}/api/projects`;
      const method = isExisting ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        triggerAlert(`Project "${payload.title}" saved successfully to MongoDB Atlas!`);
      } else {
        throw new Error(resData.message || 'Failed to save to backend database.');
      }
    } catch (err) {
      console.warn('[CMS Sync Warning]: Backend save failed. Applying localStorage update.', (err as Error).message);
    }

    const localSavedProject = {
      ...payload,
      id: targetId || Date.now().toString(),
      demoUrl: payload.liveUrl,
      demo: payload.liveUrl,
      github: payload.githubUrl,
      image: payload.coverImage,
      tags: payload.techStack,
      projectType: currentProject.projectType || 'Frontend',
    };

    let updated;
    if (isExisting) {
      updated = projects.map((p: any) => (p._id === targetId || p.id === targetId ? { ...p, ...localSavedProject } : p));
    } else {
      updated = [localSavedProject, ...projects];
    }

    setProjects(updated);
    localStorage.setItem('suman_cms_projects', JSON.stringify(updated));
    setIsEditingProject(false);
  };

  const deleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('suman_admin_jwt');
        await fetch(`${API_BASE_URL}/api/projects/${id}`, {
          method: 'DELETE',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        triggerAlert('Project deleted from MongoDB Atlas!');
      } catch (err) {
        console.warn('[CMS Sync Warning]: Backend delete failed.', (err as Error).message);
      }

      const updated = projects.filter((p: any) => p._id !== id && p.id !== id);
      setProjects(updated);
      localStorage.setItem('suman_cms_projects', JSON.stringify(updated));
    }
  };

  // Certificates CRUD
  const saveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    let updated;
    if (currentCert.id) {
      updated = certificates.map((c: any) => (c.id === currentCert.id ? currentCert : c));
    } else {
      const newC = { ...currentCert, id: Date.now().toString() };
      updated = [newC, ...certificates];
    }
    setCertificates(updated);
    localStorage.setItem('suman_cms_certs', JSON.stringify(updated));
    setIsEditingCert(false);
    triggerAlert('Certificate saved successfully!');
  };

  const deleteCertificate = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const updated = certificates.filter((c: any) => c.id !== id);
      setCertificates(updated);
      localStorage.setItem('suman_cms_certs', JSON.stringify(updated));
      triggerAlert('Certificate deleted!');
    }
  };

  // Site Content CRUD
  const saveSiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('suman_cms_site', JSON.stringify(siteContent));
    triggerAlert('Website content updated globally!');
  };

  // Messages Delete
  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    triggerAlert('Message removed!');
  };

  return (
    <div className="pt-20 sm:pt-24 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-borderDark pb-6">
        <div>
          <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">FULL CMS CONTROL CENTER</span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-textPrimary mt-1">Suman Maity Website CMS</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs font-mono text-textMuted hover:text-accentCyan transition-colors">
            ← VIEW LIVE WEBSITE
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-mono"
          >
            <FiLogOut /> LOGOUT
          </button>
        </div>
      </div>

      {saveAlert && (
        <div className="mb-6 p-4 rounded-xl bg-accentCyan/10 border border-accentCyan/30 text-accentCyan text-xs font-mono flex items-center gap-2 animate-bounce">
          <FiCheckCircle className="text-base" />
          <span>{saveAlert}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 border-b border-borderDark pb-4">
        {[
          { id: 'overview', label: 'Overview', icon: <FiCpu /> },
          { id: 'projects', label: `Projects (${projects.length})`, icon: <FiFolder /> },
          { id: 'certificates', label: `Certificates (${certificates.length})`, icon: <FiAward /> },
          { id: 'site_content', label: 'Website Content & Bio', icon: <FiFileText /> },
          { id: 'messages', label: `Inbox (${messages.length})`, icon: <FiMessageSquare /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-display font-bold transition-all flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-accentCyan text-bgPrimary shadow-lg shadow-accentCyan/20'
                : 'bg-bgSecondary text-textSecondary border border-borderDark hover:border-accentCyan'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'ACTIVE PROJECTS', value: projects.length, desc: 'Manage in Projects CMS', icon: <FiFolder className="text-accentCyan" /> },
              { label: 'CERTIFICATES', value: certificates.length, desc: 'OMTECH Hackathon & Honors', icon: <FiAward className="text-accentCyan" /> },
              { label: 'INBOX MESSAGES', value: messages.length, desc: 'Recruiter & Client inquiries', icon: <FiMessageSquare className="text-accentCyan" /> },
              { label: 'PORTRAIT STATUS', value: 'ACTIVE', desc: 'Custom Black & White Suit', icon: <FiUser className="text-accentCyan" /> },
            ].map((s, idx) => (
              <div key={idx} className="p-6 rounded-3xl glass-panel border border-borderDark flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-textMuted block">{s.label}</span>
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-textPrimary mt-1 block">{s.value}</span>
                  <span className="text-xs text-accentCyan mt-2 block">{s.desc}</span>
                </div>
                <div className="p-4 rounded-2xl bg-bgPrimary border border-borderDark text-2xl">{s.icon}</div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-bgSecondary border border-borderDark space-y-4">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-textPrimary">CMS Operations Hub</h3>
            <p className="text-textSecondary text-sm">
              Use the tab controls above to upload new projects, update credentials, change website copy, manage portrait photos, or read message inquiries. All edits take effect immediately across the website.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: PROJECTS CMS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-textPrimary">Projects Management</h2>
            <button
              onClick={openNewProject}
              className="px-4 py-2.5 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-xs flex items-center gap-2 hover:bg-white transition-all shadow-lg"
            >
              <FiPlus /> UPLOAD NEW PROJECT
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p: any) => {
              const isFS = p.projectType === 'Full Stack' || p.slug === 'talent-ai' || p.slug === 'baatcheet';

              return (
                <div key={p.id} className="p-6 rounded-3xl glass-panel border border-borderDark space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="aspect-video rounded-2xl overflow-hidden border border-borderDark mb-4 relative">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${isFS ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400' : 'bg-purple-950/80 border-purple-500/40 text-purple-300'}`}>
                        {isFS ? 'FULL STACK' : 'FRONTEND'}
                      </span>
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono bg-bgPrimary/80 border border-borderDark text-textMuted">
                        {p.year}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-accentCyan mb-1">{p.category}</div>
                    <h3 className="text-2xl font-display font-bold text-textPrimary">{p.title}</h3>
                    <p className="text-textSecondary text-sm mt-1 line-clamp-2">{p.tagline || p.description}</p>

                    {p.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {(Array.isArray(p.tags) ? p.tags : String(p.tags).split(',')).map((t: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-bgPrimary border border-borderDark text-[10px] font-mono text-textMuted">
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-borderDark flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditProject(p)}
                        className="px-3 py-1.5 rounded-xl bg-bgPrimary border border-borderDark text-accentCyan hover:border-accentCyan text-xs font-mono flex items-center gap-1"
                      >
                        <FiEdit3 /> EDIT ALL OPTIONS
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="px-3 py-1.5 rounded-xl bg-bgPrimary border border-borderDark text-red-400 hover:bg-red-500/10 text-xs font-mono flex items-center gap-1"
                      >
                        <FiTrash2 /> DELETE
                      </button>
                    </div>

                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-textMuted hover:text-accentCyan">
                        LIVE DEMO ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATES CMS */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-textPrimary">Certificates & Honors Management</h2>
            <button
              onClick={() => {
                setCurrentCert({ id: '', title: '', issuer: '', date: '2026', desc: '', image: '' });
                setIsEditingCert(true);
              }}
              className="px-4 py-2.5 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-xs flex items-center gap-2 hover:bg-white transition-all shadow-lg"
            >
              <FiPlus /> UPLOAD CERTIFICATE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((c: any) => (
              <div key={c.id} className="p-6 rounded-3xl glass-panel border border-borderDark hover:border-accentCyan/50 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-borderDark mb-4 bg-slate-950/80 p-3 flex items-center justify-center">
                    <img src={c.image} alt={c.title} className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                  <div className="text-xs font-mono text-textMuted mb-1">{c.issuer} • {c.date}</div>
                  <h3 className="text-xl font-display font-bold text-textPrimary">{c.title}</h3>
                  <p className="text-textSecondary text-sm mt-2">{c.desc}</p>
                </div>

                <div className="pt-4 border-t border-borderDark flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentCert(c);
                      setIsEditingCert(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-bgPrimary border border-borderDark text-accentCyan hover:border-accentCyan text-xs font-mono flex items-center gap-1"
                  >
                    <FiEdit3 /> EDIT
                  </button>
                  <button
                    onClick={() => deleteCertificate(c.id)}
                    className="px-3 py-1.5 rounded-xl bg-bgPrimary border border-borderDark text-red-400 hover:bg-red-500/10 text-xs font-mono flex items-center gap-1"
                  >
                    <FiTrash2 /> DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SITE CONTENT & BIO EDITING */}
      {activeTab === 'site_content' && (
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-borderDark max-w-3xl space-y-6">
          <h2 className="text-2xl font-display font-bold text-textPrimary">Website Content & Bio Editor</h2>

          <form onSubmit={saveSiteContent} className="space-y-6">
            <div>
              <label className="text-xs font-mono text-textMuted uppercase block mb-2">FULL NAME</label>
              <input
                type="text"
                value={siteContent.name}
                onChange={(e) => setSiteContent({ ...siteContent, name: e.target.value })}
                className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-textMuted uppercase block mb-2">HERO HEADLINE</label>
              <input
                type="text"
                value={siteContent.headline}
                onChange={(e) => setSiteContent({ ...siteContent, headline: e.target.value })}
                className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-textMuted uppercase block mb-2">PORTRAIT PHOTO URL</label>
              <input
                type="text"
                value={siteContent.portraitUrl}
                onChange={(e) => setSiteContent({ ...siteContent, portraitUrl: e.target.value })}
                className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-textMuted uppercase block mb-2">EMAIL</label>
                <input
                  type="email"
                  value={siteContent.email}
                  onChange={(e) => setSiteContent({ ...siteContent, email: e.target.value })}
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-textMuted uppercase block mb-2">PHONE</label>
                <input
                  type="text"
                  value={siteContent.phone}
                  onChange={(e) => setSiteContent({ ...siteContent, phone: e.target.value })}
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-textMuted uppercase block mb-2">ABOUT BIOGRAPHY</label>
              <textarea
                rows={4}
                value={siteContent.subtext}
                onChange={(e) => setSiteContent({ ...siteContent, subtext: e.target.value })}
                className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-xs flex items-center gap-2 hover:bg-white transition-all shadow-lg"
            >
              <FiSave /> SAVE GLOBAL WEBSITE CONTENT
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: MESSAGES INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-textPrimary">Inquiries Inbox</h2>
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="p-6 rounded-3xl glass-panel border border-borderDark space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-textMuted">
                  <span>{m.name} ({m.email})</span>
                  <div className="flex items-center gap-4">
                    <span>{m.date}</span>
                    <button onClick={() => deleteMessage(m.id)} className="text-red-400 hover:text-red-300">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-display font-bold text-textPrimary">{m.subject}</h3>
                <p className="text-textSecondary text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECT EDIT MODAL */}
      {isEditingProject && (
        <div className="fixed inset-0 z-50 bg-bgPrimary/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-2xl w-full glass-panel border border-borderDark rounded-3xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsEditingProject(false)} className="absolute top-6 right-6 text-textMuted hover:text-white">
              <FiX className="text-xl" />
            </button>
            <div>
              <span className="text-accentCyan font-mono text-xs uppercase tracking-widest">CMS PROJECT EDITOR</span>
              <h3 className="text-2xl font-display font-bold text-textPrimary mt-1">
                {currentProject.id ? `Edit: ${currentProject.title}` : 'Upload New Project'}
              </h3>
            </div>

            <form onSubmit={saveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-textMuted block mb-1">PROJECT TITLE *</label>
                  <input
                    type="text"
                    required
                    value={currentProject.title}
                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                    placeholder="e.g. PRIVATE PROPERTY RENTAL"
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm focus:border-accentCyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-textMuted block mb-1">SLUG (URL PATH)</label>
                  <input
                    type="text"
                    value={currentProject.slug}
                    onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                    placeholder="e.g. property-rental (auto-generated if empty)"
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm font-mono focus:border-accentCyan focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-accentCyan block mb-1">FILTER CATEGORY *</label>
                  <select
                    value={currentProject.projectType || 'Frontend'}
                    onChange={(e) => setCurrentProject({
                      ...currentProject,
                      projectType: e.target.value,
                      category: e.target.value === 'Full Stack' ? 'Full Stack / MERN' : (e.target.value === 'Frontend' ? 'Frontend / React.js' : currentProject.category)
                    })}
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm focus:border-accentCyan focus:outline-none"
                  >
                    <option value="Full Stack">Full Stack (Backend + Frontend)</option>
                    <option value="Frontend">Frontend (UI / Client-Side)</option>
                    <option value="Other">Other / Utility</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-textMuted block mb-1">DISPLAY CATEGORY</label>
                  <input
                    type="text"
                    required
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    placeholder="e.g. Frontend / React.js & Context API"
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm focus:border-accentCyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-textMuted block mb-1">YEAR</label>
                  <input
                    type="text"
                    required
                    value={currentProject.year}
                    onChange={(e) => setCurrentProject({ ...currentProject, year: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm focus:border-accentCyan focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">IMAGE PATH / URL *</label>
                <input
                  type="text"
                  required
                  value={currentProject.image}
                  onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                  placeholder="/project-images/private-property-rental.png"
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm font-mono focus:border-accentCyan focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">SHORT TAGLINE *</label>
                <input
                  type="text"
                  required
                  value={currentProject.tagline}
                  onChange={(e) => setCurrentProject({ ...currentProject, tagline: e.target.value })}
                  placeholder="Clean & Responsive Property Discovery & Listing Platform"
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm focus:border-accentCyan focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-textMuted block mb-1">LIVE DEMO URL</label>
                  <input
                    type="text"
                    value={currentProject.demoUrl}
                    onChange={(e) => setCurrentProject({ ...currentProject, demoUrl: e.target.value, demo: e.target.value })}
                    placeholder="https://private-property-rental-by-suman.netlify.app/"
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm font-mono focus:border-accentCyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-textMuted block mb-1">GITHUB REPO URL</label>
                  <input
                    type="text"
                    value={currentProject.githubUrl}
                    onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value, github: e.target.value })}
                    placeholder="https://github.com/sumancpp/React-Projects/..."
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm font-mono focus:border-accentCyan focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">FULL DESCRIPTION</label>
                <textarea
                  rows={4}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  placeholder="Built a Private Property Rental platform allowing users to discover and list diverse rental properties..."
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm focus:border-accentCyan focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">TECH STACK TAGS (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={currentProject.tags}
                  onChange={(e) => setCurrentProject({ ...currentProject, tags: e.target.value })}
                  placeholder="Frontend, React.js, React Router, Context API, UI/UX Design, Tailwind CSS"
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm font-mono focus:border-accentCyan focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-borderDark">
                <button type="button" onClick={() => setIsEditingProject(false)} className="px-5 py-2.5 rounded-full border border-borderDark text-xs font-mono hover:text-white">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-xs hover:bg-white transition-all shadow-lg">
                  SAVE PROJECT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATE EDIT MODAL */}
      {isEditingCert && (
        <div className="fixed inset-0 z-50 bg-bgPrimary/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-xl w-full glass-panel border border-borderDark rounded-3xl p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsEditingCert(false)} className="absolute top-6 right-6 text-textMuted hover:text-white">
              <FiX className="text-xl" />
            </button>
            <h3 className="text-2xl font-display font-bold text-textPrimary">
              {currentCert.id ? 'Edit Certificate' : 'Upload New Certificate'}
            </h3>

            <form onSubmit={saveCertificate} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">TITLE</label>
                <input
                  type="text"
                  required
                  value={currentCert.title}
                  onChange={(e) => setCurrentCert({ ...currentCert, title: e.target.value })}
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">ISSUER</label>
                <input
                  type="text"
                  required
                  value={currentCert.issuer}
                  onChange={(e) => setCurrentCert({ ...currentCert, issuer: e.target.value })}
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">IMAGE URL</label>
                <input
                  type="text"
                  required
                  value={currentCert.image}
                  onChange={(e) => setCurrentCert({ ...currentCert, image: e.target.value })}
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted block mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={currentCert.desc}
                  onChange={(e) => setCurrentCert({ ...currentCert, desc: e.target.value })}
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-2.5 text-textPrimary text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditingCert(false)} className="px-5 py-2.5 rounded-full border border-borderDark text-xs font-mono">
                  CANCEL
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-xs">
                  SAVE CERTIFICATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
