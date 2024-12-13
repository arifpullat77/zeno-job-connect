import { useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@/types";
import { JobCard } from "@/components/JobCard";
import { ApplicationForm } from "@/components/ApplicationForm";
import { supabase } from "@/integrations/supabase/client";
import { Share2, DollarSign, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JobDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");

  const { data: job, isLoading: isLoadingJob } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Job;
    },
  });

  const { data: referral } = useQuery({
    queryKey: ["referral", referralCode],
    queryFn: async () => {
      if (!referralCode) return null;

      const { data, error } = await supabase
        .from("referrals")
        .select("*")
        .eq("referral_code", referralCode)
        .single();

      if (error) return null;
      return data;
    },
    enabled: !!referralCode,
  });

  useEffect(() => {
    const trackClick = async () => {
      if (referral?.id) {
        await supabase
          .from("referrals")
          .update({ clicks: (referral.clicks || 0) + 1 })
          .eq("id", referral.id);
      }
    };

    trackClick();
  }, [referral?.id]);

  if (isLoadingJob) {
    return <div className="container mx-auto px-4 py-8">Loading job details...</div>;
  }

  if (!job) {
    return <div className="container mx-auto px-4 py-8">Job not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <JobCard job={job} showReferButton={false} />
        
        {!referralCode && (
          <Card className="bg-secondary border-0">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold lowercase">turn sharing into earning</h3>
                <ul className="space-y-3 text-foreground/60">
                  <li className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-[#10b981]" />
                    Share job openings with your network
                  </li>
                  <li className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-[#10b981]" />
                    Track who applies through your personalized links
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#10b981]" />
                    Earn rewards when your referral gets hired
                  </li>
                </ul>
                <Link to="/signup/referrer">
                  <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black lowercase">
                    start earning today!
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">Apply for this position</h2>
          <ApplicationForm jobId={job.id} referralId={referral?.id} />
        </div>
      </div>
    </div>
  );
}