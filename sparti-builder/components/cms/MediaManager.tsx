import React, { useState, useEffect, ChangeEvent } from 'react';
import { Upload, Trash2, Search, Grid, List, Image as ImageIcon, FileText, Film, Music, File } from 'lucide-react';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Card } from '../../../src/components/ui/card';
import { useToast } from '../../../src/hooks/use-toast';
import { MediaService, type MediaItem } from '../../services/MediaService';

interface DisplayMediaItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'other';
  url: string;
  size: number;
  dateUploaded: string;
}

const MediaManager: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<DisplayMediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMediaItems();
  }, []);

  const loadMediaItems = async () => {
    try {
      const { data, error } = await MediaService.getAllMedia();
      if (error) {
        toast({
          title: "Error",
          description: `Failed to load media: ${error}`,
          variant: "destructive",
        });
      } else if (data) {
        const displayItems: DisplayMediaItem[] = data.map(item => ({
          id: item.id,
          name: item.filename,
          type: getFileType(item.file_type),
          url: MediaService.getPublicUrl(item.file_path),
          size: item.file_size,
          dateUploaded: new Date(item.created_at).toISOString().split('T')[0]
        }));
        setMediaItems(displayItems);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load media",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const files = Array.from(e.target.files);
      const totalFiles = files.length;
      let completedFiles = 0;
      
      for (const file of files) {
        try {
          const { data, error } = await MediaService.uploadFile(file);
          
          if (error) {
            toast({
              title: "Upload Error",
              description: `Failed to upload ${file.name}: ${error}`,
              variant: "destructive",
            });
          } else if (data) {
            const newDisplayItem: DisplayMediaItem = {
              id: data.mediaItem.id,
              name: data.mediaItem.filename,
              type: getFileType(data.mediaItem.file_type),
              url: data.url,
              size: data.mediaItem.file_size,
              dateUploaded: new Date(data.mediaItem.created_at).toISOString().split('T')[0]
            };
            
            setMediaItems(prev => [newDisplayItem, ...prev]);
            
            toast({
              title: "Upload Successful",
              description: `${file.name} has been uploaded successfully`,
            });
          }
        } catch (error) {
          toast({
            title: "Upload Error",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
        }
        
        completedFiles++;
        setUploadProgress((completedFiles / totalFiles) * 100);
      }
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (e.target) {
        e.target.value = '';
      }
    }
  };
  
  const getFileType = (mimeType: string): DisplayMediaItem['type'] => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document';
    return 'other';
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };
  
  const handleItemSelect = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };
  
  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    
    setUploading(true);
    try {
      const deletionPromises = selectedItems.map(id => MediaService.deleteMedia(id));
      const results = await Promise.allSettled(deletionPromises);
      
      let successCount = 0;
      let errorCount = 0;
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success) {
          successCount++;
        } else {
          errorCount++;
          console.error(`Failed to delete media item:`, result);
        }
      });
      
      if (successCount > 0) {
        setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
        
        toast({
          title: "Media Deleted",
          description: `${successCount} item(s) deleted successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
        });
      }
      
      if (errorCount > 0 && successCount === 0) {
        toast({
          title: "Delete Error",
          description: "Failed to delete selected items",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Delete Error",
        description: "Failed to delete selected items",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const getFileIcon = (type: DisplayMediaItem['type']) => {
    switch (type) {
      case 'image': return <ImageIcon className="h-6 w-6 text-blue-500" />;
      case 'document': return <FileText className="h-6 w-6 text-green-500" />;
      case 'video': return <Film className="h-6 w-6 text-purple-500" />;
      case 'audio': return <Music className="h-6 w-6 text-yellow-500" />;
      default: return <File className="h-6 w-6 text-muted-foreground" />;
    }
  };
  
  // Filter media items based on search query
  const filteredItems = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-2">Media Manager</h2>
      <p className="text-muted-foreground mb-6">Upload, organize, and manage your media files</p>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading media...</span>
        </div>
      ) : (
        <>
          {/* Upload and Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <label className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              
              {selectedItems.length > 0 && (
                <Button 
                  onClick={handleDeleteSelected}
                  variant="destructive"
                  disabled={uploading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedItems.length})
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2"
                />
                <Search className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              
              <div className="flex border border-border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Upload Progress */}
          {uploading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm font-medium">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Media Items */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground">No media items found</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  className={`relative border rounded-lg overflow-hidden group cursor-pointer ${
                    selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleItemSelect(item.id)}
                >
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    {item.type === 'image' ? (
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="p-4 flex flex-col items-center justify-center h-full">
                        {getFileIcon(item.type)}
                        <span className="mt-2 text-xs text-muted-foreground truncate max-w-full">
                          {item.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(item.size)}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(item.id)}
                      onChange={() => {}}
                      className="h-5 w-5 accent-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 accent-primary"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      File
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date Uploaded
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {filteredItems.map(item => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-muted/50 cursor-pointer ${selectedItems.includes(item.id) ? 'bg-muted/50' : ''}`}
                      onClick={() => handleItemSelect(item.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedItems.includes(item.id)}
                          onChange={() => {}}
                          className="h-4 w-4 accent-primary"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                            {item.type === 'image' ? (
                              <img className="h-10 w-10 object-cover rounded" src={item.url} alt="" />
                            ) : (
                              getFileIcon(item.type)
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm capitalize">{item.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{formatFileSize(item.size)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.dateUploaded}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Media Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-md p-4">
              <p className="text-sm text-muted-foreground">Total Files</p>
              <p className="text-xl font-bold">{mediaItems.length}</p>
            </div>
            <div className="bg-muted/50 rounded-md p-4">
              <p className="text-sm text-muted-foreground">Images</p>
              <p className="text-xl font-bold">
                {mediaItems.filter(item => item.type === 'image').length}
              </p>
            </div>
            <div className="bg-muted/50 rounded-md p-4">
              <p className="text-sm text-muted-foreground">Documents</p>
              <p className="text-xl font-bold">
                {mediaItems.filter(item => item.type === 'document').length}
              </p>
            </div>
            <div className="bg-muted/50 rounded-md p-4">
              <p className="text-sm text-muted-foreground">Total Size</p>
              <p className="text-xl font-bold">
                {formatFileSize(mediaItems.reduce((acc, item) => acc + item.size, 0))}
              </p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default MediaManager;