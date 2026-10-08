import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[600px] h-[85vh] flex items-center justify-start overflow-hidden bg-slate-900 text-white">
      {/* 1. IMAGEN DE FONDO ADAPTATIVA */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-desktop.webp"
          alt="Impulso RedEduca"
          fill
          priority
          className="object-cover object-right sm:object-center"
        />
      </div>

      {/* 2. GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent md:w-3/4 lg:w-2/3" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-12">
        <div className="max-w-xl space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-sm font-semibold tracking-wide backdrop-blur-sm">
            Ecosistema Educativo Inteligente
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            Transformá la gestión de tu <span className="text-blue-400">institución</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed drop-shadow">
            Conectá a profesores, tutores, administradores y directivos en una sola plataforma diseñada para impulsar la educación del futuro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 text-center">
              Postular mi institución
            </button>
            <button className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 text-center">
              Conocer más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}