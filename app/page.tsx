import { Hero, Nav } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Notifications } from "@/components/Notifications";
import { Calibration } from "@/components/Calibration";
import { VideoSection } from "@/components/VideoSection";
import { Team } from "@/components/Team";
import { AppShowcase, Contact, Features, Plants, Screens, Ticker } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <VideoSection />
        <HowItWorks />
        <Notifications />
        <Ticker />
        <Features />
        <Calibration />
        <AppShowcase />
        <Screens />
        <Plants />
        <Team />
        <Contact />
      </main>
    </>
  );
}
