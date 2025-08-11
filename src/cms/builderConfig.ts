import { builder } from '@builder.io/react'

// Builder.io Configuration
export const BUILDER_API_KEY = import.meta.env.VITE_BUILDER_API_KEY || 'YOUR_BUILDER_API_KEY_HERE'

// Note: Builder.io is initialized in App.tsx to avoid duplicate initialization

// Builder.io Models Configuration
export const BUILDER_MODELS = {
  page: 'page',
  section: 'section',
  component: 'component',
  blogPost: 'blog-post',
  testimonial: 'testimonial',
  teacher: 'teacher',
  location: 'location',
  programme: 'programme',
  event: 'event'
} as const

// Custom component registration
export const registerBuilderComponents = () => {
  // We'll register custom components here later
}

export { builder }
