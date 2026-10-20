import Navbar from '../components/navegacion/Navbar';
import HeroSection from '../components/hero/HeroSection';
import ProblemSection from '../components/problema/ProblemSection';
import FooterLanding from '../components/navegacion/footerLanding';

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full flex flex-col">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FooterLanding />
    </main>
  );
}