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
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session?.user?.id)
        .single();

      if (error) throw error;

      setSubscription({
        status: data.status,
        trialEnd: data.trial_end,
        isActive: ['trialing', 'active'].includes(data.status)
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast.error('Failed to check subscription status');
    } finally {
      setLoading(false);
    }
  };

  const startFreeTrial = async () => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([
          { user_id: session?.user?.id }
        ]);

      if (error) throw error;

      toast.success('Your free trial has started!');
      checkSubscription();
    } catch (error) {
      console.error('Error starting trial:', error);
      toast.error('Failed to start trial. Please try again.');
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
        <CardContent className="space-y-4">
          <Button onClick={startFreeTrial} className="w-full">
            Start Free Trial
          </Button>
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
        {subscription.status === 'trialing' && (
          <p className="text-sm text-muted-foreground">
            Enjoy your free trial! No payment information required.
          </p>
        )}
      </CardContent>
    </Card>
  );
}