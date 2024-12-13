import { Button } from "@/components/ui/button";
import { BriefcaseIcon, Share2, UsersIcon, DollarSignIcon, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  return (
    <div className="bg-[#242938] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/10 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-16 lowercase bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">
          how it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto">
              <BriefcaseIcon className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="font-semibold lowercase text-[#D6BCFA]">post a job</h3>
            <p className="text-[#D6BCFA]/60">Recruiters set a referral reward and publish openings</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto">
              <Share2 className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="font-semibold lowercase text-[#D6BCFA]">share the link</h3>
            <p className="text-[#D6BCFA]/60">Referrers generate and share trackable links</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto">
              <UsersIcon className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="font-semibold lowercase text-[#D6BCFA]">get referrals</h3>
            <p className="text-[#D6BCFA]/60">Applicants apply via shared links, creating transparency</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-12 w-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto">
              <DollarSignIcon className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <h3 className="font-semibold lowercase text-[#D6BCFA]">earn rewards</h3>
            <p className="text-[#D6BCFA]/60">Referrers get paid when their candidate gets hired</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white lowercase transition-all duration-300 hover:scale-105">
            see it in action <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}