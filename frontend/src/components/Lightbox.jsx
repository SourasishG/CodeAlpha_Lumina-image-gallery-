import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, User, Camera, Calendar } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export default function Lightbox({ images, currentIndex, onClose, onIndexChange }) {
  // Lock body scroll while lightbox is open
  useBodyScrollLock(true);

  const currentPhoto = images[currentIndex];
  const totalCount = images.length;
  const modalRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalCount]);

  // Focus trap / auto-focus modal upon mounting
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handlePrevious = () => {
    const nextIdx = currentIndex === 0 ? totalCount - 1 : currentIndex - 1;
    onIndexChange(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex === totalCount - 1 ? 0 : currentIndex + 1;
    onIndexChange(nextIdx);
  };

  if (!currentPhoto) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image view modal"
      onClick={onClose}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
        {/* Lightbox Header Bar */}
        <div className="lightbox-header">
          <div className="lightbox-counter">
            <Camera size={16} aria-hidden="true" />
            <span>
              {currentIndex + 1} <span className="counter-divider">/</span> {totalCount}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="lightbox-close-btn"
            aria-label="Close image modal (Press Escape)"
          >
            <X size={22} />
          </button>
        </div>

        {/* Lightbox Main Stage */}
        <div className="lightbox-stage">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrevious}
            className="lightbox-nav-btn prev-btn"
            aria-label="View previous photo (Left arrow key)"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Displayed Image */}
          <div className="lightbox-image-container">
            <img
              src={currentPhoto.image}
              alt={currentPhoto.alt}
              className="lightbox-image"
            />
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="lightbox-nav-btn next-btn"
            aria-label="View next photo (Right arrow key)"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Lightbox Metadata & Attribution Footer */}
        <div className="lightbox-footer">
          <div className="lightbox-details">
            <h2 className="lightbox-title">{currentPhoto.title}</h2>
            {currentPhoto.description && currentPhoto.description !== currentPhoto.title && (
              <p className="lightbox-description">{currentPhoto.description}</p>
            )}
          </div>

          <div className="lightbox-attribution-box">
            <div className="photographer-info">
              <span className="attribution-tag">Photo by</span>
              <a
                href={currentPhoto.photographerProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lightbox-photographer-link"
                aria-label={`Visit ${currentPhoto.photographer}'s profile on Unsplash`}
              >
                <User size={15} aria-hidden="true" />
                <strong>{currentPhoto.photographer}</strong>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            <div className="unsplash-source-link">
              <a
                href={currentPhoto.unsplashPhotoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lightbox-photo-source-link"
                aria-label="View original photo on Unsplash (opens in new tab)"
              >
                <span>View on Unsplash</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}