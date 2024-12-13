import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ReferrerLogin = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-secondary border-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Referrer Login</h1>
          <p className="text-foreground/60">Start earning through referrals</p>
        </div>
        <form className="space-y-4">
          <div>
            <Input type="email" placeholder="Email" className="bg-background" />
          </div>
          <div>
            <Input type="password" placeholder="Password" className="bg-background" />
          </div>
          <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-black font-medium">
            Login
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link to="/" className="text-[#10b981] hover:text-[#0d9668]">
            Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ReferrerLogin;