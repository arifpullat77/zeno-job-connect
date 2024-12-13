import { useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@/types";
import { JobCard } from "@/components/JobCard";
import { ApplicationForm } from "@/components/ApplicationForm";
import { supabase } from "@/integrations/supabase/client";
import { Share2, DollarSign, UserCheck, Zap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@supabase/auth-helpers-react";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");
  const session = useSession();

  const { data: job, isLoading: isLoadingJob } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      if (!id) throw new Error("Job ID is required");
      
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Job;
    },
    enabled: !!id,
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
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <Zap className="h-6 w-6 md:h-8 md:w-8 text-[#10b981]" />
                <span className="text-xl md:text-2xl font-bold gradient-text">zeno</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Link to="/jobs">
                <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                  browse jobs
                </Button>
              </Link>
              {session ? (
                <Link to="/dashboard">
                  <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                    dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login/referrer">
                    <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                      referrer login
                    </Button>
                  </Link>
                  <Link to="/login/recruiter">
                    <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                      recruiter login
                    </Button>
                  </Link>
                  <Link to="/signup/recruiter">
                    <Button className="toggl-button lowercase">
                      try for free
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <Button variant="ghost" className="md:hidden p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <JobCard job={job} showReferButton={false} />
          
          {!referralCode && (
            <Card className="bg-secondary border-0">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold lowercase">turn sharing into earning</h3>
                  <p className="text-muted-foreground">Share this job with your network and earn rewards when your referrals get hired!</p>
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
                      Earn ${job.referral_bonus} when your referral gets hired
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
            <h2 className="text-xl font-semibold mb-6 lowercase">apply for this position</h2>
            <ApplicationForm jobId={job.id} referralId={referral?.id} />
          </div>
        </div>
      </div>
    </div>
  );
}