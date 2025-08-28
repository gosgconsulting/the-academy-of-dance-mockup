import React, { useState, useEffect } from 'react';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Textarea } from '../../../src/components/ui/textarea';
import { Card } from '../../../src/components/ui/card';
import { useToast } from '../../../src/hooks/use-toast';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  is_published: boolean;
  created_at: string;
  author: string;
  tags: string[];
  category: string;
}

export const PostsManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostExcerpt, setNewPostExcerpt] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Demo: Load posts from localStorage
    const demoPosts = JSON.parse(localStorage.getItem('sparti-demo-posts') || '[]');
    setPosts(demoPosts);
  }, []);

  const handleCreatePost = async () => {
    if (!newPostTitle.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Demo: simulate creation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost: PostItem = {
        id: 'demo-post-' + Date.now(),
        title: newPostTitle,
        slug: newPostTitle.toLowerCase().replace(/\s+/g, '-'),
        excerpt: newPostExcerpt || 'No excerpt provided',
        content: '',
        is_published: false,
        created_at: new Date().toISOString(),
        author: 'Admin',
        tags: [],
        category: newPostCategory || 'General',
      };

      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      
      // Demo: store in localStorage
      localStorage.setItem('sparti-demo-posts', JSON.stringify(updatedPosts));
      
      setNewPostTitle('');
      setNewPostExcerpt('');
      setNewPostCategory('');
      setIsCreating(false);
      
      toast({
        title: "Post Created",
        description: `Post "${newPost.title}" has been created (demo mode)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post (demo mode)",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    setIsLoading(true);
    
    try {
      // Demo: simulate deletion delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPosts = posts.filter(p => p.id !== postId);
      setPosts(updatedPosts);
      
      // Demo: store in localStorage
      localStorage.setItem('sparti-demo-posts', JSON.stringify(updatedPosts));
      
      toast({
        title: "Post Deleted",
        description: "Post has been deleted (demo mode)",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post (demo mode)",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublishPost = async (postId: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedPosts = posts.map(post => 
        post.id === postId 
          ? { ...post, is_published: !post.is_published }
          : post
      );
      
      setPosts(updatedPosts);
      localStorage.setItem('sparti-demo-posts', JSON.stringify(updatedPosts));
      
      const post = updatedPosts.find(p => p.id === postId);
      toast({
        title: post?.is_published ? "Post Published" : "Post Unpublished",
        description: `Post has been ${post?.is_published ? 'published' : 'unpublished'} (demo mode)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status (demo mode)",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Posts Manager</h2>
      
      <div className="space-y-4">
        {!isCreating ? (
          <Button onClick={() => setIsCreating(true)}>
            Create New Post
          </Button>
        ) : (
          <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
            <Input
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post title"
            />
            <Input
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              placeholder="Category (e.g., News, Updates, Tutorials)"
            />
            <Textarea
              value={newPostExcerpt}
              onChange={(e) => setNewPostExcerpt(e.target.value)}
              placeholder="Post excerpt or summary"
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleCreatePost} 
                disabled={isLoading || !newPostTitle.trim()}
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No blog posts yet. Create your first post above.
            </p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="flex items-start justify-between p-4 border rounded">
                <div className="flex-1">
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">/{post.slug}</p>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      by {post.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublishPost(post.id)}
                    disabled={isLoading}
                    className={post.is_published ? 'bg-green-50 text-green-700 border-green-200' : ''}
                  >
                    {post.is_published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <span className={`px-2 py-1 text-xs rounded ${
                    post.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
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

export default PostsManager;