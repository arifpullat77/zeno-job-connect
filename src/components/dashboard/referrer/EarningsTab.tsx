import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export function EarningsTab() {
  const session = useSession();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingEarnings, setPendingEarnings] = useState(0);
  const [successfulReferrals, setSuccessfulReferrals] = useState(0);

  const { data: referrals } = useQuery({
    queryKey: ["referrals", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          referral:referrals!inner(*),
          job:jobs(*)
        `)
        .eq("referrals.referrer_id", session?.user?.id);

      if (error) {
        console.error("Error fetching referrals:", error);
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (referrals) {
      const hired = referrals.filter((r) => r.status === "hired");
      const pending = referrals.filter((r) => r.status === "interviewing");
      
      setSuccessfulReferrals(hired.length);
      setTotalEarnings(hired.reduce((acc, r) => acc + (r.job?.referral_bonus || 0), 0));
      setPendingEarnings(pending.reduce((acc, r) => acc + (r.job?.referral_bonus || 0), 0));
    }
  }, [referrals]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold lowercase">earnings overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium lowercase">total earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings}</div>
            <p className="text-xs text-muted-foreground">From {successfulReferrals} successful referrals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium lowercase">pending earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingEarnings}</div>
            <p className="text-xs text-muted-foreground">From interviewing candidates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium lowercase">successful referrals</CardTitle>
            <Users className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulReferrals}</div>
            <p className="text-xs text-muted-foreground">Total hired candidates</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}