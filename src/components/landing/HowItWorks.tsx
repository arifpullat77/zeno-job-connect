import { Button } from "@/components/ui/button";
import { BriefcaseIcon, Share2, UsersIcon, DollarSignIcon, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  return (
    <div className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
          how it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold lowercase">post a job</h3>
            <p className="text-muted-foreground">Recruiters set a referral reward and publish openings</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold lowercase">share the link</h3>
            <p className="text-muted-foreground">Referrers generate and share trackable links</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold lowercase">get referrals</h3>
            <p className="text-muted-foreground">Applicants apply via shared links, creating transparency</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <DollarSignIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold lowercase">earn rewards</h3>
            <p className="text-muted-foreground">Referrers get paid when their candidate gets hired</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-white lowercase">
            see it in action <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}