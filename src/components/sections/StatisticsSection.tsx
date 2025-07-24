
const StatisticsSection = () => {
  const statistics = [
    {
      number: "500+",
      label: "Students Trained",
      color: "text-pink-500",
    },
    {
      number: "15+",
      label: "Years Experience",
      color: "text-purple-500",
    },
    {
      number: "95%",
      label: "Success Rate",
      color: "text-yellow-500",
    },
    {
      number: "20+",
      label: "Awards Won",
      color: "text-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
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
