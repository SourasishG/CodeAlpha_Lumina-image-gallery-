/**
 * UTM parameters appended to every Unsplash link per official API Guidelines.
 */
const UTM_QUERY = 'utm_source=lumina_gallery&utm_medium=referral';

/**
 * Appends referral UTM parameters to an Unsplash URL.
 *
 * @param {string} url Base URL
 * @returns {string} Clean URL with UTM parameters
 */
function appendUtm(url) {
  if (!url) return `https://unsplash.com/?${UTM_QUERY}`;
  return url.includes('?') ? `${url}&${UTM_QUERY}` : `${url}?${UTM_QUERY}`;
}

/**
 * Transforms a raw Unsplash photo object into Lumina's internal shape.
 *
 * @param {Object} photo Raw Unsplash photo payload
 * @param {string} fallbackCategory Active category fallback
 * @returns {Object} Normalized gallery photo item
 */
export function mapUnsplashPhoto(photo, fallbackCategory = 'Editorial') {
  if (!photo) return null;

  const rawDescription = photo.description || photo.alt_description || '';
  const photographerName = photo.user?.name || photo.user?.username || 'Unknown Photographer';
  const photographerUsername = photo.user?.username || '';

  // Generate an elegant, human-readable title fallback
  let title = rawDescription
    ? rawDescription.charAt(0).toUpperCase() + rawDescription.slice(1)
    : `Editorial capture by ${photographerName}`;

  if (title.length > 55) {
    title = `${title.substring(0, 52)}...`;
  }

  // Meaningful alt fallback
  const alt = photo.alt_description
    ? photo.alt_description
    : `Photograph of ${fallbackCategory.toLowerCase()} scene by ${photographerName}`;

  const photographerProfileUrl = photo.user?.links?.html
    ? appendUtm(photo.user.links.html)
    : appendUtm(`https://unsplash.com/@${photographerUsername}`);

  const unsplashPhotoUrl = photo.links?.html
    ? appendUtm(photo.links.html)
    : appendUtm('https://unsplash.com');

  return {
    id: photo.id,
    title,
    category: fallbackCategory || 'Editorial',
    image: photo.urls?.regular || photo.urls?.full || photo.urls?.small,
    thumbnail: photo.urls?.small || photo.urls?.small_s3 || photo.urls?.regular,
    alt,
    description: photo.description || photo.alt_description || title,
    photographer: photographerName,
    photographerUsername,
    photographerProfileUrl,
    unsplashPhotoUrl,
    width: photo.width || 1920,
    height: photo.height || 1080,
    color: photo.color || '#1c212b',
  };
}

/**
 * Transforms an array of Unsplash results.
 *
 * @param {Array} photos Raw photos array
 * @param {string} fallbackCategory
 * @returns {Array} Mapped photo items
 */
export function mapUnsplashPhotos(photos, fallbackCategory = 'Editorial') {
  if (!Array.isArray(photos)) return [];
  return photos
    .map((photo) => mapUnsplashPhoto(photo, fallbackCategory))
    .filter(Boolean);
}