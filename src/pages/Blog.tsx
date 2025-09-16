import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Clock, Tag, Folder } from "lucide-react";
import { useBlogData } from "@/hooks/useBlogData";
import { BlogPageData } from "@/lib/graphql";

// Default blog data fallback
const DEFAULT_BLOG_DATA: BlogPageData = {
  posts: [{
    id: "1",
    slug: "mastering-ballet-fundamentals",
    title: "Mastering Ballet Fundamentals: A Beginner's Journey",
    excerpt: "Discover the essential techniques and positions that form the foundation of classical ballet. From plié to grand jeté, learn how to build strength and grace.",
    content: "Ballet is the foundation of all dance forms, requiring discipline, grace, and years of dedicated practice. In this comprehensive guide, we'll explore the fundamental positions and movements that every aspiring dancer must master...",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Ballet",
    tags: ["Beginner", "Technique", "Classical"],
    image: {
      node: {
        mediaItemUrl: "/lovable-uploads/f883c8a8-3f19-4bce-871e-2f48e153c2f9.png",
        altText: "Mastering Ballet Fundamentals"
      }
    }
  }, {
    id: "2",
    slug: "hip-hop-evolution",
    title: "Hip-Hop Evolution: From Streets to Studio",
    excerpt: "Explore the rich history of hip-hop dance and how it has evolved from urban street culture to mainstream dance studios worldwide.",
    content: "Hip-hop dance emerged from the streets of New York City in the 1970s, becoming a powerful form of cultural expression. Today, it continues to evolve and inspire dancers around the globe...",
    author: "Marcus Williams",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Hip-Hop",
    tags: ["History", "Urban", "Culture"],
    image: {
      node: {
        mediaItemUrl: "/lovable-uploads/cc1b8cc0-3767-4760-9f8a-3015d9e2a2f6.png",
        altText: "Hip-Hop Evolution"
      }
    }
  }, {
    id: "3",
    slug: "contemporary-dance-expression",
    title: "Contemporary Dance: Expressing Emotion Through Movement",
    excerpt: "Learn how contemporary dance combines elements from various genres to create powerful emotional storytelling through fluid, expressive movements.",
    content: "Contemporary dance is a genre that emerged in the mid-20th century, blending elements of classical ballet, modern dance, and jazz. It emphasizes emotional expression and storytelling...",
    author: "Elena Rodriguez",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Contemporary",
    tags: ["Expression", "Modern", "Emotion"],
    image: {
      node: {
        mediaItemUrl: "/lovable-uploads/80e4bd9a-27a2-46c2-879c-2384503deb4a.png",
        altText: "Contemporary Dance Expression"
      }
    }
  }, {
    id: "4",
    slug: "competition-preparation",
    title: "Competition Preparation: Mental and Physical Training",
    excerpt: "Discover the secrets to successful dance competition preparation, from physical conditioning to mental resilience and performance confidence.",
    content: "Preparing for dance competitions requires more than just perfecting choreography. Mental preparation, physical conditioning, and developing stage presence are equally important...",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Competition",
    tags: ["Training", "Performance", "Mindset"],
    image: {
      node: {
        mediaItemUrl: "/lovable-uploads/787ef26d-968d-4441-a7e6-d177b26e1dc1.png",
        altText: "Competition Preparation"
      }
    }
  }, {
    id: "5",
    slug: "dance-nutrition",
    title: "Dance Nutrition: Fueling Your Performance",
    excerpt: "Understanding proper nutrition for dancers is crucial for maintaining energy, preventing injuries, and optimizing performance throughout training and competitions.",
    content: "Dancers are athletes who require proper nutrition to fuel their demanding training schedules and performances. Understanding what to eat and when can make a significant difference...",
    author: "Dr. Amy Thompson",
    date: "2024-01-05",
    readTime: "5 min read",
    category: "Health",
    tags: ["Nutrition", "Performance", "Wellness"],
    image: {
      node: {
        mediaItemUrl: "/lovable-uploads/9b23aa52-1bb4-4e41-b2c0-f26892b6aa20.png",
        altText: "Dance Nutrition"
      }
    }
  }],
  categories: [{
    name: "Ballet",
    count: 8
  }, {
    name: "Hip-Hop",
    count: 12
  }, {
    name: "Contemporary",
    count: 6
  }, {
    name: "Jazz",
    count: 5
  }, {
    name: "Competition",
    count: 10
  }, {
    name: "Health",
    count: 4
  }],
  tags: [{
    name: "Beginner",
    count: 5
  }, {
    name: "Technique",
    count: 8
  }, {
    name: "Performance",
    count: 12
  }, {
    name: "Training",
    count: 6
  }, {
    name: "History",
    count: 3
  }, {
    name: "Culture",
    count: 4
  }, {
    name: "Nutrition",
    count: 2
  }, {
    name: "Mindset",
    count: 7
  }, {
    name: "Expression",
    count: 9
  }, {
    name: "Classical",
    count: 5
  }],
  authors: [{
    name: "Sarah Chen",
    posts: 15
  }, {
    name: "Marcus Williams",
    posts: 12
  }, {
    name: "Elena Rodriguez",
    posts: 8
  }, {
    name: "David Kim",
    posts: 10
  }, {
    name: "Dr. Amy Thompson",
    posts: 6
  }]
};
export default function Blog() {
  // Fetch blog data from GraphQL
  const { data: blogData, isLoading, error } = useBlogData();
  
  // Use data from GraphQL or fallback to default data
  const pageData = blogData || DEFAULT_BLOG_DATA;
  
  const handleScrollToSection = (sectionId: string) => {
    // For blog page, just scroll to top or handle differently
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  return <div className="min-h-screen bg-background">
      <Navigation scrollToSection={handleScrollToSection} />
      
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-12">
        <div className="container mx-auto px-4 text-center text-foreground">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 mx-[4px] my-0 text-dance-bronze">Our Blogs</h1>
          <p className="text-lg md:text-xl mb-0 max-w-2xl mx-auto font-inter text-gray-600">
            Insights, Tips, and Stories from the World of Dance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-[5px]">
        <div className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Blog Posts - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {isLoading ? (
                <div className="space-y-8">
                  {[...Array(3)].map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video bg-gray-200 animate-pulse" />
                      <CardHeader>
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                pageData.posts.map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/blog/${post.slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.image.node.mediaItemUrl} 
                          alt={post.image.node.altText || post.title} 
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
                      <div className="mb-4 font-inter text-gray-600" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                      <Link to={`/blog/${post.slug}`} className="text-primary hover:text-primary/80 font-medium transition-colors font-inter">
                        Read More →
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair text-dance-bronze">
                    <Folder className="w-5 h-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pageData.categories.map(category => (
                    <Link 
                      key={category.name} 
                      to={`/blog/category/${category.name.toLowerCase()}`} 
                      className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors text-gray-600"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Link>
                  ))}
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
                    {pageData.tags.map(tag => (
                      <Link key={tag.name} to={`/blog/tag/${tag.name.toLowerCase()}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                          {tag.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
}