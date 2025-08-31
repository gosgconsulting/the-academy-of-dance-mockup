import { supabase } from '@/integrations/supabase/client';

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  category: 'branding' | 'colors' | 'typography' | 'general';
  description?: string;
  created_at: string;
  updated_at: string;
}

export class SiteSettingsService {
  /**
   * Get all site settings
   */
  static async getAllSettings(): Promise<{ data: SiteSetting[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching site settings:', error);
        return { data: null, error: error.message };
      }

      return { data: (data || []) as SiteSetting[], error: null };
    } catch (error) {
      console.error('Error in getAllSettings:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Get settings by category
   */
  static async getSettingsByCategory(
    category: SiteSetting['category']
  ): Promise<{ data: SiteSetting[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', category);

      if (error) {
        console.error('Error fetching settings by category:', error);
        return { data: null, error: error.message };
      }

      return { data: (data || []) as SiteSetting[], error: null };
    } catch (error) {
      console.error('Error in getSettingsByCategory:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Get single setting by key
   */
  static async getSetting(key: string): Promise<{ data: SiteSetting | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', key)
        .single();

      if (error) {
        console.error('Error fetching setting:', error);
        return { data: null, error: error.message };
      }

      return { data: data as SiteSetting | null, error: null };
    } catch (error) {
      console.error('Error in getSetting:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Update or create a setting
   */
  static async updateSetting(
    key: string,
    value: any,
    category: SiteSetting['category'],
    description?: string
  ): Promise<{ data: SiteSetting | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          category,
          description,
        }, {
          onConflict: 'key'
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating setting:', error);
        return { data: null, error: error.message };
      }

      return { data: data as SiteSetting | null, error: null };
    } catch (error) {
      console.error('Error in updateSetting:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Update multiple settings at once
   */
  static async updateMultipleSettings(
    settings: Array<{
      key: string;
      value: any;
      category: SiteSetting['category'];
      description?: string;
    }>
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert(settings, {
          onConflict: 'key'
        });

      if (error) {
        console.error('Error updating multiple settings:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in updateMultipleSettings:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Helper function to convert HSL string to hex for color inputs
   */
  static hslToHex(hsl: string): string {
    // Parse HSL string like "38 92% 50%"
    const [h, s, l] = hsl.split(' ').map((val, index) => {
      if (index === 0) return parseInt(val);
      return parseInt(val.replace('%', ''));
    });

    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;

    const c = (1 - Math.abs(2 * lDecimal - 1)) * sDecimal;
    const x = c * (1 - Math.abs((hDecimal * 6) % 2 - 1));
    const m = lDecimal - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= hDecimal && hDecimal < 1/6) {
      r = c; g = x; b = 0;
    } else if (1/6 <= hDecimal && hDecimal < 1/3) {
      r = x; g = c; b = 0;
    } else if (1/3 <= hDecimal && hDecimal < 1/2) {
      r = 0; g = c; b = x;
    } else if (1/2 <= hDecimal && hDecimal < 2/3) {
      r = 0; g = x; b = c;
    } else if (2/3 <= hDecimal && hDecimal < 5/6) {
      r = x; g = 0; b = c;
    } else if (5/6 <= hDecimal && hDecimal < 1) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  /**
   * Helper function to convert hex to HSL string
   */
  static hexToHsl(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
  }
}