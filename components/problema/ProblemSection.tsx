'use client';

import React, { useState } from 'react';
import { ChevronDown, Layers, MessageSquareWarning, Clock } from 'lucide-react';

/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA: PROBLEM_CONFIG
 * ============================================================================
 * Define el copy institucional y las tres problemáticas validadas
 * para que el componente funcione de forma dinámica y desacoplada.
 */
const PROBLEM_CONFIG = {
  eyebrow: 'El problema',
  titleMain: 'Lo que hoy le resta tiempo a la ',
  titleAccent: 'tarea de educar.',
  intro:
    'En las instituciones educativas, la información suele estar dispersa, la comunicación se realiza por distintos canales y muchas tareas administrativas requieren trabajo manual. Estas dificultades pueden generar demoras, complicar la organización y restar tiempo a otras actividades importantes.',
  images: {
    desktop: '/images/problema/problem-desktop.webp',
    tablet: '/images/problema/problem-tablet.webp',
    mobile: '/images/problema/problem-mobile.webp',
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

/**
 * Componente: ProblemSection
 * 
 * Responsabilidades:
 * - Exponer los dolores clave del sistema escolar actual.
 * - Tarjetas interactivas tipo acordeón (un solo bloque expandido a la vez).
 * - Soporte de accesibilidad con `aria-expanded` y `aria-controls`.
 * - Composición visual alineada métricamente con el margen del Hero.
 */
export default function ProblemSection() {
  // Estado para el acordeón interactivo (null significa todo plegado)
  const [openId, setOpenId] = useState<string | null>(null);

  // Alterna la tarjeta seleccionada; si ya estaba abierta, la cierra
  const toggleProblem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="problema"
      className="relative w-full overflow-hidden bg-white text-slate-900 scroll-mt-20 font-sans"
    >
      {/* ==================================================================
          1. IMAGEN DE FONDO LATERAL DERECHA (Desktop >= 1024px)
          ================================================================== */}
      <div 
        className="hidden lg:block absolute inset-y-0 right-0 w-1/2 h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <picture className="w-full h-full block">
          <source media="(min-width: 1024px)" srcSet={PROBLEM_CONFIG.images.desktop} />
          <img
            src={PROBLEM_CONFIG.images.desktop}
            alt={PROBLEM_CONFIG.images.alt}
            className="w-full h-full object-cover object-[100%_center] opacity-95"
          />
        </picture>

        {/* Máscaras de degradado perimetral para fundir con el blanco circundante */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/75 to-transparent pointer-events-none" />
      </div>

      {/* ==================================================================
          2. CONTENIDO PRINCIPAL Y TARJETAS INTERACTIVAS
          ================================================================== */}
      <div className="relative z-10 max-w-[1550px] mx-auto px-5 sm:px-8 lg:pl-10 lg:pr-6 py-12 sm:py-16 lg:py-24 min-h-[580px] lg:min-h-[640px] flex items-center">
        
        {/* Columna alineada simétricamente con el bloque del Hero */}
        <div className="w-full lg:max-w-[570px] lg:translate-x-[118px] space-y-6 text-left">
          
          {/* Encabezado descriptivo de sección */}
          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              {PROBLEM_CONFIG.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-slate-950 leading-[1.2]">
              {PROBLEM_CONFIG.titleMain}
              <span className="text-[#0D9488]">{PROBLEM_CONFIG.titleAccent}</span>
            </h2>
            
            <p className="w-full text-[15px] text-slate-600 leading-relaxed font-normal">
              {PROBLEM_CONFIG.intro}
            </p>
          </div>

          {/* Imagen ilustrativa en bloque para vistas Mobile y Tablet */}
          <div className="block lg:hidden w-full overflow-hidden rounded-2xl border border-slate-200/80 shadow-md my-4">
            <picture className="w-full h-auto block">
              <source media="(min-width: 640px)" srcSet={PROBLEM_CONFIG.images.tablet} />
              <img
                src={PROBLEM_CONFIG.images.mobile}
                alt={PROBLEM_CONFIG.images.alt}
                className="w-full h-auto max-h-[300px] object-cover object-center"
              />
            </picture>
          </div>

          {/* Listado de problemáticas con efecto de acordeón suave */}
          <div className="space-y-3.5 w-full">
            {PROBLEM_CONFIG.items.map((item) => {
              const isOpen = openId === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`w-full rounded-2xl border transition-all duration-300 transform cursor-pointer ${
                    isOpen
                      ? 'bg-white border-teal-500 shadow-xl shadow-teal-900/10 scale-[1.01] ring-2 ring-teal-500/10'
                      : 'bg-white/95 hover:bg-white border-slate-200 hover:border-teal-400 hover:shadow-lg hover:scale-[1.01]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleProblem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`problema-contenido-${item.id}`}
                    className="w-full flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-2xl"
                  >
                    {/* Contenedor del ícono SVG */}
                    <span
                      className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#0D9488] text-white shadow-md shadow-teal-700/20'
                          : 'bg-teal-50 text-[#0D9488]'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>

                    {/* Título de la tarjeta */}
                    <span className="flex-1 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </span>

                    {/* Indicador de despliegue */}
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#0D9488]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Panel de contenido expandible por Grid CSS */}
                  <div
                    id={`problema-contenido-${item.id}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 pt-1 space-y-3 border-t border-slate-100 mt-1">
                        <p className="text-[15px] text-slate-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                        
                        {/* Puntos destacados con viñetas institucionales */}
                        <ul className="space-y-1.5 pt-1 text-[15px] text-slate-600">
                          {item.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 shrink-0" aria-hidden="true" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}