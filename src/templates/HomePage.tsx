// WordPress-ready homepage template structure
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Import content data that will become WordPress customizer options
import { siteConfig, heroContent, navigationMenu } from "../../wordpress-conversion/content-data";

// Components that will become WordPress template parts
import WhatsAppChat from "@/components/WhatsAppChat";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrialsSection from "@/components/TrialsSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProgrammesAndExamsSection from "@/components/sections/ProgrammesAndExamsSection";
import GallerySection from "@/components/sections/GallerySection";
import CompetitionExcellenceSection from "@/components/sections/CompetitionExcellenceSection";
import EventsSection from "@/components/sections/EventsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TeachersSection from "@/components/sections/TeachersSection";
import LocationsSection from "@/components/sections/LocationsSection";
import StatisticsSection from "@/components/sections/StatisticsSection";

/**
 * HomePage Template Component
 * 
 * This structure maps directly to WordPress template hierarchy:
 * - This component → index.php
 * - Each section component → template-parts/sections/
 * - Navigation/Footer → header.php/footer.php
 * 
 * Content data is imported from content-data.ts which will become:
 * - WordPress Customizer options
 * - ACF field groups
 * - Theme options
 */
const HomePage = () => {
  const [isWhatsAppChatOpen, setIsWhatsAppChatOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Handle navigation from other pages with scroll target
  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        scrollToSection(location.state.scrollTo);
        // Clear the state to prevent re-scrolling on future renders
        window.history.replaceState({}, document.title);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - becomes header.php */}
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Main Content - becomes WordPress loop in index.php */}
      <main>
        {/* Hero Section - template-parts/hero-section.php */}
        <HeroSection scrollToSection={scrollToSection} />
        
        {/* Content Sections - template-parts/sections/ */}
        <TrialsSection />
        <AboutUsSection />
        <VisionMissionSection />
        <StatisticsSection />
        <ProgrammesAndExamsSection />
        <CompetitionExcellenceSection />
        <EventsSection />
        <AchievementsSection />
        <TeachersSection />
        <ReviewsSection />
        <LocationsSection />
        <GallerySection />
      </main>
      
      {/* Footer - becomes footer.php */}
      <Footer />
      
      {/* Interactive Elements - converted to vanilla JS/Alpine.js */}
      <WhatsAppButton onClick={() => setIsWhatsAppChatOpen(!isWhatsAppChatOpen)} />
      <WhatsAppChat
        isOpen={isWhatsAppChatOpen}
        onClose={() => setIsWhatsAppChatOpen(false)}
      />
    </div>
  );
};

export default HomePage;