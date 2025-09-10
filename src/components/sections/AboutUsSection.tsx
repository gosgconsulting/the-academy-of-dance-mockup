import { Users, Heart, Award, Target } from "lucide-react";
import { HomePageAboutUs } from "@/lib/graphql";

interface AboutUsSectionProps {
  data?: HomePageAboutUs;
}

const DEFAULT_DATA: HomePageAboutUs = {
  title: "About Us",
  label: "Our Story",
  content: `<p>At The Academy of Dance (TAD), we merge passion with precision. Our tagline, "Our insatiable passion for dance," truly encapsulates the spirit of TAD. Dance is not just an art form for us; it is our passion. At TAD, we believe that dance transcends mere movements and steps. It is a profound expression of the soul and a vital journey of self-discovery and improvement. Established in 2019, TAD has since emerged as one of the most renowned dance schools in Singapore.</p>
<p>What distinguishes us is our devoted team of teachers who not only have extensive experience in their respective genres but also possess a profound passion for sharing the love of dance and providing a comprehensive education for dancers.</p>
<p>At TAD, our teachers foster an encouraging environment for everyone, from beginners taking their first steps to seasoned dancers gracing the stage. We prioritize our students' progress to ensure every dancer achieves their fullest potential. Whether your aim is to pursue a professional dance career, maintain fitness, or simply enjoy moving to the rhythm, we are here to support you in reaching your goals.</p>`,
  points: [
    {
      icon: ["Users"],
      label: "Expert Faculty",
      value: "Internationally trained instructors with decades of experience"
    },
    {
      icon: ["Heart"],
      label: "Passion Driven",
      value: "Every class is taught with love, dedication, and enthusiasm"
    },
    {
      icon: ["Award"],
      label: "Award Winning",
      value: "Over 1000 awards and recognitions in competitions"
    },
    {
      icon: ["Target"],
      label: "Goal Oriented",
      value: "Structured curriculum designed for measurable progress"
    }
  ]
};

const AboutUsSection = ({ data: aboutData = DEFAULT_DATA }: AboutUsSectionProps) => {
  // Helper function to get icon component dynamically
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Users,
      Heart,
      Award,
      Target
    };
    return iconMap[iconName] || Users;
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {aboutData.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div className="space-y-6">
            <h3 className="font-playfair text-3xl font-bold text-primary mb-4">{aboutData.label}</h3>
            <div 
              className="space-y-6 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData.content }}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {aboutData.points.map((point, index) => {
              const IconComponent = getIconComponent(point.icon[0]);
              const isEven = index % 2 === 0;
              const gradientClass = isEven 
                ? "bg-gradient-to-br from-primary/10 to-secondary/10" 
                : "bg-gradient-to-br from-secondary/10 to-primary/10";
              const iconColor = isEven ? "text-primary" : "text-secondary";
              
              return (
                <div key={index} className={`${gradientClass} rounded-2xl p-6 text-center`}>
                  <IconComponent className={`w-12 h-12 ${iconColor} mx-auto mb-4`} />
                  <h4 className="font-playfair text-xl font-bold text-primary mb-2">{point.label}</h4>
                  <p className="text-gray-600 text-sm">{point.value}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
export default AboutUsSection;