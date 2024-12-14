import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CheckCircle } from "lucide-react";

interface SubscriptionDetailsProps {
  status: string;
  trialEnd?: string | null;
  planType?: 'monthly' | 'yearly';
}

export function SubscriptionDetails({ status, trialEnd, planType }: SubscriptionDetailsProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = Math.abs(end.getTime() - now.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (status === 'trialing' && trialEnd) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Trial Period Active
          </CardTitle>
          <CardDescription>
            Your free trial ends on {formatDate(trialEnd)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {getDaysRemaining(trialEnd)} days remaining in your trial
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === 'active') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Active Subscription
          </CardTitle>
          <CardDescription>
            {planType === 'monthly' ? 'Monthly Plan' : 'Annual Plan'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your subscription is active and will automatically renew
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
}