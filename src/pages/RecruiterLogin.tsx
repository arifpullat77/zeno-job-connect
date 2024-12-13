import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecruiterLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
          <Zap className="h-8 w-8 text-[#10b981]" />
          <span className="text-2xl font-bold lowercase">zeno</span>
        </Link>
      </div>
      <div className="border rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-8 lowercase">recruiter login</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={`${window.location.origin}/dashboard`}
          onlyThirdPartyProviders={false}
          view="sign_in"
        />
      </div>
    </div>
  );
}