import React from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

export default function EmptyState({ searchQuery, onReset }) {
  return (
    <div className="empty-state-card" role="status">
      <div className="empty-icon-wrapper" aria-hidden="true">
        <ImageOff size={42} />
      </div>

      <h3 className="empty-title">No images found</h3>

      <p className="empty-description">
        {searchQuery ? (
          <>
            We couldn't find any photos matching <span className="empty-query">“{searchQuery}”</span>.
            Try searching for broader keywords like <em>nature, street, portrait, minimal</em>.
          </>
        ) : (
          'There are currently no photos in this collection. Please select another category.'
        )}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="empty-reset-btn"
          aria-label="Reset to default curated collection"
        >
          <Sparkles size={16} aria-hidden="true" />
          <span>Explore All Photos</span>
        </button>
      )}
    </div>
  );
}