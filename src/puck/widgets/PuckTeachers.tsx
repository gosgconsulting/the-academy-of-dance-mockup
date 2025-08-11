import TeachersSection from '@/components/sections/TeachersSection'
import type { TeachersSection as TeachersData } from '@/cms/content/schemas/sections'

export type PuckTeachersProps = { data: TeachersData }

export function PuckTeachers({ data }: PuckTeachersProps) {
  return <TeachersSection data={data} />
}

export default PuckTeachers


