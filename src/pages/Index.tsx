import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefcaseIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { JobList } from "@/components/JobList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Talent with Opportunities
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join Zeno - The professional referral platform that rewards you for connecting great talent with amazing opportunities.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Post a Job
            </Button>
            <Button size="lg" variant="outline">
              Browse Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Jobs</h3>
              <p className="text-gray-600">
                Create detailed job listings with competitive referral rewards
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Refer Talent</h3>
              <p className="text-gray-600">
                Share opportunities and track your referrals easily
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <DollarSignIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">
                Get rewarded when your referrals get hired
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Opportunities</h2>
        <JobList />
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-gray-600">Successful Referrals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-gray-600">Rewards Paid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;