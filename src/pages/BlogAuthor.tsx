import { useParams, Link } from "react-router-dom";
// Header/Footer are injected globally via SiteLayout
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { usePageContent } from "@/cms/usePageContent";
import { blogDefaults, type BlogContent } from "@/cms/content/schemas/blog";

export default function BlogAuthor() {
  const { author } = useParams();
  const { data } = usePageContent<BlogContent>('blog', blogDefaults)
  const blogPosts = data.posts
  
  const authorName = author?.replace('-', ' ');
  const filteredPosts = blogPosts.filter(post => 
    post.author.toLowerCase() === authorName?.toLowerCase()
  );

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary pt-32 pb-16">
        <div className="container mx-auto px-4 text-center text-white">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Blogs
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Posts by {authorName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-inter">
            All blog posts written by {authorName}
          </p>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {filteredPosts.length} posts found
          </Badge>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No posts found</h2>
              <p className="text-muted-foreground mb-8 font-inter">
                There are no blog posts by "{authorName}" yet.
              </p>
              <Link 
                to="/blog"
                className="text-primary hover:text-primary/80 font-medium font-inter"
              >
                ← Back to all posts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  </Link>
                  
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link to={`/blog/category/${post.category.toLowerCase()}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                          {post.category}
                        </Badge>
                      </Link>
                      {post.tags.map(tag => (
                        <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`}>
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                      </CardTitle>
                    </Link>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-inter">
                      <div className="flex items-center gap-1 text-primary font-medium">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 font-inter">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary/80 font-medium transition-colors font-inter"
                    >
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      
    </div>
  );
}