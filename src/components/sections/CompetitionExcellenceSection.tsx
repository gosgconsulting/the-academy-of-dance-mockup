import { Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const CompetitionExcellenceSection = () => {
  return <section id="competitions" className="py-20 bg-gradient-to-br from-primary/10 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">Our Competition Classes</h2>
          <p className="font-inter text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
            We don't just dance for fun (though we have TONS of that!) - we
            also dominate the competition scene! Our dancers bring home the
            gold and make us incredibly proud. ✨
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex flex-col items-center mb-8">
              <Trophy className="w-12 h-12 text-secondary mb-4" />
              <h3 className="font-playfair text-3xl font-bold text-primary text-center">
                Our Competition Classes
              </h3>
            </div>

            <Tabs defaultValue="solo" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="solo">Solo Program</TabsTrigger>
                <TabsTrigger value="groups">Dance Groups</TabsTrigger>
              </TabsList>

              <TabsContent value="solo" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div className="relative">
                    <img src="/lovable-uploads/a31c7571-fdc6-46c2-9f33-cfbf3bfb239f.png" alt="Solo Performance" className="w-full h-64 object-cover rounded-xl" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-playfair text-primary text-2xl font-semibold">
                      Solo Program
                    </h4>
                    <p className="text-gray-700 text-base font-normal">
                      Perfect for dancers who want to shine in the spotlight!
                      Our solo program develops individual artistry, technical
                      precision, and stage presence that judges absolutely
                      love.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="groups" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div className="relative">
                    <img src="/lovable-uploads/11b84a73-9ab2-490c-b020-9540e34bdd6a.png" alt="Dance Group Performance" className="w-full h-64 object-cover rounded-xl" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-playfair text-primary text-2xl font-semibold">
                      Dance Groups
                    </h4>
                    <p className="text-gray-700 mb-3 text-base">
                      Our competitive troupes are where magic happens! These
                      elite groups train together, compete together, and WIN
                      together. The bond they form is as strong as their
                      performances are spectacular.
                    </p>
                    <p className="text-secondary font-semibold italic">
                      (These are our competitive troupes - the cream of the
                      crop!)
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>;
};
export default CompetitionExcellenceSection;