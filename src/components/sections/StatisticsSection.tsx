
const StatisticsSection = () => {
  const statistics = [
    {
      number: "500+",
      label: "Students Trained",
      color: "text-stat-1",
    },
    {
      number: "15+",
      label: "Years Experience",
      color: "text-stat-2",
    },
    {
      number: "95%",
      label: "Success Rate",
      color: "text-stat-3",
    },
    {
      number: "20+",
      label: "Awards Won",
      color: "text-stat-4",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card-vibrant backdrop-blur-sm border border-primary/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                    {stat.number}
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
