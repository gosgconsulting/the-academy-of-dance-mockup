import StatisticsSection from '@/components/sections/StatisticsSection'

export type PuckNumbersProps = {
  stats: { number: string; label: string; colorHex?: string; bgHex?: string }[]
}

export function PuckNumbers({ stats }: PuckNumbersProps) {
  return <StatisticsSection data={{ stats }} />
}

export default PuckNumbers
