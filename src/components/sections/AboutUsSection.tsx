import { HomePageAboutUs } from "@/lib/graphql";
import { useEffect, useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  
  // Use a local video as fallback
  const localVideoUrl = "/assets/videos/placeholder-video.mp4";
  
  // Get the video URL from the API
  const apiVideoUrl = aboutData?.video?.node?.mediaItemUrl;
  
  // Use the API video URL if available, otherwise use the local fallback
  const [videoUrl, setVideoUrl] = useState(apiVideoUrl || localVideoUrl);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleError = () => {
      console.error("Video failed to load:", videoUrl);
      setVideoError(true);
      
      // If we're already using the local video or if there's no API video, don't try to switch
      if (videoUrl === localVideoUrl || !apiVideoUrl) {
        return;
      }
      
      // Switch to local video if API video fails
      setVideoUrl(localVideoUrl);
    };
    
    videoElement.addEventListener("error", handleError);
    
    return () => {
      videoElement.removeEventListener("error", handleError);
    };
  }, [videoUrl, localVideoUrl, apiVideoUrl]);
  
  // Ensure autoplay works, especially on mobile devices
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    // Try to play the video when it's loaded
    const playVideo = () => {
      videoElement.play().catch(err => {
        console.log("Autoplay prevented:", err);
        // Some browsers require user interaction before autoplay
      });
    };
    
    videoElement.addEventListener('loadeddata', playVideo);
    
    // Also try to play on window focus/click
    const handleWindowClick = () => {
      if (videoElement.paused) {
        playVideo();
      }
    };
    
    window.addEventListener('click', handleWindowClick);
    
    return () => {
      videoElement.removeEventListener('loadeddata', playVideo);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);
  
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
            {videoError && videoUrl === localVideoUrl ? (
              <div className="bg-gray-200 w-full h-64 flex items-center justify-center text-gray-500">
                <p>Video could not be loaded. Please try again later.</p>
              </div>
            ) : (
              <video 
                ref={videoRef}
                className="w-full h-auto"
                controls
                autoPlay
                playsInline
                muted
                loop
                crossOrigin="anonymous"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;