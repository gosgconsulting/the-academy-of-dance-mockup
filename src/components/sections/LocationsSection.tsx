
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomePageLocations } from "@/lib/graphql";

// Default data fallback
const DEFAULT_DATA: HomePageLocations = {
  title: "Our Locations",
  subtitle: "Visit us at our convenient locations across Singapore for world-class dance education.",
  locations: [
    {
      name: "Tampines",
      address: "510 Tampines Central 1",
      unit: "#02-250",
      postalCode: "Singapore 520510",
      phone: "(65) 9837 2670",
      googleMapsUrl: "https://maps.google.com/maps?q=510+Tampines+Central+1+%2302-250+Singapore+520510",
      image: {
        node: {
          mediaItemUrl: "/lovable-uploads/c30a6afd-4e61-4b4a-aa55-2a97f577433b.png",
          altText: "Tampines Location - Reception Area"
        }
      }
    },
    {
      name: "Yishun",
      address: "Wisteria Mall, 598 Yishun Ring Road",
      unit: "#01-35/36",
      postalCode: "Singapore 768698",
      phone: "(65) 9337 8605",
      googleMapsUrl: "https://maps.google.com/maps?q=Wisteria+Mall+598+Yishun+Ring+Road+%2301-35%2F36+Singapore+768698",
      image: {
        node: {
          mediaItemUrl: "/lovable-uploads/b035362d-9d9c-496a-b0b6-dcab5c996d55.png",
          altText: "Yishun Location - Dance Studio"
        }
      }
    }
  ]
};

interface LocationsSectionProps {
  data?: HomePageLocations;
}

const LocationsSection = ({ data }: LocationsSectionProps) => {
  // Use data from props or fallback to default data
  const locationsData = data || DEFAULT_DATA;

  return (
    <section
      id="locations"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {locationsData.title}
          </h2>
          <div className="font-inter text-gray-600 max-w-2xl mx-auto text-lg" dangerouslySetInnerHTML={{ __html: locationsData.subtitle }} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {locationsData.locations.map((location, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={location.image.node.mediaItemUrl}
                  alt={location.image.node.altText || `${location.name} Location`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6">
                  {location.name}
                </h3>
                <div className="space-y-4 text-gray-700 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <p>{location.address}</p>
                      {location.unit && <p>{location.unit}</p>}
                      <p>{location.postalCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <a
                      href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(location.googleMapsUrl, "_blank")}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Us
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
