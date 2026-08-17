import React, { useState } from 'react';
import { Camera, Menu, X, Image as ImageIcon, Layers, Info } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Identity */}
        <a href="#main-content" className="brand-logo" onClick={closeMenu}>
          <div className="logo-icon-wrapper" aria-hidden="true">
            <Camera className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Lumina</span>
            <span className="brand-subtitle">Visual Stories</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <a href="#gallery" className="nav-link">
                <ImageIcon size={16} aria-hidden="true" />
                <span>Gallery</span>
              </a>
            </li>
            <li>
              <a href="#categories" className="nav-link">
                <Layers size={16} aria-hidden="true" />
                <span>Categories</span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                <Info size={16} aria-hidden="true" />
                <span>About</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-navigation"
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            <li>
              <a href="#gallery" className="mobile-nav-link" onClick={closeMenu}>
                <ImageIcon size={20} aria-hidden="true" />
                <span>Gallery</span>
              </a>
            </li>
            <li>
              <a href="#categories" className="mobile-nav-link" onClick={closeMenu}>
                <Layers size={20} aria-hidden="true" />
                <span>Categories</span>
              </a>
            </li>
            <li>
              <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
                <Info size={20} aria-hidden="true" />
                <span>About</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}