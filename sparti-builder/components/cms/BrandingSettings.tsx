import React, { useState, useEffect } from 'react';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Card } from '../../../src/components/ui/card';
import { useToast } from '../../../src/hooks/use-toast';
import { SiteSettingsService } from '../../services/SiteSettingsService';

interface BrandingSettingsProps {
  onUpdate?: (settings: any) => void;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadBrandingSettings();
  }, []);

  const loadBrandingSettings = async () => {
    try {
      const { data, error } = await SiteSettingsService.getSettingsByCategory('branding');
      if (error) {
        console.error('Error loading branding settings:', error);
      } else if (data) {
        data.forEach(setting => {
          switch (setting.key) {
            case 'site_name':
              setSiteName(setting.value?.replace(/"/g, '') || '');
              break;
            case 'site_tagline':
              setTagline(setting.value?.replace(/"/g, '') || '');
              break;
            case 'site_description':
              setDescription(setting.value?.replace(/"/g, '') || '');
              break;
          }
        });
      }
    } catch (error) {
      console.error('Error loading branding settings:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const settingsToUpdate = [
        {
          key: 'site_name',
          value: `"${siteName}"`,
          category: 'branding' as const,
          description: 'Site name displayed in header and meta tags'
        },
        {
          key: 'site_tagline',
          value: `"${tagline}"`,
          category: 'branding' as const,
          description: 'Site tagline or slogan'
        },
        {
          key: 'site_description',
          value: `"${description}"`,
          category: 'branding' as const,
          description: 'Site description for SEO'
        }
      ];

      const { success, error } = await SiteSettingsService.updateMultipleSettings(settingsToUpdate);
      
      if (error) {
        toast({
          title: "Error",
          description: `Failed to save branding settings: ${error}`,
          variant: "destructive",
        });
      } else if (success) {
        const settings = {
          site_name: siteName,
          tagline,
          description,
        };
        
        onUpdate?.(settings);
        
        toast({
          title: "Settings Saved",
          description: "Branding settings have been updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save branding settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Branding Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="siteName" className="block text-sm font-medium mb-1">
            Site Name
          </label>
          <Input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Your site name"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium mb-1">
            Tagline
          </label>
          <Input
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Your site tagline"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Your site description"
          />
        </div>

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
};

export default BrandingSettings;