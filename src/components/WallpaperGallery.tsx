
import React from "react";
import { cn } from "@/lib/utils";
import { categories } from './wallpaper/wallpaperData';
import WallpaperCard from './wallpaper/WallpaperCard';
import { useWallpaperGallery } from './wallpaper/useWallpaperGallery';

const WallpaperGallery = () => {
  const {
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
  } = useWallpaperGallery();

  return (
    <section id="wallpapers" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Wallpaper Collection
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover stunning wallpapers crafted with passion and creativity
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300 font-medium",
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Wallpaper Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {displayedWallpapers.map((wallpaper, index) => (
            <WallpaperCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              index={index}
              isHovered={hoveredWallpaper === wallpaper.id}
              onHover={setHoveredWallpaper}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Load more trigger */}
        {visibleWallpapers < filteredWallpapers.length && (
          <div 
            ref={loadMoreRef}
            className="text-center mt-12 py-8"
          >
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="ml-2">Loading more...</span>
            </div>
          </div>
        )}

        {/* All loaded message */}
        {visibleWallpapers >= filteredWallpapers.length && filteredWallpapers.length > 8 && (
          <div className="text-center mt-12">
            <p className="text-gray-400">All wallpapers loaded!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WallpaperGallery;
