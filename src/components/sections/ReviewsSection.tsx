
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HomePageReviews } from "@/lib/graphql";

// Default data fallback
const DEFAULT_DATA: HomePageReviews = {
  title: "What Parents Say",
  subtitle: "Discover why families trust us with their children's dance education and artistic development.",
  reviews: [
    {
      name: "Sarah Chen",
      role: "Parent of Emma, Age 8",
      content:
        "The Academy of Dance has transformed my shy daughter into a confident performer. The teachers are exceptional and truly care about each child's progress.",
      rating: 5,
    },
    {
      name: "Michael Tan",
      role: "Parent of Lucas, Age 12",
      content:
        "Outstanding instruction and facilities. My son has developed incredible discipline and artistry. The recitals are professionally produced and showcase real talent.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Parent of Aria, Age 6",
      content:
        "We've tried several dance schools, but none compare to the quality and care here. The trial class sold us immediately - it's worth every dollar.",
      rating: 5,
    },
    {
      name: "David Wong",
      role: "Parent of Sophie, Age 10",
      content:
        "The progress my daughter has made in just one year is incredible. She's gained so much confidence and technical skill. The teachers are patient and encouraging.",
      rating: 5,
    },
    {
      name: "Lisa Kumar",
      role: "Parent of Aiden, Age 7",
      content:
        "My son absolutely loves his dance classes here. The variety of styles offered means he never gets bored, and the competition opportunities have been amazing.",
      rating: 5,
    },
    {
      name: "Jennifer Lim",
      role: "Parent of Maya, Age 9",
      content:
        "The Academy provides such a nurturing environment. My daughter has blossomed here, not just as a dancer but as a confident young person.",
      rating: 5,
    },
    {
      name: "Robert Lee",
      role: "Parent of twins Alex & Anna, Age 11",
      content:
        "Having both my children learn here has been fantastic. The teachers adapt to each child's learning style and the community is so supportive.",
      rating: 5,
    },
    {
      name: "Amanda Teo",
      role: "Parent of Chloe, Age 5",
      content:
        "Starting dance at such a young age here was the best decision. The Baby Gems program is perfect for little ones - creative, fun and educational.",
      rating: 5,
    },
  ]
};

interface ReviewsSectionProps {
  data?: HomePageReviews;
}

const ReviewsSection = ({ data }: ReviewsSectionProps) => {
  // Use data from props or fallback to default data
  const reviewsData = data || DEFAULT_DATA;

  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {reviewsData.title}
          </h2>
          <div className="font-inter text-gray-600 max-w-2xl mx-auto text-lg" dangerouslySetInnerHTML={{ __html: reviewsData.subtitle }} />
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {reviewsData.reviews.map((review, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="space-y-4 p-0 flex flex-col h-full">
                      <div className="flex space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-secondary text-secondary"
                          />
                        ))}
                      </div>
                      <div className="text-gray-700 italic flex-1" dangerouslySetInnerHTML={{ __html: `"${review.content}"` }} />
                      <div>
                        <p className="font-semibold text-primary">
                          {review.name}
                        </p>
                        <p className="text-sm text-gray-500">{review.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
