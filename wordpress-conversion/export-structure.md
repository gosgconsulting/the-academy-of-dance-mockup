# WordPress Theme Export Structure

## Organized Component Folder Structure

```
wp-theme-export/
├── /global/
│   ├── header.php              // ← Navigation.tsx
│   ├── footer.php              // ← Footer.tsx
│   ├── navigation.php          // ← Navigation component logic
│   └── functions.php           // Theme setup and enqueues
│
├── /templates/
│   ├── front-page.php          // ← Index.tsx (homepage)
│   ├── home.php               // ← Blog.tsx (blog listing)
│   ├── single.php             // ← BlogPost.tsx
│   ├── category.php           // ← BlogCategory.tsx
│   ├── tag.php                // ← BlogTag.tsx
│   ├── author.php             // ← BlogAuthor.tsx
│   ├── page.php               // ← Generic page template
│   ├── page-terms-conditions.php // ← TermsConditions.tsx
│   ├── page-privacy-policy.php   // ← PrivacyPolicy.tsx
│   └── 404.php                // ← NotFound.tsx
│
├── /template-parts/
│   ├── hero-section.php       // ← HeroSection.tsx
│   ├── trials-section.php     // ← TrialsSection.tsx
│   ├── about-section.php      // ← AboutUsSection.tsx
│   ├── vision-mission.php     // ← VisionMissionSection.tsx
│   ├── statistics.php         // ← StatisticsSection.tsx
│   ├── programmes.php         // ← ProgrammesAndExamsSection.tsx
│   ├── competition.php        // ← CompetitionExcellenceSection.tsx
│   ├── events.php             // ← EventsSection.tsx
│   ├── achievements.php       // ← AchievementsSection.tsx
│   ├── teachers.php           // ← TeachersSection.tsx
│   ├── reviews.php            // ← ReviewsSection.tsx
│   ├── locations.php          // ← LocationsSection.tsx
│   ├── gallery.php            // ← GallerySection.tsx
│   ├── whatsapp-button.php    // ← WhatsAppButton.tsx
│   ├── whatsapp-chat.php      // ← WhatsAppChat.tsx
│   ├── content.php            // Blog post card template
│   ├── content-programs.php   // Program post template
│   ├── content-events.php     // Event post template
│   ├── content-teachers.php   // Teacher post template
│   └── content-reviews.php    // Review post template
│
├── /parts/
│   ├── sidebar.php            // Blog sidebar
│   ├── sidebar-footer.php     // Footer widgets
│   └── searchform.php         // Search form
│
├── /inc/
│   ├── customizer.php         // Theme customizer options
│   ├── acf-fields.php         // Advanced Custom Fields setup
│   ├── post-types.php         // Custom post types registration
│   ├── theme-options.php      // Theme options and settings
│   ├── enqueue-scripts.php    // CSS/JS enqueue functions
│   ├── wp-nav-walker.php      // Custom navigation walker
│   └── widget-areas.php       // Widget area registration
│
├── /assets/
│   ├── /css/
│   │   ├── style.css          // ← Compiled from index.css + Tailwind
│   │   ├── admin.css          // Admin styles
│   │   └── customizer.css     // Customizer preview styles
│   ├── /js/
│   │   ├── theme.js           // ← Converted React interactions
│   │   ├── carousel.js        // Hero carousel functionality
│   │   ├── mobile-menu.js     // Mobile navigation
│   │   ├── whatsapp.js        // WhatsApp integration
│   │   └── admin.js           // Admin interface scripts
│   ├── /images/
│   │   └── [37 uploaded images from public/lovable-uploads/]
│   ├── /fonts/
│   │   ├── poppins/           // Poppins font files
│   │   ├── playfair-display/  // Playfair Display font files
│   │   └── inter/             // Inter font files
│   └── /icons/
│       └── [Lucide icon SVGs or icon font]
│
├── /languages/
│   ├── theme-name.pot         // Translation template
│   └── [language files]
│
├── style.css                  // WordPress theme header
├── index.php                  // Fallback template
├── sidebar.php                // Main sidebar template
├── searchform.php             // Search form template
├── comments.php               // Comments template
└── screenshot.png             // Theme screenshot
```

## WordPress Theme Files with Component Mapping

### Core WordPress Files

**style.css** (Theme Header)
```css
/*
Theme Name: Dance Academy
Description: Premium dance academy theme converted from React/Lovable
Version: 1.0.0  
Author: [Your Name]
Text Domain: dance-academy
Requires PHP: 7.4
*/

@import url('./assets/css/style.css');
```

**functions.php** (Main theme setup)
```php
<?php
// Enqueue styles and scripts
require get_template_directory() . '/inc/enqueue-scripts.php';

// Theme setup
require get_template_directory() . '/inc/theme-options.php';

// Custom post types
require get_template_directory() . '/inc/post-types.php';

// ACF fields
require get_template_directory() . '/inc/acf-fields.php';

// Customizer
require get_template_directory() . '/inc/customizer.php';

// Widget areas
require get_template_directory() . '/inc/widget-areas.php';
```

### Template Hierarchy Mapping

| WordPress Template | React Component | Priority |
|---|---|---|
| **front-page.php** | Index.tsx | 1 |
| **home.php** | Blog.tsx | 2 |
| **single.php** | BlogPost.tsx | 3 |
| **category.php** | BlogCategory.tsx | 4 |
| **tag.php** | BlogTag.tsx | 4 |
| **author.php** | BlogAuthor.tsx | 4 |
| **page.php** | Generic pages | 5 |
| **404.php** | NotFound.tsx | 6 |

