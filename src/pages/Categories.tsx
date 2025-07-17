import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const categories = [
    { name: 'Nature', count: 45, image: '/public/background-section1.png' },
    { name: 'Abstract', count: 32, image: '/public/background-section2.png' },
    { name: 'Technology', count: 28, image: '/public/background-section3.png' },
    { name: 'Space', count: 22, image: '/public/hero-image.jpg' },
    { name: 'Minimalist', count: 38, image: '/public/text-mask-image.jpg' },
    { name: 'Dark', count: 55, image: '/public/Header-background.webp' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Categories</h1>
              <p className="text-muted-foreground">Browse wallpapers by category</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} wallpapers</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;