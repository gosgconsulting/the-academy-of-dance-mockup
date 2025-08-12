import { useState, useEffect } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Edit, Eye, Plus } from 'lucide-react';

interface CMSContent {
  id: string;
  name: string;
  data: {
    title?: string;
    description?: string;
  };
  published: string;
  createdDate: number;
}

const CMSDashboard = () => {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<CMSContent | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Fetch content from Builder.io
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `https://cdn.builder.io/api/v3/content/page?apiKey=43ad973db23348b2847cc82fd8c0b54b&limit=20`
        );
        const data = await response.json();
        setContent(data.results || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const openInEditor = (contentId: string) => {
    window.open(`https://builder.io/content/${contentId}`, '_blank');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CMS Dashboard</h1>
          <p className="text-gray-600">Manage your Builder.io content with visual editing capabilities</p>
          
          <div className="flex gap-4 mt-4">
            <Button onClick={() => window.open('https://builder.io/content', '_blank')}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Content
            </Button>
            <Button variant="outline" onClick={() => window.open('https://builder.io/models', '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Manage Models
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="preview">Visual Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {item.data.title || 'No title set'}
                        </CardDescription>
                      </div>
                      <Badge variant={item.published === 'published' ? 'default' : 'secondary'}>
                        {item.published}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.data.description || 'No description available'}
                    </p>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      Created: {formatDate(item.createdDate)}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openInEditor(item.id)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedContent(item);
                          setPreviewMode(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {content.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                  <p className="text-gray-600 mb-4">Create your first page to get started</p>
                  <Button onClick={() => window.open('https://builder.io/content', '_blank')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Page
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {selectedContent ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Preview: {selectedContent.name}</CardTitle>
                      <CardDescription>Live preview of your Builder.io content</CardDescription>
                    </div>
                    <Button onClick={() => openInEditor(selectedContent.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit in Visual Editor
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-white min-h-[400px]">
                    <BuilderComponent
                      model="page"
                      content={selectedContent}
                      options={{
                        includeRefs: true,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select content to preview</h3>
                  <p className="text-gray-600">Choose a page from the Content Management tab to see the preview</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CMSDashboard;
