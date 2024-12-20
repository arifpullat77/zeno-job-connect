import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Share2, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const ValuePropositions = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold lowercase">find the perfect fit faster</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>Post jobs with ease</li>
              <li>Leverage networks of trusted professionals</li>
              <li>Pay only when you hire – no upfront fees!</li>
            </ul>
            <Link to="/signup/recruiter" className="block mt-6">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white lowercase">
                post your first job
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold lowercase">turn sharing into earning</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>Share job openings with your network</li>
              <li>Track who applies through your personalized links</li>
              <li>Earn rewards when your referral gets hired</li>
            </ul>
            <Link to="/signup/referrer" className="block mt-6">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white lowercase">
                start earning today!
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold lowercase">your dream job awaits</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>Get discovered through referrals</li>
              <li>Stand out in a competitive hiring market</li>
              <li>Join teams where your skills truly shine</li>
            </ul>
            <Link to="/jobs" className="block mt-6">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white lowercase">
                find jobs now!
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}