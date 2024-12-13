import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefcaseIcon, DollarSignIcon, UsersIcon, ArrowRight, Building2, Share2, UserCheck } from "lucide-react";
import { JobList } from "@/components/JobList";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold uppercase">Zeno</h1>
          <div className="flex gap-8">
            <Link to="/login/recruiter" className="text-foreground/80 hover:text-foreground uppercase">for recruiters</Link>
            <Link to="/login/referrer" className="text-foreground/60 hover:text-foreground uppercase">refer & earn</Link>
          </div>
          <div className="flex gap-4">
            <Link to="/signup/recruiter">
              <Button className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium">
                I'm a Recruiter
              </Button>
            </Link>
            <Link to="/signup/referrer">
              <Button className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium">
                I Want to Refer
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight uppercase">
            Turn Connections Into Careers – And Rewards
          </h1>
          <p className="text-xl text-foreground/60">
            Empower your network, share opportunities, and earn big when referrals succeed.
          </p>
          <div className="pt-8 flex gap-4 justify-center">
            <Link to="/signup/recruiter">
              <Button size="lg" className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium px-8 py-6 text-lg">
                I'm a Recruiter
              </Button>
            </Link>
            <Link to="/signup/referrer">
              <Button size="lg" className="bg-[#10b981] hover:bg-[#0d9668] text-black font-medium px-8 py-6 text-lg">
                I Want to Refer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Subheader */}
      <div className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">The Smartest Way to Hire and Get Hired</h2>
          <p className="text-xl text-foreground/60">
            Zeno bridges the gap between recruiters and top talent through incentivized referrals. 
            Reward those who bring the right candidates to your team.
          </p>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* For Recruiters */}
          <Card className="bg-secondary border-0 p-8">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="text-2xl font-bold uppercase">Find the Perfect Fit Faster</h3>
              <ul className="space-y-3 text-foreground/60">
                <li>Post jobs with ease</li>
                <li>Leverage networks of trusted professionals</li>
                <li>Pay only when you hire – no upfront fees!</li>
              </ul>
              <Link to="/signup/recruiter">
                <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black">
                  Post Your First Job
                </Button>
              </Link>
            </div>
          </Card>

          {/* For Referrers */}
          <Card className="bg-secondary border-0 p-8">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center">
                <Share2 className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="text-2xl font-bold uppercase">Turn Sharing Into Earning</h3>
              <ul className="space-y-3 text-foreground/60">
                <li>Share job openings with your network</li>
                <li>Track who applies through your personalized links</li>
                <li>Earn rewards when your referral gets hired</li>
              </ul>
              <Link to="/signup/referrer">
                <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black">
                  Start Earning Today!
                </Button>
              </Link>
            </div>
          </Card>

          {/* For Job Seekers */}
          <Card className="bg-secondary border-0 p-8">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="text-2xl font-bold">Your Dream Job Awaits</h3>
              <ul className="space-y-3 text-foreground/60">
                <li>Get discovered through referrals</li>
                <li>Stand out in a competitive hiring market</li>
                <li>Join teams where your skills truly shine</li>
              </ul>
              <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black">
                Find Jobs Now!
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto">
                <BriefcaseIcon className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="font-semibold">Post a Job</h3>
              <p className="text-foreground/60">Recruiters set a referral reward and publish openings</p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto">
                <Share2 className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="font-semibold">Share the Link</h3>
              <p className="text-foreground/60">Referrers generate and share trackable links</p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto">
                <UsersIcon className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="font-semibold">Get Referrals</h3>
              <p className="text-foreground/60">Applicants apply via shared links, creating transparency</p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-12 w-12 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto">
                <DollarSignIcon className="h-6 w-6 text-[#10b981]" />
              </div>
              <h3 className="font-semibold">Earn Rewards</h3>
              <p className="text-foreground/60">Referrers get paid when their candidate gets hired</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button className="bg-[#10b981] hover:bg-[#0d9668] text-black">
              See It in Action <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Trusted by Top Recruiters and Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-secondary border-0 p-8">
            <blockquote className="space-y-4">
              <p className="text-lg">"Zeno helped us fill critical roles faster while rewarding our community!"</p>
              <footer className="text-foreground/60">– Sarah M., HR Manager</footer>
            </blockquote>
          </Card>
          <Card className="bg-secondary border-0 p-8">
            <blockquote className="space-y-4">
              <p className="text-lg">"With Zeno, sharing jobs with my network has turned into a rewarding experience."</p>
              <footer className="text-foreground/60">– Raj P., Referrer</footer>
            </blockquote>
          </Card>
        </div>
      </div>

      {/* Closing Section */}
      <div className="bg-secondary py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Join the Future of Hiring</h2>
          <p className="text-xl text-foreground/60 mb-8">
            Whether you're looking to build the perfect team or turn referrals into rewards, 
            Zeno is the platform for you.
          </p>
          <Button size="lg" className="bg-[#10b981] hover:bg-[#0d9668] text-black px-8 py-6 text-lg">
            Sign Up Now – It's Free!
          </Button>
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-16 uppercase">Latest Opportunities</h2>
        <JobList />
      </div>
    </div>
  );
};

export default Index;
