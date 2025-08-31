import { Users, Heart, Award, Target } from "lucide-react";
import { useContentLoader } from "@/hooks/useContentLoader";

interface AboutContent {
  title: string;
  storyTitle: string;
  storyParagraphs: string[];
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const AboutUsSection = () => {
  const { getSectionContent } = useContentLoader('index');
  const content = getSectionContent('about') as AboutContent;
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'Heart': return Heart;
      case 'Award': return Award;
      case 'Target': return Target;
      default: return Users;
    }
  };
  
  return <section 
    id="about" 
    className="py-20 bg-white"
    data-sparti-editable="true"
    data-sparti-component="about-section"
  >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6"
            data-sparti-editable="true"
            data-sparti-component="about-title"
          >
            {content?.title || 'About Us'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div className="space-y-6">
            <h3 className="font-playfair text-3xl font-bold text-primary mb-4">{content?.storyTitle || 'Our Story'}</h3>
            {content?.storyParagraphs?.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {content?.features?.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div key={index} className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 text-center">
                  <IconComponent className={`w-12 h-12 mx-auto mb-4 ${feature.icon === 'Heart' || feature.icon === 'Target' ? 'text-secondary' : 'text-primary'}`} />
                  <h4 className="font-playfair text-xl font-bold text-primary mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        
      </div>
    </section>;
};
export default AboutUsSection;