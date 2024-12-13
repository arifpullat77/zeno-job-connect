import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Share2, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const ValuePropositions = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="group bg-[#242938]/50 backdrop-blur-sm border-[#8B5CF6]/20 p-8 hover:border-[#8B5CF6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Building2 className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold lowercase text-[#D6BCFA]">find the perfect fit faster</h3>
            <ul className="space-y-3 text-[#D6BCFA]/60">
              <li>Post jobs with ease</li>
              <li>Leverage networks of trusted professionals</li>
              <li>Pay only when you hire – no upfront fees!</li>
            </ul>
            <Link to="/signup/recruiter">
              <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white lowercase transition-all duration-300 shadow-lg shadow-[#8B5CF6]/25 hover:scale-105">
                post your first job
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="group bg-[#242938]/50 backdrop-blur-sm border-[#8B5CF6]/20 p-8 hover:border-[#8B5CF6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Share2 className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold lowercase text-[#D6BCFA]">turn sharing into earning</h3>
            <ul className="space-y-3 text-[#D6BCFA]/60">
              <li>Share job openings with your network</li>
              <li>Track who applies through your personalized links</li>
              <li>Earn rewards when your referral gets hired</li>
            </ul>
            <Link to="/signup/referrer">
              <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white lowercase transition-all duration-300 shadow-lg shadow-[#8B5CF6]/25 hover:scale-105">
                start earning today!
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="group bg-[#242938]/50 backdrop-blur-sm border-[#8B5CF6]/20 p-8 hover:border-[#8B5CF6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UserCheck className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold lowercase text-[#D6BCFA]">your dream job awaits</h3>
            <ul className="space-y-3 text-[#D6BCFA]/60">
              <li>Get discovered through referrals</li>
              <li>Stand out in a competitive hiring market</li>
              <li>Join teams where your skills truly shine</li>
            </ul>
            <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white lowercase transition-all duration-300 shadow-lg shadow-[#8B5CF6]/25 hover:scale-105">
              find jobs now!
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}