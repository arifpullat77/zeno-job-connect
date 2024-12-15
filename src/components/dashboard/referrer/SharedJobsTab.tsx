import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Share2, Users, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export function SharedJobsTab() {
  const session = useSession();

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

  return (
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
  );
}