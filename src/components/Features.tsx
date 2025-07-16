
import React, { useEffect, useRef } from "react";
import { Smartphone, Download, Palette, Zap, Heart, Shield } from "lucide-react";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfectly sized for all phone screens with instant preview",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Download,
      title: "Instant Download",
      description: "One-click download in high resolution, no sign-up required",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "Creative Designs",
      description: "Unique, artistic wallpapers crafted by talented designers",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized loading for quick browsing and downloads",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Curated Quality",
      description: "Hand-picked wallpapers that match your style and mood",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "All wallpapers are virus-free and safe to download",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            card.classList.add("mobile-gradient-active");
          } else {
            card.classList.remove("mobile-gradient-active");
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Why Choose SAAV?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of creativity, quality, and convenience
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:translate-y-[-10px] opacity-0 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              data-gradient={feature.gradient}
            >
              {/* Background gradient - hidden by default, shown on mobile scroll or desktop hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 rounded-2xl transition-opacity duration-300 mobile-gradient group-hover:opacity-5`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .mobile-gradient-active .mobile-gradient {
            opacity: 0.05 !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-gradient {
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;
