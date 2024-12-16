import { Button } from "@/components/ui/button";
import { Share2, Send } from "lucide-react";
import { Link } from "react-router-dom";

interface JobActionsProps {
  jobId: string;
  showReferButton: boolean;
  onShare: () => void;
  isMobile: boolean;
}

export function JobActions({ jobId, showReferButton, onShare, isMobile }: JobActionsProps) {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <Link to={`/jobs/${jobId}`} className="flex-1 md:flex-none">
        <Button 
          variant="outline" 
          size={isMobile ? "default" : "sm"} 
          className="w-full md:w-auto border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10"
        >
          <Send className="h-4 w-4 mr-2" />
          Apply/View
        </Button>
      </Link>
      {showReferButton && (
        <Button 
          onClick={onShare} 
          variant="outline" 
          size={isMobile ? "default" : "sm"}
          className="flex-1 md:flex-none w-full md:w-auto border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Refer
        </Button>
      )}
    </div>
  );
}