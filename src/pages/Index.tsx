import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefcaseIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { JobList } from "@/components/JobList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Zeno</h1>
          <div className="flex gap-8">
            <a href="#" className="text-foreground/80 hover:text-foreground">for creators</a>
            <a href="#" className="text-foreground/60 hover:text-foreground">for brands</a>
          </div>
          <Button className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium">
            get started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-32">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <p className="text-sm uppercase tracking-wider text-foreground/60">the creator-only club</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            where you're paid<br />
            for <span className="gradient-text">creating</span>
          </h1>
          <div className="pt-8">
            <Button size="lg" className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium px-8 py-6 text-lg">
              get started
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-secondary border-0 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Jobs</h3>
              <p className="text-foreground/60">
                Create detailed job listings with competitive referral rewards
              </p>
            </div>
          </Card>

          <Card className="bg-secondary border-0 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Refer Talent</h3>
              <p className="text-foreground/60">
                Share opportunities and track your referrals easily
              </p>
            </div>
          </Card>

          <Card className="bg-secondary border-0 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mb-4">
                <DollarSignIcon className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-foreground/60">
                Get rewarded when your referrals get hired
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="container mx-auto px-4 py-32">
        <h2 className="text-4xl font-bold text-center mb-16">Latest Opportunities</h2>
        <JobList />
      </div>

      {/* Stats Section */}
      <div className="bg-secondary py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#10b981] mb-2">5000+</div>
              <div className="text-foreground/60">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#10b981] mb-2">10k+</div>
              <div className="text-foreground/60">Successful Referrals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#10b981] mb-2">$2M+</div>
              <div className="text-foreground/60">Rewards Paid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;