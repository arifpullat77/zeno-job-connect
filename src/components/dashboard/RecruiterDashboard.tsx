import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostJobForm } from "@/components/PostJobForm";
import { JobList } from "@/components/JobList";
import { ApplicantList } from "@/components/dashboard/ApplicantList";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export function RecruiterDashboard() {
  const session = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel("applications-tracking")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "applications",
          filter: `jobs.recruiter_id=eq.${session.user.id}`,
        },
        (payload) => {
          console.log("Application update:", payload);
          // Refresh queries when data changes
          queryClient.invalidateQueries({ queryKey: ["applications"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  return (
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
  );
}