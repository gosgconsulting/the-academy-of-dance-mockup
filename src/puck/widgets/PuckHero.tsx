import HeroSection from '@/components/HeroSection'

type Props = {
  images: any[]
  title: string
  subtitle: string
  ctaText: string
}

export function PuckHero({ images, title, subtitle, ctaText }: Props) {
  const imageUrls = (images || []).map((x: any) =>
    typeof x === 'string' ? x : (x?.value as string) || (x?.src as string) || ''
  )

  return (
    <HeroSection
      scrollToSection={() => {}}
      images={imageUrls}
      title={title}
      subtitle={subtitle}
      ctaText={ctaText}
    />
  )
}

export default PuckHero


