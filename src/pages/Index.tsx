
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const Index = () => {
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
    <div className="min-h-screen bg-white">
      {/* Header - Not editable with Sparti */}
      <header data-sparti-ignore="true" className="sparti-no-edit">
        <Navigation scrollToSection={scrollToSection} />
      </header>

      {/* Main Content - Sparti Editable Sections */}
      <main id="main-content" className="sparti-content">
        {/* Hero Section */}
        <section id="hero-section" data-section-type="hero" className="sparti-section">
          <HeroSection scrollToSection={scrollToSection} />
        </section>

        {/* Trials Section */}
        <section id="trials-section" data-section-type="trials" className="sparti-section">
          <TrialsSection />
        </section>

        {/* About Us Section */}
        <section id="about-section" data-section-type="about" className="sparti-section">
          <AboutUsSection />
        </section>

        {/* Vision Mission Section */}
        <section id="vision-mission-section" data-section-type="vision-mission" className="sparti-section">
          <VisionMissionSection />
        </section>

        {/* Programmes Section */}
        <section id="programmes-section" data-section-type="programmes" className="sparti-section">
          <ProgrammesAndExamsSection />
        </section>

        {/* Competition Excellence Section */}
        <section id="competition-section" data-section-type="competition" className="sparti-section">
          <CompetitionExcellenceSection />
        </section>

        {/* Events Section */}
        <section id="events-section" data-section-type="events" className="sparti-section">
          <EventsSection />
        </section>

        {/* Achievements Section */}
        <section id="achievements-section" data-section-type="achievements" className="sparti-section">
          <AchievementsSection />
        </section>

        {/* Teachers Section */}
        <section id="teachers-section" data-section-type="teachers" className="sparti-section">
          <TeachersSection />
        </section>

        {/* Reviews Section */}
        <section id="reviews-section" data-section-type="reviews" className="sparti-section">
          <ReviewsSection />
        </section>

        {/* Locations Section */}
        <section id="locations-section" data-section-type="locations" className="sparti-section">
          <LocationsSection />
        </section>

        {/* Gallery Section */}
        <section id="gallery-section" data-section-type="gallery" className="sparti-section">
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
  );
};

export default Index;
