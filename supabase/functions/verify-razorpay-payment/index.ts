import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id } = await req.json()
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id) {
      throw new Error('Missing required parameters')
    }

    // Initialize Razorpay
    const Razorpay = await import('https://esm.sh/razorpay@2.9.2')
    const razorpay = new Razorpay.default({
      key_id: Deno.env.get('RAZORPAY_KEY_ID'),
      key_secret: Deno.env.get('RAZORPAY_KEY_SECRET'),
    })

    // Verify signature
    const generated_signature = razorpay.webhooks.verifyPaymentSignature({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature
    })

    if (!generated_signature) {
      throw new Error('Invalid signature')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Update subscription status
    const { error: updateError } = await supabaseClient
      .from('subscriptions')
      .update({ 
        status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user_id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error verifying Razorpay payment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})