import { z } from 'zod'
import {
  AboutUsSectionSchema,
  ProgrammesSectionSchema,
  EventsSectionSchema,
  GallerySectionSchema,
  AchievementsSectionSchema,
  ReviewsSectionSchema,
  TeachersSectionSchema,
  LocationsSectionSchema,
  CompetitionExcellenceSectionSchema,
} from './sections'

export const HomepageContent = z.object({
  hero: z.object({
    images: z.array(z.union([z.string(), z.instanceof(File)])).default([]),
    title: z.string(),
    subtitle: z.string(),
    ctaText: z.string().default('Start Your Journey')
  }),
  sections: z.object({
    trials: z.object({
      title: z.string(),
      subtitle: z.string(),
      joinTitle: z.string(),
      contactName: z.string(),
      contactPhone: z.string(),
      bookButtonText: z.string().default('Book Now!')
    }),
    about: AboutUsSectionSchema,
    visionMission: z.object({
      vision: z.string(),
      mission: z.string(),
      tagline: z.string()
    }),
    programmes: ProgrammesSectionSchema,
    events: EventsSectionSchema,
    gallery: GallerySectionSchema,
    competitionExcellence: CompetitionExcellenceSectionSchema,
    achievements: AchievementsSectionSchema,
    reviews: ReviewsSectionSchema,
    teachers: TeachersSectionSchema,
    locations: LocationsSectionSchema
  })
})

export type HomepageContent = z.infer<typeof HomepageContent>

