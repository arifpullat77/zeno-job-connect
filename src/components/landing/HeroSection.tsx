import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative bg-background min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/3b6c69ce-3891-4dea-a450-adee18785968.png')] bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            turn <span className="gradient-text">connections</span> into careers – and <span className="gradient-text">rewards</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empower your network, share opportunities, and earn big when referrals succeed.
          </p>
          <div className="pt-8 flex gap-4 justify-center">
            <Link to="/signup/recruiter">
              <Button className="toggl-button text-lg lowercase">
                i'm a recruiter
              </Button>
            </Link>
            <Link to="/signup/referrer">
              <Button className="toggl-secondary-button text-lg lowercase">
                i want to refer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}