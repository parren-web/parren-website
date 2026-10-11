import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Vision from "@/components/Vision";
import EarlyAccess from "@/components/EarlyAccess";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Vision />
        <EarlyAccess />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
