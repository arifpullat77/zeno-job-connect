import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Users, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function ReferrerDashboard() {
  const session = useSession();
  const queryClient = useQueryClient();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingEarnings, setPendingEarnings] = useState(0);
  const [successfulReferrals, setSuccessfulReferrals] = useState(0);

  const { data: sharedJobs } = useQuery({
    queryKey: ["shared-jobs", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referrals")
        .select(`
          *,
          job:jobs(*)
        `)
        .eq("referrer_id", session?.user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: referrals } = useQuery({
    queryKey: ["referrals", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          referral:referrals(*),
          job:jobs(*)
        `)
        .eq("referrals.referrer_id", session?.user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

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

  useEffect(() => {
    if (referrals) {
      const hired = referrals.filter((r) => r.status === "hired");
      const pending = referrals.filter((r) => r.status === "interviewing");
      
      setSuccessfulReferrals(hired.length);
      setTotalEarnings(hired.reduce((acc, r) => acc + (r.job?.referral_bonus || 0), 0));
      setPendingEarnings(pending.reduce((acc, r) => acc + (r.job?.referral_bonus || 0), 0));
    }
  }, [referrals]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "hired":
        return "bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20";
      case "interviewing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="shared-jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="shared-jobs" className="lowercase">shared jobs</TabsTrigger>
          <TabsTrigger value="referrals" className="lowercase">referrals</TabsTrigger>
          <TabsTrigger value="earnings" className="lowercase">earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="shared-jobs">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold lowercase">shared jobs tracking</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>job title</TableHead>
                    <TableHead>company</TableHead>
                    <TableHead>link clicks</TableHead>
                    <TableHead>applicants</TableHead>
                    <TableHead>referral bonus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedJobs?.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>{referral.job?.title}</TableCell>
                      <TableCell>{referral.job?.company}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4 text-gray-500" />
                          {referral.clicks}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          {referrals?.filter((r) => r.referral_id === referral.id).length || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-[#10b981]" />
                          {referral.job?.referral_bonus}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold lowercase">referral status monitoring</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>name</TableHead>
                    <TableHead>job title</TableHead>
                    <TableHead>company</TableHead>
                    <TableHead>applied date</TableHead>
                    <TableHead>status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals?.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.applicant_name}</TableCell>
                      <TableCell>{application.job?.title}</TableCell>
                      <TableCell>{application.job?.company}</TableCell>
                      <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="earnings">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}