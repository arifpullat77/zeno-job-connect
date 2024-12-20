import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ApplicationsTable } from "./applicants/ApplicationsTable";
import { JobFilter } from "./applicants/JobFilter";

export function ApplicantList() {
  const session = useSession();
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications, isLoading: isLoadingApplications } = useQuery({
    queryKey: ["applications", session?.user?.id],
    queryFn: async () => {
      console.log("Fetching applications for recruiter:", session?.user?.id);
      
      // First, get all jobs created by this recruiter
      const { data: recruiterJobs, error: jobsError } = await supabase
        .from("jobs")
        .select("id")
        .eq("recruiter_id", session?.user?.id);

      if (jobsError) {
        console.error("Error fetching recruiter jobs:", jobsError);
        throw jobsError;
      }

      if (!recruiterJobs?.length) {
        console.log("No jobs found for recruiter");
        return [];
      }

      const jobIds = recruiterJobs.map(job => job.id);
      console.log("Recruiter job IDs:", jobIds);

      // Then fetch applications only for these jobs
      const { data: applications, error: applicationsError } = await supabase
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
        .in("job_id", jobIds);

      if (applicationsError) {
        console.error("Error fetching applications:", applicationsError);
        throw applicationsError;
      }
      
      console.log("Fetched applications:", applications);
      
      return applications?.sort((a, b) => {
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

      queryClient.invalidateQueries({ queryKey: ["applications"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update application status",
      });
    }
  };

  if (isLoadingApplications) {
    return <div>Loading applications...</div>;
  }

  const filteredApplications = applications?.filter(
    (application) => selectedJob === "all" || application.job_id === selectedJob
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold lowercase">applicant tracking</h2>
        <JobFilter
          jobs={jobs}
          selectedJob={selectedJob}
          onJobSelect={setSelectedJob}
        />
      </div>
      <div className="rounded-md border">
        <ApplicationsTable
          applications={filteredApplications || []}
          onStatusChange={updateApplicationStatus}
        />
      </div>
    </div>
  );
}