import Navbar from '../components/navegacion/Navbar';
import FooterLanding from '../components/navegacion/footerLanding';

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full flex flex-col">
      <Navbar />
      <FooterLanding />
    </main>
  );
}