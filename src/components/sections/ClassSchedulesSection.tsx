import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FileText } from "lucide-react";

const ClassSchedulesSection = () => {
  const locations = [
    {
      location: "Tampines",
      address: "Tampines Mall #04-32",
    },
    {
      location: "Yishun",
      address: "Yishun Mall #03-15",
    }
  ];

  return (
    <section id="schedules" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Class Schedules
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            Find the perfect class time for your child at either of our convenient locations.
            All classes are designed to nurture creativity and build confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {locations.map((location, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-white border-b border-gray-100 text-center pb-6">
                <CardTitle className="flex items-center justify-center gap-3 font-playfair text-2xl text-gray-900">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  {location.location}
                </CardTitle>
                <p className="text-gray-600 font-inter mt-2">
                  {location.address}
                </p>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <p className="text-gray-700 mb-8 font-inter text-base">
                  View our detailed class schedule for {location.location}
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium"
                  onClick={() => window.open('#', '_blank')}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View {location.location} Schedule PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedulesSection;