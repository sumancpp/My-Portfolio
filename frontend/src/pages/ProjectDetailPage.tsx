import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheck, FiArrowRight } from 'react-icons/fi';

interface ProjectData {
  title: string;
  subtitle: string;
  category: string;
  role: string;
  year: string;
  stack: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  overview: string;
  architecture: string;
  features: string[];
  nextSlug: string;
  nextTitle: string;
}

const projectsData: Record<string, ProjectData> = {
  'talent-ai': {
    title: 'TALENT AI',
    subtitle: 'AI-Powered Resume Search, ATS & Technical Evaluation Platform',
    category: 'MERN Stack / Google Gemini AI / WebRTC',
    role: 'Full Stack & AI Architect',
    year: '2026',
    stack: ['MERN Stack', 'Google Gemini AI', 'WebRTC', 'Socket.IO', 'Monaco Editor', 'Tailwind CSS', 'JWT Auth'],
    image: '/project-images/talentai.png',
    demoUrl: 'https://talentai.sumann.in/',
    githubUrl: 'https://github.com/sumancpp/ai-resume-ats',
    overview: 'TalentAI is a full-stack applicant tracking and technical evaluation system engineered to automate resume parsing, candidate scoring, recruiter summaries, live coding assessments, and remote video interviews.',
    architecture: 'Built using the MERN stack with Google Gemini AI for automated candidate ranking and summary generation. Features a weighted ATS scoring engine calculating match relevance from technical skills, role classification, and academic metrics.',
    features: [
      'Engineered an AI-powered ATS automating resume parsing, candidate ranking, skill extraction, and recruiter summaries',
      'Architected a weighted ATS scoring engine using technical skills, role classification, academic metrics, and boundary-aware keyword matching',
      'Developed an AI coding assessment platform with Monaco Editor and secure JavaScript/Python execution sandbox',
      'Integrated WebRTC video interviews, screen sharing, Socket.IO signaling, and automated PDF offer letter generation',
      'Implemented Gemini multi-model fallback, MD5 file deduplication, secure PDF streaming, and JWT authentication',
      'Built a secure end-to-end recruitment workflow with AI-generated technical assessments, candidate shortlisting, and automated email notifications'
    ],
    nextSlug: 'baatcheet',
    nextTitle: 'BAATCHEET'
  },
  'baatcheet': {
    title: 'BAATCHEET',
    subtitle: 'AI Powered Real-Time Chat & Collaboration Platform',
    category: 'MERN Stack / Socket.IO / WebRTC / Gemini AI',
    role: 'Full Stack & Real-Time Engineer',
    year: '2025',
    stack: ['MERN Stack', 'Socket.IO', 'WebRTC', 'Google Gemini AI', 'PWA', 'Cloudinary', 'MongoDB'],
    image: '/project-images/baatcheet-logo.png',
    demoUrl: 'https://baatcheet.sumann.in/',
    githubUrl: 'https://github.com/sumancpp/RealTimeChat',
    overview: 'BaatCheet is a high-performance real-time messaging and collaboration platform supporting low-latency chat, media distribution, WebRTC audio/video calls, screen sharing, collaborative whiteboards, and AI productivity tools.',
    architecture: 'Designed a modular client-server architecture powered by Node.js, Express, MongoDB, and Socket.IO event handling. Integrated Google Gemini AI for smart chat summarization, live translation, and automated code review.',
    features: [
      'Built a scalable real-time messaging platform supporting JWT authentication, media sharing, typing indicators, emoji reactions, and read receipts',
      'Integrated Google Gemini AI for chat summarization, live translation, smart replies, sentiment analysis, and AI code review',
      'Developed WebRTC audio/video calling, browser screen sharing, collaborative whiteboard, disappearing Ghost Ink messages, and 24-hour Status stories',
      'Added PWA support, customizable chat themes, voice effects, multiplayer mini-games, and advanced privacy controls',
      'Optimized real-time communication using Socket.IO, Cloudinary, MongoDB, and REST APIs for low-latency collaboration',
      'Designed scalable REST APIs with secure JWT authentication and efficient state management for real-time messaging'
    ],
    nextSlug: 'shifra-2',
    nextTitle: 'SHIFRA 2.0'
  },
  'shifra-2': {
    title: 'SHIFRA 2.0',
    subtitle: 'Built My Own Voice-Powered Virtual Assistant – Shifra 2.0!',
    category: 'React.js / Web Speech API / AI Integration',
    role: 'Frontend & Speech AI Engineer',
    year: '2026',
    stack: ['React.js', 'Speech Recognition', 'Web Speech API', 'Speech Synthesis', 'React Hooks', 'Tailwind CSS', 'Vercel'],
    image: '/project-images/Shifra2.0.png',
    demoUrl: 'https://virtual-assistant-eight-omega.vercel.app/',
    githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant',
    overview: 'Shifra 2.0 is a voice-powered virtual assistant engineered with React.js and the Web Speech API. It listens to user voice commands with real-time transcription and speaks intelligent responses using browser speech synthesis.',
    architecture: 'Architected using React custom hooks (useState, useEffect, useContext) to manage browser audio streams, asynchronous SpeechRecognition events, and SpeechSynthesisUtterance states. Features dynamic UI state management that automatically hides controls while listening or speaking.',
    features: [
      'Voice input with real-time speech transcription using Web Speech API',
      'AI-powered responses with browser speech synthesis (Text-to-Speech)',
      'Dynamic UI updates (interactive button automatically hides while listening/speaking)',
      'Microphone permission handling and error boundaries for secure usage across browsers',
      'Hands-on state management and asynchronous audio stream lifecycle handling with React hooks'
    ],
    nextSlug: 'food-delivery',
    nextTitle: 'SUMAN CAFE'
  },
  'food-delivery': {
    title: 'SUMAN CAFE (FOOD DELIVERY)',
    subtitle: 'Built a Food Delivery Website using React.js!',
    category: 'React.js / Redux / Tailwind CSS',
    role: 'Frontend Engineer & UI Developer',
    year: '2026',
    stack: ['React.js', 'Redux Toolkit', 'Context API', 'Tailwind CSS', 'Toast Notifications', 'Netlify'],
    image: '/project-images/Food_delivery.png',
    demoUrl: 'https://suman-cafe.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery',
    overview: 'Suman Cafe is a responsive food delivery web application built with React.js, Redux, and Tailwind CSS. Designed to deliver an intuitive online food ordering experience, it enables users to explore categorized menus, manage dynamic cart items, and receive real-time toast feedback.',
    architecture: 'Built using React.js with Redux and React Context API for global cart state management, item calculations, and order placement events. Styled with Tailwind CSS and enhanced with custom timed toast notifications for instant visual feedback.',
    features: [
      'Category-based food filtering enabling quick exploration across dishes and cuisines',
      'Dynamic shopping cart system supporting instant item additions, removals, and price calculations',
      'Custom timed toast notification popups for real-time feedback when adding items or placing orders',
      'Redux and React Context state management for seamless item updates and state persistence',
      'Clean UI/UX design with smooth micro-animations, hover effects, and responsive layout styling'
    ],
    nextSlug: 'background-remover',
    nextTitle: 'BACKGROUND REMOVER TOOL'
  },
  'background-remover': {
    title: 'BACKGROUND REMOVER TOOL',
    subtitle: 'Just Launched: My Own Image Background Remover Tool!',
    category: 'JavaScript / Remove.bg API / Frontend',
    role: 'Frontend Developer & API Integration',
    year: '2026',
    stack: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Remove.bg API', 'FileReader API', 'Flexbox', 'Netlify'],
    image: '/project-images/RemoveBg.png',
    demoUrl: 'https://remove-image-background-and-download.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover',
    overview: 'An intuitive web application designed to instantly remove image backgrounds directly in the browser. Users can upload images, process them using the Remove.bg API, compare before-and-after results, and download transparent PNG outputs.',
    architecture: 'Built using Vanilla JavaScript (ES6+) with the FileReader API for instant client-side file reading and image previewing. Integrates with the Remove.bg REST API for automated background segmentation and transparent PNG output generation.',
    features: [
      'Drag-and-drop or file upload with instant client-side image preview using FileReader API',
      'Automated background removal powered by Remove.bg REST API integration',
      'Side-by-side before and after image comparison preview',
      'Instant high-quality PNG download with preserved transparency',
      'Clean, responsive Flexbox layout with smooth CSS micro-animations and transition effects'
    ],
    nextSlug: 'your-gym',
    nextTitle: 'YOUR GYM CENTER'
  },
  'your-gym': {
    title: 'YOUR GYM CENTER',
    subtitle: 'Sleek, Responsive & Interactive Fitness & Gym Website built from scratch!',
    category: 'HTML5 / CSS3 / JavaScript',
    role: 'Frontend Engineer & UI/UX Designer',
    year: '2026',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Flexbox & Grid', 'CSS Keyframes', 'Netlify'],
    image: '/project-images/gym.png',
    demoUrl: 'https://your-gym-center.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Your%20Gym',
    overview: 'A sleek, high-energy web application designed for gym centers and fitness enthusiasts. Features interactive membership registration forms, trainer showcase modules, workout schedule tables, smooth scrolling animations, and a responsive layout built from scratch.',
    architecture: 'Architected using semantic HTML5 structures, custom CSS3 animation keyframes, and modular Vanilla JavaScript for form validation, dynamic modal popups, and smooth page navigation.',
    features: [
      'Responsive design optimized seamlessly across mobile, tablet, and desktop screens',
      'Interactive membership registration forms with dynamic input feedback',
      'Custom CSS3 keyframe animations and smooth scroll transitions',
      'User-friendly navigation bar with sticky header and section jump shortcuts',
      'Dynamic trainer showcase, workout schedules, and membership tier cards'
    ],
    nextSlug: 'weather-app',
    nextTitle: 'REAL-TIME WEATHER APP'
  },
  'weather-app': {
    title: 'REAL-TIME WEATHER APP',
    subtitle: 'Real-Time Global Weather Forecast & Environmental Metrics Application',
    category: 'JavaScript / OpenWeather API / Frontend',
    role: 'Frontend Engineer & API Developer',
    year: '2026',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'OpenWeather API', 'Fetch API', 'Netlify'],
    image: '/project-images/weather.png',
    demoUrl: 'https://weather-app-by-suman.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Weather%20App',
    overview: 'A sleek, real-time weather forecasting web application designed to provide instant atmospheric data for any city or region worldwide. Integrates live Weather API data streams to display current temperature, weather condition icons, humidity levels, and wind speed.',
    architecture: 'Architected using Vanilla JavaScript (ES6+) utilizing asynchronous fetch calls to parse JSON payloads from live REST Weather APIs, dynamically updating the DOM elements, weather icons, and background UI themes based on climate states.',
    features: [
      'Real-time weather data fetching for any city or geographic location worldwide',
      'Displays live temperature, humidity percentages, wind speeds, and pressure metrics',
      'Dynamic weather icon rendering based on current climate conditions (Sunny, Rainy, Cloudy, Snow)',
      'Error handling for invalid city searches and network connection states',
      'Clean, responsive UI with smooth input transitions and dynamic styling'
    ],
    nextSlug: 'snake-game',
    nextTitle: 'RESPONSIVE SNAKE GAME'
  },
  'snake-game': {
    title: 'RESPONSIVE SNAKE GAME',
    subtitle: 'Classic Cross-Device Arcade Snake Game built with HTML5, CSS3 & JavaScript',
    category: 'JavaScript / HTML5 Canvas / Game Dev',
    role: 'Frontend Engineer & Game Developer',
    year: '2026',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'HTML5 Canvas', 'Touch Controls', 'Netlify'],
    image: '/project-images/snakeGame.png',
    demoUrl: 'https://suman-snake-game.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Snake%20Game',
    overview: 'A feature-packed, cross-device rendition of the classic Snake arcade game built entirely from scratch using HTML5, CSS3, and Vanilla JavaScript. Designed to work fluidly across desktop monitors, tablets, and mobile smartphones.',
    architecture: 'Built using an event-driven JavaScript game loop with requestAnimationFrame for smooth 60fps rendering. Implements custom collision algorithms, food spawn generation, high-score tracking in localStorage, and dual input listeners for both touch swipe gestures and arrow key events.',
    features: [
      'Cross-device responsiveness optimized for Desktop, Tablet, and Mobile screens',
      'Smooth 60fps game loop rendering with real-time snake movement and growth animation',
      'Collision detection logic for wall boundaries and self-intersection',
      'Dual input support: Keyboard Arrow keys for Desktop and On-Screen Touch Controls for Mobile/Tablet',
      'Persistent High Score tracking stored client-side with sound & visual feedback'
    ],
    nextSlug: 'tic-tac-toe',
    nextTitle: 'TIC TAC TOE GAME'
  },
  'tic-tac-toe': {
    title: 'TIC TAC TOE GAME',
    subtitle: 'Classic Interactive 2-Player & AI Tic Tac Toe Web Game',
    category: 'JavaScript / HTML5 / Game Dev',
    role: 'Frontend Engineer & Game Developer',
    year: '2026',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'DOM Manipulation', 'Netlify'],
    image: '/project-images/TicTacToe.png',
    demoUrl: 'https://aquamarine-khapse-997869.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe%20Game',
    overview: 'An engaging interactive web implementation of the timeless Tic Tac Toe game built using Vanilla JavaScript. Features real-time turn switching, win pattern evaluation, draw state detection, interactive grid animations, and score persistence.',
    architecture: 'Architected using clean event listeners attached to a 3x3 interactive grid matrix. Utilizes 2D array pattern matching logic to evaluate win states across 8 distinct winning combinations (3 horizontal, 3 vertical, 2 diagonal).',
    features: [
      'Real-time 3x3 grid state evaluation and win pattern recognition',
      'Interactive X and O turn toggling with highlighted winning strike lines',
      'Draw detection handling when all grid cells are filled without a winner',
      'Instant board reset & new round restart capabilities',
      'Sleek, responsive layout with CSS hover effects and active state styling'
    ],
    nextSlug: 'email-validator',
    nextTitle: 'REAL-TIME EMAIL VALIDATOR'
  },
  'email-validator': {
    title: 'REAL-TIME EMAIL VALIDATOR',
    subtitle: 'Real-Time Email Verification & Syntax Validation Web Utility',
    category: 'JavaScript / Validation API / Frontend',
    role: 'Frontend Developer & Utility Architect',
    year: '2026',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Regex Validation', 'DOM API', 'Netlify'],
    image: '/project-images/email.png',
    demoUrl: 'https://jocular-souffle-aaf03b.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Email%20Validator',
    overview: 'An essential developer & user web utility engineered to validate email addresses instantly in real-time. Checks email syntax structure, domain reachability, MX record verification, and disposable email flags to ensure high data accuracy.',
    architecture: 'Built using an event-driven JavaScript architecture using Regex RFC 5322 compliance pattern matching combined with live API verification streams to validate mailbox existence, domain TLDs, and disposable email service providers.',
    features: [
      'Real-time syntax validation verifying RFC 5322 email formatting standard compliance',
      'Domain & MX record verification checking email server reachability',
      'Disposable email provider detection alerting users against temporary email services',
      'Instant visual feedback with color-coded status badges and detailed diagnostic breakdowns',
      'Clean, responsive UI with smooth input transitions and copy-to-clipboard actions'
    ],
    nextSlug: 'spotify-player',
    nextTitle: 'SPOTIFY MUSIC PLAYER'
  },
  'spotify-player': {
    title: 'SPOTIFY MUSIC PLAYER',
    subtitle: 'Sleek, Functional Web Music Player & Music Streaming UI',
    category: 'JavaScript / HTML5 Audio / Frontend',
    role: 'Frontend Developer & Audio UI Designer',
    year: '2026',
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'HTML5 Audio API', 'Flexbox & Grid', 'Netlify'],
    image: '/project-images/spotify.png',
    demoUrl: 'https://stately-llama-c0f7e4.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/Projects/tree/main/Spotify',
    overview: 'A sleek, fully interactive web music player inspired by Spotify. Designed to deliver a smooth digital music streaming experience directly in the browser with real-time audio playback, interactive track progress seek bars, and dynamic playlist selection.',
    architecture: 'Architected using an HTML5 Audio API state manager combined with custom JavaScript event listeners to synchronize track playback state, current time, duration calculation, seek bar dragging, volume levels, and playlist item highlighting.',
    features: [
      'Full audio playback controls: Play, Pause, Skip Next, Skip Previous, and Track Loop',
      'Custom interactive seek bar with live time progress indicators (mm:ss)',
      'Dynamic playlist track selection with instant song switching and active track styling',
      'Volume level control slider with mute toggle functionality',
      'Authentic dark-mode Spotify UI design with responsive layout & smooth hover states'
    ],
    nextSlug: 'property-rental',
    nextTitle: 'PRIVATE PROPERTY RENTAL'
  },
  'property-rental': {
    title: 'PRIVATE PROPERTY RENTAL',
    subtitle: 'Responsive Property Discovery & Listing Platform',
    category: 'React.js / Context API / UI/UX Design',
    role: 'Frontend Engineer & UI Architect',
    year: '2025',
    stack: ['React.js', 'React Router', 'Context API', 'Tailwind CSS', 'Netlify', 'Gmail API'],
    image: '/project-images/private-property-rental.png',
    demoUrl: 'https://private-property-rental-by-suman.netlify.app/',
    githubUrl: 'https://github.com/sumancpp/React-Projects/tree/main/Personal%20Property%20Rental',
    overview: 'A private property rental web application designed to help users easily discover and list diverse rental properties (Houses, Rooms, Cabins, Farm & Pool Houses, Shops, Forest Houses) with clean UI, search filtering, and direct owner communication.',
    architecture: 'Built using React.js with React Router for declarative SPA navigation and Context API for global property state management. Focused on interactive UI animations, responsive grid layouts, and direct inquiry routing.',
    features: [
      'Search properties by place name and location to verify real-time availability',
      'Categorized property filters: House, Rooms, Farm House, Pool House, Tent House, Cabins, Shops, and Forest House',
      'View detailed price metrics, property descriptions, and geolocation information',
      'User listing submission workflow allowing landlords to list new rental properties',
      'Direct contact integration via Gmail for immediate inquiries and booking communication',
      'Clean UI/UX design with smooth micro-animations for enhanced user engagement'
    ],
    nextSlug: 'talent-ai',
    nextTitle: 'TALENT AI'
  },
};

