
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
import { usePageContent } from "@/cms/usePageContent";
import { homepageDefaults, type HomepageContent } from "@/cms/content/schemas/homepage";

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
      <Navigation scrollToSection={scrollToSection} />
      {(() => {
        const { data } = usePageContent<HomepageContent>('homepage', homepageDefaults)
        return (
          <>
            <HeroSection
              scrollToSection={scrollToSection}
              images={data.hero.images.map(img => typeof img === 'string' ? img : '')}
              title={data.hero.title}
              subtitle={data.hero.subtitle}
              ctaText={data.hero.ctaText}
            />
            <TrialsSection
              title={data.sections.trials.title}
              subtitle={data.sections.trials.subtitle}
              joinTitle={data.sections.trials.joinTitle}
              contactName={data.sections.trials.contactName}
              contactPhone={data.sections.trials.contactPhone}
              bookButtonText={data.sections.trials.bookButtonText}
            />
            <AboutUsSection data={data.sections.about} />
            <VisionMissionSection
              vision={data.sections.visionMission.vision}
              mission={data.sections.visionMission.mission}
              tagline={data.sections.visionMission.tagline}
            />
            <ProgrammesAndExamsSection data={data.sections.programmes} />
            <CompetitionExcellenceSection data={data.sections.competitionExcellence} />
            <EventsSection data={data.sections.events} />
            <AchievementsSection data={data.sections.achievements} />
            <TeachersSection data={data.sections.teachers} />
            <ReviewsSection data={data.sections.reviews} />
            <LocationsSection data={data.sections.locations} />
            <GallerySection data={data.sections.gallery} />
          </>
        )
      })()}
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
