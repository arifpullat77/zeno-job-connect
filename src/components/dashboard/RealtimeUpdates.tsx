import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function RealtimeUpdates() {
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
          queryClient.invalidateQueries({ queryKey: ["applications"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  return null;
}