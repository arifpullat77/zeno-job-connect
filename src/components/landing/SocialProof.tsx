import { Card } from "@/components/ui/card";

export const SocialProof = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="relative group inline-block mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
        <h2 className="relative text-3xl font-bold text-center lowercase bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">
          trusted by top recruiters and professionals
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="group bg-[#242938]/50 backdrop-blur-sm border-[#8B5CF6]/20 p-8 hover:border-[#8B5CF6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
          <blockquote className="space-y-4">
            <p className="text-lg text-[#D6BCFA]">"Zeno helped us fill critical roles faster while rewarding our community!"</p>
            <footer className="text-[#D6BCFA]/60">– Sarah M., HR Manager</footer>
          </blockquote>
        </Card>
        <Card className="group bg-[#242938]/50 backdrop-blur-sm border-[#8B5CF6]/20 p-8 hover:border-[#8B5CF6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
          <blockquote className="space-y-4">
            <p className="text-lg text-[#D6BCFA]">"With Zeno, sharing jobs with my network has turned into a rewarding experience."</p>
            <footer className="text-[#D6BCFA]/60">– Raj P., Referrer</footer>
          </blockquote>
        </Card>
      </div>
    </div>
  );
}