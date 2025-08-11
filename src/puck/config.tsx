import type { Config } from '@measured/puck'
import '@measured/puck/puck.css'
import { PuckHeader } from './widgets/PuckHeader'
import { PuckHero } from './widgets/PuckHero'
import { PuckFooter } from './widgets/PuckFooter'
import { PuckTrials } from './widgets/PuckTrials'
import { PuckAbout } from './widgets/PuckAbout'
import { PuckVision } from './widgets/PuckVision'
import { PuckPrograms } from './widgets/PuckPrograms'
import { PuckCompetitions } from './widgets/PuckCompetitions'
import { PuckEvents } from './widgets/PuckEvents'
import { PuckAchievements } from './widgets/PuckAchievements'
import { PuckTeachers } from './widgets/PuckTeachers'
import { PuckReviews } from './widgets/PuckReviews'
import { PuckLocations } from './widgets/PuckLocations'
import { PuckGallery } from './widgets/PuckGallery'

// Define the editable props for each block
export type PuckBlocks = {
  Header: {
    logoSrc: string
    links: { label: string; href?: string }[]
    primaryCta: { label: string; href?: string }
  }
  Hero: {
    images: string[]
    title: string
    subtitle: string
    ctaText: string
  }
  Footer: {
    logoSrc: string
    tagline: string
    policyLinks: { label: string; href: string }[]
    copyright: string
  }
  Trials: {
    title: string
    subtitle: string
    joinTitle: string
    contactName: string
    contactPhone: string
    bookButtonText: string
  }
  About: { data: any }
  Vision: { vision: string; mission: string; tagline: string }
  Programs: { data: any }
  Competitions: { data: any }
  Events: { data: any }
  Achievements: { data: any }
  Teachers: { data: any }
  Reviews: { data: any }
  Locations: { data: any }
  Gallery: { data: any }
}

export const puckConfig: Config<PuckBlocks> = {
  components: {
    Header: {
      label: 'Header',
      fields: {
        logoSrc: { type: 'text' },
        links: {
          type: 'array',
          arrayFields: {
            label: { type: 'text' },
            href: { type: 'text' },
          },
          getItemSummary: (item) => (item?.label as string) || 'Link',
        },
        primaryCta: {
          type: 'object',
          objectFields: {
            label: { type: 'text' },
            href: { type: 'text' },
          },
        },
      },
      defaultProps: {
        logoSrc: '/favicon.ico',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '#programs' },
          { label: 'About', href: '#about' },
        ],
        primaryCta: { label: 'Book Trial', href: '#trial' },
      },
      render: PuckHeader,
    },

    Hero: {
      label: 'Hero',
      fields: {
        images: { type: 'array', arrayFields: { value: { type: 'text' } } },
        title: { type: 'textarea' },
        subtitle: { type: 'textarea' },
        ctaText: { type: 'text' },
      },
      defaultProps: {
        images: [
          '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png',
        ],
        title: 'The Academy of Dance',
        subtitle:
          'Learn ballet and dance with caring instructors. Classes for all ages and levels across our Singapore studios.',
        ctaText: 'Book Trial Class',
      },
      render: PuckHero,
    },

    Footer: {
      label: 'Footer',
      fields: {
        logoSrc: { type: 'text' },
        tagline: { type: 'textarea' },
        policyLinks: {
          type: 'array',
          arrayFields: {
            label: { type: 'text' },
            href: { type: 'text' },
          },
          getItemSummary: (item) => (item?.label as string) || 'Policy',
        },
        copyright: { type: 'text' },
      },
      defaultProps: {
        logoSrc: '/favicon.ico',
        tagline: 'A modern academy of dance',
        policyLinks: [
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Terms & Conditions', href: '/terms-conditions' },
        ],
        copyright: '© The Academy of Dance',
      },
      render: PuckFooter,
    },

    Trials: {
      label: 'Trials',
      fields: {
        title: { type: 'text' },
        subtitle: { type: 'textarea' },
        joinTitle: { type: 'text' },
        contactName: { type: 'text' },
        contactPhone: { type: 'text' },
        bookButtonText: { type: 'text' },
      },
      defaultProps: {
        title: 'Start Your Dance Journey',
        subtitle: 'Book a trial class today',
        joinTitle: 'Why Join Us',
        contactName: 'The Academy of Dance',
        contactPhone: '+65 9837 2670',
        bookButtonText: 'Book Trial Class',
      },
      render: PuckTrials,
    },

    About: {
      label: 'About Us',
      fields: {
        data: { type: 'json' },
      },
      defaultProps: { data: { header: { title: 'About Us' }, storyTitle: 'Our Story', storyParagraphs: [''] } },
      render: PuckAbout,
    },

    Vision: {
      label: 'Vision & Mission',
      fields: { vision: { type: 'textarea' }, mission: { type: 'textarea' }, tagline: { type: 'text' } },
      defaultProps: { vision: '', mission: '', tagline: '' },
      render: PuckVision,
    },

    Programs: {
      label: 'Programs',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Programs' }, programmes: [], examinations: [] } },
      render: PuckPrograms,
    },

    Competitions: {
      label: 'Competitions',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Competition Excellence' }, solo: { title: '', images: [], paragraphs: [] }, groups: { title: '', images: [], paragraphs: [] } } },
      render: PuckCompetitions,
    },

    Events: {
      label: 'Events',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Events' }, pastEvents: [], upcomingEvents: [] } },
      render: PuckEvents,
    },

    Achievements: {
      label: 'Achievements',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Achievements' }, competitions: [] } },
      render: PuckAchievements,
    },

    Teachers: {
      label: 'Teachers',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Teachers' }, teachers: [] } },
      render: PuckTeachers,
    },

    Reviews: {
      label: 'Reviews',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Reviews' }, reviews: [] } },
      render: PuckReviews,
    },

    Locations: {
      label: 'Locations',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Locations' }, locations: [] } },
      render: PuckLocations,
    },

    Gallery: {
      label: 'Gallery',
      fields: { data: { type: 'json' } },
      defaultProps: { data: { header: { title: 'Gallery' }, items: [] } },
      render: PuckGallery,
    },
  },
}

export default puckConfig


