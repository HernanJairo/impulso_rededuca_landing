'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA: HERO_CONFIG
 * ============================================================================
 * Centraliza los textos aprobados por MKT y los recursos multimedia
 * para facilitar modificaciones sin alterar la arquitectura JSX.
 */
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
    desktop: '/images/hero/hero-desktop.webp',
    tablet: '/images/hero/hero-tablet.webp',
    mobile: '/images/hero/hero-mobile.webp',
    alt: 'Aula digital RedEduca con estudiantes y docente',
  },
};

/**
 * Componente: HeroSection
 * 
 * Responsabilidades:
 * - Primera sección de impacto visual (Above the fold).
 * - Manejo adaptativo de imágenes (`picture` con breakpoints para desktop, tablet y mobile).
 * - Efectos de iluminación sutiles (degradados para fundir la imagen con el fondo blanco institucional).
 * - Jerarquía tipográfica accesible para optimización SEO (h1 único con leading proporcionado).
 */
export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center lg:justify-start overflow-hidden bg-white text-slate-900 font-sans"
    >
      {/* ==================================================================
          1. CAPA VISUAL DE FONDO (Exclusiva para Desktop >= 1024px)
          ================================================================== */}
      <div 
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <picture className="w-full h-full block">
          <source media="(min-width: 1024px)" srcSet={HERO_CONFIG.images.desktop} />
          <img
            src={HERO_CONFIG.images.desktop}
            alt={HERO_CONFIG.images.alt}
            fetchPriority="high"
            className="w-full h-full object-cover object-[88%_center] lg:object-right"
          />
        </picture>

        {/* Degradados lineales de fundido para suavizar los cortes de la fotografía con el fondo */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* ==================================================================
          2. BLOQUE DE CONTENIDO PRINCIPAL Y LLAMADOS A LA ACCIÓN
          ================================================================== */}
      <div className="relative z-10 w-full max-w-[1550px] mx-auto px-5 sm:px-8 lg:pl-10 lg:pr-6 py-8 sm:py-12 lg:py-20 flex flex-col justify-center">
        
        {/* Contenedor flotante con efecto de cristal (backdrop-blur) en desktop */}
        <div className="w-full max-w-full lg:max-w-[570px] lg:translate-x-[118px] lg:pb-[70px] bg-white lg:bg-white/85 lg:backdrop-blur-md p-0 lg:px-7 lg:py-9 rounded-3xl lg:border lg:border-white/90 lg:shadow-xl lg:shadow-slate-900/5 space-y-5 text-left">
          
          {/* Badge institucional de convocatoria */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
            <span>{HERO_CONFIG.badge}</span>
          </div>

          {/* Título de nivel 1 con acento cromático en la propuesta */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-950 leading-[1.15]">
            <span className="block">{HERO_CONFIG.headline.part1}</span>
            <span className="text-[#0D9488] block">{HERO_CONFIG.headline.part2}</span>
          </h1>

          {/* Bajada institucional de marketing */}
          <p className="w-full text-base sm:text-[17px] text-slate-700 font-normal leading-relaxed">
            {HERO_CONFIG.description}
          </p>

          {/* Grupo de acciones principales (Responsive: columna en móvil, fila en desktop) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={HERO_CONFIG.ctas.primary.href}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-[#0D9488] hover:bg-[#0f766e] active:scale-95 text-white font-bold rounded-xl shadow-md hover:shadow-teal-900/20 transition-all duration-200 text-center text-sm sm:text-base cursor-pointer"
            >
              <span>{HERO_CONFIG.ctas.primary.text}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <Link
              href={HERO_CONFIG.ctas.secondary.href}
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 hover:text-[#1E3A8A] hover:border-slate-400 font-semibold rounded-xl text-center text-sm sm:text-base shadow-xs transition-colors"
            >
              {HERO_CONFIG.ctas.secondary.text}
            </Link>
          </div>

        </div>

        {/* ==================================================================
            3. IMAGEN PARA DISPOSITIVOS MÓVILES Y TABLETS (< 1024px)
            ================================================================== */}
        <div className="block lg:hidden w-full mt-7 overflow-hidden rounded-2xl border border-slate-200/90 shadow-md">
          <picture className="w-full block">
            <source media="(min-width: 640px)" srcSet={HERO_CONFIG.images.tablet} />
            <img
              src={HERO_CONFIG.images.mobile}
              alt={HERO_CONFIG.images.alt}
              className="w-full h-[360px] sm:h-[440px] object-cover object-bottom"
            />
          </picture>
        </div>

      </div>
    </section>
  );
}