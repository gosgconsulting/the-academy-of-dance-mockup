import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ProgrammesExamsSection = () => {
  // State for programmes carousel
  const [currentProgrammeIndex, setCurrentProgrammeIndex] = useState(0);
  
  // State for exam images and modal
  const [currentRadImageIndex, setCurrentRadImageIndex] = useState(0);
  const [currentCstdImageIndex, setCurrentCstdImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState("");

  const programmes = [
    {
      title: "Ballet",
      image: "/lovable-uploads/da5c9831-e15c-4c80-bf8c-169e3bb472fc.png",
      description: "At TAD, ballet is taught with a strong foundation in classical technique, combined with a deep respect for each dancer's unique journey.",
      color: "border-stat-1/20 hover:border-stat-1/40"
    },
    {
      title: "Baby Gems",
      image: "/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png",
      description: "A program like no other, created for our youngest dancers, aged 3 to 4 years old, to develop musicality, coordination and basic dance fundamentals.",
      color: "border-stat-2/20 hover:border-stat-2/40"
    },
    {
      title: "Adult Fitness/Ballet",
      image: "/lovable-uploads/f883c8a8-3f19-4bce-871e-2f48e153c2f9.png",
      description: "The perfect blend of elegance, fitness, and fun—no previous dance experience required!",
      color: "border-stat-3/20 hover:border-stat-3/40"
    },
    {
      title: "Jazz",
      image: "/lovable-uploads/3f806d09-71f1-4c34-8591-8c2dd21fe346.png",
      description: "Dynamic and energetic, our jazz classes focus on sharp movements, isolations, and performance quality.",
      color: "border-stat-4/20 hover:border-stat-4/40"
    },
    {
      title: "Lyrical",
      image: "/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png",
      description: "A beautiful fusion of ballet technique with emotional storytelling through flowing, graceful choreography.",
      color: "border-stat-1/20 hover:border-stat-1/40"
    },
    {
      title: "Contemporary",
      image: "/lovable-uploads/cc1b8cc0-3767-4760-9f8a-3015d9e2a2f6.png",
      description: "Modern movement that breaks traditional dance boundaries, focusing on versatility and creativity.",
      color: "border-stat-2/20 hover:border-stat-2/40"
    },
    {
      title: "Hip Hop",
      image: "/lovable-uploads/3e19f9a6-1e4b-40f4-9c80-638142fb2bf5.png",
      description: "Street-style dance that emphasizes personal expression, creativity, and urban choreography.",
      color: "border-stat-3/20 hover:border-stat-3/40"
    },
    {
      title: "Tap",
      image: "/lovable-uploads/026cddda-e890-486d-be1e-8052ff34515e.png",
      description: "Create music with your feet! Develop rhythm, coordination, and musicality through traditional tap techniques.",
      color: "border-stat-4/20 hover:border-stat-4/40"
    },
    {
      title: "Tumbling",
      image: "/lovable-uploads/96dbee1c-cdd5-4735-a8ab-21e83d6f99c2.png",
      description: "Build strength, flexibility, and acrobatic skills in a safe, progressive environment.",
      color: "border-stat-1/20 hover:border-stat-1/40"
    },
    {
      title: "DSA Programme",
      image: "/lovable-uploads/7a4ccb94-8ec9-4b6d-b752-7c91c6c547c4.png",
      description: "Specialized training for Direct School Admission, with 95% success rate for desired secondary schools.",
      color: "border-stat-2/20 hover:border-stat-2/40"
    }
  ];

  const radImages = [
    "/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png",
    "/lovable-uploads/2085b60d-2383-47b3-9252-fea94e4cbbd5.png",
    "/lovable-uploads/996fb449-b3aa-4ec3-acca-2dad9c8a5ac4.png",
    "/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png"
  ];

  const cstdImages = [
    "/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png",
    "/lovable-uploads/5c8d3ad4-fac2-4255-8c25-231c28b272da.png",
    "/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png",
    "/lovable-uploads/9b23aa52-1bb4-4e41-b2c0-f26892b6aa20.png"
  ];

  const nextProgramme = () => {
    setCurrentProgrammeIndex((prev) => (prev + 1) % programmes.length);
  };

  const prevProgramme = () => {
    setCurrentProgrammeIndex((prev) => (prev - 1 + programmes.length) % programmes.length);
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
    setModalImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  const getVisibleProgrammes = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentProgrammeIndex + i) % programmes.length;
      visible.push(programmes[index]);
    }
    return visible;
  };

  return (
    <section id="programmes-exams" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Programmes & Examinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our comprehensive dance programmes and professional examination courses.
          </p>
        </div>

        <Tabs defaultValue="programmes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12 h-14 bg-card-vibrant border border-primary/10">
            <TabsTrigger 
              value="programmes" 
              className="h-12 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
            >
              Dance Programmes
            </TabsTrigger>
            <TabsTrigger 
              value="examinations" 
              className="h-12 text-base font-semibold data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
            >
              Examination Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="programmes" className="space-y-8">
            <div className="relative">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={prevProgramme}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200 text-primary"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex space-x-6 overflow-hidden">
                  {getVisibleProgrammes().map((programme, index) => (
                    <Card key={index} className={`w-80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${programme.color} bg-card-vibrant`}>
                      <div className="relative">
                        <img 
                          src={programme.image} 
                          alt={programme.title} 
                          className="w-full h-48 object-cover rounded-t-lg" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-playfair text-xl font-bold text-primary mb-3">
                          {programme.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {programme.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <button
                  onClick={nextProgramme}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200 text-primary"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {programmes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProgrammeIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === currentProgrammeIndex ? 'bg-primary' : 'bg-primary/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examinations" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* RAD Ballet */}
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-secondary/20 hover:border-secondary/40 bg-card-vibrant">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-secondary mb-4 text-center">
                    RAD Ballet Examinations
                  </h3>
                  
                  <div className="relative mb-4">
                    <img
                      src={radImages[currentRadImageIndex]}
                      alt="RAD Ballet"
                      className="w-full h-64 object-cover rounded-lg cursor-pointer"
                      onClick={() => openModal(radImages, currentRadImageIndex, "RAD Ballet Examinations")}
                    />
                    
                    <div className="flex justify-center mt-4">
                      <div className="flex space-x-2">
                        {radImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentRadImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                              index === currentRadImageIndex ? 'bg-secondary' : 'bg-secondary/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed">
                    The Royal Academy of Dance (RAD) is one of the world's most influential dance education and training organizations. 
                    Our RAD examination courses provide structured, progressive training in classical ballet technique, 
                    preparing students for internationally recognized qualifications.
                  </p>
                </CardContent>
              </Card>

              {/* CSTD Jazz and Tap */}
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-accent/20 hover:border-accent/40 bg-card-vibrant">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-accent mb-4 text-center">
                    CSTD Jazz and Tap Examinations
                  </h3>
                  
                  <div className="relative mb-4">
                    <img
                      src={cstdImages[currentCstdImageIndex]}
                      alt="CSTD Jazz and Tap"
                      className="w-full h-64 object-cover rounded-lg cursor-pointer"
                      onClick={() => openModal(cstdImages, currentCstdImageIndex, "CSTD Jazz and Tap Examinations")}
                    />
                    
                    <div className="flex justify-center mt-4">
                      <div className="flex space-x-2">
                        {cstdImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentCstdImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                              index === currentCstdImageIndex ? 'bg-accent' : 'bg-accent/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed">
                    The Commonwealth Society of Teachers of Dancing (CSTD) offers comprehensive examination syllabi 
                    in Jazz and Tap dance. Our courses develop technical proficiency, artistic expression, 
                    and performance skills through structured learning progressions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95">
            <div className="relative flex items-center justify-center h-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={prevModalImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={modalImages[modalImageIndex]}
                alt={modalTitle}
                className="max-w-full max-h-full object-contain"
              />

              <button
                onClick={nextModalImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {modalImageIndex + 1} / {modalImages.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProgrammesExamsSection;