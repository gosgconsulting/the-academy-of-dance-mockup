# Builder.io CMS Integration Setup Guide

## Overview

This guide will help you set up Builder.io visual CMS integration for The Academy of Dance website. Builder.io provides a powerful drag-and-drop visual editor that allows non-technical users to create and edit website content.

## Step 1: Get Builder.io Account

1. Visit [builder.io](https://builder.io) and create a free account
2. Once logged in, create a new space for your website
3. Copy your API key from the Account Settings

## Step 2: Configure Environment Variables

1. Create or update your `.env` file in the project root:
```bash
VITE_BUILDER_API_KEY=your_actual_api_key_here
```

2. Restart your development server after adding the API key

## Step 3: Set Up Builder.io Models

Builder.io models define the structure of your content. You'll need to create these models in your Builder.io dashboard:

### Models to Create:

1. **Page Model** (`page`)
   - For main website pages
   - Fields: title, description, keywords

2. **Section Model** (`section`) 
   - For reusable page sections
   - Fields: sectionTitle, sectionType

3. **Blog Post Model** (`blog-post`)
   - For blog articles
   - Fields: title, slug, excerpt, author, publishDate, featuredImage, category, tags

4. **Testimonial Model** (`testimonial`)
   - For student/parent testimonials
   - Fields: name, role, content, rating, image, featured

5. **Teacher Model** (`teacher`)
   - For instructor profiles
   - Fields: name, specialty, credentials, experience, image, isFounder, socialLinks

6. **Location Model** (`location`)
   - For academy locations
   - Fields: name, address, phone, email, image, mapUrl, facilities, operatingHours

7. **Programme Model** (`programme`)
   - For dance classes/programmes
   - Fields: title, slug, description, image, danceStyle, ageRange, level, duration, price, schedule, featured

8. **Event Model** (`event`)
   - For academy events
   - Fields: title, subtitle, description, eventType, date, endDate, time, location, images, registrationRequired, price, featured, status

### Creating Models in Builder.io Dashboard:

1. Go to [builder.io](https://builder.io) and log into your account
2. Navigate to "Models" in the left sidebar
3. Click "New Model" for each model type
4. Configure the fields according to the specifications above
5. Set appropriate permissions and validation rules

## Step 4: Register Custom Components

The integration includes custom components specifically designed for The Academy of Dance:

- **Hero Section**: Eye-catching homepage headers
- **Testimonial Card**: Student/parent testimonials
- **Programme Card**: Dance class showcases  
- **Stat Card**: Achievement statistics
- **CTA Section**: Call-to-action sections

These components are automatically registered when you set up the API key.

## Step 5: Using the Visual Editor

### Accessing the Editor:

1. Go to `/admin` in your website
2. Click on the "Visual Editor" tab
3. Select a model type to create/edit content
4. Click "Create/Edit" to open Builder.io's visual editor

### Creating Content:

1. In Builder.io editor, drag and drop components
2. Customize text, images, and styling
3. Use the custom dance academy components for consistency
4. Preview your changes in real-time
5. Publish when ready

## Step 6: Hybrid Editing Approach

You can use both editing methods:

- **Form Editor**: For structured data and quick edits
- **Visual Editor**: For creative layouts and visual content
- **Hybrid**: Combine both approaches as needed

## Features You Get:

✅ **Visual drag-and-drop editing**
✅ **Real-time preview**
✅ **No-code content management**
✅ **A/B testing capabilities**
✅ **Content scheduling**
✅ **Team collaboration**
✅ **Mobile-responsive design**
✅ **SEO optimization tools**

## Troubleshooting

### API Key Issues:
- Ensure the API key is correctly set in environment variables
- Restart the development server after setting the key
- Check that the key has proper permissions in Builder.io

### Content Not Appearing:
- Verify models are created in Builder.io dashboard
- Check that content is published (not just saved as draft)
- Ensure the correct model name is being used

### Component Registration:
- Custom components are automatically registered on app startup
- If components don't appear, check the browser console for errors
- Verify Builder.io SDK is properly initialized

## Support

- **Builder.io Documentation**: [docs.builder.io](https://docs.builder.io)
- **Builder.io Community**: [forum.builder.io](https://forum.builder.io)
- **Builder.io Support**: Available through your Builder.io dashboard

## Benefits for Your Client

1. **Easy Content Updates**: Non-technical users can edit content visually
2. **Professional Design**: Maintain design consistency with custom components
3. **Fast Loading**: Optimized content delivery
4. **SEO Friendly**: Built-in SEO tools and optimization
5. **Mobile Ready**: Responsive design out of the box
6. **Cost Effective**: Reduce need for developer involvement in content updates

This integration gives your client the power to manage their website content independently while maintaining the professional design and functionality you've built.
