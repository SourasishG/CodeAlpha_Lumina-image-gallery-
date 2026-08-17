import React from 'react';
import SearchBar from './SearchBar';
import { ArrowDown } from 'lucide-react';

export default function Hero({ onSearch, isLoading }) {
  const scrollToGallery = () => {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" aria-label="Introduction">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </div>

      <div className="container hero-content">
        <h1 className="hero-title">
          A collection of <span className="hero-gradient-text">moments</span>
        </h1>

        <p className="hero-description">
          Immerse yourself in high-resolution visual stories from creators worldwide.
          Search through hundreds of thousands of editorial captures or explore curated categories.
        </p>

        {/* Hero Search Bar */}
        <div className="hero-search-wrapper">
          <SearchBar onSearch={onSearch} isLoading={isLoading} />
        </div>

        {/* Scroll CTA Button */}
        <button
          type="button"
          onClick={scrollToGallery}
          className="hero-scroll-btn"
          aria-label="Scroll down to image gallery"
        >
          <span>Explore Gallery</span>
          <ArrowDown size={16} className="bounce-animation" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}