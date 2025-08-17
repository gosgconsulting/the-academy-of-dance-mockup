import { BuilderComponent } from '@builder.io/react';

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader = ({ title, subtitle, backgroundImage }: PageHeaderProps) => {
  return (
    <section 
      className="relative py-24 bg-black flex items-center justify-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
          {title || 'Page Title'}
        </h1>
        {subtitle && (
          <p className="font-inter text-xl text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
