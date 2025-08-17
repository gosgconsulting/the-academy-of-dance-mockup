import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MissionVisionProps {
  mission?: string;
  vision?: string;
}

const MissionVision = ({ 
  mission = "To provide exceptional dance education that nurtures creativity, builds confidence, and develops technical excellence in students of all ages.",
  vision = "To be Singapore's leading dance academy, inspiring the next generation of dancers and artists."
}: MissionVisionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl font-bold text-center">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-inter text-gray-700 leading-relaxed text-center">
                {mission}
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl font-bold text-center">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-inter text-gray-700 leading-relaxed text-center">
                {vision}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
