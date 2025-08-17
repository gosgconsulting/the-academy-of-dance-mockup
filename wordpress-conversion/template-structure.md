# WordPress Theme Conversion Structure

## Template Hierarchy Mapping

### React Components → WordPress Templates

```
src/pages/Index.tsx → index.php (main homepage)
src/pages/Blog.tsx → blog.php, archive.php
src/pages/BlogPost.tsx → single.php
src/pages/NotFound.tsx → 404.php
```

### Components → Template Parts

```
src/components/Navigation.tsx → template-parts/header.php
src/components/Footer.tsx → template-parts/footer.php
src/components/HeroSection.tsx → template-parts/hero-section.php
src/components/TrialsSection.tsx → template-parts/trials-section.php
src/components/sections/ → template-parts/sections/
```

### WordPress Theme Structure

```
wp-theme/
├── style.css (theme header)
├── functions.php (theme setup, customizer, enqueue)
├── index.php (main template)
├── header.php
├── footer.php
├── single.php
├── archive.php
├── 404.php
├── template-parts/
│   ├── hero-section.php
│   ├── trials-section.php
│   └── sections/
│       ├── about-section.php
│       ├── programmes-section.php
│       ├── gallery-section.php
│       └── ...
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── inc/
│   ├── customizer.php
│   ├── acf-fields.php
│   └── theme-options.php
└── languages/
```

## Data Structure for WordPress

### Theme Customizer Options
- Site Identity (logo, tagline)
- Hero Section (title, subtitle, images, CTA)
- About Section (content, images)
- Programs & Exams
- Gallery Images
- Teachers Info
- Contact Information
- Social Media Links

### Custom Post Types
- Programs
- Events  
- Teachers
- Testimonials/Reviews
- Gallery Items

### Custom Fields (ACF)
- Hero carousel images
- Statistics/achievements
- Program details
- Teacher profiles
- Event information