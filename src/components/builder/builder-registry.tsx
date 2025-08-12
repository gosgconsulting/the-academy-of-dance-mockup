import { Builder } from '@builder.io/react';
import PageHeader from './PageHeader';
import ClassSchedule from './ClassSchedule';
import Hero from './Hero';
import Programs from './Programs';
import MissionVision from './MissionVision';

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
