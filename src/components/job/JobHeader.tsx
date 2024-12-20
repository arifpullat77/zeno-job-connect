import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { JobMenu } from "./JobMenu";
import { useSession } from "@supabase/auth-helpers-react";

interface JobHeaderProps {
  title: string;
  company: string;
  location: string;
  status: string;
  jobId: string;
  recruiterId?: string | null;
}

export function JobHeader({ title, company, location, status, jobId, recruiterId }: JobHeaderProps) {
  const session = useSession();
  const isRecruiter = session?.user?.id === recruiterId;

  return (
    <div className="space-y-2">
      <CardTitle className="flex justify-between items-start gap-2">
        <div className="space-y-1">
          <h3 className="text-base md:text-xl font-semibold">{title}</h3>
          <p className="text-foreground/60 text-sm">{company}</p>
        </div>
        <div className="flex items-center gap-2">
          {status === 'open' && (
            <span className="bg-[#10b981]/10 text-[#10b981] text-xs px-2 py-1 rounded-full whitespace-nowrap">
              Open
            </span>
          )}
          {status === 'closed' && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
              Closed
            </span>
          )}
          {isRecruiter && <JobMenu jobId={jobId} status={status} />}
        </div>
      </CardTitle>
      <CardDescription className="flex items-center gap-2 text-foreground/60">
        <MapPin className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm">{location}</span>
      </CardDescription>
    </div>
  );
}