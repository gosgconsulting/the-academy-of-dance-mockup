export interface PageSchema {
  id: string;
  route: string;
  title: string;
  version: number;
  sections: SectionSchema[];
  metadata: PageMetadata;
}

export interface PageMetadata {
  createdAt: string;
  updatedAt: string;
  author?: string;
  description?: string;
}

export interface SectionSchema {
  id: string;
  type: string;
  order: number;
  elements: ElementSchema[];
  settings: SectionSettings;
}

export interface SectionSettings {
  className?: string;
  styles?: Record<string, string>;
  attributes?: Record<string, string>;
}

export interface ElementSchema {
  id: string;
  type: 'text' | 'image' | 'slider' | 'video' | 'button' | 'link' | 'input' | 'container' | 'media' | 'unknown';
  tagName: string;
  content?: string;
  attributes: Record<string, string>;
  styles: Record<string, string>;
  position: ElementPosition;
  // Element-specific properties
  src?: string;
  href?: string;
  alt?: string;
  title?: string;
  placeholder?: string;
  value?: string;
  images?: SliderImageSchema[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  transition?: 'fade' | 'slide' | 'zoom';
  height?: string;
}

export interface SliderImageSchema {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PageVersion {
  version: number;
  timestamp: string;
  schema: PageSchema;
  author?: string;
  comment?: string;
}

export interface ContentStorage {
  pages: Record<string, PageSchema>;
  versions: Record<string, PageVersion[]>;
  settings: ContentSettings;
}

export interface ContentSettings {
  autoSave: boolean;
  maxVersions: number;
  compressionEnabled: boolean;
}

export interface SaveResponse {
  success: boolean;
  version?: number;
  error?: string;
  timestamp?: string;
}

export interface LoadResponse {
  success: boolean;
  schema?: PageSchema;
  error?: string;
}