import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { FiSend, FiMail, FiPhone, FiMapPin, FiCheckCircle, FiDownload, FiGithub, FiLinkedin, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    const pdfUrl = '/Suman_Maity_Resume.pdf';
    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Suman_Maity_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const fallbackLink = document.createElement('a');
      fallbackLink.href = pdfUrl;
      fallbackLink.download = 'Suman_Maity_Resume.pdf';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    }
  };

  return (
    <div className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 sm:mb-16">
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          INITIATE CONTACT
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold text-textPrimary mt-4 leading-tight">
          Contact <span className="text-accentCyan font-extrabold">Suman Maity</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Container */}
        <div className="lg:col-span-7 glass-panel p-8 md:p-12 rounded-3xl border border-borderDark">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <FiCheckCircle className="text-6xl text-accentCyan mx-auto animate-bounce" />
              <h2 className="text-3xl font-display font-bold text-textPrimary">Transmission Received!</h2>
              <p className="text-textSecondary">Thank you for reaching out. Suman will reply to your message promptly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-xl border border-borderDark text-accentCyan font-mono text-xs hover:border-accentCyan transition-colors"
              >
                SEND ANOTHER TRANSMISSION
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                  <FiAlertCircle className="text-xl flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono text-textMuted uppercase block mb-2">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Recruiter / Hiring Manager"
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-textMuted uppercase block mb-2">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted uppercase block mb-2">SUBJECT</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Job Opportunity / Project Collaboration"
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-textMuted uppercase block mb-2">MESSAGE</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your inquiry or proposal details here..."
                  className="w-full bg-bgPrimary border border-borderDark rounded-xl px-4 py-3 text-textPrimary text-sm focus:outline-none focus:border-accentCyan transition-colors"
                />
              </div>

              <MagneticButton strength={0.4} className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-accentCyan text-bgPrimary font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl shadow-accentCyan/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      TRANSMITTING... <FiLoader className="animate-spin text-lg" />
                    </>
                  ) : (
                    <>
                      SEND TRANSMISSION <FiSend />
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-bgSecondary border border-borderDark space-y-6">
            <h3 className="text-2xl font-display font-bold text-textPrimary">Direct Channels</h3>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-bgPrimary text-accentCyan border border-borderDark">
                <FiMail className="text-xl" />
              </div>
              <div>
                <span className="text-xs font-mono text-textMuted block">EMAIL</span>
                <a href="mailto:suuman.maity@gmail.com" className="text-textPrimary font-semibold hover:text-accentCyan transition-colors">
                  suuman.maity@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-bgPrimary text-accentCyan border border-borderDark">
                <FiPhone className="text-xl" />
              </div>
              <div>
                <span className="text-xs font-mono text-textMuted block">PHONE</span>
                <a href="tel:+918597433833" className="text-textPrimary font-semibold hover:text-accentCyan transition-colors">
                  +91 8597433833
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-bgPrimary text-accentCyan border border-borderDark">
                <FiMapPin className="text-xl" />
              </div>
              <div>
                <span className="text-xs font-mono text-textMuted block">LOCATION</span>
                <span className="text-textPrimary font-semibold">Howrah, India</span>
              </div>
            </div>

            <div className="pt-4 border-t border-borderDark">
              <a href="/Suman_Maity_Resume.pdf" download="Suman_Maity_Resume.pdf" onClick={handleDownloadResume} className="block w-full">
                <MagneticButton strength={0.3} className="w-full">
                  <div className="w-full text-center py-3.5 rounded-xl border border-borderDark text-textPrimary font-display font-bold text-xs flex items-center justify-center gap-2 hover:border-accentCyan hover:text-accentCyan transition-colors">
                    <FiDownload /> DOWNLOAD RESUME PDF
                  </div>
                </MagneticButton>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a href="https://github.com/sumancpp" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-bgPrimary border border-borderDark text-textPrimary hover:text-accentCyan hover:border-accentCyan transition-colors">
                <FiGithub className="text-xl" />
              </a>
              <a href="https://www.linkedin.com/in/suman-maity-b84879292/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-bgPrimary border border-borderDark text-textPrimary hover:text-accentCyan hover:border-accentCyan transition-colors">
                <FiLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display font-black text-9xl text-accentCyan">404</h1>
      <h2 className="text-3xl font-display font-bold text-textPrimary mt-4">LOST IN DIGITAL SPACE</h2>
      <p className="text-textSecondary mt-2 mb-8 max-w-md">The page you are looking for has been moved or doesn't exist.</p>
      <Link to="/">
        <MagneticButton strength={0.4}>
          <div className="px-8 py-4 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-sm">
            RETURN TO HOME
          </div>
        </MagneticButton>
      </Link>
    </div>
  );
};
