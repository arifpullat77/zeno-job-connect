import { Job } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, DollarSign, Share2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
  showReferButton?: boolean;
}

export function JobCard({ job, showReferButton = true }: JobCardProps) {
  const { toast } = useToast();
  const session = useSession();

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
      // Check if a referral already exists
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

      // Create new referral
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
        <CardTitle className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-foreground/60 text-sm">{job.company}</p>
          </div>
          {job.status === 'open' && (
            <span className="bg-[#10b981]/10 text-[#10b981] text-xs px-2 py-1 rounded-full">
              Open
            </span>
          )}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-foreground/60">
          <MapPin className="h-4 w-4" />
          {job.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-foreground/60 line-clamp-3">{job.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-[#10b981]" />
                <span className="text-sm font-medium">{job.salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-[#10b981]" />
                <span className="text-sm font-medium">${job.referral_bonus} bonus</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/jobs/${job.id}`}>
                <Button variant="outline" size="sm" className="border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10">
                  <Send className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </Link>
              {showReferButton && (
                <Button onClick={handleShare} variant="outline" size="sm" className="border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10">
                  <Share2 className="h-4 w-4 mr-2" />
                  Refer
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}