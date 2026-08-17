import React from 'react';

export default function LoadingState({ count = 12 }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="loading-grid" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading photography collection...</span>
      {skeletons.map((idx) => (
        <div key={idx} className="skeleton-card">
          <div className="skeleton-image shimmer"></div>
          <div className="skeleton-meta">
            <div className="skeleton-line skeleton-title shimmer"></div>
            <div className="skeleton-line skeleton-author shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
}