import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HomePageHero } from "@/lib/graphql";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
  data: HomePageHero;
}
const DEFAULT_DATA: HomePageHero = {
  heroButton: "Start Your Journey",
  heroHeadline: "Where Dreams<br />\r\n<span className=\"text-secondary block text-center\" style=\"color: hsl(var(--secondary))\">Take Flight</span>",
  heroTagline: "Discover the joy of movement through our comprehensive dance programs. From classical ballet to contemporary styles, we nurture dancers of all ages and abilities.",
  heroImages: {
    nodes: [
      {
        mediaItemUrl: "https://wordpress-production-abdc.up.railway.app/wp-content/uploads/2025/09/MRB1729-2-scaled.jpg"
      },
      {
        mediaItemUrl: "https://wordpress-production-abdc.up.railway.app/wp-content/uploads/2025/09/IMG_4268-scaled.jpg"
      },
      {
        mediaItemUrl: "https://wordpress-production-abdc.up.railway.app/wp-content/uploads/2025/09/AAL_5683-scaled.jpg"
      }
    ]
  },
};

const HeroSection = ({
  scrollToSection,
  data: heroData = DEFAULT_DATA,
}: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Extract data from GraphQL response (with fallback for useEffect)
  const heroImages = heroData?.heroImages?.nodes?.map(img => img.mediaItemUrl) || [];
  
  useEffect(() => {
    if (displayImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % displayImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {displayImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image} alt={`Dance performance ${index + 1}`} className="w-full h-full object-cover" />
          </div>)}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 animate-fade-up flex flex-col items-center">
        <h1 
          className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-center"
          dangerouslySetInnerHTML={{ __html: displayHeadline }}
        />
        <p className="font-inter text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed md:text-xl text-center">
          {displayTagline}
        </p>
        <div className="flex justify-center items-center">
          <Button onClick={() => scrollToSection('trials')} size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
            {displayButton}
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer flex justify-center items-center" onClick={() => scrollToSection('trials')}>
        <ArrowDown className="w-6 h-6 text-white" />
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 justify-center items-center">
        {displayImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />)}
      </div>
    </section>
  );
};
export default HeroSection;