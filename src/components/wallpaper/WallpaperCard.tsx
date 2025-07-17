import React from "react";
import { Download, Heart, Eye, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Wallpaper } from './types';
import { useFavorites } from '@/hooks/useFavorites';
import { useDownloads } from '@/hooks/useDownloads';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onDownload: (wallpaper: Wallpaper) => void;
}

const WallpaperCard = React.memo(({ 
  wallpaper, 
  index, 
  isHovered, 
  onHover, 
  onDownload 
}: WallpaperCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToDownloads } = useDownloads();

  const handleDownload = async () => {
    addToDownloads(wallpaper);
    onDownload(wallpaper);
  };

  const handleToggleFavorite = () => {
    const isNowFavorite = toggleFavorite(wallpaper);
    toast({ 
      title: isNowFavorite ? "Added to favorites" : "Removed from favorites", 
      description: `${wallpaper.title} ${isNowFavorite ? 'added to' : 'removed from'} favorites!` 
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: wallpaper.title,
      text: `Check out this amazing wallpaper: ${wallpaper.title}`,
      url: wallpaper.image,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({ title: "Shared!", description: "Wallpaper shared successfully." });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(wallpaper.image);
        toast({ title: "Link copied!", description: "Wallpaper link copied to clipboard!" });
      } catch (error) {
        toast({ title: "Share failed", description: "Unable to share this wallpaper." });
      }
    }
  };
  return (
    <div
      className="wallpaper-card opacity-0 group relative overflow-hidden rounded-2xl bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => onHover(wallpaper.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="aspect-[9/16] relative overflow-hidden">
        <img
          src={wallpaper.image}
          alt={wallpaper.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-80 transition-opacity duration-300",
          wallpaper.gradient
        )} />

        {/* Action buttons */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center gap-2 sm:gap-4 opacity-0 transition-all duration-300",
          isHovered ? "opacity-100" : ""
        )}>
          <button
            onClick={handleDownload}
            className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            onClick={handleToggleFavorite}
            className={cn(
              "p-2 sm:p-3 backdrop-blur-sm rounded-full text-white transition-colors duration-200",
              isFavorite(wallpaper.id) 
                ? "bg-red-500/80 hover:bg-red-500" 
                : "bg-white/20 hover:bg-white/30"
            )}
          >
            <Heart className={cn("w-4 h-4 sm:w-5 sm:h-5", isFavorite(wallpaper.id) && "fill-current")} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-3 sm:p-4">
        <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{wallpaper.title}</h3>
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
          <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">{wallpaper.category}</span>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{wallpaper.downloads}</span>
              <span className="sm:hidden">{wallpaper.downloads > 1000 ? `${Math.floor(wallpaper.downloads/1000)}k` : wallpaper.downloads}</span>
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{wallpaper.likes}</span>
              <span className="sm:hidden">{wallpaper.likes}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

WallpaperCard.displayName = 'WallpaperCard';

export default WallpaperCard;