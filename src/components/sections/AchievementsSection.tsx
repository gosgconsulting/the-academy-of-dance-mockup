import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Medal, Star, Calendar, Users } from "lucide-react";

const AchievementsSection = () => {
  const competitions = [
    {
      icon: Trophy,
      title: "Get The Beat (GTB) 2025",
      highlights: [
        "Outstanding Group Dancer Award: Nakshathra Sandilya",
        "Multiple Group 1st Place wins with Gala performances",
        "Exceptional solo performances across all age categories"
      ],
      results: [
        { name: "Xin En", placement: "1st", category: "My First Solo Commercial Teen (13-14)" },
        { name: "Leocadie Pochat", placement: "1st", category: "Beginner Theatrical Pre Junior (9-10)" },
        { name: "Elysia Low", placement: "1st", category: "Intermediate Any Style Tap Solo (14&U)" },
        { name: "Juliet Yap", placement: "1st", category: "Intermediate Demi Character Solo (10&U)" },
        { name: "Kayla Soo", placement: "1st", category: "Intermediate Demi Character Solo (15&U)" },
        { name: "Lyra Goh", placement: "1st", category: "Intermediate Demi Character Solo (13&U)" },
        { name: "Caley Toh", placement: "1st", category: "Intermediate Demi Character Solo (16-20)" },
        { name: "Eliana Goh", placement: "1st", category: "Intermediate Ballet Solo (15&U)" },
        { name: "Summer Palace", placement: "1st", category: "Group 12&U Any Other Style Large" },
        { name: "Salute", placement: "1st", category: "Group 12&U Tap Large" },
        { name: "Dolls", placement: "1st & Gala", category: "Group 10&U Classical Large" },
        { name: "Chinese Tea", placement: "1st", category: "Group 15&U Tap Large" },
        { name: "Arabian", placement: "1st & Gala", category: "Group 15&U Any Other Style Large" },
        { name: "Snowflakes", placement: "1st", category: "Group Open Age Classical Large" }
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
        { name: "Group Any Other Style (6&U)", placement: "1st", category: "Young Age" },
        { name: "Gretchen Lee", placement: "4th", category: "My First Solo Junior (11-12)" },
        { name: "Intermediate Tap Solo 15&U", placement: "2nd", category: "Juliet Lee" },
        { name: "Group Any Other Style 8&U", placement: "2nd", category: "Young Age" },
        { name: "Group Any Other Style 12&U", placement: "Judges Choice Award, Gala Finalist", category: "Junior Age" }
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
        { name: "Group 8&U Jazz", placement: "2nd, Honorable Mention", category: "Junior Category" },
        { name: "Group Open Lyrical/Ballet", placement: "2nd", category: "Open Age" },
        { name: "Group Open Contemporary", placement: "Honorable Mention", category: "Open Age" }
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
        { name: "Group Classical/Lyrical Open", placement: "2nd", category: "Open Age" },
        { name: "Group 6&U Jazz", placement: "3rd", category: "Young Age" },
        { name: "Elysia Low", placement: "3rd", category: "Tap Novice Solo 14&U" },
        { name: "Kayla Soo", placement: "3rd", category: "Demi Character Novice Solo 15&U" }
      ]
    },
    {
      icon: Trophy,
      title: "Get The Beat (GTB) 2023",
      highlights: [
        "Multiple 1st Place Group wins",
        "Strong performance in Open Age Classical",
        "Excellent solo competition results"
      ],
      results: [
        { name: "Group Open Age Classical", placement: "1st and 2nd", category: "Open Age" },
        { name: "Groups Open Age Lyrical", placement: "2nd", category: "Open Age" },
        { name: "Shann Cheng", placement: "3rd", category: "Open Age Open Solo" },
        { name: "Juliet Yap", placement: "3rd", category: "Solo 9&U Jazz" },
        { name: "Groups 8&U Jazz", placement: "3rd", category: "Junior Age" },
        { name: "Groups 15&U Jazz", placement: "3rd", category: "Teen Age" }
      ]
    },
    {
      icon: Medal,
      title: "Singapore Regional Competitions (SRC) CSTD 2023",
      highlights: [
        "1st Place in Groups 13&U Jazz",
        "Strong performances across age groups",
        "Multiple podium finishes"
      ],
      results: [
        { name: "Groups 13&U Jazz", placement: "1st", category: "Teen Division" },
        { name: "Groups Open Age Lyrical and Classical", placement: "2nd", category: "Open Age" },
        { name: "Ashleigh Zhan", placement: "2nd", category: "National Solo 11&U" },
        { name: "Alexandria", placement: "1st", category: "Lyrical Solo Novice 15&U" },
        { name: "Eliana Goh", placement: "2nd", category: "Lyrical Solo Novice 15&U" },
        { name: "Groups 7&U Jazz", placement: "3rd, 4th", category: "Young Age" }
      ]
    },
    {
      icon: Award,
      title: "Get The Beat (GTB) 2022",
      highlights: [
        "Judges Choice Award & Gala Finalist",
        "Judges Award for Musicality and Performance",
        "Multiple 1st Place Group wins"
      ],
      results: [
        { name: "Ashley Tan", placement: "5th", category: "My First Solo Teen (13-14)" },
        { name: "Angela Yang", placement: "2nd", category: "My First Solo (20+ yrs Open)" },
        { name: "Shann Cheng", placement: "3rd", category: "Solo (14&U Open)" },
        { name: "Chloe and Jade", placement: "3rd", category: "Duo/Trio Open Age Lyrical/Contemporary" },
        { name: "Group 12&U Jazz", placement: "1st", category: "Junior Age" },
        { name: "Group Open Any Other Style", placement: "1st", category: "Open Age" },
        { name: "Group Open Lyrical", placement: "3rd", category: "Open Age" },
        { name: "Group 8&U Any Other Style", placement: "3rd", category: "Young Age" }
      ]
    },
    {
      icon: Star,
      title: "Singapore Cup Challenge 2022",
      highlights: [
        "1st Place in Group Open Age Lyrical",
        "Strong competition performance",
        "Excellent group choreography"
      ],
      results: [
        { name: "Group Open Age Lyrical", placement: "1st", category: "Open Age" }
      ]
    },
    {
      icon: Calendar,
      title: "Chingay Parade Performances",
      highlights: [
        "Most Lively Contingent Award Winner (2020)",
        "Consistent annual participation (2020-2025)",
        "Showcasing Singapore's cultural diversity"
      ],
      results: [
        { name: "2020 Performance", placement: "Most Lively Contingent Award", category: "Special Recognition" },
        { name: "2021 Performance", placement: "Performed", category: "Cultural Showcase" },
        { name: "2022 Performance", placement: "Performed", category: "Cultural Showcase" },
        { name: "2023 Performance", placement: "Performed", category: "Cultural Showcase" },
        { name: "2024 Performance", placement: "Performed", category: "Cultural Showcase" },
        { name: "2025 Performance", placement: "Performed", category: "Cultural Showcase" }
      ]
    },
    {
      icon: Users,
      title: "National Day Parade 2025",
      highlights: [
        "Selected for National Day Parade 2025",
        "Prestigious national platform representation",
        "Pride of Singapore's dance community"
      ],
      results: [
        { name: "2025 National Day Parade", placement: "Performing", category: "National Celebration" }
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