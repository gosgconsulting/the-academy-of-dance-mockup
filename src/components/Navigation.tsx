
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const handleMobileNavClick = (sectionId: string) => {
    handleNavigation(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                data-key="nav.logo"
                src="/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png" 
                alt="The Academy of Dance" 
                className="h-8 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => handleNavigation('hero')} className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.home">Home</span></button>
            <button onClick={() => handleNavigation('trials')} className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.trials">Trials</span></button>
            <button onClick={() => handleNavigation('about')} className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.about">About Us</span></button>
            <button onClick={() => handleNavigation('programmes')} className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.programmes">Programmes</span></button>
            <button onClick={() => handleNavigation('reviews')} className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.reviews">Reviews</span></button>
            <button onClick={() => handleNavigation('teachers')} className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.teachers">Teachers</span></button>
            <button onClick={() => handleNavigation('gallery')} className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.gallery">Gallery</span></button>
            <Link to="/blog" className="text-white hover:text-secondary transition-colors"><span data-key="nav.menu.blog">Blog</span></Link>
          </div>
          
          {/* Desktop Book Now Button */}
          <Button onClick={() => handleNavigation('trials')} className="hidden md:block bg-primary hover:bg-primary/90 text-white"><span data-key="nav.cta">Book Now!</span></Button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button onClick={() => handleMobileNavClick('hero')} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.home">Home</span></button>
              <button onClick={() => handleMobileNavClick('trials')} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.trials">Trials</span></button>
              <button onClick={() => handleMobileNavClick('about')} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.about">About Us</span></button>
              <button onClick={() => handleMobileNavClick('programmes')} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.programmes">Programmes</span></button>
              <button onClick={() => handleMobileNavClick('reviews')} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.reviews">Reviews</span></button>
              <button onClick={() => handleMobileNavClick('teachers')} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.teachers">Teachers</span></button>
              <button onClick={() => handleMobileNavClick('gallery')} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.gallery">Gallery</span></button>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-secondary transition-colors text-left"><span data-key="nav.menu.blog">Blog</span></Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
