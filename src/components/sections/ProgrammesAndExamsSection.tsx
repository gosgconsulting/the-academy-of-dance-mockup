import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ProgrammesSection as ProgrammesData } from "@/cms/content/schemas/sections";

const ProgrammesAndExamsSection = ({ data }: { data: ProgrammesData }) => {
  const [radImageIndex, setRadImageIndex] = useState(0);
  const [cstdImageIndex, setCstdImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState('');

  const rad = data.examinations.find(e => e.id === 'rad')
  const cstd = data.examinations.find(e => e.id === 'cstd')
  const radImages = rad ? rad.images.map(i => typeof i === 'string' ? i : '') : []
  const cstdImages = cstd ? cstd.images.map(i => typeof i === 'string' ? i : '') : []

  const openModal = (images: string[], imageIndex: number, title: string) => {
    setModalImages(images);
    setModalImageIndex(imageIndex);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  const goToRadImage = (index: number) => {
    setRadImageIndex(index);
  };

  const goToCstdImage = (index: number) => {
    setCstdImageIndex(index);
  };

  const programmes = data.programmes

  return (
    <>
      <section id="programmes" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">{data.header.title}</h2>
              {data.header.subtitle && (
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.header.subtitle}</p>
              )}
            </div>

          <Tabs defaultValue="programmes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-50 p-1 rounded-xl h-14 max-w-md mx-auto">
              <TabsTrigger 
                value="programmes" 
                className="text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-white/50"
              >
                Programmes
              </TabsTrigger>
              <TabsTrigger 
                value="examinations" 
                className="text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-white/50"
              >
                Examinations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="programmes" className="space-y-8">
              {/* Desktop grid layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programmes.map((programme) => (
                  <Card key={programme.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={typeof programme.image === 'string' ? programme.image : ''} 
                        alt={programme.title} 
                        className="w-full h-64 object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                        {programme.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {programme.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mobile carousel layout */}
              <div className="md:hidden">
                <Carousel className="w-full max-w-sm mx-auto">
                  <CarouselContent>
                    {programmes.map((programme) => (
                      <CarouselItem key={programme.id}>
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                          <div className="relative">
                            <img 
                              src={typeof programme.image === 'string' ? programme.image : ''} 
                              alt={programme.title} 
                              className="w-full h-48 object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-playfair text-xl font-bold text-primary mb-3">
                              {programme.title}
                            </h3>
                            <p className="text-gray-700 text-xs leading-relaxed line-clamp-4">
                              {programme.description}
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
            </TabsContent>
            
            <TabsContent value="examinations" className="space-y-8">
              {/* Desktop grid layout */}
              <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* RAD Ballet */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="relative h-64 overflow-hidden">
                      {radImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                              alt={`${rad?.title || 'RAD Ballet Examination'} - Image ${index + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 cursor-pointer ${
                            index === radImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                              onClick={() => openModal(radImages, index, rad?.title || 'RAD Ballet Examination')}
                        />
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    </div>
                    
                    {/* Pagination dots */}
                    {radImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {radImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToRadImage(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === radImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8">
                      <h3 className="font-playfair text-2xl font-bold text-primary mb-4">{rad?.title || 'Examination'}</h3>
                      <p className="text-gray-700 leading-relaxed mb-6 text-base">{rad?.summary}</p>
                      {rad?.bullets?.length ? (
                        <div className="space-y-2 text-sm text-gray-600">
                          {rad?.bullets.map((b, i) => <p key={i}>✓ {b}</p>)}
                        </div>
                      ) : null}
                  </CardContent>
                </Card>

                    {/* CSTD Tap and Jazz */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="relative h-64 overflow-hidden">
                      {cstdImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                              alt={`${cstd?.title || 'CSTD Jazz and Tap Examination'} - Image ${index + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 cursor-pointer ${
                            index === cstdImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                              onClick={() => openModal(cstdImages, index, cstd?.title || 'CSTD Jazz and Tap Examination')}
                        />
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    </div>
                    
                    {/* Pagination dots */}
                    {cstdImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {cstdImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToCstdImage(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === cstdImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8">
                      <h3 className="font-playfair text-2xl font-bold text-primary mb-4">{cstd?.title || 'Examination'}</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{cstd?.summary}</p>
                      {cstd?.bullets?.length ? (
                        <div className="space-y-2 text-sm text-gray-600">
                          {cstd?.bullets.map((b, i) => <p key={i}>✓ {b}</p>)}
                        </div>
                      ) : null}
                  </CardContent>
                </Card>
              </div>

              {/* Mobile carousel layout */}
              <div className="md:hidden">
                <Carousel className="w-full max-w-sm mx-auto">
                  <CarouselContent>
                    {/* RAD Ballet Card */}
                    <CarouselItem>
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                          <div className="relative h-48 overflow-hidden">
                            {radImages.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`RAD Ballet Examination - Image ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 cursor-pointer ${
                                  index === radImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                                onClick={() => openModal(radImages, index, 'RAD Ballet Examination')}
                              />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                          </div>
                          
                          {/* Pagination dots */}
                          {radImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                              {radImages.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => goToRadImage(index)}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    index === radImageIndex 
                                      ? 'bg-white' 
                                      : 'bg-white/50 hover:bg-white/70'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-playfair text-lg font-bold text-primary mb-3">
                            RAD Ballet Examinations
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-4 text-xs line-clamp-3">
                            We're proud to offer the world-renowned RAD syllabus - one of
                            the world's most influential dance education organizations
                            from the UK.
                          </p>
                          <div className="space-y-1 text-xs text-gray-600">
                            <p>✓ World-leading classical ballet standards</p>
                            <p>✓ UK-based certification</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>

                    {/* CSTD Card */}
                    <CarouselItem>
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                          <div className="relative h-48 overflow-hidden">
                            {cstdImages.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`CSTD Jazz and Tap Examination - Image ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 cursor-pointer ${
                                  index === cstdImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                                onClick={() => openModal(cstdImages, index, 'CSTD Jazz and Tap Examination')}
                              />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                          </div>
                          
                          {/* Pagination dots */}
                          {cstdImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                              {cstdImages.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => goToCstdImage(index)}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    index === cstdImageIndex 
                                      ? 'bg-white' 
                                      : 'bg-white/50 hover:bg-white/70'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-playfair text-lg font-bold text-primary mb-3">
                            CSTD Examinations
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-4 text-xs line-clamp-3">
                            We proudly offer CSTD syllabus from Australia - a world leader
                            in holistic dance education with Jazz and Tap programs.
                          </p>
                          <div className="space-y-1 text-xs text-gray-600">
                            <p>✓ Australian dance education system</p>
                            <p>✓ Jazz & Tap with modern influences</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Full-screen image modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-screen max-h-screen w-screen h-screen p-0 bg-black/60 border-none flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Main image container - centered with proper aspect ratio */}
            <div className="relative flex items-center justify-center w-full h-full px-16">
              {/* Main image - 80% of screen size with proper centering */}
              <img
                src={modalImages[modalImageIndex]}
                alt={`${modalTitle} - Image ${modalImageIndex + 1}`}
                className="max-w-[80%] max-h-[80%] object-contain"
              />

              {/* Navigation arrows - positioned relative to the image container */}
              {modalImages.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors z-40"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors z-40"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Image counter - positioned at bottom center */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {modalImageIndex + 1} / {modalImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProgrammesAndExamsSection;