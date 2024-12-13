import { Job } from "@/types";
import { JobCard } from "./JobCard";

// Temporary mock data until we have a backend
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    description: "We're looking for a senior software engineer with 5+ years of experience in React and Node.js...",
    salary: "$150,000 - $200,000",
    referral_bonus: 5000,
    status: "open",
    created_at: new Date().toISOString(),
    recruiter_id: "1"
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    description: "Seeking an experienced product manager to lead our flagship product...",
    salary: "$130,000 - $180,000",
    referral_bonus: 4000,
    status: "open",
    created_at: new Date().toISOString(),
    recruiter_id: "1"
  }
];

export function JobList() {
  return (
    <div className="space-y-4">
      {MOCK_JOBS.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}