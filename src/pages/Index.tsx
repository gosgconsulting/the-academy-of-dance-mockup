
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SpartiCMSWrapper } from "sparti-builder";
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
import { ContentLoader } from "@/components/ContentLoader";
import { useContentLoader } from "@/hooks/useContentLoader";

const Index = () => {
  const [isWhatsAppChatOpen, setIsWhatsAppChatOpen] = useState(false);
  const location = useLocation();
  const { getSectionContent, isLoading, error } = useContentLoader('index');

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

  // Show loading state
  if (isLoading) {
    return <ContentLoader><div>Loading content...</div></ContentLoader>;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <SpartiCMSWrapper>
      <div className="min-h-screen bg-white">
        {/* Header - Not editable with Sparti */}
        <header data-sparti-ignore="true" className="sparti-no-edit">
          <Navigation scrollToSection={scrollToSection} />
        </header>

        {/* Main Content - Sparti Editable Sections */}
        <main className="sparti-content">
          {/* Hero Section */}
          <section data-sparti-section="hero" data-sparti-editable="true" className="sparti-section">
            <HeroSection scrollToSection={scrollToSection} />
          </section>

          {/* Trials Section */}
          <section data-sparti-section="trials" data-sparti-editable="true" className="sparti-section">
            <TrialsSection />
          </section>

          {/* About Us Section */}
          <section data-sparti-section="about" data-sparti-editable="true" className="sparti-section">
            <AboutUsSection />
          </section>

          {/* Vision Mission Section */}
          <section data-sparti-section="vision-mission" data-sparti-editable="true" className="sparti-section">
            <VisionMissionSection />
          </section>

          {/* Programmes Section */}
          <section data-sparti-section="programmes" data-sparti-editable="true" className="sparti-section">
            <ProgrammesAndExamsSection />
          </section>

          {/* Competition Excellence Section */}
          <section data-sparti-section="competition" data-sparti-editable="true" className="sparti-section">
            <CompetitionExcellenceSection />
          </section>

          {/* Events Section */}
          <section data-sparti-section="events" data-sparti-editable="true" className="sparti-section">
            <EventsSection />
          </section>

          {/* Achievements Section */}
          <section data-sparti-section="achievements" data-sparti-editable="true" className="sparti-section">
            <AchievementsSection />
          </section>

          {/* Teachers Section */}
          <section data-sparti-section="teachers" data-sparti-editable="true" className="sparti-section">
            <TeachersSection />
          </section>

          {/* Reviews Section */}
          <section data-sparti-section="reviews" data-sparti-editable="true" className="sparti-section">
            <ReviewsSection />
          </section>

          {/* Locations Section */}
          <section data-sparti-section="locations" data-sparti-editable="true" className="sparti-section">
            <LocationsSection />
          </section>

          {/* Gallery Section */}
          <section data-sparti-section="gallery" data-sparti-editable="true" className="sparti-section">
            <GallerySection />
          </section>
        </main>

        {/* Footer - Not editable with Sparti */}
        <footer data-sparti-ignore="true" className="sparti-no-edit">
          <Footer />
        </footer>

        {/* Fixed UI Elements - Not editable */}
        <div data-sparti-ignore="true" className="sparti-no-edit">
          <WhatsAppButton onClick={() => setIsWhatsAppChatOpen(!isWhatsAppChatOpen)} />
          <WhatsAppChat
            isOpen={isWhatsAppChatOpen}
            onClose={() => setIsWhatsAppChatOpen(false)}
          />
        </div>
      </div>
    </SpartiCMSWrapper>
  );
};

export default Index;
