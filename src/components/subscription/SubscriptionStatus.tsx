import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { loadScript } from "@/lib/utils";

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

      // Load Razorpay script
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      // Create order
      const { data: { order }, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { user_id: session?.user?.id, plan }
      });

      if (orderError) throw orderError;

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Zeno",
        description: `${plan === 'monthly' ? 'Monthly' : 'Yearly'} Subscription`,
        order_id: order.id,
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
          <Button onClick={() => handlePayment('monthly')} disabled={processingPayment}>
            Start Trial
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
      <CardContent className="space-y-4">
        {!subscription.isActive && (
          <div className="space-y-4">
            <Button 
              onClick={() => handlePayment('monthly')} 
              disabled={processingPayment}
              className="w-full"
            >
              Subscribe Monthly (₹9.99)
            </Button>
            <Button 
              onClick={() => handlePayment('yearly')} 
              disabled={processingPayment}
              className="w-full"
            >
              Subscribe Yearly (₹99.99)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}