'use client';

import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Lock } from 'lucide-react';

// Regex estricta para el número de WhatsApp/teléfono:
// - "+" opcional solo al inicio
// - debe empezar y terminar con un dígito (no se permiten guiones, espacios ni símbolos sobrantes al final)
// - solo admite un espacio o guion simple como separador entre grupos de dígitos
const PHONE_REGEX = /^\+?\d+(?:[ -]\d+)*$/;
// Caracteres que no forman parte de un número telefónico (se eliminan mientras se escribe)
const PHONE_INVALID_CHARS = /[^\d +-]/g;
// Cantidad de dígitos válida (estándar E.164: máximo 15 dígitos)
const PHONE_MIN_DIGITS = 8;
const PHONE_MAX_DIGITS = 15;

// Máscara de entrada: elimina caracteres inválidos, deja el "+" solo al inicio
// y colapsa separadores repetidos (ej: "388--123" -> "388-123")
const maskPhoneInput = (value: string): string =>
  value
    .replace(PHONE_INVALID_CHARS, '')
    .replace(/(?!^)\+/g, '')
    .replace(/([ -])[ -]+/g, '$1');

const isValidPhone = (value: string): boolean => {
  const trimmed = value.trim();
  const digitCount = trimmed.replace(/\D/g, '').length;
  return (
    PHONE_REGEX.test(trimmed) &&
    digitCount >= PHONE_MIN_DIGITS &&
    digitCount <= PHONE_MAX_DIGITS
  );
};

export default function PilotFormSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [formData, setFormData] = useState({
    nombreInstitucion: '',
    localidad: '',
    tipoInstitucion: '',
    contacto: '',
    cargo: '',
    correo: '',
    telefono: '',
    motivoInteres: '',
    observaciones: '',
  });

  const sanitizeInput = (text: string): string => {
    return text
      .replace(/<[^>]*>?/gm, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|--|;)/gi, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'telefono') {
      value = maskPhoneInput(value);
      setPhoneError(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bloquea el envío si el número tiene caracteres inválidos o separadores sobrantes al final
    if (!isValidPhone(formData.telefono)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);

    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }

    setPrivacyError(false);

    const sanitizedPayload = {
      nombreInstitucion: sanitizeInput(formData.nombreInstitucion),
      localidad: sanitizeInput(formData.localidad),
      tipoInstitucion: sanitizeInput(formData.tipoInstitucion),
      contacto: sanitizeInput(formData.contacto),
      cargo: sanitizeInput(formData.cargo),
      correo: sanitizeInput(formData.correo),
      telefono: sanitizeInput(formData.telefono.trim()),
      motivoInteres: sanitizeInput(formData.motivoInteres),
      observaciones: sanitizeInput(formData.observaciones),
    };

    console.log('Datos sanitizados correctamente:', sanitizedPayload);
    setFormSubmitted(true);
  };

  return (
    <section 
      id="registro" 
      className="w-full bg-slate-950 text-white py-24 sm:py-32 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* TEXTO IZQUIERDA */}
            <div className="lg:col-span-4 space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold tracking-wider uppercase">
                Postulación Institucional
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Formulario de <span className="text-blue-500">Registro</span>
              </h2>

              <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                <p>
                  Completa los datos de tu institución educativa para evaluar la incorporación al programa piloto de RedEduca.
                </p>
                <p>
                  Para registrarte o solicitar más detalles, nuestro equipo se pondrá en contacto con las autoridades de tu establecimiento.
                </p>
              </div>

              <div className="pt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
                <Lock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p>Sus datos están protegidos y encriptados bajo protocolos estrictos de privacidad e integridad de información.</p>
              </div>
            </div>

            {/* FORMULARIO DERECHA */}
            <div className="lg:col-span-8">
              {formSubmitted ? (
                <div className="bg-blue-600/10 border border-blue-500/40 rounded-3xl p-10 text-center space-y-5">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">¡Registro enviado con éxito!</h3>
                  <p className="text-slate-300 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                    Hemos procesado y sanitizado correctamente los datos de tu institución. Nos comunicaremos a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200">Nombre de Institución *</label>
                      <input
                        type="text"
                        name="nombreInstitucion"
                        required
                        value={formData.nombreInstitucion}
                        onChange={handleChange}
                        placeholder="Ej. Colegio San Martín"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200">Localidad *</label>
                      <input
                        type="text"
                        name="localidad"
                        required
                        value={formData.localidad}
                        onChange={handleChange}
                        placeholder="Ej. Buenos Aires"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="tipoInstitucion" className="text-sm font-bold text-slate-200 block">
                          Tipo de Institución *
                        </label>
                        <select
                          id="tipoInstitucion"
                          name="tipoInstitucion"
                          required
                          value={formData.tipoInstitucion}
                          onChange={handleChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="" disabled>Seleccionar tipo...</option>
                          <option value="Privada">Privada</option>
                          <option value="Pública">Pública</option>
                          <option value="Subvencionada">Subvencionada</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200">Contacto *</label>
                      <input
                        type="text"
                        name="contacto"
                        required
                        value={formData.contacto}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200">Cargo *</label>
                      <input
                        type="text"
                        name="cargo"
                        required
                        value={formData.cargo}
                        onChange={handleChange}
                        placeholder="Ej. Director / Rep. Legal"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200">Correo Electrónico *</label>
                      <input
                        type="email"
                        name="correo"
                        required
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="contacto@colegio.edu"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="telefono" className="text-sm font-bold text-slate-200">Teléfono / WhatsApp *</label>
                      <input
                        id="telefono"
                        type="tel"
                        name="telefono"
                        required
                        inputMode="tel"
                        maxLength={20}
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+54 11 1234-5678"
                        aria-invalid={phoneError}
                        aria-describedby={phoneError ? 'telefono-error' : undefined}
                        className={`w-full bg-slate-950 border rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none transition-colors ${
                          phoneError ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'
                        }`}
                      />
                      {phoneError && (
                        <p id="telefono-error" className="text-red-400 text-xs flex items-center gap-1 font-semibold">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          Ingrese un número válido (8 a 15 dígitos), sin guiones ni símbolos al final.
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200">Motivo de Interés *</label>
                      <input
                        type="text"
                        name="motivoInteres"
                        required
                        value={formData.motivoInteres}
                        onChange={handleChange}
                        placeholder="Ej. Digitalizar gestión escolar"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-200">Observaciones (Opcional)</label>
                    <textarea
                      name="observaciones"
                      rows={3}
                      value={formData.observaciones}
                      onChange={handleChange}
                      placeholder="Comentarios adicionales o consultas..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-base placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => {
                          setPrivacyAccepted(e.target.checked);
                          if (e.target.checked) setPrivacyError(false);
                        }}
                        className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-sm text-slate-300">
                        Acepto los términos de la <a href="#privacidad" className="text-blue-400 underline hover:text-blue-300">Política de Privacidad</a>.
                      </span>
                    </label>
                    {privacyError && (
                      <p className="text-red-400 text-xs flex items-center gap-1 font-semibold">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        Debe aceptar la política de privacidad para enviar el formulario.
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-base rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      Enviar Postulación
                    </button>
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