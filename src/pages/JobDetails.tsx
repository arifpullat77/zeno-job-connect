import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@/types";
import { JobCard } from "@/components/JobCard";
import { ApplicationForm } from "@/components/ApplicationForm";
import { supabase } from "@/integrations/supabase/client";

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

  // Track referral click
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
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">Apply for this position</h2>
          <ApplicationForm jobId={job.id} referralId={referral?.id} />
        </div>
      </div>
    </div>
  );
}