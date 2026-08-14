import React, { useState, useEffect } from 'react';
import { FiAward, FiExternalLink, FiEye, FiX, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';

const defaultCertificates = [
  {
    id: '1',
    title: 'OMTECH 2026 Hackathon - 1st Runner-Up Certificate of Merit',
    issuer: 'OmDayal Group of Institutions (Department of CSE, IIC & IQAC)',
    date: 'MAY 2026',
    image: '/project-images/omtech-certificate.png',
    desc: 'Awarded 1st Runner-Up at the OMTECH 2026 Hackathon Program for building AuraVision – Accessibility for Everyone. Features Text-to-Image generation for blind users (Hindi, English & Bengali), 3-language Morse Code system for deaf users, offline local AI chatbot, and Text-to-Sign & Sign-to-Text conversion.',
    details: 'Excited to share that our team participated in the OMTECH 2026 Hackathon at OmDayal College of Engineering & Architecture 🚀 We built AuraVision – Accessibility for Everyone, a project focused on making technology more inclusive and accessible for people with disabilities.\n\n✨ Features of AuraVision:\n🔹 Text-to-Image Generator for blind people (supports Hindi, English & Bengali)\n🔹 Morse Code communication system for deaf people in 3 different languages\n🔹 Local AI Chatbot implementation for offline assistance\n🔹 Text-to-Sign Language & Sign-to-Text conversion for specially-abled communication\n\nThis journey was full of challenges, learning, teamwork, and innovation. From integrating multiple accessibility features to handling multilingual support and local AI implementation, we faced many technical hurdles — but together we solved them step by step and turned our idea into reality.'
  },
  {
    id: '2',
    title: 'CodeAlpha Virtual Web Development Internship - Certificate of Completion',
    issuer: 'CodeAlpha (Student ID: CA/S3/8251)',
    date: 'JAN 2025',
    image: '/project-images/codealpha-certificate.png',
    desc: 'Successfully completed a 3-month Virtual Web Development Internship at CodeAlpha (10th Oct 2024 to 10th Jan 2025). Gained hands-on experience building frontend web applications with React.js, JavaScript (ES6+), REST API integration, and responsive UI design.',
    details: 'Thrilled to share that I have successfully completed my 3-month Virtual Web Development Internship at CodeAlpha!\n\nFrom 10th October 2024 to 10th January 2025, I immersed myself in an incredible learning journey, expanding my skills in web development and gaining hands-on experience.\n\nI am grateful for the opportunity to work with the talented team at CodeAlpha and appreciate the guidance and support I received throughout my internship.\n\nThis experience has not only enhanced my technical skills (React.js, JavaScript ES6+, REST APIs, Responsive UI) but also taught me the importance of teamwork, adaptability, and continuous learning.'
  },
  {
    id: '3',
    title: 'TechZeathon 2026 National Hackfest - Certificate of Participation',
    issuer: 'Swami Vivekananda Institute of Science and Technology (SVIST)',
    date: 'MAY 2026',
    image: '/project-images/techzeathon-2026-certificate.png',
    desc: 'Participated in TechZeathon 2026 National Hackfest organized by SVIST & Institution\'s Innovation Council on 28th–29th May 2026 under the theme "Innovate • Collaborate • Sustain".',
    details: 'Certificate of Participation proudly presented to Suman Maity for participating in TechZeathon 2026 National Hackfest organized by Swami Vivekananda Institute of Science and Technology (SVIST) on 28th–29th May 2026.\n\nTheme & Motto: INNOVATE • COLLABORATE • SUSTAIN\n\nOrganized by Institution\'s Innovation Council (Ministry of HRD Initiative) & SVIST Department of Computer Science & Engineering.'
  },
  {
    id: '4',
    title: 'VOYAGE 2025 Technical Fest - Project Exhibition & Poster Presentation',
    issuer: 'OmDayal Group of Institutions (IIC & IQAC)',
    date: 'APR 2025',
    image: '/project-images/voyage-2025-certificate.png',
    desc: 'Participated in the Project Exhibition & Poster Presentation at VOYAGE 2025 Technical Fest organized by IIC & IQAC at OmDayal Group of Institutions on 11th–12th April 2025.',
    details: 'Certificate of Participation (# College Category #) presented to Suman Maity of the Department of C.S.E. for successfully participating in the Project Exhibition / Poster Presentation at the Technical Fest VOYAGE 2025.\n\nOrganized by Institution\'s Innovation Council (IIC) & Internal Quality Assurance Cell (IQAC), OmDayal Group of Institutions (Engineering | Architecture | Management) on 11th and 12th April, 2025.'
  }
];

const getCertificatesFromCMS = () => {
  const saved = localStorage.getItem('suman_cms_certs');
  let userCerts: any[] = [];
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        userCerts = parsed;
      }
    } catch {
      // Fallback
    }
  }

  const mergedMap = new Map<string, any>();
  defaultCertificates.forEach((c) => mergedMap.set(c.id, c));
  userCerts.forEach((c) => {
    if (!c.id) return;
    if (mergedMap.has(c.id)) {
      const def = mergedMap.get(c.id);
      mergedMap.set(c.id, {
        ...def,
        ...c,
        image: c.image && !c.image.includes('cloudinary') ? c.image : def.image
      });
    } else {
      mergedMap.set(c.id, c);
    }
  });

  const finalCerts = Array.from(mergedMap.values());
  localStorage.setItem('suman_cms_certs', JSON.stringify(finalCerts));
  return finalCerts;
};

