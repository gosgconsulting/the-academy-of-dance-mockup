// Header/Footer are injected via SiteLayout
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePageContent } from "@/cms/usePageContent";
import { termsDefaults, type TermsContent } from "@/cms/content/schemas/legal";

const TermsConditions = () => {
  const { data } = usePageContent<TermsContent>('terms-conditions', termsDefaults)

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-6 py-12 pt-24 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{data.title}</h1>
          <p className="text-muted-foreground">Last updated: {new Date(data.updatedAt).toLocaleDateString()}</p>
        </div>

        <ScrollArea className="h-auto">
          <div className="space-y-8">
            {data.sections.map(section => (
              <section key={section.id} id={section.id} className="bg-card p-6 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div className="prose prose-sm md:prose" dangerouslySetInnerHTML={{ __html: section.contentHtml }} />
              </section>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      
    </div>
  );
};

export default TermsConditions;