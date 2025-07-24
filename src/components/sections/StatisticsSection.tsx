
const StatisticsSection = () => {
  const statistics = [
    {
      number: "500+",
      label: "Students Trained",
      color: "text-stats-purple",
      bgGlow: "bg-stats-purple/10",
    },
    {
      number: "15+",
      label: "Years Experience",
      color: "text-stats-emerald",
      bgGlow: "bg-stats-emerald/10",
    },
    {
      number: "95%",
      label: "Success Rate",
      color: "text-stats-orange",
      bgGlow: "bg-stats-orange/10",
    },
    {
      number: "20+",
      label: "Awards Won",
      color: "text-stats-pink",
      bgGlow: "bg-stats-pink/10",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`relative inline-block p-4 rounded-2xl ${stat.bgGlow} transition-all duration-300 group-hover:scale-105 mb-4`}>
                    <div className={`text-4xl md:text-5xl font-bold ${stat.color} drop-shadow-lg`}>
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
