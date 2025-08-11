import EventsSection from '@/components/sections/EventsSection'
import type { EventsSection as EventsData } from '@/cms/content/schemas/sections'

export type PuckEventsProps = { data: EventsData }

export function PuckEvents({ data }: PuckEventsProps) {
  return <EventsSection data={data} />
}

export default PuckEvents


