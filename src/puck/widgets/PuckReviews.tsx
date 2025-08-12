import ReviewsSection from '@/components/sections/ReviewsSection'
import type { ReviewsSection as ReviewsData } from '@/cms/content/schemas/sections'

export type PuckReviewsProps = { data: ReviewsData }

export function PuckReviews({ data }: PuckReviewsProps) {
  return <ReviewsSection data={data} />
}

export default PuckReviews


