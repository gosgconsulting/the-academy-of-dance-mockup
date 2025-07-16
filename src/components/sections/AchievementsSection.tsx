import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award, Star } from "lucide-react";

const AchievementsSection = () => {
  const competitionResults = [
    {
      year: "2025",
      competition: "GTB Competition",
      highlights: [
        "Xin En - 1st Place (Jazz/Hip Hop, Ages 13-14)",
        "Leocadie Pochat - 1st Place (Theatrical, Ages 9-10)",
        "Elysia Low - 1st Place (Tap Solo, Ages 14&U)",
        "Summer Palace - 1st Place (12&U Any Other Style Large)",
        "Outstanding Group Dancer Award: Nakshathra Sandilya"
      ]
    },
    {
      year: "2024",
      competition: "GTB & APDC Bangkok",
      highlights: [
        "Melanie Ng - 1st Place (Intermediate Open Solo, Ages 15&U)",
        "Group Any Other Style (6&U) - 1st Place",
        "Group Classical Big Group Open - 1st Place",
        "Group 6&U - 2nd Place (APDC Bangkok)",
        "Group 8&U Jazz - 2nd Place & Honorable Mention (APDC)"
      ]
    },
    {
      year: "2023",
      competition: "GTB & SRC CSTD",
      highlights: [
        "Group (Open Age Classical) - 1st & 2nd Place",
        "Groups 13&U Jazz - 1st Place (SRC CSTD)",
        "Alexandria - 1st Place (Lyrical Solo Novice 15&U)",
        "Ashleigh Zhan - 2nd Place (National Solo 11&U)",
        "Groups Open Age Lyrical and Classical - 2nd Place"
      ]
    },
    {
      year: "2022",
      competition: "GTB & Singapore Cup",
      highlights: [
        "Group (12&U Jazz) - 1st Place",
        "Group (Open Any Other Style) - 1st Place",
        "Group Open Age Lyrical - 1st Place (Singapore Cup)",
        "Judges Choice Award & Gala Finalist",
        "Judges Award for Musicality and Performance"
      ]
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Dance Competition Results
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            Celebrating our students' outstanding achievements in prestigious dance competitions
            across Asia and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {competitionResults.map((result, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    {index === 0 ? <Trophy className="w-6 h-6 text-primary" /> :
                     index === 1 ? <Medal className="w-6 h-6 text-primary" /> :
                     index === 2 ? <Award className="w-6 h-6 text-primary" /> :
                     <Star className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-primary">
                      {result.year}
                    </h3>
                    <p className="text-secondary font-semibold">
                      {result.competition}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {result.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AchievementsSection;