import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Program {
  name: string;
  description: string;
  image: string;
  ageGroup: string;
}

interface ProgramsProps {
  title?: string;
  programs?: Program[];
}

const Programs = ({ 
  title = "Our Dance Programs",
  programs = []
}: ProgramsProps) => {
  const defaultPrograms: Program[] = [
    {
      name: "Ballet",
      description: "Classical ballet training for all levels",
      image: "/api/placeholder/400/300",
      ageGroup: "3+ years"
    },
    {
      name: "Contemporary", 
      description: "Modern contemporary dance techniques",
      image: "/api/placeholder/400/300",
      ageGroup: "8+ years"
    },
    {
      name: "Hip Hop",
      description: "Urban street dance styles",
      image: "/api/placeholder/400/300", 
      ageGroup: "5+ years"
    }
  ];

  const displayPrograms = programs.length > 0 ? programs : defaultPrograms;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPrograms.map((program, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <Badge variant="secondary">{program.ageGroup}</Badge>
                </div>
                <CardDescription className="text-base">
                  {program.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors">
                  Learn More
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
