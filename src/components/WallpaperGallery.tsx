import React, { useState, useRef, useEffect } from "react";
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
  const galleryRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Abstract", "Nature", "Minimal", "Gradient", "Dark"];

  // Creative wallpaper data using the provided placeholder images
  const wallpapers: Wallpaper[] = [
    {
      id: "1",
      title: "Starry Dreams",
      category: "Dark",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      downloads: 2847,
      likes: 234,
      gradient: "from-indigo-900 to-purple-900"
    },
    {
      id: "2",
      title: "Golden Forest",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      downloads: 3456,
      likes: 289,
      gradient: "from-amber-600 to-orange-600"
    },
    {
      id: "3",
      title: "Mountain Serenity",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      downloads: 1987,
      likes: 167,
      gradient: "from-blue-600 to-teal-600"
    },
    {
      id: "4",
      title: "Pine Wilderness",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      downloads: 2134,
      likes: 198,
      gradient: "from-green-700 to-emerald-700"
    },
    {
      id: "5",
      title: "Misty Peak",
      category: "Minimal",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      downloads: 1654,
      likes: 145,
      gradient: "from-gray-600 to-slate-700"
    },
    {
      id: "6",
      title: "Purple Dreams",
      category: "Abstract",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      downloads: 1234,
      likes: 89,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: "7",
      title: "Cosmic Flow",
      category: "Abstract",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      downloads: 2341,
      likes: 156,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: "8",
      title: "Ocean Vibes",
      category: "Gradient",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      downloads: 987,
      likes: 67,
      gradient: "from-teal-600 to-blue-600"
    },
    {
      id: "9",
      title: "Sunset Glow",
      category: "Gradient",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      downloads: 3456,
      likes: 234,
      gradient: "from-orange-600 to-pink-600"
    },
    {
      id: "10",
      title: "Dark Matter",
      category: "Dark",
      image: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
      downloads: 1876,
      likes: 123,
      gradient: "from-gray-800 to-black"
    }
  ];

  const filteredWallpapers = selectedCategory === "All" 
    ? wallpapers 
    : wallpapers.filter(w => w.category === selectedCategory);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".wallpaper-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredWallpapers]);

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredWallpapers.map((wallpaper, index) => (
            <div
              key={wallpaper.id}
              className="wallpaper-card opacity-0 group relative overflow-hidden rounded-2xl bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredWallpaper(wallpaper.id)}
              onMouseLeave={() => setHoveredWallpaper(null)}
            >
              <div className="aspect-[9/16] relative overflow-hidden">
                <img
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-80 transition-opacity duration-300",
                  wallpaper.gradient
                )} />

                {/* Action buttons */}
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-all duration-300",
                  hoveredWallpaper === wallpaper.id ? "opacity-100" : ""
                )}>
                  <button
                    onClick={() => handleDownload(wallpaper)}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2">{wallpaper.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded-full">{wallpaper.category}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {wallpaper.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {wallpaper.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25">
            Load More Wallpapers
          </button>
        </div>
      </div>
    </section>
  );
};

export default WallpaperGallery;
