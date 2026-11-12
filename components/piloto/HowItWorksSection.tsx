'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Headphones, Wrench, Rocket, GraduationCap } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const PILOTO_CONFIG = {
  titleMain: 'Cómo funciona el piloto',
  intro:
    'Un proceso de cuatro etapas que se ajusta a lo que necesita cada institución.',
  // TODO: copy provisorio. Validar con el equipo que las etapas y sus
  // descripciones reflejen el proceso real del piloto.
  pasos: [
    {
      id: 'escuchar',
      icon: Headphones,
      title: 'Escuchar',
      description:
        'Conocemos las necesidades de tu institución, los canales que usa hoy y las dificultades del día a día.',
    },
    {
      id: 'construir',
      icon: Wrench,
      title: 'Construir',
      description:
        'Configuramos RedEduca para que se ajuste a la forma de trabajar de tu comunidad escolar.',
    },
    {
      id: 'implementar',
      icon: Rocket,
      title: 'Implementar',
      description:
        'Ponemos en marcha la plataforma de forma guiada, junto a directivos, docentes y familias.',
    },
    {
      id: 'aprender',
      icon: GraduationCap,
      title: 'Aprender',
      description:
        'Revisamos juntos cómo resultó la experiencia y ajustamos lo que haga falta.',
    },
  ],
};

const SECTION_CLASSES = [
  'w-full font-sans section-lazy',
  'bg-background text-foreground',
  'py-16 sm:py-20 lg:py-24',
].join(' ');

const TITLE_CLASSES = [
  'text-3xl sm:text-4xl lg:text-[44px]',
  'font-extrabold tracking-tight text-foreground leading-[1.2]',
].join(' ');

// La línea: vertical a la izquierda en móvil, horizontal sobre los nodos desde lg.
// Los nodos miden 40px (h-10), por eso el centro está a 19-20px del borde.
const TRACK_CLASSES = [
  'pointer-events-none absolute bg-line',
  'left-[19px] top-5 bottom-5 w-0.5',
  'lg:left-[12.5%] lg:right-[12.5%] lg:top-[19px] lg:bottom-auto lg:h-0.5 lg:w-auto',
].join(' ');

// Solo se anima transform (scaleY / scaleX), nunca width ni height
const FILL_CLASSES = [
  'block h-full w-full bg-brand origin-top',
  '[transform:scaleY(var(--progress,0))]',
  'lg:origin-left lg:[transform:scaleX(var(--progress,0))]',
].join(' ');

const LIST_CLASSES = 'relative z-10 grid grid-cols-1 lg:grid-cols-4';

const ITEM_CLASSES = [
  'relative pl-16 pb-10 last:pb-0',
  'lg:pl-0 lg:pb-0 lg:px-4 lg:text-center',
].join(' ');

const NODE_BASE = [
  'absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center',
  'rounded-full border-2 transition-colors duration-300',
  'lg:static lg:mx-auto lg:mb-5',
].join(' ');

const NODE_ACTIVE = 'border-brand bg-brand text-white';
const NODE_INACTIVE = 'border-line bg-background text-muted';
export default function HowItWorksSection() {
  const { pasos } = PILOTO_CONFIG;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(1);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const total = pasos.length;

    const apply = (progress: number) => {
      wrapper.style.setProperty('--progress', progress.toFixed(3));
      // El paso i se enciende cuando el trazo llega a i / (total - 1)
      const count = Math.floor(progress * (total - 1) + 0.0001) + 1;
      setActiveCount(Math.max(1, Math.min(total, count)));
    };

    // Con movimiento reducido: la línea aparece completa, sin escuchar el scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply(1);
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      // En desktop la línea es baja: se usa un recorrido mínimo para que se dibuje despacio
      const span = Math.max(rect.height, vh * 0.5);
      const progress = (vh * 0.7 - rect.top) / span;
      apply(Math.min(1, Math.max(0, progress)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pasos.length]);

  return (
    <section id="funcionamiento" className={SECTION_CLASSES}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12">
        {/* ENCABEZADO */}
        <Reveal direction="up">
          <div className="mb-12 sm:mb-16 max-w-3xl space-y-4">
            <h2 className={TITLE_CLASSES}>{PILOTO_CONFIG.titleMain}</h2>
            <p className="text-muted text-base sm:text-lg lg:text-xl leading-relaxed">
              {PILOTO_CONFIG.intro}
            </p>
          </div>
        </Reveal>

        {/* LÍNEA DE TIEMPO */}
        <div
          ref={wrapperRef}
          className="relative"
          style={{ '--progress': 0 } as CSSProperties}
        >
          <div className={TRACK_CLASSES} aria-hidden="true">
            <span className={FILL_CLASSES} />
          </div>

          <ol role="list" className={LIST_CLASSES}>
            {pasos.map((paso, index) => {
              const Icon = paso.icon;
              const isActive = index < activeCount;

              return (
                <li key={paso.id} className={ITEM_CLASSES}>
                  <span
                    className={`${NODE_BASE} ${isActive ? NODE_ACTIVE : NODE_INACTIVE}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <Reveal direction="up" delay={index * 120}>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-brand-text">
                        Paso {index + 1}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground">{paso.title}</h3>
                      <p className="text-base leading-relaxed text-muted">
                        {paso.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}