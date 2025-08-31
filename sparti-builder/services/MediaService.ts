import { supabase } from '@/integrations/supabase/client';

export interface MediaItem {
  id: string;
  filename: string;
  file_path: string;
  file_type: string;
  file_size: number;
  alt_text?: string;
  caption?: string;
  created_at: string;
}

export class MediaService {
  /**
   * Get all media items
   */
  static async getAllMedia(): Promise<{ data: MediaItem[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching media:', error);
        return { data: null, error: error.message };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error in getAllMedia:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Upload file to Supabase Storage and save metadata
   */
  static async uploadFile(
    file: File,
    folder: string = 'uploads'
  ): Promise<{ data: { mediaItem: MediaItem; url: string } | null; error: string | null }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        return { data: null, error: uploadError.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // Save to media library table
      const { data: mediaData, error: mediaError } = await supabase
        .from('media_library')
        .insert({
          filename: file.name,
          file_path: fileName,
          file_type: file.type,
          file_size: file.size,
        })
        .select()
        .single();

      if (mediaError) {
        console.error('Error saving media metadata:', mediaError);
        // Clean up uploaded file if metadata save fails
        await supabase.storage
          .from('media')
          .remove([fileName]);
        return { data: null, error: mediaError.message };
      }

      return {
        data: {
          mediaItem: mediaData,
          url: urlData.publicUrl
        },
        error: null
      };
    } catch (error) {
      console.error('Error in uploadFile:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Delete media item and file
   */
  static async deleteMedia(id: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Get file path first
      const { data: mediaItem, error: fetchError } = await supabase
        .from('media_library')
        .select('file_path')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching media item:', fetchError);
        return { success: false, error: fetchError.message };
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([mediaItem.file_path]);

      if (storageError) {
        console.error('Error deleting file from storage:', storageError);
        // Continue with database deletion even if storage deletion fails
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (dbError) {
        console.error('Error deleting media from database:', dbError);
        return { success: false, error: dbError.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in deleteMedia:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Update media metadata
   */
  static async updateMedia(
    id: string,
    updates: Partial<Pick<MediaItem, 'alt_text' | 'caption' | 'filename'>>
  ): Promise<{ data: MediaItem | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating media:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in updateMedia:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Get public URL for a media item
   */
  static getPublicUrl(filePath: string): string {
    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
    return data.publicUrl;
  }
}