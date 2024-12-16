import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative bg-background min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/3b6c69ce-3891-4dea-a450-adee18785968.png')] bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            turn <span className="gradient-text">connections</span> into careers – and <span className="gradient-text">rewards</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Empower your network, share opportunities, and earn big when referrals succeed.
          </p>
          <div className="pt-6 md:pt-8 flex flex-col md:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link to="/signup/recruiter" className="w-full md:w-auto">
              <Button className="toggl-button text-base md:text-lg lowercase w-full md:w-auto">
                i'm a recruiter
              </Button>
            </Link>
            <Link to="/signup/referrer" className="w-full md:w-auto">
              <Button className="toggl-secondary-button text-base md:text-lg lowercase w-full md:w-auto">
                i want to refer
              </Button>
            </Link>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/Egl-RzWGzbc"
                title="Zeno Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}