import React from 'react'
import { builder } from '@builder.io/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Dance Academy specific components for Builder.io

interface HeroSectionProps {
  title?: string
  subtitle?: string
  ctaText?: string
  backgroundImage?: string
  overlayOpacity?: number
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Where Dreams Take Flight",
  subtitle = "Singapore's premium ballet and dance academy",
  ctaText = "Start Your Journey",
  backgroundImage = "/lovable-uploads/f8f4ebc7-577a-4261-840b-20a866629516.png",
  overlayOpacity = 0.4
}) => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 whitespace-pre-line">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <Button size="lg" className="bg-vibrant-gold hover:bg-vibrant-amber text-elegant-black font-semibold px-8 py-3 text-lg">
          {ctaText}
        </Button>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  name?: string
  role?: string
  content?: string
  rating?: number
  image?: string
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name = "Parent Name",
  role = "Parent of Student",
  content = "Amazing experience at this dance academy!",
  rating = 5,
  image
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          {image && (
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 italic">"{content}"</p>
      </CardContent>
    </Card>
  )
}

interface ProgrammeCardProps {
  title?: string
  description?: string
  image?: string
  age?: string
  level?: string
}

export const ProgrammeCard: React.FC<ProgrammeCardProps> = ({
  title = "Dance Programme",
  description = "Learn the fundamentals of dance in a supportive environment.",
  image = "/placeholder.svg",
  age = "All Ages",
  level = "Beginner"
}) => {
  return (
    <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">{age}</Badge>
            <Badge variant="outline">{level}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button className="w-full">Learn More</Button>
      </CardContent>
    </Card>
  )
}

interface StatCardProps {
  value?: string | number
  label?: string
  icon?: string
  color?: 'gold' | 'bronze' | 'amber' | 'champagne'
}

export const StatCard: React.FC<StatCardProps> = ({
  value = "100+",
  label = "Happy Students",
  icon = "👥",
  color = "gold"
}) => {
  const colorClasses = {
    gold: "bg-gradient-to-br from-stats-gold to-stats-royal text-elegant-black",
    bronze: "bg-gradient-to-br from-stats-bronze to-stats-amber text-elegant-black", 
    amber: "bg-gradient-to-br from-stats-amber to-stats-champagne text-elegant-black",
    champagne: "bg-gradient-to-br from-stats-champagne to-elegant-cream text-elegant-charcoal"
  }

  return (
    <Card className={`text-center ${colorClasses[color]} border-0 shadow-lg`}>
      <CardContent className="pt-6">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm font-medium opacity-90">{label}</div>
      </CardContent>
    </Card>
  )
}

interface CTASectionProps {
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  backgroundImage?: string
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Start Dancing?",
  description = "Join our community of passionate dancers and discover your potential.",
  primaryButtonText = "Book Trial Class",
  secondaryButtonText = "Learn More",
  backgroundImage
}) => {
  return (
    <section className="relative py-20 px-6">
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}
      <div className={`relative z-10 max-w-4xl mx-auto text-center ${backgroundImage ? 'text-white' : ''}`}>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
          {title}
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-vibrant-gold hover:bg-vibrant-amber text-elegant-black">
            {primaryButtonText}
          </Button>
          <Button size="lg" variant="outline" className={backgroundImage ? "text-white border-white hover:bg-white hover:text-black" : ""}>
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  )
}

// Register components with Builder.io
export const registerBuilderComponents = () => {
  builder.register('component', {
    name: 'Hero Section',
    component: HeroSection,
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Where Dreams Take Flight' },
      { name: 'subtitle', type: 'string', defaultValue: "Singapore's premium ballet and dance academy" },
      { name: 'ctaText', type: 'string', defaultValue: 'Start Your Journey' },
      { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'] },
      { name: 'overlayOpacity', type: 'number', defaultValue: 0.4, min: 0, max: 1, step: 0.1 }
    ]
  })

  builder.register('component', {
    name: 'Testimonial Card',
    component: TestimonialCard,
    inputs: [
      { name: 'name', type: 'string', defaultValue: 'Parent Name' },
      { name: 'role', type: 'string', defaultValue: 'Parent of Student' },
      { name: 'content', type: 'longText', defaultValue: 'Amazing experience at this dance academy!' },
      { name: 'rating', type: 'number', defaultValue: 5, min: 1, max: 5 },
      { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'] }
    ]
  })

  builder.register('component', {
    name: 'Programme Card',
    component: ProgrammeCard,
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Dance Programme' },
      { name: 'description', type: 'longText' },
      { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'] },
      { name: 'age', type: 'string', defaultValue: 'All Ages' },
      { name: 'level', type: 'string', defaultValue: 'Beginner' }
    ]
  })

  builder.register('component', {
    name: 'Stat Card',
    component: StatCard,
    inputs: [
      { name: 'value', type: 'string', defaultValue: '100+' },
      { name: 'label', type: 'string', defaultValue: 'Happy Students' },
      { name: 'icon', type: 'string', defaultValue: '👥' },
      { 
        name: 'color', 
        type: 'string', 
        defaultValue: 'gold',
        enum: ['gold', 'bronze', 'amber', 'champagne']
      }
    ]
  })

  builder.register('component', {
    name: 'CTA Section',
    component: CTASection,
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Ready to Start Dancing?' },
      { name: 'description', type: 'longText' },
      { name: 'primaryButtonText', type: 'string', defaultValue: 'Book Trial Class' },
      { name: 'secondaryButtonText', type: 'string', defaultValue: 'Learn More' },
      { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png'] }
    ]
  })
}

// Export all components
export {
  HeroSection,
  TestimonialCard,
  ProgrammeCard,
  StatCard,
  CTASection
}
