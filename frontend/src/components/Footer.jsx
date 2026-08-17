import React from 'react';
import { Camera, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Brand & Attribution info */}
        <div className="footer-brand-column">
          <div className="footer-brand">
            <Camera size={20} className="brand-icon" aria-hidden="true" />
            <span className="footer-brand-title">Lumina Gallery</span>
          </div>
          <p className="footer-attribution-text">
            Photos provided generously by the community of creators on{' '}
            <a
              href="https://unsplash.com/?utm_source=lumina_gallery&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-external-link"
              aria-label="Visit Unsplash (opens in new tab)"
            >
              Unsplash
              <ExternalLink size={12} aria-hidden="true" />
            </a>
            . All images remain copyrighted to their respective photographers.
          </p>
        </div>

        {/* Social Icons & Copyright */}
        <div className="footer-meta-column">
          <div className="footer-social-links" aria-label="Connect with me">
            <a
              href="https://github.com/SourasishG"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/sourasish-ghosh07"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
            <a
              href="mailto:your-sourasishghosh062@gmail.com"
              className="footer-social-btn"
              aria-label="Send Email"
              title="Gmail"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>

          <p className="footer-copyright">
            &copy; {currentYear} Lumina Gallery. Built with React & Vite.
          </p>
        </div>
      </div>
    </footer>
  );
}