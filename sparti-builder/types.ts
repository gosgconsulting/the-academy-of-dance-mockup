export interface SpartiBuilderConfig {
  enabled?: boolean;
  toolbar?: boolean;
  autoDetect?: boolean;
  aiAgentAlwaysOpen?: boolean;
}

export type ElementType = 
  | 'text' 
  | 'image' 
  | 'slider'
  | 'video' 
  | 'button' 
  | 'link' 
  | 'input' 
  | 'container' 
  | 'media' 
  | 'unknown';

export interface ElementData {
  id: string;
  tagName: string;
  elementType: ElementType;
  content?: string;
  attributes: Record<string, string>;
  styles: Record<string, string>;
  // Element-specific properties
  src?: string;           // For images, videos
  href?: string;          // For links
  alt?: string;           // For images
  title?: string;         // For various elements
  placeholder?: string;   // For inputs
  value?: string;         // For inputs, buttons
  type?: string;          // For inputs, buttons
  // Slider-specific properties
  images?: SliderImage[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  transition?: 'fade' | 'slide' | 'zoom';
  height?: string;
}

export interface SliderImage {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export interface SpartiElement {
  element: HTMLElement;
  data: ElementData;
  pgNode?: any;
}

export interface EditingContext {
  isEditing: boolean;
  selectedElement: SpartiElement | null;
  hoveredElement: SpartiElement | null;
}