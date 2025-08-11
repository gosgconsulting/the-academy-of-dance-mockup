
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/cms/usePageContent";
import { headerDefaults, type HeaderContent } from "@/cms/content/schemas/layout";
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
  const { data } = usePageContent<HeaderContent>('header', headerDefaults)

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
                src={data.logoSrc}
                alt="The Academy of Dance" 
                className="h-8 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {data.links.map(link => link.href ? (
              <Link key={link.label} to={link.href} className="text-white hover:text-secondary transition-colors">{link.label}</Link>
            ) : (
              <button key={link.label} onClick={() => handleNavigation(link.sectionId || 'hero')} className="text-white hover:text-secondary transition-colors">{link.label}</button>
            ))}
          </div>
          
          {/* Desktop Book Now Button */}
          <Button onClick={() => data.primaryCta.href ? navigate(data.primaryCta.href) : handleNavigation(data.primaryCta.sectionId || 'trials')} className="hidden md:block bg-primary hover:bg-primary/90 text-white">{data.primaryCta.label}</Button>
          
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
              {data.links.map(link => link.href ? (
                <Link key={link.label} to={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-secondary transition-colors text-left">{link.label}</Link>
              ) : (
                <button key={link.label} onClick={() => handleMobileNavClick(link.sectionId || 'hero')} className="text-white hover:text-secondary transition-colors text-left">{link.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
