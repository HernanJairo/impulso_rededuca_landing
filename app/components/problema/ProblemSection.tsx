'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, NotebookText, MessageCircle, FileText } from 'lucide-react';

export default function ProblemSection() {
  // null = todo cerrado al cargar
  const [openId, setOpenId] = useState<string | null>(null);

  const problemas = [
    {
      id: 'cuadernos',
      icon: NotebookText,
      iconClass: 'bg-[#0D9488]/10 text-[#0D9488]',
      bulletClass: 'bg-[#0D9488]',
      activeBorder: 'border-[#0D9488]',
      title: 'Cuadernos y planillas',
      description: 'La información se registra en papel y en múltiples planillas.',
      points: [
        'Cuadernos y comunicaciones escritas',
        'Planillas y hojas de cálculo',
        'Documentos y archivos digitales dispersos',
      ],
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      iconClass: 'bg-[#1E3A8A]/10 text-[#1E3A8A]',
      bulletClass: 'bg-[#1E3A8A]',
      activeBorder: 'border-[#1E3A8A]',
      title: 'WhatsApp y mensajes',
      description: 'La comunicación se fragmenta en distintos grupos y chats.',
      points: [
        'Grupos de WhatsApp sin trazabilidad',
        'Dificultades de comunicación con las familias',
        'Información clave que se pierde entre mensajes',
      ],
    },
    {
      id: 'burocracia',
      icon: FileText,
      iconClass: 'bg-[#881337]/10 text-[#881337]',
      bulletClass: 'bg-[#881337]',
      activeBorder: 'border-[#881337]',
      title: 'Burocracia y trámites',
      description: 'Procesos lentos y repetitivos que consumen tiempo y energía.',
      points: [
        'Duplicación constante de tareas administrativas',
        'Excesiva carga de trabajo para docentes',
        'Poca trazabilidad y falta de estadísticas en tiempo real',
      ],
    },
  ];

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="problema"
      className="relative w-full overflow-hidden bg-[#F8F9FA] text-[#212529] scroll-mt-20"
    >
      {/* IMÁGENES DE FONDO RESPONSIVE */}
      <div className="absolute inset-0">
        {/* Móvil */}
        <Image
          src="/images/problema/problem-mobile.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom block md:hidden"
        />
        {/* Tablet */}
        <Image
          src="/images/problema/problem-tablet.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom hidden md:block lg:hidden"
        />
        {/* Escritorio */}
        <Image
          src="/images/problema/problem-desktop.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right hidden lg:block"
        />

        {/* Degradado claro para que el texto se lea sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/85 to-[#F8F9FA]/10" />
      </div>

      {/* CONTENIDO
          La altura mínima reserva espacio para el acordeón abierto,
          así la sección no cambia de tamaño y la imagen no se mueve. */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24 min-h-[1080px] sm:min-h-[1000px] lg:min-h-[860px] flex items-start">
        <div className="w-full max-w-xl lg:max-w-2xl space-y-8">

          {/* Título + introducción */}
          <div className="space-y-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-sm font-semibold">
              El problema
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#1E3A8A]">
              Hoy, la educación{' '}
              <span className="text-[#0D9488]">enfrenta grandes desafíos.</span>
            </h2>
            <p className="text-lg sm:text-xl font-normal leading-relaxed text-[#212529]/80 max-w-xl">
              La información está dispersa, la comunicación es informal y la gestión escolar se vuelve más compleja de lo que debería ser.
            </p>
          </div>

          {/* Tarjetas (acordeón) */}
          <div className="space-y-3">
            {problemas.map((item) => {
              const isOpen = openId === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border bg-white/95 shadow-sm backdrop-blur-sm transition-colors duration-300 ${
                    isOpen ? item.activeBorder : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`problema-${item.id}`}
                    className="w-full flex items-center gap-4 p-4 sm:p-5 text-left cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]"
                  >
                    <span className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full flex items-center justify-center ${item.iconClass}`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </span>
                    <span className="flex-1 text-xl sm:text-2xl font-semibold text-[#212529] leading-snug">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-slate-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={`problema-${item.id}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 space-y-4">
                        <p className="text-lg sm:text-xl font-normal text-[#212529]/90 leading-relaxed">
                          {item.description}
                        </p>
                        <ul className="space-y-3 text-base sm:text-lg font-normal text-[#212529]/80">
                          {item.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 leading-relaxed">
                              <span className={`w-2.5 h-2.5 rounded-full mt-2.5 shrink-0 ${item.bulletClass}`} />
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