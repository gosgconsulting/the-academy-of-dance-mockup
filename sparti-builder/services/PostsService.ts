import { supabase } from '@/integrations/supabase/client';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  is_published: boolean;
  featured_image?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export class PostsService {
  /**
   * Get all posts
   */
  static async getAllPosts(): Promise<{ data: Post[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return { data: null, error: error.message };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error in getAllPosts:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Create a new post
   */
  static async createPost(postData: {
    title: string;
    slug?: string;
    excerpt?: string;
    category?: string;
    author?: string;
  }): Promise<{ data: Post | null; error: string | null }> {
    try {
      const slug = postData.slug || postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      const newPost = {
        title: postData.title,
        slug,
        excerpt: postData.excerpt || '',
        category: postData.category || 'General',
        author: postData.author || 'Admin',
        content: '',
        is_published: false,
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in createPost:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Update post
   */
  static async updatePost(
    id: string, 
    updates: Partial<Post>
  ): Promise<{ data: Post | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating post:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in updatePost:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Delete post
   */
  static async deletePost(id: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in deletePost:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Toggle post publish status
   */
  static async togglePublishStatus(id: string): Promise<{ data: Post | null; error: string | null }> {
    try {
      // First get current status
      const { data: currentPost, error: fetchError } = await supabase
        .from('posts')
        .select('is_published')
        .eq('id', id)
        .single();

      if (fetchError) {
        return { data: null, error: fetchError.message };
      }

      // Toggle the status
      const { data, error } = await supabase
        .from('posts')
        .update({ is_published: !currentPost.is_published })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling publish status:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in togglePublishStatus:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}