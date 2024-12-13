import { ProfileForm } from "@/components/profile/ProfileForm";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-[#10b981]" />
          </Link>
          <h1 className="text-2xl font-bold lowercase">profile settings</h1>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <ProfileForm />
      </div>
    </div>
  );
}