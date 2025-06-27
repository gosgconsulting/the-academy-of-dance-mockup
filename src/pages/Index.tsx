import { useState } from "react";
import { Star, ArrowDown, Calendar, Mail, Phone, MapPin, Facebook, Instagram, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import WhatsAppChat from "@/components/WhatsAppChat";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    danceStyle: "",
    message: ""
  });
  const [isWhatsAppChatOpen, setIsWhatsAppChatOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Trial Class Request Submitted!",
      description: "We'll contact you within 24 hours to schedule your trial."
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
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black backdrop-blur-md z-50 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/lovable-uploads/b1840e0a-3045-4279-8d7b-b44020841ba0.png" alt="The Academy of Dance" className="h-12 w-auto" />
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('hero')} className="text-white hover:text-secondary transition-colors">Home</button>
              <button onClick={() => scrollToSection('trials')} className="text-white hover:text-secondary transition-colors">Trials</button>
              <button onClick={() => scrollToSection('programmes')} className="text-white hover:text-secondary transition-colors">Programmes</button>
              <button onClick={() => scrollToSection('gallery')} className="text-white hover:text-secondary transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('reviews')} className="text-white hover:text-secondary transition-colors">Reviews</button>
              <button onClick={() => scrollToSection('teachers')} className="text-white hover:text-secondary transition-colors">Teachers</button>
            </div>
            <Button onClick={() => scrollToSection('trials')} className="bg-primary hover:bg-primary/90 text-white">Book Now!</Button>
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
            Singapore's most prestigious ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => scrollToSection('trials')} size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('trials')}>
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
              Experience our world-class instruction with a trial class for just $20. Discover the perfect dance style for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Trial Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Join Our Trial Classes</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Ballet, Jazz, Lyrical & Contemporary, Hip Hop, Tap
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Tumbling classes are also available as our new course
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    You can join our trail classes for just $20!
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

              <div className="bg-white text-primary rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="font-playfair text-2xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Ms June Lee</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <a href="tel:+6598372670" className="hover:text-secondary transition-colors">
                      (65) 9837 2670
                    </a>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-primary" />
                    <div>
                      <p className="font-semibold">Tampines</p>
                      <p>510 Tampines Central 1, #02-250</p>
                      <p>Singapore 520510</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-6">Book Your Trial Class</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} required />
                  <Input placeholder="Age" value={formData.age} onChange={e => setFormData({
                  ...formData,
                  age: e.target.value
                })} required />
                </div>
                <Input placeholder="Preferred Dance Style (Ballet, Jazz, Lyrical, Contemporary, Hip Hop, Tap, Tumbling)" value={formData.danceStyle} onChange={e => setFormData({
                ...formData,
                danceStyle: e.target.value
              })} />
                <Textarea placeholder="Tell us about your dance experience or any questions..." value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} rows={4} />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now!
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programmes Section */}
      <section id="programmes" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Programmes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the perfect dance style for you with our comprehensive range of programmes, 
              each designed to nurture artistry and technical excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ballet */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/da5c9831-e15c-4c80-bf8c-169e3bb472fc.png" alt="Ballet Class" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Ballet</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Baby Gems is a magical first step into dance for little ones aged 3–4, created by Ms. June Lee to make learning fun and joyful.
