import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function ApplicantList() {
  const { toast } = useToast();
  const session = useSession();
  const [selectedJobId, setSelectedJobId] = useState<string>('all');

  const { data: jobs } = useQuery({
    queryKey: ["recruiter-jobs", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title")
        .eq("recruiter_id", session?.user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications", session?.user?.id, selectedJobId],
    queryFn: async () => {
      const { data: recruiterJobs, error: jobsError } = await supabase
        .from("jobs")
        .select("id")
        .eq("recruiter_id", session?.user?.id);

      if (jobsError) throw jobsError;
      if (!recruiterJobs?.length) return [];

      const jobIds = selectedJobId === 'all' 
        ? recruiterJobs.map(job => job.id)
        : [selectedJobId];
      
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          job:jobs(*),
          referral:referrals(
            *,
            referrer:profiles(
              full_name,
              email
            )
          )
        `)
        .in("job_id", jobIds)
        .order("status", { ascending: false }) // This will put rejected at the bottom
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const handleStatusChange = async (applicantId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", applicantId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Applicant status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadResume = (resumeUrl: string, applicantName: string) => {
    if (!resumeUrl) {
      toast({
        title: "Resume Not Available",
        description: "This applicant has not uploaded a resume.",
        variant: "destructive",
      });
      return;
    }

    window.open(resumeUrl, "_blank");
  };

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

  if (isLoading) {
    return <div>Loading applications...</div>;
  }

  if (!applications?.length) {
    return <div className="text-muted-foreground">No applications found yet.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select
          value={selectedJobId}
          onValueChange={(value) => setSelectedJobId(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobs?.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>job</TableHead>
              <TableHead>referrer</TableHead>
              <TableHead>resume</TableHead>
              <TableHead>status</TableHead>
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.applicant_name}</TableCell>
                <TableCell>{application.applicant_email}</TableCell>
                <TableCell>{application.job?.title}</TableCell>
                <TableCell>
                  {application.referral?.referrer ? (
                    <div className="space-y-1">
                      <div>{application.referral.referrer.full_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {application.referral.referrer.email}
                      </div>
                      {application.status === 'hired' && (
                        <div className="text-sm text-[#10b981]">
                          Contact recruiter at: {application.job?.recruiter?.email}
                          <p className="text-xs text-muted-foreground mt-1">
                            You can contact the recruiter to avail your referral bonus. 
                            At this point we do not handle payment processing. We are working on it.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Direct application</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadResume(application.resume_url || "", application.applicant_name)}
                    className="lowercase"
                  >
                    download pdf
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(application.status || "applied")}>
                    {application.status || "applied"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(application.id, "interviewing")}
                      className="lowercase"
                    >
                      interviewing
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(application.id, "hired")}
                      className="lowercase"
                    >
                      hired
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(application.id, "rejected")}
                      className="lowercase text-destructive"
                    >
                      reject
                    </Button>
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