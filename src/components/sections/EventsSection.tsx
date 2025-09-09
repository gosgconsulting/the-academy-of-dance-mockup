
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

const EventsSection = () => {
  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Events
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            Join us for exciting performances, competitions, and workshops
            throughout the year.
          </p>
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
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="Ballet Masterclass 2025"
                        subtitle="With Principal Dancers Ms Abigail & Mr Mark Sumaylo, and Soloists Mr John Ralp from Ballet Manila"
                        description="An exceptional opportunity for our dancers to learn from world-class ballet professionals. This masterclass featured technical workshops, artistic development sessions, and personalized feedback from renowned principal dancers."
                        images={[
                          "/src/assets/past-events/Ballet Masterclass 2025 (With Principal Dancers Ms Abigail & Mr Mark Sumaylo, and Soloists Mr John Ralp from Ballet Manila)/6D4A9100.JPG",
                          "/src/assets/past-events/Ballet Masterclass 2025 (With Principal Dancers Ms Abigail & Mr Mark Sumaylo, and Soloists Mr John Ralp from Ballet Manila)/6D4A9145.JPG",
                          "/src/assets/past-events/Ballet Masterclass 2025 (With Principal Dancers Ms Abigail & Mr Mark Sumaylo, and Soloists Mr John Ralp from Ballet Manila)/6D4A9160.JPG",
                          "/src/assets/past-events/Ballet Masterclass 2025 (With Principal Dancers Ms Abigail & Mr Mark Sumaylo, and Soloists Mr John Ralp from Ballet Manila)/6D4A9165.JPG"
                        ]}
                      />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="Hong Kong Disneyland Performance"
                        subtitle="International Performance Tour"
                        description="Our talented dancers had the incredible opportunity to perform at Hong Kong Disneyland, showcasing their skills on an international stage and representing Singapore with pride and excellence."
                        images={[
                          "/src/assets/past-events/Hong Kong Disneyland Performance/2-457.JPEG",
                          "/src/assets/past-events/Hong Kong Disneyland Performance/2-463.JPEG",
                          "/src/assets/past-events/Hong Kong Disneyland Performance/2-478.JPEG",
                          "/src/assets/past-events/Hong Kong Disneyland Performance/IMG_4270.JPG",
                          "/src/assets/past-events/Hong Kong Disneyland Performance/IMG_4273.JPG",
                          "/src/assets/past-events/Hong Kong Disneyland Performance/IMG_4300.JPG"
                        ]}
                      />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="Mother's Day"
                        subtitle="Special Celebration Performance"
                        description="A heartwarming celebration honoring the incredible mothers in our dance community. Our students prepared special performances to express gratitude for the endless support and love they receive."
                        images={[
                          "/src/assets/past-events/Mother's Day/2f4b926e-1ad0-4088-9cdc-9dcc7434b68b.JPG",
                          "/src/assets/past-events/Mother's Day/37c10229-3599-4e31-a727-13af7973486b.JPG",
                          "/src/assets/past-events/Mother's Day/667dfab3-7559-4e64-847c-ed5fd272de21.JPG",
                          "/src/assets/past-events/Mother's Day/e690cbe0-2f64-4a1f-821c-39e0c9c3c232.JPG"
                        ]}
                      />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="NDP 2025"
                        subtitle="National Day Parade Performance"
                        description="Our dancers proudly participated in Singapore's National Day Parade 2025, contributing to the celebration of our nation's independence with spectacular choreography and patriotic performances."
                        images={[
                          "/src/assets/past-events/NDP 2025/29c71469-deed-4ca9-9bda-854f08077920.JPG",
                          "/src/assets/past-events/NDP 2025/2eecb583-62c9-45dc-81db-7128fd03b7d1 2.JPG",
                          "/src/assets/past-events/NDP 2025/466fc6d1-73dc-4007-abc4-445a87ae293b.JPG",
                          "/src/assets/past-events/NDP 2025/86e69525-8979-4d39-bff0-03ecf5bd29f7.JPG",
                          "/src/assets/past-events/NDP 2025/8ebe72d2-eae0-44ba-ab36-2c45d3180554.JPG",
                          "/src/assets/past-events/NDP 2025/b213052b-409d-4558-b371-bfd53de08d79.JPG"
                        ]}
                      />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="The Nutcracker (Concert) 2024"
                        subtitle="Annual Holiday Performance"
                        description="Our annual production of the beloved holiday classic, featuring our students in a magical journey through the Land of Sweets. This professional-quality performance showcased the technical skill and artistic growth of our dancers."
                        images={[
                          "/src/assets/past-events/The Nutcracker (Concert) 2024/AAL_3737.JPG",
                          "/src/assets/past-events/The Nutcracker (Concert) 2024/AAL_5949.jpg",
                          "/src/assets/past-events/The Nutcracker (Concert) 2024/AAL_6072.jpg",
                          "/src/assets/past-events/The Nutcracker (Concert) 2024/DNJ04315.JPG",
                          "/src/assets/past-events/The Nutcracker (Concert) 2024/DNJ04553.JPG",
                          "/src/assets/past-events/The Nutcracker (Concert) 2024/DNJ05227.JPG"
                        ]}
                      />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="Chingay 2025"
                        subtitle="National Cultural Parade"
                        description="Our dancers participated in Singapore's iconic Chingay Parade, showcasing vibrant choreography and cultural fusion in this prestigious national event celebrating Singapore's multicultural heritage."
                        images={[
                          "/src/assets/past-events/Chingay 2025/Photo 17-1-25, 5 33 53 PM.jpg",
                          "/src/assets/past-events/Chingay 2025/WhatsApp Image 2025-02-08 at 00.38.28 (1) (1).jpeg",
                          "/src/assets/past-events/Chingay 2025/WhatsApp Image 2025-02-08 at 00.38.29 (1) (1).jpeg",
                          "/src/assets/past-events/Chingay 2025/WhatsApp Image 2025-02-08 at 00.38.30 (1) (1).jpeg",
                          "/src/assets/past-events/Chingay 2025/WhatsApp Image 2025-02-08 at 00.38.30 (2) (1).jpeg",
                          "/src/assets/past-events/Chingay 2025/WhatsApp Image 2025-02-13 at 19.09.57 (1).jpeg"
                        ]}
                      />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="Bangkok Dance Exchange 2025"
                        subtitle="International Cultural Exchange"
                        description="Our dancers traveled to Bangkok for an enriching cultural exchange program, collaborating with Thai dancers and showcasing Singaporean dance styles while learning traditional Thai dance forms."
                        images={[
                          "/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png",
                          "/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png",
                          "/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png"
                        ]}
                      />
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                        title="GTB 2025"
                        subtitle="Global Talent Ballet Competition"
                        description="Our elite dancers competed in the prestigious Global Talent Ballet competition, demonstrating exceptional technical skill and artistic expression on an international stage against top dance academies worldwide."
                        images={[
                          "/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png",
                          "/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png",
                          "/lovable-uploads/da5c9831-e15c-4c80-bf8c-169e3bb472fc.png"
                        ]}
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                        Singapore Youth Festival
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">April 2025</p>
                      <p className="text-gray-500 text-sm mb-4">
                        Our competitive teams will be participating in SYF Arts
                        Presentation, showcasing contemporary and jazz pieces.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                        Mid-Year Showcase
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">June 2025</p>
                      <p className="text-gray-500 text-sm mb-4">
                        A special mid-year performance featuring our recreational
                        and competitive students in various dance styles.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                        International Guest Teacher Workshop
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">August 2025</p>
                      <p className="text-gray-500 text-sm mb-4">
                        Special masterclasses with renowned international dance
                        instructors covering ballet, contemporary, and jazz
                        techniques.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                        Annual Recital 2025
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">December 2025</p>
                      <p className="text-gray-500 text-sm mb-4">
                        Our grand finale of the year featuring all students in a
                        spectacular theatrical production.
                      </p>
                    </CardContent>
                  </Card>
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
