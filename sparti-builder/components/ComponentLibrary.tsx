import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseDatabase, Component } from '../hooks/useSupabaseDatabase';
import { Search, Trash2, Loader2 } from 'lucide-react';

const ComponentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [components, setComponents] = useState<Component[]>([]);
  const { components: dbComponents, isLoading, error } = useSupabaseDatabase();
  const { toast } = useToast();

  // Load components from Supabase
  useEffect(() => {
    const loadComponents = async () => {
      try {
        const componentsData = await dbComponents.getActive();
        setComponents(componentsData);
      } catch (err) {
        console.error('Error loading components:', err);
      }
    };
    
    loadComponents();
  }, [dbComponents]);

  // Get unique categories from components
  const categories = ['All', ...Array.from(new Set(components.map(comp => comp.type)))];
  
  // Filter components based on search and category
  const filteredComponents = components.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || comp.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteComponent = async (componentId: string, componentName: string) => {
    if (!confirm(`Are you sure you want to delete "${componentName}"?`)) return;
    
    try {
      await dbComponents.delete(componentId);
      setComponents(prev => prev.filter(comp => comp.id !== componentId));
      
      toast({
        title: "Component Deleted",
        description: `Component "${componentName}" has been deleted successfully.`,
      });
    } catch (err: any) {
      toast({
        title: "Deletion Failed",
        description: err.message || "Failed to delete component",
        variant: "destructive"
      });
    }
  };

  const handleToggleActive = async (componentId: string, currentStatus: boolean) => {
    try {
      await dbComponents.update(componentId, { is_active: !currentStatus });
      setComponents(prev => 
        prev.map(comp => 
          comp.id === componentId 
            ? { ...comp, is_active: !currentStatus }
            : comp
        )
      );
      
      toast({
        title: currentStatus ? "Component Deactivated" : "Component Activated",
        description: `Component has been ${currentStatus ? 'deactivated' : 'activated'} successfully.`,
      });
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update component status",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Component Library</h1>
          <p className="text-gray-600">Manage and organize your reusable components saved from the editor</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading components...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'All' 
                  ? 'No components match your criteria.' 
                  : 'No components found. Create components by editing elements on your site and clicking "Save to Database".'}
              </p>
            </div>
          ) : (
            filteredComponents.map((component) => (
              <Card key={component.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <CardDescription className="text-sm">
                        Type: {component.type}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={component.is_active ? "default" : "secondary"}>
                        {component.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {component.is_global && (
                        <Badge variant="outline">Global</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <p>Created: {new Date(component.created_at).toLocaleDateString()}</p>
                      <p>Updated: {new Date(component.updated_at).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleActive(component.id, component.is_active)}
                      >
                        {component.is_active ? "Deactivate" : "Activate"}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteComponent(component.id, component.name)}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentLibrary;