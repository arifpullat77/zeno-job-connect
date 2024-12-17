import { Job } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { JobHeader } from "./job/JobHeader";
import { JobDescription } from "./job/JobDescription";
import { JobMetrics } from "./job/JobMetrics";
import { JobActions } from "./job/JobActions";

interface JobCardProps {
  job: Job;
  showReferButton?: boolean;
}

export function JobCard({ job, showReferButton = true }: JobCardProps) {
  const { toast } = useToast();
  const session = useSession();
  const isMobile = useIsMobile();

  const handleShare = async () => {
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please login as a referrer to share jobs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: existingReferral } = await supabase
        .from("referrals")
        .select("referral_code")
        .eq("job_id", job.id)
        .eq("referrer_id", session.user.id)
        .single();

      if (existingReferral) {
        const referralLink = `${window.location.origin}/jobs/${job.id}?ref=${existingReferral.referral_code}`;
        await navigator.clipboard.writeText(referralLink);
        toast({
          title: "Link copied!",
          description: "Share this link with potential candidates",
        });
        return;
      }

      const referralCode = crypto.randomUUID();
      const { error } = await supabase.from("referrals").insert({
        job_id: job.id,
        referrer_id: session.user.id,
        referral_code: referralCode,
      });

      if (error) throw error;

      const referralLink = `${window.location.origin}/jobs/${job.id}?ref=${referralCode}`;
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
    <Card className="w-full hover:shadow-lg transition-shadow bg-secondary border-0">
      <CardHeader>
        <JobHeader 
          title={job.title}
          company={job.company}
          location={job.location}
          status={job.status}
          jobId={job.id}
          recruiterId={job.recruiter_id}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <JobDescription description={job.description} />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <JobMetrics salary={job.salary} referralBonus={job.referral_bonus} />
            <JobActions 
              jobId={job.id}
              showReferButton={showReferButton}
              onShare={handleShare}
              isMobile={isMobile}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}