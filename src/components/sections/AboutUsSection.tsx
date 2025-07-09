import { Users, Heart, Award, Target } from "lucide-react";
const AboutUsSection = () => {
  return <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            About Us
          </h2>
          <p className="font-inter text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            For over 40 years, The Academy of Dance has been nurturing artistic excellence and inspiring dancers of all ages. 
            Our passion for dance education has shaped thousands of students into confident performers and lifelong lovers of the arts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div className="space-y-6">
            <h3 className="font-playfair text-3xl font-bold text-primary mb-4">Our Story</h3>
            <p className="text-gray-700 leading-relaxed">
              Founded in 1984, The Academy of Dance began with a simple vision: to create a nurturing environment 
              where students could explore their passion for dance while developing discipline, creativity, and confidence. 
              What started as a small studio has grown into one of Singapore's most respected dance institutions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Under the guidance of our founder Ms June Lee, we have maintained our commitment to excellence in dance 
              education while adapting to modern teaching methods and incorporating diverse dance styles from around the world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we continue to honor our legacy while embracing innovation, ensuring that every student receives 
              the highest quality dance education in a supportive and inspiring environment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-playfair text-xl font-bold text-primary mb-2">Expert Faculty</h4>
              <p className="text-gray-600 text-sm">Internationally trained instructors with decades of experience</p>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 text-center">
              <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-playfair text-xl font-bold text-primary mb-2">Passion Driven</h4>
              <p className="text-gray-600 text-sm">Every class is taught with love, dedication, and enthusiasm</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-playfair text-xl font-bold text-primary mb-2">Award Winning</h4>
              <p className="text-gray-600 text-sm">Over 1000 awards and recognitions in competitions</p>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 text-center">
              <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-playfair text-xl font-bold text-primary mb-2">Goal Oriented</h4>
              <p className="text-gray-600 text-sm">Structured curriculum designed for measurable progress</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        
      </div>
    </section>;
};
export default AboutUsSection;