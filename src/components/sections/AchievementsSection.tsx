import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Medal, Star, Calendar, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const AchievementsSection = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  
  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const achievements = [
    {
      icon: Trophy,
      title: "1st Place Awards",
      results: [
        { name: "Xin En", placement: "1st", category: "My First Solo Commercial (Jazz + Hip-Hop) Teen (13-14) - GTB 2025" },
        { name: "Elysia Low", placement: "1st", category: "Intermediate Any Style of Tap Solo (14&U) - GTB 2025" },
        { name: "Leocadie Pochat", placement: "1st", category: "Beginner Theatrical Solo Pre Junior (9-10) - GTB 2025" },
        { name: "Juliet Yap", placement: "1st", category: "Intermediate Demi Character Solo (10&U) - GTB 2025" },
        { name: "Kayla Soo", placement: "1st", category: "Intermediate Demi Character Solo (15&U) - GTB 2025" },
        { name: "Lyra Goh", placement: "1st", category: "Intermediate Demi Character Solo (13&U) - GTB 2025" },
        { name: "Caley Toh", placement: "1st", category: "Intermediate Demi Character Solo (16-20) - GTB 2025" },
        { name: "Eliana Goh", placement: "1st", category: "Intermediate Ballet Solo (15&U) - GTB 2025" },
        { name: "Summer Palace", placement: "1st", category: "Group 12&U Any Other Style Large - GTB 2025" },
        { name: "Salute", placement: "1st", category: "Group 12&U Tap Large - GTB 2025" },
        { name: "Dolls", placement: "1st & Gala", category: "Group 10&U Classical Large - GTB 2025" },
        { name: "Chinese Tea", placement: "1st", category: "Group 15&U Tap Large - GTB 2025" },
        { name: "Arabian", placement: "1st & Gala", category: "Group 15&U Any Other Style Large - GTB 2025" },
        { name: "Snowflakes", placement: "1st", category: "Group Open Age Classical Large - GTB 2025" },
        { name: "Group Any Other Style (6&U)", placement: "1st", category: "Group Competition - GTB 2024" },
        { name: "Melanie Ng", placement: "1st", category: "Intermediate Open Solo (15&U) - GTB 2024" },
        { name: "Elysia Low", placement: "1st", category: "Intermediate Tap Solo 13&U - GTB 2024" },
        { name: "Group Classical Big Group Open", placement: "1st", category: "Group Competition - GTB 2024" },
        { name: "Group Any Other Style 13&U", placement: "1st", category: "Group Competition - SRC CSTD 2024" },
        { name: "Group Acrobatics, Tap, Musical Theatre Open", placement: "1st", category: "Group Competition - SRC CSTD 2024" },
        { name: "Group (Open Age Classical)", placement: "1st", category: "Group Competition - GTB 2023" },
        { name: "Groups 13&U Jazz", placement: "1st", category: "Group Competition - SRC CSTD 2023" },
        { name: "Alexandria", placement: "1st", category: "Lyrical Solo Novice 15&U - SRC CSTD 2023" },
        { name: "Group (12&U Jazz)", placement: "1st", category: "Group Competition - GTB 2022" },
        { name: "Group (Open Any Other Style)", placement: "1st", category: "Group Competition - GTB 2022" },
        { name: "Group Open Age Lyrical", placement: "1st", category: "Group Competition - Singapore Cup Challenge 2022" }
      ]
    },
    {
      icon: Medal,
      title: "2nd Place Awards",
      results: [
        { name: "Ashleigh Zhan", placement: "2nd", category: "Intermediate Open Solo (14&U) - GTB 2025" },
        { name: "Sasha Lai", placement: "2nd", category: "Beginner Theatrical Solo Teen (13-14) - GTB 2025" },
        { name: "Ally Patt", placement: "2nd", category: "Intermediate Demi Character Solo (15&U) - GTB 2025" },
        { name: "Abigail Lim", placement: "2nd", category: "Beginner Classical Solo Teen (13-14) - GTB 2025" },
        { name: "Mini Mouse", placement: "2nd & Gala", category: "Group 6&U Jazz Large - GTB 2025" },
        { name: "Spoonful of Sugar", placement: "2nd", category: "Group 8&U Any Other Style Large - GTB 2025" },
        { name: "Beauty and the Beast", placement: "2nd", category: "Group 8&U Classical Large - GTB 2025" },
        { name: "Mai Pen Rai", placement: "2nd", category: "Group 15&U Any Other Style Large - GTB 2025" },
        { name: "Waltz of the Flowers", placement: "2nd", category: "Group Open Age Classical Large - GTB 2025" },
        { name: "Group Any Other Style 8&U", placement: "2nd", category: "Group Competition - GTB 2024" },
        { name: "Juliet Lee", placement: "2nd", category: "Intermediate Tap Solo 15&U - GTB 2024" },
        { name: "Group 6&U", placement: "2nd", category: "Group Competition - APDC Bangkok 2024" },
        { name: "Group 8&U Jazz", placement: "2nd", category: "Group Competition - APDC Bangkok 2024" },
        { name: "Group Open Lyrical/Ballet", placement: "2nd", category: "Group Competition - APDC Bangkok 2024" },
        { name: "Group Classical/Lyrical Open", placement: "2nd", category: "Group Competition - SRC CSTD 2024" },
        { name: "Group (Open Age Classical)", placement: "2nd", category: "Group Competition - GTB 2023" },
        { name: "Groups (Open Age Lyrical)", placement: "2nd", category: "Group Competition - GTB 2023" },
        { name: "Groups Open Age Lyrical and Classical", placement: "2nd", category: "Group Competition - SRC CSTD 2023" },
        { name: "Ashleigh Zhan", placement: "2nd", category: "National Solo 11&U - SRC CSTD 2023" },
        { name: "Eliana Goh", placement: "2nd", category: "Lyrical Solo Novice 15&U - SRC CSTD 2023" },
        { name: "Angela Yang", placement: "2nd", category: "My First Solo (20+ yrs Open) - GTB 2022" }
      ]
    },
    {
      icon: Award,
      title: "3rd Place Awards",
      results: [
        { name: "Sasha Lai", placement: "3rd", category: "My First Solo Slow Modern Teen (13-14) - GTB 2025" },
        { name: "Julia Ong", placement: "3rd", category: "Beginner Classical Solo Senior (15-19) - GTB 2025" },
        { name: "Shanice Tan", placement: "3rd", category: "Beginner Classical Solo Teen (13-14) - GTB 2025" },
        { name: "Shermaine Lee + Cheyanne Lim", placement: "3rd", category: "Duo/Trio Any Other Styles Senior (15-19) - GTB 2025" },
        { name: "Minions", placement: "3rd", category: "Group 6&U Jazz Small - GTB 2025" },
        { name: "Sweets", placement: "3rd", category: "Group 6&U Jazz Large - GTB 2025" },
        { name: "Love the Memory", placement: "3rd", category: "Group 10&U Lyrical Large - GTB 2025" },
        { name: "Found Tonight", placement: "3rd", category: "Group 15&U Lyrical Small - GTB 2025" },
        { name: "Learning to Fly", placement: "3rd", category: "Group Open Age Lyrical Small - GTB 2025" },
        { name: "Hot Chocolate", placement: "3rd", category: "Group Open Age Classical Large - GTB 2025" },
        { name: "Bastion", placement: "3rd", category: "Group Open Age Any Other Style Large - GTB 2025" },
        { name: "Candyman", placement: "3rd", category: "Group Open Age Jazz Large - GTB 2025" },
        { name: "Group 6&U Jazz", placement: "3rd", category: "Group Competition - SRC CSTD 2024" },
        { name: "Elysia Low", placement: "3rd", category: "Tap Novice Solo 14&U - SRC CSTD 2024" },
        { name: "Kayla Soo", placement: "3rd", category: "Demi Character Novice Solo 15&U - SRC CSTD 2024" },
        { name: "Groups (8&U Jazz)", placement: "3rd", category: "Group Competition - GTB 2023" },
        { name: "Groups (15&U Jazz)", placement: "3rd", category: "Group Competition - GTB 2023" },
        { name: "Shann Cheng", placement: "3rd", category: "Open Age Open Solo - GTB 2023" },
        { name: "Juliet Yap", placement: "3rd", category: "Solo (9&U Jazz) - GTB 2023" },
        { name: "Groups 7&U Jazz", placement: "3rd", category: "Group Competition - SRC CSTD 2023" },
        { name: "Shann Cheng", placement: "3rd", category: "Solo (14&U Open) - GTB 2022" },
        { name: "Chloe and Jade", placement: "3rd", category: "Duo/Trio Open Age Lyrical/Contemporary - GTB 2022" },
        { name: "Group 8&U Any Other Style", placement: "3rd", category: "Group Competition - GTB 2022" },
        { name: "Group 12&U Any Other Style", placement: "3rd", category: "Group Competition - GTB 2022" },
        { name: "Group (15&U Lyrical)", placement: "3rd", category: "Group Competition - GTB 2022" },
        { name: "Group (Open Lyrical)", placement: "3rd", category: "Group Competition - GTB 2022" }
      ]
    },
    {
      icon: Star,
      title: "4th & 5th Place Awards",
      results: [
        { name: "Grace Khaw", placement: "4th", category: "My First Solo Classical Pre Junior (9-10) - GTB 2025" },
        { name: "Vanessa Yew", placement: "4th", category: "Intermediate Jazz Solo (14&U) - GTB 2025" },
        { name: "Edna Chew", placement: "4th", category: "My First Solo Commercial Mini (0-6) - GTB 2025" },
        { name: "Precia Kum", placement: "4th", category: "Intermediate Ballet Solo (11&U) - GTB 2025" },
        { name: "Jessie", placement: "4th", category: "Group 6&U Jazz Small - GTB 2025" },
        { name: "Abigail Lim", placement: "5th", category: "My First Solo Slow Modern Teen (13-14) - GTB 2025" },
        { name: "Clarabelle Lim", placement: "5th", category: "My First Solo Slow Modern Senior (15-19) - GTB 2025" },
        { name: "Wai Ting", placement: "5th", category: "My First Solo Commercial Petite (7-8) - GTB 2025" },
        { name: "Leocadie Pochat", placement: "5th", category: "Beginner Slow Modern Solo Pre Junior (9-10) - GTB 2025" },
        { name: "Tessa Lam", placement: "5th", category: "Beginner Slow Modern Solo Teen (13-14) - GTB 2025" },
        { name: "Gretchen Lee", placement: "5th", category: "Beginner Slow Modern Solo Junior (11-12) - GTB 2025" },
        { name: "Sophia Choudhury", placement: "5th", category: "Beginner Classical Solo Teen (13-14) - GTB 2025" },
        { name: "Gretchen Lee", placement: "5th", category: "Beginner Classical Solo Junior (11-12) - GTB 2025" },
        { name: "Dora Lam", placement: "5th", category: "Intermediate Ballet Solo (16-20) - GTB 2025" },
        { name: "Ella Toh", placement: "5th", category: "Intermediate Ballet Solo (12&U) - GTB 2025" },
        { name: "Gretchen Lee", placement: "4th", category: "My First Solo Junior (11-12) - GTB 2024" },
        { name: "Claire Lee", placement: "5th", category: "Beginner Theatrical Jun 11-12 - GTB 2024" },
        { name: "Dora Lam", placement: "5th", category: "Intermediate Open Solo (16-20) - GTB 2024" },
        { name: "Melanie Ng", placement: "4th", category: "Intermediate Ballet Solo 15&U - GTB 2024" },
        { name: "Group Any Other Style Open", placement: "5th", category: "Group Competition - GTB 2024" },
        { name: "Groups (7&U Jazz)", placement: "4th", category: "Group Competition - GTB 2023" },
        { name: "Groups 7&U Jazz", placement: "4th", category: "Group Competition - SRC CSTD 2023" },
        { name: "Ashley Tan", placement: "5th", category: "My First Solo Teen (13-14) - GTB 2022" },
        { name: "Ashleigh Zhan", placement: "5th", category: "Solo (11&U Open) - GTB 2022" },
        { name: "Eliana Goh", placement: "4th", category: "Solo (12&U Lyrical) - GTB 2022" }
      ]
    },
    {
      icon: Users,
      title: "Special Recognition & Awards",
      results: [
        { name: "Nakshathra Sandilya", placement: <>Outstanding Group<br/>Dancer Award</>, category: "GTB 2025" },
        { name: "Julia Ong", placement: "Honorable Mention", category: "My First Solo Slow Modern Senior (15-19) - GTB 2025" },
        { name: "Group Any Other Style 12&U", placement: "Judges Choice Award", category: "GTB 2024" },
        { name: "Group Any Other Style 12&U", placement: "Gala Finalist", category: "GTB 2024" },
        { name: "Group Any Other Style 12&U", placement: <>Judges Award<br/>for Choreography</>, category: "GTB 2024" },
        { name: "Group Open Contemporary", placement: "Honorable Mention", category: "APDC Bangkok 2024" },
        { name: "Group 8&U Jazz", placement: "Honorable Mention", category: "APDC Bangkok 2024" },
        { name: "Group 13&U Jazz", placement: "Honorable Mention", category: "SRC CSTD 2024" },
        { name: "Juliet Yap", placement: "Honorable Mention", category: "Jazz Novice Solo 10&U - SRC CSTD 2024" },
        { name: "Special Award", placement: "Judges Choice Award", category: "GTB 2022" },
        { name: "Special Award", placement: "Gala Finalist", category: "GTB 2022" },
        { name: "Special Award", placement: <>Judges Award for<br/>Musicality and Performance</>, category: "GTB 2022" },
        { name: "2020 Chingay", placement: "Most Lively Contingent Award", category: "Cultural Showcase" },
        { name: "2021-2025 Chingay", placement: "Annual Performances", category: "Cultural Showcase" },
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
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const isExpanded = expandedCards.includes(index);
            const initialDisplayCount = 4; // Show first 4 awards initially
            const displayedResults = isExpanded 
              ? achievement.results 
              : achievement.results.slice(0, initialDisplayCount);
            const hasMoreResults = achievement.results.length > initialDisplayCount;

            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4 text-center">
                    {achievement.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {displayedResults.map((result, idx) => (
                      <div key={idx} className="text-sm border-b border-gray-100 pb-2">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-primary">
                            {typeof result.placement === 'string' && result.placement === 'Honorable Mention' ? (
                              <>
                                <span className="md:hidden">Honorable Mention</span>
                                <span className="hidden md:block">Honorable<br/>Mention</span>
                              </>
                            ) : (
                              result.placement
                            )}
                          </span>
                          <span className="text-gray-600 flex-1 ml-2">{result.name}</span>
                        </div>
                        {result.category && (
                          <div className="text-xs text-gray-500 mt-1">{result.category}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {hasMoreResults && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleCard(index)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors duration-200"
                      >
                        {isExpanded ? (
                          <>
                            Show Less
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Show More
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
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