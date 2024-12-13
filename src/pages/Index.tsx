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
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#242938]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      <header className="container mx-auto px-4 py-6 relative">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative flex items-center gap-2">
                <Zap className="h-8 w-8 text-[#8B5CF6]" />
                <span className="text-2xl font-bold bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">zeno</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/jobs">
              <Button variant="ghost" className="text-[#D6BCFA] hover:text-white hover:bg-[#8B5CF6]/10 lowercase transition-all duration-300">
                browse jobs
              </Button>
            </Link>
            <Link to="/login/referrer">
              <Button variant="ghost" className="text-[#D6BCFA] hover:text-white hover:bg-[#8B5CF6]/10 lowercase transition-all duration-300">
                referrer login
              </Button>
            </Link>
            <Link to="/login/recruiter">
              <Button variant="ghost" className="text-[#D6BCFA] hover:text-white hover:bg-[#8B5CF6]/10 lowercase transition-all duration-300">
                recruiter login
              </Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="relative">
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