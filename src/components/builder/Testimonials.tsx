import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

interface TestimonialsProps {
  title?: string;
  testimonials?: Testimonial[];
}

const Testimonials = ({ 
  title = "What Our Students Say",
  testimonials = []
}: TestimonialsProps) => {
  const defaultTestimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "Ballet Student (Age 12)",
      content: "The Academy of Dance has transformed my daughter's confidence. The teachers are patient and encouraging, and she looks forward to every class!",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Michael Wong",
      role: "Adult Contemporary Student",
      content: "As an adult beginner, I was nervous about starting dance. The instructors made me feel welcome from day one. I've learned so much in just 6 months!",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Emma Rodriguez",
      role: "Hip Hop Student (Age 16)",
      content: "This academy pushed me to compete at national level. The training is intensive but so rewarding. I've made lifelong friends here!",
      rating: 5,
      image: "/api/placeholder/80/80"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {testimonial.image && (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
