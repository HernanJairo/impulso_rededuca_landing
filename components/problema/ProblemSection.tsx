'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Layers, MessageSquareWarning, Clock } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const PROBLEM_CONFIG = {
  eyebrow: 'El problema',
  titleMain: 'Lo que hoy le resta tiempo a la ',
  titleAccent: 'tarea de educar.',
  intro:
    'En las instituciones educativas, la información suele estar dispersa, la comunicación se realiza por distintos canales y muchas tareas administrativas requieren trabajo manual. Estas dificultades pueden generar demoras, complicar la organización y restar tiempo a otras actividades importantes.',
  images: {
    desktop: '/images/problema/problem-desktop.webp',
    tablet: '/images/problema/problem-tablet.webp',
    mobile: '/images/problema/problem-mobile.webp', // 750x563
    alt: 'Docente y directivo gestionando registros escolares',
  },
  items: [
    {
      id: 'dispersion',
      icon: Layers,
      title: 'Información dispersa',
      description:
        'Cuadernos, planillas y archivos digitales conviven en distintos lugares, lo que dificulta encontrar la información cuando se necesita.',
      points: [
        'Cuadernos y comunicaciones en papel',
        'Planillas y archivos digitales separados',
        'Dificultad para consultar el historial de los alumnos',
      ],
    },
    {
      id: 'comunicacion',
      icon: MessageSquareWarning,
      title: 'Comunicación fragmentada',
      description:
        'Los mensajes circulan por WhatsApp, correo electrónico, llamadas y notas en papel. El uso de varios canales puede generar confusiones y demoras en avisos importantes.',
      points: [
        'Mensajes críticos perdidos en chats informales',
        'Falta de confirmación de lectura en comunicados',
        'Incertidumbre en las familias sobre avisos escolares',
      ],
    },
    {
      id: 'repetitivas',
      icon: Clock,
      title: 'Tareas administrativas repetitivas',
      description:
        'Buscar, registrar y actualizar información manualmente demanda tiempo y esfuerzo que podrían destinarse a la enseñanza y al acompañamiento pedagógico.',
      points: [
        'Carga manual de asistencias y notas por duplicado',
        'Demoras en la elaboración de informes escolares',
        'Sobrecarga de trabajo operativo en docentes y directivos',
      ],
    },
  ],
};

const SECTION_CLASSES = [
  'relative w-full overflow-hidden font-sans section-lazy',
  'bg-background text-foreground',
].join(' ');

const SIDE_IMAGE_WRAPPER_CLASSES = [
  'hidden lg:block absolute inset-y-0 right-0',
  'w-[45%] xl:w-1/2 pointer-events-none select-none',
].join(' ');

const STICKY_CLASSES = [
  'sticky top-[var(--header-h)] h-[640px]',
  'max-h-[calc(100dvh-var(--header-h))] w-full overflow-hidden',
].join(' ');

const CONTENT_WRAPPER_CLASSES = [
  'relative z-10 max-w-7xl mx-auto px-5 sm:px-8 xl:px-12',
  'py-12 sm:py-16 lg:py-24 min-h-[580px] lg:min-h-[640px]',
  'flex items-center',
].join(' ');

const EYEBROW_CLASSES = [
  'inline-block px-3.5 py-1.5 rounded-full',
  'bg-brand/10 border border-brand/30 text-brand-text',
  'text-xs sm:text-sm font-semibold tracking-wide',
].join(' ');

const TITLE_CLASSES = [
  'text-2xl sm:text-3xl lg:text-[40px]',
  'font-extrabold tracking-tight text-foreground leading-[1.2]',
].join(' ');

const MOBILE_IMAGE_WRAPPER_CLASSES = [
  'block lg:hidden w-full overflow-hidden rounded-2xl',
  'border border-line shadow-md my-4',
].join(' ');

// Solo se animan transform, sombra y color de borde (nada de transition-all)
const CARD_BASE = [
  'w-full rounded-2xl border',
  'transition-[transform,box-shadow,border-color] duration-300',
].join(' ');

const CARD_OPEN = [
  'bg-surface border-brand shadow-xl shadow-brand/5',
  'scale-[1.01] ring-2 ring-brand/10',
].join(' ');

