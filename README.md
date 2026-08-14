# 🚀 Suman Maity — Full-Stack MERN & AI Developer Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white)](https://webrtc.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)

> **A Next-Generation, Cyberpunk-Inspired Full-Stack Developer Portfolio & AI-Powered CMS.**  
> Features real-time backend telemetry, Google Gemini AI recruiter assistance, WebRTC video integration showcases, interactive 3D elements, and full MongoDB Atlas CRUD database persistence.

---

## 🌟 Key Highlights & Interactive Features

- **🤖 Ask Suman AI (Recruiter Assistant)**: An embedded AI assistant powered by Google Gemini 2.0 Flash (with offline fallback engine) trained to deliver 30-second elevator pitches, technical interview questions, project verification, and candidate fit analysis.
- **⚡ Matrix Rain Mode (`Ctrl + Shift + M`)**: Cyberpunk retro matrix rain canvas mode toggleable via shortcut or UI controls.
- **⌨️ Interactive Command Palette (`Ctrl + K`)**: Instant keyboard navigation, social actions, matrix toggle, and direct route access.
- **🎨 Glassmorphism & Cyber Aesthetics**: Modern dark mode UI with `#00f2fe` cyan accents, Lenis smooth scrolling, custom magnetic buttons, and dynamic cursor tracking.
- **🗄️ 100% Production-Ready MongoDB Atlas CMS**: Complete RESTful CRUD actions for projects with JWT session authentication and automatic database seeding.
- **📊 Real-Time Backend Telemetry**: Interactive system metrics badge fetching operational uptime, database status, and API health endpoints (`/api/health`).
- **📧 Resilience Contact System**: Multi-layer SMTP email processing (Gmail SMTP -> Ethereal Dev Sandbox -> Server Console Fallback).
- **🏆 Verified Credentials & Hackathons**: Dedicated page highlighting awards (OMTECH 2026 Hackathon 1st Runner-Up) and internships (CodeAlpha).

---

## 🏗️ Project Architecture

```
My Portfolio/
├── backend/                  # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── config/           # Database Connection (MongoDB Atlas)
│   │   ├── controllers/      # AI Chat, Contact Email, Auth & Project Controllers
│   │   ├── middleware/       # JWT Admin Security Middleware (requireAdminAuth)
│   │   ├── models/           # Mongoose Data Schemas (Message, Project)
│   │   ├── routes/           # REST API Endpoint Routers (auth, project, contact, ai)
│   │   ├── utils/            # Initial Seed Data Generator
│   │   └── server.ts         # Express App Setup, CORS Security & Telemetry
│   ├── package.json
│   ├── .env.example
│   └── tsconfig.json
│
└── frontend/                 # React 18 + TypeScript + Vite Client App
    ├── src/
    │   ├── components/       # Layout, Glassmorphism UI, 3D Canvas & Widgets
    │   ├── context/          # Custom Cursor & Matrix State Management
    │   ├── hooks/            # Lenis Smooth Scroll Hooks
    │   ├── pages/            # Home, About, Projects, Skills, Contact, Admin CMS
    │   ├── types/            # TypeScript Interfaces & API Types
    │   ├── utils/            # Centralized API Fetch & Auth Helper (api.ts)
    │   └── App.tsx           # Main Application Routes & Layout Structure
    ├── index.html
    ├── package.json
    ├── .env.example
    ├── tailwind.config.js
    └── vite.config.ts
```

---

## 🛠️ Technology Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & Motion** | Tailwind CSS, Framer Motion, GSAP, Lenis Smooth Scroll |
| **3D & Canvas** | Three.js, `@react-three/fiber`, `@react-three/drei`, HTML5 Canvas |
| **Icons & Fonts** | Lucide React, React Icons, Google Fonts (Outfit, Inter) |
| **Backend Runtime** | Node.js, Express.js (TypeScript) |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **AI Integration** | Google Generative AI (`@google/generative-ai` - Gemini 2.0 Flash) |
| **Security & Utilities** | JWT Auth, Helmet, Compression, Express Rate Limit, Cors, Nodemailer |

---

## 🚀 Deployment & Environment Setup Guide

### 1. Render / Railway Deployment (Backend API)

Deploy the `backend` directory to Render or Railway as a Web Service.

**Required Environment Variables in Render Dashboard**:
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
MONGO_URI=mongodb+srv://<admin>:<password>@portfolio.mongodb.net/trionn_portfolio?retryWrites=true&w=majority
JWT_SECRET=your_secure_32byte_jwt_key
ADMIN_EMAIL=suuman.maity@gmail.com
ADMIN_PASSWORD=your_secure_admin_password
GEMINI_API_KEY=your_google_gemini_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=suuman.maity@gmail.com
SMTP_PASS=your_gmail_app_password
CONTACT_RECEIVER_EMAIL=suuman.maity@gmail.com
```

### 2. Vercel / Netlify Deployment (Frontend App)

Deploy the `frontend` directory to Vercel.

**Required Environment Variable in Vercel Dashboard**:
```env
VITE_API_URL=https://your-portfolio-backend.onrender.com
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Backend telemetry & database status | Public |
| `GET` | `/api/projects` | Fetch all projects (Auto-seeds MongoDB if empty) | Public |
| `GET` | `/api/projects/:slug` | Fetch single project by unique slug | Public |
| `POST` | `/api/auth/login` | Authenticate admin & receive JWT session token | Public |
| `POST` | `/api/projects` | Create new project in MongoDB Atlas | Protected (JWT Required) |
| `PUT` | `/api/projects/:id` | Update project in MongoDB Atlas | Protected (JWT Required) |
| `DELETE` | `/api/projects/:id` | Delete project from MongoDB Atlas | Protected (JWT Required) |
| `POST` | `/api/contact` | Send contact form email | Public (Rate limited) |
| `POST` | `/api/ai/chat` | Ask Suman AI recruiter query | Public (Rate limited) |

---

## 👨‍💻 Featured Projects Showcase

1. **[TALENT AI](https://talentai.sumann.in/)**: AI-Powered Resume Search, ATS & Technical Evaluation Platform. ([GitHub](https://github.com/sumancpp/ai-resume-ats))
2. **[BAATCHEET](https://baatcheet.sumann.in/)**: Real-Time Chat, WebRTC Video Calling & Collaboration Workspace. ([GitHub](https://github.com/sumancpp/RealTimeChat))
3. **[SHIFRA 2.0](https://virtual-assistant-eight-omega.vercel.app/)**: Voice-Powered Virtual Assistant with Real-Time Speech Recognition. ([GitHub](https://github.com/sumancpp/React-Projects/tree/main/Virtual%20Assistant))
4. **[SUMAN CAFE](https://suman-cafe.netlify.app/)**: Responsive Food Delivery App with Dynamic Cart & Redux State. ([GitHub](https://github.com/sumancpp/React-Projects/tree/main/Food%20Delivery))

---

## 📬 Contact & Connect

- **Developer**: Suman Maity
- **Role**: Full-Stack MERN & AI Engineer
- **Email**: [suuman.maity@gmail.com](mailto:suuman.maity@gmail.com)
- **Phone / WhatsApp**: +91 8597433833
- **LinkedIn**: [linkedin.com/in/suman-maity-b84879292](https://www.linkedin.com/in/suman-maity-b84879292/)
- **GitHub**: [github.com/sumancpp](https://github.com/sumancpp)

---

*Engineered with ❤️ by Suman Maity.*
