
import { Card, CardContent } from "@/components/ui/card";

const VisionMissionSection = () => {
  return (
    <section id="vision-mission" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-2 border-primary/10">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  To nurture dancers with passion and compassion
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-2 border-secondary/10">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed text-base font-normal">
                  To create a conducive, wholesome, enriching and loving environment to inspire and groom passionate dancers to be the best that they can be and to challenge themselves to be better people
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-2 border-primary/10">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Tagline</h3>
                <p className="text-gray-700 leading-relaxed text-base font-normal">
                  Our insatiable passion for dance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
