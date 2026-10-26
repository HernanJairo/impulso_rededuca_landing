import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  // Respaldo si Poppins no carga. Next.js además ajusta las métricas del
  // respaldo para que el texto no "salte" al cambiar (protege el CLS).
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://red-impulso-grupo1.vercel.app';
const SITE_NAME = 'RedEduca';
const SITE_DESCRIPTION =
  'Plataforma integral para la organización y comunicación de las comunidades educativas.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RedEduca | Educación conectada. Impacto real.',
    template: '%s | RedEduca',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: '/',
    siteName: SITE_NAME,
    title: 'RedEduca | Educación conectada. Impacto real.',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RedEduca | Educación conectada. Impacto real.',
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1014' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning SOLO en <html>: next-themes pone la clase "dark"
    // antes de que React hidrate y, sin esto, React avisaría de una diferencia.
    <html lang="es" className={poppins.variable} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}