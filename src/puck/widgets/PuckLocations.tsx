import LocationsSection from '@/components/sections/LocationsSection'
import type { LocationsSection as LocationsData } from '@/cms/content/schemas/sections'

export type PuckLocationsProps = { data: LocationsData }

export function PuckLocations({ data }: PuckLocationsProps) {
  return <LocationsSection data={data} />
}

export default PuckLocations


