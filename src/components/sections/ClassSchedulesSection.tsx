import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

const ClassSchedulesSection = () => {
  const schedules = [
    {
      location: "Tampines",
      address: "Tampines Mall #04-32",
      classes: [
        { day: "Monday", time: "4:00 PM - 5:00 PM", class: "Ballet (Ages 4-6)" },
        { day: "Monday", time: "5:00 PM - 6:00 PM", class: "Jazz (Ages 7-9)" },
        { day: "Tuesday", time: "4:00 PM - 5:00 PM", class: "Contemporary (Ages 10-12)" },
        { day: "Tuesday", time: "5:00 PM - 6:00 PM", class: "Hip Hop (Ages 8-10)" },
        { day: "Wednesday", time: "4:00 PM - 5:00 PM", class: "Ballet (Ages 7-9)" },
        { day: "Wednesday", time: "5:00 PM - 6:00 PM", class: "Modern (Ages 11-13)" },
        { day: "Thursday", time: "4:00 PM - 5:00 PM", class: "Tap (Ages 6-8)" },
        { day: "Thursday", time: "5:00 PM - 6:00 PM", class: "Jazz (Ages 10-12)" },
        { day: "Friday", time: "4:00 PM - 5:00 PM", class: "Hip Hop (Ages 6-8)" },
        { day: "Friday", time: "5:00 PM - 6:00 PM", class: "Ballet (Ages 8-10)" },
        { day: "Saturday", time: "10:00 AM - 11:00 AM", class: "Contemporary (Ages 6-8)" },
        { day: "Saturday", time: "11:00 AM - 12:00 PM", class: "Musical Theatre (Ages 9-11)" },
      ]
    },
    {
      location: "Wisteria",
      address: "Wisteria Mall #03-15",
      classes: [
        { day: "Monday", time: "3:30 PM - 4:30 PM", class: "Ballet (Ages 3-5)" },
        { day: "Monday", time: "4:30 PM - 5:30 PM", class: "Creative Movement (Ages 5-7)" },
        { day: "Tuesday", time: "3:30 PM - 4:30 PM", class: "Jazz (Ages 6-8)" },
        { day: "Tuesday", time: "4:30 PM - 5:30 PM", class: "Contemporary (Ages 9-11)" },
        { day: "Wednesday", time: "3:30 PM - 4:30 PM", class: "Hip Hop (Ages 7-9)" },
        { day: "Wednesday", time: "4:30 PM - 5:30 PM", class: "Ballet (Ages 8-10)" },
        { day: "Thursday", time: "3:30 PM - 4:30 PM", class: "Modern (Ages 6-8)" },
        { day: "Thursday", time: "4:30 PM - 5:30 PM", class: "Tap (Ages 9-11)" },
        { day: "Friday", time: "3:30 PM - 4:30 PM", class: "Ballet (Ages 6-8)" },
        { day: "Friday", time: "4:30 PM - 5:30 PM", class: "Jazz (Ages 10-12)" },
        { day: "Saturday", time: "9:00 AM - 10:00 AM", class: "Family Dance (Ages 2-4 with parent)" },
        { day: "Saturday", time: "10:00 AM - 11:00 AM", class: "Musical Theatre (Ages 8-10)" },
      ]
    }
  ];

  return (
    <section id="schedules" className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Class Schedules
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            Find the perfect class time for your child at either of our convenient locations.
            All classes are designed to nurture creativity and build confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {schedules.map((location, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="flex items-center gap-3 font-playfair text-2xl">
                  <MapPin className="w-6 h-6" />
                  {location.location}
                </CardTitle>
                <p className="text-primary-foreground/90 font-inter">
                  {location.address}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {location.classes.map((classItem, classIndex) => (
                    <div 
                      key={classIndex} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">
                          {classItem.class}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium">
                          {classItem.day}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-secondary font-medium">
                        <Clock className="w-4 h-4" />
                        {classItem.time}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Note:</strong> Schedule may vary during school holidays. 
                    Please contact us for the most up-to-date information.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedulesSection;