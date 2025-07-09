import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Medal, Star, Users, Target } from "lucide-react";
const AchievementsSection = () => {
  const achievements = [{
    icon: Trophy,
    title: "Singapore Youth Festival",
    description: "Gold Award 2024",
    details: "Outstanding performance in contemporary dance category"
  }, {
    icon: Medal,
    title: "National Dance Competition",
    description: "1st Place Winners",
    details: "Junior and Senior divisions championship"
  }, {
    icon: Award,
    title: "International Recognition",
    description: "Featured in Dance Asia Magazine",
    details: "Highlighted as Singapore's premier dance academy"
  }, {
    icon: Star,
    title: "Student Excellence",
    description: "95% Exam Pass Rate",
    details: "Consistently high success in RAD and ISTD examinations"
  }, {
    icon: Users,
    title: "Community Impact",
    description: "1000+ Students Trained",
    details: "Across all our programs since establishment"
  }, {
    icon: Target,
    title: "Professional Pathway",
    description: "Alumni Success",
    details: "50+ students pursuing professional dance careers"
  }];
  return <section id="achievements" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Achievements
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            Celebrating excellence in dance education and the remarkable success
            of our students and academy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-secondary font-semibold mb-2">
                    {achievement.description}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {achievement.details}
                  </p>
                </CardContent>
              </Card>;
        })}
        </div>

        
      </div>
    </section>;
};
export default AchievementsSection;