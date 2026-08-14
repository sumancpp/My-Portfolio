import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';
import { ProjectCard3D } from '../components/ui/ProjectCard3D';
import { FiSearch } from 'react-icons/fi';

const defaultProjects = [
  {
    id: '1',
    title: 'TALENT AI',
    category: 'Full Stack / MERN & Gemini AI',
    year: '2026',
    image: '/project-images/talentai.png',
    tagline: 'AI-Powered Resume Search, ATS & Technical Evaluation Platform',
    slug: 'talent-ai',
    demoUrl: 'https://talentai.sumann.in/',
    githubUrl: 'https://github.com/sumancpp/ai-resume-ats',
    description: 'Engineered an AI-powered ATS automating resume parsing, candidate ranking, skill extraction, recruiter summaries, Monaco Editor coding sandbox, WebRTC video interviews, and automated PDF offer letters.',
    tags: ['Full Stack', 'MERN Stack', 'Gemini AI', 'WebRTC', 'Socket.IO', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'BAATCHEET',
    category: 'Full Stack / Socket.IO & WebRTC',
    year: '2025',
    image: '/project-images/baatcheet-logo.png',
    tagline: 'AI Powered Real-Time Chat & Collaboration Platform',
    slug: 'baatcheet',
    demoUrl: 'https://baatcheet.sumann.in/',
    githubUrl: 'https://github.com/sumancpp/RealTimeChat',
    description: 'Built a scalable real-time messaging platform supporting JWT auth, WebRTC audio/video calling, browser screen sharing, collaborative whiteboard, disappearing Ghost Ink messages, and Gemini AI code review.',
    tags: ['Full Stack', 'MERN Stack', 'Socket.IO', 'WebRTC', 'Google Gemini AI']
  },
  {
    id: '3',
    title: 'SHIFRA 2.0',
    category: 'Frontend / React.js & Web Speech API',
    year: '2026',
    image: '/project-images/Shifra2.0.png',
    tagline: 'Voice-Powered Virtual Assistant with Real-Time Speech Recognition & Synthesis',
    slug: 'shifra-2',
    demoUrl: 'https://virtual-assistant-eight-omega.vercel.app/',
    githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant',
    description: 'Engineered a voice-powered virtual assistant built with React.js, Speech Recognition, and Web Speech API. Features real-time voice input transcription, AI responses, microphone permission handling, and dynamic UI states.',
    tags: ['Frontend', 'React.js', 'Web Speech API', 'Speech Recognition', 'AI Integration', 'Tailwind CSS']
  },
  {
    id: '4',
    title: 'SUMAN CAFE (FOOD DELIVERY)',
    category: 'Frontend / React.js & Redux',
    year: '2026',
    image: '/project-images/Food_delivery.png',
    tagline: 'Responsive Food Delivery Platform with Category Filtering & Dynamic Cart System',
    slug: 'food-delivery',
    demoUrl: 'https://suman-cafe.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery',
    description: 'Built a feature-rich Food Delivery application in React.js featuring category-based food filtering, dynamic cart management with real-time add/remove calculations, custom timed toast notifications, Redux + Context state management, and responsive UI design.',
    tags: ['Frontend', 'React.js', 'Redux', 'Context API', 'Tailwind CSS', 'Netlify']
  },
  {
    id: '5',
    title: 'BACKGROUND REMOVER TOOL',
    category: 'Frontend / JavaScript & Remove.bg API',
    year: '2026',
    image: '/project-images/RemoveBg.png',
    tagline: 'Instant Web-Based Background Removal Tool with Real-Time Preview & Transparent PNG Download',
    slug: 'background-remover',
    demoUrl: 'https://remove-image-background-and-download.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover',
    description: 'Built a web-based background removal tool using Vanilla JavaScript, HTML5, CSS3, and the Remove.bg API. Supports instant image file upload via FileReader API, before/after side-by-side preview, transparent PNG download, and responsive UI transitions.',
    tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Remove.bg API', 'FileReader API', 'Netlify']
  },
  {
    id: '6',
    title: 'YOUR GYM CENTER',
    category: 'Frontend / HTML5 & CSS3',
    year: '2026',
    image: '/project-images/gym.png',
    tagline: 'Sleek, Responsive & Interactive Fitness & Gym Website built from scratch',
    slug: 'your-gym',
    demoUrl: 'https://your-gym-center.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Your%20Gym',
    description: 'Built a modern, fully functional Gym & Fitness website using HTML5, CSS3, and JavaScript. Features responsive layout design, interactive membership enrollment forms, dynamic content filtering, smooth scroll animations, and user-friendly navigation.',
    tags: ['Frontend', 'HTML5 & CSS3', 'JavaScript', 'Responsive Web Design', 'CSS Animations', 'Netlify']
  },
  {
    id: '7',
    title: 'REAL-TIME WEATHER APP',
    category: 'Frontend / JavaScript & Weather API',
    year: '2026',
    image: '/project-images/weather.png',
    tagline: 'Real-Time Global Weather Data Fetching with Location Search & Dynamic Climate Metrics',
    slug: 'weather-app',
    demoUrl: 'https://weather-app-by-suman.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Weather%20App',
    description: 'Built a responsive Weather web application using HTML5, CSS3, and Vanilla JavaScript (Fetch API). Fetches real-time temperature, humidity, wind speed, atmospheric condition icons, and location search results via live Weather API integration.',
    tags: ['Frontend', 'JavaScript (ES6+)', 'OpenWeather API', 'Fetch API', 'HTML5 & CSS3', 'Netlify']
  },
  {
    id: '8',
    title: 'RESPONSIVE SNAKE GAME',
    category: 'Frontend / JavaScript & HTML5 Canvas',
    year: '2026',
    image: '/project-images/snakeGame.png',
    tagline: 'Classic Interactive Arcade Snake Game with Cross-Device Touch & Keyboard Controls',
    slug: 'snake-game',
    demoUrl: 'https://suman-snake-game.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Snake%20Game',
    description: 'Engineered a fully responsive, cross-device Snake game using HTML5, CSS3, and Vanilla JavaScript. Features real-time collision detection, dynamic score tracking, adaptive grid rendering, touch gesture controls for mobile/tablet, and keyboard arrow controls for desktop.',
    tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 Canvas', 'Game Development', 'Responsive Design', 'Netlify']
  },
  {
    id: '9',
    title: 'TIC TAC TOE GAME',
    category: 'Frontend / JavaScript & Game Logic',
    year: '2026',
    image: '/project-images/TicTacToe.png',
    tagline: 'Interactive 2-Player & AI Web Game with Win Pattern Detection & Score Tracking',
    slug: 'tic-tac-toe',
    demoUrl: 'https://aquamarine-khapse-997869.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe%20Game',
    description: 'Built a classic interactive Tic Tac Toe web game using HTML5, CSS3, and Vanilla JavaScript. Features real-time win condition evaluation algorithm, interactive turn indicators, game reset capabilities, score tracking, and responsive UI design.',
    tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Game Logic', 'DOM Manipulation', 'Netlify']
  },
  {
    id: '10',
    title: 'REAL-TIME EMAIL VALIDATOR',
    category: 'Frontend / JavaScript & Validation API',
    year: '2026',
    image: '/project-images/email.png',
    tagline: 'Real-Time Email Address Verification & MX Record/Syntax Checking Utility',
    slug: 'email-validator',
    demoUrl: 'https://jocular-souffle-aaf03b.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Email%20Validator',
    description: 'Engineered a web-based Email Validation tool using HTML5, CSS3, and Vanilla JavaScript. Verifies email address syntax, domain MX record validity, disposable email detection, and delivers instant visual status feedback.',
    tags: ['Frontend', 'JavaScript (ES6+)', 'Regex Validation', 'API Integration', 'HTML5 & CSS3', 'Netlify']
  },
  {
    id: '11',
    title: 'SPOTIFY MUSIC PLAYER',
    category: 'Frontend / JavaScript & HTML5 Audio',
    year: '2026',
    image: '/project-images/spotify.png',
    tagline: 'Functional Spotify Web Player Clone with Custom Seek Bar, Playlist Tracks & Audio Controls',
    slug: 'spotify-player',
    demoUrl: 'https://stately-llama-c0f7e4.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Spotify',
    description: 'Engineered a functional Spotify web application using HTML5, CSS3, and Vanilla JavaScript. Features real-time audio playback controls (Play, Pause, Next, Previous), custom seek bar time updates, volume sliders, playlist track switching, and dark Spotify UI styling.',
    tags: ['Frontend', 'JavaScript (ES6+)', 'HTML5 Audio API', 'Spotify UI', 'CSS Grid & Flexbox', 'Netlify']
  },
  {
    id: '12',
    title: 'PRIVATE PROPERTY RENTAL',
    category: 'Frontend / React.js & Context API',
    year: '2025',
    image: '/project-images/private-property-rental.png',
    tagline: 'Clean & Responsive Property Discovery & Listing Platform',
    slug: 'property-rental',
    demoUrl: 'https://private-property-rental-by-suman.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Personal%20Property%20Rental',
    description: 'Built a Private Property Rental platform allowing users to discover and list diverse rental properties (Houses, Rooms, Cabins, Farm & Pool Houses, Shops, Forest Houses) with clean UI, search filtering, direct Gmail contact, and smooth animations.',
    tags: ['Frontend', 'React.js', 'React Router', 'Context API', 'UI/UX Design', 'Tailwind CSS']
  }
];

const categories = ['All', 'Full Stack', 'Frontend'];

const normalizeImagePath = (img?: string) => {
  if (!img) return '/project-images/talentai.png';
  if (img.includes('weatherApp')) return '/project-images/weather.png';
  if (img.startsWith('/project-images/')) return img;
  const filename = img.split('/').pop();
  if (filename && filename.includes('weatherApp')) return '/project-images/weather.png';
  return `/project-images/${filename}`;
};

const getProjectsFromCMS = () => {
  const saved = localStorage.getItem('suman_cms_projects');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const customProjects = parsed.map((p: any) => ({
          id: p.id || String(Date.now()),
          title: p.title || 'Untitled Project',
          category: p.category || 'Frontend',
          year: p.year || '2026',
          image: normalizeImagePath(p.coverImage || p.image || (p.images && p.images[0])),
          tagline: p.tagline || p.description || '',
          slug: p.slug || (p.title ? p.title.toLowerCase().replace(/\s+/g, '-') : 'project'),
          demoUrl: p.demo || p.demoUrl || 'https://github.com/sumancpp',
          githubUrl: p.github || p.githubUrl || 'https://github.com/sumancpp',
          description: p.description || p.tagline || '',
          tags: p.tags || [p.category || 'Frontend']
        }));

        const combined = [...customProjects];
        defaultProjects.forEach((dp) => {
          if (!combined.some((cp) => cp.slug === dp.slug || cp.title.toLowerCase() === dp.title.toLowerCase())) {
            combined.push(dp);
          }
        });
        return combined;
      }
    } catch {
      // Fallback
    }
  }
  return defaultProjects;
};

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>(getProjectsFromCMS);
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load from local storage and merged defaults
    const cmsProjects = getProjectsFromCMS();
    setProjects(cmsProjects);

    // Fetch from Backend API if operational
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const apiProjects = data.data.map((p: any) => ({
            id: p._id || p.id,
            title: p.title,
            category: p.category || 'Frontend',
            year: p.year || '2026',
            image: normalizeImagePath(p.coverImage || p.image || (p.images && p.images[0])),
            tagline: p.tagline || p.description || '',
            slug: p.slug,
            demoUrl: p.liveUrl || p.demoUrl || p.demo || 'https://github.com/sumancpp',
            githubUrl: p.githubUrl || p.github || 'https://github.com/sumancpp',
            description: p.description || p.tagline || '',
            tags: p.techStack || p.tags || [p.category || 'Frontend']
          }));

          const combined = [...apiProjects];
          defaultProjects.forEach((dp) => {
            if (!combined.some((cp) => cp.slug === dp.slug || cp.title.toLowerCase() === dp.title.toLowerCase())) {
              combined.push(dp);
            }
          });
          setProjects(combined);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = projects.filter((p) => {
    const cat = selectedCat.toLowerCase();
    const isFullStack =
      p.slug === 'talent-ai' ||
      p.slug === 'baatcheet' ||
      p.title.toLowerCase().includes('talent') ||
      p.title.toLowerCase().includes('baatcheet');

    let matchesCat = false;
    if (cat === 'all') {
      matchesCat = true;
    } else if (cat === 'full stack') {
      matchesCat = isFullStack;
    } else if (cat === 'frontend') {
      matchesCat = !isFullStack;
    }

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(query)));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[85vh]">
      <div className="mb-16">
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          CURATED PORTFOLIO
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold text-textPrimary mt-4 leading-tight">
          Flagship Systems & <span className="text-accentCyan font-extrabold">Case Studies</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-borderDark pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2 rounded-full text-xs font-display font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-accentCyan text-bgPrimary shadow-lg shadow-accentCyan/20'
                  : 'bg-bgSecondary text-textSecondary border border-borderDark hover:border-accentCyan'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bgSecondary border border-borderDark rounded-full pl-11 pr-4 py-2 text-sm text-textPrimary focus:outline-none focus:border-accentCyan transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filtered.map((proj) => (
          <ProjectCard3D key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  );
};
