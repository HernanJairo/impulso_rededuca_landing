import Navbar from '../components/navegacion/Navbar';
import HeroSection from '../components/hero/HeroSection';
import ProblemSection from '../components/problema/ProblemSection';
import FooterLanding from '../components/navegacion/footerLanding';
import PropuestaSection from '@/components/propuesta/PropuestaSection';
import FormularioSection from '@/components/formulario/FormularioSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full flex flex-col">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <PropuestaSection />
      <FormularioSection />
      <FooterLanding />
    </main>
  );
}