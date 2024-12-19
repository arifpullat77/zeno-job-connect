import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApplicationStatusSelectProps {
  status: string;
  onStatusChange: (value: string) => void;
}

export function ApplicationStatusSelect({ status, onStatusChange }: ApplicationStatusSelectProps) {
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
    <Select value={status || ""} onValueChange={onStatusChange}>
      <SelectTrigger className={`w-[130px] ${getStatusColor(status || "")}`}>
        <SelectValue>{status}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="applied">applied</SelectItem>
        <SelectItem value="interviewing">interviewing</SelectItem>
        <SelectItem value="hired">hired</SelectItem>
        <SelectItem value="rejected">rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}