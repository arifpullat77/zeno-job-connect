import { Card } from "@/components/ui/card";

export const SocialProof = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <h2 className="text-3xl font-bold text-center mb-16 lowercase bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">
        trusted by top recruiters and professionals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-[#242938] border-[#8B5CF6]/20 p-8 hover:border-[#8B5CF6]/40 transition-colors duration-300">
          <blockquote className="space-y-4">
            <p className="text-lg text-[#D6BCFA]">"Zeno helped us fill critical roles faster while rewarding our community!"</p>
            <footer className="text-[#D6BCFA]/60">– Sarah M., HR Manager</footer>
          </blockquote>
        </Card>
        <Card className="bg-[#242938] border-[#8B5CF6]/20 p-8 hover:border-[#8B5CF6]/40 transition-colors duration-300">
          <blockquote className="space-y-4">
            <p className="text-lg text-[#D6BCFA]">"With Zeno, sharing jobs with my network has turned into a rewarding experience."</p>
            <footer className="text-[#D6BCFA]/60">– Raj P., Referrer</footer>
          </blockquote>
        </Card>
      </div>
    </div>
  );
}