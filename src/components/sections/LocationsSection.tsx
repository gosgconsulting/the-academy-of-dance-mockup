
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LocationsSection as LocationsData } from "@/cms/content/schemas/sections";

const LocationsSection = ({ data }: { data: LocationsData }) => {
  return (
    <section
      id="locations"
      className="py-20 bg-gradient-to-br from-secondary/10 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">{data.header.title}</h2>
          {data.header.subtitle && (
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-lg">{data.header.subtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.locations.map((loc, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={typeof loc.image === 'string' ? loc.image : ''}
                  alt={`${loc.name} - Photo`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6">
                  {loc.name}
                </h3>
                <div className="space-y-4 text-gray-700 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      {loc.addressLines.map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <a href={loc.phoneHref} className="hover:text-secondary transition-colors">
                      {loc.phoneDisplay}
                    </a>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(loc.mapUrl, "_blank")}
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
