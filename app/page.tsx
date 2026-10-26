import Navbar from '@/components/navegacion/Navbar';
import FooterLanding from '@/components/navegacion/footerLanding';
import HeroSection from '@/components/hero/HeroSection';
import ProblemSection from '@/components/problema/ProblemSection';
import PropuestaSection from '@/components/propuesta/PropuestaSection';
import CommunitySection from '@/components/comunidad/CommunitySection';
import HowItWorksSection from '@/components/piloto/HowItWorksSection';
import BannerSection from '@/components/privacidad/BannerSection';
import PrivacySection from '@/components/privacidad/PrivacySection';
import FormularioSection from '@/components/formulario/FormularioSection';

/**
 * Orden de la landing (coincide con el menú del Navbar):
 * Hero → Problema → Propuesta → Comunidad → Piloto → Banner → Privacidad → Formulario
 *
 * El Banner va antes de Privacidad y Formulario porque su botón lleva a #formulario.
 * Navbar y Footer quedan FUERA de <main>: son puntos de referencia propios para
 * lectores de pantalla (banner y contentinfo).
 */
export default function Home() {
  return (
    <>
      {/* Enlace de accesibilidad: visible solo al navegar con teclado */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#0F766E] focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido" tabIndex={-1} className="w-full flex-1 focus:outline-none">
        <HeroSection />
        <ProblemSection />
        <PropuestaSection />
        <CommunitySection />
        <HowItWorksSection />
        <BannerSection />
        <PrivacySection />
        <FormularioSection />
      </main>

      <FooterLanding />
    </>
  );
}