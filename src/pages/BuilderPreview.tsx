import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import '@/lib/builder';

const BuilderPreview = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the preview content from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const modelName = urlParams.get('model') || 'page';
    const apiKey = urlParams.get('apiKey');
    const previewToken = urlParams.get('previewToken');
    
    const fetchPreviewContent = async () => {
      try {
        let builderContent;
        
        if (previewToken) {
          // Fetch preview content with token
          builderContent = await builder
            .get(modelName, {
              previewToken,
              apiKey,
            })
            .toPromise();
        } else {
          // Fallback to regular content fetch
          builderContent = await builder
            .get(modelName)
            .toPromise();
        }
        
        setContent(builderContent);
      } catch (error) {
        console.error('Error fetching preview content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BuilderComponent 
        model="page" 
        content={content}
        options={{
          includeRefs: true,
        }}
      />
    </div>
  );
};

export default BuilderPreview;
