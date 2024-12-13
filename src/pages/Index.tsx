import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { JobList } from "@/components/JobList";
import { HeroSection } from "@/components/landing/HeroSection";
import { SubHeader } from "@/components/landing/SubHeader";
import { ValuePropositions } from "@/components/landing/ValuePropositions";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { ClosingSection } from "@/components/landing/ClosingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold uppercase">zeno</h1>
          <div className="flex gap-8">
            <Link to="/login/recruiter" className="text-foreground/80 hover:text-foreground uppercase">for recruiters</Link>
            <Link to="/login/referrer" className="text-foreground/60 hover:text-foreground uppercase">refer & earn</Link>
          </div>
          <div className="flex gap-4">
            <Link to="/signup/recruiter">
              <Button className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium">
                i'm a recruiter
              </Button>
            </Link>
            <Link to="/signup/referrer">
              <Button className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium">
                i want to refer
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
        <h2 className="text-3xl font-bold text-center mb-16 uppercase">latest opportunities</h2>
        <JobList />
      </div>
    </div>
  );
};

export default Index;