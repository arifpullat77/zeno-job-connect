interface JobMetricsProps {
  salary: string;
  referralBonus: number;
}

export function JobMetrics({ salary, referralBonus }: JobMetricsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Salary:</span>
        <span className="font-medium">${salary}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Referral bonus:</span>
        <span className="font-medium">${referralBonus}</span>
      </div>
    </div>
  );
}