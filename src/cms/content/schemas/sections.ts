import { z } from 'zod'

export const SectionHeader = z.object({ title: z.string(), subtitle: z.string().optional() })

export const AboutUsSectionSchema = z.object({
  header: SectionHeader,
  storyTitle: z.string(),
  storyParagraphs: z.array(z.string())
})
export type AboutUsSection = z.infer<typeof AboutUsSectionSchema>

export const ProgrammesSectionSchema = z.object({
  header: SectionHeader,
  programmes: z.array(z.object({
    id: z.string(),
    title: z.string(),
    image: z.union([z.string(), z.instanceof(File)]),
    description: z.string()
  })).default([]),
  examinations: z.array(z.object({
    id: z.string(),
    title: z.string(),
    images: z.array(z.union([z.string(), z.instanceof(File)])).default([]),
    summary: z.string(),
    bullets: z.array(z.string()).default([])
  })).default([])
})
export type ProgrammesSection = z.infer<typeof ProgrammesSectionSchema>

export const EventsSectionSchema = z.object({ 
  header: SectionHeader,
  pastEvents: z.array(z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    images: z.array(z.union([z.string(), z.instanceof(File)])).default([])
  })).default([]),
  upcomingEvents: z.array(z.object({
    title: z.string(),
    date: z.string(),
    description: z.string()
  })).default([])
})
export type EventsSection = z.infer<typeof EventsSectionSchema>

export const GallerySectionSchema = z.object({ 
  header: SectionHeader,
  items: z.array(z.object({
    image: z.union([z.string(), z.instanceof(File)]),
    title: z.string()
  })).default([])
})
export type GallerySection = z.infer<typeof GallerySectionSchema>

export const AchievementsSectionSchema = z.object({
  header: SectionHeader,
  competitions: z.array(z.object({
    icon: z.enum(['trophy','medal','award','star','calendar','users']).optional(),
    title: z.string(),
    results: z.array(z.object({
      name: z.string(),
      placement: z.string(),
      category: z.string().optional()
    }))
  })).default([])
})
export type AchievementsSection = z.infer<typeof AchievementsSectionSchema>

export const ReviewsSectionSchema = z.object({ 
  header: SectionHeader,
  reviews: z.array(z.object({
    name: z.string(),
    role: z.string(),
    content: z.string(),
    rating: z.number().min(1).max(5)
  })).default([])
})
export type ReviewsSection = z.infer<typeof ReviewsSectionSchema>

export const TeachersSectionSchema = z.object({ 
  header: SectionHeader,
  teachers: z.array(z.object({
    name: z.string(),
    specialty: z.string(),
    credentials: z.string(),
    experience: z.string(),
    image: z.union([z.string(), z.instanceof(File)]),
    isFounder: z.boolean().optional()
  })).default([])
})
export type TeachersSection = z.infer<typeof TeachersSectionSchema>

export const LocationsSectionSchema = z.object({ 
  header: SectionHeader,
  locations: z.array(z.object({
    name: z.string(),
    image: z.union([z.string(), z.instanceof(File)]),
    addressLines: z.array(z.string()).default([]),
    phoneDisplay: z.string(),
    phoneHref: z.string(),
    mapUrl: z.string()
  })).default([])
})
export type LocationsSection = z.infer<typeof LocationsSectionSchema>

export const ClassSchedulesSectionSchema = z.object({
  header: SectionHeader,
  locations: z.array(z.object({ location: z.string(), address: z.string(), pdfUrl: z.string().optional() }))
})
export type ClassSchedulesSection = z.infer<typeof ClassSchedulesSectionSchema>

export const StatisticsSectionSchema = z.object({
  stats: z.array(z.object({
    number: z.string(),
    label: z.string(),
    colorHex: z.string().optional(),
    bgHex: z.string().optional()
  })).default([])
})
export type StatisticsSection = z.infer<typeof StatisticsSectionSchema>

export const CompetitionExcellenceSectionSchema = z.object({
  header: SectionHeader,
  solo: z.object({
    title: z.string(),
    images: z.array(z.union([z.string(), z.instanceof(File)])).default([]),
    paragraphs: z.array(z.string()).default([])
  }),
  groups: z.object({
    title: z.string(),
    images: z.array(z.union([z.string(), z.instanceof(File)])).default([]),
    paragraphs: z.array(z.string()).default([]),
    note: z.string().optional()
  })
})
export type CompetitionExcellenceSection = z.infer<typeof CompetitionExcellenceSectionSchema>


