import { Button } from '@/components/ui/button';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  backgroundImage?: string;
  onCtaClick?: () => void;
}

const Hero = ({ 
  title = "Elite Dance Academy",
  subtitle = "Where Passion Meets Excellence", 
  description = "Join Singapore's premier dance academy and discover your potential through our comprehensive training programs.",
  ctaText = "Start Your Journey",
  backgroundImage,
  onCtaClick
}: HeroProps) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      )}
      {backgroundImage && <div className="absolute inset-0 bg-black/50" />}
      
      <div className="relative z-10 text-center px-6 animate-fade-up flex flex-col items-center">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-center">
          {title}
          <span className="text-secondary block text-center">
            {subtitle}
          </span>
        </h1>
        
        <p className="font-inter text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed md:text-xl text-center">
          {description}
        </p>
        
        <div className="flex justify-center items-center">
          <Button 
            onClick={onCtaClick}
            className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
