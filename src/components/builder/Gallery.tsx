import { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

interface GalleryProps {
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
  columns?: number;
}

const Gallery = ({ 
  title = "Studio Gallery",
  subtitle = "Take a peek inside our beautiful dance studios and see our students in action",
  images = [],
  columns = 3
}: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const defaultImages: GalleryImage[] = [
    {
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Ballet class in progress",
      category: "Classes"
    },
    {
      src: "https://images.unsplash.com/photo-1594736797933-d0401ba1e808?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Contemporary dance performance",
      category: "Performances"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Hip hop dance group",
      category: "Classes"
    },
    {
      src: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Jazz dance performance",
      category: "Performances"
    },
    {
      src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Dance studio interior",
      category: "Studio"
    },
    {
      src: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Young dancers practicing",
      category: "Classes"
    },
    {
      src: "https://images.unsplash.com/photo-1583925566308-06b89e0f7b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Dance recital performance",
      category: "Performances"
    },
    {
      src: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Modern dance studio",
      category: "Studio"
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Ballet barre practice",
      category: "Classes"
    }
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4'
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          
          <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[3]} gap-4`}>
            {displayImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="font-semibold">{image.alt}</p>
                    {image.category && (
                      <p className="text-sm text-white/80">{image.category}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <p className="font-semibold">{selectedImage.alt}</p>
              {selectedImage.category && (
                <p className="text-sm text-white/80">{selectedImage.category}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
