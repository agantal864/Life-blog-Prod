'use client';
import { useEffect } from 'react';

export default function AnonymousViewTracker({ postId }: { postId: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/api/view-anonymous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
    }, 500); // debounce to avoid race conditions

    return () => clearTimeout(timer);
  }, [postId]);

  return null;
}
