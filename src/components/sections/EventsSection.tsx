import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EventCard from "../EventCard";
import { HomePageEvents } from "@/lib/graphql";

// Default data fallback
const DEFAULT_DATA: HomePageEvents = {
  title: "Our Events",
  subtitle: "Join us for exciting performances, competitions, and workshops throughout the year.",
  pastEventsLabel: "Past Events",
  upcomingEventsLabel: "Upcoming Events",
  events: [
    // Past Events
    {
      title: "Ballet Masterclass 2025",
      subtitle: "With Principal Dancers Ms Abigail & Mr Mark Sumaylo, and Soloists Mr John Ralp from Ballet Manila",
      description: "An exceptional opportunity for our dancers to learn from world-class ballet professionals. This masterclass featured technical workshops, artistic development sessions, and personalized feedback from renowned principal dancers.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/assets/past-events/ballet-masterclass-2025/6D4A9100.jpg", altText: "Ballet Masterclass 2025 - Image 1" },
          { mediaItemUrl: "/assets/past-events/ballet-masterclass-2025/6D4A9145.jpg", altText: "Ballet Masterclass 2025 - Image 2" },
          { mediaItemUrl: "/assets/past-events/ballet-masterclass-2025/6D4A9160.jpg", altText: "Ballet Masterclass 2025 - Image 3" },
          { mediaItemUrl: "/assets/past-events/ballet-masterclass-2025/6D4A9165.jpg", altText: "Ballet Masterclass 2025 - Image 4" }
        ]
      }
    },
    {
      title: "Hong Kong Disneyland Performance",
      subtitle: "International Performance Tour",
      description: "Our talented dancers had the incredible opportunity to perform at Hong Kong Disneyland, showcasing their skills on an international stage and representing Singapore with pride and excellence.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/assets/past-events/hong-kong-disneyland-performance/2-457.jpg", altText: "Hong Kong Disneyland Performance - Image 1" },
          { mediaItemUrl: "/assets/past-events/hong-kong-disneyland-performance/2-463.jpg", altText: "Hong Kong Disneyland Performance - Image 2" },
          { mediaItemUrl: "/assets/past-events/hong-kong-disneyland-performance/2-478.jpg", altText: "Hong Kong Disneyland Performance - Image 3" },
          { mediaItemUrl: "/assets/past-events/hong-kong-disneyland-performance/IMG_4270.jpg", altText: "Hong Kong Disneyland Performance - Image 4" },
          { mediaItemUrl: "/assets/past-events/hong-kong-disneyland-performance/IMG_4273.jpg", altText: "Hong Kong Disneyland Performance - Image 5" },
          { mediaItemUrl: "/assets/past-events/hong-kong-disneyland-performance/IMG_4300.jpg", altText: "Hong Kong Disneyland Performance - Image 6" }
        ]
      }
    },
    {
      title: "Mother's Day 2025",
      subtitle: "Special Celebration Performance",
      description: "A heartwarming celebration honoring the incredible mothers in our dance community. Our students prepared special performances to express gratitude for the endless support and love they receive.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/assets/past-events/mother's-day/2f4b926e-1ad0-4088-9cdc-9dcc7434b68b.jpg", altText: "Mother's Day 2025 - Image 1" },
          { mediaItemUrl: "/assets/past-events/mother's-day/37c10229-3599-4e31-a727-13af7973486b.jpg", altText: "Mother's Day 2025 - Image 2" },
          { mediaItemUrl: "/assets/past-events/mother's-day/667dfab3-7559-4e64-847c-ed5fd272de21.jpg", altText: "Mother's Day 2025 - Image 3" },
          { mediaItemUrl: "/assets/past-events/mother's-day/e690cbe0-2f64-4a1f-821c-39e0c9c3c232.jpg", altText: "Mother's Day 2025 - Image 4" }
        ]
      }
    },
    {
      title: "NDP 2025",
      subtitle: "National Day Parade Performance",
      description: "Our dancers proudly participated in Singapore's National Day Parade 2025, contributing to the celebration of our nation's independence with spectacular choreography and patriotic performances.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/assets/past-events/ndp-2025/29c71469-deed-4ca9-9bda-854f08077920.jpg", altText: "NDP 2025 - Image 1" },
          { mediaItemUrl: "/assets/past-events/ndp-2025/466fc6d1-73dc-4007-abc4-445a87ae293b.jpg", altText: "NDP 2025 - Image 2" },
          { mediaItemUrl: "/assets/past-events/ndp-2025/86e69525-8979-4d39-bff0-03ecf5bd29f7.jpg", altText: "NDP 2025 - Image 3" },
          { mediaItemUrl: "/assets/past-events/ndp-2025/8ebe72d2-eae0-44ba-ab36-2c45d3180554.jpg", altText: "NDP 2025 - Image 4" },
          { mediaItemUrl: "/assets/past-events/ndp-2025/b213052b-409d-4558-b371-bfd53de08d79.jpg", altText: "NDP 2025 - Image 5" },
          { mediaItemUrl: "/assets/past-events/ndp-2025/b760196c-707c-482c-a499-b90a5f95bf82.jpg", altText: "NDP 2025 - Image 6" }
        ]
      }
    },
    {
      title: "The Nutcracker 2024",
      subtitle: "Annual Holiday Performance",
      description: "Our annual production of the beloved holiday classic, featuring our students in a magical journey through the Land of Sweets. This professional-quality performance showcased the technical skill and artistic growth of our dancers.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/assets/past-events/the-nutcracker-2024/AAL_3737.jpg", altText: "The Nutcracker 2024 - Image 1" },
          { mediaItemUrl: "/assets/past-events/the-nutcracker-2024/AAL_5949.jpg", altText: "The Nutcracker 2024 - Image 2" },
          { mediaItemUrl: "/assets/past-events/the-nutcracker-2024/AAL_6072.jpg", altText: "The Nutcracker 2024 - Image 3" },
          { mediaItemUrl: "/assets/past-events/the-nutcracker-2024/DNJ04315.jpg", altText: "The Nutcracker 2024 - Image 4" },
          { mediaItemUrl: "/assets/past-events/the-nutcracker-2024/DNJ04553.jpg", altText: "The Nutcracker 2024 - Image 5" },
          { mediaItemUrl: "/assets/past-events/the-nutcracker-2024/DNJ05227.jpg", altText: "The Nutcracker 2024 - Image 6" }
        ]
      }
    },
    {
      title: "Chingay 2025",
      subtitle: "National Cultural Parade",
      description: "Our dancers participated in Singapore's iconic Chingay Parade, showcasing vibrant choreography and cultural fusion in this prestigious national event celebrating Singapore's multicultural heritage.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/assets/past-events/chingay-2025/Photo17-1-25.jpg", altText: "Chingay 2025 - Image 1" },
          { mediaItemUrl: "/assets/past-events/chingay-2025/WhatsApp-Image-2025-02-08-at-00.38.28.jpg", altText: "Chingay 2025 - Image 2" },
          { mediaItemUrl: "/assets/past-events/chingay-2025/WhatsApp-Image-2025-02-08-at-00.38.29.jpg", altText: "Chingay 2025 - Image 3" },
          { mediaItemUrl: "/assets/past-events/chingay-2025/WhatsApp-Image-2025-02-08-at-00.38.30.jpg", altText: "Chingay 2025 - Image 4" },
          { mediaItemUrl: "/assets/past-events/chingay-2025/WhatsApp-Image-2025-02-08 at 00.38.3.jpg", altText: "Chingay 2025 - Image 5" },
          { mediaItemUrl: "/assets/past-events/chingay-2025/WhatsApp-Image-2025-02-13-at-19.09.57.jpg", altText: "Chingay 2025 - Image 6" }
        ]
      }
    },
    {
      title: "Bangkok Dance Exchange 2025",
      subtitle: "International Cultural Exchange",
      description: "Our dancers traveled to Bangkok for an enriching cultural exchange program, collaborating with Thai dancers and showcasing Singaporean dance styles while learning traditional Thai dance forms.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png", altText: "Bangkok Dance Exchange 2025 - Image 1" },
          { mediaItemUrl: "/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png", altText: "Bangkok Dance Exchange 2025 - Image 2" },
          { mediaItemUrl: "/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png", altText: "Bangkok Dance Exchange 2025 - Image 3" }
        ]
      }
    },
    {
      title: "GTB 2025",
      subtitle: "Global Talent Ballet Competition",
      description: "Our elite dancers competed in the prestigious Global Talent Ballet competition, demonstrating exceptional technical skill and artistic expression on an international stage against top dance academies worldwide.",
      isUpcomingEvent: false,
      images: {
        nodes: [
          { mediaItemUrl: "/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png", altText: "GTB 2025 - Image 1" },
          { mediaItemUrl: "/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png", altText: "GTB 2025 - Image 2" },
          { mediaItemUrl: "/lovable-uploads/da5c9831-e15c-4c80-bf8c-169e3bb472fc.png", altText: "GTB 2025 - Image 3" }
        ]
      }
    },
    // Upcoming Events
    {
      title: "Singapore Youth Festival",
      subtitle: "April 2025",
      description: "Our competitive teams will be participating in SYF Arts Presentation, showcasing contemporary and jazz pieces.",
      isUpcomingEvent: true,
      images: {
        nodes: []
      }
    },
    {
      title: "Mid-Year Showcase",
      subtitle: "June 2025",
      description: "A special mid-year performance featuring our recreational and competitive students in various dance styles.",
      isUpcomingEvent: true,
      images: {
        nodes: []
      }
    },
    {
      title: "International Guest Teacher Workshop",
      subtitle: "August 2025",
      description: "Special masterclasses with renowned international dance instructors covering ballet, contemporary, and jazz techniques.",
      isUpcomingEvent: true,
      images: {
        nodes: []
      }
    },
    {
      title: "Annual Recital 2025",
      subtitle: "December 2025",
      description: "Our grand finale of the year featuring all students in a spectacular theatrical production.",
      isUpcomingEvent: true,
      images: {
        nodes: []
      }
    }
  ]
};

