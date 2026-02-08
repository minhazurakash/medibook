import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { SpecializationsSection } from '@/components/landing/SpecializationsSection';
import { TopDoctorsSection } from '@/components/doctors/TopDoctorsSection';
import { CTASection } from '@/components/landing/CTASection';
import { useEffect } from 'react';
import { initializeSampleData } from '@/lib/storage';

const Index = () => {
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <SpecializationsSection />
        <TopDoctorsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
