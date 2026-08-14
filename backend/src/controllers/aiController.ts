import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_PROMPT = `
You are "Ask Suman AI", an official AI Recruiter Assistant on Suman Maity's personal developer portfolio website. Your mission is to assist recruiters, HR managers, hiring managers, and technical interviewers by answering any questions about Suman's skills, experience, education, certificates, projects, availability, and contact channels.

--- RECRUITER EVALUATION FRAMEWORKS & INSTRUCTIONS ---
You are specially trained to answer key recruiter evaluation questions:
1. **30-Second Elevator Pitch**: Provide a high-velocity 30s summary emphasizing Full-Stack MERN + AI + Real-time WebRTC capabilities.
2. **Real-World vs Tutorial Verification**: Confirm that Suman's projects (TALENT AI & BAATCHEET) are 100% custom-built, full-stack production platforms, NOT generic video tutorials.
3. **Technical Interview Questions Generator**: Generate 5 challenging technical questions based on WebRTC signaling, Monaco Code Editor state, Gemini ATS prompt engineering, JWT auth, and MongoDB indexing.
4. **Candidate Strengths & Fit**: Highlight strengths in React/TypeScript UI architecture, WebRTC/Socket.IO real-time protocols, Node.js API development, and Gemini AI integration.
5. **Growth Areas**: Be transparent that Suman is an early-career developer graduating in 2027 who is rapidly mastering enterprise microservice architecture.
6. **Hiring Recommendation**: Confidently recommend moving Suman to the next interview stage for Full Stack, Frontend, or AI application developer roles.

--- SUMAN MAITY'S PROFILE & BACKGROUND ---
- Name: Suman Maity
- Title: Full Stack MERN Developer & AI Engineer
- Experience: High-performance web application engineering, real-time messaging, WebRTC video calling, generative AI integrations, and reactive UI design.
- Work Experience: Web Developer Intern at CodeAlpha (Oct 2024 – Jan 2025), where he built responsive React.js web apps, integrated REST APIs, and worked in Agile sprints.
- Education: B.Tech in Computer Science & Engineering at OmDayal Group of Institutions (Expected Graduation: 2027, Final Year). Academic Score: SGPA 7.64 / 10 (till 6th semester).
- Certifications & Honors:
  1. 🏆 OMTECH 2026 Hackathon — 1st Runner-Up Certificate of Merit (May 2026: Built AuraVision Accessibility Platform with Multilingual Text-to-Image, 3-Language Morse Code, local AI, and Text-to-Sign/Sign-to-Text conversion).
  2. 📜 CodeAlpha Virtual Web Development Internship — Certificate of Completion (Jan 2025: 3-Month Virtual Web Development Internship focusing on React.js, JavaScript ES6+, REST APIs, and responsive UI).
  3. ⚡ TechZeathon 2026 National Hackfest — Certificate of Participation (May 2026: Organized by SVIST & Institution's Innovation Council).
  4. 🚀 VOYAGE 2025 Technical Fest — Project Exhibition & Poster Presentation (April 2025: Organized by OmDayal Group of Institutions IIC & IQAC).
- Location: Howrah / Kolkata, West Bengal, India (Open to Remote, Hybrid, & Onsite opportunities worldwide).
- Hiring Availability: Actively interviewing for Full-Time / Contract roles (Full Stack Developer, Frontend Engineer, MERN Developer, AI Application Developer). Short notice joiner.
- Contact Details:
  - Email: suuman.maity@gmail.com
  - Phone / WhatsApp: +91 8597433833
  - Resume PDF: /Suman_Maity_Resume.pdf
  - GitHub: https://github.com/sumancpp
  - LinkedIn: https://www.linkedin.com/in/suman-maity-b84879292/
- Creator / Identity: You were designed and engineered by Suman Maity himself using React, Node.js, Express, and Google Gemini AI API to showcase his full-stack capabilities to recruiters!

--- FEATURED PROJECTS ---
1. **TALENT AI** (AI-Powered Resume Search, ATS & Technical Evaluation Platform)
   - Live URL: https://talentai.sumann.in/
   - GitHub Repo: https://github.com/sumancpp/ai-resume-ats
   - Highlights: Built an AI-driven ATS automating resume parsing, candidate scoring, skill extraction, recruiter summaries, Monaco Code Sandbox, WebRTC video interviews, and automated PDF offer letters.
   - Tech Stack: MERN Stack (MongoDB, Express, React, Node.js), Google Gemini AI API, WebRTC, Socket.IO, Tailwind CSS.

2. **BAATCHEET** (Real-Time Chat & Collaboration Platform)
   - Live URL: https://baatcheet.sumann.in/
   - GitHub Repo: https://github.com/sumancpp/RealTimeChat
   - Highlights: Developed a real-time messaging platform supporting JWT auth, WebRTC audio/video calling, browser screen sharing, collaborative whiteboard, disappearing Ghost Ink messages, and Gemini AI code review.
   - Tech Stack: MERN Stack, Socket.IO, WebRTC, Google Gemini AI API, Cloudinary.

--- TECHNICAL SKILLS & CAPABILITIES ---
- Frontend: React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express.js, REST APIs, JWT Authentication, MongoDB, Mongoose
- Real-Time Systems: Socket.IO, WebRTC, Peer-to-Peer Communication, Screen Sharing, Real-Time Signaling
- AI & Intelligent Applications: Google Gemini API, Generative AI, AI Integration, Prompt Engineering, AI Code Analysis, AI Summarization
- Programming: Java, JavaScript, C++, C
- Tools & Infrastructure: Git, GitHub, Docker, Cloudinary, Postman, Monaco Editor, PDFKit

--- RESPONSE GUIDELINES ---
- Be enthusiastic, professional, polite, concise, and helpful.
- Format responses using clean Markdown (bullet points, bold text).
- Always encourage recruiters to reach out via email (suuman.maity@gmail.com) or phone (+91 8597433833).
`;

