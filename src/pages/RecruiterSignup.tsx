import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const RecruiterSignup = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-secondary border-0">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-wider">find talent that fits – faster</h1>
          <p className="text-muted-foreground">
            post jobs, leverage networks, and reward referrals only when you hire.
          </p>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="uppercase text-xs">full name</Label>
            <Input id="name" type="text" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="uppercase text-xs">corporate email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@yourcompany.com"
            />
            <p className="text-xs text-muted-foreground">Only company domains allowed</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="uppercase text-xs">company name</Label>
            <Input id="company" type="text" placeholder="Acme Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="uppercase text-xs">job title</Label>
            <Input 
              id="jobTitle" 
              type="text" 
              placeholder="HR Manager, Recruiter"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="uppercase text-xs">password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a strong password"
            />
          </div>
          <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black uppercase">
            sign up as recruiter – start hiring now
          </Button>
        </form>
        <p className="mt-6 text-xs text-center text-muted-foreground">
          By signing up, you agree to our{" "}
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
          <Link to="/login/recruiter" className="text-[#10b981] hover:underline">
            sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RecruiterSignup;