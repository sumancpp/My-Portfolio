import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiCompass,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiCpu,
  FiPhone,
  FiMail,
  FiCornerDownLeft,
  FiX,
  FiCheck,
} from 'react-icons/fi';

interface CommandItem {
  id: string;
  category: 'NAVIGATION' | 'QUICK ACTIONS' | 'AI ASSISTANT';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle Listener for Cmd/Ctrl+K, '/', and custom window event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedNotification(null), 2500);
    setIsOpen(false);
  };

  const handleDownloadResume = () => {
    const pdfUrl = '/Suman_Maity_Resume.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Suman_Maity_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      category: 'NAVIGATION',
      title: 'Go to Home',
      subtitle: 'Portfolio Hero & Key Highlights',
      icon: <FiCompass className="text-accentCyan" />,
      action: () => { navigate('/'); setIsOpen(false); },
      keywords: ['home', 'hero', 'landing'],
    },
    {
      id: 'nav-about',
      category: 'NAVIGATION',
      title: 'Go to About',
      subtitle: 'Background, Journey & Education',
      icon: <FiCompass className="text-accentCyan" />,
      action: () => { navigate('/about'); setIsOpen(false); },
      keywords: ['about', 'bio', 'education', 'background'],
    },
    {
      id: 'nav-projects',
      category: 'NAVIGATION',
      title: 'Go to Projects',
      subtitle: 'Talent AI, BaatCheet & MERN Systems',
      icon: <FiCompass className="text-accentCyan" />,
      action: () => { navigate('/projects'); setIsOpen(false); },
      keywords: ['projects', 'work', 'talent ai', 'baatcheet'],
    },
    {
      id: 'nav-skills',
      category: 'NAVIGATION',
      title: 'Go to Skills',
      subtitle: 'React, Node, WebRTC, GenAI & C++',
      icon: <FiCompass className="text-accentCyan" />,
      action: () => { navigate('/skills'); setIsOpen(false); },
      keywords: ['skills', 'tech', 'stack', 'node', 'react', 'c++'],
    },
    {
      id: 'nav-experience',
      category: 'NAVIGATION',
      title: 'Go to Experience',
      subtitle: 'CodeAlpha Internship & Hackathon Runner-Up',
      icon: <FiCompass className="text-accentCyan" />,
      action: () => { navigate('/experience'); setIsOpen(false); },
      keywords: ['experience', 'internship', 'codealpha', 'hackathon'],
    },
    {
      id: 'nav-certificates',
      category: 'NAVIGATION',
      title: 'Go to Certificates',
      subtitle: 'Honors & Professional Accreditations',
      icon: <FiCompass className="text-accentCyan" />,
      action: () => { navigate('/certificates'); setIsOpen(false); },
      keywords: ['certificates', 'accreditation', 'awards'],
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      title: 'Go to Contact',
      subtitle: 'Direct Message & SMTP Transmission',
      icon: <FiCompass className="text-accentCyan" />,
      action: () => { navigate('/contact'); setIsOpen(false); },
      keywords: ['contact', 'email', 'hire', 'message'],
    },

    // Quick Actions
    {
      id: 'action-resume',
      category: 'QUICK ACTIONS',
      title: 'Download Resume (PDF)',
      subtitle: 'Suman_Maity_Resume.pdf',
      icon: <FiFileText className="text-emerald-400" />,
      action: handleDownloadResume,
      keywords: ['resume', 'cv', 'pdf', 'download'],
    },
    {
      id: 'action-copy-email',
      category: 'QUICK ACTIONS',
      title: 'Copy Email Address',
      subtitle: 'suuman.maity@gmail.com',
      icon: <FiMail className="text-emerald-400" />,
      action: () => copyToClipboard('suuman.maity@gmail.com', 'Email'),
      keywords: ['email', 'copy', 'mail'],
    },
    {
      id: 'action-copy-phone',
      category: 'QUICK ACTIONS',
      title: 'Copy Phone Number',
      subtitle: '+91 8597433833',
      icon: <FiPhone className="text-emerald-400" />,
      action: () => copyToClipboard('+91 8597433833', 'Phone number'),
      keywords: ['phone', 'call', 'whatsapp', 'number'],
    },
    {
      id: 'action-github',
      category: 'QUICK ACTIONS',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/sumancpp',
      icon: <FiGithub className="text-purple-400" />,
      action: () => { window.open('https://github.com/sumancpp', '_blank'); setIsOpen(false); },
      keywords: ['github', 'git', 'repo', 'code'],
    },
    {
      id: 'action-linkedin',
      category: 'QUICK ACTIONS',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/suman-maity-b84879292',
      icon: <FiLinkedin className="text-purple-400" />,
      action: () => { window.open('https://www.linkedin.com/in/suman-maity-b84879292/', '_blank'); setIsOpen(false); },
      keywords: ['linkedin', 'social', 'network', 'profile'],
    },

    // AI Integration & Themes
    {
      id: 'ai-chat',
      category: 'AI ASSISTANT',
      title: 'Ask Suman AI Assistant',
      subtitle: 'Gemini 2.0 Recruiter Intelligence Engine',
      icon: <FiCpu className="text-accentCyan" />,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('open-ai-chat'));
      },
      keywords: ['ai', 'ask', 'gemini', 'chat', 'recruiter'],
    },
    {
      id: 'toggle-matrix',
      category: 'QUICK ACTIONS',
      title: 'Toggle Matrix Code Rain Mode',
      subtitle: 'Cyberpunk ASCII animation toggle (Ctrl+Shift+M)',
      icon: <FiCpu className="text-emerald-400" />,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('toggle-matrix-mode'));
      },
      keywords: ['matrix', 'rain', 'green', 'cyberpunk', 'terminal', 'ascii', 'theme'],
    },
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase();
    const titleMatch = cmd.title.toLowerCase().includes(q);
    const subtitleMatch = cmd.subtitle?.toLowerCase().includes(q);
    const keywordMatch = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
    return titleMatch || subtitleMatch || keywordMatch;
  });

  // Handle Keyboard Navigation (Up / Down / Enter)
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Floating Bottom-Left Command Trigger Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full border border-borderDark bg-bgCard/90 text-textMuted hover:text-accentCyan hover:border-accentCyan/50 transition-all duration-300 shadow-2xl backdrop-blur-xl text-xs font-mono group"
          title="Open Command Palette (Ctrl + K)"
        >
          <FiSearch className="text-accentCyan group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-semibold">COMMAND</span>
          <kbd className="px-1.5 py-0.5 rounded bg-bgPrimary border border-borderDark text-[10px] text-accentCyan font-bold">⌘K</kbd>
        </button>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-full bg-emerald-500 text-bgPrimary font-mono text-xs font-bold flex items-center gap-2 shadow-2xl"
          >
            <FiCheck className="text-base" />
            <span>{copiedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-bgPrimary/80 backdrop-blur-md">
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-2xl bg-bgCard/95 border border-borderDark shadow-2xl overflow-hidden backdrop-blur-2xl text-textPrimary"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Search Bar Header */}
              <div className="flex items-center px-4 py-3.5 border-b border-borderDark/80 gap-3">
                <FiSearch className="text-accentCyan text-lg flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command or search... (e.g. projects, resume, ai)"
                  className="w-full bg-transparent text-textPrimary placeholder:text-textMuted font-mono text-sm outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-textMuted hover:text-textPrimary transition-colors"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              {/* Command List Container */}
              <div className="max-h-96 overflow-y-auto p-2 space-y-4">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-textMuted font-mono text-xs">
                    No matching commands found for "{query}"
                  </div>
                ) : (
                  (['NAVIGATION', 'QUICK ACTIONS', 'AI ASSISTANT'] as const).map((cat) => {
                    const catItems = filteredCommands.filter((c) => c.category === cat);
                    if (catItems.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1">
                        <div className="px-3 py-1 font-mono text-[10px] font-bold text-accentCyan tracking-widest uppercase">
                          {cat}
                        </div>
                        {catItems.map((item) => {
                          const overallIndex = filteredCommands.findIndex((c) => c.id === item.id);
                          const isSelected = overallIndex === selectedIndex;

                          return (
                            <button
                              key={item.id}
                              onClick={item.action}
                              onMouseEnter={() => setSelectedIndex(overallIndex)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
                                isSelected
                                  ? 'bg-accentCyan/15 border border-accentCyan/40 text-textPrimary'
                                  : 'hover:bg-bgPrimary/60 border border-transparent text-textSecondary'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 rounded-lg bg-bgPrimary/80 border border-borderDark/40 flex-shrink-0">
                                  {item.icon}
                                </div>
                                <div className="truncate">
                                  <div className="font-display font-semibold text-sm text-textPrimary flex items-center gap-2">
                                    {item.title}
                                  </div>
                                  {item.subtitle && (
                                    <div className="font-mono text-xs text-textMuted truncate">
                                      {item.subtitle}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {isSelected && (
                                <div className="flex items-center gap-1 font-mono text-[10px] text-accentCyan flex-shrink-0 pl-2">
                                  <span>SELECT</span>
                                  <FiCornerDownLeft className="text-xs" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Command Palette Footer */}
              <div className="px-4 py-2.5 bg-bgPrimary/80 border-t border-borderDark/60 flex items-center justify-between text-[11px] font-mono text-textMuted">
                <div className="flex items-center gap-3">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-bgCard border border-borderDark text-accentCyan">↑↓</kbd> Navigate</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-bgCard border border-borderDark text-accentCyan">↵</kbd> Select</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-bgCard border border-borderDark text-accentCyan">ESC</kbd> Close</span>
                </div>
                <div className="hidden sm:block text-accentCyan font-semibold">
                  TRIONN CLI v2.0
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
