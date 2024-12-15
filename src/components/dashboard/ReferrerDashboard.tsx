import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { SharedJobsTab } from "./referrer/SharedJobsTab";
import { ReferralsTab } from "./referrer/ReferralsTab";
import { EarningsTab } from "./referrer/EarningsTab";
import { NewJobsTab } from "./referrer/NewJobsTab";

export function ReferrerDashboard() {
  const session = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel("referrals-tracking")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "referrals",
          filter: `referrer_id=eq.${session.user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["shared-jobs"] });
          queryClient.invalidateQueries({ queryKey: ["referrals"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="shared-jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="shared-jobs" className="lowercase">shared jobs</TabsTrigger>
          <TabsTrigger value="referrals" className="lowercase">referrals</TabsTrigger>
          <TabsTrigger value="earnings" className="lowercase">earnings</TabsTrigger>
          <TabsTrigger value="new-jobs" className="lowercase">new jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="shared-jobs">
          <SharedJobsTab />
        </TabsContent>

        <TabsContent value="referrals">
          <ReferralsTab />
        </TabsContent>

        <TabsContent value="earnings">
          <EarningsTab />
        </TabsContent>

        <TabsContent value="new-jobs">
          <NewJobsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}