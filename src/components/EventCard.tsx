
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
}

const EventCard = ({ title, subtitle, description, images }: EventCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        
        {/* Pagination dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="font-playfair text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{subtitle}</p>
        <p className="text-gray-500 text-sm mb-4 flex-1">{description}</p>
        <Button onClick={() => window.open('https://wa.me/6598372670', '_blank')} className="bg-primary hover:bg-primary/90 text-white w-full">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
