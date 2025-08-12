import { Facebook, Instagram, Youtube } from "lucide-react";
import TikTokIcon from "./TikTokIcon";
import { usePageContent } from "@/cms/usePageContent";
import { footerDefaults, type FooterContent } from "@/cms/content/schemas/layout";
import { toSrc } from "@/lib/media";
const Footer = () => {
  const { data } = usePageContent<FooterContent>('footer', footerDefaults)
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-1 gap-8 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src={toSrc(data.logoSrc)} alt="The Academy of Dance" className="h-12 md:h-16 w-auto object-contain" />
            </div>
            <p className="text-gray-300 mb-6">{data.tagline}</p>
            
            <div className="flex justify-center space-x-4">
              {data.socials.map(s => (
                <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" className={`${s.icon === 'youtube' ? 'bg-red-600 hover:bg-red-700' : s.icon === 'facebook' ? 'bg-blue-600 hover:bg-blue-700' : s.icon === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-black hover:bg-gray-800 border border-white'} p-2 rounded-full transition-colors`}>
                  {s.icon === 'facebook' && <Facebook className="w-5 h-5 text-white" />}
                  {s.icon === 'instagram' && <Instagram className="w-5 h-5 text-white" />}
                  {s.icon === 'youtube' && <Youtube className="w-5 h-5 text-white" />}
                  {s.icon === 'tiktok' && <TikTokIcon className="w-5 h-5 text-white" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-700 pt-8">
          <div className="flex justify-center space-x-8 text-sm mb-4">
            {data.policyLinks.map(l => (
              <a key={l.href} href={l.href} className="hover:text-secondary transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="text-gray-400 text-sm">{data.copyright}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
