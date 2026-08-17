import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search" aria-label="Search photos">
      <div className="search-input-wrapper">
        <label htmlFor="gallery-search-input" className="sr-only">
          Search photography by keyword or topic
        </label>
        <Search className="search-icon-left" size={20} aria-hidden="true" />

        <input
          id="gallery-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search architecture, portraits, moody mountains..."
          className="search-input"
          autoComplete="off"
          spellCheck="false"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-btn"
            aria-label="Clear search input"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="search-submit-btn"
          aria-label="Submit search query"
        >
          {isLoading ? (
            <Loader2 className="spinner-icon" size={18} aria-hidden="true" />
          ) : (
            <span>Search</span>
          )}
        </button>
      </div>
    </form>
  );
}