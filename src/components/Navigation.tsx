
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderFooterSettings } from "@/lib/graphql";

// Default data fallback
const DEFAULT_NAVIGATION_DATA = {
  navigation: {
    logo: {
      node: {
        mediaItemUrl: "/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png",
        altText: "The Academy of Dance"
      }
    },
    navigationItems: [
      { label: "Home", sectionId: "hero" },
      { label: "Trials", sectionId: "trials" },
      { label: "About Us", sectionId: "about" },
      { label: "Programmes", sectionId: "programmes" },
      { label: "Reviews", sectionId: "reviews" },
      { label: "Teachers", sectionId: "teachers" },
      { label: "Gallery", sectionId: "gallery" },
      { label: "Blog", sectionId: "blog", isExternal: true, externalUrl: "/blog" }
    ],
    bookNowButton: {
      label: "Book Now!",
      sectionId: "trials"
    }
  }
};

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
  data?: HeaderFooterSettings;
}

const Navigation = ({ scrollToSection, data }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Use data from props or fallback to default data
  const navigationData = data?.navigation || DEFAULT_NAVIGATION_DATA.navigation;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (sectionId: string, isExternal?: boolean, externalUrl?: string) => {
    if (isExternal && externalUrl) {
      window.open(externalUrl, '_blank');
      return;
    }
    
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const handleMobileNavClick = (sectionId: string, isExternal?: boolean, externalUrl?: string) => {
    handleNavigation(sectionId, isExternal, externalUrl);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={navigationData.logo.node.mediaItemUrl} 
                alt={navigationData.logo.node.altText || "The Academy of Dance"} 
                className="h-8 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navigationData.navigationItems.map((item, index) => (
              item.isExternal ? (
                <button 
                  key={index}
                  onClick={() => handleNavigation(item.sectionId, item.isExternal, item.externalUrl)} 
                  className="text-white hover:text-secondary transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <button 
                  key={index}
                  onClick={() => handleNavigation(item.sectionId)} 
                  className="text-white hover:text-secondary transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
          
          {/* Desktop Book Now Button */}
          <Button onClick={() => handleNavigation(navigationData.bookNowButton.sectionId)} className="hidden md:block bg-primary hover:bg-primary/90 text-white">
            {navigationData.bookNowButton.label}
          </Button>
          
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
              {navigationData.navigationItems.map((item, index) => (
                item.isExternal ? (
                  <button 
                    key={index}
                    onClick={() => handleMobileNavClick(item.sectionId, item.isExternal, item.externalUrl)} 
                    className="text-white hover:text-secondary transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <button 
                    key={index}
                    onClick={() => handleMobileNavClick(item.sectionId)} 
                    className="text-white hover:text-secondary transition-colors text-left"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