interface EventsSectionProps {
  data?: HomePageEvents;
}

const EventsSection = ({ data: eventsData = DEFAULT_DATA }: EventsSectionProps) => {
  // Filter events based on isUpcomingEvent boolean
  const pastEvents = eventsData.events.filter(event => !event.isUpcomingEvent);
  const upcomingEvents = eventsData.events.filter(event => event.isUpcomingEvent);

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {eventsData.title}
          </h2>
          <div className="font-inter text-gray-600 max-w-2xl mx-auto text-lg" 
               dangerouslySetInnerHTML={{ __html: eventsData.subtitle }} />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <Tabs defaultValue="past" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-50 p-1 rounded-xl h-14 max-w-md mx-auto">
                <TabsTrigger 
                  value="past"
                  className="text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-white/50"
                >
                  {eventsData.pastEventsLabel}
                </TabsTrigger>
                <TabsTrigger 
                  value="upcoming"
                  className="text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-white/50"
                >
                  {eventsData.upcomingEventsLabel}
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
                    {pastEvents.map((event, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <EventCard
                          title={event.title}
                          subtitle={event.subtitle}
                          description={event.description}
                          images={event.images?.nodes?.map(img => img.mediaItemUrl) || []}
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
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                        {event.title}
                      </h3>
                      <div className="text-gray-600 text-sm mb-2" dangerouslySetInnerHTML={{ __html: event.subtitle }} />
                      <div className="text-gray-500 text-sm mb-4" dangerouslySetInnerHTML={{ __html: event.description }} />
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
