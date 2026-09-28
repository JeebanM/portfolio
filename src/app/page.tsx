import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoTrailerSection from "@/components/DemoTrailerSection";
import PipelineCanvas from "@/components/PipelineCanvas";
import ProjectsSection from "@/components/ProjectsSection";
import RagBenchSection from "@/components/RagBenchSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AiAssistant from "@/components/AiAssistant";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-16 md:pt-20 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          <HeroSection />
          <DemoTrailerSection />
          <PipelineCanvas />
          <ProjectsSection />
          <RagBenchSection />
          <SkillsSection />
          <ExperienceSection />
          <AiAssistant />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
