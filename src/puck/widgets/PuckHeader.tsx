import Navigation from '@/components/Navigation'

type Props = {
  logoSrc: string
  links: { label: string; href?: string; sectionId?: string }[]
  primaryCta: { label: string; href?: string; sectionId?: string }
}

export function PuckHeader({ logoSrc, links, primaryCta }: Props) {
  // Map puck props to Navigation content via existing CMS layer
  // Navigation reads from usePageContent('header'), so we can temporarily render a lightweight static bar
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={logoSrc} className="h-8 w-auto" />
        <div className="hidden md:flex items-center gap-6">
          {links?.map((l) => (
            <span key={l.label} className="text-sm text-gray-700">
              {l.label}
            </span>
          ))}
          {primaryCta?.label && (
            <span className="px-3 py-1.5 bg-black text-white rounded">
              {primaryCta.label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PuckHeader