export const homepageDefaults: HomepageContent = {
  hero: {
    images: [
      '/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png',
      '/lovable-uploads/fafdb3ad-f058-4c32-9065-7d540d362cd7.png',
      '/lovable-uploads/0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png',
      '/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png',
      '/lovable-uploads/21352692-5e60-425a-9355-ba3fc13af268.png'
    ],
    title: 'Where Dreams\nTake Flight',
    subtitle: 'Singapore’s premium ballet and dance academy, nurturing artistic excellence and inspiring confidence through the transformative power of dance.',
    ctaText: 'Start Your Journey'
  },
  sections: {
    trials: {
      title: 'Begin Your Dance Journey',
      subtitle: 'Jump into dance with a $20 trial class! Experience top-tier instruction and find your perfect style.',
      joinTitle: 'Join Our Trial Classes',
      contactName: 'Ms June Lee',
      contactPhone: '(65) 9837 2670',
      bookButtonText: 'Book Now!'
    },
    about: {
      header: { title: 'About Us' },
      storyTitle: 'Our Story',
      storyParagraphs: [
        'At The Academy of Dance (TAD), we merge passion with precision. Our tagline, "Our insatiable passion for dance," truly encapsulates the spirit of TAD. Dance is not just an art form for us; it is our passion. At TAD, we believe that dance transcends mere movements and steps. It is a profound expression of the soul and a vital journey of self-discovery and improvement. Established in 2019, TAD has since emerged as one of the most renowned dance schools in Singapore.',
        'What distinguishes us is our devoted team of teachers who not only have extensive experience in their respective genres but also possess a profound passion for sharing the love of dance and providing a comprehensive education for dancers.',
        'At TAD, our teachers foster an encouraging environment for everyone, from beginners taking their first steps to seasoned dancers gracing the stage. We prioritize our students\' progress to ensure every dancer achieves their fullest potential. Whether your aim is to pursue a professional dance career, maintain fitness, or simply enjoy moving to the rhythm, we are here to support you in reaching your goals.'
      ]
    },
    visionMission: {
      vision: 'To nurture dancers with passion and compassion',
      mission: 'To create a conducive, wholesome, enriching and loving environment to inspire and groom passionate dancers to be the best that they can be and to challenge themselves to be better people',
      tagline: 'Our insatiable passion for dance'
    },
    programmes: {
      header: {
        title: 'Programmes & Examinations',
        subtitle: 'Discover our comprehensive dance programmes and internationally recognized examination courses designed to nurture artistry and technical excellence.'
      },
      programmes: [
        {
          id: 'ballet',
          title: 'Ballet',
          image: '/lovable-uploads/da5c9831-e15c-4c80-bf8c-169e3bb472fc.png',
          description: "At TAD, ballet is taught with a strong foundation in classical technique, combined with a deep respect for each dancer's unique journey. Our approach emphasizes both discipline and encouragement, creating an environment where students feel supported as they grow in strength, grace, and confidence.\n\nWe follow a structured syllabus that builds progressively from beginner to advanced levels, ensuring that students develop proper alignment, musicality, coordination, and artistry at every stage. Classes are tailored to age and ability, with clear goals and consistent feedback to help each dancer reach their personal best.\n\nOur experienced instructors bring passion and professionalism to every class, fostering a love for ballet while also instilling valuable life skills like perseverance, focus, and self-expression. Whether a student dreams of a professional career or simply wants to experience the beauty of ballet, we aim to nurture both the dancer and the individual."
        },
        {
          id: 'baby-gems',
          title: 'Baby Gems',
          image: '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png',
          description: 'A program like no other, our Baby Gems program is created for our youngest dancers, aged 3 to 4 years old, to develop musicality, coordination and basic dance fundamentals using nursery rhymes and timeless Disney classics. Promoting the use of their imagination, it takes the child to a land of make believe, something critical to their dance training. TAD prides herself in her very own Baby Gems program, which was carefully written and curated by our Principal Ms June Lee. It is a one-year dance program comprising a series of exercises that are both enjoyable and technically beneficial to children aged 3-4 years old.'
        },
        {
          id: 'adult-fitness',
          title: 'Adult fitness/Ballet Classes',
          image: '/lovable-uploads/f883c8a8-3f19-4bce-871e-2f48e153c2f9.png',
          description: "Our Adult Keep Fit Ballet classes at The Academy of Dance are the perfect blend of elegance, fitness, and fun—no previous dance experience required!\nThese classes are designed to improve posture, flexibility, core strength, and overall body tone, all while enjoying the grace and discipline of classical ballet. Set to beautiful music, each session offers a gentle yet effective workout that leaves you feeling energized, uplifted, and more connected to your body.\nWhether you're returning to dance or trying ballet for the first time, our welcoming and supportive environment ensures everyone feels comfortable. It's a wonderful way to stay active, reduce stress, and enjoy a bit of \"me time\" in the midst of a busy week.\nCome move, stretch, and smile with us—ballet has no age limit!"
        },
        {
          id: 'jazz',
          title: 'Jazz',
          image: '/lovable-uploads/3f806d09-71f1-4c34-8591-8c2dd21fe346.png',
          description: 'Dynamic and energetic, our jazz classes focus on sharp movements, isolations, and performance quality. Students develop rhythm, coordination, and stage presence while learning classic jazz techniques and contemporary commercial styles.'
        },
        {
          id: 'lyrical',
          title: 'Lyrical',
          image: '/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png',
          description: 'A beautiful fusion of ballet technique with emotional storytelling. Lyrical dance emphasizes the connection between music and movement, allowing dancers to express deep emotions through flowing, graceful choreography that tells a story.'
        },
        {
          id: 'contemporary',
          title: 'Contemporary',
          image: '/lovable-uploads/cc1b8cc0-3767-4760-9f8a-3015d9e2a2f6.png',
          description: 'Modern movement that breaks traditional dance boundaries. Contemporary dance incorporates elements from various dance styles, focusing on versatility, creativity, and personal expression through innovative choreography and technique.'
        },
        {
          id: 'hip-hop',
          title: 'Hip Hop',
          image: '/lovable-uploads/3e19f9a6-1e4b-40f4-9c80-638142fb2bf5.png',
          description: 'Street-style dance that emphasizes personal expression and creativity. Our hip hop classes teach foundational moves, freestyle techniques, and urban choreography while building confidence, rhythm, and individual style.'
        },
        {
          id: 'tap',
          title: 'Tap',
          image: '/lovable-uploads/026cddda-e890-486d-be1e-8052ff34515e.png',
          description: 'Create music with your feet! Our tap programme develops rhythm, coordination, and musicality through traditional tap techniques. Students learn basic steps, combinations, and improvisation while building strong rhythmic foundations.'
        },
        {
          id: 'tumbling',
          title: 'Tumbling',
          image: '/lovable-uploads/96dbee1c-cdd5-4735-a8ab-21e83d6f99c2.png',
          description: 'Our newest programme! Build strength, flexibility, and acrobatic skills in a safe, progressive environment. Students learn rolls, cartwheels, handstands, and more advanced tumbling skills that enhance their overall dance performance.'
        },
        {
          id: 'dsa',
          title: 'Direct School Admission (DSA)',
          image: '/lovable-uploads/7a4ccb94-8ec9-4b6d-b752-7c91c6c547c4.png',
          description: 'We take pride in preparing students for the Direct School Admission (DSA) scheme, offering a unique pathway for young talents to gain direct entry into esteemed Secondary Schools and Junior Colleges.\nThrough specialized training, mentorship, guiding them for interviews and their portfolios, we equip our dancers with the skills and confidence needed to excel in auditions and interviews.\n95% of our students have successfully gained admission to their desired secondary schools. This accomplishment serves as evidence of our dedication to excellence and our proficiency in nurturing talent.'
        }
      ],
      examinations: [
        {
          id: 'rad',
          title: 'Royal Academy of Dance (RAD) Ballet Examinations',
          images: [
            '/lovable-uploads/5c8d3ad4-fac2-4255-8c25-231c28b272da.png',
            '/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png',
            '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png'
          ],
          summary: "We're proud to offer the world-renowned RAD syllabus - one of the world's most influential dance education organizations from the UK. Our passionate teachers guide dancers through each grade with a comprehensive, progressive approach that builds strong technique, artistic expression, and a deep love for classical ballet.",
          bullets: [
            'World-leading classical ballet education standards',
            'Comprehensive progression for all ages and levels',
            'Focus on technical foundation & artistic expression',
            'Internationally recognized UK-based certification'
          ]
        },
        {
          id: 'cstd',
          title: 'Commonwealth Society of Teachers of Dancing (CSTD) Examinations',
          images: [
            '/lovable-uploads/7d91482b-17c3-45fc-9917-f502af760568.png',
            '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png',
            '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png'
          ],
          summary: 'We proudly offer CSTD syllabus from Australia - a world leader in holistic dance education! Our Jazz and Tap programs combine rhythm, expression, and technique with pop and street music influences, empowering dancers to reach their fullest potential as technically strong, versatile performers.',
          bullets: [
            'World-leading Australian dance education system',
            'Jazz & Tap syllabus with modern music influences',
            'Holistic development focusing on versatility',
            'Strong technique, performance skills & artistry'
          ]
        }
      ]
    },
    events: {
      header: { title: 'Our Events', subtitle: 'Join us for exciting performances, competitions, and workshops throughout the year.' },
      pastEvents: [
        {
          title: 'Melbourne Dance Exchange',
          subtitle: 'International Competition',
          description: 'Our students participated in the prestigious Melbourne Dance Exchange, showcasing their talent on an international stage.',
          images: [
            '/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png',
            '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png',
            '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png'
          ]
        },
        {
          title: 'Annual Recital',
          subtitle: 'December 2024',
          description: 'Our biggest event of the year where all our students showcase their progress and talent in a professional theater setting.',
          images: [
            '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png',
            '/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png',
            '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png'
          ]
        },
        {
          title: 'Summer Dance Intensive',
          subtitle: 'June - July 2024',
          description: 'Intensive summer program for serious dancers looking to elevate their skills with masterclasses and guest instructors.',
          images: [
            '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png',
            '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png',
            '/lovable-uploads/da5c9831-e15c-4c80-bf8c-169e3bb472fc.png'
          ]
        },
        {
          title: 'International Dance Festival',
          subtitle: 'March 2024',
          description: 'Participation in international dance festivals, giving our students exposure to global dance communities.',
          images: [
            '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png',
            '/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png',
            '/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png'
          ]
        }
      ],
      upcomingEvents: [
        { title: 'Singapore Youth Festival', date: 'April 2025', description: 'Our competitive teams will be participating in SYF Arts Presentation, showcasing contemporary and jazz pieces.' },
        { title: 'Mid-Year Showcase', date: 'June 2025', description: 'A special mid-year performance featuring our recreational and competitive students in various dance styles.' },
        { title: 'International Guest Teacher Workshop', date: 'August 2025', description: 'Special masterclasses with renowned international dance instructors covering ballet, contemporary, and jazz techniques.' },
        { title: 'Annual Recital 2025', date: 'December 2025', description: 'Our grand finale of the year featuring all students in a spectacular theatrical production.' }
      ]
    },
    competitionExcellence: {
      header: { title: 'Our Competition Classes', subtitle: 'Our elite competition team classes are designed to prepare dancers for high-level performance opportunities at regional and national competitions. We offer both solo and group competition classes, tailored to suit individual goals and team development.' },
      solo: { 
        title: 'Solo Program',
        images: [
          '/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png',
          '/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png',
          '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png'
        ],
        paragraphs: [
          'Perfect for dancers who want to shine in the spotlight! Our solo program develops individual artistry, technical precision, and stage presence that judges absolutely love.'
        ]
      },
      groups: { 
        title: 'Dance Groups',
        images: [
          '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png',
          '/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png',
          '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png'
        ],
        paragraphs: [
          'Our competitive troupes are where magic happens! These elite groups train together, compete together, and WIN together. The bond they form is as strong as their performances are spectacular.'
        ],
        note: '(These are our competitive troupes - the cream of the crop!)' 
      }
    },
    gallery: { header: { title: 'Our Students Shine', subtitle: 'Witness the artistry, passion, and technical excellence of our dancers across all disciplines.' }, items: [
      { image: '/lovable-uploads/08117ced-f7b0-4045-9bd4-3e5bd0309238.png', title: 'Melbourne Dance Exchange 2023' },
      { image: '/lovable-uploads/f07ceee7-3742-4ddb-829b-9abae14d5a11.png', title: 'Ballet Class Excellence' },
      { image: '/lovable-uploads/4ac15b36-88be-402a-b290-d345ee972ebb.png', title: 'International Adventures' },
      { image: '/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png', title: 'Performance Ready' },
      { image: '/lovable-uploads/7e239828-13dd-4df8-8124-cd525e80369c.png', title: 'Dance Community' },
      { image: '/lovable-uploads/61794c77-dac5-451f-b02e-054573c38b7c.png', title: 'Young Performers' }
    ] },
    achievements: { header: { title: 'Our Dance Competition Achievements', subtitle: 'Celebrating our students\' excellence and remarkable success in prestigious dance competitions across Asia.' }, competitions: [
      {
        icon: 'trophy',
        title: 'Get The Beat (GTB) 2025',
        results: [
          { name: 'Grace Khaw', placement: '4th', category: 'My First Solo Classical (Ballet + Demi) Pre Junior (9-10)' },
          { name: 'Vanessa Yew', placement: '4th', category: 'Intermediate Jazz Solo (14&U)' },
          { name: 'Sasha Lai', placement: '3rd', category: 'My First Solo Slow Modern (Lyrical + Contemporary) Teen (13-14)' },
          { name: 'Abigail Lim', placement: '5th', category: 'My First Solo Slow Modern (Lyrical + Contemporary) Teen (13-14)' },
          { name: 'Clarabelle Lim', placement: '5th', category: 'My First Solo Slow Modern (Lyrical + Contemporary) Senior (15-19)' },
          { name: 'Julia Ong', placement: 'Honorable Mention', category: 'My First Solo Slow Modern (Lyrical + Contemporary) Senior (15-19)' },
          { name: 'Wai Ting', placement: '5th', category: 'My First Solo Commercial (Jazz + Hip-Hop) Petite (7-8)' },
          { name: 'Edna Chew', placement: '4th', category: 'My First Solo Commercial (Jazz + Hip-Hop) Mini (0-6)' },
          { name: 'Xin En', placement: '1st', category: 'My First Solo Commercial (Jazz + Hip-Hop) Teen (13-14)' },
          { name: 'Leocadie Pochat', placement: '5th', category: 'Beginner Slow Modern (Lyrical + Contemporary) Solo Pre Junior (9-10)' },
          { name: 'Tessa Lam', placement: '5th', category: 'Beginner Slow Modern (Lyrical + Contemporary) Solo Teen (13-14)' },
          { name: 'Gretchen Lee', placement: '5th', category: 'Beginner Slow Modern (Lyrical + Contemporary) Solo Junior (11-12)' },
          { name: 'Ashleigh Zhan', placement: '2nd', category: 'Intermediate Open Solo (14&U)' },
          { name: 'Elysia Low', placement: '1st', category: 'Intermediate Any Style of Tap Solo (14&U)' },
          { name: 'Leocadie Pochat', placement: '1st', category: 'Beginner Theatrical (Musical Theatre, Tap, Song&Dance, Broadway Jazz, Acro) Solo Pre Junior (9-10)' },
          { name: 'Sasha Lai', placement: '2nd', category: 'Beginner Theatrical (Musical Theatre, Tap, Song&Dance, Broadway Jazz, Acro) Solo Teen (13-14)' },
          { name: 'Juliet Yap', placement: '1st', category: 'Intermediate Demi Character Solo (10&U)' },
          { name: 'Kayla Soo', placement: '1st', category: 'Intermediate Demi Character Solo (15&U)' },
          { name: 'Ally Patt', placement: '2nd', category: 'Intermediate Demi Character Solo (15&U)' },
          { name: 'Lyra Goh', placement: '1st', category: 'Intermediate Demi Character Solo (13&U)' },
          { name: 'Caley Toh', placement: '1st', category: 'Intermediate Demi Character Solo (16-20)' },
          { name: 'Julia Ong', placement: '3rd', category: 'Beginner Classical (Ballet + Demi) Solo Senior (15-19)' },
          { name: 'Sophia Choudhury', placement: '5th', category: 'Beginner Classical (Ballet + Demi) Solo Teen (13-14)' },
          { name: 'Abigail Lim', placement: '2nd', category: 'Beginner Classical (Ballet + Demi) Solo Teen (13-14)' },
          { name: 'Shanice Tan', placement: '3rd', category: 'Beginner Classical (Ballet + Demi) Solo Teen (13-14)' },
          { name: 'Gretchen Lee', placement: '5th', category: 'Beginner Classical (Ballet + Demi) Solo Junior (11-12)' },
          { name: 'Eliana Goh', placement: '1st', category: 'Intermediate Ballet Solo (15&U)' },
          { name: 'Dora Lam', placement: '5th', category: 'Intermediate Ballet Solo (16-20)' },
          { name: 'Ella Toh', placement: '5th', category: 'Intermediate Ballet Solo (12&U)' },
          { name: 'Precia Kum', placement: '4th', category: 'Intermediate Ballet Solo (11&U)' },
          { name: 'Shermaine Lee + Cheyanne Lim', placement: '3rd', category: 'Duo/Trio Any Other Styles Senior (15-19)' },
          { name: 'Summer Palace', placement: '1st', category: 'Group 12&U Any Other Style Large' },
          { name: 'Salute', placement: '1st', category: 'Group 12&U Tap Large' },
          { name: 'Minions', placement: '3rd', category: 'Group 6&U Jazz Small' },
          { name: 'Jessie', placement: '4th', category: 'Group 6&U Jazz Small' },
          { name: 'Mini Mouse', placement: '2nd & Gala', category: 'Group 6&U Jazz Large' },
          { name: 'Sweets', placement: '3rd', category: 'Group 6&U Jazz Large' },
          { name: 'Spoonful of Sugar', placement: '2nd', category: 'Group 8&U Any Other Style Large' },
          { name: 'Beauty and the Beast', placement: '2nd', category: 'Group 8&U Classical Large' },
          { name: 'Love the Memory', placement: '3rd', category: 'Group 10&U Lyrical Large' },
          { name: 'Dolls', placement: '1st & Gala', category: 'Group 10&U Classical Large' },
          { name: 'Chinese Tea', placement: '1st', category: 'Group 15&U Tap Large' },
          { name: 'Found Tonight', placement: '3rd', category: 'Group 15&U Lyrical Small' },
          { name: 'Arabian', placement: '1st & Gala', category: 'Group 15&U Any Other Style Large' },
          { name: 'Mai Pen Rai', placement: '2nd', category: 'Group 15&U Any Other Style Large' },
          { name: 'Learning to Fly', placement: '3rd', category: 'Group Open Age Lyrical Small' },
          { name: 'Snowflakes', placement: '1st', category: 'Group Open Age Classical Large' },
          { name: 'Waltz of the Flowers', placement: '2nd', category: 'Group Open Age Classical Large' },
          { name: 'Hot Chocolate', placement: '3rd', category: 'Group Open Age Classical Large' },
          { name: 'Bastion', placement: '3rd', category: 'Group Open Age Any Other Style Large' },
          { name: 'Candyman', placement: '3rd', category: 'Group Open Age Jazz Large' },
          { name: 'Nakshathra Sandilya', placement: 'Outstanding Group Dancer Award', category: 'Special Recognition' }
        ]
      },
      {
        icon: 'medal',
        title: 'Get The Beat (GTB) 2024',
        results: [
          { name: 'Gretchen Lee', placement: '4th', category: 'My First Solo Junior (11-12)' },
          { name: 'Group Any Other Style (6&U)', placement: '1st', category: 'Group Competition' },
          { name: 'Melanie Ng', placement: '1st', category: 'Intermediate Open Solo (15&U)' },
          { name: 'Claire Lee', placement: '5th', category: 'Beginner Theatrical (Musical Theatre/Tap/Song&Dance/Broadway Jazz/Acro) Jun 11-12' },
          { name: 'Dora Lam', placement: '5th', category: 'Intermediate Open Solo (16-20)' },
          { name: 'Group Any Other Style 8&U', placement: '2nd', category: 'Group Competition' },
          { name: 'Group Any Other Style 12&U', placement: 'Judges Choice Award', category: 'Special Award' },
          { name: 'Group Any Other Style 12&U', placement: 'Gala Finalist', category: 'Special Award' },
          { name: 'Group Any Other Style 12&U', placement: 'Judges Award for Choreography', category: 'Special Award' },
          { name: 'Melanie Ng', placement: '4th', category: 'Intermediate Ballet Solo 15&U' },
          { name: 'Elysia Low', placement: '1st', category: 'Intermediate Tap Solo 13&U' },
          { name: 'Juliet Lee', placement: '2nd', category: 'Intermediate Tap Solo 15&U' },
          { name: 'Group Classical Big Group Open', placement: '1st', category: 'Group Competition' },
          { name: 'Group Any Other Style Open', placement: '5th', category: 'Group Competition' }
        ]
      },
      {
        icon: 'award',
        title: 'Asia Pacific Dance Competition (APDC) Bangkok 2024',
        results: [
          { name: 'Group 6&U', placement: '2nd', category: 'Group Competition' },
          { name: 'Group Open Contemporary', placement: 'Honorable Mention', category: 'Group Competition' },
          { name: 'Group 8&U Jazz', placement: '2nd', category: 'Group Competition' },
          { name: 'Group 8&U Jazz', placement: 'Honorable Mention', category: 'Group Competition' },
          { name: 'Group Open Lyrical/Ballet', placement: '2nd', category: 'Group Competition' }
        ]
      },
      {
        icon: 'star',
        title: 'Singapore Regional Competitions (SRC) CSTD 2024',
        results: [
          { name: 'Group Any Other Style 13&U', placement: '1st', category: 'Group Competition' },
          { name: 'Group Acrobatics, Tap, Musical Theatre Open', placement: '1st', category: 'Group Competition' },
          { name: 'Group 6&U Jazz', placement: '3rd', category: 'Group Competition' },
          { name: 'Group Classical/Lyrical Open', placement: '2nd', category: 'Group Competition' },
          { name: 'Group 13&U Jazz', placement: 'Honorable Mention', category: 'Group Competition' },
          { name: 'Juliet Yap', placement: 'Honorable Mention', category: 'Jazz Novice Solo 10&U' },
          { name: 'Elysia Low', placement: '3rd', category: 'Tap Novice Solo 14&U' },
          { name: 'Kayla Soo', placement: '3rd', category: 'Demi Character Novice Solo 15&U' }
        ]
      },
      {
        icon: 'calendar',
        title: 'Get The Beat (GTB) 2023',
        results: [
          { name: 'Group (Open Age Classical)', placement: '1st', category: 'Group Competition' },
          { name: 'Group (Open Age Classical)', placement: '2nd', category: 'Group Competition' },
          { name: 'Groups (Open Age Lyrical)', placement: '2nd', category: 'Group Competition' },
          { name: 'Groups (8&U Jazz)', placement: '3rd', category: 'Group Competition' },
          { name: 'Groups (7&U Jazz)', placement: '4th', category: 'Group Competition' },
          { name: 'Groups (15&U Jazz)', placement: '3rd', category: 'Group Competition' },
          { name: 'Shann Cheng', placement: '3rd', category: 'Open Age Open Solo' },
          { name: 'Juliet Yap', placement: '3rd', category: 'Solo (9&U Jazz)' }
        ]
      },
      {
        icon: 'users',
        title: 'Singapore Regional Competitions (SRC) CSTD 2023',
        results: [
          { name: 'Groups 13&U Jazz', placement: '1st', category: 'Group Competition' },
          { name: 'Groups Open Age Lyrical and Classical', placement: '2nd', category: 'Group Competition' },
          { name: 'Ashleigh Zhan', placement: '2nd', category: 'National Solo 11&U' },
          { name: 'Alexandria', placement: '1st', category: 'Lyrical Solo Novice 15&U' },
          { name: 'Eliana Goh', placement: '2nd', category: 'Lyrical Solo Novice 15&U' },
          { name: 'Groups 7&U Jazz', placement: '3rd', category: 'Group Competition' },
          { name: 'Groups 7&U Jazz', placement: '4th', category: 'Group Competition' }
        ]
      },
      {
        icon: 'trophy',
        title: 'Get The Beat (GTB) 2022',
        results: [
          { name: 'Ashley Tan', placement: '5th', category: 'My First Solo Teen (13-14)' },
          { name: 'Angela Yang', placement: '2nd', category: 'My First Solo (20+ yrs Open)' },
          { name: 'Shann Cheng', placement: '3rd', category: 'Solo (14&U Open)' },
          { name: 'Chloe and Jade', placement: '3rd', category: 'Duo/Trio Open Age Lyrical/Contemporary' },
          { name: 'Ashleigh Zhan', placement: '5th', category: 'Solo (11&U Open)' },
          { name: 'Group 8&U Any Other Style', placement: '3rd', category: 'Group Competition' },
          { name: 'Eliana Goh', placement: '4th', category: 'Solo (12&U Lyrical)' },
          { name: 'Group 12&U Any Other Style', placement: '3rd', category: 'Group Competition' },
          { name: 'Group (12&U Jazz)', placement: '1st', category: 'Group Competition' },
          { name: 'Group (15&U Lyrical)', placement: '3rd', category: 'Group Competition' },
          { name: 'Group (Open Any Other Style)', placement: '1st', category: 'Group Competition' },
          { name: 'Special Award', placement: 'Judges Choice Award', category: 'Recognition' },
          { name: 'Special Award', placement: 'Gala Finalist', category: 'Recognition' },
          { name: 'Special Award', placement: 'Judges Award for Musicality and Performance', category: 'Recognition' },
          { name: 'Group (Open Lyrical)', placement: '3rd', category: 'Group Competition' }
        ]
      },
      {
        icon: 'award',
        title: 'Singapore Cup Challenge 2022',
        results: [
          { name: 'Group Open Age Lyrical', placement: '1st', category: 'Group Competition' }
        ]
      },
      {
        icon: 'star',
        title: 'Chingay Parade Performances',
        results: [
          { name: '2020 Performance', placement: 'Most Lively Contingent Award', category: 'Special Recognition' },
          { name: '2021 Performance', placement: 'Performed', category: 'Cultural Showcase' },
          { name: '2022 Performance', placement: 'Performed', category: 'Cultural Showcase' },
          { name: '2023 Performance', placement: 'Performed', category: 'Cultural Showcase' },
          { name: '2024 Performance', placement: 'Performed', category: 'Cultural Showcase' },
          { name: '2025 Performance', placement: 'Performed', category: 'Cultural Showcase' }
        ]
      },
      {
        icon: 'medal',
        title: 'National Day Parade (NDP)',
        results: [
          { name: '2025 National Day Parade', placement: 'Performing', category: 'National Celebration' }
        ]
      }
    ] },
    reviews: { header: { title: 'What Parents Say', subtitle: 'Discover why families trust us with their children\'s dance education and artistic development.' }, reviews: [
      { name: 'Sarah Chen', role: 'Parent of Emma, Age 8', content: 'The Academy of Dance has transformed my shy daughter into a confident performer. The teachers are exceptional and truly care about each child\'s progress.', rating: 5 },
      { name: 'Michael Tan', role: 'Parent of Lucas, Age 12', content: 'Outstanding instruction and facilities. My son has developed incredible discipline and artistry. The recitals are professionally produced and showcase real talent.', rating: 5 },
      { name: 'Priya Patel', role: 'Parent of Aria, Age 6', content: 'We\'ve tried several dance schools, but none compare to the quality and care here. The trial class sold us immediately - it\'s worth every dollar.', rating: 5 },
      { name: 'David Wong', role: 'Parent of Sophie, Age 10', content: 'The progress my daughter has made in just one year is incredible. She\'s gained so much confidence and technical skill. The teachers are patient and encouraging.', rating: 5 },
      { name: 'Lisa Kumar', role: 'Parent of Aiden, Age 7', content: 'My son absolutely loves his dance classes here. The variety of styles offered means he never gets bored, and the competition opportunities have been amazing.', rating: 5 },
      { name: 'Jennifer Lim', role: 'Parent of Maya, Age 9', content: 'The Academy provides such a nurturing environment. My daughter has blossomed here, not just as a dancer but as a confident young person.', rating: 5 },
      { name: 'Robert Lee', role: 'Parent of twins Alex & Anna, Age 11', content: 'Having both my children learn here has been fantastic. The teachers adapt to each child\'s learning style and the community is so supportive.', rating: 5 },
      { name: 'Amanda Teo', role: 'Parent of Chloe, Age 5', content: 'Starting dance at such a young age here was the best decision. The Baby Gems program is perfect for little ones - creative, fun and educational.', rating: 5 }
    ] },
    teachers: { header: { title: 'Our Instructors', subtitle: 'Learn from internationally trained professionals who bring decades of experience and genuine passion for dance education.' }, teachers: [
      { name: 'Ms June Lee', specialty: 'Founder', credentials: '41 years of experience', experience: 'Ms. June Lee is a veteran dance educator and choreographer whose 41-year career has inspired students, earned international awards, and featured in prestigious global events.', image: '/lovable-uploads/07de0001-b755-433d-8b27-b1d01335b772.png', isFounder: true },
      { name: 'Ms Tan Jia Jia', specialty: 'Yishun Head', credentials: 'International exposure & competitive track record', experience: 'Ms. Tan Jia Jia is an experienced, versatile dance educator with international exposure and a strong competitive track record.', image: '/lovable-uploads/996fb449-b3aa-4ec3-acca-2dad9c8a5ac4.png' },
      { name: 'Ms Jasmine Koh', specialty: 'Classical Ballet Expert', credentials: '25 years experience, RAD & CSTD certified', experience: 'Ms. Jasmine Koh is a passionate dancer and educator with 25 years of experience, trained in ballet, jazz, and tap, and certified under RAD and CSTD.', image: '/lovable-uploads/444d487e-9e10-4a56-9e2a-409250051960.png' },
      { name: 'Ms Annabelle Ong', specialty: 'Inspirational Educator', credentials: 'Started at 17, full-time design career', experience: 'Ms. Annabelle Ong is a dedicated dancer and teacher who, despite starting at 17, has performed widely and now inspires young dancers while balancing a full-time design career.', image: '/lovable-uploads/8850b256-158e-4e7c-852c-d736bb723229.png' },
      { name: 'Ms Jacqueline Macpherson', specialty: 'Award-Winning Performer', credentials: 'International performance experience', experience: 'Ms. Jacqueline Macpherson is an award-winning dancer with international performance experience who now aims to share her passion for dance through teaching.', image: '/lovable-uploads/58297713-194b-4e3b-bea0-554b437b8af0.png' }
    ] },
    locations: { header: { title: 'Our Locations', subtitle: 'Visit us at our convenient locations across Singapore for world-class dance education.' }, locations: [
      {
        name: 'Tampines',
        image: '/lovable-uploads/c30a6afd-4e61-4b4a-aa55-2a97f577433b.png',
        addressLines: ['510 Tampines Central 1', '#02-250', 'Singapore 520510'],
        phoneDisplay: '(65) 9837 2670',
        phoneHref: 'tel:+6598372670',
        mapUrl: 'https://maps.google.com/maps?q=510+Tampines+Central+1+%2302-250+Singapore+520510'
      },
      {
        name: 'Yishun',
        image: '/lovable-uploads/b035362d-9d9c-496a-b0b6-dcab5c996d55.png',
        addressLines: ['Wisteria Mall, 598 Yishun Ring Road', '#01-35/36', 'Singapore 768698'],
        phoneDisplay: '(65) 9337 8605',
        phoneHref: 'tel:+6593378605',
        mapUrl: 'https://maps.google.com/maps?q=Wisteria+Mall+598+Yishun+Ring+Road+%2301-35%2F36+Singapore+768698'
      }
    ] }
  }
}

