import React from 'react';
import { Layers, Zap, Eye, ShieldCheck, Heart } from 'lucide-react';

export default function About({ loadedCount = 0, activeCategory = 'All', isApiKeyConfigured = true }) {
  return (
    <section id="about" className="about-section" aria-label="About Lumina Gallery">
      <div className="container">
        <div className="about-grid">
          {/* Main Story Column */}
          <div className="about-content">
            <span className="about-eyebrow">Visual Storytelling</span>
            <h2 className="about-title">Moments captured with purpose & perspective</h2>
            <p className="about-paragraph">
              Lumina Gallery is an editorial showcase celebrating the craft of visual
              storytellers across the globe. Built for high fidelity and effortless
              responsiveness, each photograph is loaded directly through the official Unsplash
              ecosystem to ensure pristine visual clarity and authentic artist attribution.
            </p>
            <p className="about-paragraph">
              Whether capturing the stillness of ancient forests, the architectural geometries
              of modern metropolises, or intimate human portraits, Lumina provides an uninterrupted
              canvas designed for photography enthusiasts and creators alike.
            </p>
          </div>

          {/* Dynamic Statistics & Status Cards */}
          <div className="about-stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Eye size={20} aria-hidden="true" />
              </div>
              <div className="stat-number">{loadedCount}</div>
              <div className="stat-label">Photos Currently Loaded</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Layers size={20} aria-hidden="true" />
              </div>
              <div className="stat-number">{activeCategory}</div>
              <div className="stat-label">Current Focus Category</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Zap size={20} aria-hidden="true" />
              </div>
              <div className="stat-number">{isApiKeyConfigured ? 'Live' : 'Fallback'}</div>
              <div className="stat-label">API Service Mode</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <ShieldCheck size={20} aria-hidden="true" />
              </div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Artist Attributed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}