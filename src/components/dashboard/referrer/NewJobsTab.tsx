import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Share2, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export function NewJobsTab() {
  const session = useSession();
  const { toast } = useToast();

  const { data: jobs } = useQuery({
    queryKey: ["all-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleShare = async (jobId: string) => {
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please login to share jobs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: existingReferral } = await supabase
        .from("referrals")
        .select("referral_code")
        .eq("job_id", jobId)
        .eq("referrer_id", session.user.id)
        .single();

      if (existingReferral) {
        const referralLink = `${window.location.origin}/jobs/${jobId}?ref=${existingReferral.referral_code}`;
        await navigator.clipboard.writeText(referralLink);
        toast({
          title: "Link copied!",
          description: "Share this link with potential candidates",
        });
        return;
      }

      const referralCode = crypto.randomUUID();
      const { error } = await supabase.from("referrals").insert({
        job_id: jobId,
        referrer_id: session.user.id,
        referral_code: referralCode,
      });

      if (error) throw error;

      const referralLink = `${window.location.origin}/jobs/${jobId}?ref=${referralCode}`;
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link created and copied!",
        description: "Share this link with potential candidates",
      });
    } catch (error) {
      console.error("Error creating referral:", error);
      toast({
        title: "Error",
        description: "Failed to create referral link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold lowercase">new jobs to refer</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>job title</TableHead>
              <TableHead>company</TableHead>
              <TableHead>location</TableHead>
              <TableHead>salary</TableHead>
              <TableHead>referral bonus</TableHead>
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>${job.referral_bonus}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleShare(job.id)}
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Link to={`/jobs/${job.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Job
                      </Button>
                    </Link>
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