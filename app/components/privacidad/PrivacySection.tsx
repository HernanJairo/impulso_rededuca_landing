import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacySection() {
  return (
    <section 
      id="privacidad" 
      className="w-full bg-slate-950 text-white py-20 sm:py-28 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* AVISO DE PRIVACIDAD */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Aviso de Privacidad
            </h2>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            En RedEduca nos tomamos muy en serio la seguridad e integridad de la información institucional. Todos los datos ingresados en esta plataforma son procesados bajo protocolos estrictos de encriptación y sanitización para prevenir vulnerabilidades y ataques maliciosos.
          </p>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            La información recopilada únicamente se utilizará con fines de contacto e implementación del programa piloto institucional. No compartimos ni comercializamos datos personales con terceros bajo ningún concepto.
          </p>

          <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-400 border-t border-slate-800">
            <Lock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Protección de datos conforme a estándares normativos internacionales de privacidad educativa.</span>
          </div>
        </div>

      </div>
    </section>
  );
}