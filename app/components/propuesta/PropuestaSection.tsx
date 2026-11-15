import React from 'react';
import { Database, MessageSquareText, BarChart3, CheckCircle2 } from 'lucide-react';

export default function PropuestaSection() {
  const beneficios = [
    {
      icon: Database,
      title: 'Centralización de Datos',
      description: 'Toda la información académica, administrativa y de legajos unificada en un único ecosistema seguro, ordenado y accesible para todos.',
      badge: 'Organización'
    },
    {
      icon: MessageSquareText,
      title: 'Comunicación Efectiva',
      description: 'Canales directos y formales entre directivos, docentes y familias, eliminando ruidos y grupos informales desordenados.',
      badge: 'Conectividad'
    },
    {
      icon: BarChart3,
      title: 'Gestión con Trazabilidad',
      description: 'Reducción drástica del trabajo administrativo repetitivo y obtención de estadísticas institucionales claras en tiempo real.',
      badge: 'Eficiencia'
    }
  ];

  return (
    <section 
      id="propuesta" 
      className="w-full bg-slate-950 text-white py-24 sm:py-32 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-wider uppercase">
            Propuesta de Valor
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            ¿Cómo transforma <span className="text-blue-500">RedEduca</span> tu institución?
          </h2>
          <p className="text-slate-300 text-lg sm:text-2xl font-normal leading-relaxed">
            Soluciones diseñadas específicamente para optimizar la operativa escolar diaria y potenciar el vínculo con las familias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {beneficios.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/15 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700/80">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-slate-800/80 flex items-center gap-3 text-sm sm:text-base text-slate-300 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Implementación guiada y segura</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}