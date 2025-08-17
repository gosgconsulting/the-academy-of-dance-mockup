import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

const FAQ = ({ 
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our dance programs and academy",
  faqs = []
}: FAQProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const defaultFAQs: FAQItem[] = [
    {
      question: "What age groups do you cater to?",
      answer: "We offer classes for all ages starting from 2 years old with our pre-ballet program, through to adult classes. Our programs are specifically designed for different age groups: toddlers (2-4), children (5-8), juniors (9-12), teens (13-17), and adults (18+)."
    },
    {
      question: "Do I need any prior dance experience to join?",
      answer: "Not at all! We welcome complete beginners and offer beginner-friendly classes in all dance styles. Our experienced instructors will guide you through the basics and help you progress at your own pace."
    },
    {
      question: "What should I wear to class?",
      answer: "For your first class, wear comfortable, stretchy clothing that allows free movement. For ballet, we recommend leggings/tights and a fitted top. Most dance styles can be done barefoot initially, though we'll recommend proper dance shoes as you progress."
    },
    {
      question: "How do I book a trial class?",
      answer: "You can book a trial class through our website, by calling us directly, or by visiting our studio. We offer discounted trial rates for new students to try different dance styles and find what they love most."
    },
    {
      question: "Do you offer performance opportunities?",
      answer: "Yes! We hold annual recitals and participate in local dance competitions. Students also have opportunities to perform at community events. Participation in performances is optional but highly encouraged for skill development and confidence building."
    },
    {
      question: "What are your class sizes?",
      answer: "We maintain small class sizes to ensure personalized attention. Children's classes typically have 8-12 students, while adult classes range from 10-15 students. This allows our instructors to provide individual feedback and support."
    },
    {
      question: "Do you offer makeup classes?",
      answer: "Yes, we understand that schedules can be unpredictable. Students can make up missed classes within the same month by attending a class of the same level in their enrolled style, subject to space availability."
    },
    {
      question: "Are there family discounts available?",
      answer: "We offer a 10% discount for families with multiple children enrolled in regular classes. We also have special family rates for our workshops and intensive programs. Contact us for details about our current family packages."
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {displayFAQs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              📞 Call us at: <span className="font-semibold">+65 6123 4567</span>
            </p>
            <p className="text-sm text-gray-500">
              ✉️ Email: <span className="font-semibold">info@elitedanceacademy.sg</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
