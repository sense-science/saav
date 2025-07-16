import React from "react";
import { Download, Heart, Eye, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wallpaper } from './types';

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
            onClick={() => onDownload(wallpaper)}
            className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
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