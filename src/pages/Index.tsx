import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MatchingSection from "@/components/MatchingSection";
import HousingSection from "@/components/HousingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <MatchingSection />
      <HousingSection />
      <Footer />
    </div>
  );
};

export default Index;