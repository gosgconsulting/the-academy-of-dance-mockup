import HeroSection from '@/components/HeroSection'

type Props = {
  images?: any[]
  backgroundImage?: string
  title: string
  description: string
  ctaText: string
  ctaUrl?: string
  puck?: { selected?: boolean; isSelected?: boolean; dragRef?: (el: HTMLElement | null) => void }
}

export function PuckHero({ images, backgroundImage, title, description, ctaText, ctaUrl, puck }: Props) {
  const imageUrls = (images || []).map((x: any) =>
    typeof x === 'string' ? x : (x?.value as string) || (x?.src as string) || ''
  )
  const allImages = backgroundImage ? [backgroundImage, ...imageUrls] : imageUrls

  const isSelected = !!(puck?.selected ?? puck?.isSelected)

  // Map description to existing HeroSection subtitle; CTA URL not used by HeroSection, so we pass text only
  return (
    <div ref={puck?.dragRef as any} className={isSelected ? 'ring-2 ring-sky-500 rounded-sm' : undefined}>
    <HeroSection
      scrollToSection={() => {
        if (!ctaUrl) return
        if (ctaUrl.startsWith('#')) {
          const el = document.getElementById(ctaUrl.slice(1))
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          return
        }
        if (ctaUrl.startsWith('/')) {
          window.location.assign(ctaUrl)
          return
        }
        if (/^https?:\/\//i.test(ctaUrl)) {
          window.open(ctaUrl, '_blank', 'noopener,noreferrer')
        }
      }}
      images={allImages}
      title={title}
      subtitle={description}
      ctaText={ctaText}
    />
    </div>
  )
}

export default PuckHero


