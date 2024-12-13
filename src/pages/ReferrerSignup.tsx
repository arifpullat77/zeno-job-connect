import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ReferrerSignup = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-secondary border-0">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-wider">turn your network into rewards</h1>
          <p className="text-muted-foreground">
            share job opportunities and earn when your referrals succeed.
          </p>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="uppercase text-xs">full name</Label>
            <Input id="name" type="text" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="uppercase text-xs">email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com"
            />
            <p className="text-xs text-muted-foreground">Personal or professional email allowed</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="uppercase text-xs">password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a secure password"
            />
          </div>
          <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black uppercase">
            join as referrer – start earning today
          </Button>
        </form>
        <p className="mt-6 text-xs text-center text-muted-foreground">
          By joining, you accept our{" "}
          <Link to="/terms" className="text-[#10b981] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-[#10b981] hover:underline">
            Privacy Policy
          </Link>
        </p>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login/referrer" className="text-[#10b981] hover:underline">
            sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default ReferrerSignup;