import VisionMissionSection from '@/components/VisionMissionSection'

export type PuckVisionProps = {
  vision: string
  mission: string
  tagline: string
}

export function PuckVision(props: PuckVisionProps) {
  return <VisionMissionSection {...props} />
}

export default PuckVision


