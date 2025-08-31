
import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useContentLoader } from "@/hooks/useContentLoader";

interface GalleryItem {
  image: string;
  title: string;
}

interface GalleryContent {
  title: string;
  description: string;
  galleryItems: GalleryItem[];
}

const GallerySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const { getSectionContent, isLoading } = useContentLoader('index');
  const content = getSectionContent('gallery') as GalleryContent;
  const galleryItems = content?.galleryItems || [];

  // Don't render if still loading or no gallery items
  if (isLoading || !galleryItems || galleryItems.length === 0) {
    return (
      <section id="gallery" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Our Students Shine
            </h2>
            <p className="font-inter text-gray-300 max-w-2xl mx-auto text-lg">
              Loading gallery...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const openModal = (imageIndex: number) => {
    if (galleryItems && galleryItems[imageIndex]) {
      setModalImageIndex(imageIndex);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <>
      <section id="gallery" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              {content?.title || 'Our Students Shine'}
            </h2>
            <p className="font-inter text-gray-300 max-w-2xl mx-auto text-lg">
              {content?.description || 'Witness the artistry, passion, and technical excellence of our dancers across all disciplines.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-playfair text-lg font-semibold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              {galleryItems[modalImageIndex] && (
                <img
                  src={galleryItems[modalImageIndex].image}
                  alt={galleryItems[modalImageIndex].title}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              )}

              {/* Navigation arrows - positioned relative to the image container */}
              {galleryItems.length > 1 && (
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
            {galleryItems.length > 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {modalImageIndex + 1} / {galleryItems.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GallerySection;
