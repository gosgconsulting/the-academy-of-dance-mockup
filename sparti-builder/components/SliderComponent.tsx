import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface SliderComponentProps {
  images: SliderImage[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  transition?: 'fade' | 'slide' | 'zoom';
  height?: string;
  className?: string;
  onSlideChange?: (index: number) => void;
}

export const SliderComponent: React.FC<SliderComponentProps> = ({
  images = [],
  autoplay = false,
  autoplaySpeed = 3000,
  showDots = true,
  showArrows = true,
  slidesToShow = 1,
  transition = 'fade',
  height = '400px',
  className = '',
  onSlideChange
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, autoplaySpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, images.length, autoplaySpeed]);

  // Notify parent of slide changes
  useEffect(() => {
    onSlideChange?.(currentSlide);
  }, [currentSlide, onSlideChange]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const pauseAutoplay = () => {
    setIsPlaying(false);
  };

  const resumeAutoplay = () => {
    if (autoplay) {
      setIsPlaying(true);
    }
  };

  if (!images.length) {
    return (
      <div 
        className={`sparti-slider-empty ${className}`}
        style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', border: '2px dashed #d1d5db', borderRadius: '8px' }}
      >
        <p className="text-gray-500">No images in slider</p>
      </div>
    );
  }

  const getSliderStyles = () => {
    const baseStyles: React.CSSProperties = {
      height,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '8px'
    };

    return baseStyles;
  };

  const getSlideContainerStyles = () => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      height: '100%',
      transition: transition === 'slide' ? 'transform 0.5s ease-in-out' : 'none',
    };

    if (transition === 'slide') {
      baseStyles.transform = `translateX(-${(currentSlide * 100) / slidesToShow}%)`;
    }

    return baseStyles;
  };

  const getSlideStyles = (index: number) => {
    const baseStyles: React.CSSProperties = {
      minWidth: `${100 / slidesToShow}%`,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    if (transition === 'fade') {
      baseStyles.opacity = index === currentSlide ? 1 : 0;
      baseStyles.transition = 'opacity 0.5s ease-in-out';
      baseStyles.position = 'absolute';
      baseStyles.top = 0;
      baseStyles.left = 0;
      baseStyles.width = '100%';
      baseStyles.height = '100%';
    }

    if (transition === 'zoom') {
      baseStyles.transform = index === currentSlide ? 'scale(1)' : 'scale(0.95)';
      baseStyles.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      baseStyles.opacity = index === currentSlide ? 1 : 0;
      if (index !== currentSlide) {
        baseStyles.position = 'absolute';
        baseStyles.top = 0;
        baseStyles.left = 0;
        baseStyles.width = '100%';
        baseStyles.height = '100%';
      }
    }

    return baseStyles;
  };

  return (
    <div 
      className={`sparti-slider ${className}`}
      style={getSliderStyles()}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      data-sparti-editable="true"
      data-sparti-component="slider"
    >
      {/* Slide Container */}
      <div ref={containerRef} style={getSlideContainerStyles()}>
        {images.map((image, index) => (
          <div key={index} style={getSlideStyles(index)}>
            <img
              src={image.src}
              alt={image.alt}
              title={image.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              loading="lazy"
            />
            {/* Caption Overlay */}
            {image.caption && (transition === 'fade' ? index === currentSlide : true) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white',
                  padding: '2rem 1rem 1rem',
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}
              >
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.8)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.6)';
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.8)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.6)';
            }}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {showDots && images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 10
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};