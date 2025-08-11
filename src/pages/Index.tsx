
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
              images={data.hero.images}
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
            <AboutUsSection
              title={data.sections.about.title}
              storyTitle={data.sections.about.storyTitle}
              storyParagraphs={data.sections.about.storyParagraphs}
            />
            <VisionMissionSection
              vision={data.sections.visionMission.vision}
              mission={data.sections.visionMission.mission}
              tagline={data.sections.visionMission.tagline}
            />
            <ProgrammesAndExamsSection
              title={data.sections.programmes.title}
              subtitle={data.sections.programmes.subtitle}
            />
            <CompetitionExcellenceSection
              title="Our Competition Classes"
              subtitle="Our elite competition team classes are designed to prepare dancers for high-level performance opportunities at regional and national competitions. We offer both solo and group competition classes, tailored to suit individual goals and team development."
            />
            <EventsSection
              title={data.sections.events.title}
              subtitle={data.sections.events.subtitle}
            />
            <AchievementsSection
              title={data.sections.achievements.title}
              subtitle={data.sections.achievements.subtitle}
            />
            <TeachersSection
              title={data.sections.teachers.title}
              subtitle={data.sections.teachers.subtitle}
            />
            <ReviewsSection
              title={data.sections.reviews.title}
              subtitle={data.sections.reviews.subtitle}
            />
            <LocationsSection
              title={data.sections.locations.title}
              subtitle={data.sections.locations.subtitle}
            />
            <GallerySection
              title={data.sections.gallery.title}
              subtitle={data.sections.gallery.subtitle}
            />
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
