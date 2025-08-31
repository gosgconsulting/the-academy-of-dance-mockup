import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Card } from '../../../src/components/ui/card';
import { useToast } from '../../../src/hooks/use-toast';
import { PagesService, type Page } from '../../services/PagesService';
import { Edit } from 'lucide-react';

export const PagesManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [newPageTitle, setNewPageTitle] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await PagesService.getAllPages();
      if (error) {
        toast({
          title: "Error",
          description: `Failed to load pages: ${error}`,
          variant: "destructive",
        });
      } else if (data) {
        setPages(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await PagesService.createPage({
        title: newPageTitle,
      });

      if (error) {
        toast({
          title: "Error",
          description: `Failed to create page: ${error}`,
          variant: "destructive",
        });
      } else if (data) {
        setPages(prev => [data, ...prev]);
        setNewPageTitle('');
        
        toast({
          title: "Page Created",
          description: `Page "${data.title}" has been created successfully`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create page",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    setIsLoading(true);
    
    try {
      const { success, error } = await PagesService.deletePage(pageId);
      
      if (error) {
        toast({
          title: "Error",
          description: `Failed to delete page: ${error}`,
          variant: "destructive",
        });
      } else if (success) {
        setPages(prev => prev.filter(p => p.id !== pageId));
        toast({
          title: "Page Deleted",
          description: "Page has been deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Pages Manager</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            placeholder="Page title"
            onKeyPress={(e) => e.key === 'Enter' && handleCreatePage()}
          />
          <Button onClick={handleCreatePage} disabled={isLoading || !newPageTitle.trim()}>
            {isLoading ? 'Creating...' : 'Create Page'}
          </Button>
        </div>

        <div className="space-y-2">
          {pages.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No pages yet. Create your first page above.
            </p>
          ) : (
            pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h3 className="font-medium">{page.title}</h3>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {page.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/pages/edit/${page.id}`)}
                    disabled={isLoading}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeletePage(page.id)}
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

export default PagesManager;