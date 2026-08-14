import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { FiLock, FiUser, FiShield, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/api';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        localStorage.setItem('suman_admin_jwt', data.token);
        localStorage.setItem('suman_admin_authenticated', 'true');
        navigate('/admin');
      } else {
        setError(data.message || 'Access Denied: Invalid credentials. Protected portal for Suman Maity only.');
      }
    } catch (err) {
      console.warn('[Login Auth Warning]: Backend authentication API unreachable. Attempting offline fallback verification...');
      // Fallback verification for offline / local dev mode when backend server is off
      if (email.trim().toLowerCase() === 'suuman.maity@gmail.com' && password === 'Sumanisadmin') {
        localStorage.setItem('suman_admin_authenticated', 'true');
        localStorage.setItem('suman_admin_jwt', 'offline_dev_session_token');
        navigate('/admin');
      } else {
        setError('Access Denied: Invalid credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-noise py-12">
      <div className="max-w-md w-full glass-panel p-6 sm:p-10 rounded-3xl border border-borderDark shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-accentCyan/10 border border-accentCyan/30 text-accentCyan flex items-center justify-center font-display font-extrabold text-2xl mx-auto mb-4">
            SM
          </div>
          <h1 className="text-2xl font-display font-extrabold text-textPrimary">SUMAN MAITY CMS</h1>
          <p className="text-xs font-mono text-textMuted mt-1 flex items-center justify-center gap-1">
            <FiShield className="text-accentCyan" /> PROTECTED ADMIN PORTAL
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-start gap-2">
            <FiAlertCircle className="text-base shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-xs font-mono text-textMuted uppercase block mb-2">ADMIN EMAIL</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="suuman.maity@gmail.com"
                className="w-full bg-bgPrimary border border-borderDark rounded-xl pl-11 pr-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-textMuted uppercase block mb-2">SECURITY PASSWORD</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-bgPrimary border border-borderDark rounded-xl pl-11 pr-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan transition-colors"
              />
            </div>
          </div>

          <MagneticButton strength={0.3} className="w-full">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-accentCyan text-bgPrimary font-display font-bold text-sm hover:bg-white transition-all shadow-xl shadow-accentCyan/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  AUTHENTICATING...
                </>
              ) : (
                'AUTHENTICATE SESSION'
              )}
            </button>
          </MagneticButton>
        </form>
      </div>
    </div>
  );
};
