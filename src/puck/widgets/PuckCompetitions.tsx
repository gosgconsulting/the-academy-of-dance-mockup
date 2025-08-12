import CompetitionExcellenceSection from '@/components/sections/CompetitionExcellenceSection'
import type { CompetitionExcellenceSection as CompData } from '@/cms/content/schemas/sections'

export type PuckCompetitionsProps = { data: CompData }

export function PuckCompetitions({ data }: PuckCompetitionsProps) {
  return <CompetitionExcellenceSection data={data} />
}

export default PuckCompetitions


