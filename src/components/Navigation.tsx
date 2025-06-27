
import { Button } from "@/components/ui/button";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  return (
    <nav className="fixed top-0 w-full bg-black backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png" 
              alt="The Academy of Dance" 
              className="h-8 md:h-12 w-auto object-contain" 
            />
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
  );
};

export default Navigation;
