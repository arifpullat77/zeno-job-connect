export const SubHeader = () => {
  return (
    <div className="bg-[#242938] py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-transparent" />
      <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
        <h2 className="text-3xl font-bold mb-4 lowercase bg-gradient-to-r from-[#D6BCFA] to-[#8B5CF6] text-transparent bg-clip-text">
          the smartest way to hire and get hired
        </h2>
        <p className="text-xl text-[#D6BCFA]/80">
          Zeno bridges the gap between recruiters and top talent through incentivized referrals. 
          Reward those who bring the right candidates to your team.
        </p>
      </div>
    </div>
  );
}