const getProjectDataBySlug = (slugParam?: string): ProjectData => {
  if (slugParam && projectsData[slugParam]) {
    return projectsData[slugParam];
  }

  // Fallback to local storage CMS projects
  const saved = localStorage.getItem('suman_cms_projects');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const found = parsed.find(
        (p: any) => p.slug === slugParam || (p.title && p.title.toLowerCase().replace(/\s+/g, '-') === slugParam)
      );

      if (found) {
        const stackList = Array.isArray(found.tags)
          ? found.tags
          : (typeof found.tags === 'string'
            ? found.tags.split(',').map((t: string) => t.trim())
            : [found.category || 'Frontend']);

        return {
          title: found.title,
          subtitle: found.tagline || found.description || 'Custom Web Project',
          category: found.category || 'Frontend Application',
          role: found.projectType === 'Full Stack' ? 'Full Stack Engineer' : 'Frontend Engineer',
          year: found.year || '2026',
          stack: stackList,
          image: (found.image && found.image.includes('weatherApp'))
            ? '/project-images/weather.png'
            : (found.coverImage || found.image || (found.images && found.images[0]) || '/project-images/talentai.png'),
          demoUrl: found.demoUrl || found.demo || 'https://github.com/sumancpp',
          githubUrl: found.githubUrl || found.github || 'https://github.com/sumancpp',
          overview: found.description || found.tagline || 'Engineered web project with clean architecture and responsive UI design.',
          architecture: `Architected with ${stackList.join(', ')}. Features structured component layout, responsive design system, and fast load performance.`,
          features: found.description
            ? [
                found.description,
                `Responsive interface built with ${stackList.slice(0, 3).join(', ')}`,
                'Live demo deployment and GitHub repository access available'
              ]
            : ['Responsive Web Interface', 'Clean Architecture', 'Deploys on Netlify / Vercel'],
          nextSlug: 'talent-ai',
          nextTitle: 'TALENT AI'
        };
      }
    } catch {
      // Fallback
    }
  }

  return projectsData['talent-ai'];
};

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams();
  const proj = getProjectDataBySlug(slug);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link to="/projects" className="inline-flex items-center gap-2 text-textMuted hover:text-accentCyan text-sm font-mono mb-8 transition-colors">
        <FiArrowLeft /> BACK TO ALL PROJECTS
      </Link>

      {/* Header */}
      <div className="mb-12">
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          {proj.category}
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-textPrimary mt-2">
          {proj.title}
        </h1>
        <p className="text-xl text-textSecondary mt-4 max-w-3xl">
          {proj.subtitle}
        </p>
      </div>

      {/* Hero Media */}
      <div className="rounded-3xl overflow-hidden border border-borderDark mb-16 aspect-video shadow-2xl bg-black/90 flex items-center justify-center p-8 sm:p-12">
        <img
          src={proj.image}
          alt={proj.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedFallback) {
              target.dataset.triedFallback = 'true';
              const parts = target.src.split('/');
              const filename = parts[parts.length - 1];
              if (filename) target.src = `/project-images/${filename}`;
            } else {
              target.onerror = null;
            }
          }}
        />
      </div>

      {/* Specs Metadata Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-borderDark mb-16 text-sm">
        <div>
          <span className="text-xs font-mono text-textMuted block uppercase">ROLE</span>
          <span className="font-display font-bold text-textPrimary">{proj.role}</span>
        </div>
        <div>
          <span className="text-xs font-mono text-textMuted block uppercase">YEAR</span>
          <span className="font-display font-bold text-textPrimary">{proj.year}</span>
        </div>
        <div>
          <span className="text-xs font-mono text-textMuted block uppercase">DEVELOPER</span>
          <span className="font-display font-bold text-accentCyan">Suman Maity</span>
        </div>
        <div>
          <span className="text-xs font-mono text-textMuted block uppercase">ACTIONS</span>
          <div className="flex gap-4 mt-1">
            <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="text-accentCyan hover:underline flex items-center gap-1 font-bold">
              LIVE DEMO <FiExternalLink />
            </a>
            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-textPrimary flex items-center gap-1 font-bold">
              CODE <FiGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Overview & Tech Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-8 space-y-8 text-textSecondary text-lg leading-relaxed">
          <h2 className="text-3xl font-display font-bold text-textPrimary">System Overview</h2>
          <p>{proj.overview}</p>

          <h3 className="text-2xl font-display font-bold text-textPrimary pt-4">Architectural Design</h3>
          <p>{proj.architecture}</p>

          <h3 className="text-2xl font-display font-bold text-textPrimary pt-4">Key Implemented Features</h3>
          <ul className="space-y-4 text-base">
            {proj.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <FiCheck className="text-accentCyan text-xl shrink-0 mt-1" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <h4 className="text-sm font-mono text-textMuted uppercase mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {proj.stack.map((s, idx) => (
                <span key={idx} className="px-4 py-2 rounded-lg bg-bgSecondary border border-borderDark text-accentCyan text-xs font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Callout */}
        <div className="lg:col-span-4">
          <div className="p-8 rounded-3xl bg-bgSecondary border border-borderDark sticky top-32 space-y-6">
            <h3 className="text-xl font-display font-bold text-textPrimary">Interested in this system architecture?</h3>
            <p className="text-sm text-textSecondary">
              Suman Maity is available for full-stack & AI software engineering roles, hackathons, and technical projects.
            </p>
            <Link to="/contact">
              <MagneticButton strength={0.4} className="w-full">
                <div className="w-full text-center py-4 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-sm shadow-xl shadow-accentCyan/20">
                  CONNECT WITH SUMAN
                </div>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Next Project Nav */}
      <div className="border-t border-borderDark pt-16 flex justify-between items-center">
        <span className="text-xs font-mono text-textMuted uppercase">NEXT CASE STUDY</span>
        <Link to={`/projects/${proj.nextSlug}`}>
          <MagneticButton strength={0.4}>
            <div className="flex items-center gap-4 text-3xl font-display font-extrabold text-textPrimary hover:text-accentCyan transition-colors">
              <span>{proj.nextTitle}</span>
              <FiArrowRight />
            </div>
          </MagneticButton>
        </Link>
      </div>
    </div>
  );
};
