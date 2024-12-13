import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/5 to-transparent pointer-events-none" />
      <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in relative">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <h1 className="relative text-5xl md:text-6xl font-bold leading-tight lowercase bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">
            turn connections into careers – and rewards
          </h1>
        </div>
        <p className="text-xl text-[#D6BCFA]/80">
          Empower your network, share opportunities, and earn big when referrals succeed.
        </p>
        <div className="pt-8 flex gap-4 justify-center">
          <Link to="/signup/recruiter">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium px-8 py-6 text-lg lowercase transition-all duration-300 hover:scale-105 shadow-lg shadow-[#8B5CF6]/25">
              i'm a recruiter
            </Button>
          </Link>
          <Link to="/signup/referrer">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium px-8 py-6 text-lg lowercase transition-all duration-300 hover:scale-105 shadow-lg shadow-[#8B5CF6]/25">
              i want to refer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}