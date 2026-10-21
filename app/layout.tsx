import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RedEduca | Educación conectada. Impacto real.',
  description: 'Plataforma integral para la organización y comunicación de las comunidades educativas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${poppins.variable} h-full scroll-smooth antialiased`}>
      <body className={`${poppins.className} min-h-full flex flex-col font-sans bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}