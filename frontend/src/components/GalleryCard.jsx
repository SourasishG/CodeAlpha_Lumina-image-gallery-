import React, { useState } from 'react';
import { ExternalLink, Maximize2, User } from 'lucide-react';

export default function GalleryCard({ photo, index, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const handleLinkClick = (e) => {
    // Prevent opening the lightbox when clicking the photographer's link
    e.stopPropagation();
  };

  return (
    <article
      className="gallery-card"
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`View photo titled "${photo.title}" by ${photo.photographer}`}
      style={{ backgroundColor: photo.color || 'var(--color-bg-elevated)' }}
    >
      {/* Loading Skeleton Backdrop */}
      {!imageLoaded && !imageError && (
        <div className="card-skeleton" aria-hidden="true"></div>
      )}

      {/* Main Responsive Image */}
      <img
        src={imageError ? '/fallback-image.svg' : photo.image}
        alt={photo.alt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
        className={`card-image ${imageLoaded ? 'is-loaded' : ''}`}
      />

      {/* Hover & Focus Overlay */}
      <div className="card-overlay">
        <div className="card-overlay-header">
          <span className="card-category-badge">{photo.category}</span>
          <button
            type="button"
            className="card-quick-view-btn"
            aria-label={`Expand full size preview of ${photo.title}`}
            tabIndex={-1}
          >
            <Maximize2 size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="card-overlay-footer">
          <h3 className="card-title">{photo.title}</h3>
          
          <div className="card-attribution">
            <span className="attribution-prefix">Photo by</span>
            <a
              href={photo.photographerProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-photographer-link"
              onClick={handleLinkClick}
              aria-label={`View ${photo.photographer}'s profile on Unsplash (opens in new tab)`}
            >
              <User size={13} aria-hidden="true" />
              <span>{photo.photographer}</span>
              <ExternalLink size={11} aria-hidden="true" />
            </a>
            <span className="attribution-suffix">
              on{' '}
              <a
                href="https://unsplash.com/?utm_source=lumina_gallery&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="card-unsplash-link"
                onClick={handleLinkClick}
                aria-label="Visit Unsplash (opens in new tab)"
              >
                Unsplash
              </a>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}