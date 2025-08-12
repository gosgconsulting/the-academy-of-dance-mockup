import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ClassItem {
  time: string;
  class: string;
  level: string;
  age: string;
}

interface ScheduleDay {
  day: string;
  classes: ClassItem[];
}

interface ClassScheduleProps {
  schedule?: ScheduleDay[];
  title?: string;
}

const ClassSchedule = ({ schedule = [], title = "Class Schedule" }: ClassScheduleProps) => {
  const defaultSchedule: ScheduleDay[] = [
    {
      day: "Monday",
      classes: [
        { time: "4:00 PM", class: "Kids Ballet", level: "Beginner", age: "3-6 years" },
        { time: "5:30 PM", class: "Teen Hip Hop", level: "Intermediate", age: "13-17 years" }
      ]
    },
    {
      day: "Tuesday", 
      classes: [
        { time: "4:30 PM", class: "Contemporary", level: "Beginner", age: "8+ years" },
        { time: "6:00 PM", class: "Adult Ballet", level: "All Levels", age: "18+ years" }
      ]
    }
  ];

  const displaySchedule = schedule.length > 0 ? schedule : defaultSchedule;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySchedule.map((day, dayIndex) => (
            <Card key={dayIndex} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.classes.map((classItem, classIndex) => (
                  <div key={classIndex} className="p-4 bg-white rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{classItem.class}</h3>
                      <Badge variant="secondary">{classItem.time}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Level: {classItem.level}</p>
                    <p className="text-sm text-gray-600">Age: {classItem.age}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
