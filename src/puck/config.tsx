import type { Config } from '@measured/puck'
import '@measured/puck/puck.css'
import { PuckHero } from './widgets/PuckHero'

// Define the editable props for each block
export type PuckBlocks = {
  Hero: {
    images?: string[]
    backgroundImage?: string
    title: string
    description: string
    ctaText: string
    ctaUrl?: string
  }
}

export const puckConfig: Config<PuckBlocks> = {
  components: {
    Hero: {
      label: 'Hero',
      fields: {
        backgroundImage: { type: 'text', placeholder: '/path/to/hero.jpg' },
        images: { type: 'array', arrayFields: { value: { type: 'text', placeholder: '/path/to/image.png' } }, getItemSummary: (i)=> i?.value || 'Image' },
        title: { type: 'textarea', placeholder: 'Headline' },
        description: { type: 'textarea', placeholder: 'Description' },
        ctaText: { type: 'text', placeholder: 'Call to action' },
        ctaUrl: { type: 'text', placeholder: '#trials or /contact or https://…' },
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
  },
}

export default puckConfig


