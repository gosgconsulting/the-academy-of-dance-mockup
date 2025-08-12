import TrialsSection from '@/components/TrialsSection'

export type PuckTrialsProps = {
  title: string
  subtitle: string
  joinTitle: string
  contactName: string
  contactPhone: string
  bookButtonText: string
}

export function PuckTrials(props: PuckTrialsProps) {
  return <TrialsSection {...props} />
}

export default PuckTrials


