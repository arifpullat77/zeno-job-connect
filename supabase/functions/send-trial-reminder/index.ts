import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  try {
    // Get users whose trial is ending in 15 or 2 days
    const now = new Date()
    const fifteenDaysFromNow = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)

    const { data: subscriptions, error } = await supabaseClient
      .from('subscriptions')
      .select('*, profiles(email, full_name)')
      .eq('status', 'trialing')
      .or(`trial_end.eq.${fifteenDaysFromNow.toISOString()},trial_end.eq.${twoDaysFromNow.toISOString()}`)

    if (error) throw error

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'Zeno <onboarding@resend.dev>',
        to: subscriptions.map(sub => sub.profiles.email),
        subject: 'Your trial is ending soon',
        html: `<p>Hello ${subscriptions[0].profiles.full_name},</p>
              <p>Your trial period will end soon. To continue using our service, please upgrade to a paid subscription.</p>
              <p>Thank you for using our platform!</p>`,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to send email')
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending trial reminder:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})