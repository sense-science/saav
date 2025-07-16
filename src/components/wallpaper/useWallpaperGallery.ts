import { useState, useRef, useEffect, useCallback } from "react";
import { Wallpaper, Category } from './types';
import { wallpapers } from './wallpaperData';

export const useWallpaperGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [hoveredWallpaper, setHoveredWallpaper] = useState<string | null>(null);
  const [visibleWallpapers, setVisibleWallpapers] = useState(8);
  const galleryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredWallpapers = selectedCategory === "All" 
    ? wallpapers 
    : wallpapers.filter(w => w.category === selectedCategory);

  const displayedWallpapers = filteredWallpapers.slice(0, visibleWallpapers);

  const handleDownload = async (wallpaper: Wallpaper) => {
    try {
      const response = await fetch(wallpaper.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SAAV-${wallpaper.title.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const loadMore = useCallback(() => {
    if (visibleWallpapers < filteredWallpapers.length) {
      setVisibleWallpapers(prev => Math.min(prev + 4, filteredWallpapers.length));
    }
  }, [visibleWallpapers, filteredWallpapers.length]);

  // Reset visible wallpapers when category changes
  useEffect(() => {
    setVisibleWallpapers(8);
  }, [selectedCategory]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll(".wallpaper-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [displayedWallpapers]);

  // Load more observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleWallpapers < filteredWallpapers.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, visibleWallpapers, filteredWallpapers.length]);

  return {
    selectedCategory,
    setSelectedCategory,
    hoveredWallpaper,
    setHoveredWallpaper,
    visibleWallpapers,
    filteredWallpapers,
    displayedWallpapers,
    galleryRef,
    loadMoreRef,
    handleDownload
  };
};