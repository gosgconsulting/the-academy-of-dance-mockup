import React from 'react'
import { Editor as CraftEditorCore, Frame, Element } from '@craftjs/core'
import HeroSection from '@/components/HeroSection'
import TrialsSection from '@/components/TrialsSection'
import AboutUsSection from '@/components/sections/AboutUsSection'
import VisionMissionSection from '@/components/VisionMissionSection'
import EventCard from '@/components/EventCard'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import TikTokIcon from '@/components/TikTokIcon'
import WhatsAppButton from '@/components/WhatsAppButton'
import WhatsAppChat from '@/components/WhatsAppChat'
import AchievementsSection from '@/components/sections/AchievementsSection'
import ClassSchedulesSection from '@/components/sections/ClassSchedulesSection'
import CompetitionExcellenceSection from '@/components/sections/CompetitionExcellenceSection'
import EventsSection from '@/components/sections/EventsSection'
import GallerySection from '@/components/sections/GallerySection'
import LocationsSection from '@/components/sections/LocationsSection'
import ProgrammesAndExamsSection from '@/components/sections/ProgrammesAndExamsSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import StatisticsSection from '@/components/sections/StatisticsSection'
import TeachersSection from '@/components/sections/TeachersSection'
import OutlinePanel from './OutlinePanel'
import SettingsPanel from './SettingsPanel'
import Toolbox from './Toolbox'
import { Container, Text, Button, UIButton, UIInput, UITextarea, UICard, UIBadge, UISeparator, UICheckbox, UISwitch, UISlider, UISelect, setDisplayName } from './utils.tsx'

setDisplayName(HeroSection, 'HeroSection')
setDisplayName(TrialsSection, 'TrialsSection')
setDisplayName(AboutUsSection, 'AboutUsSection')
setDisplayName(VisionMissionSection, 'VisionMissionSection')
setDisplayName(EventCard, 'EventCard')
setDisplayName(Footer, 'Footer')
setDisplayName(Navigation, 'Navigation')
setDisplayName(TikTokIcon, 'TikTokIcon')
setDisplayName(WhatsAppButton, 'WhatsAppButton')
setDisplayName(WhatsAppChat, 'WhatsAppChat')
setDisplayName(AchievementsSection, 'AchievementsSection')
setDisplayName(ClassSchedulesSection, 'ClassSchedulesSection')
setDisplayName(CompetitionExcellenceSection, 'CompetitionExcellenceSection')
setDisplayName(EventsSection, 'EventsSection')
setDisplayName(GallerySection, 'GallerySection')
setDisplayName(LocationsSection, 'LocationsSection')
setDisplayName(ProgrammesAndExamsSection, 'ProgrammesAndExamsSection')
setDisplayName(ReviewsSection, 'ReviewsSection')
setDisplayName(StatisticsSection, 'StatisticsSection')
setDisplayName(TeachersSection, 'TeachersSection')

export default function Editor() {
  return (
    <div className="min-h-screen">
      <CraftEditorCore resolver={{
        Container,
        Text,
        Button,
        UIButton,
        UIInput,
        UITextarea,
        UICard,
        UIBadge,
        UISeparator,
        UICheckbox,
        UISwitch,
        UISlider,
        UISelect,
        HeroSection,
        TrialsSection,
        AboutUsSection,
        VisionMissionSection,
        EventCard,
        Footer,
        Navigation,
        TikTokIcon,
        WhatsAppButton,
        WhatsAppChat,
        AchievementsSection,
        ClassSchedulesSection,
        CompetitionExcellenceSection,
        EventsSection,
        GallerySection,
        LocationsSection,
        ProgrammesAndExamsSection,
        ReviewsSection,
        StatisticsSection,
        TeachersSection,
      }}>
        <div className="grid grid-cols-12">
          <div className="col-span-2 border-r bg-gray-50 sticky top-0 h-screen overflow-auto">
            <OutlinePanel />
            <div className="h-px bg-gray-200 my-2" />
            <Toolbox />
          </div>
          <div className="col-span-8 p-4">
            <Frame>
              <Element is={Container} canvas />
            </Frame>
          </div>
          <div className="col-span-2 border-l bg-gray-50 sticky top-0 h-screen overflow-auto">
            <SettingsPanel />
          </div>
        </div>
      </CraftEditorCore>
    </div>
  )
}


