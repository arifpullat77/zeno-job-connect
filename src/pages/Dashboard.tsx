import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecruiterDashboard } from "@/components/dashboard/RecruiterDashboard";
import { ReferrerDashboard } from "@/components/dashboard/ReferrerDashboard";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const session = useSession();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!session) {
          navigate('/login/recruiter');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }

        if (profile) {
          setUserRole(profile.role);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please sign in again.",
        });
        handleSignOut();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }

      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        navigate('/login/recruiter');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, session, toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Force navigation to login even if sign out fails
      navigate('/login/recruiter');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-[#10b981]" />
          </Link>
          <h1 className="text-2xl font-bold lowercase">dashboard</h1>
        </div>
        <Button onClick={handleSignOut} variant="outline" className="lowercase">
          sign out
        </Button>
      </div>
      
      {userRole === 'recruiter' ? (
        <RecruiterDashboard />
      ) : userRole === 'referrer' ? (
        <ReferrerDashboard />
      ) : (
        <div>Invalid user role</div>
      )}
    </div>
  );
}