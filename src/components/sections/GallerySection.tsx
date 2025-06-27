
const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Our Students Shine
          </h2>
          <p className="font-inter text-gray-300 max-w-2xl mx-auto text-lg">
            Witness the artistry, passion, and technical excellence of our
            dancers across all disciplines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
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
          ].map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300"
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
  );
};

export default GallerySection;
