import { Button } from "@/components/ui/button";

export const ClosingSection = () => {
  return (
    <div className="bg-[#242938] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/10 to-transparent" />
      <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
        <div className="relative group inline-block mb-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <h2 className="relative text-3xl font-bold lowercase bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">
            join the future of hiring
          </h2>
        </div>
        <p className="text-xl text-[#D6BCFA]/80 mb-8">
          Whether you're looking to build the perfect team or turn referrals into rewards, 
          Zeno is the platform for you.
        </p>
        <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-6 text-lg lowercase transition-all duration-300 hover:scale-105 shadow-lg shadow-[#8B5CF6]/25">
          sign up now – it's free!
        </Button>
      </div>
    </div>
  );
}