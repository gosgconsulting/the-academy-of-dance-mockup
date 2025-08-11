import { z } from 'zod'
import { HomepageContent, homepageDefaults } from '@/cms/content/schemas/homepage'
// import { PricingContent, pricingDefaults } from '@/cms/content/schemas/pricing'
// import { GalleryContent, galleryDefaults } from '@/cms/content/schemas/gallery'
import { BlogContent, blogDefaults } from '@/cms/content/schemas/blog'
import { HeaderContent, FooterContent, headerDefaults, footerDefaults } from '@/cms/content/schemas/layout'
import { PrivacyPolicyContent, TermsContent, privacyPolicyDefaults, termsDefaults } from '@/cms/content/schemas/legal'

export type PageSchemaEntry<T> = {
  title: string
  schema: z.ZodType<T>
  defaults: T
}

export const registry = {
  homepage: {
    title: 'Homepage',
    schema: HomepageContent,
    defaults: homepageDefaults,
  },
  blog: {
    title: 'Blog',
    schema: BlogContent,
    defaults: blogDefaults,
  },
  header: {
    title: 'Header',
    schema: HeaderContent,
    defaults: headerDefaults,
  },
  footer: {
    title: 'Footer',
    schema: FooterContent,
    defaults: footerDefaults,
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    schema: PrivacyPolicyContent,
    defaults: privacyPolicyDefaults,
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    schema: TermsContent,
    defaults: termsDefaults,
  },
} as const

export type Registry = typeof registry


