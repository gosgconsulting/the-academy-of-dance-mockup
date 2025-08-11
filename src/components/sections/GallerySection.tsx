
import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface GalleryHeaderProps { title: string; subtitle: string }
const GallerySection = ({ title, subtitle }: GalleryHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const galleryItems = [
    {
      image: "/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png",
      title: "Melbourne Dance Exchange 2023",
    },
    {
      image: "/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png",
      title: "Ballet Class Excellence",
    },
    {
      image: "/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png",
      title: "International Adventures",
    },
    {
      image: "/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png",
      title: "Performance Ready",
    },
    {
      image: "/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png",
      title: "Dance Community",
    },
    {
      image: "/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png",
      title: "Young Performers",
    },
  ];

  const openModal = (imageIndex: number) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
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
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">{title}</h2>
            <p className="font-inter text-gray-300 max-w-2xl mx-auto text-lg">{subtitle}</p>
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
              <img
                src={galleryItems[modalImageIndex].image}
                alt={galleryItems[modalImageIndex].title}
                className="max-w-[80%] max-h-[80%] object-contain"
              />

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
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {modalImageIndex + 1} / {galleryItems.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GallerySection;
