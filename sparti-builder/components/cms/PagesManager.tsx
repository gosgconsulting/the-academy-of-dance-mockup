import React, { useState, useEffect } from 'react';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Card } from '../../../src/components/ui/card';
import { useToast } from '../../../src/hooks/use-toast';
import { useSupabaseDatabase, Page } from '../../hooks/useSupabaseDatabase';

export const PagesManager: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const { toast } = useToast();
  const { pages, isLoading, error } = useSupabaseDatabase();
  const [pagesList, setPagesList] = useState<Page[]>([]);

  // Load pages from Supabase
  useEffect(() => {
    const loadPages = async () => {
      try {
        const pagesData = await pages.getAll();
        setPagesList(pagesData);
      } catch (err) {
        console.error('Error loading pages:', err);
      }
    };
    
    loadPages();
  }, [pages]);

  // Auto-generate slug from title
  useEffect(() => {
    if (newPageTitle && !newPageSlug) {
      setNewPageSlug(newPageTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''));
    }
  }, [newPageTitle, newPageSlug]);

  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) return;
    
    setIsCreating(true);
    
    try {
      const pageData = {
        title: newPageTitle,
        slug: newPageSlug || newPageTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        content: { sections: [] },
        meta_title: newPageTitle,
        meta_description: `${newPageTitle} page`,
        is_published: false
      };

      const newPage = await pages.create(pageData);
      setPagesList(prev => [...prev, newPage]);
      
      toast({
        title: "Page Created",
        description: `Page "${newPageTitle}" has been created successfully.`,
      });
      
      setNewPageTitle('');
      setNewPageSlug('');
    } catch (err: any) {
      console.error('Error creating page:', err);
      toast({
        title: "Creation Failed",
        description: err.message || "Failed to create page",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleTogglePublish = async (pageId: string, currentStatus: boolean) => {
    try {
      await pages.update(pageId, { is_published: !currentStatus });
      setPagesList(prev => 
        prev.map(page => 
          page.id === pageId 
            ? { ...page, is_published: !currentStatus }
            : page
        )
      );
      
      toast({
        title: currentStatus ? "Page Unpublished" : "Page Published",
        description: `Page has been ${currentStatus ? 'unpublished' : 'published'} successfully.`,
      });
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update page status",
        variant: "destructive"
      });
    }
  };

  const handleDeletePage = async (pageId: string, pageTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${pageTitle}"?`)) return;
    
    try {
      await pages.delete(pageId);
      setPagesList(prev => prev.filter(page => page.id !== pageId));
      
      toast({
        title: "Page Deleted",
        description: `Page "${pageTitle}" has been deleted successfully.`,
      });
    } catch (err: any) {
      toast({
        title: "Deletion Failed",
        description: err.message || "Failed to delete page",
        variant: "destructive"
      });
    }
  };
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Pages Manager</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
            placeholder="Page title"
            className="flex-1"
          />
          <Input
            value={newPageSlug}
            onChange={(e) => setNewPageSlug(e.target.value)}
            placeholder="URL slug (auto-generated)"
            className="flex-1"
          />
          <Button 
            onClick={handleCreatePage} 
            disabled={isCreating || !newPageTitle.trim()}
          >
            {isCreating ? 'Creating...' : 'Create Page'}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading pages...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {pagesList.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No pages yet. Create your first page above.
              </p>
            ) : (
              pagesList.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h3 className="font-medium">{page.title}</h3>
                    <p className="text-sm text-muted-foreground">/{page.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(page.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={page.is_published ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTogglePublish(page.id, page.is_published)}
                    >
                      {page.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeletePage(page.id, page.title)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PagesManager;