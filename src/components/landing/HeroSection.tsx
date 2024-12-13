import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-24 relative">
      <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight lowercase bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">
          turn connections into careers – and rewards
        </h1>
        <p className="text-xl text-[#D6BCFA]/80">
          Empower your network, share opportunities, and earn big when referrals succeed.
        </p>
        <div className="pt-8 flex gap-4 justify-center">
          <Link to="/signup/recruiter">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium px-8 py-6 text-lg lowercase transition-all duration-300 hover:scale-105">
              i'm a recruiter
            </Button>
          </Link>
          <Link to="/signup/referrer">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium px-8 py-6 text-lg lowercase transition-all duration-300 hover:scale-105">
              i want to refer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}