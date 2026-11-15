import React from 'react';
import Navbar from './components/navegacion/Navbar';
import HeroSection from './components/hero/HeroSection';
import ProblemSection from './components/problema/ProblemSection';
import PropuestaSection from './components/propuesta/PropuestaSection';
import CommunitySection from './components/comunidad/CommunitySection';
import HowItWorksSection from './components/piloto/HowItWorksSection';
import BannerSection from './components/privacidad/BannerSection';
import PilotFormSection from './components/piloto/PilotFormSection';
import PrivacySection from './components/privacidad/PrivacySection';
import FooterLanding from './components/navegacion/footerLanding';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 1. Navegación principal */}
      <Navbar />

      {/* 2. Sección Hero */}
      <HeroSection />

      {/* 3. Secciones estáticas */}
      <ProblemSection />
      <PropuestaSection />
      <CommunitySection />
      <HowItWorksSection />
      <BannerSection />

      {/* 4. Sección interactiva del formulario piloto */}
      <div id="registro">
        <PilotFormSection />
      </div>

      {/* 5. Privacidad y Footer */}
      <PrivacySection />
      <FooterLanding />
    </main>
  );
}