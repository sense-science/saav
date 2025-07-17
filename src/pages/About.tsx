import React from 'react';
import { ArrowLeft, Heart, Download, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
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
              <h1 className="text-3xl font-bold">About SAAV</h1>
              <p className="text-muted-foreground">Discover our story and mission</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Creating Beautiful Experiences
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              SAAV is dedicated to providing the highest quality wallpapers and digital art 
              to transform your digital spaces into something extraordinary.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">10K+</h3>
              <p className="text-muted-foreground">Happy Users</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <Download className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">50K+</h3>
              <p className="text-muted-foreground">Downloads</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">100+</h3>
              <p className="text-muted-foreground">Artists</p>
            </div>
          </div>

          {/* Story */}
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mb-6">Our Story</h3>
            <p className="text-muted-foreground mb-6">
              Founded in 2024, SAAV began as a passion project to democratize access to 
              high-quality digital art and wallpapers. We believe that everyone deserves 
              to have beautiful, inspiring visuals in their digital workspace.
            </p>
            <p className="text-muted-foreground mb-6">
              Our carefully curated collection features work from talented artists around 
              the world, ensuring that every wallpaper meets our high standards for quality, 
              creativity, and visual impact.
            </p>
            <p className="text-muted-foreground">
              We're constantly growing and evolving, adding new features and content to 
              make your experience even better. Thank you for being part of our journey.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform duration-200">
                Explore Wallpapers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;