## Asset Export List

### CSS Files to Export
- **src/index.css** → assets/css/style.css (after Tailwind compilation)
- **tailwind.config.ts** → PostCSS configuration for WordPress
- All component styles consolidated into main stylesheet

### JavaScript Files to Export  
- **Hero carousel logic** → assets/js/carousel.js
- **Mobile menu toggle** → assets/js/mobile-menu.js  
- **WhatsApp integration** → assets/js/whatsapp.js
- **Smooth scrolling** → assets/js/theme.js
- **Modal/dialog functionality** → assets/js/modals.js

### Image Assets (37 files from public/lovable-uploads/)
```
Hero carousel images (5):
- f8f4ebc7-577a-4261-840b-20a866629516.png
- fafdb3ad-f058-4c32-9065-7d540d362cd7.png  
- 0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png
- 78398105-9a05-4e07-883b-b8b742deb89f.png
- 21352692-5e60-425a-9355-ba3fc13af268.png

Site branding (1):
- 007de019-e0b0-490d-90cd-cced1de404b8.png (logo)

Program/class photos (~15):
- [Additional uploaded images for programs and classes]

Competition/performance photos (~10):
- [Performance and competition related images]  

Teacher profiles (~5):
- [Teacher profile photographs]

Gallery/achievement images (~1):
- [Miscellaneous gallery and achievement images]
```

### Font Assets
**Google Fonts to download or CDN:**
- Poppins (300, 400, 500, 600, 700)
- Playfair Display (400, 500, 600, 700, 800)
- Inter (300, 400, 500, 600, 700)

**Font loading in functions.php:**
```php
function enqueue_google_fonts() {
    wp_enqueue_style( 'google-fonts', 
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap', 
        false 
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_google_fonts' );
```

## Custom Post Types & Fields

### Custom Post Types to Register

**Programs CPT:**
```php
register_post_type('programs', [
    'labels' => [
        'name' => 'Programs',
        'singular_name' => 'Program'
    ],
    'public' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'has_archive' => true,
    'rewrite' => ['slug' => 'programs']
]);
```

**Events CPT:**
```php  
register_post_type('events', [
    'labels' => [
        'name' => 'Events',
        'singular_name' => 'Event'
    ],
    'public' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'has_archive' => true,
    'rewrite' => ['slug' => 'events']
]);
```

**Teachers CPT:**
```php
register_post_type('teachers', [
    'labels' => [
        'name' => 'Teachers', 
        'singular_name' => 'Teacher'
    ],
    'public' => true,
    'supports' => ['title', 'editor', 'thumbnail'],
    'has_archive' => true,
    'rewrite' => ['slug' => 'teachers']
]);
```

**Reviews CPT:**
```php
register_post_type('reviews', [
    'labels' => [
        'name' => 'Reviews',
        'singular_name' => 'Review'  
    ],
    'public' => true,
    'supports' => ['title', 'editor', 'thumbnail'],
    'has_archive' => false
]);
```

### ACF Field Groups to Create

**Hero Section Fields:**
- hero_title_line_1 (Text)
- hero_title_line_2 (Text)  
- hero_description (Textarea)
- hero_cta_text (Text)
- hero_images (Gallery)

**Statistics Fields (Repeater):**
- stat_number (Text)
- stat_label (Text)
- stat_color (Color Picker)
- stat_bg_color (Color Picker)

**About Values (Repeater):**
- value_icon (Icon Picker/Image)
- value_title (Text)
- value_description (Textarea)

**Locations Fields (Repeater):**
- location_name (Text)
- location_address (Textarea)
- location_phone (Text)
- location_map_url (URL)
- location_image (Image)

## WordPress Customizer Options

```php
// Site Identity
$wp_customize->add_setting('site_logo');
$wp_customize->add_setting('site_tagline_custom'); 

// Social Media
$wp_customize->add_setting('social_facebook');
$wp_customize->add_setting('social_instagram');
$wp_customize->add_setting('social_youtube'); 
$wp_customize->add_setting('social_tiktok');

// Contact Information
$wp_customize->add_setting('whatsapp_number');
$wp_customize->add_setting('contact_email');

// Colors (if not using design system)
$wp_customize->add_setting('primary_color');
$wp_customize->add_setting('secondary_color');
```

## Third-Party Dependencies

### Required WordPress Plugins
- **Advanced Custom Fields Pro** (for all custom fields)
- **Contact Form 7** (for trial booking form)  
- **Custom Post Type UI** (optional, can code in functions.php)
- **Yoast SEO** (for SEO optimization)

### Optional Enhancements
- **WP Rocket** (caching and performance)
- **Smush** (image optimization)  
- **WP Forms** (alternative to Contact Form 7)
- **Elementor** (page builder compatibility)

## Build Tools Setup

### Required for Tailwind CSS
```json
{
  "devDependencies": {
    "tailwindcss": "^3.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "autoprefixer": "^10.0.0", 
    "postcss": "^8.0.0",
    "postcss-cli": "^10.0.0"
  },
  "scripts": {
    "build-css": "postcss src/style.css -o assets/css/style.css",
    "watch-css": "postcss src/style.css -o assets/css/style.css --watch"
  }
}
```

### PostCSS Configuration
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

This structure provides a complete WordPress theme ready for development with all React components mapped to their WordPress equivalents and all assets organized for deployment.