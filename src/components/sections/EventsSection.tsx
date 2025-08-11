
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "@/components/EventCard";
import type { EventsSection as EventsData } from "@/cms/content/schemas/sections";

const EventsSection = ({ data }: { data: EventsData }) => {
  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">{data.header.title}</h2>
          {data.header.subtitle && (
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">{data.header.subtitle}</p>
          )}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <Tabs defaultValue="past" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-50 p-1 rounded-xl h-14 max-w-md mx-auto">
                <TabsTrigger 
                  value="past"
                  className="text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-white/50"
                >
                  Past Events
                </TabsTrigger>
                <TabsTrigger 
                  value="upcoming"
                  className="text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-white/50"
                >
                  Upcoming Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="past" className="mt-6">
                <Carousel
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {data.pastEvents.map((evt, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                        <EventCard
                          title={evt.title}
                          subtitle={evt.subtitle || ''}
                          description={evt.description}
                          images={evt.images.map(img => (typeof img === 'string' ? img : ''))}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {data.upcomingEvents.map((evt, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <h3 className="font-playfair text-xl font-bold text-primary mb-2">{evt.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{evt.date}</p>
                        <p className="text-gray-500 text-sm mb-4">{evt.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
