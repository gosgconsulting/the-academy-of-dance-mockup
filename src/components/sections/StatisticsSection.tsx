
import type { StatisticsSection as StatisticsData } from "@/cms/content/schemas/sections";
const StatisticsSection = ({ data }: { data: StatisticsData }) => {
  const statistics = data.stats

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`relative inline-block p-4 rounded-2xl transition-all duration-300 group-hover:scale-105 mb-4`} style={{ backgroundColor: stat.bgHex || 'rgba(139,92,246,0.1)' }}>
                    <div className={`text-4xl md:text-5xl font-bold drop-shadow-lg !important`} style={{color: stat.colorHex || '#8b5cf6'}}>
                      {stat.number}
                    </div>
                  </div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">
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
