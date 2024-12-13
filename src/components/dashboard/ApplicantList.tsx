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

// Mock data until we have a backend
const MOCK_APPLICANTS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    jobTitle: "Senior Software Engineer",
    status: "interviewing",
    referrerId: "ref123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    jobTitle: "Product Manager",
    status: "applied",
    referrerId: "ref456",
  },
];

export function ApplicantList() {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-500/10 text-green-500";
      case "interviewing":
        return "bg-yellow-500/10 text-yellow-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-blue-500/10 text-blue-500";
    }
  };

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    // Mock status change until we have a backend
    toast({
      title: "Status Updated",
      description: `Applicant status changed to ${newStatus}`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>job</TableHead>
            <TableHead>status</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_APPLICANTS.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell>{applicant.name}</TableCell>
              <TableCell>{applicant.email}</TableCell>
              <TableCell>{applicant.jobTitle}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(applicant.status)}>
                  {applicant.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(applicant.id, "interviewing")}
                    className="lowercase"
                  >
                    interviewing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(applicant.id, "hired")}
                    className="lowercase"
                  >
                    hired
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(applicant.id, "rejected")}
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
  );
}