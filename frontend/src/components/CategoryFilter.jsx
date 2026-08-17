import React from 'react';
import { Compass, Trees, Building2, Plane, Users, Dog } from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All', icon: Compass },
  { id: 'Nature', label: 'Nature', icon: Trees },
  { id: 'Architecture', label: 'Architecture', icon: Building2 },
  { id: 'Travel', label: 'Travel', icon: Plane },
  { id: 'People', label: 'People', icon: Users },
  { id: 'Animals', label: 'Animals', icon: Dog },
];

export default function CategoryFilter({ activeCategory, onSelectCategory, isLoading }) {
  return (
    <nav className="category-filter-nav" aria-label="Category Filters">
      <div className="category-filter-list" role="tablist">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={isLoading}
              className={`category-pill ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <Icon size={16} className="category-icon" aria-hidden="true" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}