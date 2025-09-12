import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTermsConditions } from "@/hooks/useTermsConditions";
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
const DEFAULT_TERMS_DATA = {
  title: "Terms & Conditions",
  lastUpdated: new Date().toLocaleDateString(),
  sections: [
    {
      title: "1. General Terms",
      content: "By accessing and using The Academy of Dance's services, website, and facilities, you agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and The Academy of Dance."
    },
    {
      title: "2. Dance Classes & Services",
      content: "All students must complete enrollment forms and provide accurate information. Class placement is subject to instructor assessment and studio availability."
    },
    {
      title: "3. Payment Terms",
      content: "Registration fees are required upon enrollment and are non-refundable. Monthly fees are due by the 1st of each month."
    },
    {
      title: "4. Health & Safety",
      content: "Students with medical conditions must provide medical clearance before participating. Students participate at their own risk."
    },
    {
      title: "5. Intellectual Property",
      content: "All choreography created by Academy instructors remains the intellectual property of The Academy of Dance."
    },
    {
      title: "6. Liability & Insurance",
      content: "The Academy of Dance's liability is limited to the fees paid for services. Students participate in physical activities at their own risk."
    },
    {
      title: "7. Termination",
      content: "Students may withdraw with 30 days written notice. The Academy of Dance may suspend students for non-payment or behavioral issues."
    }
  ],
  contactInfo: {
    email: "info@theacademyofdance.com.sg",
    phone: "+65 XXXX XXXX",
    governingLaw: "These Terms and Conditions are governed by Singapore law and comply with the Personal Data Protection Act (PDPA) 2012 and Consumer Protection (Fair Trading) Act."
  }
};

interface TermsConditionsProps {
  headerFooterData?: HeaderFooterSettings;
}

const TermsConditions = ({ headerFooterData }: TermsConditionsProps) => {
  // Fetch terms conditions data from GraphQL
  const { data: termsData, isLoading, error } = useTermsConditions();
  
  // Use data from GraphQL or fallback to default data
  const pageData = termsData ? {
    ...termsData.pageData,
    title: termsData.title,
    lastUpdated: termsData.lastUpdated
  } : DEFAULT_TERMS_DATA;

  // Don't render anything until we have data or there's an error
  if (isLoading) {
    return null;
  }
  
  // If there's an error, use default data
  if (error) {
    console.warn('Error loading terms conditions data, using default data:', error);
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
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Sections */}
            {pageData.sections.map((section, index) => (
              <section key={index} id={generateIdFromTitle(section.title)}>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  {section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-lg font-medium text-foreground">{subsection.title}</h3>
                      <div dangerouslySetInnerHTML={{ __html: subsection.content }} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Contact and Governing Law */}
            <div className="bg-card p-6 rounded-lg border mt-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information & Governing Law</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>The Academy of Dance</strong></p>
                <p>Email: {pageData.contactInfo.email}</p>
                <p>Phone: {pageData.contactInfo.phone}</p>
                <p className="mt-4" dangerouslySetInnerHTML={{ __html: pageData.contactInfo.governingLaw }} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <Footer data={headerFooterData} />
    </div>
  );
};

export default TermsConditions;