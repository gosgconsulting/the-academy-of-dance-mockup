
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useContentLoader } from "@/hooks/useContentLoader";

interface ReviewInfo {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface ReviewsContent {
  title: string;
  description: string;
  reviews: ReviewInfo[];
}

const ReviewsSection = () => {
  const { getSectionContent } = useContentLoader('index');
  const content = getSectionContent('reviews') as ReviewsContent;

  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {content?.title || 'What Parents Say'}
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            {content?.description || 'Discover why families trust us with their children\'s dance education and artistic development.'}
          </p>
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
              {content?.reviews?.map((review, index) => (
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
                      <p className="text-gray-700 italic flex-1">
                        "{review.content}"
                      </p>
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
