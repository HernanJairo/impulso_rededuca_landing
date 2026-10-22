'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'error' | 'sending' | 'success';

interface FormDataState {
  institucion: string;
  localidad: string;
  nivel: string;
  alumnos: string;
  contacto: string;
  rol: string;
  contactoMedio: string;
  comentario: string;
  privacidad: boolean;
}

interface FormErrors {
  institucion?: string;
  localidad?: string;
  nivel?: string;
  alumnos?: string;
  contacto?: string;
  rol?: string;
  contactoMedio?: string;
  comentario?: string;
  privacidad?: string;
}

export default function FormularioSection() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<FormDataState>({
    institucion: '',
    localidad: '',
    nivel: '',
    alumnos: '',
    contacto: '',
    rol: '',
    contactoMedio: '',
    comentario: '',
    privacidad: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const sanitize = (text: string) => {
    return text.replace(/[<>]/g, '').trim();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.institucion.trim()) {
      newErrors.institucion = 'Ingresá el nombre de la institución.';
    }
    if (!formData.localidad.trim()) {
      newErrors.localidad = 'Ingresá la localidad.';
    }
    if (!formData.nivel) {
      newErrors.nivel = 'Seleccioná el nivel educativo.';
    }
    if (!formData.alumnos.trim()) {
      newErrors.alumnos = 'Ingresá la cantidad aproximada de alumnos.';
    }
    if (!formData.contacto.trim()) {
      newErrors.contacto = 'Ingresá el nombre y apellido de contacto.';
    }
    if (!formData.rol.trim()) {
      newErrors.rol = 'Ingresá el rol o función.';
    }

    const contactoMedio = formData.contactoMedio.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{6,20}$/;

    if (!contactoMedio) {
      newErrors.contactoMedio = 'Ingresá un WhatsApp o email de contacto.';
    } else if (!emailRegex.test(contactoMedio) && !phoneRegex.test(contactoMedio)) {
      newErrors.contactoMedio = 'Ingresá un WhatsApp o email válido.';
    }

    if (!formData.comentario.trim()) {
      newErrors.comentario = 'Contanos brevemente sobre el interés de tu institución.';
    }

    if (!formData.privacidad) {
      newErrors.privacidad = 'Debés aceptar el aviso de privacidad para continuar.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    setTimeout(() => {
      console.log('Postulación simulada recibida:', {
        ...formData,
        institucion: sanitize(formData.institucion),
        localidad: sanitize(formData.localidad),
        contacto: sanitize(formData.contacto),
      });
      setStatus('success');
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      institucion: '',
      localidad: '',
      nivel: '',
      alumnos: '',
      contacto: '',
      rol: '',
      contactoMedio: '',
      comentario: '',
      privacidad: false,
    });
    setErrors({});
    setStatus('idle');
  };

  const errorCount = Object.keys(errors).length;
  const isLocked = status === 'sending';

  return (
    <section
      id="formulario"
      className="relative w-full bg-gradient-to-b from-[#F8FAFC] to-white text-slate-900 pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-24 lg:pb-28 font-['Poppins',sans-serif] scroll-mt-20"
    >
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 lg:pl-10 lg:pr-6">
        
        {/* MISMA ALINEACIÓN EXACTA DE LA PROPUESTA */}
        <div className="w-full lg:translate-x-[118px] lg:max-w-[calc(100%-118px)] lg:pr-[118px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-2xs">
                  Postulación al Piloto
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.2]">
                Sumá a tu institución al <span className="text-[#0D9488]">piloto</span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Completá los datos de tu institución para postularla. Te pedimos la información necesaria para registrar su interés.
              </p>

              <p className="text-xs text-slate-500 pt-1">
                <span className="text-[#881337] font-bold text-sm">*</span> Campo obligatorio
              </p>
            </div>

            {/* COLUMNA DERECHA: TARJETA DEL FORMULARIO EN MODO CLARO */}
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 relative">
              
              {/* ESTADO 4: ENVIADO (CONFIRMACIÓN + RESUMEN) */}
              {status === 'success' ? (
                <div className="py-8 sm:py-12 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-50 border border-teal-200 text-[#0D9488] rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Recibimos la postulación de tu institución
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                      Gracias por tu interés en RedEduca. Registramos los datos que nos enviaste.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm space-y-1.5 text-slate-700">
                    <p className="font-bold text-slate-900 text-base">
                      {formData.institucion} <span className="text-slate-500 font-normal">· {formData.localidad}</span>
                    </p>
                    <p className="text-slate-600">
                      Contacto: <span className="text-slate-900 font-medium">{formData.contacto} ({formData.rol})</span>
                    </p>
                    <p className="text-slate-600">
                      Vía: <span className="text-slate-900 font-medium">{formData.contactoMedio}</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 rounded-xl border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50 active:scale-95 text-sm font-semibold transition-all cursor-pointer"
                    >
                      Enviar otra postulación
                    </button>
                  </div>
                </div>
              ) : (
                /* ESTADOS 1 (VACÍO), 2 (ERROR) Y 3 (ENVIANDO) */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {/* ESTADO 3: AVISO ENVIANDO */}
                  {status === 'sending' && (
                    <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center gap-3.5 text-teal-900 text-xs sm:text-sm animate-in fade-in">
                      <Loader2 className="w-5 h-5 text-[#0D9488] animate-spin shrink-0" />
                      <div>
                        <p className="font-bold text-[#0D9488]">Enviando tu postulación…</p>
                        <p className="text-slate-600 text-xs">No cierres ni recargues esta página.</p>
                      </div>
                    </div>
                  )}

                  {/* ESTADO 2: AVISO GENERAL DE ERROR (BORDÓ #881337) */}
                  {status === 'error' && errorCount > 0 && (
                    <div className="p-4 rounded-2xl bg-rose-50/80 border border-[#881337]/30 flex items-start gap-3 text-slate-800 text-xs sm:text-sm animate-in fade-in">
                      <AlertCircle className="w-5 h-5 text-[#881337] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#881337]">
                          Revisá {errorCount} {errorCount === 1 ? 'campo' : 'campos'} para poder enviar
                        </p>
                        <p className="text-slate-600 text-xs">
                          Corregí lo marcado en bordó. Lo que ya completaste se conserva.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CAMPOS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Campo 1: Institución */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        Nombre de la institución <span className="text-[#881337]">*</span>
                      </label>
                      <input
                        type="text"
                        name="institucion"
                        disabled={isLocked}
                        value={formData.institucion}
                        onChange={handleChange}
                        placeholder="Ej: Escuela N.º 12"
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none ${
                          errors.institucion
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      />
                      {errors.institucion && (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.institucion}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo 2: Contacto */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        Nombre y apellido de contacto <span className="text-[#881337]">*</span>
                      </label>
                      <input
                        type="text"
                        name="contacto"
                        disabled={isLocked}
                        value={formData.contacto}
                        onChange={handleChange}
                        placeholder="Nombre y apellido"
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none ${
                          errors.contacto
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      />
                      {errors.contacto && (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.contacto}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo 3: Localidad */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        Localidad <span className="text-[#881337]">*</span>
                      </label>
                      <input
                        type="text"
                        name="localidad"
                        disabled={isLocked}
                        value={formData.localidad}
                        onChange={handleChange}
                        placeholder="Ej: Perico, Jujuy"
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none ${
                          errors.localidad
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      />
                      {errors.localidad && (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.localidad}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo 4: Rol */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        Rol o función <span className="text-[#881337]">*</span>
                      </label>
                      <input
                        type="text"
                        name="rol"
                        disabled={isLocked}
                        value={formData.rol}
                        onChange={handleChange}
                        placeholder="Ej: Directora"
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none ${
                          errors.rol
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      />
                      {errors.rol && (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.rol}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo 5: Nivel */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        Nivel educativo <span className="text-[#881337]">*</span>
                      </label>
                      <select
                        name="nivel"
                        disabled={isLocked}
                        value={formData.nivel}
                        onChange={handleChange}
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 transition-all focus:outline-none ${
                          errors.nivel
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      >
                        <option value="" disabled className="text-slate-400">
                          Seleccionar
                        </option>
                        <option value="Inicial">Nivel Inicial</option>
                        <option value="Primario">Nivel Primario</option>
                        <option value="Secundario">Nivel Secundario</option>
                        <option value="Terciario / Superior">Terciario / Superior</option>
                      </select>
                      {errors.nivel && (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.nivel}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo 6: Medio de contacto */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        WhatsApp o email <span className="text-[#881337]">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactoMedio"
                        disabled={isLocked}
                        value={formData.contactoMedio}
                        onChange={handleChange}
                        placeholder="Ej: 388 400-0000 / nombre@institucion.edu"
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none ${
                          errors.contactoMedio
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      />
                      {errors.contactoMedio ? (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.contactoMedio}</span>
                        </p>
                      ) : (
                        <p className="text-[11.5px] text-slate-500">Indicá al menos un medio de contacto.</p>
                      )}
                    </div>

                    {/* Campo 7: Alumnos */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        Cantidad aproximada de alumnos <span className="text-[#881337]">*</span>
                      </label>
                      <input
                        type="text"
                        name="alumnos"
                        disabled={isLocked}
                        value={formData.alumnos}
                        onChange={handleChange}
                        placeholder="Ej: 350"
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none ${
                          errors.alumnos
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      />
                      {errors.alumnos && (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.alumnos}</span>
                        </p>
                      )}
                    </div>

                    {/* Campo 8: Comentario */}
                    <div className="space-y-1.5 text-left sm:col-span-2">
                      <label className="text-[12.5px] font-semibold text-slate-700 block">
                        Comentario <span className="text-[#881337]">*</span>
                      </label>
                      <textarea
                        name="comentario"
                        rows={3}
                        disabled={isLocked}
                        value={formData.comentario}
                        onChange={handleChange}
                        placeholder="Contanos brevemente algo más sobre el interés de tu institución"
                        className={`w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none resize-none ${
                          errors.comentario
                            ? 'bg-rose-50/40 border-2 border-[#881337] focus:border-[#881337]'
                            : isLocked
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-500/10'
                        }`}
                      />
                      {errors.comentario ? (
                        <p className="text-[#881337] text-xs font-medium flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.comentario}</span>
                        </p>
                      ) : (
                        <p className="text-[11.5px] text-slate-500">Con una o dos frases alcanza.</p>
                      )}
                    </div>

                  </div>

                  {/* CHECKBOX PRIVACIDAD */}
                  <div className="pt-2 text-left space-y-1.5">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="privacidad"
                        disabled={isLocked}
                        checked={formData.privacidad}
                        onChange={handleChange}
                        className="w-4 h-4 rounded bg-white border-slate-300 text-[#0D9488] focus:ring-[#0D9488] accent-[#0D9488] cursor-pointer shrink-0"
                      />
                      <span className="text-xs sm:text-[13px] text-slate-600 leading-snug">
                        Acepto el{' '}
                        <a href="#privacidad" className="underline text-slate-800 hover:text-[#0D9488] font-semibold">
                          aviso de privacidad
                        </a>{' '}
                        de RedEduca. <span className="text-[#881337]">*</span>
                      </span>
                    </label>
                    {errors.privacidad && (
                      <p className="text-[#881337] text-xs font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.privacidad}</span>
                      </p>
                    )}
                  </div>

                  {/* BOTÓN PRINCIPAL */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={isLocked}
                      className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isLocked
                          ? 'bg-[#0D9488]/60 cursor-not-allowed opacity-80'
                          : 'bg-[#0D9488] hover:bg-[#0f766e] active:scale-95 shadow-teal-900/10'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <span>Enviar solicitud</span>
                      )}
                    </button>
                    {isLocked && (
                      <span className="text-xs text-slate-500">
                        Tus datos siguen guardados en pantalla.
                      </span>
                    )}
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}