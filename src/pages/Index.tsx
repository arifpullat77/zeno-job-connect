import { HeroSection } from "@/components/landing/HeroSection";
import { SubHeader } from "@/components/landing/SubHeader";
import { ValuePropositions } from "@/components/landing/ValuePropositions";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { ClosingSection } from "@/components/landing/ClosingSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">zeno</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/jobs">
              <Button variant="ghost" className="hover:text-primary lowercase">
                browse jobs
              </Button>
            </Link>
            <Link to="/login/referrer">
              <Button variant="ghost" className="hover:text-primary lowercase">
                referrer login
              </Button>
            </Link>
            <Link to="/login/recruiter">
              <Button variant="ghost" className="hover:text-primary lowercase">
                recruiter login
              </Button>
            </Link>
          </div>
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