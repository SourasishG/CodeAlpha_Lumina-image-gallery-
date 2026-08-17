import { useState, useEffect, useCallback, useRef } from 'react';
import { searchPhotos, getCategoryPhotos } from '../services/unsplashApi';
import { mapUnsplashPhotos } from '../utils/imageMapper';

const DEFAULT_CATEGORY = 'All';
const PER_PAGE = 18; // Optimal count for 2, 3, and 4-column responsive grids

export function useGallery() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Check if API key is present in Vite environment
  const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const isApiKeyMissing = !apiKey || apiKey.trim() === '' || apiKey === 'your_unsplash_access_key_here';

  // Store active AbortController to cancel stale requests and eliminate race conditions
  const abortControllerRef = useRef(null);

  /**
   * Main Fetch Execution Handler
   */
  const fetchGalleryData = useCallback(
    async ({ query = '', category = DEFAULT_CATEGORY, page = 1, append = false } = {}) => {
      // Abort any ongoing in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setError(null);
      }

      try {
        let responseData;

        if (query && query.trim() !== '') {
          responseData = await searchPhotos(query, page, PER_PAGE, controller.signal);
        } else {
          responseData = await getCategoryPhotos(category, page, PER_PAGE, controller.signal);
        }

        const mappedImages = mapUnsplashPhotos(responseData.results || [], category);

        setImages((prev) => (append ? [...prev, ...mappedImages] : mappedImages));
        setTotalPages(responseData.total_pages || 1);
        setTotalResults(responseData.total || mappedImages.length);
        setCurrentPage(page);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          // Request was aborted due to new search/filter action — ignore safely
          return;
        }

        console.error('Gallery Fetch Error:', err);
        setError({
          message: err.message || 'Failed to retrieve images from Unsplash.',
          status: err.status || null,
          code: err.code || null,
        });
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  // Initial gallery load
  useEffect(() => {
    fetchGalleryData({ category: DEFAULT_CATEGORY, page: 1, append: false });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchGalleryData]);

  // Public Action: Search by query string
  const searchImages = useCallback(
    (query) => {
      const cleanQuery = query.trim();
      if (!cleanQuery) return;

      setSearchQuery(cleanQuery);
      setActiveCategory(''); // clear active category focus during custom search
      setCurrentPage(1);
      fetchGalleryData({ query: cleanQuery, page: 1, append: false });
    },
    [fetchGalleryData]
  );

  // Public Action: Select a category button
  const selectCategory = useCallback(
    (category) => {
      setSearchQuery('');
      setActiveCategory(category);
      setCurrentPage(1);
      fetchGalleryData({ category, page: 1, append: false });
    },
    [fetchGalleryData]
  );

  // Public Action: Load next page
  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore || currentPage >= totalPages) return;

    const nextPage = currentPage + 1;
    fetchGalleryData({
      query: searchQuery,
      category: activeCategory || DEFAULT_CATEGORY,
      page: nextPage,
      append: true,
    });
  }, [currentPage, totalPages, isLoading, isLoadingMore, searchQuery, activeCategory, fetchGalleryData]);

  // Public Action: Retry active view
  const retry = useCallback(() => {
    fetchGalleryData({
      query: searchQuery,
      category: activeCategory || DEFAULT_CATEGORY,
      page: currentPage,
      append: false,
    });
  }, [searchQuery, activeCategory, currentPage, fetchGalleryData]);

  // Public Action: Reset to default category
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setActiveCategory(DEFAULT_CATEGORY);
    setCurrentPage(1);
    fetchGalleryData({ category: DEFAULT_CATEGORY, page: 1, append: false });
  }, [fetchGalleryData]);

  return {
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
  };
}