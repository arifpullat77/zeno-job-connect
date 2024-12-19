import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ApplicationStatusSelect } from "./ApplicationStatusSelect";

interface Application {
  id: string;
  applicant_name: string;
  applicant_email: string;
  phone_number?: string;
  location?: string;
  resume_url?: string;
  status: string;
  created_at: string;
  job?: { title: string };
  referral?: Array<{ referrer?: { email?: string } }>;
}

interface ApplicationsTableProps {
  applications: Application[];
  onStatusChange: (applicationId: string, newStatus: string) => void;
}

export function ApplicationsTable({ applications, onStatusChange }: ApplicationsTableProps) {
  const getReferrerEmail = (application: Application) => {
    if (application.referral?.[0]?.referrer?.email) {
      return application.referral[0].referrer.email;
    }
    return "Direct Application";
  };

  return (
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
        {applications?.map((application) => (
          <TableRow key={application.id}>
            <TableCell>{application.applicant_name}</TableCell>
            <TableCell>{application.applicant_email}</TableCell>
            <TableCell>{application.phone_number || "N/A"}</TableCell>
            <TableCell>{application.location || "N/A"}</TableCell>
            <TableCell>{application.job?.title}</TableCell>
            <TableCell>{getReferrerEmail(application)}</TableCell>
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
            <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <ApplicationStatusSelect
                status={application.status}
                onStatusChange={(value) => onStatusChange(application.id, value)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}