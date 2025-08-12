import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
}

interface PricingProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}

const Pricing = ({ 
  title = "Class Packages & Pricing",
  subtitle = "Choose the perfect package for your dance journey",
  tiers = []
}: PricingProps) => {
  const defaultTiers: PricingTier[] = [
    {
      name: "Drop-in Class",
      price: "$35",
      period: "per class",
      description: "Perfect for trying out different styles",
      features: [
        "Single class access",
        "All dance styles available",
        "No commitment required",
        "Beginner friendly"
      ],
      ctaText: "Book a Class"
    },
    {
      name: "Monthly Unlimited",
      price: "$180",
      period: "per month",
      description: "Best value for regular dancers",
      features: [
        "Unlimited classes",
        "All dance styles included",
        "Priority booking",
        "Free guest pass (1 per month)",
        "Access to workshops"
      ],
      popular: true,
      ctaText: "Start Monthly Plan"
    },
    {
      name: "4-Class Package",
      price: "$120",
      period: "expires 6 weeks",
      description: "Great for beginners and casual dancers",
      features: [
        "4 classes to use flexibly",
        "All dance styles available",
        "6-week validity",
        "Transferable to family"
      ],
      ctaText: "Buy Package"
    }
  ];

  const displayTiers = tiers.length > 0 ? tiers : defaultTiers;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayTiers.map((tier, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-shadow ${tier.popular ? 'border-primary border-2' : ''}`}>
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  <span className="text-gray-600 ml-2">{tier.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{tier.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-900 hover:bg-gray-800'}`}
                >
                  {tier.ctaText || 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All packages include access to our state-of-the-art facilities and professional instruction.
          </p>
          <p className="text-sm text-gray-500">
            Contact us for custom packages, family discounts, and corporate rates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
