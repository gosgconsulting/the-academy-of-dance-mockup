import { HomePageAboutUs } from "@/lib/graphql";

interface AboutUsSectionProps {
  data?: HomePageAboutUs;
}

const DEFAULT_DATA: HomePageAboutUs = {
  title: "About Us",
  label: "Our Story",
  content: `<p>At The Academy of Dance (TAD), we merge passion with precision. Dance is not just an art form for us; it is our passion. At TAD, we believe that dance transcends mere movements and steps. It is a profound expression of the soul and a vital journey of self-discovery and improvement. Established in 2019, TAD has since emerged as one of the most renowned dance schools in Singapore.</p>
<p>What distinguishes us is our devoted team of teachers who not only have extensive experience in their respective genres but also possess a profound passion for sharing the love of dance and providing a comprehensive education for dancers.</p>
<p>At TAD, our teachers foster an encouraging environment for everyone, from beginners taking their first steps to seasoned dancers gracing the stage. We prioritize our students' progress to ensure every dancer achieves their fullest potential. Whether your aim is to pursue a professional dance career, maintain fitness, or simply enjoy moving to the rhythm, we are here to support you in reaching your goals.</p>`,
  points: [],
  video: {
    node: {
      mediaItemUrl: ""
    }
  }
};

const AboutUsSection = ({ data: aboutData = DEFAULT_DATA }: AboutUsSectionProps) => {
  // Debug log to see what's coming from the API
  console.log("About Us Data:", aboutData);
  console.log("Video URL:", aboutData?.video?.node?.mediaItemUrl);
  
  // Get the video URL from the API or use a placeholder
  const videoUrl = aboutData?.video?.node?.mediaItemUrl || "https://theacademyofdance.sg/cms/wp-content/uploads/2025/09/Placeholder-video.mp4";
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {aboutData.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div className="space-y-6">
            <h3 className="font-playfair text-3xl font-bold text-primary mb-4">{aboutData.label}</h3>
            <div 
              className="space-y-6 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData.content }}
            />
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl">
            <video 
              className="w-full h-auto"
              controls
              autoPlay
              muted
              loop
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;