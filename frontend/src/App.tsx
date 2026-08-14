import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/layout/Preloader';
import { CustomCursor } from './components/ui/CustomCursor';
import { CursorProvider } from './context/CursorContext';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ContactPage, NotFoundPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AskSumanAIChat } from './components/ui/AskSumanAIChat';
import { CommandPalette } from './components/ui/CommandPalette';
import { MatrixRainCanvas } from './components/ui/MatrixRainCanvas';

// Protected Route Component for Admin
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('suman_admin_authenticated');
  if (token !== 'true') {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('suman_portfolio_loaded');
  });
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const location = useLocation();

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('suman_portfolio_loaded', 'true');
    setLoading(false);
  };

  // Matrix Mode Shortcut (Ctrl + Shift + M / Cmd + Shift + M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsMatrixMode((prev) => !prev);
      }
    };

    const handleCustomToggle = () => {
      setIsMatrixMode((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-matrix-mode', handleCustomToggle);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-matrix-mode', handleCustomToggle);
    };
  }, []);

  useEffect(() => {
    if (isMatrixMode) {
      document.body.classList.add('matrix-mode');
    } else {
      document.body.classList.remove('matrix-mode');
    }
  }, [isMatrixMode]);

  useEffect(() => {
    // Detect mobile touch devices to preserve native mobile touch scrolling
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <CursorProvider>
      <div className="bg-bgPrimary text-textPrimary min-h-screen relative overflow-x-hidden selection:bg-accentCyan selection:text-bgPrimary font-sans">
        <MatrixRainCanvas isActive={isMatrixMode} onToggle={() => setIsMatrixMode((prev) => !prev)} />
        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>
        <CustomCursor />
        {!isAdminRoute && <Navbar />}

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedAdminRoute>
                  <DashboardPage />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <AskSumanAIChat />}
        {!isAdminRoute && <CommandPalette />}
      </div>
    </CursorProvider>
  );
};

export default App;
