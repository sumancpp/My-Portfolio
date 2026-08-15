import React, { useState, useRef, useEffect } from 'react';
import { FiCpu, FiX, FiSend, FiUser, FiZap, FiMinimize2, FiMic, FiMicOff, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { API_BASE_URL } from '../../utils/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '🎯 30-Sec Summary: Why interview Suman?',
  '🚀 What are Suman\'s top production projects?',
  '🛠️ Real-world engineering vs Tutorials proof?',
  '❓ Give me 5 tech interview questions for Suman',
  '💼 Ideal roles & hiring recommendation?',
  '📬 Direct Contact & Resume Download',
];

export const AskSumanAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: '👋 Hi! I am **Ask Suman AI**, Suman\'s AI Recruiter Assistant. I can evaluate Suman\'s portfolio for your job description, summarize his 30s elevator pitch, generate 5 technical interview questions, or provide contact links!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Global custom event listener to open AI Chat from Command Palette
  useEffect(() => {
    const handleOpenAiChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenAiChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenAiChat);
  }, []);

  // Handle Speech Recognition (Microphone)
  const toggleSpeechRecognition = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join('');
        setInput(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Speak text aloud using Speech Synthesis
  const speakText = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
      return (
        <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : ''}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-accentCyan">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              return (
                <a
                  key={pIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accentCyan underline font-mono hover:text-white transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {linkMatch[1]}
                </a>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  const getOfflineKnowledgeResponse = (query: string): string => {
    const q = query.trim();

    if (/\b(skill|skills|capability|capabilities|tech stack|technologies|frameworks|tools|stack|languages|what skills)\b/i.test(q)) {
      return `🛠️ **Suman Maity's Technical Skills & Capabilities**:

- **Frontend**: React.js, TypeScript, Next.js, Tailwind CSS, Three.js / R3F, Framer Motion, Redux, HTML5/CSS3.
- **Backend**: Node.js, Express.js, REST APIs, Socket.IO, WebRTC (P2P Video/Audio/Screen Share), JWT Auth.
- **Databases & Cloud**: MongoDB Atlas, Mongoose, PostgreSQL, Cloudinary, Docker, Git/GitHub.
- **Programming Languages**: TypeScript, JavaScript (ES6+), C++, Java.
- **AI Capabilities**: Google Gemini API prompt engineering, ATS resume parsing, AI code review, Voice Assistant (Web Speech API).`;
    }

    if (/\b(compare|job description|against this job|jd|job match|role match|fit for this job)\b/i.test(q)) {
      return `📊 **Job Description Evaluation & Candidate Match**:
Suman Maity is a strong fit for Full-Stack (MERN) & AI Engineering roles:

- **MERN Architecture**: 2+ production apps (**TALENT AI**, **BAATCHEET**).
- **Generative AI Integration**: Hands-on integration of Google Gemini 2.0 API.
- **Real-Time WebSockets & WebRTC**: Custom P2P video/audio streams & canvas collaboration.
- **Education**: B.Tech CSE (Final Year 2027, SGPA 7.64 / 10).`;
    }

    if (/\b(30-sec|30 sec|summary|why interview|why hire|elevator pitch|overview)\b/i.test(q)) {
      return `🎯 **30-Second Elevator Pitch**:
Suman Maity builds production-grade software applications combining React, Node.js, WebRTC, and AI. He has built **TALENT AI** (an ATS candidate ranking engine) and **BAATCHEET** (a WebRTC real-time collaboration tool). Suman was the runner-up at the OMTECH 2026 Hackathon.`;
    }

    if (/\b(projects|featured|talent ai|baatcheet|shifra|virtual assistant|food|delivery|cafe|background|remover|removebg|gym|fitness|weather|climate|snake|game|tic tac toe|tictactoe|email|validator|spotify|music|player|rental|property|apps|built|case studies)\b/i.test(q)) {
      return `🚀 **Suman's Featured Production Projects**:

1. **TALENT AI** ([Live Demo](https://talentai.sumann.in/)) | [GitHub](https://github.com/sumancpp/ai-resume-ats)
   - AI ATS Resume Search, Candidate Ranking, Monaco Code Sandbox & WebRTC Video Interviews.

2. **BAATCHEET** ([Live Demo](https://baatcheet.sumann.in/)) | [GitHub](https://github.com/sumancpp/RealTimeChat)
   - WebRTC Voice/Video Calling, Real-Time Socket.IO Chat, Screen Sharing & Ghost Ink.

3. **SHIFRA 2.0** ([Live Demo](https://virtual-assistant-eight-omega.vercel.app/)) | [GitHub](https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant)
   - Voice-Powered Virtual Assistant with Real-Time Speech Recognition, AI Responses & Speech Synthesis.

4. **SUMAN CAFE (FOOD DELIVERY)** ([Live Demo](https://suman-cafe.netlify.app/)) | [GitHub](https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery)
   - Category-based food filtering, dynamic cart system, Redux/Context state management, and custom toast notifications.

5. **IMAGE BACKGROUND REMOVER** ([Live Demo](https://remove-image-background-and-download.netlify.app/)) | [GitHub](https://github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover)
   - Pure Vanilla JS, FileReader API, Remove.bg REST API integration, before/after preview & transparent PNG download.

6. **YOUR GYM CENTER** ([Live Demo](https://your-gym-center.netlify.app/)) | [GitHub](https://github.com/sumancpp/Projects/tree/main/Your%20Gym)
   - Sleek fitness web application, interactive membership registration forms, smooth scroll CSS keyframes & responsive UI.

7. **REAL-TIME WEATHER APP** ([Live Demo](https://weather-app-by-suman.netlify.app/)) | [GitHub](https://github.com/sumancpp/Projects/tree/main/Weather%20App)
   - Live Weather REST API integration, real-time temperature, humidity, wind speed & dynamic climate condition icons.

8. **RESPONSIVE SNAKE GAME** ([Live Demo](https://suman-snake-game.netlify.app/)) | [GitHub](https://github.com/sumancpp/Projects/tree/main/Snake%20Game)
   - Cross-device arcade Snake game built with HTML5 Canvas, 60fps game loop, touch swipe controls & keyboard arrow input.

9. **TIC TAC TOE GAME** ([Live Demo](https://aquamarine-khapse-997869.netlify.app/)) | [GitHub](https://github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe)
   - Interactive 2-Player web game with 2D array win pattern evaluation, turn indicators & round resets.

10. **REAL-TIME EMAIL VALIDATOR** ([Live Demo](https://jocular-souffle-aaf03b.netlify.app/)) | [GitHub](https://github.com/sumancpp/Projects/tree/main/Email%20Validator)
   - Real-Time email syntax validation (RFC 5322 compliance), MX record verification & disposable email detection.

11. **SPOTIFY MUSIC PLAYER** ([Live Demo](https://stately-llama-c0f7e4.netlify.app/)) | [GitHub](https://github.com/sumancpp/Projects/tree/main/Spotify)
   - Functional Spotify web player clone built with HTML5 Audio API, custom seek bar, playlist track switching & volume controls.

12. **PRIVATE PROPERTY RENTAL** ([Live Demo](https://private-property-rental-by-suman.netlify.app/)) | [GitHub](https://github.com/sumancpp/React-Projects/tree/main/Personal%20Property%20Rental)
   - React & Context API Property Discovery, Search Filtering, Landlord Listings & Direct Gmail Contact.`;
    }

    if (/\b(certificate|certificates|honors|omtech|hackathon|runner up|codealpha|internship|techzeathon|voyage|award|credential)\b/i.test(q)) {
      return `📜 **Suman Maity's Verified Certificates & Honors**:

1. 🏆 **OMTECH 2026 Hackathon — 1st Runner-Up Certificate of Merit**
   - **Issuing Body**: OmDayal Group of Institutions (CSE, IIC & IQAC) in association with IEEE Computer Society.
   - **Project**: **AuraVision – Accessibility for Everyone** (Multilingual Text-to-Image, Morse Code, local AI Chatbot, Text-to-Sign Language).

2. 📜 **CodeAlpha Virtual Web Development Internship — Certificate of Completion**
   - **Issuing Body**: CodeAlpha (Student ID: CA/S3/8251)
   - **Period**: 10th October 2024 to 10th January 2025 (3-Month Internship)
   - **Focus**: Frontend Web Engineering, React.js, JavaScript ES6+, REST APIs, and responsive UI design.

3. ⚡ **TechZeathon 2026 National Hackfest — Certificate of Participation**
   - **Issuing Body**: Swami Vivekananda Institute of Science and Technology (SVIST) & IIC (Ministry of HRD Initiative).
   - **Date**: 28th–29th May 2026 | **Theme**: Innovate • Collaborate • Sustain.

4. 🚀 **VOYAGE 2025 Technical Fest — Project Exhibition & Poster Presentation**
   - **Issuing Body**: OmDayal Group of Institutions (IIC & IQAC).
   - **Date**: 11th–12th April 2025 | **Category**: College C.S.E. Category.`;
    }

    if (/\b(contact|email|phone|resume|hire|reach|linkedin|github)\b/i.test(q)) {
      return `📬 **Direct Contact Details**:
- 💼 **LinkedIn**: [linkedin.com/in/suman-maity-b84879292](https://www.linkedin.com/in/suman-maity-b84879292/)
- 🐙 **GitHub**: [github.com/sumancpp](https://github.com/sumancpp)
- 📧 **Email**: suuman.maity@gmail.com
- 📞 **Phone**: +91 8597433833`;
    }

    return `💡 **Suman Maity — Full-Stack MERN & AI Developer**:
Suman specializes in React.js, Node.js, MongoDB, Socket.IO, WebRTC, and Gemini AI. Check out his **TALENT AI** and **BAATCHEET** projects or reach him at suuman.maity@gmail.com!`;
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const query = customPrompt || input;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
          text: m.text,
        }));

      const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      const data = await res.json();
      const aiReplyText = data.success && data.reply ? data.reply : getOfflineKnowledgeResponse(query);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const fallbackReply = getOfflineKnowledgeResponse(query);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-accentCyan to-blue-500 text-bgPrimary font-display font-bold text-xs sm:text-sm shadow-2xl hover:shadow-accentCyan/40 hover:scale-105 transition-all duration-300"
          title="Ask Suman AI Assistant"
        >
          <FiCpu className="text-sm sm:text-lg animate-pulse shrink-0" />
          <span className="hidden sm:inline">ASK SUMAN AI</span>
          <span className="sm:hidden font-mono font-bold text-[11px] tracking-wider">AI</span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-bgPrimary animate-ping shrink-0" />
        </button>
      )}

      {isOpen && (
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          className="w-[92vw] sm:w-[420px] h-[550px] rounded-3xl bg-bgSecondary/95 border border-borderDark shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl text-textPrimary"
        >
          {/* Header */}
          <div className="p-4 border-b border-borderDark flex items-center justify-between bg-bgPrimary/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accentCyan/10 border border-accentCyan/30 flex items-center justify-center text-accentCyan">
                <FiCpu className="text-base" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-sm text-textPrimary flex items-center gap-2">
                  ASK SUMAN AI
                  <span className="text-[10px] font-mono font-bold text-accentCyan bg-accentCyan/10 px-2 py-0.5 rounded-full border border-accentCyan/20">
                    GEMINI 2.0
                  </span>
                </h3>
                <p className="text-[10px] font-mono text-textMuted">Recruiter Intelligence & Voice Engine</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-textMuted hover:text-textPrimary transition-colors"
                title="Minimize Chat"
              >
                <FiMinimize2 className="text-base" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-textMuted hover:text-textPrimary transition-colors"
                title="Close Chat"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 [scrollbar-width:thin] [scrollbar-color:rgba(0,240,255,0.2)_transparent]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-accentCyan/10 border border-accentCyan/30 flex items-center justify-center text-accentCyan text-xs shrink-0 mt-1">
                    <FiCpu />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                    m.sender === 'user'
                      ? 'bg-accentCyan text-bgPrimary font-medium rounded-tr-none'
                      : 'bg-bgCard border border-borderDark/80 text-textPrimary rounded-tl-none'
                  }`}
                >
                  {renderFormattedText(m.text)}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10 text-[10px] opacity-70">
                    <span>{m.timestamp}</span>
                    {m.sender === 'ai' && (
                      <button
                        onClick={() => speakText(m.id, m.text)}
                        className="hover:text-accentCyan transition-colors"
                        title={speakingMessageId === m.id ? 'Stop voice' : 'Listen voice'}
                      >
                        {speakingMessageId === m.id ? <FiVolumeX /> : <FiVolume2 />}
                      </button>
                    )}
                  </div>
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-borderDark flex items-center justify-center text-textMuted text-xs shrink-0 mt-1">
                    <FiUser />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-accentCyan p-2">
                <FiZap className="animate-spin text-sm" />
                <span>Gemini AI is analyzing recruiter intent...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-borderDark/60 bg-bgPrimary/60 flex items-center gap-2 overflow-x-auto shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 px-3 py-1 rounded-xl border border-borderDark bg-bgPrimary hover:border-accentCyan text-[11px] font-mono text-textMuted hover:text-accentCyan transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-bgPrimary border-t border-borderDark flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Listening to your voice...' : 'Ask about Suman or speak aloud...'}
              className="flex-1 bg-bgSecondary border border-borderDark rounded-xl px-3.5 py-2.5 text-xs text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-accentCyan transition-colors"
            />

            {/* Microphone Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                isListening
                  ? 'bg-accentCyan text-bgPrimary border-accentCyan animate-pulse'
                  : 'bg-bgSecondary border-borderDark text-textMuted hover:text-accentCyan hover:border-accentCyan'
              }`}
              title={isListening ? 'Stop listening' : 'Speak to AI'}
            >
              {isListening ? <FiMicOff className="text-sm" /> : <FiMic className="text-sm" />}
            </button>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-accentCyan text-bgPrimary font-bold hover:bg-white transition-colors disabled:opacity-40 shrink-0"
              title="Send Message"
            >
              <FiSend className="text-sm" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
