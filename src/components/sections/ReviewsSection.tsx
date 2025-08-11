
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ReviewsSection as ReviewsData } from "@/cms/content/schemas/sections";

const ReviewsSection = ({ data }: { data: ReviewsData }) => {
  const reviews = data.reviews

  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">{data.header.title}</h2>
          {data.header.subtitle && (
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">{data.header.subtitle}</p>
          )}
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
              {reviews.map((review, index) => (
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
