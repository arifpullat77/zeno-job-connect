import { Button } from "@/components/ui/button";

export const ClosingSection = () => {
  return (
    <div className="bg-secondary py-24">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 lowercase">join the future of hiring</h2>
        <p className="text-xl text-foreground/60 mb-8">
          Whether you're looking to build the perfect team or turn referrals into rewards, 
          Zeno is the platform for you.
        </p>
        <Button size="lg" className="bg-[#10b981] hover:bg-[#0d9668] text-black px-8 py-6 text-lg lowercase">
          sign up now – it's free!
        </Button>
      </div>
    </div>
  );
};