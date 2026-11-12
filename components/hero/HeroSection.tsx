import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const HERO_CONFIG = {
  badge: 'Programa Piloto Institucional 2026',
  headline: {
    part1: 'Educación conectada.',
    part2: 'Impacto real.',
  },
  description:
    'RedEduca busca mejorar la organización y la comunicación de las instituciones educativas, promoviendo una comunidad más conectada y facilitando el acceso a la información.',
  ctas: {
    primary: {
      text: 'Quiero que mi institución participe',
      href: '#formulario',
    },
    secondary: {
      text: 'Conocer más',
      href: '#problema',
    },
  },
  images: {
    desktop: '/images/hero/hero-desktop.webp', // 2400x960
    tablet: '/images/hero/hero-tablet.webp', // 1400x820
    mobile: '/images/hero/hero-mobile.webp', // 800x800 (cuadrada)
    alt: 'Docente y estudiantes trabajando juntos con una computadora en un aula',
  },
};

// Breakpoint del diseño superpuesto: xl = 1280px.
// Por debajo: tarjeta arriba e imagen abajo (apilado).

const SECTION_CLASSES = [
  'relative isolate w-full overflow-hidden font-sans',
  'bg-background text-foreground',
  'xl:aspect-[5/2] xl:min-h-[560px] xl:max-h-[780px]',
].join(' ');

// En xl el contenedor "desaparece" (contents) y la tarjeta se ancla a la sección
const STACK_WRAPPER_CLASSES = [
  'mx-auto max-w-7xl px-5 sm:px-8 py-8 sm:py-12 xl:contents',
].join(' ');

const CARD_POSITION_CLASSES = [
  'xl:absolute xl:inset-y-0 xl:left-[3%] xl:flex xl:items-center',
  'xl:w-[34%] 2xl:w-[36%] xl:max-w-[560px]',
].join(' ');

const CARD_CLASSES = [
  'w-full space-y-5 text-left animate-fade-in',
  'xl:rounded-3xl xl:border xl:border-line/60 xl:bg-surface/85',
  'xl:backdrop-blur-md xl:shadow-xl xl:shadow-black/5',
  'xl:p-[clamp(1.25rem,2vw,2rem)]',
].join(' ');

const BADGE_CLASSES = [
  'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5',
  'border border-brand/30 bg-brand/10 text-brand-text',
  'text-xs sm:text-sm font-semibold tracking-wide',
].join(' ');

const TITLE_CLASSES = [
  'text-3xl sm:text-4xl xl:text-[clamp(1.875rem,2.6vw,2.75rem)]',
  'font-extrabold tracking-tight leading-[1.15] text-foreground',
].join(' ');

const DESCRIPTION_CLASSES = [
  'text-base sm:text-[17px] xl:text-[clamp(0.9375rem,1.1vw,1.0625rem)]',
  'leading-relaxed text-muted max-w-prose',
].join(' ');

const CTA_GROUP_CLASSES = [
  'flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-3 pt-2',
].join(' ');

const PRIMARY_CTA_CLASSES = [
  'group inline-flex items-center justify-center gap-2 rounded-xl',
  'w-full sm:w-auto xl:w-full 2xl:w-auto px-6 py-3.5',
  'bg-brand-dark text-white font-bold text-sm sm:text-base text-center',
  'shadow-md transition-colors duration-200 hover:bg-brand-dark/90',
  'active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
].join(' ');

const SECONDARY_CTA_CLASSES = [
  'inline-flex items-center justify-center rounded-xl',
  'w-full sm:w-auto xl:w-full 2xl:w-auto px-5 py-3.5',
  'border border-line bg-surface text-foreground font-semibold',
  'text-sm sm:text-base text-center shadow-xs',
  'transition-colors hover:bg-surface-muted hover:text-navy',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
].join(' ');

const IMAGE_WRAPPER_CLASSES = [
  'mt-7 overflow-hidden rounded-2xl border border-line shadow-md',
  'xl:mt-0 xl:absolute xl:inset-0 xl:-z-10',
  'xl:rounded-none xl:border-0 xl:shadow-none',
].join(' ');

// Móvil: cuadrada (1:1). Tablet (640-1279px): panorámica. Desktop: llena la sección.
const IMAGE_CLASSES = [
  'block w-full aspect-square sm:aspect-[1400/820] object-cover',
  'xl:h-full xl:aspect-auto xl:object-right',
].join(' ');

export default function HeroSection() {
  return (
    <section id="inicio" className={SECTION_CLASSES}>
      <div className={STACK_WRAPPER_CLASSES}>
        {/* TARJETA DE TEXTO */}
        <div className={CARD_POSITION_CLASSES}>
          <div className={CARD_CLASSES}>
            <div className={BADGE_CLASSES}>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>{HERO_CONFIG.badge}</span>
            </div>

            <h1 className={TITLE_CLASSES}>
              <span className="block">{HERO_CONFIG.headline.part1}</span>
              <span className="block text-brand-text">{HERO_CONFIG.headline.part2}</span>
            </h1>

            <p className={DESCRIPTION_CLASSES}>{HERO_CONFIG.description}</p>

            <div className={CTA_GROUP_CLASSES}>
              <Link href={HERO_CONFIG.ctas.primary.href} className={PRIMARY_CTA_CLASSES}>
                <span>{HERO_CONFIG.ctas.primary.text}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link href={HERO_CONFIG.ctas.secondary.href} className={SECONDARY_CTA_CLASSES}>
                {HERO_CONFIG.ctas.secondary.text}
              </Link>
            </div>
          </div>
        </div>

        {/* IMAGEN: un solo <picture>, el navegador baja solo la que corresponde */}
        <div className={IMAGE_WRAPPER_CLASSES}>
          <picture>
            <source media="(min-width: 1280px)" srcSet={HERO_CONFIG.images.desktop} />
            <source media="(min-width: 640px)" srcSet={HERO_CONFIG.images.tablet} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_CONFIG.images.mobile}
              alt={HERO_CONFIG.images.alt}
              width={800}
              height={800}
              fetchPriority="high"
              decoding="async"
              className={IMAGE_CLASSES}
            />
          </picture>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-10 bg-gradient-to-b from-background via-background/40 to-transparent xl:block"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}