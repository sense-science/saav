
import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "SAAV has completely transformed my phone's look. The wallpapers are absolutely stunning and the quality is unmatched!",
      phone: "iPhone 14 Pro"
    },
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I love how easy it is to download wallpapers. The dark theme makes browsing so pleasant, especially at night.",
      phone: "Samsung Galaxy S23"
    },
    {
      name: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The gradient collections are my favorite! Every wallpaper feels like a piece of art. Highly recommended!",
      phone: "Google Pixel 7"
    },
    {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Finally found a wallpaper site that understands aesthetics. The minimalist designs are perfect for my style.",
      phone: "OnePlus 11"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            What Users Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of happy users who've transformed their phones with SAAV
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800 text-center">
              <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>

              <div className="flex items-center flex-col">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mb-4 border-4 border-purple-500/50"
                  loading="lazy"
                />
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-400 text-sm mb-2">
                    {testimonials[currentTestimonial].phone}
                  </p>
                  <div className="flex justify-center gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-purple-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  index === currentTestimonial
                    ? 'bg-purple-500/10 border-purple-500/50'
                    : 'bg-gray-900/30 border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="text-white font-medium text-sm">{testimonial.name}</h5>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
