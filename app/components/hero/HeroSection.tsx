import React from 'react';

export default function HeroSection() {
  return (
    <>
      {/* PRELOAD DE LA IMAGEN HERO (solo se descarga la que corresponde al ancho) */}
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-mobile.webp"
        media="(max-width: 639px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-tablet.webp"
        media="(min-width: 640px) and (max-width: 1023px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-desktop.webp"
        media="(min-width: 1024px)"
        fetchPriority="high"
      />

      <section
        id="inicio"
        className="relative w-full min-h-dvh flex items-center justify-start overflow-hidden bg-slate-950 text-white"
      >
        {/* IMÁGENES ADAPTATIVAS NATIVAS */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(min-width: 1024px)" srcSet="/images/hero/hero-desktop.webp" />
          <source media="(min-width: 640px)" srcSet="/images/hero/hero-tablet.webp" />
          <img
            src="/images/hero/hero-mobile.webp"
            alt="Impulso RedEduca"
            width={750}
            height={1334}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[85%_center] sm:object-right opacity-80 sm:opacity-100"
          />
        </picture>

        {/* OVERLAY / DEGRADADO OPTIMIZADO */}
        <div className="absolute inset-0 bg-slate-950/70 sm:bg-transparent" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* CONTENIDO PRINCIPAL */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 w-full py-16 sm:py-20">
          <div className="max-w-xs sm:max-w-lg lg:max-w-xl space-y-5 sm:space-y-6">
            <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
              Ecosistema Educativo Inteligente
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Transformá la gestión de tu <span className="text-blue-400">institución</span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed">
              Conectá a profesores, tutores, administradores y directivos en una sola plataforma diseñada para impulsar la educación del futuro.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a
                href="#registro"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md text-center text-sm sm:text-base cursor-pointer transition-colors"
              >
                Postular mi institución
              </a>
              <a
                href="#problema"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-slate-900 border border-slate-700 text-white font-semibold rounded-xl text-center text-sm sm:text-base cursor-pointer hover:bg-slate-800 transition-colors"
              >
                Conocer más
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}