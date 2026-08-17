import React from 'react';
import GalleryCard from './GalleryCard';

export default function Gallery({ images, onImageClick }) {
  return (
    <div className="gallery-grid" role="region" aria-label="Photo Grid">
      {images.map((photo, index) => (
        <GalleryCard
          key={`${photo.id}-${index}`}
          photo={photo}
          index={index}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
}