import ProgrammesAndExamsSection from '@/components/sections/ProgrammesAndExamsSection'
import type { ProgrammesSection } from '@/cms/content/schemas/sections'

export type PuckProgramsProps = { data: ProgrammesSection }

export function PuckPrograms({ data }: PuckProgramsProps) {
  return <ProgrammesAndExamsSection data={data} />
}

export default PuckPrograms


