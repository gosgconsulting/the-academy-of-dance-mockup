import AchievementsSection from '@/components/sections/AchievementsSection'
import type { AchievementsSection as AchievementsData } from '@/cms/content/schemas/sections'

export type PuckAchievementsProps = { data: AchievementsData }

export function PuckAchievements({ data }: PuckAchievementsProps) {
  return <AchievementsSection data={data} />
}

export default PuckAchievements


