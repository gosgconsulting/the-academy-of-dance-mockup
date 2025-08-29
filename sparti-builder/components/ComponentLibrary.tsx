import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ComponentLibrary = () => {
  const components = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      category: 'Sections',
      description: 'Main hero section with carousel and call-to-action',
      preview: '/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png'
    },
    {
      id: 'navigation',
      name: 'Navigation',
      category: 'Navigation',
      description: 'Responsive navigation with mobile menu',
      preview: '/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png'
    },
    {
      id: 'about-section',
      name: 'About Us Section',
      category: 'Sections',
      description: 'About us content with vision and mission',
      preview: '/lovable-uploads/0b3fd9e6-e4f5-4482-9171-5515f1985ac2.png'
    },
    {
      id: 'trials-section',
      name: 'Trials Section',
      category: 'Forms',
      description: 'Trial class booking section',
      preview: '/lovable-uploads/78398105-9a05-4e07-883b-b8b742deb89f.png'
    },
    {
      id: 'gallery-section',
      name: 'Gallery Section',
      category: 'Media',
      description: 'Image gallery with lightbox functionality',
      preview: '/lovable-uploads/21352692-5e60-425a-9355-ba3fc13af268.png'
    }
  ];

  const categories = ['All', 'Sections', 'Navigation', 'Forms', 'Media'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredComponents = selectedCategory === 'All' 
    ? components 
    : components.filter(comp => comp.category === selectedCategory);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Component Library</h1>
        <p className="text-muted-foreground">
          Manage and preview all editable components in your website
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <Card key={component.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img 
                src={component.preview} 
                alt={component.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{component.name}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {component.category}
                </Badge>
              </div>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Preview
                </Button>
                <Button size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No components found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ComponentLibrary;