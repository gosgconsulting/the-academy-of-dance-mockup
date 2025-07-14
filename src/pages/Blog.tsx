import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Clock, Tag, Folder } from "lucide-react";

// Demo blog data
const blogPosts = [{
  id: 1,
  title: "Mastering Ballet Fundamentals: A Beginner's Journey",
  excerpt: "Discover the essential techniques and positions that form the foundation of classical ballet. From plié to grand jeté, learn how to build strength and grace.",
  content: "Ballet is the foundation of all dance forms, requiring discipline, grace, and years of dedicated practice. In this comprehensive guide, we'll explore the fundamental positions and movements that every aspiring dancer must master...",
  author: "Sarah Chen",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Ballet",
  tags: ["Beginner", "Technique", "Classical"],
  image: "/lovable-uploads/f883c8a8-3f19-4bce-871e-2f48e153c2f9.png"
}, {
  id: 2,
  title: "Hip-Hop Evolution: From Streets to Studio",
  excerpt: "Explore the rich history of hip-hop dance and how it has evolved from urban street culture to mainstream dance studios worldwide.",
  content: "Hip-hop dance emerged from the streets of New York City in the 1970s, becoming a powerful form of cultural expression. Today, it continues to evolve and inspire dancers around the globe...",
  author: "Marcus Williams",
  date: "2024-01-12",
  readTime: "6 min read",
  category: "Hip-Hop",
  tags: ["History", "Urban", "Culture"],
  image: "/lovable-uploads/cc1b8cc0-3767-4760-9f8a-3015d9e2a2f6.png"
}, {
  id: 3,
  title: "Contemporary Dance: Expressing Emotion Through Movement",
  excerpt: "Learn how contemporary dance combines elements from various genres to create powerful emotional storytelling through fluid, expressive movements.",
  content: "Contemporary dance is a genre that emerged in the mid-20th century, blending elements of classical ballet, modern dance, and jazz. It emphasizes emotional expression and storytelling...",
  author: "Elena Rodriguez",
  date: "2024-01-10",
  readTime: "7 min read",
  category: "Contemporary",
  tags: ["Expression", "Modern", "Emotion"],
  image: "/lovable-uploads/b1840e0a-3045-4279-8d7b-b44020841ba0.png"
}, {
  id: 4,
  title: "Competition Preparation: Mental and Physical Training",
  excerpt: "Discover the secrets to successful dance competition preparation, from physical conditioning to mental resilience and performance confidence.",
  content: "Preparing for dance competitions requires more than just perfecting choreography. Mental preparation, physical conditioning, and developing stage presence are equally important...",
  author: "David Kim",
  date: "2024-01-08",
  readTime: "10 min read",
  category: "Competition",
  tags: ["Training", "Performance", "Mindset"],
  image: "/lovable-uploads/996fb449-b3aa-4ec3-acca-2dad9c8a5ac4.png"
}, {
  id: 5,
  title: "Dance Nutrition: Fueling Your Performance",
  excerpt: "Understanding proper nutrition for dancers is crucial for maintaining energy, preventing injuries, and optimizing performance throughout training and competitions.",
  content: "Dancers are athletes who require proper nutrition to fuel their demanding training schedules and performances. Understanding what to eat and when can make a significant difference...",
  author: "Dr. Amy Thompson",
  date: "2024-01-05",
  readTime: "5 min read",
  category: "Health",
  tags: ["Nutrition", "Performance", "Wellness"],
  image: "/lovable-uploads/fafdb3ad-f058-4c32-9065-7d540d362cd7.png"
}];
const categories = [{
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
}];
const tags = ["Beginner", "Technique", "Performance", "Training", "History", "Culture", "Nutrition", "Mindset", "Expression", "Classical"];
const authors = [{
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
}];
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
  return <div className="min-h-screen bg-background">
      <Navigation scrollToSection={handleScrollToSection} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary pt-20 pb-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 mx-[4px] my-0">Our Blogs</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Insights, Tips, and Stories from the World of Dance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Blog Posts - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>)}
                    </div>
                    
                    <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
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
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Read More →
                    </button>
                  </CardContent>
                </Card>)}
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map(category => <div key={category.name} className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>)}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        {tag}
                      </Badge>)}
                  </div>
                </CardContent>
              </Card>

              {/* Authors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Authors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {authors.map(author => <div key={author.name} className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                      <span>{author.name}</span>
                      <Badge variant="secondary">{author.posts} posts</Badge>
                    </div>)}
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Subscribe to our newsletter for the latest dance tips, trends, and stories.
                  </p>
                  <div className="space-y-3">
                    <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">
                      Subscribe
                    </button>
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