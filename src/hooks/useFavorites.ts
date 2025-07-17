import { useState, useEffect } from 'react';
import { Wallpaper } from '@/components/wallpaper/types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Wallpaper[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('wallpaper-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (wallpaper: Wallpaper) => {
    const updatedFavorites = [...favorites, wallpaper];
    setFavorites(updatedFavorites);
    localStorage.setItem('wallpaper-favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (wallpaperId: string) => {
    const updatedFavorites = favorites.filter(w => w.id !== wallpaperId);
    setFavorites(updatedFavorites);
    localStorage.setItem('wallpaper-favorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorite = (wallpaper: Wallpaper) => {
    if (isFavorite(wallpaper.id)) {
      removeFromFavorites(wallpaper.id);
      return false;
    } else {
      addToFavorites(wallpaper);
      return true;
    }
  };

  const isFavorite = (wallpaperId: string) => {
    return favorites.some(w => w.id === wallpaperId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  };
};