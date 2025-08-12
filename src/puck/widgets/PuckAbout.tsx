import AboutUsSection from '@/components/sections/AboutUsSection'
import type { AboutUsSection as AboutUsData } from '@/cms/content/schemas/sections'

export type PuckAboutProps = { data: AboutUsData }

export function PuckAbout({ data }: PuckAboutProps) {
  return <AboutUsSection data={data} />
}

export default PuckAbout


