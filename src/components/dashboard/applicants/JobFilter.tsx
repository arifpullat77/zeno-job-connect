import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
}

interface JobFilterProps {
  jobs?: Job[];
  selectedJob: string;
  onJobSelect: (value: string) => void;
}

export function JobFilter({ jobs, selectedJob, onJobSelect }: JobFilterProps) {
  return (
    <Select value={selectedJob} onValueChange={onJobSelect}>
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
  );
}