import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Medal, Star, ChevronDown, ChevronUp } from "lucide-react";
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

  // All achievements data combined
  const allResults = [
    // GTB 2025
    { name: "Xin En", placement: "1st", category: "Commercial Jazz/Hip-Hop Teen", year: "GTB 2025" },
    { name: "Elysia Low", placement: "1st", category: "Tap Solo (14&U)", year: "GTB 2025" },
    { name: "Leocadie Pochat", placement: "1st", category: "Theatrical Solo Pre Junior", year: "GTB 2025" },
    { name: "Juliet Yap", placement: "1st", category: "Demi Character Solo (10&U)", year: "GTB 2025" },
    { name: "Kayla Soo", placement: "1st", category: "Demi Character Solo (15&U)", year: "GTB 2025" },
    { name: "Lyra Goh", placement: "1st", category: "Demi Character Solo (13&U)", year: "GTB 2025" },
    { name: "Caley Toh", placement: "1st", category: "Demi Character Solo (16-20)", year: "GTB 2025" },
    { name: "Eliana Goh", placement: "1st", category: "Ballet Solo (15&U)", year: "GTB 2025" },
    { name: "Summer Palace", placement: "1st", category: "Group Any Other Style Large", year: "GTB 2025" },
    { name: "Salute", placement: "1st", category: "Group Tap Large", year: "GTB 2025" },
    { name: "Dolls", placement: "1st & Gala", category: "Group Classical Large", year: "GTB 2025" },
    { name: "Chinese Tea", placement: "1st", category: "Group Tap Large", year: "GTB 2025" },
    { name: "Arabian", placement: "1st & Gala", category: "Group Any Other Style Large", year: "GTB 2025" },
    { name: "Snowflakes", placement: "1st", category: "Group Classical Large", year: "GTB 2025" },
    
    // GTB 2024
    { name: "Melanie Ng", placement: "1st", category: "Open Solo (15&U)", year: "GTB 2024" },
    { name: "Elysia Low", placement: "1st", category: "Tap Solo (13&U)", year: "GTB 2024" },
    { name: "Group Any Other Style (6&U)", placement: "1st", category: "Group Competition", year: "GTB 2024" },
    { name: "Group Classical Big Group Open", placement: "1st", category: "Group Competition", year: "GTB 2024" },
    
    // SRC CSTD 2024
    { name: "Group Any Other Style 13&U", placement: "1st", category: "Group Competition", year: "SRC 2024" },
    { name: "Group Acrobatics/Tap/Musical Theatre Open", placement: "1st", category: "Group Competition", year: "SRC 2024" },
    
    // GTB 2023
    { name: "Group (Open Age Classical)", placement: "1st", category: "Group Competition", year: "GTB 2023" },
    
    // SRC CSTD 2023
    { name: "Groups 13&U Jazz", placement: "1st", category: "Group Competition", year: "SRC 2023" },
    { name: "Alexandria", placement: "1st", category: "Lyrical Solo Novice (15&U)", year: "SRC 2023" },
    
    // GTB 2022
    { name: "Group (12&U Jazz)", placement: "1st", category: "Group Competition", year: "GTB 2022" },
    { name: "Group (Open Any Other Style)", placement: "1st", category: "Group Competition", year: "GTB 2022" },
    
    // Singapore Cup 2022
    { name: "Group Open Age Lyrical", placement: "1st", category: "Group Competition", year: "Singapore Cup 2022" },
    
    // 2nd Place Awards
    { name: "Ashleigh Zhan", placement: "2nd", category: "Open Solo (14&U)", year: "GTB 2025" },
    { name: "Sasha Lai", placement: "2nd", category: "Theatrical Solo Teen", year: "GTB 2025" },
    { name: "Ally Patt", placement: "2nd", category: "Demi Character Solo (15&U)", year: "GTB 2025" },
    { name: "Abigail Lim", placement: "2nd", category: "Classical Solo Teen", year: "GTB 2025" },
    { name: "Mini Mouse", placement: "2nd & Gala", category: "Group Jazz Large", year: "GTB 2025" },
    { name: "Spoonful of Sugar", placement: "2nd", category: "Group Any Other Style Large", year: "GTB 2025" },
    { name: "Beauty and the Beast", placement: "2nd", category: "Group Classical Large", year: "GTB 2025" },
    { name: "Mai Pen Rai", placement: "2nd", category: "Group Any Other Style Large", year: "GTB 2025" },
    { name: "Waltz of the Flowers", placement: "2nd", category: "Group Classical Large", year: "GTB 2025" },
    { name: "Angela Yang", placement: "2nd", category: "My First Solo (20+)", year: "GTB 2022" },
    { name: "Juliet Lee", placement: "2nd", category: "Tap Solo (15&U)", year: "GTB 2024" },
    { name: "Group 8&U Any Other Style", placement: "2nd", category: "Group Competition", year: "GTB 2024" },
    { name: "Group 6&U", placement: "2nd", category: "Group Competition", year: "APDC Bangkok 2024" },
    { name: "Group 8&U Jazz", placement: "2nd", category: "Group Competition", year: "APDC Bangkok 2024" },
    { name: "Group Open Lyrical/Ballet", placement: "2nd", category: "Group Competition", year: "APDC Bangkok 2024" },
    { name: "Group Classical/Lyrical Open", placement: "2nd", category: "Group Competition", year: "SRC 2024" },
    { name: "Groups Open Age Lyrical and Classical", placement: "2nd", category: "Group Competition", year: "SRC 2023" },
    { name: "Ashleigh Zhan", placement: "2nd", category: "National Solo (11&U)", year: "SRC 2023" },
    { name: "Eliana Goh", placement: "2nd", category: "Lyrical Solo Novice (15&U)", year: "SRC 2023" },
    { name: "Group (Open Age Classical)", placement: "2nd", category: "Group Competition", year: "GTB 2023" },
    { name: "Groups (Open Age Lyrical)", placement: "2nd", category: "Group Competition", year: "GTB 2023" },
    
    // 3rd Place Awards
    { name: "Sasha Lai", placement: "3rd", category: "Slow Modern Teen", year: "GTB 2025" },
    { name: "Julia Ong", placement: "3rd", category: "Classical Solo Senior", year: "GTB 2025" },
    { name: "Shanice Tan", placement: "3rd", category: "Classical Solo Teen", year: "GTB 2025" },
    { name: "Shermaine Lee + Cheyanne Lim", placement: "3rd", category: "Duo/Trio Senior", year: "GTB 2025" },
    { name: "Minions", placement: "3rd", category: "Group Jazz Small", year: "GTB 2025" },
    { name: "Sweets", placement: "3rd", category: "Group Jazz Large", year: "GTB 2025" },
    { name: "Love the Memory", placement: "3rd", category: "Group Lyrical Large", year: "GTB 2025" },
    { name: "Found Tonight", placement: "3rd", category: "Group Lyrical Small", year: "GTB 2025" },
    { name: "Learning to Fly", placement: "3rd", category: "Group Lyrical Small", year: "GTB 2025" },
    { name: "Hot Chocolate", placement: "3rd", category: "Group Classical Large", year: "GTB 2025" },
    { name: "Bastion", placement: "3rd", category: "Group Any Other Style Large", year: "GTB 2025" },
    { name: "Candyman", placement: "3rd", category: "Group Jazz Large", year: "GTB 2025" },
    { name: "Shann Cheng", placement: "3rd", category: "Solo (14&U Open)", year: "GTB 2022" },
    { name: "Chloe and Jade", placement: "3rd", category: "Duo/Trio Lyrical/Contemporary", year: "GTB 2022" },
    { name: "Group 6&U Jazz", placement: "3rd", category: "Group Competition", year: "SRC 2024" },
    { name: "Elysia Low", placement: "3rd", category: "Tap Novice Solo (14&U)", year: "SRC 2024" },
    { name: "Kayla Soo", placement: "3rd", category: "Demi Character Novice Solo (15&U)", year: "SRC 2024" },
    { name: "Groups 7&U Jazz", placement: "3rd", category: "Group Competition", year: "SRC 2023" },
    { name: "Shann Cheng", placement: "3rd", category: "Open Age Open Solo", year: "GTB 2023" },
    { name: "Juliet Yap", placement: "3rd", category: "Solo (9&U Jazz)", year: "GTB 2023" },
    { name: "Groups (8&U Jazz)", placement: "3rd", category: "Group Competition", year: "GTB 2023" },
    { name: "Groups (15&U Jazz)", placement: "3rd", category: "Group Competition", year: "GTB 2023" },
    
    // Special Awards & Other Placements
    { name: "Nakshathra Sandilya", placement: "Outstanding Dancer", category: "Special Recognition", year: "GTB 2025" },
    { name: "Special Awards", placement: "Judges Choice, Gala Finalist, Choreography Award", category: "Recognition", year: "GTB 2024, GTB 2022" },
    { name: "Chingay Parade", placement: "Most Lively Contingent Award", category: "Cultural Showcase", year: "2020-2025" },
    { name: "National Day Parade", placement: "Performing", category: "National Celebration", year: "2025" }
  ];

  // Group by placement for organized display
  const placementGroups = [
    {
      icon: Trophy,
      title: "1st Place Champions",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      results: allResults.filter(result => result.placement === "1st" || result.placement.includes("1st"))
    },
    {
      icon: Medal,
      title: "2nd Place Achievers", 
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      results: allResults.filter(result => result.placement === "2nd" || result.placement.includes("2nd"))
    },
    {
      icon: Award,
      title: "3rd Place Winners",
      color: "text-amber-700",
      bgColor: "bg-amber-50", 
      borderColor: "border-amber-200",
      results: allResults.filter(result => result.placement === "3rd" || result.placement.includes("3rd"))
    },
    {
      icon: Star,
      title: "Special Recognition",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200", 
      results: allResults.filter(result => 
        result.placement.includes("Outstanding") || 
        result.placement.includes("Judges") ||
        result.placement.includes("Special") ||
        result.placement.includes("Gala") ||
        result.placement.includes("Most Lively") ||
        result.placement.includes("Performing")
      )
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

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {placementGroups.map((group, index) => {
            const IconComponent = group.icon;
            const isExpanded = expandedCards.includes(index);
            const initialDisplayCount = 8; // Show first 8 awards initially
            const displayedResults = isExpanded 
              ? group.results 
              : group.results.slice(0, initialDisplayCount);
            const hasMoreResults = group.results.length > initialDisplayCount;

            return (
              <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${group.borderColor} ${group.bgColor}`}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${group.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${group.borderColor}`}>
                    <IconComponent className={`w-8 h-8 ${group.color}`} />
                  </div>
                  <h3 className={`font-playfair text-xl font-bold ${group.color} mb-6 text-center`}>
                    {group.title}
                  </h3>
                  
                  <div className="space-y-3">
                    {displayedResults.map((result, idx) => (
                      <div key={idx} className="bg-white/80 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-start gap-3">
                          <span className={`font-bold ${group.color} text-sm min-w-fit px-2 py-1 rounded`}>
                            {result.placement}
                          </span>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">{result.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{result.category}</div>
                            <div className="text-xs text-gray-500">{result.year}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {hasMoreResults && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => toggleCard(index)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${group.color} hover:opacity-80 hover:${group.bgColor} rounded-lg transition-colors duration-200 border ${group.borderColor}`}
                      >
                        {isExpanded ? (
                          <>
                            Show Less
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Show More ({group.results.length - initialDisplayCount} more)
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