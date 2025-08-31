-- Create comprehensive schemas for all page sections

-- First ensure we have an index page
INSERT INTO pages (title, slug, description, status) 
VALUES ('Homepage', 'index', 'Main landing page', 'published')
ON CONFLICT (slug) DO NOTHING;

-- Get the page ID for subsequent inserts
DO $$
DECLARE
    page_uuid UUID;
BEGIN
    SELECT id INTO page_uuid FROM pages WHERE slug = 'index';

    -- Hero Section
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'hero', 
        'HeroSection',
        jsonb_build_object(
            'title', 'Where Dreams',
            'titleHighlight', 'Take Flight',
            'subtitle', 'Singapore''s premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.',
            'ctaButtonText', 'Start Your Journey',
            'backgroundImages', jsonb_build_array(
                '/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png',
                '/lovable-uploads/fafdb3ad-f058-4c32-9065-7d540d362cd7.png',
                '/lovable-uploads/0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png',
                '/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png',
                '/lovable-uploads/21352692-5e60-425a-9355-ba3fc13af268.png'
            )
        ),
        1
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- Statistics Section (if doesn't exist)
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'statistics', 
        'StatisticsSection',
        jsonb_build_object(
            'title', 'Our Impact in Numbers',
            'description', 'Celebrating our achievements and growth in dance education',
            'statistics', jsonb_build_array(
                jsonb_build_object('number', '1000+', 'label', 'Students Trained', 'color', 'text-violet-500'),
                jsonb_build_object('number', '15+', 'label', 'Years Excellence', 'color', 'text-emerald-500'),
                jsonb_build_object('number', '95%', 'label', 'Success Rate', 'color', 'text-orange-500'),
                jsonb_build_object('number', '200+', 'label', 'Awards Won', 'color', 'text-rose-500')
            )
        ),
        2
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- Trials Section
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'trials', 
        'TrialsSection',
        jsonb_build_object(
            'title', 'Begin Your Dance Journey',
            'subtitle', 'Jump into dance with a $20 trial class! Experience top-tier instruction and find your perfect style.',
            'benefits', jsonb_build_array(
                'Ballet, Jazz, Lyrical & Contemporary, Hip Hop, Tap',
                'Tumbling classes are also available as our new course',
                'You can join our trial classes for just $20!',
                'Professional instructors with international experience',
                'Small class sizes for personalized attention',
                'Ages 3 to adult - everyone welcome'
            ),
            'contactInfo', jsonb_build_object(
                'name', 'Ms June Lee',
                'phone', '(65) 9837 2670',
                'address', jsonb_build_object(
                    'location', 'Tampines',
                    'line1', '510 Tampines Central 1, #02-250',
                    'line2', 'Singapore 520510'
                )
            )
        ),
        3
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- About Us Section
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'about', 
        'AboutUsSection',
        jsonb_build_object(
            'title', 'About Us',
            'storyTitle', 'Our Story',
            'storyParagraphs', jsonb_build_array(
                'At The Academy of Dance (TAD), we merge passion with precision. Our tagline, "Our insatiable passion for dance," truly encapsulates the spirit of TAD. Dance is not just an art form for us; it is our passion. At TAD, we believe that dance transcends mere movements and steps. It is a profound expression of the soul and a vital journey of self-discovery and improvement. Established in 2019, TAD has since emerged as one of the most renowned dance schools in Singapore.',
                'What distinguishes us is our devoted team of teachers who not only have extensive experience in their respective genres but also possess a profound passion for sharing the love of dance and providing a comprehensive education for dancers.',
                'At TAD, our teachers foster an encouraging environment for everyone, from beginners taking their first steps to seasoned dancers gracing the stage. We prioritize our students'' progress to ensure every dancer achieves their fullest potential. Whether your aim is to pursue a professional dance career, maintain fitness, or simply enjoy moving to the rhythm, we are here to support you in reaching your goals.'
            ),
            'features', jsonb_build_array(
                jsonb_build_object('icon', 'Users', 'title', 'Expert Faculty', 'description', 'Internationally trained instructors with decades of experience'),
                jsonb_build_object('icon', 'Heart', 'title', 'Passion Driven', 'description', 'Every class is taught with love, dedication, and enthusiasm'),
                jsonb_build_object('icon', 'Award', 'title', 'Award Winning', 'description', 'Over 1000 awards and recognitions in competitions'),
                jsonb_build_object('icon', 'Target', 'title', 'Goal Oriented', 'description', 'Structured curriculum designed for measurable progress')
            )
        ),
        4
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- Vision Mission Section
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'vision-mission', 
        'VisionMissionSection',
        jsonb_build_object(
            'cards', jsonb_build_array(
                jsonb_build_object('type', 'vision', 'title', 'Our Vision', 'content', 'To nurture dancers with passion and compassion', 'color', 'violet'),
                jsonb_build_object('type', 'mission', 'title', 'Our Mission', 'content', 'To create a conducive, wholesome, enriching and loving environment to inspire and groom passionate dancers to be the best that they can be and to challenge themselves to be better people', 'color', 'emerald'),
                jsonb_build_object('type', 'tagline', 'title', 'Tagline', 'content', 'Our insatiable passion for dance', 'color', 'orange')
            )
        ),
        5
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- Teachers Section
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'teachers', 
        'TeachersSection',
        jsonb_build_object(
            'title', 'Our Instructors',
            'description', 'Learn from internationally trained professionals who bring decades of experience and genuine passion for dance education.',
            'teachers', jsonb_build_array(
                jsonb_build_object(
                    'name', 'Ms June Lee',
                    'specialty', 'Founder',
                    'credentials', '41 years of experience',
                    'experience', 'Ms. June Lee is a veteran dance educator and choreographer whose 41-year career has inspired students, earned international awards, and featured in prestigious global events.',
                    'image', '/lovable-uploads/07de0001-b755-433d-8b27-b1d01335b772.png',
                    'isFounder', true
                ),
                jsonb_build_object(
                    'name', 'Ms Tan Jia Jia',
                    'specialty', 'Yishun Head',
                    'credentials', 'International exposure & competitive track record',
                    'experience', 'Ms. Tan Jia Jia is an experienced, versatile dance educator with international exposure and a strong competitive track record.',
                    'image', '/lovable-uploads/996fb449-b3aa-4ec3-acca-2dad9c8a5ac4.png'
                ),
                jsonb_build_object(
                    'name', 'Ms Jasmine Koh',
                    'specialty', 'Classical Ballet Expert',
                    'credentials', '25 years experience, RAD & CSTD certified',
                    'experience', 'Ms. Jasmine Koh is a passionate dancer and educator with 25 years of experience, trained in ballet, jazz, and tap, and certified under RAD and CSTD.',
                    'image', '/lovable-uploads/444d487e-9e10-4a56-9e2a-409250051960.png'
                ),
                jsonb_build_object(
                    'name', 'Ms Annabelle Ong',
                    'specialty', 'Inspirational Educator',
                    'credentials', 'Started at 17, full-time design career',
                    'experience', 'Ms. Annabelle Ong is a dedicated dancer and teacher who, despite starting at 17, has performed widely and now inspires young dancers while balancing a full-time design career.',
                    'image', '/lovable-uploads/8850b256-158e-4e7c-852c-d736bb723229.png'
                ),
                jsonb_build_object(
                    'name', 'Ms Jacqueline Macpherson',
                    'specialty', 'Award-Winning Performer',
                    'credentials', 'International performance experience',
                    'experience', 'Ms. Jacqueline Macpherson is an award-winning dancer with international performance experience who now aims to share her passion for dance through teaching.',
                    'image', '/lovable-uploads/58297713-194b-4e3b-bea0-554b437b8af0.png'
                )
            )
        ),
        10
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- Reviews Section  
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'reviews', 
        'ReviewsSection',
        jsonb_build_object(
            'title', 'What Parents Say',
            'description', 'Discover why families trust us with their children''s dance education and artistic development.',
            'reviews', jsonb_build_array(
                jsonb_build_object('name', 'Sarah Chen', 'role', 'Parent of Emma, Age 8', 'content', 'The Academy of Dance has transformed my shy daughter into a confident performer. The teachers are exceptional and truly care about each child''s progress.', 'rating', 5),
                jsonb_build_object('name', 'Michael Tan', 'role', 'Parent of Lucas, Age 12', 'content', 'Outstanding instruction and facilities. My son has developed incredible discipline and artistry. The recitals are professionally produced and showcase real talent.', 'rating', 5),
                jsonb_build_object('name', 'Priya Patel', 'role', 'Parent of Aria, Age 6', 'content', 'We''ve tried several dance schools, but none compare to the quality and care here. The trial class sold us immediately - it''s worth every dollar.', 'rating', 5),
                jsonb_build_object('name', 'David Wong', 'role', 'Parent of Sophie, Age 10', 'content', 'The progress my daughter has made in just one year is incredible. She''s gained so much confidence and technical skill. The teachers are patient and encouraging.', 'rating', 5)
            )
        ),
        11
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- Locations Section
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'locations', 
        'LocationsSection',
        jsonb_build_object(
            'title', 'Our Locations',
            'description', 'Visit us at our convenient locations across Singapore for world-class dance education.',
            'locations', jsonb_build_array(
                jsonb_build_object(
                    'name', 'Tampines',
                    'address', jsonb_build_object(
                        'line1', '510 Tampines Central 1',
                        'line2', '#02-250',
                        'line3', 'Singapore 520510'
                    ),
                    'phone', '(65) 9837 2670',
                    'image', '/lovable-uploads/c30a6afd-4e61-4b4a-aa55-2a97f577433b.png',
                    'mapsUrl', 'https://maps.google.com/maps?q=510+Tampines+Central+1+%2302-250+Singapore+520510'
                ),
                jsonb_build_object(
                    'name', 'Yishun',
                    'address', jsonb_build_object(
                        'line1', 'Wisteria Mall, 598 Yishun Ring Road',
                        'line2', '#01-35/36',
                        'line3', 'Singapore 768698'
                    ),
                    'phone', '(65) 9337 8605',
                    'image', '/lovable-uploads/b035362d-9d9c-496a-b0b6-dcab5c996d55.png',
                    'mapsUrl', 'https://maps.google.com/maps?q=Wisteria+Mall+598+Yishun+Ring+Road+%2301-35%2F36+Singapore+768698'
                )
            )
        ),
        12
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

    -- Gallery Section
    INSERT INTO page_sections (page_id, section_id, section_type, content, order_index) 
    VALUES (
        page_uuid, 
        'gallery', 
        'GallerySection',
        jsonb_build_object(
            'title', 'Our Students Shine',
            'description', 'Witness the artistry, passion, and technical excellence of our dancers across all disciplines.',
            'galleryItems', jsonb_build_array(
                jsonb_build_object('image', '/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png', 'title', 'Melbourne Dance Exchange 2023'),
                jsonb_build_object('image', '/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png', 'title', 'Ballet Class Excellence'),
                jsonb_build_object('image', '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png', 'title', 'International Adventures'),
                jsonb_build_object('image', '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png', 'title', 'Performance Ready'),
                jsonb_build_object('image', '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png', 'title', 'Dance Community'),
                jsonb_build_object('image', '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png', 'title', 'Young Performers')
            )
        ),
        13
    ) ON CONFLICT (page_id, section_id) DO UPDATE SET content = EXCLUDED.content;

END $$;