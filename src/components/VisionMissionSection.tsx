
import { Card, CardContent } from "@/components/ui/card";
import { VisionMissionItem } from "@/lib/graphql";

interface VisionMissionSectionProps {
  data?: VisionMissionItem[];
}

const DEFAULT_DATA: VisionMissionItem[] = [
  {
    title: "Our Vision",
    description: "To nurture dancers with passion and compassion"
  },
  {
    title: "Our Mission", 
    description: "To create a conducive, wholesome, enriching and loving environment to inspire and groom passionate dancers to be the best that they can be and to challenge themselves to be better people"
  },
  {
    title: "Tagline",
    description: "Our insatiable passion for dance"
  }
];

// Available shadow color classes
const shadowColorClasses = [
  "shadow-vision-purple",
  "shadow-vision-green", 
  "shadow-vision-orange",
  "shadow-vision-blue",
  "shadow-vision-red",
  "shadow-vision-pink",
  "shadow-vision-teal",
  "shadow-vision-indigo",
  "shadow-vision-yellow"
];

const VisionMissionSection = ({ data: visionMissionData = DEFAULT_DATA }: VisionMissionSectionProps) => {

  return (
    <section id="vision-mission" className="pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {visionMissionData.map((item, index) => {
              // Cycle through available shadow colors
              const shadowClass = shadowColorClasses[index % shadowColorClasses.length];
              
              return (
                <Card 
                  key={index}
                  className={`text-center hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:scale-105 ${shadowClass}`}
                >
                  <CardContent className="p-8">
                    <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                      {item.title}
                    </h3>
                    <div
                      className="text-gray-700 leading-relaxed text-base font-normal"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
