import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecruiterDashboard } from "@/components/dashboard/RecruiterDashboard";
import { ReferrerDashboard } from "@/components/dashboard/ReferrerDashboard";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { SubscriptionStatus } from "@/components/subscription/SubscriptionStatus";

export default function Dashboard() {
  const navigate = useNavigate();
  const session = useSession();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!session) {
        navigate('/login/recruiter');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        setUserRole(profile.role);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate, session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
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

      <div className="mb-8">
        <SubscriptionStatus />
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