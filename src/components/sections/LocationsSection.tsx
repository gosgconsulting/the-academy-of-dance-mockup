
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContentLoader } from "@/hooks/useContentLoader";

interface LocationInfo {
  name: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
  phone: string;
  image: string;
  mapsUrl: string;
}

interface LocationsContent {
  title: string;
  description: string;
  locations: LocationInfo[];
}

const LocationsSection = () => {
  const { getSectionContent } = useContentLoader('index');
  const content = getSectionContent('locations') as LocationsContent;
  return (
    <section
      id="locations"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {content?.title || 'Our Locations'}
          </h2>
          <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">
            {content?.description || 'Visit us at our convenient locations across Singapore for world-class dance education.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {content?.locations?.map((location, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={location.image}
                  alt={`${location.name} Location`}
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
                      <p>{location.address.line1}</p>
                      {location.address.line2 && <p>{location.address.line2}</p>}
                      <p>{location.address.line3}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <a
                      href={`tel:${location.phone.replace(/[\s()-]/g, '')}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(location.mapsUrl, "_blank")}
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
