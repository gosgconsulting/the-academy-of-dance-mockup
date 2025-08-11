import { builder } from '@builder.io/react'
import { BUILDER_API_KEY } from './builderConfig'

// Builder.io model configurations for The Academy of Dance
export const builderModels = [
  {
    name: 'page',
    id: 'page',
    kind: 'page',
    description: 'Main website pages',
    fields: [
      {
        name: 'title',
        type: 'string',
        required: true,
        helperText: 'Page title for SEO'
      },
      {
        name: 'description',
        type: 'longText',
        helperText: 'Page description for SEO'
      },
      {
        name: 'keywords',
        type: 'string',
        helperText: 'Comma-separated keywords for SEO'
      }
    ]
  },
  {
    name: 'section',
    id: 'section',
    kind: 'component',
    description: 'Reusable page sections',
    fields: [
      {
        name: 'sectionTitle',
        type: 'string',
        required: true
      },
      {
        name: 'sectionType',
        type: 'string',
        enum: ['hero', 'about', 'programmes', 'testimonials', 'gallery', 'contact', 'cta'],
        required: true
      }
    ]
  },
  {
    name: 'blog-post',
    id: 'blog-post',
    kind: 'data',
    description: 'Blog posts and articles',
    fields: [
      {
        name: 'title',
        type: 'string',
        required: true
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        helperText: 'URL-friendly version of the title'
      },
      {
        name: 'excerpt',
        type: 'longText',
        helperText: 'Short description for blog listing'
      },
      {
        name: 'author',
        type: 'string',
        defaultValue: 'The Academy of Dance'
      },
      {
        name: 'publishDate',
        type: 'date',
        required: true
      },
      {
        name: 'featuredImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp']
      },
      {
        name: 'category',
        type: 'string',
        enum: ['Dance Tips', 'Student Spotlights', 'Events', 'Competitions', 'Academy News']
      },
      {
        name: 'tags',
        type: 'list',
        subFields: [
          {
            name: 'tag',
            type: 'string'
          }
        ]
      }
    ]
  },
  {
    name: 'testimonial',
    id: 'testimonial',
    kind: 'data',
    description: 'Student and parent testimonials',
    fields: [
      {
        name: 'name',
        type: 'string',
        required: true
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        helperText: 'e.g., Parent of Emma, Age 8'
      },
      {
        name: 'content',
        type: 'longText',
        required: true
      },
      {
        name: 'rating',
        type: 'number',
        min: 1,
        max: 5,
        defaultValue: 5
      },
      {
        name: 'image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png']
      },
      {
        name: 'featured',
        type: 'boolean',
        defaultValue: false,
        helperText: 'Show on homepage'
      }
    ]
  },
  {
    name: 'teacher',
    id: 'teacher',
    kind: 'data',
    description: 'Dance instructors and staff',
    fields: [
      {
        name: 'name',
        type: 'string',
        required: true
      },
      {
        name: 'specialty',
        type: 'string',
        required: true,
        helperText: 'e.g., Ballet Expert, Jazz Instructor'
      },
      {
        name: 'credentials',
        type: 'string',
        helperText: 'Qualifications and certifications'
      },
      {
        name: 'experience',
        type: 'longText',
        helperText: 'Biography and experience'
      },
      {
        name: 'image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png']
      },
      {
        name: 'isFounder',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'socialLinks',
        type: 'list',
        subFields: [
          {
            name: 'platform',
            type: 'string',
            enum: ['Instagram', 'Facebook', 'LinkedIn', 'Website']
          },
          {
            name: 'url',
            type: 'string'
          }
        ]
      }
    ]
  },
  {
    name: 'location',
    id: 'location',
    kind: 'data',
    description: 'Academy locations and studios',
    fields: [
      {
        name: 'name',
        type: 'string',
        required: true
      },
      {
        name: 'address',
        type: 'object',
        subFields: [
          {
            name: 'street',
            type: 'string',
            required: true
          },
          {
            name: 'unit',
            type: 'string'
          },
          {
            name: 'postalCode',
            type: 'string',
            required: true
          },
          {
            name: 'city',
            type: 'string',
            defaultValue: 'Singapore'
          }
        ]
      },
      {
        name: 'phone',
        type: 'string',
        required: true
      },
      {
        name: 'email',
        type: 'string'
      },
      {
        name: 'image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png']
      },
      {
        name: 'mapUrl',
        type: 'string',
        helperText: 'Google Maps link'
      },
      {
        name: 'facilities',
        type: 'list',
        subFields: [
          {
            name: 'facility',
            type: 'string'
          }
        ]
      },
      {
        name: 'operatingHours',
        type: 'object',
        subFields: [
          {
            name: 'monday',
            type: 'string'
          },
          {
            name: 'tuesday',
            type: 'string'
          },
          {
            name: 'wednesday',
            type: 'string'
          },
          {
            name: 'thursday',
            type: 'string'
          },
          {
            name: 'friday',
            type: 'string'
          },
          {
            name: 'saturday',
            type: 'string'
          },
          {
            name: 'sunday',
            type: 'string'
          }
        ]
      }
    ]
  },
  {
    name: 'programme',
    id: 'programme',
    kind: 'data',
    description: 'Dance programmes and classes',
    fields: [
      {
        name: 'title',
        type: 'string',
        required: true
      },
      {
        name: 'slug',
        type: 'string',
        required: true
      },
      {
        name: 'description',
        type: 'longText',
        required: true
      },
      {
        name: 'image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png']
      },
      {
        name: 'danceStyle',
        type: 'string',
        enum: ['Ballet', 'Jazz', 'Contemporary', 'Hip Hop', 'Tap', 'Lyrical', 'Musical Theatre', 'Baby Gems', 'Adult Fitness'],
        required: true
      },
      {
        name: 'ageRange',
        type: 'object',
        subFields: [
          {
            name: 'min',
            type: 'number',
            min: 3,
            max: 99
          },
          {
            name: 'max',
            type: 'number',
            min: 3,
            max: 99
          },
          {
            name: 'display',
            type: 'string',
            helperText: 'e.g., "3-4 years", "All Ages"'
          }
        ]
      },
      {
        name: 'level',
        type: 'string',
        enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
        required: true
      },
      {
        name: 'duration',
        type: 'string',
        helperText: 'e.g., "45 minutes", "1 hour"'
      },
      {
        name: 'price',
        type: 'object',
        subFields: [
          {
            name: 'amount',
            type: 'number'
          },
          {
            name: 'currency',
            type: 'string',
            defaultValue: 'SGD'
          },
          {
            name: 'period',
            type: 'string',
            enum: ['per class', 'per month', 'per term']
          }
        ]
      },
      {
        name: 'schedule',
        type: 'list',
        subFields: [
          {
            name: 'day',
            type: 'string',
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          },
          {
            name: 'time',
            type: 'string'
          },
          {
            name: 'location',
            type: 'string'
          }
        ]
      },
      {
        name: 'featured',
        type: 'boolean',
        defaultValue: false
      }
    ]
  },
  {
    name: 'event',
    id: 'event',
    kind: 'data',
    description: 'Academy events and performances',
    fields: [
      {
        name: 'title',
        type: 'string',
        required: true
      },
      {
        name: 'subtitle',
        type: 'string'
      },
      {
        name: 'description',
        type: 'longText',
        required: true
      },
      {
        name: 'eventType',
        type: 'string',
        enum: ['Performance', 'Competition', 'Workshop', 'Masterclass', 'Recital', 'Festival', 'Exam'],
        required: true
      },
      {
        name: 'date',
        type: 'date',
        required: true
      },
      {
        name: 'endDate',
        type: 'date',
        helperText: 'For multi-day events'
      },
      {
        name: 'time',
        type: 'string'
      },
      {
        name: 'location',
        type: 'string'
      },
      {
        name: 'images',
        type: 'list',
        subFields: [
          {
            name: 'image',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png']
          },
          {
            name: 'caption',
            type: 'string'
          }
        ]
      },
      {
        name: 'registrationRequired',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'registrationLink',
        type: 'string'
      },
      {
        name: 'price',
        type: 'object',
        subFields: [
          {
            name: 'amount',
            type: 'number'
          },
          {
            name: 'currency',
            type: 'string',
            defaultValue: 'SGD'
          }
        ]
      },
      {
        name: 'featured',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'status',
        type: 'string',
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        defaultValue: 'upcoming'
      }
    ]
  }
]

// Function to create models in Builder.io (requires admin API access)
export const setupBuilderModels = async () => {
  if (!BUILDER_API_KEY || BUILDER_API_KEY === 'YOUR_BUILDER_API_KEY_HERE') {
    console.warn('Builder.io API key not configured. Models cannot be created automatically.')
    return false
  }

  try {
    // Note: Model creation requires Builder.io admin API access
    // This would typically be done through Builder.io dashboard or admin API
    console.log('Builder.io models configuration ready:', builderModels)
    return true
  } catch (error) {
    console.error('Error setting up Builder.io models:', error)
    return false
  }
}

export default builderModels
