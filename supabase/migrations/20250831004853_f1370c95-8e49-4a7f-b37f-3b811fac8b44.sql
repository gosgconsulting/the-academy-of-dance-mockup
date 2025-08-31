-- Fix the hero section slides with correct dance academy content
UPDATE page_sections 
SET content = jsonb_set(content, '{slides}', '[
  {
    "title": "Where Dreams",
    "subtitle": "Take Flight", 
    "description": "Singapore''s premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.",
    "backgroundImage": "/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png",
    "buttonText": "Start Your Journey",
    "buttonLink": "#trials",
    "duration": "5"
  },
  {
    "title": "Artistic Excellence",
    "subtitle": "Dance With Passion",
    "description": "Experience world-class ballet and dance training with our professional instructors in our state-of-the-art studios.",
    "backgroundImage": "/lovable-uploads/fafdb3ad-f058-4c32-9065-7d540d362cd7.png", 
    "buttonText": "Learn More",
    "buttonLink": "#programmes",
    "duration": "5"
  },
  {
    "title": "Grace & Strength",
    "subtitle": "Build Confidence",
    "description": "Develop poise, discipline and self-expression through the beautiful art of dance and ballet.",
    "backgroundImage": "/lovable-uploads/0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png",
    "buttonText": "Join Us",
    "buttonLink": "#contact", 
    "duration": "5"
  },
  {
    "title": "Performance Ready",
    "subtitle": "Shine on Stage",
    "description": "Prepare for recitals and competitions with our advanced performance training programs.",
    "backgroundImage": "/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png",
    "buttonText": "Get Started",
    "buttonLink": "#events",
    "duration": "5"
  },
  {
    "title": "Dance Family", 
    "subtitle": "Learn Together, Grow Together",
    "description": "Join our supportive dance community where students inspire each other to reach new heights.",
    "backgroundImage": "/lovable-uploads/21352692-5e60-425a-9355-ba3fc13af268.png",
    "buttonText": "Join Community",
    "buttonLink": "#about",
    "duration": "5"
  }
]'::jsonb, 
updated_at = now()
WHERE section_id = 'hero' AND page_id = 'a12089a1-20c7-4f68-9761-c9420b4d124f';