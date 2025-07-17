import React from 'react';
import { ArrowLeft, MapPin, Clock, Users, Heart, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our engineering team to build beautiful user interfaces and experiences."
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      description: "Create stunning designs and user experiences for our wallpaper platform."
    },
    {
      id: 3,
      title: "Content Creator",
      department: "Marketing",
      location: "Remote",
      type: "Part-time",
      description: "Help us create engaging content and grow our community of wallpaper enthusiasts."
    },
    {
      id: 4,
      title: "Digital Artist",
      department: "Creative",
      location: "Los Angeles, CA",
      type: "Contract",
      description: "Create original digital artwork and wallpapers for our curated collection."
    }
  ];

  const benefits = [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "Flexible work arrangements",
    "Professional development budget",
    "Creative freedom and autonomy",
    "Regular team events and retreats"
  ];

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Started",
      description: `Thank you for your interest in the ${jobTitle} position!`
    });
  };

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
              <h1 className="text-3xl font-bold">Careers</h1>
              <p className="text-muted-foreground">Join the SAAV team and help shape the future of digital art</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work With Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building the future of digital art and wallpapers. Join our passionate team 
              of creators, designers, and technologists who are making beautiful experiences accessible to everyone.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Why Work at SAAV?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Open Positions</h3>
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div 
                  key={job.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">{job.title}</h4>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Button 
                        onClick={() => handleApply(job.title)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform duration-200"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 p-8 rounded-lg bg-card border border-border">
            <h3 className="text-2xl font-bold mb-4">Don't see the right role?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals to join our team. 
              Send us your resume and let us know how you'd like to contribute.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;