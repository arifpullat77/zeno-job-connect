import { Job } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, DollarSign, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobCardProps {
  job: Job;
  showReferButton?: boolean;
}

export function JobCard({ job, showReferButton = true }: JobCardProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const referralLink = `${window.location.origin}/jobs/${job.id}?ref=${crypto.randomUUID()}`;
    await navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Share this link with potential candidates",
    });
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
                <span className="text-sm font-medium">${job.referralBonus} bonus</span>
              </div>
            </div>
            {showReferButton && (
              <Button onClick={handleShare} variant="outline" size="sm" className="border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10">
                <Share2 className="h-4 w-4 mr-2" />
                Refer
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}