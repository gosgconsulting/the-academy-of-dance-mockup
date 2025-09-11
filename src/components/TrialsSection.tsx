import { useState } from "react";
import { Calendar, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { HomePageTrialSection } from "@/lib/graphql";

const DEFAULT_DATA: HomePageTrialSection = {
  statistics: {
    studentsTrained: "Students Trained",
    studentsTrainedValue: "10,000+",
    yearsExperience: "Years Experience", 
    yearsExperienceValue: "40",
    successRate: "Success Rate",
    successRateValue: "95%",
    awardsWon: "Awards Won",
    awardsWonValue: "2000+"
  },
  title: "Begin Your Dance Journey",
  subTitle: "Jump into dance with a $20 trial class! Experience top-tier instruction and find your perfect style.",
  joinLabel: "Join Our Trial Classes",
  classes: [
    { className: "Ballet, Jazz, Lyrical & Contemporary, Hip Hop, Tap" },
    { className: "Tumbling classes are also available as our new course" },
    { className: "You can join our trial classes for just $20!" },
    { className: "Professional instructors with international experience" },
    { className: "Small class sizes for personalized attention" },
    { className: "Ages 3 to adult - everyone welcome" }
  ],
  contactInformation: "Contact Information",
  contactName: "Ms June Lee",
  contactPhone: "(65) 9837 2670",
  contactAddress: "Tampines\n510 Tampines Central 1, #02-250\nSingapore 520510"
};

interface TrialsSectionProps {
  data?: HomePageTrialSection;
}

const TrialsSection = ({ data: trialData = DEFAULT_DATA }: TrialsSectionProps) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    danceStyle: "",
    location: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the message for WhatsApp
    const whatsappMessage = `*Trial Class Booking Request*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Age:* ${formData.age}
*Preferred Location:* ${formData.location}
*Dance Style:* ${formData.danceStyle || "Not specified"}
*Message:* ${formData.message || "No additional message"}

Please contact me to schedule my trial class. Thank you!`;

    // Send to WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = trialData.contactPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Redirecting to WhatsApp!",
      description: "Your trial class request is being sent via WhatsApp."
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      danceStyle: "",
      location: "",
      message: ""
    });
  };

  return (
    <section id="trials" className="py-20 bg-gradient-to-br from-secondary/10 to-white">
      <div className="container mx-auto px-6">
        {/* Statistics Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-violet-500 drop-shadow-lg mb-4">
                  {trialData.statistics.studentsTrainedValue}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {trialData.statistics.studentsTrained}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 drop-shadow-lg mb-4">
                  {trialData.statistics.yearsExperienceValue}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {trialData.statistics.yearsExperience}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 drop-shadow-lg mb-4">
                  {trialData.statistics.successRateValue}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {trialData.statistics.successRate}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-rose-500 drop-shadow-lg mb-4">
                  {trialData.statistics.awardsWonValue}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {trialData.statistics.awardsWon}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            {trialData.title}
          </h2>
          <div className="font-inter text-gray-600 max-w-2xl mx-auto text-xl" dangerouslySetInnerHTML={{ __html: trialData.subTitle }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">{trialData.joinLabel}</h3>
              <ul className="space-y-4 text-gray-700">
                {trialData.classes?.map((trialClass, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    {trialClass.className}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white text-primary rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="font-playfair text-2xl font-bold mb-4">{trialData.contactInformation}</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">{trialData.contactName}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <a href={`tel:${trialData.contactPhone}`} className="hover:text-secondary transition-colors">
                    {trialData.contactPhone}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-primary" />
                  <div dangerouslySetInnerHTML={{ __html: trialData.contactAddress }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-playfair text-2xl font-bold text-primary mb-6">Book Your Trial Class</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} required />
                <Input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} required />
                <Input placeholder="Age" value={formData.age} onChange={e => setFormData({
                ...formData,
                age: e.target.value
              })} required />
              </div>
              <Select value={formData.location} onValueChange={value => setFormData({
              ...formData,
              location: value
            })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Centre Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tampines">Tampines</SelectItem>
                  <SelectItem value="yishun">Yishun</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Preferred Dance Style (Ballet, Jazz, Lyrical, Contemporary, Hip Hop, Tap, Tumbling)" value={formData.danceStyle} onChange={e => setFormData({
              ...formData,
              danceStyle: e.target.value
            })} />
              <Textarea placeholder="Tell us about your dance experience or any questions..." value={formData.message} onChange={e => setFormData({
              ...formData,
              message: e.target.value
            })} rows={4} />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
                <Calendar className="w-5 h-5 mr-2" />
                Book Now!
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrialsSection;