"use client";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PriceSection } from "@/components/home/PriceSection";
import { MethodsSection } from "@/components/home/MethodsSection";
import { FAQSection } from "@/components/home/FaqSection";
import { Footer } from "@/components/home/Footer";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { currentTheme } = useTheme();
  
  // Para a página principal, usar o tema selecionado mas manter elementos cyberpunk
  const homeBackground = currentTheme.dashboard.background;

  return (
    <div className={`${homeBackground} min-h-screen`}>
      <HeroSection/>
      <FeaturesSection/>
      <PriceSection/>
      <MethodsSection/>
      <FAQSection/>
      <Footer/>
    </div>
  );
}
