
import { useState, useEffect } from "react";
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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // If needed, handle deep-link section scrolls via URL hash on mount
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const timer = setTimeout(() => scrollToSection(id), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <TrialsSection />
      <AboutUsSection />
      <VisionMissionSection />
      <ProgrammesAndExamsSection />
      <CompetitionExcellenceSection />
      <EventsSection />
      <AchievementsSection />
      <TeachersSection />
      <ReviewsSection />
      <LocationsSection />
      <GallerySection />
      <Footer />
      <WhatsAppButton onClick={() => setIsWhatsAppChatOpen(!isWhatsAppChatOpen)} />
      <WhatsAppChat
        isOpen={isWhatsAppChatOpen}
        onClose={() => setIsWhatsAppChatOpen(false)}
      />
    </div>
  );
};

export default Index;

