import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function RecruiterLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Fetch the user's profile to check their role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'recruiter') {
          navigate("/dashboard");
        } else {
          // Wrong role - sign out and show error
          await supabase.auth.signOut();
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "This login is only for recruiters. Please use the recruiter account or sign up as a recruiter.",
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

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
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Are you a referrer? <Link to="/login/referrer" className="text-primary hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
}