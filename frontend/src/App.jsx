import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import About from './components/About';
import Footer from './components/Footer';
import { useGallery } from './hooks/useGallery';
import { Sparkles, KeyRound, Loader2, ArrowUp } from 'lucide-react';

export default function App() {
  const {
    images,
    searchQuery,
    activeCategory,
    currentPage,
    totalPages,
    totalResults,
    isLoading,
    isLoadingMore,
    error,
    isApiKeyMissing,
    searchImages,
    selectCategory,
    loadMore,
    retry,
    clearSearch,
  } = useGallery();

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleOpenLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handleCategorySelect = (category) => {
    selectCategory(category);
    // Smooth scroll down to gallery anchor
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (query) => {
    searchImages(query);
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasNextPage = currentPage < totalPages;

  return (
    <div className="app-container">
      {/* API Key Missing Notification Banner */}
      {isApiKeyMissing && (
        <aside className="api-banner" role="alert">
          <div className="api-banner-content">
            <KeyRound className="api-banner-icon" aria-hidden="true" size={20} />
            <div className="api-banner-text">
              <strong>Unsplash Access Key Missing:</strong> Showing curated fallback images. Create a <code>.env</code> file with <code>VITE_UNSPLASH_ACCESS_KEY=your_key</code> to query live photos.
            </div>
          </div>
        </aside>
      )}

      {/* Sticky Header */}
      <Header />

      <main id="main-content">
        {/* Hero Section with Embedded Search Bar */}
        <Hero
          onSearch={handleSearchSubmit}
          isLoading={isLoading}
        />

        {/* Gallery Section */}
        <section id="gallery" className="gallery-section" aria-label="Image Gallery">
          <div className="container">
            {/* Category Filter Pills */}
            <div id="categories" className="filter-wrapper">
              <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={handleCategorySelect}
                isLoading={isLoading}
              />
            </div>

            {/* Results Title and Status Indicator */}
            <div className="gallery-status-bar">
              <div className="gallery-status-info">
                <span className="status-label">
                  {searchQuery ? (
                    <>Search results for: <span className="status-highlight">“{searchQuery}”</span></>
                  ) : (
                    <>Category: <span className="status-highlight">{activeCategory}</span></>
                  )}
                </span>
                {totalResults > 0 && !isLoading && (
                  <span className="status-count">
                    ({totalResults.toLocaleString()} photos available)
                  </span>
                )}
              </div>

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="reset-search-btn"
                  aria-label="Reset search to default categories"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Main State Views */}
            {isLoading ? (
              <LoadingState count={12} />
            ) : error ? (
              <ErrorState error={error} onRetry={retry} isApiKeyMissing={isApiKeyMissing} />
            ) : images.length === 0 ? (
              <EmptyState searchQuery={searchQuery} onReset={clearSearch} />
            ) : (
              <>
                <Gallery
                  images={images}
                  onImageClick={handleOpenLightbox}
                />

                {/* Pagination / Load More Button */}
                {hasNextPage && (
                  <div className="load-more-container">
                    <button
                      type="button"
                      onClick={loadMore}
                      disabled={isLoadingMore}
                      className="load-more-btn"
                      aria-label="Load more photographs"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="spinner-icon" size={18} aria-hidden="true" />
                          <span>Loading moments...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} aria-hidden="true" />
                          <span>Load More Photos</span>
                        </>
                      )}
                    </button>
                    <p className="page-indicator">
                      Page {currentPage} of {totalPages}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Informative About Section */}
        <About
          loadedCount={images.length}
          activeCategory={activeCategory}
          isApiKeyConfigured={!isApiKeyMissing}
        />
      </main>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <Lightbox
          images={images}
          currentIndex={selectedImageIndex}
          onClose={handleCloseLightbox}
          onIndexChange={setSelectedImageIndex}
        />
      )}

      {/* Back to top floating button */}
      <button
        type="button"
        onClick={handleScrollToTop}
        className="back-to-top-btn"
        aria-label="Scroll back to top of page"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
}