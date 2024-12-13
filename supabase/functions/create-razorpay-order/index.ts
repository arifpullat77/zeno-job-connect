import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Razorpay from 'https://esm.sh/razorpay@2.9.2'

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
    const { user_id, plan } = await req.json()
    console.log('Creating order for user:', user_id, 'plan:', plan)
    
    if (!user_id) {
      throw new Error('User ID is required')
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: Deno.env.get('RAZORPAY_KEY_ID'),
      key_secret: Deno.env.get('RAZORPAY_KEY_SECRET'),
    })

    // Create order
    const amount = plan === 'monthly' ? 999 : 9999 // Amount in paise (₹9.99 or ₹99.99)
    const currency = 'INR'
    
    const options = {
      amount,
      currency,
      receipt: `order_${user_id}_${Date.now()}`,
      notes: {
        user_id,
        plan,
      },
    }

    console.log('Creating Razorpay order with options:', options)
    const order = await razorpay.orders.create(options)
    console.log('Razorpay order created:', order)

    return new Response(
      JSON.stringify({ order }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})