import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { loadScript } from "@/lib/utils";
import { Lock } from "lucide-react";
import { PricingCards } from "./PricingCards";
import { SubscriptionDetails } from "./SubscriptionDetails";

interface SubscriptionStatus {
  status: string;
  trialEnd: string | null;
  planType?: 'monthly' | 'yearly';
  isActive: boolean;
}

export function SubscriptionStatus() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

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
        planType: data.plan_type,
        isActive: ['trialing', 'active'].includes(data.status)
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast.error('Failed to check subscription status');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (plan: 'monthly' | 'yearly') => {
    try {
      setProcessingPayment(true);

      await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: { user_id: session?.user?.id, plan }
      });

      if (error) throw error;
      if (!data?.order) throw new Error('Failed to create order');

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Zeno",
        description: `${plan === 'monthly' ? 'Monthly' : 'Yearly'} Subscription`,
        order_id: data.order.id,
        handler: async function (response: any) {
          try {
            const { error: verificationError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                user_id: session?.user?.id
              }
            });

            if (verificationError) throw verificationError;

            toast.success('Payment successful! Your subscription is now active.');
            checkSubscription();
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          email: session?.user?.email,
        },
        theme: {
          color: "#10b981"
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initialization failed:', error);
      toast.error('Failed to initialize payment. Please try again.');
    } finally {
      setProcessingPayment(false);
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
      await checkSubscription();
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
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Plan</CardTitle>
            <CardDescription>Select the plan that best fits your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <PricingCards
              onStartTrial={startFreeTrial}
              onSubscribe={handlePayment}
              isProcessingPayment={processingPayment}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (subscription.status === 'expired') {
    return (
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Dashboard Locked
            </CardTitle>
            <CardDescription>
              Your trial period has expired. Please subscribe to continue using the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PricingCards
              onStartTrial={startFreeTrial}
              onSubscribe={handlePayment}
              isProcessingPayment={processingPayment}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SubscriptionDetails 
      status={subscription.status}
      trialEnd={subscription.trialEnd}
      planType={subscription.planType}
    />
  );
}
