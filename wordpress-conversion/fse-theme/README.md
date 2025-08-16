# Dance Academy FSE Theme

A modern WordPress Full Site Editor theme built specifically for dance academies, studios, and performing arts schools.

## Features

- **Full Site Editor Compatible**: Built with WordPress 6.0+ Block Editor
- **Modern Design**: Clean, responsive design optimized for dance academies
- **Block Patterns**: Pre-designed sections for easy content creation
- **Global Styles**: Consistent design system with theme.json
- **Responsive**: Mobile-first approach ensuring great experience on all devices
- **Performance Optimized**: Lightweight and fast loading
- **Accessibility Ready**: WCAG compliant and screen reader friendly

## Installation

1. Download the theme files
2. Upload to your WordPress site's `/wp-content/themes/` directory
3. Activate the theme from WordPress admin
4. Customize using the Site Editor (Appearance → Editor)

## Theme Structure

```
dance-academy-fse/
├── style.css              # Main theme stylesheet
├── theme.json             # Global settings and styles
├── templates/             # HTML template files
│   ├── index.html
│   ├── front-page.html
│   ├── single.html
│   └── archive.html
├── parts/                 # Template parts
│   ├── header.html
│   └── footer.html
├── patterns/              # Block patterns
│   ├── hero-section.php
│   ├── about-us-section.php
│   ├── statistics-section.php
│   └── trials-section.php
└── README.md
```

## Customization

### Global Styles
Access **Appearance → Editor → Styles** to customize:
- Colors and gradients
- Typography settings
- Spacing and layout
- Button styles

### Block Patterns
The theme includes pre-designed patterns for:
- Hero sections
- About us content
- Statistics displays
- Trial booking sections
- Gallery layouts
- Testimonials

### Template Editing
Edit templates using **Appearance → Editor → Templates**:
- Homepage layout
- Blog archives
- Single post pages
- Header and footer

## Color Palette

The theme uses a modern color system:
- **Primary**: `hsl(220, 70%, 50%)` - Main brand color
- **Secondary**: `hsl(220, 14.3%, 95.9%)` - Light backgrounds
- **Background**: `hsl(0, 0%, 100%)` - Page background
- **Foreground**: `hsl(220.9, 39.3%, 11%)` - Text color

## Typography

- **Primary Font**: Inter (system fallback: system-ui, sans-serif)
- **Secondary Font**: Georgia (serif fallback)
- **Font Sizes**: Responsive scale from 0.875rem to 3.75rem

## Block Support

Enhanced support for:
- Core WordPress blocks
- Custom button styles
- Responsive column layouts
- Featured images with aspect ratios
- Navigation menus
- Social links

## Requirements

- WordPress 6.0 or higher
- PHP 8.0 or higher
- Modern browser support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

For developers working with this theme:

### CSS Structure
- Uses CSS custom properties for design tokens
- Mobile-first responsive approach
- Follows WordPress block editor conventions

### JavaScript
- Minimal JavaScript for enhanced user experience
- Uses modern ES6+ features
- Follows WordPress coding standards

### Performance
- Optimized image loading
- Minimal HTTP requests
- Efficient CSS delivery

## Customization Examples

### Adding Custom Colors
```json
// In theme.json → settings.color.palette
{
  "slug": "custom-accent",
  "color": "hsl(280, 70%, 60%)",
  "name": "Custom Accent"
}
```

### Custom Font Sizes
```json
// In theme.json → settings.typography.fontSizes
{
  "slug": "custom-large",
  "size": "2.5rem",
  "name": "Custom Large"
}
```

### Adding New Patterns
Create new pattern files in `/patterns/` directory:
```php
<?php
/**
 * Title: Custom Section
 * Slug: dance-academy/custom-section
 * Categories: content
 */
?>
<!-- Block markup here -->
```

## Support

For support and customization help:
- WordPress.org support forums
- Theme documentation
- Developer resources

## License

This theme is licensed under GPL v2 or later.

## Credits

- Built with WordPress Full Site Editor
- Uses system fonts for performance
- Responsive design principles
- Accessibility best practices

---

**Version**: 1.0.0  
**Tested up to**: WordPress 6.4  
**Requires PHP**: 8.0  
**License**: GPL v2 or later