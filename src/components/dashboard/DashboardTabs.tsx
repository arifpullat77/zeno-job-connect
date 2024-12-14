import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostJobForm } from "@/components/PostJobForm";
import { JobList } from "@/components/JobList";
import { ApplicantList } from "@/components/dashboard/ApplicantList";
import { SubscriptionStatus } from "@/components/subscription/SubscriptionStatus";

export function DashboardTabs() {
  return (
    <>
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="jobs" className="lowercase">jobs</TabsTrigger>
          <TabsTrigger value="post" className="lowercase">post job</TabsTrigger>
          <TabsTrigger value="applicants" className="lowercase">applicants</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 lowercase">your job listings</h2>
            <JobList />
          </div>
        </TabsContent>
        
        <TabsContent value="post">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 lowercase">post a new job</h2>
            <PostJobForm />
          </div>
        </TabsContent>
        
        <TabsContent value="applicants">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 lowercase">applicants</h2>
            <ApplicantList />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <SubscriptionStatus />
      </div>
    </>
  );
}