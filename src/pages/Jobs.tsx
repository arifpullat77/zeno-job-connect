import { useQuery } from "@tanstack/react-query";
import { Job } from "@/types";
import { JobCard } from "@/components/JobCard";
import { supabase } from "@/integrations/supabase/client";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Jobs() {
  const isMobile = useIsMobile();
  
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["available-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
  });

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 md:h-8 md:w-8 text-[#10b981]" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold lowercase">available jobs</h1>
        </div>
        <Link to="/dashboard" className="w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto lowercase text-sm md:text-base">
            dashboard
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          Loading jobs...
        </div>
      ) : !jobs?.length ? (
        <div className="text-muted-foreground text-center p-4">
          No jobs available at the moment.
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}