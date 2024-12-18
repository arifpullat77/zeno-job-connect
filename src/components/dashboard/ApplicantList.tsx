import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApplicantList() {
  const session = useSession();
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications } = useQuery({
    queryKey: ["applications", session?.user?.id],
    queryFn: async () => {
      console.log("Fetching applications for user:", session?.user?.id);
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
        .eq("job.recruiter_id", session?.user?.id);

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }
      
      console.log("Fetched applications:", data);
      
      // Sort applications to move rejected ones to the bottom
      return data?.sort((a, b) => {
        if (a.status === "rejected" && b.status !== "rejected") return 1;
        if (a.status !== "rejected" && b.status === "rejected") return -1;
        return 0;
      });
    },
    enabled: !!session?.user?.id,
  });

  const { data: jobs } = useQuery({
    queryKey: ["recruiter-jobs", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("recruiter_id", session?.user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", applicationId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Application status has been updated to ${newStatus}`,
      });

      // Invalidate the applications query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update application status",
      });
    }
  };

  const filteredApplications = applications?.filter(
    (application) => selectedJob === "all" || application.job_id === selectedJob
  );

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold lowercase">applicant tracking</h2>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
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
              <TableHead>phone</TableHead>
              <TableHead>location</TableHead>
              <TableHead>job title</TableHead>
              <TableHead>referrer</TableHead>
              <TableHead>resume</TableHead>
              <TableHead>applied date</TableHead>
              <TableHead>status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications?.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.applicant_name}</TableCell>
                <TableCell>{application.applicant_email}</TableCell>
                <TableCell>{application.phone_number || "N/A"}</TableCell>
                <TableCell>{application.location || "N/A"}</TableCell>
                <TableCell>{application.job?.title}</TableCell>
                <TableCell>
                  {application.referral?.[0]?.referrer?.email || "Direct Application"}
                </TableCell>
                <TableCell>
                  {application.resume_url ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(application.resume_url, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      View
                    </Button>
                  ) : (
                    "No resume"
                  )}
                </TableCell>
                <TableCell>{new Date(application.created_at!).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Select
                    value={application.status || ""}
                    onValueChange={(value) => updateApplicationStatus(application.id, value)}
                  >
                    <SelectTrigger className={`w-[130px] ${getStatusColor(application.status || "")}`}>
                      <SelectValue>{application.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">applied</SelectItem>
                      <SelectItem value="interviewing">interviewing</SelectItem>
                      <SelectItem value="hired">hired</SelectItem>
                      <SelectItem value="rejected">rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}