
import { useEffect, useState } from "react";
import { SupabaseContentService } from "../../../sparti-builder/services/SupabaseContentService";

interface StatisticItem {
  number: string;
  label: string;
  color: string;
  bgGlow: string;
}

interface StatisticsContent {
  title?: string;
  description?: string;
  statistics: StatisticItem[];
}

const StatisticsSection = () => {
  const [content, setContent] = useState<StatisticsContent>({
    title: "Our Impact",
    description: "Celebrating our achievements in dance education",
    statistics: [
      {
        number: "10,000+",
        label: "Students Trained",
        color: "text-violet-500",
        bgGlow: "bg-violet-100",
      },
      {
        number: "40",
        label: "Years Experience",
        color: "text-emerald-500",
        bgGlow: "bg-emerald-100",
      },
      {
        number: "95%",
        label: "Success Rate",
        color: "text-orange-500",
        bgGlow: "bg-orange-100",
      },
      {
        number: "2000+",
        label: "Awards Won",
        color: "text-rose-500",
        bgGlow: "bg-rose-100",
      },
    ],
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { sections } = await SupabaseContentService.loadPageContent('index');
        const statisticsSection = sections.find(s => s.section_id === 'statistics');
        
        if (statisticsSection && statisticsSection.content) {
          setContent(statisticsSection.content as StatisticsContent);
        }
      } catch (error) {
        console.error('Error loading statistics content:', error);
      }
    };

    loadContent();
  }, []);

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      data-sparti-section="statistics"
      data-sparti-type="StatisticsSection"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {content.title && (
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                data-sparti-element="title"
                data-sparti-editable="true"
              >
                {content.title}
              </h2>
              {content.description && (
                <p 
                  className="text-gray-600 text-lg"
                  data-sparti-element="description"
                  data-sparti-editable="true"
                >
                  {content.description}
                </p>
              )}
            </div>
          )}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.statistics.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group"
                  data-sparti-element={`statistic-${index}`}
                  data-sparti-editable-container="true"
                >
                  <div className={`relative inline-block p-4 rounded-2xl ${stat.bgGlow} transition-all duration-300 group-hover:scale-105 mb-4`}>
                    <div 
                      className={`text-4xl md:text-5xl font-bold ${stat.color} drop-shadow-lg`} 
                      style={{color: stat.color === 'text-violet-500' ? '#8b5cf6' : stat.color === 'text-emerald-500' ? '#10b981' : stat.color === 'text-orange-500' ? '#f97316' : '#f43f5e'}}
                      data-sparti-element={`number-${index}`}
                      data-sparti-editable="true"
                    >
                      {stat.number}
                    </div>
                  </div>
                  <div 
                    className="text-gray-600 font-medium text-sm md:text-base"
                    data-sparti-element={`label-${index}`}
                    data-sparti-editable="true"
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
