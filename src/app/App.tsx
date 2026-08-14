import { HeroSection } from "./components/HeroSection";
import { BentoGrid } from "./components/BentoGrid";
import { DemoSlider } from "./components/DemoSlider";
import { CTASection } from "./components/CTASection";

export default function App() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-['Inter',sans-serif]">
      <HeroSection onJoinWaitlist={scrollToWaitlist} />
      <BentoGrid />
      <DemoSlider />
      <CTASection />
    </div>
  );
}
