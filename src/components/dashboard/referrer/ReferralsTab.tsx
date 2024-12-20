import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ReferralsTab() {
  const session = useSession();

  const { data: referrals, isError } = useQuery({
    queryKey: ["referrals", session?.user?.id],
    queryFn: async () => {
      console.log("Fetching referrals for user:", session?.user?.id);
      
      const { data: referralData, error: referralError } = await supabase
        .from("referrals")
        .select("id")
        .eq("referrer_id", session?.user?.id);

      if (referralError) {
        console.error("Error fetching referrals:", referralError);
        throw referralError;
      }

      const referralIds = referralData.map(ref => ref.id);
      console.log("Referral IDs for current user:", referralIds);

      if (referralIds.length === 0) {
        console.log("No referrals found for user");
        return [];
      }

      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          referral:referrals(
            *,
            referrer:profiles(
              email,
              full_name
            )
          ),
          job:jobs(
            *,
            recruiter:profiles(
              email,
              full_name
            )
          )
        `)
        .in("referral_id", referralIds);

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }

      console.log("Fetched applications:", data);
      return data;
    },
    enabled: !!session?.user?.id,
  });

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

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load referrals. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
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
              <TableHead>recruiter contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrals?.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.applicant_name}</TableCell>
                <TableCell>{application.job?.title}</TableCell>
                <TableCell>{application.job?.company}</TableCell>
                <TableCell>{new Date(application.created_at!).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(application.status || "")}>
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {application.status === "hired" && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#9b87f5]">
                        Recruiter: {application.job?.recruiter?.email}
                      </p>
                      <Alert 
                        variant="default" 
                        className="bg-[#E5DEFF] border-[#9b87f5]/20 text-[#6E59A5]"
                      >
                        <AlertCircle className="h-4 w-4 text-[#7E69AB]" />
                        <AlertDescription className="text-xs">
                          You can contact the recruiter to avail your referral bonus. At this point we do not handle payment processing. We are working on it.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}