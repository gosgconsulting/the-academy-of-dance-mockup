import { Card, CardContent } from "@/components/ui/card";
const ProgrammesSection = () => {
  return <section id="programmes" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Programmes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the perfect dance style for you with our comprehensive
            range of programmes, each designed to nurture artistry and
            technical excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ballet */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src="/lovable-uploads/da5c9831-e15c-4c80-bf8c-169e3bb472fc.png" alt="Ballet Class" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Ballet
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Baby Gems is a magical first step into dance for little ones
                aged 3–4, created by Ms. June Lee to make learning fun and
                joyful. With twirls to Disney tunes and skips to nursery
                rhymes, it builds confidence, creativity, and sets the stage
                for classical training.
              </p>
            </CardContent>
          </Card>

          {/* Jazz */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src="/lovable-uploads/3f806d09-71f1-4c34-8591-8c2dd21fe346.png" alt="Jazz Dance Performance" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Jazz
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Dynamic and energetic, our jazz classes focus on sharp
                movements, isolations, and performance quality. Students
                develop rhythm, coordination, and stage presence while
                learning classic jazz techniques and contemporary commercial
                styles.
              </p>
            </CardContent>
          </Card>

          {/* Lyrical */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src="/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png" alt="Lyrical Dance" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Lyrical
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                A beautiful fusion of ballet technique with emotional
                storytelling. Lyrical dance emphasizes the connection between
                music and movement, allowing dancers to express deep emotions
                through flowing, graceful choreography that tells a story.
              </p>
            </CardContent>
          </Card>

          {/* Contemporary */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src="/lovable-uploads/cc1b8cc0-3767-4760-9f8a-3015d9e2a2f6.png" alt="Contemporary Dance" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Contemporary
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Modern movement that breaks traditional dance boundaries.
                Contemporary dance incorporates elements from various dance
                styles, focusing on versatility, creativity, and personal
                expression through innovative choreography and technique.
              </p>
            </CardContent>
          </Card>

          {/* Hip Hop */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src="/lovable-uploads/3e19f9a6-1e4b-40f4-9c80-638142fb2bf5.png" alt="Hip Hop Dance" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Hip Hop
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Street-style dance that emphasizes personal expression and
                creativity. Our hip hop classes teach foundational moves,
                freestyle techniques, and urban choreography while building
                confidence, rhythm, and individual style.
              </p>
            </CardContent>
          </Card>

          {/* Tap */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src="/lovable-uploads/026cddda-e890-486d-be1e-8052ff34515e.png" alt="Tap Dance" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Tap</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Create music with your feet! Our tap programme develops rhythm,
                coordination, and musicality through traditional tap
                techniques. Students learn basic steps, combinations, and
                improvisation while building strong rhythmic foundations.
              </p>
            </CardContent>
          </Card>

          {/* Tumbling */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img src="/lovable-uploads/96dbee1c-cdd5-4735-a8ab-21e83d6f99c2.png" alt="Tumbling Class" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Tumbling
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Our newest programme! Build strength, flexibility, and
                acrobatic skills in a safe, progressive environment. Students
                learn rolls, cartwheels, handstands, and more advanced
                tumbling skills that enhance their overall dance performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default ProgrammesSection;