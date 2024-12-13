import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight gradient-text">
          turn connections into careers – and rewards
        </h1>
        <p className="text-xl text-muted-foreground">
          Empower your network, share opportunities, and earn big when referrals succeed.
        </p>
        <div className="pt-8 flex gap-4 justify-center">
          <Link to="/signup/recruiter">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 text-lg lowercase">
              i'm a recruiter
            </Button>
          </Link>
          <Link to="/signup/referrer">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 text-lg lowercase">
              i want to refer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}