import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
// Header/Footer are injected via SiteLayout
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Clock, ArrowLeft, Tag } from "lucide-react";
import { usePageContent } from "@/cms/usePageContent";
import { blogDefaults, type BlogContent } from "@/cms/content/schemas/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data } = usePageContent<BlogContent>('blog', blogDefaults)
  const blogPosts = data.posts
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation scrollToSection={() => {}} />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-primary hover:text-primary/80">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <button 
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-white border-white/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-white/90 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img 
              src={post.image.src} 
              alt={post.image.alt}
              className="w-full h-full object-cover"
            />
          </div>
          
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
                 dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
              />
              
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      
    </div>
  );
}