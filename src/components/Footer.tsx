import { Facebook, Instagram, Youtube } from "lucide-react";
import TikTokIcon from "./TikTokIcon";
import { HeaderFooterSettings } from "@/lib/graphql";

// Default data fallback
const DEFAULT_FOOTER_DATA = {
  footer: {
    logo: {
      node: {
        mediaItemUrl: "/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png",
        altText: "The Academy of Dance"
      }
    },
    tagline: "Where dreams take flight through the art of dance",
    socialMediaLinks: [
      { platform: ["facebook"], url: "https://www.facebook.com/theacademyofdancesg" },
      { platform: ["instagram"], url: "https://www.instagram.com/theacademyofdancesg/" },
      { platform: ["youtube"], url: "https://youtube.com/@theacademyofdancesg?si=2MnmNVoLWYiZXRwP" },
      { platform: ["tiktok"], url: "https://www.tiktok.com/@theacademyofdance?_t=ZS-8xi8hlguC0Y&_r=1" }
    ],
    legalLinks: [
      { label: "Terms & Conditions", url: "/terms-conditions" },
      { label: "Privacy Policy", url: "/privacy-policy" }
    ],
    copyright: "© 2024 The Academy of Dance. All rights reserved."
  }
};

interface FooterProps {
  data?: HeaderFooterSettings;
}

const Footer = ({ data }: FooterProps) => {
  // Use data from props or fallback to default data
  const footerData = data?.footer || DEFAULT_FOOTER_DATA.footer;

  // Helper function to get social media icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-5 h-5 text-white" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-white" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-white" />;
      case 'tiktok':
        return <TikTokIcon className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  // Helper function to get social media button classes
  const getSocialButtonClasses = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return "bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors";
      case 'instagram':
        return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 rounded-full transition-colors";
      case 'youtube':
        return "bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors";
      case 'tiktok':
        return "bg-black hover:bg-gray-800 p-2 rounded-full transition-colors border border-white";
      default:
        return "bg-gray-600 hover:bg-gray-700 p-2 rounded-full transition-colors";
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-1 gap-8 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={footerData.logo.node.mediaItemUrl} 
                alt={footerData.logo.node.altText || "The Academy of Dance"} 
                className="h-12 md:h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-gray-300 mb-6">{footerData.tagline}</p>
            
            <div className="flex justify-center space-x-4">
              {footerData.socialMediaLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={getSocialButtonClasses(social.platform[0])}
                >
                  {getSocialIcon(social.platform[0])}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-700 pt-8">
          <div className="flex justify-center space-x-8 text-sm mb-4">
            {footerData.legalLinks.map((link, index) => (
              <a key={index} href={link.url} className="hover:text-secondary transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-gray-400 text-sm">
            {footerData.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
