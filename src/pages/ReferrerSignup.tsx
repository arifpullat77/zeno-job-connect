import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ReferrerSignup = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-secondary border-0">
        <h1 className="text-2xl font-bold mb-6 uppercase">Start Earning With Referrals</h1>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
            <Input id="linkedin" type="url" />
          </div>
          <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black">
            Start Earning
          </Button>
        </form>
        <p className="mt-4 text-sm text-foreground/60 text-center">
          Already have an account?{" "}
          <Link to="/login/referrer" className="text-[#10b981] hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default ReferrerSignup;