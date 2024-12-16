import { DollarSign } from "lucide-react";

interface JobMetricsProps {
  salary: string;
  referralBonus: number;
}

export function JobMetrics({ salary, referralBonus }: JobMetricsProps) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4 text-[#10b981]" />
        <span className="text-sm font-medium">Salary ${salary}</span>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4 text-[#10b981]" />
        <span className="text-sm font-medium">Referral bonus ${referralBonus}</span>
      </div>
    </div>
  );
}