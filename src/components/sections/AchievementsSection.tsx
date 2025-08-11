import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trophy, Award, Medal, Star, Calendar, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { AchievementsSection as AchievementsData } from "@/cms/content/schemas/sections";

const AchievementsSection = ({ data }: { data: AchievementsData }) => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [showAllCompetitions, setShowAllCompetitions] = useState(false);
  
  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const iconMap = { Trophy, Award, Medal, Star, Calendar, Users }
  const competitions = data.competitions.map(c => ({
    icon: c.icon && iconMap[c.icon] ? iconMap[c.icon as keyof typeof iconMap] : Trophy,
    title: c.title,
    results: c.results
  }))

  // Function to sort results by placement order
  const sortResultsByPlacement = (results: any[]) => {
    return [...results].sort((a, b) => {
      const getPlacementValue = (placement: any) => {
        if (typeof placement === 'string') {
          const match = placement.match(/(\d+)/);
          if (match) {
            return parseInt(match[1]);
          }
          // Handle special cases
          if (placement.includes('Honorable Mention')) return 1000;
          if (placement.includes('Gala')) return 1001;
          if (placement.includes('Judges')) return 1002;
          if (placement.includes('Outstanding')) return 1003;
          if (placement.includes('Performed') || placement.includes('Performing')) return 1004;
          return 1005;
        }
        return 1006; // JSX elements go last
      };
      
      return getPlacementValue(a.placement) - getPlacementValue(b.placement);
    });
  };

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">{data.header.title}</h2>
          {data.header.subtitle && (
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">{data.header.subtitle}</p>
          )}
        </div>

        {/* Desktop: Grid Layout with View All/Show Less buttons */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {(showAllCompetitions ? competitions : competitions.slice(0, 6)).map((comp, index) => {
              const IconComponent = comp.icon;
              const isExpanded = expandedCards.includes(index);
              const initialDisplayCount = 2;
              const sortedResults = sortResultsByPlacement(comp.results);
              const displayedResults = isExpanded 
                ? sortedResults 
                : sortedResults.slice(0, initialDisplayCount);
              const hasMoreResults = sortedResults.length > initialDisplayCount;

              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-primary mb-4 text-center">
                      {comp.title}
                    </h3>
                    
                     <div className={`space-y-2 ${isExpanded ? 'max-h-96 overflow-y-auto pr-2' : ''}`}>
                       {displayedResults.map((result, idx) => (
                         <div key={idx} className="text-sm border-b border-gray-100 pb-2 last:border-b-0">
                           <div className="flex justify-between items-start gap-2">
                             <span className="font-medium text-primary shrink-0 text-xs">
                               {typeof result.placement === 'string' && result.placement === 'Honorable Mention' ? (
                                 'Hon. Mention'
                               ) : (
                                 result.placement
                               )}
                             </span>
                             <span className="text-gray-600 flex-1 text-xs leading-relaxed">{result.name}</span>
                           </div>
                           {result.category && (
                             <div className="text-xs text-gray-500 mt-1 line-clamp-2">{result.category}</div>
                           )}
                         </div>
                       ))}
                       {isExpanded && sortedResults.length > 8 && (
                         <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
                           Showing {sortedResults.length} total results
                         </div>
                       )}
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
          
          {competitions.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllCompetitions(!showAllCompetitions)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                {showAllCompetitions ? (
                  <>
                    Show Less Achievements
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    View All Achievements
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile: Horizontal Carousel with all achievements */}
        <div className="block md:hidden">
          <Carousel className="w-full max-w-sm sm:max-w-lg mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {competitions.map((comp, index) => {
                const IconComponent = comp.icon;
                const isExpanded = expandedCards.includes(index);
                const sortedResults = sortResultsByPlacement(comp.results);
                const initialDisplayCount = 3;
                const displayedResults = isExpanded 
                  ? sortedResults 
                  : sortedResults.slice(0, initialDisplayCount);
                const hasMoreResults = sortedResults.length > initialDisplayCount;

                return (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                    <Card className="border-gray-200">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-playfair text-xl font-bold text-primary mb-4 text-center">
                          {comp.title}
                        </h3>
                        
                        <div className={`space-y-2 ${isExpanded ? 'max-h-96 overflow-y-auto pr-2' : ''}`}>
                          {displayedResults.map((result, idx) => (
                            <div key={idx} className="text-sm border-b border-gray-100 pb-2 last:border-b-0">
                              <div className="flex justify-between items-start gap-2">
                                <span className="font-medium text-primary shrink-0 text-xs">
                                  {typeof result.placement === 'string' && result.placement === 'Honorable Mention' ? (
                                    'Hon. Mention'
                                  ) : (
                                    result.placement
                                  )}
                                </span>
                                <span className="text-gray-600 flex-1 text-xs leading-relaxed">{result.name}</span>
                              </div>
                              {result.category && (
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{result.category}</div>
                              )}
                            </div>
                          ))}
                          {isExpanded && sortedResults.length > 8 && (
                            <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
                              Showing {sortedResults.length} total results
                            </div>
                          )}
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
export default AchievementsSection;