import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { JobList } from "@/components/JobList";
import { HeroSection } from "@/components/landing/HeroSection";
import { SubHeader } from "@/components/landing/SubHeader";
import { ValuePropositions } from "@/components/landing/ValuePropositions";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { ClosingSection } from "@/components/landing/ClosingSection";
import { Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-[#10b981]" />
            <h1 className="text-2xl font-bold lowercase">zeno</h1>
          </div>
          <div>
            <Link to="/login/recruiter">
              <Button className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium lowercase">
                login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <HeroSection />
      <SubHeader />
      <ValuePropositions />
      <HowItWorks />
      <SocialProof />
      <ClosingSection />

      {/* Latest Jobs Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-16 lowercase">latest opportunities</h2>
        <JobList />
      </div>
    </div>
  );
};

export default Index;