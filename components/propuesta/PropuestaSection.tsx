'use client';

import React from 'react';
import { 
  MessageSquareShare, 
  HeartHandshake, 
  FolderKanban, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export default function PropuestaSection() {
  const ejes = [
    {
      icon: MessageSquareShare,
      badge: 'Familias y tutores',
      title: 'Comunicar',
      description:
        'Promover una comunicación institucional más clara y accesible para facilitar el intercambio de información entre la institución, los docentes, los estudiantes y las familias.',
      impacto: 'Información clara y sin dispersión de canales',
    },
    {
      icon: HeartHandshake,
      badge: 'Estudiantes',
      title: 'Acompañar',
      description:
        'Reconocer las necesidades de cada integrante de la comunidad educativa para favorecer una participación más cercana y un mejor acompañamiento durante la trayectoria educativa.',
      impacto: 'Participación activa y escucha continua',
    },
    {
      icon: FolderKanban,
      badge: 'Directivos',
      title: 'Organizar',
      description:
        'Contribuir a una mejor organización de la información institucional, frente a las dificultades que genera tener datos distribuidos en distintos soportes y lugares.',
      impacto: 'Información unificada y accesible',
    },
    {
      icon: Sparkles,
      badge: 'Docentes',
      title: 'Potenciar',
      description:
        'Impulsar nuevas oportunidades de colaboración y mejora dentro de la comunidad educativa, a partir de sus experiencias, necesidades y aportes.',
      impacto: 'Alivio administrativo y labor colaborativa',
    },
  ];

  return (
    <section 
      id="propuesta" 
      className="w-full bg-gradient-to-b from-white via-slate-50/70 to-[#F8FAFC] text-slate-900 pt-2 sm:pt-4 pb-8 sm:pb-12 lg:pb-14 font-['Poppins',sans-serif] scroll-mt-20"
    >
      {/* Contenedor sincronizado con el Hero y Problema */}
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 lg:pl-10 lg:pr-6">
        
        {/* Contenedor alineado a la izquierda con el mismo translate */}
        <div className="w-full lg:translate-x-[118px] lg:max-w-[calc(100%-118px)] lg:pr-[118px]">
          
          {/* ENCABEZADO OFICIAL */}
          <div className="text-left max-w-4xl mb-12 sm:mb-16 space-y-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-2xs">
                La propuesta
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-950 leading-[1.2]">
              Una comunidad educativa <span className="text-[#0D9488]">más conectada.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl">
              RedEduca busca contribuir a una mejor organización y comunicación en las instituciones educativas, teniendo en cuenta las necesidades de quienes forman parte de la comunidad: directivos, docentes, estudiantes y familias.
            </p>
          </div>

          {/* GRID ADAPTABLE A CUALQUIER RESOLUCIÓN Y ZOOM */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-7 items-stretch">
            {ejes.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/90 hover:border-teal-400 rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/5 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0D9488] to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200/70 flex items-center justify-center text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70 truncate">
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-[14.5px] sm:text-base leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2.5 text-xs sm:text-[13.5px] text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>{item.impacto}</span>
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