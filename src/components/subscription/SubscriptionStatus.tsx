import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface SubscriptionStatus {
  status: string;
  trialEnd: string | null;
  isActive: boolean;
}

export function SubscriptionStatus() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, [session]);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast.error('Failed to check subscription status');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start subscription process');
    }
  };

  if (loading) {
    return <div>Loading subscription status...</div>;
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Start Your Free Trial</CardTitle>
          <CardDescription>Get 2 months free access to all features</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSubscribe}>Start Trial</Button>
        </CardContent>
      </Card>
    );
  }

  const daysLeft = subscription.trialEnd
    ? Math.ceil((new Date(subscription.trialEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
        <CardDescription>
          {subscription.status === 'trialing' 
            ? `Trial period: ${daysLeft} days remaining`
            : `Status: ${subscription.status}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!subscription.isActive && (
          <Button onClick={handleSubscribe}>
            {subscription.status === 'trialing' ? 'Upgrade Now' : 'Subscribe'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}