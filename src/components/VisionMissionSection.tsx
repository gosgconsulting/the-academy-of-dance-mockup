
import { Card, CardContent } from "@/components/ui/card";
import { useContentLoader } from "@/hooks/useContentLoader";

interface VisionMissionContent {
  cards: Array<{
    type: string;
    title: string;
    content: string;
    color: string;
  }>;
}

const VisionMissionSection = () => {
  const { getSectionContent } = useContentLoader('index');
  const content = getSectionContent('vision-mission') as VisionMissionContent;
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'violet':
        return 'shadow-[0_0_20px_rgba(139,69,193,0.3)] hover:shadow-[0_0_30px_rgba(139,69,193,0.5)]';
      case 'emerald':
        return 'shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]';
      case 'orange':
        return 'shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]';
      default:
        return 'shadow-[0_0_20px_rgba(139,69,193,0.3)] hover:shadow-[0_0_30px_rgba(139,69,193,0.5)]';
    }
  };

  return (
    <section id="vision-mission" className="pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {content?.cards?.map((card, index) => (
              <Card key={index} className={`text-center hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:scale-105 ${getColorClasses(card.color)}`}>
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-primary mb-4">{card.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-base font-normal">
                    {card.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
