import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function Privacy() {
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
          <h1 className="text-2xl font-bold mb-6 lowercase">privacy policy</h1>
          
          <div className="prose prose-invert">
            <p className="mb-4">Last updated: March 15, 2024</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 lowercase">1. information we collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact information</li>
                <li>Professional experience and qualifications</li>
                <li>Job preferences and interests</li>
                <li>Communication history within our platform</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 lowercase">2. how we use your information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Facilitate job connections and referrals</li>
                <li>Improve our services</li>
                <li>Communicate with you about opportunities</li>
                <li>Ensure platform security</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 lowercase">3. data protection</h2>
              <p>We implement appropriate security measures to protect your personal information and maintain data privacy standards.</p>
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