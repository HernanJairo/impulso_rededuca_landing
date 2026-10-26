import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

// TODO: título y bajada provisorios. Confirmar con el equipo antes de publicar.
const BANNER_CONFIG = {
  title: 'Sumá a tu institución al piloto de RedEduca',
  description:
    'Buscamos instituciones que quieran probar la plataforma y ayudarnos a darle forma. Completá el formulario y te contamos los próximos pasos.',
  cta: {
    text: 'Postular institución',
    href: '#formulario',
  },
};

const SECTION_CLASSES = [
  'relative isolate w-full overflow-hidden font-sans section-lazy',
  'bg-gradient-to-r from-brand-dark via-brand-dark to-brand',
  'text-white py-14 sm:py-16 lg:py-20',
].join(' ');

// Brillo suave en la esquina derecha (reemplaza al blur-3xl)
const GLOW_CLASSES = [
  'pointer-events-none absolute inset-0 -z-10',
  'bg-[radial-gradient(circle_at_88%_20%,rgba(255,255,255,0.22),transparent_55%)]',
].join(' ');

const CONTAINER_CLASSES = [
  'max-w-7xl mx-auto px-5 sm:px-8 xl:px-12',
  'flex flex-col gap-8 md:flex-row md:items-center md:justify-between',
].join(' ');

const TITLE_CLASSES = [
  'text-3xl sm:text-4xl lg:text-[44px]',
  'font-extrabold tracking-tight leading-[1.2] text-white',
].join(' ');

const CTA_CLASSES = [
  'group inline-flex w-full md:w-auto shrink-0 items-center justify-center gap-3',
  'rounded-2xl bg-white px-8 py-4 text-base sm:text-lg font-bold text-brand-dark',
  'shadow-xl shadow-black/20 transition-colors hover:bg-white/90',
  'active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark',
].join(' ');

export default function BannerSection() {
  return (
    <section aria-labelledby="banner-titulo" className={SECTION_CLASSES}>
      <div className={GLOW_CLASSES} aria-hidden="true" />

      <Reveal direction="scale">
        <div className={CONTAINER_CLASSES}>
          <div className="max-w-2xl space-y-4">
            <h2 id="banner-titulo" className={TITLE_CLASSES}>
              {BANNER_CONFIG.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              {BANNER_CONFIG.description}
            </p>
          </div>

          <a href={BANNER_CONFIG.cta.href} className={CTA_CLASSES}>
            <span>{BANNER_CONFIG.cta.text}</span>
            <ArrowRight
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </Reveal>
    </section>
  );
}