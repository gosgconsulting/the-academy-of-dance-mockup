import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeroData } from "@/hooks/useHeroData";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}
const HeroSection = ({
  scrollToSection
}: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Fetch hero data from WordPress GraphQL API
  const { data: heroData, isLoading, error } = useHeroData();
  
  // Extract data from GraphQL response (with fallback for useEffect)
  const heroImages = heroData?.pageBy?.homePageHero?.heroImages?.nodes?.map(img => img.mediaItemUrl) || [];
  const heroHeadline = heroData?.pageBy?.homePageHero?.heroHeadline || "";
  const heroTagline = heroData?.pageBy?.homePageHero?.heroTagline || "";
  const heroButton = heroData?.pageBy?.homePageHero?.heroButton || "";
  
  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);
  
  // Don't render anything until we have data or there's an error
  if (isLoading) {
    return null;
  }
  
  // If there's an error or no data, don't render anything
  if (error || !heroData?.pageBy?.homePageHero) {
    return null;
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image} alt={`Dance performance ${index + 1}`} className="w-full h-full object-cover" />
          </div>)}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 animate-fade-up flex flex-col items-center">
        <h1 
          className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-center"
          dangerouslySetInnerHTML={{ __html: heroHeadline }}
        />
        <p className="font-inter text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed md:text-xl text-center">
          {heroTagline}
        </p>
        <div className="flex justify-center items-center">
          <Button onClick={() => scrollToSection('trials')} size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
            {heroButton}
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer flex justify-center items-center" onClick={() => scrollToSection('trials')}>
        <ArrowDown className="w-6 h-6 text-white" />
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 justify-center items-center">
        {heroImages.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />)}
      </div>
    </section>
  );
};
export default HeroSection;