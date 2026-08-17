/**
 * IMPORTANT SECURITY NOTE:
 * In this client-side Vite application, import.meta.env.VITE_UNSPLASH_ACCESS_KEY
 * is bundled into browser assets. In a real-world enterprise production application,
 * requests should always be proxied through a backend API or serverless function
 * (e.g. Vercel Serverless Functions /api/photos) to keep credentials secret.
 */

const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Fallback demo mock dataset used when VITE_UNSPLASH_ACCESS_KEY is absent
const FALLBACK_DEMO_DATA = {
  total: 6,
  total_pages: 1,
  results: [
    {
      id: 'demo-1',
      alt_description: 'Misty pine forest shrouded in morning fog and golden light',
      description: 'Morning light piercing through dense pine forest trees',
      width: 4000,
      height: 2667,
      color: '#1a241f',
      urls: {
        regular: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        small: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80',
      },
      user: {
        name: 'Luca Bravo',
        username: 'lucabravo',
        links: { html: 'https://unsplash.com/@lucabravo' },
      },
      links: { html: 'https://unsplash.com/photos/ES2-qTA044Q' },
    },
    {
      id: 'demo-2',
      alt_description: 'Minimalist contemporary concrete architectural curves',
      description: 'Curved brutalist concrete architecture under clear sky',
      width: 3840,
      height: 2560,
      color: '#2a2d34',
      urls: {
        regular: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        small: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      },
      user: {
        name: 'Simone Hutsch',
        username: 'heysimone',
        links: { html: 'https://unsplash.com/@heysimone' },
      },
      links: { html: 'https://unsplash.com/photos/7e2pe1WvL-4' },
    },
    {
      id: 'demo-3',
      alt_description: 'Majestic mountain peaks in the Italian Dolomites during sunset',
      description: 'Golden hour illuminating towering peaks in the Dolomites',
      width: 4200,
      height: 2800,
      color: '#2d1b1e',
      urls: {
        regular: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        small: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      },
      user: {
        name: 'Kalen Emsley',
        username: 'kalenemsley',
        links: { html: 'https://unsplash.com/@kalenemsley' },
      },
      links: { html: 'https://unsplash.com/photos/BkingerQwtY' },
    },
    {
      id: 'demo-4',
      alt_description: 'Portrait of thoughtful woman in warm dramatic natural light',
      description: 'Natural portrait photography with soft rim lighting',
      width: 3600,
      height: 2400,
      color: '#241a15',
      urls: {
        regular: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        small: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      },
      user: {
        name: 'Aiony Haust',
        username: 'aiony',
        links: { html: 'https://unsplash.com/@aiony' },
      },
      links: { html: 'https://unsplash.com/photos/3TLl_97HNJo' },
    },
    {
      id: 'demo-5',
      alt_description: 'Fox gazing in the snowy winter forest landscape',
      description: 'Red fox standing in snow under winter morning sunlight',
      width: 4100,
      height: 2733,
      color: '#1e242b',
      urls: {
        regular: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
        small: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=600&q=80',
      },
      user: {
        name: 'Ray Hennessy',
        username: 'rayhennessy',
        links: { html: 'https://unsplash.com/@rayhennessy' },
      },
      links: { html: 'https://unsplash.com/photos/DA_onDWTs8o' },
    },
    {
      id: 'demo-6',
      alt_description: 'Iconic street scene in Tokyo at twilight with vibrant neon reflections',
      description: 'Urban city street lights reflecting on wet tarmac',
      width: 3900,
      height: 2600,
      color: '#151726',
      urls: {
        regular: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        small: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      },
      user: {
        name: 'Aleksandar Pasaric',
        username: 'apasaric',
        links: { html: 'https://unsplash.com/@apasaric' },
      },
      links: { html: 'https://unsplash.com/photos/7e2pe1WvL-4' },
    },
  ],
};

/**
 * Searches Unsplash photos matching a specific query string.
 *
 * @param {string} query Search terms
 * @param {number} page Page number (1-indexed)
 * @param {number} perPage Number of items (max 30)
 * @param {AbortSignal} [signal] Optional cancellation signal
 * @returns {Promise<{results: Array, total: number, total_pages: number}>}
 */
export async function searchPhotos(query, page = 1, perPage = 18, signal = null) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Fallback gracefully if key is not configured
  if (!accessKey || accessKey.trim() === '' || accessKey === 'your_unsplash_access_key_here') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FALLBACK_DEMO_DATA), 300);
    });
  }

  // Uses order_by=relevant to avoid single-photoshoot clumping
  const endpoint = `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}&order_by=relevant`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        'Accept-Version': 'v1',
      },
      signal,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        const err = new Error(
          'Invalid or unauthorized Unsplash Access Key. Please verify your VITE_UNSPLASH_ACCESS_KEY in .env.'
        );
        err.status = response.status;
        err.code = 'INVALID_KEY';
        throw err;
      }

      if (response.status === 429) {
        const err = new Error(
          'Unsplash API hourly rate limit exceeded (50 requests/hr on demo accounts). Please try again shortly.'
        );
        err.status = 429;
        err.code = 'RATE_LIMIT';
        throw err;
      }

      const err = new Error(`Unsplash API HTTP error: ${response.status} ${response.statusText}`);
      err.status = response.status;
      throw err;
    }

    const data = await response.json();
    return {
      results: data.results || [],
      total: data.total || 0,
      total_pages: data.total_pages || 0,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    if (!navigator.onLine) {
      const err = new Error('You appear to be offline. Please check your internet connection.');
      err.code = 'OFFLINE';
      throw err;
    }
    throw error;
  }
}

/**
 * Curated category query mappings for diverse and stunning photography.
 */
const CATEGORY_QUERY_MAP = {
  all: 'cinematic landscape architecture travel street photography',
  nature: 'scenic nature mountains forest ocean landscape',
  architecture: 'modern architecture minimal buildings urban geometry',
  travel: 'travel wanderlust adventure scenic world destinations',
  people: 'portraits candid street life cultural lifestyle',
  animals: 'wildlife fauna animals nature',
};

/**
 * Retrieves curated category photos.
 *
 * @param {string} category Category name (e.g. 'All', 'Nature', 'Architecture')
 * @param {number} page Page number
 * @param {number} perPage Images per page
 * @param {AbortSignal} [signal] Cancellation signal
 */
export async function getCategoryPhotos(category = 'All', page = 1, perPage = 18, signal = null) {
  const normalizedKey = category.toLowerCase();
  const query = CATEGORY_QUERY_MAP[normalizedKey] || category;
  return searchPhotos(query, page, perPage, signal);
}