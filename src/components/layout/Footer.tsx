import { Link } from "react-router-dom";
import { Zap, FileText, Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="container mx-auto px-4 py-8 mt-16 border-t border-secondary/50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-[#10b981]" />
          <span className="text-xl font-bold gradient-text">zeno</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/terms" className="hover:text-foreground transition-colors lowercase flex items-center gap-1">
            <FileText className="h-4 w-4" />
            terms of service
          </Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors lowercase flex items-center gap-1">
            <Shield className="h-4 w-4" />
            privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}