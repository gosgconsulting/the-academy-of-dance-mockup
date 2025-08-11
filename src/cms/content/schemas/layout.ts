import { z } from 'zod'

export const NavLink = z.object({
  label: z.string(),
  sectionId: z.string().optional(),
  href: z.string().optional()
})

export const HeaderContent = z.object({
  logoSrc: z.union([z.string(), z.instanceof(File)]).default('/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png'),
  links: z.array(NavLink),
  primaryCta: z.object({ label: z.string(), sectionId: z.string().optional(), href: z.string().optional() })
})
export type HeaderContent = z.infer<typeof HeaderContent>

export const SocialIcon = z.enum(['facebook','instagram','youtube','tiktok'])
export const SocialLink = z.object({ icon: SocialIcon, href: z.string() })

export const FooterContent = z.object({
  logoSrc: z.union([z.string(), z.instanceof(File)]).default('/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png'),
  tagline: z.string(),
  socials: z.array(SocialLink),
  policyLinks: z.array(z.object({ label: z.string(), href: z.string() })),
  copyright: z.string()
})
export type FooterContent = z.infer<typeof FooterContent>

export const headerDefaults: HeaderContent = {
  logoSrc: '/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png',
  links: [
    { label: 'Home', sectionId: 'hero' },
    { label: 'Trials', sectionId: 'trials' },
    { label: 'About Us', sectionId: 'about' },
    { label: 'Programmes', sectionId: 'programmes' },
    { label: 'Reviews', sectionId: 'reviews' },
    { label: 'Teachers', sectionId: 'teachers' },
    { label: 'Gallery', sectionId: 'gallery' },
    { label: 'Blog', href: '/blog' }
  ],
  primaryCta: { label: 'Book Now!', sectionId: 'trials' }
}

export const footerDefaults: FooterContent = {
  logoSrc: '/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png',
  tagline: 'Where dreams take flight through the art of dance',
  socials: [
    { icon: 'facebook', href: 'https://www.facebook.com/theacademyofdancesg' },
    { icon: 'instagram', href: 'https://www.instagram.com/theacademyofdancesg/' },
    { icon: 'youtube', href: 'https://youtube.com/@theacademyofdancesg?si=2MnmNVoLWYiZXRwP' },
    { icon: 'tiktok', href: 'https://www.tiktok.com/@theacademyofdance?_t=ZS-8xi8hlguC0Y&_r=1' }
  ],
  policyLinks: [
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' }
  ],
  copyright: '© 2024 The Academy of Dance. All rights reserved.'
}


