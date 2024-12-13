import { useQuery } from "@tanstack/react-query";
import { Job } from "@/types";
import { JobCard } from "./JobCard";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export function JobList() {
  const session = useSession();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("recruiter_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
    enabled: !!session?.user?.id,
  });

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (!jobs?.length) {
    return <div className="text-muted-foreground">No jobs found. Post your first job to get started!</div>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}