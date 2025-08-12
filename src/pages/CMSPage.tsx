import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BuilderComponent, builder } from '@builder.io/react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Loader2 } from 'lucide-react';

// Initialize Builder
import '@/lib/builder';

const CMSPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const urlPath = slug || 'home';
        
        // Fetch content from Builder.io
        const content = await builder
          .get('page', {
            userAttributes: {
              urlPath: urlPath,
            },
          })
          .toPromise();

        if (content) {
          setContent(content);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching Builder content:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation scrollToSection={() => {}} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
            <a href="/" className="text-blue-600 hover:text-blue-800">
              Return to Home
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrollToSection={() => {}} />
      
      {/* Builder.io Content */}
      <div className="pt-20">
        <BuilderComponent
          model="page"
          content={content}
          options={{
            includeRefs: true,
          }}
        />
      </div>
      
      <Footer />
      <WhatsAppButton onClick={() => {}} />
    </div>
  );
};

export default CMSPage;
