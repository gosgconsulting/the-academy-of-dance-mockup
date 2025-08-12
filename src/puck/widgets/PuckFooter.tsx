import Footer from '@/components/Footer'

type Props = {
  logoSrc: string
  tagline: string
  policyLinks: { label: string; href: string }[]
  copyright: string
}

export function PuckFooter(_props: Props) {
  // Reuse the existing Footer which already reads content via usePageContent
  return <Footer />
}

export default PuckFooter


