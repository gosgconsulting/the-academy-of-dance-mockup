import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Medal, Star, Calendar, Users } from "lucide-react";

const AchievementsSection = () => {
  const competitions = [
    {
      icon: Trophy,
      title: "Get The Beat (GTB) 2025",
      highlights: [
        "Outstanding Group Dancer Award: Nakshathra Sandilya",
        "Multiple 1st Place wins in Group competitions",
        "Strong performance across all age categories"
      ],
      results: [
        { name: "Xin En", placement: "1st", category: "MY FIRST SOLO COMMERCIAL (13-14)" },
        { name: "Leocadie Pochat", placement: "1st", category: "BEGINNER THEATRICAL (9-10)" },
        { name: "Elysia Low", placement: "1st", category: "INTERMEDIATE TAP SOLO (14&U)" },
        { name: "Juliet Yap", placement: "1st", category: "INTERMEDIATE DEMI CHARACTER (10&U)" },
        { name: "Kayla Soo", placement: "1st", category: "INTERMEDIATE DEMI CHARACTER (15&U)" },
        { name: "Lyra Goh", placement: "1st", category: "INTERMEDIATE DEMI CHARACTER (13&U)" },
        { name: "Caley Toh", placement: "1st", category: "INTERMEDIATE DEMI CHARACTER (16-20)" },
        { name: "Eliana Goh", placement: "1st", category: "INTERMEDIATE BALLET SOLO (15&U)" }
      ]
    },
    {
      icon: Medal,
      title: "Get The Beat (GTB) 2024",
      highlights: [
        "Judges Choice Award & Gala Finalist",
        "Judges Award for Choreography",
        "Multiple 1st Place Group wins"
      ],
      results: [
        { name: "Melanie Ng", placement: "1st", category: "Intermediate Open Solo (15&U)" },
        { name: "Elysia Low", placement: "1st", category: "Intermediate Tap Solo (13&U)" },
        { name: "Group Classical Big Group Open", placement: "1st", category: "Open Age" },
        { name: "Group Any Other Style (6&U)", placement: "1st", category: "Young Age" }
      ]
    },
    {
      icon: Award,
      title: "Asia Pacific Dance Competition Bangkok 2024",
      highlights: [
        "International competition success",
        "Multiple podium finishes",
        "Honorable mentions across categories"
      ],
      results: [
        { name: "Group 6&U", placement: "2nd", category: "Young Age Category" },
        { name: "Group 8&U Jazz", placement: "2nd", category: "Junior Category" },
        { name: "Group Open Lyrical/Ballet", placement: "2nd", category: "Open Age" }
      ]
    },
    {
      icon: Star,
      title: "Singapore Regional Competitions (SRC) CSTD 2024",
      highlights: [
        "Dominant performance in group categories",
        "1st Place in multiple divisions",
        "Strong solo competition results"
      ],
      results: [
        { name: "Group Any Other Style 13&U", placement: "1st", category: "Teen Division" },
        { name: "Group Acrobatics, Tap, Musical Theatre Open", placement: "1st", category: "Open Age" },
        { name: "Group Classical/Lyrical Open", placement: "2nd", category: "Open Age" }
      ]
    },
    {
      icon: Calendar,
      title: "Previous Years (2022-2023)",
      highlights: [
        "Consistent excellence over multiple years",
        "GTB 2023: Multiple 1st Place Group wins",
        "GTB 2022: Judges Choice & Gala Finalist"
      ],
      results: [
        { name: "GTB 2023 Groups", placement: "1st & 2nd", category: "Open Age Classical" },
        { name: "SRC CSTD 2023", placement: "1st", category: "Groups 13&U Jazz" },
        { name: "GTB 2022 Groups", placement: "1st", category: "Open Any Other Style & 12&U Jazz" },
        { name: "Singapore Cup Challenge 2022", placement: "1st", category: "Group Open Age Lyrical" }
      ]
    },
    {
      icon: Star,
      title: "Chingay Parade Performances",
      highlights: [
        "Most Lively Contingent Award Winner (2020)",
        "Consistent annual participation since 2020",
        "Showcasing Singapore's cultural diversity"
      ],
      results: [
        { name: "2020 Performance", placement: "Most Lively Contingent Award", category: "Special Recognition" },
        { name: "2021 Performance", placement: "Performed", category: "Cultural Showcase" },
        { name: "2022 Performance", placement: "Performed", category: "Cultural Showcase" },
        { name: "2023 Performance", placement: "Performed", category: "Cultural Showcase" }
      ]
    },
    {
      icon: Award,
      title: "National Day Parade & Recent Performances",
      highlights: [
        "Selected for National Day Parade 2025",
        "Chingay Parade 2024 & 2025 Performances",
        "Prestigious national platform representation"
      ],
      results: [
        { name: "2025 National Day Parade", placement: "Performing", category: "National Celebration" },
        { name: "2024 Chingay Parade", placement: "Performed", category: "Cultural Showcase" },
        { name: "2025 Chingay Parade", placement: "Performed", category: "Cultural Showcase" }
      ]
    },
    {
      icon: Users,
      title: "Outstanding Achievements Summary",
      highlights: [
        "50+ Competition Awards across all years",
        "Multiple Gala Finalists and Special Awards",
        "Excellence in Solo, Duo/Trio, and Group categories"
      ],
      results: [
        { name: "Total 1st Place Wins", placement: "25+", category: "Across All Competitions" },
        { name: "Gala Performances", placement: "Multiple", category: "GTB & Other Competitions" },
        { name: "Special Awards", placement: "10+", category: "Choreography, Musicality, Performance" }
      ]
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Dance Competition Achievements
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            Celebrating our students' excellence and remarkable success in prestigious dance competitions across Asia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {competitions.map((competition, index) => {
            const IconComponent = competition.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4 text-center">
                    {competition.title}
                  </h3>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary mb-2">Key Highlights:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {competition.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary mb-2">Notable Results:</h4>
                    <div className="space-y-2">
                      {competition.results.slice(0, 4).map((result, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-medium text-primary">{result.placement}</span>
                          <span className="text-gray-600"> - {result.name}</span>
                          {result.category && (
                            <div className="text-xs text-gray-500 ml-2">{result.category}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default AchievementsSection;