/**
 * Fallback knowledge engine when GEMINI_API_KEY is not configured in .env
 */
const generateKnowledgeFallback = (query: string): string => {
  const q = query.trim();

  // 1. Job Description Comparison & Role Match
  if (/\b(compare|job description|against this job|jd|job match|role match|fit for this job)\b/i.test(q)) {
    return `📊 **Portfolio vs Job Description Evaluation Framework**:\n\n- **Full-Stack / MERN Developer Roles**: **100% Match** (Node.js, Express, MongoDB Atlas, React, TypeScript, REST APIs).\n- **Frontend / React Engineer Roles**: **100% Match** (React 18+, Tailwind CSS, Framer Motion, glassmorphism UI/UX, responsive state management).\n- **AI / Automation Roles**: **100% Match** (Google Gemini API prompt engineering, ATS resume parsing, Gemini code review pipelines).\n- **Real-Time Protocols**: **100% Match** (WebRTC video calling, Socket.IO multi-user signaling).`;
  }

  // 2. Follow-Up Questions on Impressive Projects
  if (/\b(follow-up|follow up|followup|deep dive|questions about|impressive project|tell me more about project)\b/i.test(q)) {
    return `🔍 **Deep-Dive Follow-Up Questions for Suman's Top Project (TALENT AI)**:\n\n1. *\"How did you structure the Google Gemini API prompts to extract structured JSON data from unformatted resume PDFs without schema errors?\"*\n2. *\"In your Monaco Code Editor sandbox, how do you capture execution logs securely in the browser?\"*\n3. *\"How did you manage WebRTC peer-connection state across multiple video candidates during live ATS interviews?\"*`;
  }

  // 3. Inconsistency / Unusual / Authenticity Check
  if (/\b(unusual|inconsistent|inconsistency|authentic|fake|claim|claims|verify claims)\b/i.test(q)) {
    return `🛡️ **Portfolio Verification & Consistency Audit**:\n\n- **Code Transparency**: 100% of source code is publicly accessible on [GitHub](https://github.com/sumancpp).\n- **Production Live Demos**: All projects (TALENT AI & BAATCHEET) are hosted on live production domains with working SSL & backends.\n- **Consistency**: Engineering skills reported match exact technologies used across commits (React, TypeScript, WebRTC, Socket.IO, Express, Mongoose).`;
  }

  // 4. Technologies Worked With, Tech Stack & Skills
  if (/\b(skill|skills|technolog|technologies|tech stack|frameworks|tools|stack|worked with|capabilities|languages|what skills)\b/i.test(q)) {
    return `🛠️ **Complete Technology Stack & Skills Breakdown**:\n\n- **Frontend**: React.js, TypeScript, Next.js, Tailwind CSS, Three.js / R3F, Framer Motion, Redux.\n- **Backend**: Node.js, Express.js, REST APIs, Socket.IO, WebRTC signaling, JWT Auth, Nodemailer.\n- **Databases**: MongoDB Atlas, Mongoose, PostgreSQL.\n- **Languages**: TypeScript, JavaScript (ES6+), C++, Java.\n- **AI & Cloud Tools**: Google Gemini AI API, Cloudinary, Docker, Git / GitHub, Vercel, Render.`;
  }

  // 5. 5 Technical Interview Questions Generator
  if (/\b(5 technical|5 interview|interview questions|technical questions|questions based)\b/i.test(q)) {
    return `❓ **5 Tailored Technical Interview Questions for Suman**:\n\n1. *\"In BAATCHEET, how did you architect WebRTC peer-connection signaling over Socket.IO to handle network reconnects?\"*\n2. *\"How do you optimize state rendering when handling live updates in React & Monaco Code Editor?\"*\n3. *\"In TALENT AI, how do you handle structured output extraction from raw PDF resumes using Google Gemini API?\"*\n4. *\"How do you secure JWT auth tokens and handle CORS in Express production deployments?\"*\n5. *\"What strategies do you use in MongoDB to index schemas for low-latency queries?\"*`;
  }

  // 6. 30-Second Elevator Pitch & Why Interview Suman
  if (/\b(30-sec|30s|30 sec|30 second|summarize|elevator pitch|why interview|why should i interview|why hire|why should i hire)\b/i.test(q)) {
    return `⚡ **Suman Maity in 30 Seconds**:\n\n- **Role**: Full Stack MERN & AI Application Developer.\n- **Core Strength**: Engineers production-grade, real-time web applications with complex features (WebRTC video calling, Socket.IO multi-user sync, Gemini AI integrations).\n- **Key Projects**: **TALENT AI** (AI ATS + Monaco Code Sandbox) & **BAATCHEET** (Real-Time WebRTC Workspace).\n- **Track Record**: Runner-Up at OMTECH 2026 Hackathon, Web Developer Intern at CodeAlpha.\n- **Recommendation**: Strong **YES** to move to the technical interview stage for Full Stack, Frontend, or Node/AI roles!`;
  }

  // 7. Real-World Projects vs Tutorials Proof
  if (/\b(tutorial|tutorials|real-world|real world|real-project|copy)\b/i.test(q)) {
    return `🎯 **100% Real-World Custom Engineering (Zero Generic Tutorials)**:\n\n- **TALENT AI**: A multi-feature ATS platform with live WebRTC video interviews, candidate scoring algorithms, and an embedded Monaco Code Editor.\n- **BAATCHEET**: Features custom WebRTC canvas whiteboard sync, disappearing Ghost Ink messages, and real-time AI code reviews.\n- Both applications feature full backend API infrastructure, database models, live domain deployment, and verified GitHub source code.`;
  }

  // 8. Candidate Strengths & Strongest Skills
  if (/\b(strongest skill|top skill|strengths|best at)\b/i.test(q)) {
    return `🛠️ **Suman's Strongest Technical Skills**:\n\n1. **Advanced React & TypeScript Architecture**: Custom hooks, state management, complex layout mechanics, glassmorphism UI/UX.\n2. **Real-Time Protocols**: WebRTC P2P signaling (video/audio/screen share) & Socket.IO bidirectional websockets.\n3. **Generative AI Integration**: Google Gemini API prompt engineering, ATS resume parsing, AI code review.\n4. **Full-Stack Node/Express & MongoDB**: REST API architecture, JWT authentication, Mongoose schemas, Cloudinary asset pipelines.`;
  }

  // 9. Ideal Target Roles & Fit
  if (/\b(role|roles|fit for|good fit|position|positions|type of role)\b/i.test(q)) {
    return `💼 **Ideal Target Roles for Suman**:\n\n1. **Frontend / React Engineer** (Specializing in complex UIs, performance, & TypeScript).\n2. **Full Stack MERN Developer** (Building end-to-end Node.js APIs & React frontends).\n3. **AI Application / Generative AI Developer** (Integrating LLM APIs, prompt pipelines, & automation).\n4. **Real-Time Software Engineer** (WebRTC video/audio, Socket.IO web applications).`;
  }

  // 10. Hiring Recommendation
  if (/\b(recommend|recommendation|next stage|next interview stage|pass candidate|hire him)\b/i.test(q)) {
    return `✅ **Strong Hiring Recommendation: Move to Next Interview Stage!**\n\n**Why?**\n- **Production Capability**: Demonstrates ability to ship complex, full-stack applications (WebRTC, AI, WebSockets).\n- **High Velocity & Problem Solving**: Hackathon Runner-Up (OMTECH 2026), strong CS fundamentals (B.Tech CSE), and quick learner.\n- **Modern Stack Proficiency**: Speaks React, TypeScript, Node.js, and Generative AI natively.\n- **Immediate Availability**: Ready for short notice joining!`;
  }

  // 11. Personal Contributions
  if (/\b(contribut|personally|his contribution|what did he do|his role)\b/i.test(q)) {
    return `👨‍💻 **Suman's Solo Architecture & Contributions**:\n\n- **TALENT AI**: 100% designed and built the React frontend, Express REST endpoints, Gemini ATS prompt parser, Monaco editor integration, and WebRTC video call controller.\n- **BAATCHEET**: Architected the Socket.IO signaling server, WebRTC screen sharing canvas, MongoDB schemas, and Cloudinary media upload pipelines.`;
  }

  // 12. Growth Areas & Weaknesses
  if (/\b(weakness|weaknesses|gaps|growth area|growth areas)\b/i.test(q)) {
    return `⚖️ **Candidate Assessment & Growth Areas**:\n\n- **Current Level**: Early-career engineer / final year B.Tech student (graduating 2027), meaning senior-level system design at enterprise scale (e.g. Kubernetes, microservices mesh) is an ongoing area of growth.\n- **Mitigating Strengths**: Already building advanced real-time & AI production systems, demonstrating senior-level initiative and rapid learning curve.`;
  }

  // 13. Project Impact & Results
  if (/\b(impact|measurable|results|metrics|achieved)\b/i.test(q)) {
    return `📈 **Project Impact & Engineering Metrics**:\n\n- **TALENT AI**: Reduced manual resume screening time by ~70% via automated Gemini ATS parsing and candidate ranking algorithms.\n- **BAATCHEET**: Achieved sub-100ms real-time messaging latency using Socket.IO and WebRTC mesh networking.\n- **OMTECH 2026 Hackathon**: Secured **Runner-Up position** out of dozens of competitive engineering teams by rapidly building a full-stack production prototype under strict time limits.`;
  }

  // 14. Certificates & Achievements
  if (/\b(certificat|certificate|certificates|certification|awards|honors|hackathon|omtech|runner|codealpha|internship|techzeathon|voyage|credential)\b/i.test(q)) {
    return `Suman's Verified Achievements & Certificates:\n\n1. 🏆 **OMTECH 2026 Hackathon — 1st Runner-Up Certificate of Merit**\n   - **Issuing Body**: OmDayal Group of Institutions (Department of CSE, IIC & IQAC, IEEE Computer Society)\n   - **Date**: May 2026\n   - **Project**: **AuraVision – Accessibility for Everyone** (Multilingual Text-to-Image, Morse Code, local AI Chatbot, Text-to-Sign Language).\n\n2. 📜 **CodeAlpha Virtual Web Development Internship — Certificate of Completion**\n   - **Issuing Body**: CodeAlpha (Student ID: CA/S3/8251)\n   - **Period**: Oct 10, 2024 – Jan 10, 2025 (3-Month Virtual Internship)\n   - **Focus**: Frontend Web Engineering, React.js, ES6+ JavaScript, REST APIs, dynamic UI components, and state management.\n\n3. ⚡ **TechZeathon 2026 National Hackfest — Certificate of Participation**\n   - **Issuing Body**: Swami Vivekananda Institute of Science and Technology (SVIST) & Institution's Innovation Council\n   - **Date**: May 28–29, 2026\n   - **Motto**: Innovate • Collaborate • Sustain\n\n4. 🚀 **VOYAGE 2025 Technical Fest — Project Exhibition & Poster Presentation**\n   - **Issuing Body**: OmDayal Group of Institutions (IIC & IQAC)\n   - **Date**: April 11–12, 2025\n   - **Category**: College CSE Category`;
  }

  // 15. Education & College Details
  if (/\b(education|college|degree|university|btech|sgpa|cgpa|graduation|student)\b/i.test(q)) {
    return `Suman's educational background:\n\n🎓 **B.Tech in Computer Science & Engineering**\n- **Institution**: OmDayal Group of Institutions\n- **Academic Status**: Final Year (Expected Graduation: 2027)\n- **Academic Score**: SGPA 7.64 / 10 (till 6th Semester)\n- **Specializations**: Full-Stack MERN Engineering, Real-Time Protocols (WebRTC/Socket.IO), C++, Java, and AI Application Development.`;
  }

  // 16. Work Experience & Internships
  if (/\b(experience|intern|internship|codealpha|work experience)\b/i.test(q)) {
    return `Suman's professional experience:\n\n💼 **Web Developer Intern at CodeAlpha** (Oct 2024 – Jan 2025)\n- Engineered responsive web applications using React.js, JavaScript (ES6+), and CSS3.\n- Built reusable component libraries, integrated REST APIs, and worked in Agile sprints.\n- Debugged, tested, and optimized app rendering performance.`;
  }

  // 17. Projects Overview
  if (/\b(project|projects|talent ai|baatcheet|shifra|virtual assistant|food|delivery|cafe|background|remover|removebg|gym|fitness|weather|climate|snake|game|tic tac toe|tictactoe|email|validator|spotify|music|player|portfolio|built)\b/i.test(q)) {
    return `Suman has engineered major production projects:\n\n1. **[TALENT AI](https://talentai.sumann.in/)**: AI-Powered Resume Search & ATS Platform. Features automated resume parsing, candidate ranking, Monaco Code Sandbox, and WebRTC video interviews. ([GitHub Repo](https://github.com/sumancpp/ai-resume-ats))\n2. **[BAATCHEET](https://baatcheet.sumann.in/)**: Real-Time Chat & Collaboration Platform. Supports WebRTC audio/video calls, screen sharing, collaborative whiteboard, and Gemini AI code reviews. ([GitHub Repo](https://github.com/sumancpp/RealTimeChat))\n3. **[SHIFRA 2.0](https://virtual-assistant-eight-omega.vercel.app/)**: Voice-Powered Virtual Assistant. Features real-time Speech Recognition transcription, speech synthesis, and microphone stream handling. ([GitHub Repo](https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant))\n4. **[SUMAN CAFE (FOOD DELIVERY)](https://suman-cafe.netlify.app/)**: Responsive Food Delivery App. Features category filtering, dynamic cart system, Redux/Context state management, and custom toast notifications. ([GitHub Repo](https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery))\n5. **[IMAGE BACKGROUND REMOVER](https://remove-image-background-and-download.netlify.app/)**: Pure JS & Remove.bg API Tool. Supports client-side file reading, instant background segmentation, side-by-side preview, and transparent PNG downloads. ([GitHub Repo](https://github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover))\n6. **[YOUR GYM CENTER](https://your-gym-center.netlify.app/)**: Fitness & Gym Web App built from scratch. Features interactive membership forms, trainer showcases, and smooth CSS animations. ([GitHub Repo](https://github.com/sumancpp/Projects/tree/main/Your%20Gym))\n7. **[REAL-TIME WEATHER APP](https://weather-app-by-suman.netlify.app/)**: Real-Time Weather Forecasting App. Features live Weather API fetching, temperature, humidity, wind speed, and dynamic climate icons. ([GitHub Repo](https://github.com/sumancpp/Projects/tree/main/Weather%20App))\n8. **[RESPONSIVE SNAKE GAME](https://suman-snake-game.netlify.app/)**: Classic Cross-Device Arcade Snake Game. Built with HTML5 Canvas, 60fps game loop, touch swipe controls & keyboard arrow input. ([GitHub Repo](https://github.com/sumancpp/Projects/tree/main/Snake%20Game))\n9. **[TIC TAC TOE GAME](https://aquamarine-khapse-997869.netlify.app/)**: Classic 2-Player & AI Web Game. Features 2D array win pattern evaluation, turn indicators & round resets. ([GitHub Repo](https://github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe))\n10. **[REAL-TIME EMAIL VALIDATOR](https://jocular-souffle-aaf03b.netlify.app/)**: Real-Time Email Syntax & MX Record Verification Utility. Checks RFC 5322 compliance and disposable email domains. ([GitHub Repo](https://github.com/sumancpp/Projects/tree/main/Email%20Validator))\n11. **[SPOTIFY MUSIC PLAYER](https://stately-llama-c0f7e4.netlify.app/)**: Spotify Web Player Clone. Features HTML5 Audio API playback, custom seek bar, volume control, and track switching. ([GitHub Repo](https://github.com/sumancpp/Projects/tree/main/Spotify))`;
  }

  // 17b. Certificates & Achievements
  if (/\b(certificate|certificates|honors|omtech|hackathon|runner up|codealpha|internship|techzeathon|voyage|award|credential)\b/i.test(q)) {
    return `Suman's Verified Achievements & Certificates:\n\n1. 🏆 **OMTECH 2026 Hackathon — 1st Runner-Up Certificate of Merit**\n- **Issuing Body**: OmDayal Group of Institutions (Department of CSE, IIC & IQAC, IEEE Computer Society)\n- **Date**: May 2026\n- **Project**: **AuraVision – Accessibility for Everyone** (Multilingual Text-to-Image, Morse Code, local AI Chatbot, Text-to-Sign Language).\n\n2. 📜 **CodeAlpha Virtual Web Development Internship — Certificate of Completion**\n- **Issuing Body**: CodeAlpha (Student ID: CA/S3/8251)\n- **Period**: Oct 10, 2024 – Jan 10, 2025 (3-Month Virtual Internship)\n- **Focus**: Frontend Web Engineering, React.js, ES6+ JavaScript, REST APIs, dynamic UI components, and state management.\n\n3. ⚡ **TechZeathon 2026 National Hackfest — Certificate of Participation**\n- **Issuing Body**: Swami Vivekananda Institute of Science and Technology (SVIST) & Institution's Innovation Council\n- **Date**: May 28–29, 2026\n- **Motto**: Innovate • Collaborate • Sustain\n\n4. 🚀 **VOYAGE 2025 Technical Fest — Project Exhibition & Poster Presentation**\n- **Issuing Body**: OmDayal Group of Institutions (IIC & IQAC)\n- **Date**: April 11–12, 2025\n- **Category**: College CSE Category`;
  }

  // 18. LinkedIn & Profiles
  if (/\b(linkedin|social|profile|url|link)\b/i.test(q)) {
    return `Here are Suman's professional profiles:\n\n- 💼 **LinkedIn**: [linkedin.com/in/suman-maity-b84879292](https://www.linkedin.com/in/suman-maity-b84879292/)\n- 🐙 **GitHub**: [github.com/sumancpp](https://github.com/sumancpp)\n- 📧 **Email**: [suuman.maity@gmail.com](mailto:suuman.maity@gmail.com)\n- 📞 **Phone / WhatsApp**: [+91 8597433833](tel:+918597433833)`;
  }

  // 19. GitHub Profile
  if (/\b(github|git|repository|repositories|repo|repos)\b/i.test(q)) {
    return `Here are Suman's GitHub links & code repositories:\n\n- 🐙 **GitHub Profile**: [github.com/sumancpp](https://github.com/sumancpp)\n- 🚀 **TALENT AI Repo**: [github.com/sumancpp/ai-resume-ats](https://github.com/sumancpp/ai-resume-ats)\n- 💬 **BAATCHEET Repo**: [github.com/sumancpp/RealTimeChat](https://github.com/sumancpp/RealTimeChat)\n- 🎤 **SHIFRA 2.0 Repo**: [github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant](https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant)\n- 🍔 **FOOD DELIVERY Repo**: [github.com/sumancpp/React-Projects/tree/main/Food%20Delivery](https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery)\n- 🖼️ **BACKGROUND REMOVER Repo**: [github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover](https://github.com/sumancpp/Projects/tree/main/Image%20Background%20Remover)\n- 💪 **YOUR GYM Repo**: [github.com/sumancpp/Projects/tree/main/Your%20Gym](https://github.com/sumancpp/Projects/tree/main/Your%20Gym)\n- 🌤️ **WEATHER APP Repo**: [github.com/sumancpp/Projects/tree/main/Weather%20App](https://github.com/sumancpp/Projects/tree/main/Weather%20App)\n- 🐍 **SNAKE GAME Repo**: [github.com/sumancpp/Projects/tree/main/Snake%20Game](https://github.com/sumancpp/Projects/tree/main/Snake%20Game)\n- ⭕ **TIC TAC TOE Repo**: [github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe](https://github.com/sumancpp/Projects/tree/main/Tic%20Tac%20Toe)\n- ✉️ **EMAIL VALIDATOR Repo**: [github.com/sumancpp/Projects/tree/main/Email%20Validator](https://github.com/sumancpp/Projects/tree/main/Email%20Validator)\n- 🎵 **SPOTIFY PLAYER Repo**: [github.com/sumancpp/Projects/tree/main/Spotify](https://github.com/sumancpp/Projects/tree/main/Spotify)`;
  }

  // 20. Contact & Hiring Details
  if (/\b(contact|email|phone|whatsapp|reach|remote|available|resume|notice|location)\b/i.test(q)) {
    return `Suman is **actively interviewing for Full-Time & Contract roles** (Full Stack, Frontend, MERN/AI Developer)!\n\n- 📧 **Email**: [suuman.maity@gmail.com](mailto:suuman.maity@gmail.com)\n- 📞 **Phone / WhatsApp**: [+91 8597433833](tel:+918597433833)\n- 📍 **Location**: Howrah / Kolkata, India (Open to Remote, Hybrid & Onsite roles worldwide).\n- 📄 **Resume PDF**: [Download Suman's Resume](/Suman_Maity_Resume.pdf)\n- 💼 **LinkedIn**: [linkedin.com/in/suman-maity-b84879292](https://www.linkedin.com/in/suman-maity-b84879292/)\n- 🐙 **GitHub**: [github.com/sumancpp](https://github.com/sumancpp)`;
  }

  // 21. Time & Date Queries (Strict Phrase Match to avoid false positive on 'candidate')
  if (/\b(current time|local time|what is the time|clock|what date is today)\b/i.test(q)) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return `The current local time is **${timeStr} (IST)** on **${dateStr}**.`;
  }

  // 22. Creator & Identity (Strict Phrase Match to avoid false positive on 'this')
  if (/\b(who created|who made|who built|who are you|creator|author)\b/i.test(q)) {
    return `I am **Ask Suman AI**, an AI recruiter assistant designed and engineered by **Suman Maity** himself using React, Express, and Google Gemini AI to assist recruiters!`;
  }

  // 23. Greetings (Strict Word Boundary)
  if (/\b(hello|greetings)\b/i.test(q) || /^hi$/i.test(q) || /^hey$/i.test(q)) {
    return `Hello! I am **Ask Suman AI**, Suman Maity's personal portfolio assistant.\n\nSuman is a **Full Stack MERN & AI Engineer** specializing in React, Node.js, WebRTC, and Generative AI.\n\nHow can I help you evaluate Suman for your team today? Feel free to ask about his **skills**, **projects**, **education**, **certificates**, or **contact channels**!`;
  }

  return `Suman Maity is a **Full Stack MERN & AI Engineer** specializing in React, Node.js, WebRTC, and Generative AI.\n\n- 💼 **LinkedIn**: [linkedin.com/in/suman-maity-b84879292](https://www.linkedin.com/in/suman-maity-b84879292/)\n- 🐙 **GitHub**: [github.com/sumancpp](https://github.com/sumancpp)\n- 📧 **Email**: [suuman.maity@gmail.com](mailto:suuman.maity@gmail.com)\n- 📞 **Phone**: [+91 8597433833](tel:+918597433833)\n- 📄 **Resume**: [Download PDF](/Suman_Maity_Resume.pdf)\n\nFeel free to ask me about his **projects**, **30s summary**, **tech stack**, **education**, or **hiring recommendation**!`;
};

export const askSumanAI = async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body as { message: string; history?: ChatHistoryItem[] };

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a non-empty message prompt.' });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // If Gemini API Key is missing, use intelligent knowledge-engine fallback
    if (!apiKey || apiKey === 'your_gemini_api_key') {
      const fallbackResponse = generateKnowledgeFallback(message);
      return res.status(200).json({
        success: true,
        reply: fallbackResponse,
        mode: 'fallback',
      });
    }

    // Call Google Gemini API
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });


    // Format chat history for Gemini API
    const formattedHistory = (history || []).map((h) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }],
    }));

    const chatSession = model.startChat({
      history: formattedHistory,
    });

    const result = await chatSession.sendMessage(message.trim());
    const responseText = result.response.text();

    return res.status(200).json({
      success: true,
      reply: responseText,
      mode: 'live_gemini',
    });
  } catch (error) {
    console.error('[AI Chat API Error]:', error);
    // Graceful fallback on API limit or network error
    const fallbackResponse = generateKnowledgeFallback(req.body.message || '');
    return res.status(200).json({
      success: true,
      reply: fallbackResponse,
      mode: 'fallback_error',
    });
  }
};
