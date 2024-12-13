import { HeroSection } from "@/components/landing/HeroSection";
import { SubHeader } from "@/components/landing/SubHeader";
import { ValuePropositions } from "@/components/landing/ValuePropositions";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { ClosingSection } from "@/components/landing/ClosingSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, LayoutDashboard, Menu } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function Index() {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-4 md:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 md:h-8 md:w-8 text-[#10b981]" />
            <span className="text-xl md:text-2xl font-bold gradient-text">zeno</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-white" />
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/jobs">
              <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                browse jobs
              </Button>
            </Link>
            {session ? (
              <Link to="/dashboard">
                <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login/referrer">
                  <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                    referrer login
                  </Button>
                </Link>
                <Link to="/login/recruiter">
                  <Button variant="ghost" className="hover:text-[#FF69B4] lowercase text-white">
                    recruiter login
                  </Button>
                </Link>
                <Link to="/signup/recruiter">
                  <Button className="toggl-button lowercase">
                    try for free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-background border-b border-secondary/50 p-4 space-y-2 md:hidden z-50">
              <Link to="/jobs" className="block">
                <Button variant="ghost" className="w-full hover:text-[#FF69B4] lowercase text-white">
                  browse jobs
                </Button>
              </Link>
              {session ? (
                <Link to="/dashboard" className="block">
                  <Button variant="ghost" className="w-full hover:text-[#FF69B4] lowercase text-white">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login/referrer" className="block">
                    <Button variant="ghost" className="w-full hover:text-[#FF69B4] lowercase text-white">
                      referrer login
                    </Button>
                  </Link>
                  <Link to="/login/recruiter" className="block">
                    <Button variant="ghost" className="w-full hover:text-[#FF69B4] lowercase text-white">
                      recruiter login
                    </Button>
                  </Link>
                  <Link to="/signup/recruiter" className="block">
                    <Button className="w-full toggl-button lowercase">
                      try for free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
      <main>
        <HeroSection />
        <SubHeader />
        <ValuePropositions />
        <HowItWorks />
        <SocialProof />
        <ClosingSection />
      </main>
    </div>
  );
}