import { useEffect } from 'react';

/**
 * Custom React hook to prevent background document scrolling
 * when modals, lightboxes, or mobile drawer menus are active.
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}