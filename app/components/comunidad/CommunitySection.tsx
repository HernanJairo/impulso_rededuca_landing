import React from 'react';
import { UserCheck, GraduationCap, Users, HeartHandshake } from 'lucide-react';

export default function CommunitySection() {
  const actores = [
    {
      icon: UserCheck,
      title: 'Directivos',
      description: 'Visión global de la institución, acceso a métricas claras en tiempo real y optimización de la toma de decisiones estratégicas.',
      badge: 'Gestión',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      icon: GraduationCap,
      title: 'Docentes',
      description: 'Reducción drástica de la carga administrativa para centrar el foco absoluto en la enseñanza y el seguimiento pedagógico.',
      badge: 'Pedagogía',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Estudiantes',
      description: 'Entorno ordenado y amigable para consultar tareas, horarios y material de estudio de manera sumamente intuitiva.',
      badge: 'Aprendizaje',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: HeartHandshake,
      title: 'Familias',
      description: 'Acompañamiento cercano en el desarrollo escolar con comunicación fluida, transparente y directa con la institución.',
      badge: 'Vinculación',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <section 
      id="comunidad" 
      className="w-full bg-slate-950 text-white py-24 sm:py-32 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-wider uppercase">
            Ecosistema Integrado
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Diseñado para toda la <span className="text-blue-500">Comunidad Educativa</span>
          </h2>
          <p className="text-slate-300 text-lg sm:text-2xl font-normal leading-relaxed">
            Cada rol cuenta con herramientas adaptadas y accesibles para garantizar una experiencia ágil y sin complicaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {actores.map((actor, index) => {
            const IconComponent = actor.icon;
            return (
              <div 
                key={index}
                className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/15 group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${actor.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full bg-slate-800/90 text-slate-200 border border-slate-700/80">
                      {actor.badge}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {actor.title}
                    </h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                      {actor.description}
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