const CARD_CLOSED = [
  'bg-surface/95 hover:bg-surface border-line hover:border-brand/60',
  'hover:shadow-lg hover:scale-[1.01]',
].join(' ');

const TRIGGER_CLASSES = [
  'w-full flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 text-left',
  'cursor-pointer rounded-2xl focus:outline-none',
  'focus-visible:ring-2 focus-visible:ring-brand',
].join(' ');

const ICON_BASE = [
  'w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl',
  'flex items-center justify-center transition-colors duration-300',
].join(' ');

const ICON_OPEN = 'bg-brand text-white shadow-md shadow-brand/20';
const ICON_CLOSED = 'bg-brand/10 text-brand-text';

const PANEL_BASE = [
  'grid transition-[grid-template-rows,opacity]',
  'duration-300 ease-in-out',
].join(' ');

const PANEL_OPEN = 'grid-rows-[1fr] opacity-100';
const PANEL_CLOSED = 'grid-rows-[0fr] opacity-0';
export default function ProblemSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleProblem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="problema" className={SECTION_CLASSES}>
      {/* 1. IMAGEN LATERAL DERECHA (desktop >= 1024px) */}
      <div className={SIDE_IMAGE_WRAPPER_CLASSES} aria-hidden="true">
        <div className={STICKY_CLASSES}>
          <Image
            src={PROBLEM_CONFIG.images.desktop}
            alt=""
            fill
            sizes="50vw"
            className="object-cover object-[100%_center] opacity-95 dark:opacity-80"
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/85 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/75 to-transparent" />
        </div>
      </div>

      {/* 2. CONTENIDO */}
      <div className={CONTENT_WRAPPER_CLASSES}>
        <div className="w-full lg:max-w-[480px] xl:max-w-[540px] space-y-6 text-left">
          {/* Título e introducción */}
          <Reveal direction="up">
            <div className="space-y-3">
              <span className={EYEBROW_CLASSES}>{PROBLEM_CONFIG.eyebrow}</span>
              <h2 className={TITLE_CLASSES}>
                {PROBLEM_CONFIG.titleMain}
                <span className="text-brand-text">{PROBLEM_CONFIG.titleAccent}</span>
              </h2>
              <p className="w-full text-[15px] text-muted leading-relaxed">
                {PROBLEM_CONFIG.intro}
              </p>
            </div>
          </Reveal>

          {/* Imagen para móvil y tablet (< 1024px) */}
          <div className={MOBILE_IMAGE_WRAPPER_CLASSES}>
            <picture className="block w-full">
              <source media="(min-width: 640px)" srcSet={PROBLEM_CONFIG.images.tablet} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROBLEM_CONFIG.images.mobile}
                alt={PROBLEM_CONFIG.images.alt}
                width={750}
                height={563}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[300px] object-cover object-center"
              />
            </picture>
          </div>

          {/* Acordeón */}
          <div className="space-y-3.5 w-full">
            {PROBLEM_CONFIG.items.map((item, index) => {
              const isOpen = openId === item.id;
              const Icon = item.icon;
              const triggerId = `problema-trigger-${item.id}`;
              const panelId = `problema-contenido-${item.id}`;

              return (
                <Reveal key={item.id} direction="up" delay={index * 100}>
                  <div className={`${CARD_BASE} ${isOpen ? CARD_OPEN : CARD_CLOSED}`}>
                    <button
                      type="button"
                      id={triggerId}
                      onClick={() => toggleProblem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={TRIGGER_CLASSES}
                    >
                      <span
                        className={`${ICON_BASE} ${isOpen ? ICON_OPEN : ICON_CLOSED}`}
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </span>

                      <span className="flex-1 text-base sm:text-lg font-bold text-foreground leading-snug">
                        {item.title}
                      </span>

                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-brand-text' : 'text-muted'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      inert={!isOpen}
                      className={`${PANEL_BASE} ${isOpen ? PANEL_OPEN : PANEL_CLOSED}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-5 pt-1 space-y-3 border-t border-line mt-1">
                          <p className="text-[15px] text-muted leading-relaxed">
                            {item.description}
                          </p>
                          <ul className="space-y-1.5 pt-1 text-[15px] text-muted">
                            {item.points.map((point) => (
                              <li key={point} className="flex items-start gap-2.5 leading-relaxed">
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}