import React, { useState, useEffect } from 'react';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Card } from '../../../src/components/ui/card';
import { useToast } from '../../../src/hooks/use-toast';
import { SiteSettingsService } from '../../services/SiteSettingsService';

interface ColorSettingsProps {
  onUpdate?: (settings: any) => void;
}

export const ColorSettings: React.FC<ColorSettingsProps> = ({ onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#d4af37');
  const [secondaryColor, setSecondaryColor] = useState('#b8860b');
  const [accentColor, setAccentColor] = useState('#daa520');
  const { toast } = useToast();

  useEffect(() => {
    loadColorSettings();
  }, []);

  const loadColorSettings = async () => {
    try {
      const { data, error } = await SiteSettingsService.getSettingsByCategory('colors');
      if (error) {
        console.error('Error loading color settings:', error);
      } else if (data) {
        data.forEach(setting => {
          const hslValue = setting.value?.replace(/"/g, '') || '';
          switch (setting.key) {
            case 'primary_color':
              setPrimaryColor(SiteSettingsService.hslToHex(hslValue));
              break;
            case 'secondary_color':
              setSecondaryColor(SiteSettingsService.hslToHex(hslValue));
              break;
            case 'accent_color':
              setAccentColor(SiteSettingsService.hslToHex(hslValue));
              break;
          }
        });
      }
    } catch (error) {
      console.error('Error loading color settings:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const settingsToUpdate = [
        {
          key: 'primary_color',
          value: `"${SiteSettingsService.hexToHsl(primaryColor)}"`,
          category: 'colors' as const,
          description: 'Primary brand color (HSL)'
        },
        {
          key: 'secondary_color',
          value: `"${SiteSettingsService.hexToHsl(secondaryColor)}"`,
          category: 'colors' as const,
          description: 'Secondary brand color (HSL)'
        },
        {
          key: 'accent_color',
          value: `"${SiteSettingsService.hexToHsl(accentColor)}"`,
          category: 'colors' as const,
          description: 'Accent color (HSL)'
        }
      ];

      const { success, error } = await SiteSettingsService.updateMultipleSettings(settingsToUpdate);
      
      if (error) {
        toast({
          title: "Error",
          description: `Failed to save color settings: ${error}`,
          variant: "destructive",
        });
      } else if (success) {
        const settings = {
          primary_color: primaryColor,
          secondary_color: secondaryColor,
          accent_color: accentColor,
        };
        
        onUpdate?.(settings);
        
        toast({
          title: "Colors Updated",
          description: "Color settings have been saved successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save color settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Color Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="primaryColor" className="block text-sm font-medium mb-1">
            Primary Color
          </label>
          <div className="flex gap-2 items-center">
            <Input
              id="primaryColor"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-16"
            />
            <Input
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="#3b82f6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="secondaryColor" className="block text-sm font-medium mb-1">
            Secondary Color
          </label>
          <div className="flex gap-2 items-center">
            <Input
              id="secondaryColor"
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="w-16"
            />
            <Input
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              placeholder="#64748b"
            />
          </div>
        </div>

        <div>
          <label htmlFor="accentColor" className="block text-sm font-medium mb-1">
            Accent Color
          </label>
          <div className="flex gap-2 items-center">
            <Input
              id="accentColor"
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-16"
            />
            <Input
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#8b5cf6"
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Colors'}
        </Button>
      </div>
    </Card>
  );
};

export default ColorSettings;