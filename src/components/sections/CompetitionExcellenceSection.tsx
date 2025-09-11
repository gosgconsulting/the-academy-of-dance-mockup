import { useState } from 'react';
import { Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { HomePageCompetitionExcellence } from "@/lib/graphql";

// Default data fallback
const DEFAULT_DATA: HomePageCompetitionExcellence = {
  title: "Our Competition Classes",
  subtitle: "Our elite competition team classes are designed to prepare dancers for high-level performance opportunities at regional and national competitions. We offer both solo and group competition classes, tailored to suit individual goals and team development.",
  items: [
    {
      title: "Solo Program",
      description: "Perfect for dancers who want to shine in the spotlight! Our solo program develops individual artistry, technical precision, and stage presence that judges absolutely love.",
      images: {
        nodes: [
          { mediaItemUrl: "/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png", altText: "Solo Performance - Image 1" },
          { mediaItemUrl: "/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png", altText: "Solo Performance - Image 2" },
          { mediaItemUrl: "/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png", altText: "Solo Performance - Image 3" }
        ]
      }
    },
    {
      title: "Dance Groups",
      description: "Our competitive troupes are where magic happens! These elite groups train together, compete together, and WIN together. The bond they form is as strong as their performances are spectacular.",
      images: {
        nodes: [
          { mediaItemUrl: "/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png", altText: "Dance Group Performance - Image 1" },
          { mediaItemUrl: "/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png", altText: "Dance Group Performance - Image 2" },  
          { mediaItemUrl: "/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png", altText: "Dance Group Performance - Image 3" }
        ]
      }
    }
  ]
};

interface CompetitionExcellenceSectionProps {
  data?: HomePageCompetitionExcellence;
}

const CompetitionExcellenceSection = ({ data: competitionData = DEFAULT_DATA }: CompetitionExcellenceSectionProps) => {
  // Dynamic state management for each item
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState('');

  // Helper function to get image index for a specific item
  const getImageIndex = (itemTitle: string) => {
    return imageIndices[itemTitle] || 0;
  };

  // Helper function to set image index for a specific item
  const setImageIndex = (itemTitle: string, index: number) => {
    setImageIndices(prev => ({
      ...prev,
      [itemTitle]: index
    }));
  };

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
    setModalImageIndex(prev => (prev + 1) % modalImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex(prev => (prev - 1 + modalImages.length) % modalImages.length);
  };

  const goToImage = (itemTitle: string, index: number) => {
    setImageIndex(itemTitle, index);
  };
  return <>
      <section id="competitions" className="py-20 bg-gradient-to-br from-primary/10 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              {competitionData.title}
            </h2>
            <div className="font-inter text-gray-600 max-w-3xl mx-auto mb-8 text-lg" 
                 dangerouslySetInnerHTML={{ __html: competitionData.subtitle }} />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <Tabs defaultValue={competitionData.items[0]?.title.toLowerCase().replace(/\s+/g, '-') || "solo"} className="w-full">
                <TabsList className={`grid w-full grid-cols-${competitionData.items.length} mb-8 bg-gray-50 p-1 rounded-xl h-14 max-w-md mx-auto`}>
                  {competitionData.items.map((item, index) => (
                    <TabsTrigger 
                      key={index}
                      value={item.title?.toLowerCase().replace(/\s+/g, '-')}
                      className="text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-white/50"
                    >
                      {item.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {competitionData.items.map((item, index) => {
                  const itemImages = item.images?.nodes?.map(img => img.mediaItemUrl) || [];
                  const currentImageIndex = getImageIndex(item.title);
                  
                  return (
                    <TabsContent key={index} value={item.title?.toLowerCase().replace(/\s+/g, '-')} className="mt-6">
                      <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div className="relative">
                          <div className="relative h-64 overflow-hidden rounded-xl">
                            {itemImages.map((image, imgIndex) => (
                              <img 
                                key={imgIndex} 
                                src={image} 
                                alt={item.images?.nodes?.[imgIndex]?.altText || `${item.title} - Image ${imgIndex + 1}`} 
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 cursor-pointer ${imgIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} 
                                onClick={() => openModal(itemImages, imgIndex, item.title)} 
                              />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                          </div>
                          
                          {/* Pagination dots */}
                          {itemImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                              {itemImages.map((_, imgIndex) => (
                                <button 
                                  key={imgIndex} 
                                  onClick={() => goToImage(item.title || '', imgIndex)} 
                                  className={`w-2 h-2 rounded-full transition-colors ${imgIndex === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`} 
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-playfair text-primary text-2xl font-semibold">
                            {item.title || ''}
                          </h4>
                          <div className="text-gray-700 text-base font-normal" 
                               dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen image modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-screen max-h-screen w-screen h-screen p-0 bg-black/60 border-none flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button onClick={closeModal} className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Main image container - centered with proper aspect ratio */}
            <div className="relative flex items-center justify-center w-full h-full px-16">
              {/* Main image - 80% of screen size with proper centering */}
              <img src={modalImages[modalImageIndex]} alt={`${modalTitle} - Image ${modalImageIndex + 1}`} className="max-w-[80%] max-h-[80%] object-contain" />

              {/* Navigation arrows - positioned relative to the image container */}
              {modalImages.length > 1 && <>
                  <button onClick={prevModalImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors z-40">
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                  <button onClick={nextModalImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors z-40">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </button>
                </>}
            </div>

            {/* Image counter - positioned at bottom center */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {modalImageIndex + 1} / {modalImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default CompetitionExcellenceSection;