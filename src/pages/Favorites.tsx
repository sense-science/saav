import React from "react";
import { Heart, ArrowLeft, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { useDownloads } from "@/hooks/useDownloads";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToDownloads } = useDownloads();

  const handleDownload = async (wallpaper: any) => {
    try {
      addToDownloads(wallpaper);
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
      toast({ title: "Downloaded!", description: `${wallpaper.title} has been downloaded.` });
    } catch (error) {
      toast({ title: "Download failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleShare = async (wallpaper: any) => {
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
        toast({ title: "Link copied!", description: "Wallpaper link copied to clipboard." });
      } catch (error) {
        toast({ title: "Share failed", description: "Unable to share this wallpaper.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-2xl font-bold">My Favorites</h1>
              <span className="text-gray-400">({favorites.length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Start exploring wallpapers and add them to your favorites!</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Browse Wallpapers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favorites.map((wallpaper) => (
              <div key={wallpaper.id} className="group relative overflow-hidden rounded-2xl bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
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
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleDownload(wallpaper)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        removeFromFavorites(wallpaper.id);
                        toast({ title: "Removed from favorites", description: `${wallpaper.title} removed from favorites.` });
                      }}
                      className="p-2 bg-red-500/80 backdrop-blur-sm rounded-full text-white hover:bg-red-500 transition-colors duration-200"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => handleShare(wallpaper)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1 truncate">{wallpaper.title}</h3>
                  <span className="bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-300">{wallpaper.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;