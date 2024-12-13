import { Button } from "@/components/ui/button";

export const ClosingSection = () => {
  return (
    <div className="bg-secondary/30 backdrop-blur-sm py-24">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">
          join the <span className="gradient-text">future</span> of hiring
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Whether you're looking to build the perfect team or turn referrals into rewards, 
          Zeno is the platform for you.
        </p>
        <Button className="toggl-button text-lg lowercase">
          sign up now – it's free!
        </Button>
      </div>
    </div>
  );
}