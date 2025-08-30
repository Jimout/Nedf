import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import StudioNotesPage from "@/components/StudioNotes";
import { ClientReflections } from "@/components/ClientReflections";
import { TheCrew } from "@/components/TheCrew";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <Portfolio />
        <StudioNotesPage />
        <ClientReflections />
        <TheCrew />
        <Footer />
      </div>
    </>
  );
}