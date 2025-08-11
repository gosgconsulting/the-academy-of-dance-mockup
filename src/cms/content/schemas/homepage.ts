import { z } from 'zod'

export const HomepageContent = z.object({
  hero: z.object({
    images: z.array(z.union([z.string(), z.instanceof(File)])).default([]),
    title: z.string(),
    subtitle: z.string(),
    ctaText: z.string().default('Start Your Journey')
  }),
  sections: z.object({
    trials: z.object({
      title: z.string(),
      subtitle: z.string(),
      joinTitle: z.string(),
      contactName: z.string(),
      contactPhone: z.string(),
      bookButtonText: z.string().default('Book Now!')
    }),
    about: z.object({
      title: z.string(),
      storyTitle: z.string(),
      storyParagraphs: z.array(z.string())
    }),
    visionMission: z.object({
      vision: z.string(),
      mission: z.string(),
      tagline: z.string()
    }),
    programmes: z.object({ title: z.string(), subtitle: z.string() }),
    events: z.object({ title: z.string(), subtitle: z.string() }),
    gallery: z.object({ title: z.string(), subtitle: z.string() }),
    achievements: z.object({ title: z.string(), subtitle: z.string() }),
    reviews: z.object({ title: z.string(), subtitle: z.string() }),
    teachers: z.object({ title: z.string(), subtitle: z.string() }),
    locations: z.object({ title: z.string(), subtitle: z.string() })
  })
})

export type HomepageContent = z.infer<typeof HomepageContent>

export const homepageDefaults: HomepageContent = {
  hero: {
    images: [
      '/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png',
      '/lovable-uploads/fafdb3ad-f058-4c32-9065-7d540d362cd7.png',
      '/lovable-uploads/0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png',
      '/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png',
      '/lovable-uploads/21352692-5e60-425a-9355-ba3fc13af268.png'
    ],
    title: 'Where Dreams\nTake Flight',
    subtitle: 'Singapore’s premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.',
    ctaText: 'Start Your Journey'
  },
  sections: {
    trials: {
      title: 'Begin Your Dance Journey',
      subtitle: 'Jump into dance with a $20 trial class! Experience top-tier instruction and find your perfect style.',
      joinTitle: 'Join Our Trial Classes',
      contactName: 'Ms June Lee',
      contactPhone: '(65) 9837 2670',
      bookButtonText: 'Book Now!'
    },
    about: {
      title: 'About Us',
      storyTitle: 'Our Story',
      storyParagraphs: [
        'At The Academy of Dance (TAD), we merge passion with precision. Our tagline, "Our insatiable passion for dance," truly encapsulates the spirit of TAD. Dance is not just an art form for us; it is our passion. At TAD, we believe that dance transcends mere movements and steps. It is a profound expression of the soul and a vital journey of self-discovery and improvement. Established in 2019, TAD has since emerged as one of the most renowned dance schools in Singapore.',
        'What distinguishes us is our devoted team of teachers who not only have extensive experience in their respective genres but also possess a profound passion for sharing the love of dance and providing a comprehensive education for dancers.',
        'At TAD, our teachers foster an encouraging environment for everyone, from beginners taking their first steps to seasoned dancers gracing the stage. We prioritize our students\' progress to ensure every dancer achieves their fullest potential. Whether your aim is to pursue a professional dance career, maintain fitness, or simply enjoy moving to the rhythm, we are here to support you in reaching your goals.'
      ]
    },
    visionMission: {
      vision: 'To nurture dancers with passion and compassion',
      mission: 'To create a conducive, wholesome, enriching and loving environment to inspire and groom passionate dancers to be the best that they can be and to challenge themselves to be better people',
      tagline: 'Our insatiable passion for dance'
    },
    programmes: {
      title: 'Programmes & Examinations',
      subtitle: 'Discover our comprehensive dance programmes and internationally recognized examination courses designed to nurture artistry and technical excellence.'
    },
    events: {
      title: 'Our Events',
      subtitle: 'Join us for exciting performances, competitions, and workshops throughout the year.'
    },
    gallery: {
      title: 'Our Students Shine',
      subtitle: 'Witness the artistry, passion, and technical excellence of our dancers across all disciplines.'
    },
    achievements: {
      title: 'Our Dance Competition Achievements',
      subtitle: 'Celebrating our students\' excellence and remarkable success in prestigious dance competitions across Asia.'
    },
    reviews: {
      title: 'What Parents Say',
      subtitle: 'Discover why families trust us with their children\'s dance education and artistic development.'
    },
    teachers: {
      title: 'Our Instructors',
      subtitle: 'Learn from internationally trained professionals who bring decades of experience and genuine passion for dance education.'
    },
    locations: {
      title: 'Our Locations',
      subtitle: 'Visit us at our convenient locations across Singapore for world-class dance education.'
    }
  }
}

