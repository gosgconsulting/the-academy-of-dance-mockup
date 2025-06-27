import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, Phone, Clock, Star, Users, Trophy, Heart, Sparkles, Music, Calendar, Award, Globe } from "lucide-react";
import WhatsAppChat from "@/components/WhatsAppChat";

const Index = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <WhatsAppChat isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-dance-gold to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-playfair">Étoile Dance Academy</h1>
                <p className="text-purple-100 text-sm">Where Stars Are Born</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#about" className="text-white hover:text-dance-gold transition-colors font-medium">About</a>
              <a href="#programs" className="text-white hover:text-dance-gold transition-colors font-medium">Programs</a>
              <a href="#gallery" className="text-white hover:text-dance-gold transition-colors font-medium">Gallery</a>
              <a href="#contact" className="text-white hover:text-dance-gold transition-colors font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-purple-700/80 to-pink-600/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <div className="mb-8">
              <Badge variant="secondary" className="bg-yellow-500/90 text-white border-0 px-4 py-2 text-sm font-medium">
                ✨ Award-Winning Academy
              </Badge>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 font-playfair leading-tight">
              Where Dreams Take{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                Flight
              </span>
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover the magic of dance at Singapore's premier ballet academy. 
              From graceful beginnings to professional excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8 py-3 shadow-xl transform hover:scale-105 transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 shadow-xl transform hover:scale-105 transition-all duration-300">
                <Music className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 font-playfair">500+</div>
              <div className="text-pink-100">Happy Students</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 font-playfair">15+</div>
              <div className="text-pink-100">Years Experience</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 font-playfair">50+</div>
              <div className="text-pink-100">Awards Won</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 font-playfair">10+</div>
              <div className="text-pink-100">Expert Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-purple-600 text-purple-600 mb-4">
              <Heart className="mr-2 h-4 w-4" />
              About Our Academy
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-6 font-playfair">
              Nurturing Excellence Since 2008
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Étoile Dance Academy, we believe every child has the potential to shine. 
              Our internationally acclaimed instructors provide world-class training in a nurturing, 
              supportive environment that builds confidence and character.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-600 mb-4">Award-Winning Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Our students consistently achieve top honors in international competitions, 
                with over 50 awards in the past 5 years.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-gradient-to-br from-white to-pink-50 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-pink-600 mb-4">Supportive Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a family of passionate dancers where friendships bloom and 
                everyone supports each other's journey to greatness.
              </p>
            </Card>
            
            <Card className="p-8 text-center bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-600 mb-4">Global Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience international performances and competitions, 
                opening doors to prestigious dance institutions worldwide.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-white/90 text-dance-purple mb-4">
              <Star className="mr-2 h-4 w-4" />
              Our Programs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              Programs for Every Dancer
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              From tiny tots taking their first steps to advanced students preparing for professional careers, 
              we have the perfect program for every age and skill level.
            </p>
          </div>

          <Tabs defaultValue="pre-primary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/10 backdrop-blur-sm rounded-xl p-2">
              <TabsTrigger value="pre-primary" className="data-[state=active]:bg-dance-gold data-[state=active]:text-white text-white">Pre-Primary</TabsTrigger>
              <TabsTrigger value="primary" className="data-[state=active]:bg-dance-gold data-[state=active]:text-white text-white">Primary</TabsTrigger>
              <TabsTrigger value="intermediate" className="data-[state=active]:bg-dance-gold data-[state=active]:text-white text-white">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-dance-gold data-[state=active]:text-white text-white">Advanced</TabsTrigger>
              <TabsTrigger value="adult" className="data-[state=active]:bg-dance-gold data-[state=active]:text-white text-white">Adult</TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="pre-primary" className="space-y-6">
                <Card className="bg-white/95 backdrop-blur-sm p-8 border-0 shadow-xl">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-dance-purple mb-4 font-playfair">Pre-Primary Ballet (Ages 3-5)</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Introduce your little ones to the magical world of ballet through creative movement, 
                        storytelling, and imaginative play. Our nurturing approach builds confidence and coordination.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700">Creative Movement</Badge>
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700">Storytelling</Badge>
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700">Basic Coordination</Badge>
                      </div>
                      <div className="text-dance-gold font-semibold">$120/month • 45 min classes</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="primary" className="space-y-6">
                <Card className="bg-white/95 backdrop-blur-sm p-8 border-0 shadow-xl">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-dance-purple mb-4 font-playfair">Primary Ballet (Ages 6-8)</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Build foundation skills with proper ballet technique, musicality, and discipline. 
                        Students learn basic positions, simple combinations, and develop their artistic expression.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">Ballet Technique</Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">Musicality</Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">Performance Skills</Badge>
                      </div>
                      <div className="text-dance-gold font-semibold">$140/month • 60 min classes</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="intermediate" className="space-y-6">
                <Card className="bg-white/95 backdrop-blur-sm p-8 border-0 shadow-xl">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-dance-rose to-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-dance-purple mb-4 font-playfair">Intermediate Ballet (Ages 9-12)</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Advance technical skills with complex combinations, jumps, and turns. 
                        Students prepare for examinations and competitions while developing personal style.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-rose-100 text-rose-700">Advanced Technique</Badge>
                        <Badge variant="secondary" className="bg-rose-100 text-rose-700">Exam Preparation</Badge>
                        <Badge variant="secondary" className="bg-rose-100 text-rose-700">Competition Training</Badge>
                      </div>
                      <div className="text-dance-gold font-semibold">$160/month • 75 min classes</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-6">
                <Card className="bg-white/95 backdrop-blur-sm p-8 border-0 shadow-xl">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-dance-gold to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-dance-purple mb-4 font-playfair">Advanced Ballet (Ages 13+)</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Pre-professional training for serious dancers. Master complex techniques, 
                        variations, and prepare for professional auditions and international competitions.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pre-Professional</Badge>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">International Competitions</Badge>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Career Preparation</Badge>
                      </div>
                      <div className="text-dance-gold font-semibold">$200/month • 90 min classes</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="adult" className="space-y-6">
                <Card className="bg-white/95 backdrop-blur-sm p-8 border-0 shadow-xl">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-dance-purple mb-4 font-playfair">Adult Ballet (18+)</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Never too late to start! Adult-friendly classes focusing on flexibility, 
                        grace, and the joy of movement. Perfect for beginners or returning dancers.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">Beginner Friendly</Badge>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">Flexibility Focus</Badge>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">Supportive Environment</Badge>
                      </div>
                      <div className="text-dance-gold font-semibold">$100/month • 60 min classes</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-dance-purple mb-4 font-playfair">Track Your Progress</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our students develop their skills across different areas of ballet training.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-200">
              <h4 className="font-semibold text-dance-purple mb-3">Technical Skill</h4>
              <Progress value={85} className="mb-2" />
              <span className="text-sm text-gray-600">Advanced Level</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-200">
              <h4 className="font-semibold text-dance-rose mb-3">Artistic Expression</h4>
              <Progress value={92} className="mb-2" />
              <span className="text-sm text-gray-600">Exceptional</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
              <h4 className="font-semibold text-dance-purple mb-3">Performance Confidence</h4>
              <Progress value={78} className="mb-2" />
              <span className="text-sm text-gray-600">Strong Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-dance-gold/90 text-white mb-4">
              <MapPin className="mr-2 h-4 w-4" />
              Visit Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards your dance dreams. Contact us today to schedule your free trial class.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-playfair">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-dance-gold to-yellow-500 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Yishun Location</div>
                      <div className="text-gray-300 text-sm">
                        Wisteria Mall, 598 Yishun Ring Road<br />
                        #01-35/36<br />
                        Singapore 768698
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-dance-rose to-pink-500 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Phone</div>
                      <div className="text-gray-300 text-sm">+65 9123 4567</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-dance-purple to-purple-500 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Operating Hours</div>
                      <div className="text-gray-300 text-sm">
                        Mon-Fri: 3:00 PM - 9:00 PM<br />
                        Sat-Sun: 9:00 AM - 6:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Special Offers</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-dance-gold" />
                    <span className="text-gray-300">Free trial class for new students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-dance-gold" />
                    <span className="text-gray-300">10% discount for siblings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-dance-gold" />
                    <span className="text-gray-300">Early bird discounts available</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 font-playfair">Find Us</h3>
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6234567890123!2d103.8395678901234!3d1.4234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3d234567890a%3A0x1234567890abcdef!2sWisteria%20Mall%2C%20598%20Yishun%20Ring%20Rd%2C%20Singapore%20768698!5e0!3m2!1sen!2ssg!4v1679876543210"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <Button className="w-full bg-gradient-to-r from-dance-gold to-yellow-500 hover:from-yellow-500 hover:to-dance-gold text-white font-semibold py-3 shadow-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Your Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-black to-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-dance-gold to-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold font-playfair">Étoile Dance Academy</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Inspiring dancers to reach for the stars since 2008.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-dance-gold rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-dance-rose rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
                <div className="w-8 h-8 bg-dance-purple rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">t</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-dance-gold">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-dance-gold transition-colors">About Us</a></li>
                <li><a href="#programs" className="hover:text-dance-gold transition-colors">Programs</a></li>
                <li><a href="#gallery" className="hover:text-dance-gold transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-dance-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-dance-gold">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-dance-gold transition-colors cursor-pointer">Pre-Primary Ballet</li>
                <li className="hover:text-dance-gold transition-colors cursor-pointer">Primary Ballet</li>
                <li className="hover:text-dance-gold transition-colors cursor-pointer">Intermediate Ballet</li>
                <li className="hover:text-dance-gold transition-colors cursor-pointer">Advanced Ballet</li>
                <li className="hover:text-dance-gold transition-colors cursor-pointer">Adult Classes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-dance-gold">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p className="text-sm">Wisteria Mall, Yishun</p>
                <p className="text-sm">+65 9123 4567</p>
                <p className="text-sm">info@etoiledance.sg</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 Étoile Dance Academy. All rights reserved. | Where Stars Are Born</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
