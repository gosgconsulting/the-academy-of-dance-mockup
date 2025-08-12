import type { Config } from '@measured/puck'
import '@measured/puck/puck.css'
import { PuckHeader } from './widgets/PuckHeader'
import { PuckFooter } from './widgets/PuckFooter'
import { PuckHero } from './widgets/PuckHero'
import { PuckTrials } from './widgets/PuckTrials'

// Define the editable props for each block
export type PuckBlocks = {
  Header: {
    logoSrc: string
    links: { label: string; href?: string }[]
    primaryCta: { label: string; href?: string }
  }
  Hero: {
    images?: string[]
    backgroundImage?: string
    title: string
    description: string
    ctaText: string
    ctaUrl?: string
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
}

export const puckConfig: Config<PuckBlocks> = {
  components: {
    Header: {
      label: 'Header',
      fields: {
        logoSrc: { type: 'text' },
        links: {
          type: 'array',
          arrayFields: { label: { type: 'text' }, href: { type: 'text' } },
          getItemSummary: (item) => (item?.label as string) || 'Link',
        },
        primaryCta: { type: 'object', objectFields: { label: { type: 'text' }, href: { type: 'text' } } },
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
        // Order matters for the right panel: Title, then Description
        title: { type: 'textarea', placeholder: 'Headline' },
        description: { type: 'textarea', placeholder: 'Description' },
        ctaText: { type: 'text', placeholder: 'Call to action' },
        ctaUrl: { type: 'text', placeholder: '#trials or /contact or https://…' },
        images: { type: 'array', arrayFields: { value: { type: 'text', placeholder: '/path/to/image.png' } }, getItemSummary: (i)=> i?.value || 'Image' },
        backgroundImage: { type: 'text', placeholder: '/path/to/hero.jpg' },
      },
      defaultProps: {
        backgroundImage: '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png',
        title: 'The Academy of Dance',
        description:
          'Learn ballet and dance with caring instructors. Classes for all ages and levels across our Singapore studios.',
        ctaText: 'Book Trial Class',
        ctaUrl: '#trials'
      },
      render: PuckHero,
    },
    Footer: {
      label: 'Footer',
      fields: {
        logoSrc: { type: 'text' },
        tagline: { type: 'textarea' },
        policyLinks: { type: 'array', arrayFields: { label: { type: 'text' }, href: { type: 'text' } }, getItemSummary: (i)=> i?.label || 'Policy' },
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
  },
}

export default puckConfig


