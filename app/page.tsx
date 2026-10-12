import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VolumeSection from "@/components/VolumeSection";
import DreamOutcome from "@/components/DreamOutcome";
import HowItWorks from "@/components/HowItWorks";
import NativePublishing from "@/components/NativePublishing";
import BrandBrain from "@/components/BrandBrain";
import ProductSection from "@/components/ProductSection";
import ApprovalModes from "@/components/ApprovalModes";
import Comparison from "@/components/Comparison";
import Roadmap from "@/components/Roadmap";
import EarlyAccess from "@/components/EarlyAccess";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VolumeSection />
        <DreamOutcome />
        <HowItWorks />
        <NativePublishing />
        <BrandBrain />
        <ProductSection />
        <ApprovalModes />
        <Comparison />
        <Roadmap />
        <EarlyAccess />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
