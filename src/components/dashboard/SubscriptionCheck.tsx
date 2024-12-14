import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionStatus } from "@/components/subscription/SubscriptionStatus";

interface SubscriptionCheckProps {
  children: React.ReactNode;
}

export function SubscriptionCheck({ children }: SubscriptionCheckProps) {
  const session = useSession();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session?.user?.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If no subscription exists or it's expired/trial ended, show subscription status
  const isSubscriptionInactive = !subscription || 
    subscription.status === 'expired' || 
    (subscription.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) < new Date());

  if (isSubscriptionInactive) {
    return <SubscriptionStatus />;
  }

  return <>{children}</>;
}