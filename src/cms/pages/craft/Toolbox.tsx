import React from 'react'
import { Element, useEditor } from '@craftjs/core'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { homepageDefaults } from '@/cms/content/schemas/homepage'
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
import { Container, Text, UIButton, UIInput, UITextarea, UIBadge, UISeparator, UICheckbox, UISwitch, UISlider, UISelect, UICard } from './utils.tsx'

export default function Toolbox() {
  const { connectors } = useEditor()

  const toNode = (node: React.ReactElement) => node

  const groups: Array<{ title: string; items: Array<{ name: string; node: React.ReactElement }> }> = [
    {
      title: 'Layout',
      items: [
        { name: 'Container', node: <Element is={Container} canvas /> },
        { name: 'UICard', node: <Element is={UICard as any} canvas /> },
      ],
    },
    {
      title: 'UI',
      items: [
        { name: 'Text', node: <Text text="New text" /> },
        { name: 'UIButton', node: <UIButton label="Button" /> },
        { name: 'UIInput', node: <UIInput placeholder="Placeholder" /> },
        { name: 'UITextarea', node: <UITextarea placeholder="Write here" /> },
        { name: 'UIBadge', node: <UIBadge /> },
        { name: 'UISeparator', node: <UISeparator /> },
        { name: 'UICheckbox', node: <UICheckbox /> },
        { name: 'UISwitch', node: <UISwitch /> },
        { name: 'UISlider', node: <UISlider /> },
        { name: 'UISelect', node: <UISelect /> },
      ],
    },
    {
      title: 'Site',
      items: [
        { name: 'Navigation', node: <Navigation scrollToSection={() => {}} /> },
        { name: 'Footer', node: <Footer /> },
        { name: 'WhatsAppButton', node: <WhatsAppButton onClick={() => {}} /> },
        { name: 'WhatsAppChat', node: <WhatsAppChat isOpen onClose={() => {}} /> },
      ],
    },
    {
      title: 'Sections',
      items: [
        { name: 'HeroSection', node: (
          <HeroSection
            scrollToSection={() => {}}
            images={homepageDefaults.hero.images as string[]}
            title={homepageDefaults.hero.title}
            subtitle={homepageDefaults.hero.subtitle}
            ctaText={homepageDefaults.hero.ctaText}
          />
        ) },
        { name: 'TrialsSection', node: <TrialsSection {...(homepageDefaults.sections.trials as any)} /> },
        { name: 'AboutUsSection', node: <AboutUsSection data={homepageDefaults.sections.about as any} /> },
        { name: 'VisionMissionSection', node: <VisionMissionSection {...(homepageDefaults.sections.visionMission as any)} /> },
        { name: 'ProgrammesAndExamsSection', node: <ProgrammesAndExamsSection data={homepageDefaults.sections.programmes as any} /> },
        { name: 'CompetitionExcellenceSection', node: <CompetitionExcellenceSection data={homepageDefaults.sections.competitionExcellence as any} /> },
        { name: 'EventsSection', node: <EventsSection data={homepageDefaults.sections.events as any} /> },
        { name: 'AchievementsSection', node: <AchievementsSection data={homepageDefaults.sections.achievements as any} /> },
        { name: 'TeachersSection', node: <TeachersSection data={homepageDefaults.sections.teachers as any} /> },
        { name: 'ReviewsSection', node: <ReviewsSection data={homepageDefaults.sections.reviews as any} /> },
        { name: 'LocationsSection', node: <LocationsSection data={homepageDefaults.sections.locations as any} /> },
        { name: 'GallerySection', node: <GallerySection data={homepageDefaults.sections.gallery as any} /> },
        { name: 'ClassSchedulesSection', node: <ClassSchedulesSection data={{ header: { title: 'Class Schedules' }, locations: [] } as any} /> },
        { name: 'StatisticsSection', node: <StatisticsSection data={{ stats: [] }} /> },
      ],
    },
    {
      title: 'Cards & Misc',
      items: [
        { name: 'EventCard', node: <EventCard title="Title" subtitle="Subtitle" description="Description" images={["https://picsum.photos/800/400"]} /> },
        { name: 'TikTokIcon', node: <TikTokIcon /> },
      ],
    },
  ]

  return (
    <div className="p-3">
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Toolbox</div>
      <Accordion type="multiple" defaultValue={[groups[0].title, groups[1].title]} className="space-y-2">
        {groups.map((group) => (
          <AccordionItem key={group.title} value={group.title}>
            <AccordionTrigger className="px-2 text-sm">{group.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {group.items.map((it) => (
                  <div
                    key={it.name}
                    ref={(ref) => ref && connectors.create(ref, toNode(it.node))}
                    className="px-3 py-1 border rounded cursor-move bg-white hover:bg-gray-50"
                  >
                    {it.name}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}


