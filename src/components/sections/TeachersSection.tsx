
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { TeachersSection as TeachersData } from "@/cms/content/schemas/sections";

const TeachersSection = ({ data }: { data: TeachersData }) => {

  const teachers = data.teachers

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Teachers Section */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">{data.header.title}</h2>
          {data.header.subtitle && (
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">{data.header.subtitle}</p>
          )}
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {teachers.map((teacher, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={typeof teacher.image === 'string' ? teacher.image : ''}
                        alt={teacher.name}
                        className={`w-full h-72 object-cover ${
                          teacher.isFounder
                            ? "object-[center_30%]"
                            : "object-[center_20%]"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                        {teacher.name}
                      </h3>
                      <p className="text-secondary font-semibold mb-2">
                        {teacher.specialty}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {teacher.credentials}
                      </p>
                      <p className="text-gray-500 text-sm flex-1">
                        {teacher.experience}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

      </div>
    </section>
  );
};

export default TeachersSection;
