import { Builder } from '@builder.io/react';
import PageHeader from './PageHeader';
import ClassSchedule from './ClassSchedule';
import Hero from './Hero';
import Programs from './Programs';
import MissionVision from './MissionVision';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import Instructors from './Instructors';
import Gallery from './Gallery';
import FAQ from './FAQ';

// Register PageHeader component
Builder.registerComponent(PageHeader, {
  name: 'PageHeader',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Page Title',
    },
    {
      name: 'subtitle', 
      type: 'text',
      defaultValue: 'Subtitle text here',
    },
    {
      name: 'backgroundImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      defaultValue: '',
    },
  ],
});

// Register ClassSchedule component
Builder.registerComponent(ClassSchedule, {
  name: 'ClassSchedule',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Class Schedule',
    },
    {
      name: 'schedule',
      type: 'list',
      subFields: [
        {
          name: 'day',
          type: 'text',
          defaultValue: 'Monday',
        },
        {
          name: 'classes',
          type: 'list',
          subFields: [
            {
              name: 'time',
              type: 'text',
              defaultValue: '4:00 PM',
            },
            {
              name: 'class',
              type: 'text', 
              defaultValue: 'Dance Class',
            },
            {
              name: 'level',
              type: 'text',
              defaultValue: 'Beginner',
            },
            {
              name: 'age',
              type: 'text',
              defaultValue: '3+ years',
            },
          ],
        },
      ],
    },
  ],
});

// Register Hero component
Builder.registerComponent(Hero, {
  name: 'Hero',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Elite Dance Academy',
    },
    {
      name: 'subtitle',
      type: 'text', 
      defaultValue: 'Where Passion Meets Excellence',
    },
    {
      name: 'description',
      type: 'longText',
      defaultValue: 'Join Singapore\'s premier dance academy and discover your potential through our comprehensive training programs.',
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Start Your Journey',
    },
    {
      name: 'backgroundImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
      defaultValue: '',
    },
  ],
});

// Register Programs component
Builder.registerComponent(Programs, {
  name: 'Programs',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Dance Programs',
    },
    {
      name: 'programs',
      type: 'list',
      subFields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Dance Program',
        },
        {
          name: 'description',
          type: 'longText',
          defaultValue: 'Program description here',
        },
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          defaultValue: '/api/placeholder/400/300',
        },
        {
          name: 'ageGroup',
          type: 'text',
          defaultValue: '3+ years',
        },
      ],
    },
  ],
});

// Register MissionVision component
Builder.registerComponent(MissionVision, {
  name: 'MissionVision',
  inputs: [
    {
      name: 'mission',
      type: 'longText',
      defaultValue: 'To provide exceptional dance education that nurtures creativity, builds confidence, and develops technical excellence in students of all ages.',
    },
    {
      name: 'vision',
      type: 'longText',
      defaultValue: 'To be Singapore\'s leading dance academy, inspiring the next generation of dancers and artists.',
    },
  ],
});

// Register Testimonials component
Builder.registerComponent(Testimonials, {
  name: 'Testimonials',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'What Our Students Say',
    },
    {
      name: 'testimonials',
      type: 'list',
      subFields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Student Name',
        },
        {
          name: 'role',
          type: 'text',
          defaultValue: 'Dance Student',
        },
        {
          name: 'content',
          type: 'longText',
          defaultValue: 'This academy has been amazing for my dance journey!',
        },
        {
          name: 'rating',
          type: 'number',
          defaultValue: 5,
        },
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          defaultValue: '/api/placeholder/80/80',
        },
      ],
    },
  ],
});

// Register Pricing component
Builder.registerComponent(Pricing, {
  name: 'Pricing',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Class Packages & Pricing',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Choose the perfect package for your dance journey',
    },
    {
      name: 'tiers',
      type: 'list',
      subFields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Package Name',
        },
        {
          name: 'price',
          type: 'text',
          defaultValue: '$100',
        },
        {
          name: 'period',
          type: 'text',
          defaultValue: 'per month',
        },
        {
          name: 'description',
          type: 'text',
          defaultValue: 'Package description',
        },
        {
          name: 'features',
          type: 'list',
          subFields: [
            {
              name: 'feature',
              type: 'text',
              defaultValue: 'Feature item',
            },
          ],
        },
        {
          name: 'popular',
          type: 'boolean',
          defaultValue: false,
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Get Started',
        },
      ],
    },
  ],
});

// Register Instructors component
Builder.registerComponent(Instructors, {
  name: 'Instructors',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Meet Our Expert Instructors',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Learn from Singapore\'s most accomplished dance professionals',
    },
    {
      name: 'instructors',
      type: 'list',
      subFields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Instructor Name',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Dance Instructor',
        },
        {
          name: 'specialties',
          type: 'list',
          subFields: [
            {
              name: 'specialty',
              type: 'text',
              defaultValue: 'Ballet',
            },
          ],
        },
        {
          name: 'bio',
          type: 'longText',
          defaultValue: 'Professional dance instructor with years of experience...',
        },
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          defaultValue: '/api/placeholder/300/400',
        },
        {
          name: 'experience',
          type: 'text',
          defaultValue: '10+ years',
        },
      ],
    },
  ],
});

// Register Gallery component
Builder.registerComponent(Gallery, {
  name: 'Gallery',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Studio Gallery',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Take a peek inside our beautiful dance studios',
    },
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'images',
      type: 'list',
      subFields: [
        {
          name: 'src',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          defaultValue: '/api/placeholder/400/300',
        },
        {
          name: 'alt',
          type: 'text',
          defaultValue: 'Gallery image',
        },
        {
          name: 'category',
          type: 'text',
          defaultValue: 'Studio',
        },
      ],
    },
  ],
});

// Register FAQ component
Builder.registerComponent(FAQ, {
  name: 'FAQ',
  inputs: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Find answers to common questions about our dance programs',
    },
    {
      name: 'faqs',
      type: 'list',
      subFields: [
        {
          name: 'question',
          type: 'text',
          defaultValue: 'Your question here?',
        },
        {
          name: 'answer',
          type: 'longText',
          defaultValue: 'Your answer here...',
        },
      ],
    },
  ],
});
