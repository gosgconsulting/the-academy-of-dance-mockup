import { ReactComponentData } from './ReactCodeGenerator';

export interface SaveResult {
  success: boolean;
  message: string;
  backupCreated?: string;
}

export class FileSaveService {
  private static readonly BACKUP_DIR = 'backups';

  static async saveToFile(filePath: string, content: string): Promise<SaveResult> {
    try {
      // Check if File System Access API is available
      if ('showSaveFilePicker' in window) {
        return await this.saveWithFileSystemAPI(filePath, content);
      } else {
        // Fallback to download
        return this.saveAsDownload(filePath, content);
      }
    } catch (error) {
      console.error('Error saving file:', error);
      return {
        success: false,
        message: `Failed to save file: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private static async saveWithFileSystemAPI(filePath: string, content: string): Promise<SaveResult> {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: filePath.split('/').pop(),
        types: [
          {
            description: 'TypeScript React files',
            accept: {
              'text/typescript': ['.tsx', '.ts'],
            },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();

      return {
        success: true,
        message: 'File saved successfully'
      };
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return {
          success: false,
          message: 'Save operation cancelled by user'
        };
      }
      throw error;
    }
  }

  private static saveAsDownload(filePath: string, content: string): SaveResult {
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop() || 'component.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'File downloaded successfully'
    };
  }

  static async createBackup(filePath: string, originalContent: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = filePath.split('/').pop()?.replace('.tsx', '') || 'component';
    const backupFileName = `${fileName}-backup-${timestamp}.tsx`;
    
    try {
      await this.saveToFile(`${this.BACKUP_DIR}/${backupFileName}`, originalContent);
      return backupFileName;
    } catch (error) {
      console.warn('Could not create backup file:', error);
      return '';
    }
  }

  static async saveComponent(
    filePath: string, 
    componentData: ReactComponentData, 
    createBackup: boolean = true
  ): Promise<SaveResult> {
    try {
      const fullContent = this.assembleFullComponent(componentData);
      
      let backupFile = '';
      if (createBackup) {
        // In a real implementation, you'd read the existing file first
        // For now, we'll skip backup creation
        console.log('Backup would be created for:', filePath);
      }

      const saveResult = await this.saveToFile(filePath, fullContent);
      
      if (saveResult.success && backupFile) {
        saveResult.backupCreated = backupFile;
      }

      return saveResult;
    } catch (error) {
      return {
        success: false,
        message: `Failed to save component: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private static assembleFullComponent(componentData: ReactComponentData): string {
    return `${componentData.imports.join('\n')}

${componentData.content}

${componentData.exportLine}`;
  }

  static async saveImage(imageBlob: Blob, fileName: string): Promise<string> {
    try {
      // Create a data URL for the image
      const dataUrl = await this.blobToDataUrl(imageBlob);
      
      // In a real implementation, you'd save to public/lovable-uploads/
      // For now, we'll store in localStorage and return a path
      const imagePath = `/lovable-uploads/${fileName}`;
      localStorage.setItem(`image_${fileName}`, dataUrl);
      
      return imagePath;
    } catch (error) {
      console.error('Error saving image:', error);
      throw new Error('Failed to save image');
    }
  }

  private static blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}