export const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<any[]>(getCertificatesFromCMS);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  useEffect(() => {
    setCertificates(getCertificatesFromCMS());
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[80vh] space-y-16">
      {/* Header */}
      <div>
        <span className="text-accentCyan font-mono text-xs tracking-widest uppercase">
          VERIFIED CREDENTIALS & ACHIEVEMENTS
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold text-textPrimary mt-4 leading-tight">
          Certificates & <span className="text-accentCyan font-extrabold">Honors</span>
        </h1>
      </div>

      {/* Grid or Empty State */}
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.02 }}
              viewport={{ amount: 0.35 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.98 }}
              className="glass-panel rounded-3xl overflow-hidden border border-borderDark hover:border-accentCyan/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden relative cursor-pointer bg-slate-950/80 p-4 flex items-center justify-center border-b border-borderDark/80" onClick={() => setSelectedCert(cert)}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-150"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('omtech')) {
                      target.src = 'https://res.cloudinary.com/dd7visvcq/image/upload/v1786560261/Screenshot_from_2026-08-05_20-47-03_zyaooi.png';
                    }
                  }}
                />
                <div className="absolute top-4 right-4 bg-bgPrimary/80 backdrop-blur-md p-3 rounded-full text-accentCyan border border-borderDark">
                  <FiAward className="text-xl" />
                </div>
                <div className="absolute inset-0 bg-bgPrimary/85 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-accentCyan font-display font-bold text-sm">
                  <FiEye className="text-xl" /> VIEW DETAILS
                </div>
              </div>

              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-xs font-mono text-textMuted mb-2">
                    {cert.issuer} • {cert.date}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-textPrimary group-hover:text-accentCyan transition-colors mb-3">
                    {cert.title}
                  </h3>
                  <p className="text-textSecondary text-sm mb-6 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-borderDark flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-accentCyan font-bold hover:underline"
                  >
                    VERIFY CREDENTIAL <FiExternalLink />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-12 md:p-16 rounded-3xl glass-panel border border-borderDark text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accentCyan/10 border border-accentCyan/30 flex items-center justify-center text-accentCyan text-3xl mx-auto">
            <FiAward />
          </div>
          <h3 className="text-2xl font-display font-bold text-textPrimary">Credentials & Honors</h3>
          <p className="text-textSecondary text-sm max-w-md mx-auto">
            Certificates and verified honors are currently being updated and verified. Please check back soon or review Suman's flagship projects!
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[1000] bg-bgPrimary/90 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div className="max-w-3xl w-full glass-panel border border-borderDark rounded-3xl p-6 sm:p-8 md:p-10 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-bgPrimary border border-borderDark text-textPrimary hover:text-accentCyan transition-colors z-10"
            >
              <FiX className="text-xl" />
            </button>

            <div className="flex items-center gap-3 text-accentCyan font-mono text-xs">
              <FiCheckCircle className="text-lg" /> VERIFIED ACHIEVEMENT
            </div>

            <h2 className="text-3xl font-display font-bold text-textPrimary">{selectedCert.title}</h2>
            <p className="text-xs font-mono text-textMuted">{selectedCert.issuer} — {selectedCert.date}</p>

            <div className="min-h-[260px] max-h-[60vh] rounded-2xl overflow-hidden border border-borderDark bg-slate-950/90 p-4 sm:p-6 flex items-center justify-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[55vh] max-w-full object-contain filter drop-shadow-xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('omtech')) {
                    target.src = 'https://res.cloudinary.com/dd7visvcq/image/upload/v1786560261/Screenshot_from_2026-08-05_20-47-03_zyaooi.png';
                  }
                }}
              />
            </div>

            <p className="text-textSecondary text-sm leading-relaxed whitespace-pre-line">{selectedCert.details || selectedCert.desc}</p>

            <div className="pt-4">
              <MagneticButton strength={0.3} onClick={() => setSelectedCert(null)}>
                <div className="px-8 py-3 rounded-full bg-accentCyan text-bgPrimary font-display font-bold text-xs">
                  CLOSE PREVIEW
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
