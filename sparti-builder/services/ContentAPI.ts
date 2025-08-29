import { PageSchema, SaveResponse, LoadResponse, PageVersion } from '../types/content-schema';

export class ContentAPI {
  // Use a hardcoded URL that works with the content server
  // Browser doesn't have access to process.env unless explicitly exposed by the build system
  private static baseURL = 'http://localhost:3001/api/content';

  public static async savePage(schema: PageSchema, comment?: string): Promise<SaveResponse> {
    try {
      console.log(`ContentAPI: Saving page to ${this.baseURL}/save`, { schema });
      
      const response = await fetch(`${this.baseURL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schema,
          comment,
          timestamp: new Date().toISOString()
        })
      });

      console.log('ContentAPI: Save response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('ContentAPI: HTTP error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result: SaveResponse = await response.json();
      console.log('ContentAPI: Save result:', result);
      return result;
    } catch (error) {
      console.error('ContentAPI: Error saving page:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  public static async loadPage(route: string): Promise<LoadResponse> {
    try {
      console.log(`ContentAPI: Loading page from ${this.baseURL}/load?route=${encodeURIComponent(route)}`);
      
      const response = await fetch(`${this.baseURL}/load?route=${encodeURIComponent(route)}`);
      console.log('ContentAPI: Load response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          console.log('ContentAPI: Page not found');
          return {
            success: false,
            error: 'Page not found'
          };
        }
        const errorText = await response.text();
        console.error('ContentAPI: HTTP error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result: LoadResponse = await response.json();
      console.log('ContentAPI: Load result:', result);
      return result;
    } catch (error) {
      console.error('ContentAPI: Error loading page:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  public static async getVersions(route: string): Promise<PageVersion[]> {
    try {
      const response = await fetch(`${this.baseURL}/versions?route=${encodeURIComponent(route)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const versions: PageVersion[] = await response.json();
      return versions;
    } catch (error) {
      console.error('Error fetching versions:', error);
      return [];
    }
  }

  public static async loadVersion(route: string, version: number): Promise<LoadResponse> {
    try {
      const response = await fetch(`${this.baseURL}/version?route=${encodeURIComponent(route)}&version=${version}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: LoadResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error loading version:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  public static async deletePage(route: string): Promise<SaveResponse> {
    try {
      const response = await fetch(`${this.baseURL}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ route })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: SaveResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting page:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}