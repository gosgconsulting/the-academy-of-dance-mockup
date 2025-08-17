import { Facebook, Instagram, Youtube } from "lucide-react";
import TikTokIcon from "./TikTokIcon";

const Footer = () => {
  return (
    <footer className="bg-elegant-black text-elegant-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-1 gap-8 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png" 
                alt="The Academy of Dance" 
                className="h-12 md:h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-muted-foreground mb-6">Where dreams take flight through the art of dance</p>
            
            <div className="flex justify-center space-x-4">
              <a href="https://www.facebook.com/theacademyofdancesg" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.instagram.com/theacademyofdancesg/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 rounded-full transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://youtube.com/@theacademyofdancesg?si=2MnmNVoLWYiZXRwP" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.tiktok.com/@theacademyofdance?_t=ZS-8xi8hlguC0Y&_r=1" target="_blank" rel="noopener noreferrer" className="bg-elegant-black hover:bg-elegant-charcoal p-2 rounded-full transition-colors border border-elegant-white">
                <TikTokIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-muted pt-8">
          <div className="flex justify-center space-x-8 text-sm mb-4">
            <a href="/terms-conditions" className="hover:text-secondary transition-colors">Terms & Conditions</a>
            <a href="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</a>
          </div>
          <div className="text-muted-foreground text-sm">
            © 2024 The Academy of Dance. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
