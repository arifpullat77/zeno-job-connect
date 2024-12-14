import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostJobForm } from "@/components/PostJobForm";
import { JobList } from "@/components/JobList";
import { ApplicantList } from "@/components/dashboard/ApplicantList";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { SubscriptionStatus } from "@/components/subscription/SubscriptionStatus";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function RecruiterDashboard() {
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: subscription } = useQuery({
    queryKey: ["subscription", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

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
          queryClient.invalidateQueries({ queryKey: ["applications"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  const isSubscriptionExpired = subscription?.status === 'expired' || 
    (subscription?.status === 'trialing' && new Date(subscription?.trial_end) < new Date());

  if (isSubscriptionExpired) {
    return (
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Dashboard Locked
            </CardTitle>
            <CardDescription>
              Your trial period has expired. Please subscribe to continue using the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionStatus />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
    </div>
  );
}