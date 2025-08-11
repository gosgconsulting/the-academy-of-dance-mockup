import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Tag } from "lucide-react";
import { useMemo } from "react";
import { usePageContent } from "@/cms/usePageContent";
import { blogDefaults, type BlogContent } from "@/cms/content/schemas/blog";
export default function Blog() {
  const handleScrollToSection = (sectionId: string) => {
    // For blog page, just scroll to top or handle differently
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  const { data } = usePageContent<BlogContent>('blog', blogDefaults)
  const blogPosts = data.posts
  const categories = useMemo(() => {
    const map = new Map<string, number>()
    blogPosts.forEach(p => map.set(p.category, (map.get(p.category) ?? 0) + 1))
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }, [blogPosts])
  const tags = useMemo(() => {
    const set = new Set<string>()
    blogPosts.forEach(p => p.tags.forEach(t => set.add(t)))
    return Array.from(set)
  }, [blogPosts])

  return <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-12">
        <div className="container mx-auto px-4 text-center text-foreground">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 mx-[4px] my-0 text-dance-bronze">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl mb-0 max-w-2xl mx-auto font-inter text-gray-600">
            {data.intro}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-[5px]">
        <div className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Blog Posts - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image.src} alt={post.image.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  </Link>
                  
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link to={`/blog/category/${post.category.toLowerCase()}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                          {post.category}
                        </Badge>
                      </Link>
                      {post.tags.map(tag => <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`}>
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                            {tag}
                          </Badge>
                        </Link>)}
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <CardTitle className="text-2xl font-playfair hover:text-primary transition-colors cursor-pointer text-dance-bronze">
                        {post.title}
                      </CardTitle>
                    </Link>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
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
                    <p className="mb-4 font-inter text-gray-600">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="text-primary hover:text-primary/80 font-medium transition-colors font-inter">
                      Read More →
                    </Link>
                  </CardContent>
                </Card>)}
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair text-dance-bronze">
                    
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map(category => <Link key={category.name} to={`/blog/category/${category.name.toLowerCase()}`} className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors text-gray-600">
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Link>)}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair text-dance-bronze">
                    <Tag className="w-5 h-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                          {tag}
                        </Badge>
                      </Link>)}
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </section>

      
    </div>;
}