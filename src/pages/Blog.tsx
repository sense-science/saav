import React from 'react';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Digital Wallpapers: A Complete Guide",
      excerpt: "Discover the secrets behind creating stunning digital wallpapers that transform your workspace.",
      author: "Sarah Johnson",
      date: "Dec 15, 2024",
      image: "/public/hero-image.jpg",
      category: "Design"
    },
    {
      id: 2,
      title: "Top 10 Wallpaper Trends for 2025",
      excerpt: "Stay ahead of the curve with these emerging wallpaper trends that will dominate next year.",
      author: "Mike Chen",
      date: "Dec 12, 2024",
      image: "/public/background-section1.png",
      category: "Trends"
    },
    {
      id: 3,
      title: "How to Choose the Perfect Wallpaper for Your Setup",
      excerpt: "A comprehensive guide to selecting wallpapers that complement your workspace and boost productivity.",
      author: "Emma Davis",
      date: "Dec 10, 2024",
      image: "/public/background-section2.png",
      category: "Tips"
    },
    {
      id: 4,
      title: "Behind the Scenes: Artist Spotlight",
      excerpt: "Meet the talented artists creating the stunning wallpapers you love on SAAV.",
      author: "Alex Rodriguez",
      date: "Dec 8, 2024",
      image: "/public/background-section3.png",
      category: "Artists"
    }
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
              <h1 className="text-3xl font-bold">Blog</h1>
              <p className="text-muted-foreground">Insights, tips, and stories from the world of digital art</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div 
                      className="h-48 md:h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 hover:text-primary cursor-pointer transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <Button variant="ghost" className="group">
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;