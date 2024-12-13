import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecruiterDashboard } from "@/components/dashboard/RecruiterDashboard";
import { ReferrerDashboard } from "@/components/dashboard/ReferrerDashboard";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 lowercase">dashboard</h1>
      
      <Tabs defaultValue="recruiter" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="recruiter" className="lowercase">recruiter</TabsTrigger>
          <TabsTrigger value="referrer" className="lowercase">referrer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recruiter">
          <RecruiterDashboard />
        </TabsContent>
        
        <TabsContent value="referrer">
          <ReferrerDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}