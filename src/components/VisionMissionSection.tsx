
import { Card, CardContent } from "@/components/ui/card";

const VisionMissionSection = () => {
  return (
    <section id="vision-mission" className="pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:scale-105 shadow-lg shadow-violet-500/25">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-white/90 leading-relaxed text-base">
                  To nurture dancers with passion and compassion
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:scale-105 shadow-lg shadow-emerald-500/25">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/90 leading-relaxed text-base font-normal">
                  To create a conducive, wholesome, enriching and loving environment to inspire and groom passionate dancers to be the best that they can be and to challenge themselves to be better people
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white hover:scale-105 shadow-lg shadow-orange-500/25">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">Tagline</h3>
                <p className="text-white/90 leading-relaxed text-base font-normal">
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
