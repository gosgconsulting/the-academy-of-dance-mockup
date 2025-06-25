

import { useState } from "react";
import { Star, ArrowDown, Calendar, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    danceStyle: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Trial Class Request Submitted!",
      description: "We'll contact you within 24 hours to schedule your trial.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      danceStyle: "",
      message: ""
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black backdrop-blur-md z-50 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/b1840e0a-3045-4279-8d7b-b44020841ba0.png" 
                alt="The Academy of Dance" 
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('hero')} className="text-white hover:text-secondary transition-colors">Home</button>
              <button onClick={() => scrollToSection('trials')} className="text-white hover:text-secondary transition-colors">Trials</button>
              <button onClick={() => scrollToSection('gallery')} className="text-white hover:text-secondary transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('reviews')} className="text-white hover:text-secondary transition-colors">Reviews</button>
              <button onClick={() => scrollToSection('teachers')} className="text-white hover:text-secondary transition-colors">Teachers</button>
            </div>
            <Button onClick={() => scrollToSection('trials')} className="bg-primary hover:bg-primary/90 text-white">
              Book Trial
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative z-10 text-center px-6 animate-fade-up">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-primary mb-6">
            Where Dreams
            <span className="text-secondary block">Take Flight</span>
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Singapore's most prestigious dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection('trials')} size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
              Start Your Journey
            </Button>
            <Button onClick={() => scrollToSection('gallery')} variant="outline" size="lg" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white">
              Watch Our Students
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary" />
        </div>
      </section>

      {/* Trials & Contact Section */}
      <section id="trials" className="py-20 bg-gradient-to-br from-secondary/10 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Begin Your Dance Journey
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our world-class instruction with a complimentary trial class. Discover the perfect dance style for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Trial Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Free Trial Classes</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Ballet, Contemporary, Jazz, Hip-Hop & More
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Professional instructors with international experience
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Small class sizes for personalized attention
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Ages 3 to adult - everyone welcome
                  </li>
                </ul>
              </div>

              <div className="bg-primary text-white rounded-2xl p-8">
                <h3 className="font-playfair text-2xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>+65 6123 4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>hello@academyofdance.sg</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>123 Orchard Road, Singapore 238858</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-6">Book Your Trial Class</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                </div>
                <Input
                  placeholder="Preferred Dance Style"
                  value={formData.danceStyle}
                  onChange={(e) => setFormData({...formData, danceStyle: e.target.value})}
                />
                <Textarea
                  placeholder="Tell us about your dance experience or any questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book My Free Trial
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Our Students Shine
            </h2>
            <p className="font-inter text-xl text-gray-300 max-w-2xl mx-auto">
              Witness the artistry, passion, and technical excellence of our dancers across all disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: '/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png', title: 'Melbourne Dance Exchange 2023' },
              { image: '/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png', title: 'Ballet Class Excellence' },
              { image: '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png', title: 'International Adventures' },
              { image: '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png', title: 'Performance Ready' },
              { image: '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png', title: 'Dance Community' },
              { image: '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png', title: 'Young Performers' }
            ].map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-playfair text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-br from-secondary/10 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              What Parents Say
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              Discover why families trust us with their children's dance education and artistic development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Parent of Emma, Age 8",
                content: "The Academy of Dance has transformed my shy daughter into a confident performer. The teachers are exceptional and truly care about each child's progress.",
                rating: 5
              },
              {
                name: "Michael Tan",
                role: "Parent of Lucas, Age 12",
                content: "Outstanding instruction and facilities. My son has developed incredible discipline and artistry. The recitals are professionally produced and showcase real talent.",
                rating: 5
              },
              {
                name: "Priya Patel",
                role: "Parent of Aria, Age 6",
                content: "We've tried several dance schools, but none compare to the quality and care here. The trial class sold us immediately - it's worth every dollar.",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="space-y-4 p-0">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{review.content}"</p>
                  <div>
                    <p className="font-semibold text-primary">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              World-Class Instructors
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              Learn from internationally trained professionals who bring decades of experience and genuine passion for dance education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ms June Lee",
                specialty: "Founder",
                credentials: "Started dancing at age 4",
                experience: "Caring motivator and mentor to young teachers",
                image: "https://images.unsplash.com/photo-1494790108755-2616c669552e?ixlib=rb-4.0.3"
              },
              {
                name: "Ms Tan Jia Jia",
                specialty: "Multi-Genre Specialist",
                credentials: "24 years dancing experience",
                experience: "13 years teaching experience - Competent in wide variety of dance genres",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
              },
              {
                name: "Ms Jasmine Koh",
                specialty: "Classical Ballet Expert",
                credentials: "25 years dancing experience",
                experience: "12 years teaching experience - Started Classical Ballet at age 4",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3"
              },
              {
                name: "Ms Annabelle Ong",
                specialty: "Inspirational Educator",
                credentials: "Started dance journey at age 17",
                experience: "Completed RAD Intermediate ballet examination - Inspiring story of dedication and achievement",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
              }
            ].map((teacher, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-2">{teacher.name}</h3>
                  <p className="text-secondary font-semibold mb-2">{teacher.specialty}</p>
                  <p className="text-gray-600 text-sm mb-1">{teacher.credentials}</p>
                  <p className="text-gray-500 text-sm">{teacher.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/b1840e0a-3045-4279-8d7b-b44020841ba0.png" 
                alt="The Academy of Dance" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">Where dreams take flight through the art of dance</p>
            <div className="flex justify-center space-x-8 text-sm">
              <span>+65 6123 4567</span>
              <span>hello@academyofdance.sg</span>
              <span>123 Orchard Road, Singapore</span>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
              © 2024 The Academy of Dance. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

