import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function RecruiterSignup() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_UP') {
        const email = session?.user?.email;
        if (email && email.endsWith('@gmail.com')) {
          // Delete the user if they used a Gmail address
          await supabase.auth.signOut();
          toast.error("Please use a corporate email address. Gmail addresses are not allowed.");
          return;
        }
      }
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex items-center gap-2 mb-8">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-[#66D19E]" />
          <span className="text-2xl font-bold lowercase">zeno</span>
        </Link>
      </div>
      <div className="border rounded-lg p-6 md:p-8 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 lowercase">recruiter signup</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            style: {
              input: {
                color: 'white',
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              },
              button: {
                color: 'white',
              },
              anchor: {
                color: 'white',
              },
              label: {
                color: 'white',
              },
            },
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/dashboard`}
          onlyThirdPartyProviders={false}
          view="sign_up"
          additionalData={{
            role: 'recruiter',
            full_name: undefined
          }}
          localization={{
            variables: {
              sign_up: {
                email_label: "Corporate Email",
                email_input_placeholder: "your.name@company.com",
                button_label: "Sign up with corporate email"
              }
            }
          }}
        />
      </div>
    </div>
  );
}