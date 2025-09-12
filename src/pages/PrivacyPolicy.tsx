import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrivacyPolicy } from "@/hooks/usePrivacyPolicy";
import { HeaderFooterSettings } from "@/lib/graphql";

// Utility function to generate ID from title
const generateIdFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Default data fallback
const DEFAULT_PRIVACY_DATA = {
  title: "Privacy Policy",
  lastUpdated: new Date().toLocaleDateString(),
  sections: [
    {
      title: "Information Collection",
      content: "The Academy of Dance is committed to protecting your personal data in compliance with Singapore's Personal Data Protection Act (PDPA) 2012."
    },
    {
      title: "Use of Information",
      content: "We use your personal information for class management, safety and emergency response, payment processing, and communication."
    },
    {
      title: "Information Sharing",
      content: "We share data with payment processors, emergency services, competition organizers, and examination bodies as necessary."
    },
    {
      title: "Data Security",
      content: "We implement physical and digital security measures to protect your personal data."
    },
    {
      title: "Your Rights Under Singapore PDPA",
      content: "You have the right to access, correct, withdraw consent, and request deletion of your personal data."
    },
    {
      title: "Cookies & Website Analytics",
      content: "We use essential, performance, functional, and marketing cookies to improve our website and services."
    },
  ],
};

interface PrivacyPolicyProps {
  headerFooterData?: HeaderFooterSettings;
}

const PrivacyPolicy = ({ headerFooterData }: PrivacyPolicyProps) => {
  // Fetch privacy policy data from GraphQL
  const { data: privacyData, isLoading, error } = usePrivacyPolicy();
  
  // Use data from GraphQL or fallback to default data
  const pageData = privacyData ? {
    ...privacyData.pageData,
    title: privacyData.title,
    lastUpdated: privacyData.lastUpdated
  } : DEFAULT_PRIVACY_DATA;

  // Don't render anything until we have data or there's an error
  if (isLoading) {
    return null;
  }
  
  // If there's an error, use default data
  if (error) {
    console.warn('Error loading privacy policy data, using default data:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={() => {}} data={headerFooterData} />
      
      <div className="container mx-auto px-6 py-12 pt-24 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{pageData.title}</h1>
          <p className="text-muted-foreground">Last updated: {pageData.lastUpdated}</p>
        </div>

        <ScrollArea className="h-auto">
          <div className="space-y-8">
            {/* Table of Contents */}
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-sm">
                {pageData.sections.map((section, index) => (
                  <li key={index}>
                    <a href={`#${generateIdFromTitle(section.title)}`} className="text-primary hover:underline">
                      {`${index + 1}. ${section.title}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Sections */}
            {pageData.sections.map((section, index) => (
              <section key={index} id={generateIdFromTitle(section.title)}>
                <h2 className="text-2xl font-semibold mb-4">{`${index + 1}. ${section.title}`}</h2>
                <div className="space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <Footer data={headerFooterData} />
    </div>
  );
};

export default PrivacyPolicy;