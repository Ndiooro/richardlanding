import { HeroSection } from "./components/HeroSection";
import { BentoGrid } from "./components/BentoGrid";
import { DemoSlider } from "./components/DemoSlider";
import { CTASection } from "./components/CTASection";
import { IntroVideo } from "./components/IntroVideo";
import { useState } from "react";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-['Inter',sans-serif]">
      {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />}
      <HeroSection onJoinWaitlist={scrollToWaitlist} />
      <BentoGrid />
      <DemoSlider />
      <CTASection />
    </div>
  );
}
