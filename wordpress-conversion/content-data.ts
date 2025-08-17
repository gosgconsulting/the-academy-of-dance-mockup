// Content data that will be converted to WordPress customizer options and ACF fields

export const siteConfig = {
  siteName: "The Academy of Dance",
  tagline: "Where Dreams Take Flight",
  description: "Singapore's premier dance academy offering professional dance instruction for all ages. Book your trial class today!",
  logo: "/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png",
};

export const heroContent = {
  title: "Where Dreams",
  subtitle: "Take Flight", 
  description: "Singapore's premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.",
  ctaText: "Start Your Journey",
  images: [
    '/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png',
    '/lovable-uploads/fafdb3ad-f058-4c32-9065-7d540d362cd7.png', 
    '/lovable-uploads/0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png',
    '/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png',
    '/lovable-uploads/21352692-5e60-425a-9355-ba3fc13af268.png'
  ]
};

export const socialLinks = {
  facebook: "https://www.facebook.com/theacademyofdancesg",
  instagram: "https://www.instagram.com/theacademyofdancesg/",
  youtube: "https://youtube.com/@theacademyofdancesg?si=2MnmNVoLWYiZXRwP",
  tiktok: "https://www.tiktok.com/@theacademyofdance?_t=ZS-8xi8hlguC0Y&_r=1"
};

export const navigationMenu = [
  { label: "Home", target: "hero" },
  { label: "Trials", target: "trials" },
  { label: "About Us", target: "about" }, 
  { label: "Programmes", target: "programmes" },
  { label: "Reviews", target: "reviews" },
  { label: "Teachers", target: "teachers" },
  { label: "Gallery", target: "gallery" },
  { label: "Blog", target: "/blog", isPage: true }
];

export const statisticsData = [
  {
    number: "500+",
    label: "Students Trained",
    color: "violet"
  },
  {
    number: "15+", 
    label: "Years Experience",
    color: "emerald"
  },
  {
    number: "95%",
    label: "Success Rate", 
    color: "orange"
  },
  {
    number: "20+",
    label: "Awards Won",
    color: "rose"
  }
];

// This data structure will be used to generate WordPress customizer fields
// and ACF field groups for easy content management