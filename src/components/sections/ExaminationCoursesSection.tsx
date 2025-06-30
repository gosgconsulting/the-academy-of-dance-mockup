
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const ExaminationCoursesSection = () => {
  const [radImageIndex, setRadImageIndex] = useState(0);
  const [cstdImageIndex, setCstdImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState('');

  const radImages = [
    "/lovable-uploads/5c8d3ad4-fac2-4255-8c25-231c28b272da.png",
    "/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png",
    "/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png"
  ];

  const cstdImages = [
    "/lovable-uploads/7d91482b-17c3-45fc-9917-f502af760568.png",
    "/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png",
    "/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png"
  ];

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

  return (
    <>
      <section
        id="examinations"
        className="pt-20 pb-20 bg-gradient-to-br from-primary/5 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Examination Courses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Achieve internationally recognized qualifications through our
              structured examination programmes, designed to validate technical
              skills and artistic development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* RAD Ballet */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="relative h-64 overflow-hidden">
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
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                  Royal Academy of Dance (RAD) Ballet Examinations
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 text-base">
                  We're proud to offer the world-renowned RAD syllabus - one of
                  the world's most influential dance education organizations
                  from the UK. Our passionate teachers guide dancers through
                  each grade with a comprehensive, progressive approach that
                  builds strong technique, artistic expression, and a deep love
                  for classical ballet.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ World-leading classical ballet education standards</p>
                  <p>✓ Comprehensive progression for all ages and levels</p>
                  <p>✓ Focus on technical foundation & artistic expression</p>
                  <p>✓ Internationally recognized UK-based certification</p>
                </div>
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
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                  Commonwealth Society of Teachers of Dancing (CSTD)
                  Examinations
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We proudly offer CSTD syllabus from Australia - a world leader
                  in holistic dance education! Our Jazz and Tap programs
                  combine rhythm, expression, and technique with pop and street
                  music influences, empowering dancers to reach their fullest
                  potential as technically strong, versatile performers.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ World-leading Australian dance education system</p>
                  <p>✓ Jazz & Tap syllabus with modern music influences</p>
                  <p>✓ Holistic development focusing on versatility</p>
                  <p>✓ Strong technique, performance skills & artistry</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16"></div>
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

export default ExaminationCoursesSection;
