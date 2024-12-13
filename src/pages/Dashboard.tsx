import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecruiterDashboard } from "@/components/dashboard/RecruiterDashboard";
import { ReferrerDashboard } from "@/components/dashboard/ReferrerDashboard";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-[#10b981]" />
        </Link>
        <h1 className="text-2xl font-bold lowercase">dashboard</h1>
      </div>
      
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