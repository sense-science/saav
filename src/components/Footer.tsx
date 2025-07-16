
import React, { useState } from "react";
import { Heart, Instagram, Twitter, Github, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast({ title: "Email Required", description: "Please enter your email address", variant: "destructive" });
      return;
    }
    toast({ title: "Subscribed!", description: "Thank you for subscribing to our newsletter!" });
    setEmail("");
  };

  const handleSocialClick = (platform: string) => {
    toast({ title: `${platform}`, description: `Opening ${platform} page...` });
  };
  const footerLinks = {
    Product: [
      { name: "Wallpapers", href: "#wallpapers" },
      { name: "Categories", href: "#categories" },
      { name: "New Releases", href: "#new" },
      { name: "Popular", href: "#popular" }
    ],
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" }
    ],
    Support: [
      { name: "Help Center", href: "#help" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SAAV
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your phone with stunning, creative wallpapers designed for the bold and beautiful. Join thousands of users who trust SAAV for their mobile aesthetics.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleSocialClick(social.label)}
                  className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400">Get notified about new wallpaper collections and features.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <button 
                onClick={handleSubscribe}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:scale-105 transition-transform duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 SAAV. All rights reserved. Made with{" "}
            <Heart className="w-4 h-4 inline-block mx-1 text-red-500" />{" "}
            for mobile aesthetics.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#privacy" className="hover:text-white transition-colors duration-200">
              Privacy
            </a>
            <a href="#terms" className="hover:text-white transition-colors duration-200">
              Terms
            </a>
            <a href="#cookies" className="hover:text-white transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
