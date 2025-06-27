
import { Card, CardContent } from "@/components/ui/card";

const ExaminationCoursesSection = () => {
  return (
    <section
      id="examinations"
      className="pt-20 pb-20 bg-gradient-to-br from-primary/5 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Examination Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Achieve internationally recognized qualifications through our
            structured examination programmes, designed to validate technical
            skills and artistic development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* RAD Ballet */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src="/lovable-uploads/5c8d3ad4-fac2-4255-8c25-231c28b272da.png"
                alt="RAD Ballet Examination"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4"></div>
            </div>
            <CardContent className="p-8">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Royal Academy of Dance (RAD) Ballet Examinations
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6 text-base">
                We're proud to offer the world-renowned RAD syllabus - one of
                the world's most influential dance education organizations
                from the UK. Our passionate teachers guide dancers through
                each grade with a comprehensive, progressive approach that
                builds strong technique, artistic expression, and a deep love
                for classical ballet.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ World-leading classical ballet education standards</p>
                <p>✓ Comprehensive progression for all ages and levels</p>
                <p>✓ Focus on technical foundation & artistic expression</p>
                <p>✓ Internationally recognized UK-based certification</p>
              </div>
            </CardContent>
          </Card>

          {/* CSTD Tap and Jazz */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src="/lovable-uploads/7d91482b-17c3-45fc-9917-f502af760568.png"
                alt="CSTD Jazz and Tap Examination"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4 space-x-2"></div>
            </div>
            <CardContent className="p-8">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Commonwealth Society of Teachers of Dancing (CSTD)
                Examinations
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We proudly offer CSTD syllabus from Australia - a world leader
                in holistic dance education! Our Jazz and Tap programs
                combine rhythm, expression, and technique with pop and street
                music influences, empowering dancers to reach their fullest
                potential as technically strong, versatile performers.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ World-leading Australian dance education system</p>
                <p>✓ Jazz & Tap syllabus with modern music influences</p>
                <p>✓ Holistic development focusing on versatility</p>
                <p>✓ Strong technique, performance skills & artistry</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16"></div>
      </div>
    </section>
  );
};

export default ExaminationCoursesSection;
