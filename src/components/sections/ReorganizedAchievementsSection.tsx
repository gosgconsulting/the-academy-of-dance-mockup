import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Star, Crown } from "lucide-react";
import { useState } from "react";

const ReorganizedAchievementsSection = () => {
  const [expandedPlacement, setExpandedPlacement] = useState<string | null>(null);

  // Reorganize all achievements by placement
  const achievementsByPlacement = {
    "1st": [
      { name: "Xin En", category: "My First Solo Commercial (Jazz + Hip-Hop) Teen (13-14)", competition: "GTB 2025" },
      { name: "Elysia Low", category: "Intermediate Any Style of Tap Solo (14&U)", competition: "GTB 2025" },
      { name: "Leocadie Pochat", category: "Beginner Theatrical Solo Pre Junior (9-10)", competition: "GTB 2025" },
      { name: "Juliet Yap", category: "Intermediate Demi Character Solo (10&U)", competition: "GTB 2025" },
      { name: "Kayla Soo", category: "Intermediate Demi Character Solo (15&U)", competition: "GTB 2025" },
      { name: "Lyra Goh", category: "Intermediate Demi Character Solo (13&U)", competition: "GTB 2025" },
      { name: "Caley Toh", category: "Intermediate Demi Character Solo (16-20)", competition: "GTB 2025" },
      { name: "Eliana Goh", category: "Intermediate Ballet Solo (15&U)", competition: "GTB 2025" },
      { name: "Summer Palace", category: "Group 12&U Any Other Style Large", competition: "GTB 2025" },
      { name: "Salute", category: "Group 12&U Tap Large", competition: "GTB 2025" },
      { name: "Dolls", category: "Group 10&U Classical Large & Gala", competition: "GTB 2025" },
      { name: "Chinese Tea", category: "Group 15&U Tap Large", competition: "GTB 2025" },
      { name: "Arabian", category: "Group 15&U Any Other Style Large & Gala", competition: "GTB 2025" },
      { name: "Snowflakes", category: "Group Open Age Classical Large", competition: "GTB 2025" },
      { name: "Melanie Ng", category: "Intermediate Open Solo (15&U)", competition: "GTB 2024" },
      { name: "Elysia Low", category: "Intermediate Tap Solo 13&U", competition: "GTB 2024" },
      { name: "Group Classical Big Group Open", category: "Group Competition", competition: "GTB 2024" },
      { name: "Group Any Other Style (6&U)", category: "Group Competition", competition: "GTB 2024" },
      { name: "Group Any Other Style 13&U", category: "Group Competition", competition: "SRC CSTD 2024" },
      { name: "Group Acrobatics, Tap, Musical Theatre Open", category: "Group Competition", competition: "SRC CSTD 2024" },
      { name: "Group (Open Age Classical)", category: "Group Competition", competition: "GTB 2023" },
      { name: "Groups 13&U Jazz", category: "Group Competition", competition: "SRC CSTD 2023" },
      { name: "Alexandria", category: "Lyrical Solo Novice 15&U", competition: "SRC CSTD 2023" },
      { name: "Group (12&U Jazz)", category: "Group Competition", competition: "GTB 2022" },
      { name: "Group (Open Any Other Style)", category: "Group Competition", competition: "GTB 2022" },
      { name: "Group Open Age Lyrical", category: "Group Competition", competition: "Singapore Cup 2022" }
    ],
    "2nd": [
      { name: "Ashleigh Zhan", category: "Intermediate Open Solo (14&U)", competition: "GTB 2025" },
      { name: "Sasha Lai", category: "Beginner Theatrical Solo Teen (13-14)", competition: "GTB 2025" },
      { name: "Ally Patt", category: "Intermediate Demi Character Solo (15&U)", competition: "GTB 2025" },
      { name: "Abigail Lim", category: "Beginner Classical (Ballet + Demi) Solo Teen (13-14)", competition: "GTB 2025" },
      { name: "Mini Mouse", category: "Group 6&U Jazz Large & Gala", competition: "GTB 2025" },
      { name: "Spoonful of Sugar", category: "Group 8&U Any Other Style Large", competition: "GTB 2025" },
      { name: "Beauty and the Beast", category: "Group 8&U Classical Large", competition: "GTB 2025" },
      { name: "Mai Pen Rai", category: "Group 15&U Any Other Style Large", competition: "GTB 2025" },
      { name: "Waltz of the Flowers", category: "Group Open Age Classical Large", competition: "GTB 2025" },
      { name: "Angela Yang", category: "My First Solo (20+ yrs Open)", competition: "GTB 2022" },
      { name: "Juliet Lee", category: "Intermediate Tap Solo 15&U", competition: "GTB 2024" },
      { name: "Group Any Other Style 8&U", category: "Group Competition", competition: "GTB 2024" },
      { name: "Group Classical/Lyrical Open", category: "Group Competition", competition: "SRC CSTD 2024" },
      { name: "Group 6&U", category: "Group Competition", competition: "APDC Bangkok 2024" },
      { name: "Group 8&U Jazz", category: "Group Competition", competition: "APDC Bangkok 2024" },
      { name: "Group Open Lyrical/Ballet", category: "Group Competition", competition: "APDC Bangkok 2024" },
      { name: "Group (Open Age Classical)", category: "Group Competition", competition: "GTB 2023" },
      { name: "Groups (Open Age Lyrical)", category: "Group Competition", competition: "GTB 2023" },
      { name: "Groups Open Age Lyrical and Classical", category: "Group Competition", competition: "SRC CSTD 2023" },
      { name: "Ashleigh Zhan", category: "National Solo 11&U", competition: "SRC CSTD 2023" },
      { name: "Eliana Goh", category: "Lyrical Solo Novice 15&U", competition: "SRC CSTD 2023" }
    ],
    "3rd": [
      { name: "Sasha Lai", category: "My First Solo Slow Modern Teen (13-14)", competition: "GTB 2025" },
      { name: "Julia Ong", category: "Beginner Classical (Ballet + Demi) Solo Senior (15-19)", competition: "GTB 2025" },
      { name: "Shanice Tan", category: "Beginner Classical (Ballet + Demi) Solo Teen (13-14)", competition: "GTB 2025" },
      { name: "Shermaine Lee + Cheyanne Lim", category: "Duo/Trio Any Other Styles Senior (15-19)", competition: "GTB 2025" },
      { name: "Minions", category: "Group 6&U Jazz Small", competition: "GTB 2025" },
      { name: "Sweets", category: "Group 6&U Jazz Large", competition: "GTB 2025" },
      { name: "Love the Memory", category: "Group 10&U Lyrical Large", competition: "GTB 2025" },
      { name: "Found Tonight", category: "Group 15&U Lyrical Small", competition: "GTB 2025" },
      { name: "Learning to Fly", category: "Group Open Age Lyrical Small", competition: "GTB 2025" },
      { name: "Hot Chocolate", category: "Group Open Age Classical Large", competition: "GTB 2025" },
      { name: "Bastion", category: "Group Open Age Any Other Style Large", competition: "GTB 2025" },
      { name: "Candyman", category: "Group Open Age Jazz Large", competition: "GTB 2025" },
      { name: "Shann Cheng", category: "Solo (14&U Open)", competition: "GTB 2022" },
      { name: "Chloe and Jade", category: "Duo/Trio Open Age Lyrical/Contemporary", competition: "GTB 2022" },
      { name: "Group 8&U Any Other Style", category: "Group Competition", competition: "GTB 2022" },
      { name: "Group 12&U Any Other Style", category: "Group Competition", competition: "GTB 2022" },
      { name: "Group (15&U Lyrical)", category: "Group Competition", competition: "GTB 2022" },
      { name: "Group (Open Lyrical)", category: "Group Competition", competition: "GTB 2022" },
      { name: "Group 6&U Jazz", category: "Group Competition", competition: "SRC CSTD 2024" },
      { name: "Elysia Low", category: "Tap Novice Solo 14&U", competition: "SRC CSTD 2024" },
      { name: "Kayla Soo", category: "Demi Character Novice Solo 15&U", competition: "SRC CSTD 2024" },
      { name: "Groups (8&U Jazz)", category: "Group Competition", competition: "GTB 2023" },
      { name: "Groups (15&U Jazz)", category: "Group Competition", competition: "GTB 2023" },
      { name: "Shann Cheng", category: "Open Age Open Solo", competition: "GTB 2023" },
      { name: "Juliet Yap", category: "Solo (9&U Jazz)", competition: "GTB 2023" },
      { name: "Groups 7&U Jazz", category: "Group Competition", competition: "SRC CSTD 2023" }
    ],
    "4th": [
      { name: "Grace Khaw", category: "My First Solo Classical Pre Junior (9-10)", competition: "GTB 2025" },
      { name: "Vanessa Yew", category: "Intermediate Jazz Solo (14&U)", competition: "GTB 2025" },
      { name: "Edna Chew", category: "My First Solo Commercial Mini (0-6)", competition: "GTB 2025" },
      { name: "Precia Kum", category: "Intermediate Ballet Solo (11&U)", competition: "GTB 2025" },
      { name: "Jessie", category: "Group 6&U Jazz Small", competition: "GTB 2025" },
      { name: "Gretchen Lee", category: "My First Solo Junior (11-12)", competition: "GTB 2024" },
      { name: "Melanie Ng", category: "Intermediate Ballet Solo 15&U", competition: "GTB 2024" },
      { name: "Groups (7&U Jazz)", category: "Group Competition", competition: "GTB 2023" },
      { name: "Groups 7&U Jazz", category: "Group Competition", competition: "SRC CSTD 2023" },
      { name: "Eliana Goh", category: "Solo (12&U Lyrical)", competition: "GTB 2022" }
    ],
    "5th": [
      { name: "Abigail Lim", category: "My First Solo Slow Modern Teen (13-14)", competition: "GTB 2025" },
      { name: "Clarabelle Lim", category: "My First Solo Slow Modern Senior (15-19)", competition: "GTB 2025" },
      { name: "Wai Ting", category: "My First Solo Commercial Petite (7-8)", competition: "GTB 2025" },
      { name: "Leocadie Pochat", category: "Beginner Slow Modern Solo Pre Junior (9-10)", competition: "GTB 2025" },
      { name: "Tessa Lam", category: "Beginner Slow Modern Solo Teen (13-14)", competition: "GTB 2025" },
      { name: "Gretchen Lee", category: "Beginner Slow Modern Solo Junior (11-12)", competition: "GTB 2025" },
      { name: "Sophia Choudhury", category: "Beginner Classical Solo Teen (13-14)", competition: "GTB 2025" },
      { name: "Gretchen Lee", category: "Beginner Classical Solo Junior (11-12)", competition: "GTB 2025" },
      { name: "Dora Lam", category: "Intermediate Ballet Solo (16-20)", competition: "GTB 2025" },
      { name: "Ella Toh", category: "Intermediate Ballet Solo (12&U)", competition: "GTB 2025" },
      { name: "Claire Lee", category: "Beginner Theatrical Jun 11-12", competition: "GTB 2024" },
      { name: "Dora Lam", category: "Intermediate Open Solo (16-20)", competition: "GTB 2024" },
      { name: "Group Any Other Style Open", category: "Group Competition", competition: "GTB 2024" },
      { name: "Ashley Tan", category: "My First Solo Teen (13-14)", competition: "GTB 2022" },
      { name: "Ashleigh Zhan", category: "Solo (11&U Open)", competition: "GTB 2022" }
    ],
    "Special Awards": [
      { name: "Nakshathra Sandilya", category: "Outstanding Group Dancer Award", competition: "GTB 2025" },
      { name: "Julia Ong", category: "Honorable Mention - My First Solo Slow Modern Senior", competition: "GTB 2025" },
      { name: "Group Any Other Style 12&U", category: "Judges Choice Award", competition: "GTB 2024" },
      { name: "Group Any Other Style 12&U", category: "Gala Finalist", competition: "GTB 2024" },
      { name: "Group Any Other Style 12&U", category: "Judges Award for Choreography", competition: "GTB 2024" },
      { name: "Group Open Contemporary", category: "Honorable Mention", competition: "APDC Bangkok 2024" },
      { name: "Group 8&U Jazz", category: "Honorable Mention", competition: "APDC Bangkok 2024" },
      { name: "Group 13&U Jazz", category: "Honorable Mention", competition: "SRC CSTD 2024" },
      { name: "Juliet Yap", category: "Honorable Mention - Jazz Novice Solo 10&U", competition: "SRC CSTD 2024" },
      { name: "Special Award", category: "Judges Choice Award", competition: "GTB 2022" },
      { name: "Special Award", category: "Gala Finalist", competition: "GTB 2022" },
      { name: "Special Award", category: "Judges Award for Musicality and Performance", competition: "GTB 2022" },
      { name: "2020 Performance", category: "Most Lively Contingent Award - Chingay Parade", competition: "Special Recognition" },
      { name: "2025 National Day Parade", category: "Performing", competition: "National Celebration" }
    ]
  };

  const togglePlacement = (placement: string) => {
    setExpandedPlacement(expandedPlacement === placement ? null : placement);
  };

  const getPlacementColor = (placement: string) => {
    switch (placement) {
      case "1st": return "text-stat-4 border-stat-4/20";
      case "2nd": return "text-stat-1 border-stat-1/20";
      case "3rd": return "text-stat-2 border-stat-2/20";
      case "4th": return "text-stat-3 border-stat-3/20";
      case "5th": return "text-primary border-primary/20";
      case "Special Awards": return "text-secondary border-secondary/20";
      default: return "text-gray-600 border-gray-200";
    }
  };

  const getPlacementIcon = (placement: string) => {
    switch (placement) {
      case "1st": return Crown;
      case "2nd": return Trophy;
      case "3rd": return Medal;
      case "Special Awards": return Star;
      default: return Trophy;
    }
  };

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Competition Excellence
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            Our students' remarkable achievements organized by placement rankings across prestigious dance competitions.
          </p>
        </div>

        <div className="space-y-6 max-w-6xl mx-auto">
          {Object.entries(achievementsByPlacement).map(([placement, achievements]) => {
            const isExpanded = expandedPlacement === placement;
            const displayedAchievements = isExpanded ? achievements : achievements.slice(0, 6);
            const hasMore = achievements.length > 6;
            const colorClass = getPlacementColor(placement);
            const IconComponent = getPlacementIcon(placement);

            return (
              <Card key={placement} className={`border-2 ${colorClass} bg-card-vibrant hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-current/10`}>
                        <IconComponent className={`w-8 h-8 ${colorClass.split(' ')[0]}`} />
                      </div>
                      <div>
                        <h3 className={`font-playfair text-3xl font-bold ${colorClass.split(' ')[0]}`}>
                          {placement} Place
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {achievements.length} achievement{achievements.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    {hasMore && (
                      <button
                        onClick={() => togglePlacement(placement)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${colorClass.split(' ')[0]} bg-current/10 hover:bg-current/20`}
                      >
                        {isExpanded ? 'Show Less' : 'Show All'}
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedAchievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-white/50 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                      >
                        <h4 className={`font-semibold ${colorClass.split(' ')[0]} mb-2`}>
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-gray-700 mb-1">
                          {achievement.category}
                        </p>
                        <p className="text-xs text-gray-500">
                          {achievement.competition}
                        </p>
                      </div>
                    ))}
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

export default ReorganizedAchievementsSection;