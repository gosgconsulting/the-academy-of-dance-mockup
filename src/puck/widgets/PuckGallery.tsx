import GallerySection from '@/components/sections/GallerySection'
import type { GallerySection as GalleryData } from '@/cms/content/schemas/sections'

export type PuckGalleryProps = { data: GalleryData }

export function PuckGallery({ data }: PuckGalleryProps) {
  return <GallerySection data={data} />
}

export default PuckGallery


