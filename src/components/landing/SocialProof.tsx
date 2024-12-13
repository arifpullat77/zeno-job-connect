import { Card } from "@/components/ui/card";

export const SocialProof = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <h2 className="text-4xl font-bold text-center mb-16">
        trusted by <span className="gradient-text">top recruiters</span> and professionals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-secondary/30 backdrop-blur-sm border-secondary">
          <blockquote className="space-y-4">
            <p className="text-lg">"Zeno helped us fill critical roles faster while rewarding our community!"</p>
            <footer className="text-muted-foreground">– Sarah M., HR Manager</footer>
          </blockquote>
        </Card>
        <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-secondary/30 backdrop-blur-sm border-secondary">
          <blockquote className="space-y-4">
            <p className="text-lg">"With Zeno, sharing jobs with my network has turned into a rewarding experience."</p>
            <footer className="text-muted-foreground">– Raj P., Referrer</footer>
          </blockquote>
        </Card>
      </div>
    </div>
  );
}