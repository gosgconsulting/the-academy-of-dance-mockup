import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Instructor {
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  image: string;
  experience: string;
}

interface InstructorsProps {
  title?: string;
  subtitle?: string;
  instructors?: Instructor[];
}

const Instructors = ({ 
  title = "Meet Our Expert Instructors",
  subtitle = "Learn from Singapore's most accomplished dance professionals",
  instructors = []
}: InstructorsProps) => {
  const defaultInstructors: Instructor[] = [
    {
      name: "Elena Vasquez",
      title: "Principal Ballet Instructor & Academy Director",
      specialties: ["Classical Ballet", "Pointe", "Contemporary"],
      bio: "Former principal dancer with Singapore Ballet Company. Elena brings 20+ years of professional experience and has trained students who've gone on to international dance companies.",
      image: "/api/placeholder/300/400",
      experience: "20+ years"
    },
    {
      name: "Marcus Chen",
      title: "Hip Hop & Urban Dance Specialist",
      specialties: ["Hip Hop", "Breaking", "Urban Contemporary"],
      bio: "International champion and choreographer who has worked with top recording artists. Marcus brings authentic street dance culture and competitive training to our students.",
      image: "/api/placeholder/300/400",
      experience: "15+ years"
    },
    {
      name: "Sophia Williams",
      title: "Contemporary & Jazz Instructor",
      specialties: ["Contemporary", "Jazz", "Musical Theatre"],
      bio: "Graduate of London Contemporary Dance School with extensive stage and teaching experience. Sophia specializes in expressive movement and artistic development.",
      image: "/api/placeholder/300/400",
      experience: "12+ years"
    },
    {
      name: "David Liu",
      title: "Children's Dance Specialist",
      specialties: ["Pre-Ballet", "Creative Movement", "Kids Hip Hop"],
      bio: "Certified in early childhood dance education with a gift for making dance fun and accessible for young learners. David's classes build confidence and coordination.",
      image: "/api/placeholder/300/400",
      experience: "10+ years"
    }
  ];

  const displayInstructors = instructors.length > 0 ? instructors : defaultInstructors;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {displayInstructors.map((instructor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <CardContent className="md:w-2/3 p-6">
                  <div className="mb-4">
                    <h3 className="font-playfair text-2xl font-bold mb-1">{instructor.name}</h3>
                    <p className="text-primary font-semibold mb-2">{instructor.title}</p>
                    <Badge variant="secondary" className="text-sm">
                      {instructor.experience} experience
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty, specIndex) => (
                        <Badge key={specIndex} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {instructor.bio}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All our instructors are professionally trained and committed to your artistic growth.
          </p>
          <button className="text-primary hover:text-primary/80 font-semibold">
            View Full Instructor Bios →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
