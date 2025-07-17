import { useState, useEffect } from 'react';
import { Wallpaper } from '@/components/wallpaper/types';

export const useDownloads = () => {
  const [downloads, setDownloads] = useState<Wallpaper[]>([]);

  useEffect(() => {
    const savedDownloads = localStorage.getItem('wallpaper-downloads');
    if (savedDownloads) {
      setDownloads(JSON.parse(savedDownloads));
    }
  }, []);

  const addToDownloads = (wallpaper: Wallpaper) => {
    const existingDownload = downloads.find(w => w.id === wallpaper.id);
    if (!existingDownload) {
      const updatedDownloads = [wallpaper, ...downloads];
      setDownloads(updatedDownloads);
      localStorage.setItem('wallpaper-downloads', JSON.stringify(updatedDownloads));
    }
  };

  const removeFromDownloads = (wallpaperId: string) => {
    const updatedDownloads = downloads.filter(w => w.id !== wallpaperId);
    setDownloads(updatedDownloads);
    localStorage.setItem('wallpaper-downloads', JSON.stringify(updatedDownloads));
  };

  const clearDownloads = () => {
    setDownloads([]);
    localStorage.removeItem('wallpaper-downloads');
  };

  return {
    downloads,
    addToDownloads,
    removeFromDownloads,
    clearDownloads
  };
};