With twirls to Disney tunes and skips to nursery rhymes, it builds confidence, creativity, and sets the stage for classical training.</p>
              </CardContent>
            </Card>

            {/* Jazz */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/3f806d09-71f1-4c34-8591-8c2dd21fe346.png" alt="Jazz Dance Performance" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Jazz</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Dynamic and energetic, our jazz classes focus on sharp movements, isolations, and performance quality. 
                  Students develop rhythm, coordination, and stage presence while learning classic jazz techniques 
                  and contemporary commercial styles.
                </p>
              </CardContent>
            </Card>

            {/* Lyrical */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png" alt="Lyrical Dance" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Lyrical</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A beautiful fusion of ballet technique with emotional storytelling. Lyrical dance emphasizes 
                  the connection between music and movement, allowing dancers to express deep emotions through 
                  flowing, graceful choreography that tells a story.
                </p>
              </CardContent>
            </Card>

            {/* Contemporary */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/cc1b8cc0-3767-4760-9f8a-3015d9e2a2f6.png" alt="Contemporary Dance" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Contemporary</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Modern movement that breaks traditional dance boundaries. Contemporary dance incorporates 
                  elements from various dance styles, focusing on versatility, creativity, and personal 
                  expression through innovative choreography and technique.
                </p>
              </CardContent>
            </Card>

            {/* Hip Hop */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/3e19f9a6-1e4b-40f4-9c80-638142fb2bf5.png" alt="Hip Hop Dance" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Hip Hop</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Street-style dance that emphasizes personal expression and creativity. Our hip hop classes 
                  teach foundational moves, freestyle techniques, and urban choreography while building 
                  confidence, rhythm, and individual style.
                </p>
              </CardContent>
            </Card>

            {/* Tap */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/026cddda-e890-486d-be1e-8052ff34515e.png" alt="Tap Dance" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Tap Dance</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Create music with your feet! Our tap programme develops rhythm, coordination, and musicality 
                  through traditional tap techniques. Students learn basic steps, combinations, and improvisation 
                  while building strong rhythmic foundations.
                </p>
              </CardContent>
            </Card>

            {/* Tumbling */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/96dbee1c-cdd5-4735-a8ab-21e83d6f99c2.png" alt="Tumbling Class" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Tumbling</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Our newest programme! Build strength, flexibility, and acrobatic skills in a safe, progressive 
                  environment. Students learn rolls, cartwheels, handstands, and more advanced tumbling skills 
                  that enhance their overall dance performance.
                </p>
                <div className="mt-4">
                  <Button onClick={() => window.open('https://wa.me/6598372670', '_blank')} className="bg-primary hover:bg-primary/90 text-white">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            
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
            {[{
            image: '/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png',
            title: 'Melbourne Dance Exchange 2023'
          }, {
            image: '/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png',
            title: 'Ballet Class Excellence'
          }, {
            image: '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png',
            title: 'International Adventures'
          }, {
            image: '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png',
            title: 'Performance Ready'
          }, {
            image: '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png',
            title: 'Dance Community'
          }, {
            image: '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png',
            title: 'Young Performers'
          }].map((item, index) => <div key={index} className="relative group overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-playfair text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Competition Excellence Section */}
      <section id="competitions" className="py-20 bg-gradient-to-br from-primary/10 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Competition Excellence
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We don't just dance for fun (though we have TONS of that!) - we also dominate the competition scene! 
              Our dancers bring home the gold and make us incredibly proud. ✨
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center justify-center mb-8">
                <Trophy className="w-12 h-12 text-secondary mr-4" />
                <h3 className="font-playfair text-3xl font-bold text-primary">Our Competition Classes</h3>
              </div>
              
              <Tabs defaultValue="solo" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="solo">Solo Program</TabsTrigger>
                  <TabsTrigger value="groups">Dance Groups</TabsTrigger>
                </TabsList>
                
                <TabsContent value="solo" className="mt-6">
                  <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-6">
                    <h4 className="font-playfair font-bold text-primary mb-4 flex items-center text-2xl">
                      
                      Solo Program
                    </h4>
                    <p className="text-gray-700 text-base font-normal">
                      Perfect for dancers who want to shine in the spotlight! Our solo program develops individual artistry, 
                      technical precision, and stage presence that judges absolutely love.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="groups" className="mt-6">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
                    <h4 className="font-playfair font-bold text-primary mb-4 flex items-center text-2xl">
                      
                      Dance Groups
                    </h4>
                    <p className="text-gray-700 mb-3 text-base">
                      Our competitive troupes are where magic happens! These elite groups train together, compete together, 
                      and WIN together. The bond they form is as strong as their performances are spectacular.
                    </p>
                    <p className="text-secondary font-semibold italic">
                      (These are our competitive troupes - the cream of the crop!)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center">
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Events Section */}
      <section id="events" className="py-20 bg-gradient-to-br from-secondary/10 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Events
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for exciting performances, competitions, and workshops throughout the year.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel 
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative">
                      <img src="/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png" alt="Melbourne Dance Exchange 2023" className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Competition</span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">Melbourne Dance Exchange</h3>
                      <p className="text-gray-600 text-sm mb-2">International Competition</p>
                      <p className="text-gray-500 text-sm mb-4 flex-1">Our students participated in the prestigious Melbourne Dance Exchange, showcasing their talent on an international stage.</p>
                      <Button onClick={() => window.open('https://wa.me/6598372670', '_blank')} className="bg-primary hover:bg-primary/90 text-white w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative">
                      <img src="/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png" alt="Annual Recital" className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm">Performance</span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">Annual Recital</h3>
                      <p className="text-gray-600 text-sm mb-2">December 2024</p>
                      <p className="text-gray-500 text-sm mb-4 flex-1">Our biggest event of the year where all our students showcase their progress and talent in a professional theater setting.</p>
                      <Button onClick={() => window.open('https://wa.me/6598372670', '_blank')} className="bg-primary hover:bg-primary/90 text-white w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative">
                      <img src="/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png" alt="Summer Dance Intensive" className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="bg-dance-purple text-white px-3 py-1 rounded-full text-sm">Workshop</span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">Summer Dance Intensive</h3>
                      <p className="text-gray-600 text-sm mb-2">June - July 2024</p>
                      <p className="text-gray-500 text-sm mb-4 flex-1">Intensive summer program for serious dancers looking to elevate their skills with masterclasses and guest instructors.</p>
                      <Button onClick={() => window.open('https://wa.me/6598372670', '_blank')} className="bg-primary hover:bg-primary/90 text-white w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative">
                      <img src="/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png" alt="International Dance Festival" className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="bg-dance-rose text-white px-3 py-1 rounded-full text-sm">Festival</span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">International Dance Festival</h3>
                      <p className="text-gray-600 text-sm mb-2">March 2024</p>
                      <p className="text-gray-500 text-sm mb-4 flex-1">Participation in international dance festivals, giving our students exposure to global dance communities.</p>
                      <Button onClick={() => window.open('https://wa.me/6598372670', '_blank')} className="bg-primary hover:bg-primary/90 text-white w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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
            {[{
            name: "Sarah Chen",
            role: "Parent of Emma, Age 8",
            content: "The Academy of Dance has transformed my shy daughter into a confident performer. The teachers are exceptional and truly care about each child's progress.",
            rating: 5
          }, {
            name: "Michael Tan",
            role: "Parent of Lucas, Age 12",
            content: "Outstanding instruction and facilities. My son has developed incredible discipline and artistry. The recitals are professionally produced and showcase real talent.",
            rating: 5
          }, {
            name: "Priya Patel",
            role: "Parent of Aria, Age 6",
            content: "We've tried several dance schools, but none compare to the quality and care here. The trial class sold us immediately - it's worth every dollar.",
            rating: 5
          }].map((review, index) => <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="space-y-4 p-0">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
                  </div>
                  <p className="text-gray-700 italic">"{review.content}"</p>
                  <div>
                    <p className="font-semibold text-primary">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">Our Instructors</h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              Learn from internationally trained professionals who bring decades of experience and genuine passion for dance education.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel 
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {[{
                name: "Ms June Lee",
                specialty: "Founder",
                credentials: "41 years of experience",
                experience: "Ms. June Lee is a veteran dance educator and choreographer whose 41-year career has inspired students, earned international awards, and featured in prestigious global events.",
                image: "/lovable-uploads/07de0001-b755-433d-8b27-b1d01335b772.png",
                isFounder: true
              }, {
                name: "Ms Tan Jia Jia",
                specialty: "Multi-Genre Specialist",
                credentials: "International exposure & competitive track record",
                experience: "Ms. Tan Jia Jia is an experienced, versatile dance educator with international exposure and a strong competitive track record.",
                image: "/lovable-uploads/996fb449-b3aa-4ec3-acca-2dad9c8a5ac4.png"
              }, {
                name: "Ms Jasmine Koh",
                specialty: "Classical Ballet Expert",
                credentials: "25 years experience, RAD & CSTD certified",
                experience: "Ms. Jasmine Koh is a passionate dancer and educator with 25 years of experience, trained in ballet, jazz, and tap, and certified under RAD and CSTD.",
                image: "/lovable-uploads/444d487e-9e10-4a56-9e2a-409250051960.png"
              }, {
                name: "Ms Annabelle Ong",
                specialty: "Inspirational Educator",
                credentials: "Started at 17, full-time design career",
                experience: "Ms. Annabelle Ong is a dedicated dancer and teacher who, despite starting at 17, has performed widely and now inspires young dancers while balancing a full-time design career.",
                image: "/lovable-uploads/8850b256-158e-4e7c-852c-d736bb723229.png"
              }, {
                name: "Ms Jacqueline Macpherson",
                specialty: "Award-Winning Performer",
                credentials: "International performance experience",
                experience: "Ms. Jacqueline Macpherson is an award-winning dancer with international performance experience who now aims to share her passion for dance through teaching.",
                image: "/lovable-uploads/58297713-194b-4e3b-bea0-554b437b8af0.png"
              }].map((teacher, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative">
                        <img 
                          src={teacher.image} 
                          alt={teacher.name} 
                          className={`w-full h-72 object-cover ${teacher.isFounder ? 'object-[center_5%]' : 'object-[center_20%]'}`} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-playfair text-xl font-bold text-primary mb-2">{teacher.name}</h3>
                        <p className="text-secondary font-semibold mb-2">{teacher.specialty}</p>
                        <p className="text-gray-600 text-sm mb-2">{teacher.credentials}</p>
                        <p className="text-gray-500 text-sm">{teacher.experience}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Our Locations Section */}
      <section id="locations" className="py-20 bg-gradient-to-br from-secondary/10 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">Our Locations</h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              Visit us at our convenient locations across Singapore for world-class dance education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tampines Location */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/2085b60d-2383-47b3-9252-fea94e4cbbd5.png" alt="Tampines Location - Ballet Class" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6">Tampines</h3>
                <div className="space-y-4 text-gray-700 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <p>510 Tampines Central 1</p>
                      <p>#02-250</p>
                      <p>Singapore 520510</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <a href="tel:+6598372670" className="hover:text-secondary transition-colors">
                      (65) 9837 2670
                    </a>
                  </div>
                </div>
                <Button onClick={() => window.open('https://maps.google.com/maps?q=510+Tampines+Central+1+%2302-250+Singapore+520510', '_blank')} className="w-full bg-primary hover:bg-primary/90 text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Us
                </Button>
              </CardContent>
            </Card>

            {/* Yishun Location */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src="/lovable-uploads/d4f04f67-dc1a-431b-a7f2-6f1ca3e927a0.png" alt="Yishun Location - Dance Performance" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6">Yishun</h3>
                <div className="space-y-4 text-gray-700 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <p>Wisteria Mall, 598 Yishun Ring Road</p>
                      <p>598 Yishun Ring Road</p>
                      <p>#01-35/36</p>
                      <p>Singapore 768698</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <a href="tel:+6593378605" className="hover:text-secondary transition-colors">
                      (65) 9337 8605
                    </a>
                  </div>
                </div>
                <Button onClick={() => window.open('https://maps.google.com/maps?q=Wisteria+Mall+598+Yishun+Ring+Road+%2301-35%2F36+Singapore+768698', '_blank')} className="w-full bg-primary hover:bg-primary/90 text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-1 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img src="/lovable-uploads/b1840e0a-3045-4279-8d7b-b44020841ba0.png" alt="The Academy of Dance" className="h-16 w-auto" />
              </div>
              <p className="text-gray-300 mb-6">Where dreams take flight through the art of dance</p>
              
              {/* Social Media Icons */}
              <div className="flex justify-center space-x-4">
                <a href="https://www.facebook.com/theacademyofdancesg" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.instagram.com/theacademyofdancesg/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 rounded-full transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center border-t border-gray-700 pt-8">
            <div className="flex justify-center space-x-8 text-sm mb-4">
              <a href="#" className="hover:text-secondary transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 The Academy of Dance. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <button onClick={() => setIsWhatsAppChatOpen(!isWhatsAppChatOpen)} className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110" aria-label="Contact us on WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
        </svg>
      </button>

      {/* WhatsApp Chat Widget */}
      <WhatsAppChat isOpen={isWhatsAppChatOpen} onClose={() => setIsWhatsAppChatOpen(false)} />
    </div>;
};

export default Index;
