
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Download, Heart, Eye, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Wallpaper {
  id: string;
  title: string;
  category: string;
  image: string;
  downloads: number;
  likes: number;
  gradient: string;
}

const WallpaperGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredWallpaper, setHoveredWallpaper] = useState<string | null>(null);
  const [visibleWallpapers, setVisibleWallpapers] = useState(8); // Load 8 initially
  const galleryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Abstract", "Nature", "Minimal", "Gradient", "Dark"];

  // Creative wallpaper data using only Unsplash images
  const wallpapers: Wallpaper[] = [
    {
      id: "1",
      title: "Starry Dreams",
      category: "Dark",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=700&fit=crop",
      downloads: 2847,
      likes: 234,
      gradient: "from-indigo-900 to-purple-900"
    },
    {
      id: "2",
      title: "Golden Forest",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=700&fit=crop",
      downloads: 3456,
      likes: 289,
      gradient: "from-amber-600 to-orange-600"
    },
    {
      id: "3",
      title: "Mountain Serenity",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=700&fit=crop",
      downloads: 1987,
      likes: 167,
      gradient: "from-blue-600 to-teal-600"
    },
    {
      id: "4",
      title: "Pine Wilderness",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=700&fit=crop",
      downloads: 2134,
      likes: 198,
      gradient: "from-green-700 to-emerald-700"
    },
    {
      id: "5",
      title: "Misty Peak",
      category: "Minimal",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=700&fit=crop",
      downloads: 1654,
      likes: 145,
      gradient: "from-gray-600 to-slate-700"
    },
    {
      id: "6",
      title: "Ocean Waves",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=700&fit=crop",
      downloads: 1234,
      likes: 89,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "7",
      title: "Forest Light",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=700&fit=crop",
      downloads: 2341,
      likes: 156,
      gradient: "from-green-600 to-yellow-500"
    },
    {
      id: "8",
      title: "Orange Bloom",
      category: "Abstract",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=700&fit=crop",
      downloads: 987,
      likes: 67,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "9",
      title: "Mountain Alps",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=400&h=700&fit=crop",
      downloads: 3456,
      likes: 234,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: "10",
      title: "Sunlit Trees",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=700&fit=crop",
      downloads: 1876,
      likes: 123,
      gradient: "from-green-500 to-yellow-500"
    },
    {
      id: "11",
      title: "Deer Meadow",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=700&fit=crop",
      downloads: 2234,
      likes: 178,
      gradient: "from-brown-600 to-amber-600"
    },
    {
      id: "12",
      title: "Foggy Summit",
      category: "Minimal",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop",
      downloads: 1543,
      likes: 112,
      gradient: "from-gray-500 to-blue-500"
    }
  ];

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

// Separate component for better performance
const WallpaperCard = React.memo(({ 
  wallpaper, 
  index, 
  isHovered, 
  onHover, 
  onDownload 
}: {
  wallpaper: Wallpaper;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onDownload: (wallpaper: Wallpaper) => void;
}) => {
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

export default WallpaperGallery;
