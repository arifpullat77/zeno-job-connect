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
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session?.user?.id)
        .maybeSingle();
      
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isSubscriptionInactive = !subscription || 
    subscription.status === 'expired' || 
    (subscription.status === 'trialing' && subscription.trial_end && new Date(subscription.trial_end) < new Date());

  if (isSubscriptionInactive) {
    return <SubscriptionStatus />;
  }

  return <>{children}</>;
}