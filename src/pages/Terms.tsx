import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-[#10b981]" />
          <span className="text-xl font-bold gradient-text">zeno</span>
        </Link>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 lowercase">terms of service</h1>
          
          <div className="prose prose-invert">
            <p className="mb-4">Last updated: March 15, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 lowercase">1. acceptance of terms</h2>
              <p>By accessing and using Zeno's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 lowercase">2. use of services</h2>
              <p>Our services are designed to connect job seekers with opportunities through referrals. Users must provide accurate information and maintain the confidentiality of their account credentials.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 lowercase">3. user responsibilities</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Maintain accurate profile information</li>
                <li>Use the platform ethically and professionally</li>
                <li>Respect the privacy of other users</li>
                <li>Not engage in fraudulent activities</li>
              </ul>
            </section>
            
            <div className="mt-8">
              <Link to="/">
                <Button variant="outline" className="lowercase">
                  return home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}