import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BannerSection() {
  return (
    <section className="w-full bg-slate-950 text-white py-16 sm:py-20 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* BANNER INSTITUCIONAL COMPLEMENTARIO */}
        <div className="bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-slate-900 border border-blue-500/40 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Transformación Digital</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Banner Institucional Complementario
            </h3>
            
            <p className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed">
              Impulsando la modernización tecnológica y la comunicación transparente e integrada en cada comunidad educativa.
            </p>
          </div>

          <div className="shrink-0 z-10 w-full md:w-auto">
            <a
              href="#registro"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/30 transition-all cursor-pointer group"
            >
              <span>Postular institución</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}