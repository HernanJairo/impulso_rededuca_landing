import React from 'react';
import { Headphones, Wrench, Rocket, GraduationCap } from 'lucide-react';

export default function HowItWorksSection() {
  const pasosPiloto = [
    {
      step: '01',
      title: 'Escuchar',
      description: 'Analizamos las necesidades específicas, canales actuales y desafíos particulares de tu institución.',
      icon: Headphones,
      badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    },
    {
      step: '02',
      title: 'Construir',
      description: 'Adaptamos y configuramos el ecosistema RedEduca a la medida de tu comunidad escolar.',
      icon: Wrench,
      badgeClass: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    },
    {
      step: '03',
      title: 'Implementar',
      description: 'Desplegamos la plataforma de forma guiada con directivos, docentes y familias.',
      icon: Rocket,
      badgeClass: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    },
    {
      step: '04',
      title: 'Aprender',
      description: 'Evaluamos resultados, medimos el impacto operativo y optimizamos continuamente.',
      icon: GraduationCap,
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    },
  ];

  return (
    <section 
      id="funcionamiento" 
      className="w-full bg-slate-950 text-white py-24 sm:py-32 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-wider uppercase">
            Metodología de Adopción
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            ¿Cómo funciona el <span className="text-blue-500">Piloto RedEduca</span>?
          </h2>
          <p className="text-slate-300 text-lg sm:text-2xl font-normal leading-relaxed">
            Un proceso iterativo de 4 etapas diseñado para garantizar una transición exitosa sin fricciones en tu institución.
          </p>
        </div>

        {/* 4 PASOS DE LA SECUENCIA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pasosPiloto.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/15 group relative overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-2 border text-sm font-extrabold rounded-xl shadow-md ${item.badgeClass}`}>
                      {item.step}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-lg">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}