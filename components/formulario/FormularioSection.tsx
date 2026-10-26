'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { CheckCircle2, AlertCircle, Loader2, Info } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

// Mientras sea false, el formulario NO envía nada y lo dice con claridad.
// TODO (módulo de envío): al conectar el envío real (Server Action o route
// handler), reemplazar el setTimeout de handleSubmit y pasar esto a true.
const FORM_ENABLED = false;

type FormStatus = 'idle' | 'error' | 'sending' | 'success';

type FieldName =
  | 'institucion'
  | 'contacto'
  | 'localidad'
  | 'rol'
  | 'nivel'
  | 'contactoMedio'
  | 'alumnos'
  | 'comentario';

interface FormDataState extends Record<FieldName, string> {
  privacidad: boolean;
}

type FormErrors = Partial<Record<FieldName | 'privacidad', string>>;

interface FieldConfig {
  name: FieldName;
  label: string;
  kind: 'text' | 'select' | 'textarea';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'numeric' | 'email' | 'tel';
  maxLength?: number;
  hint?: string;
  fullWidth?: boolean;
}

// Orden = orden en pantalla = orden en que se enfoca el primer error
const FIELDS: FieldConfig[] = [
  {
    name: 'institucion',
    label: 'Nombre de la institución',
    kind: 'text',
    placeholder: 'Ej: Escuela N.º 12',
    autoComplete: 'organization',
    maxLength: 120,
  },
  {
    name: 'contacto',
    label: 'Nombre y apellido de contacto',
    kind: 'text',
    placeholder: 'Nombre y apellido',
    autoComplete: 'name',
    maxLength: 100,
  },
  {
    name: 'localidad',
    label: 'Localidad',
    kind: 'text',
    placeholder: 'Ej: Perico, Jujuy',
    autoComplete: 'address-level2',
    maxLength: 100,
  },
  {
    name: 'rol',
    label: 'Rol o función',
    kind: 'text',
    placeholder: 'Ej: Directora',
    autoComplete: 'organization-title',
    maxLength: 80,
  },
  {
    name: 'nivel',
    label: 'Nivel educativo',
    kind: 'select',
    autoComplete: 'off',
  },
  {
    name: 'contactoMedio',
    label: 'WhatsApp o email',
    kind: 'text',
    placeholder: 'Ej: 388 400-0000 / nombre@institucion.edu',
    autoComplete: 'off',
    inputMode: 'text',
    maxLength: 254,
    hint: 'Indicá al menos un medio de contacto.',
  },
  {
    name: 'alumnos',
    label: 'Cantidad aproximada de alumnos',
    kind: 'text',
    placeholder: 'Ej: 350',
    autoComplete: 'off',
    inputMode: 'numeric',
    maxLength: 6,
  },
  {
    name: 'comentario',
    label: 'Comentario',
    kind: 'textarea',
    placeholder: 'Contanos brevemente algo más sobre el interés de tu institución',
    autoComplete: 'off',
    maxLength: 600,
    hint: 'Con una o dos frases alcanza.',
    fullWidth: true,
  },
];

const NIVELES = [
  { value: 'Inicial', label: 'Nivel Inicial' },
  { value: 'Primario', label: 'Nivel Primario' },
  { value: 'Secundario', label: 'Nivel Secundario' },
  { value: 'Terciario / Superior', label: 'Terciario / Superior' },
];

const EMPTY_FORM: FormDataState = {
  institucion: '',
  contacto: '',
  localidad: '',
  rol: '',
  nivel: '',
  contactoMedio: '',
  alumnos: '',
  comentario: '',
  privacidad: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Teléfono: opcional +, dígitos, espacios, guiones y paréntesis; se cuentan los dígitos aparte
const PHONE_REGEX = /^\+?[\d\s()-]{8,20}$/;

const fieldId = (name: string) => `form-${name}`;

function validateForm(data: FormDataState): FormErrors {
  const e: FormErrors = {};

  if (!data.institucion.trim()) e.institucion = 'Ingresá el nombre de la institución.';
  if (!data.contacto.trim()) e.contacto = 'Ingresá el nombre y apellido de contacto.';
  if (!data.localidad.trim()) e.localidad = 'Ingresá la localidad.';
  if (!data.rol.trim()) e.rol = 'Ingresá el rol o función.';
  if (!data.nivel) e.nivel = 'Seleccioná el nivel educativo.';

  const medio = data.contactoMedio.trim();
  const digits = medio.replace(/\D/g, '');
  if (!medio) {
    e.contactoMedio = 'Ingresá un WhatsApp o email de contacto.';
  } else if (medio.includes('@')) {
    if (!EMAIL_REGEX.test(medio)) e.contactoMedio = 'Ingresá un email válido.';
  } else if (!PHONE_REGEX.test(medio) || digits.length < 8 || digits.length > 15) {
    e.contactoMedio = 'Ingresá un teléfono válido (entre 8 y 15 dígitos) o un email.';
  }

  const alumnos = data.alumnos.trim();
  if (!alumnos) {
    e.alumnos = 'Ingresá la cantidad aproximada de alumnos.';
  } else {
    const n = Number(alumnos);
    if (!Number.isInteger(n) || n < 1 || n > 100000) {
      e.alumnos = 'Ingresá un número entre 1 y 100000.';
    }
  }

  if (!data.comentario.trim()) {
    e.comentario = 'Contanos brevemente sobre el interés de tu institución.';
  }
  if (!data.privacidad) {
    e.privacidad = 'Debés aceptar el aviso de privacidad para continuar.';
  }

  return e;
}

// ---- Clases (en constantes para que no se corten al pegar) ----
const SECTION_CLASSES = [
  'relative w-full font-sans section-lazy',
  'bg-surface-muted text-foreground',
  'py-16 sm:py-20 lg:py-24',
].join(' ');

const EYEBROW_CLASSES = [
  'inline-block px-4 py-1.5 rounded-full',
  'bg-brand/10 border border-brand/30 text-brand-text',
  'text-xs sm:text-sm font-semibold tracking-wide',
].join(' ');

const TITLE_CLASSES = [
  'text-3xl sm:text-4xl lg:text-[42px]',
  'font-extrabold tracking-tight text-foreground leading-[1.2]',
].join(' ');

const CARD_CLASSES = [
  'lg:col-span-8 relative rounded-3xl border border-line bg-surface',
  'p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5',
].join(' ');

const LABEL_CLASSES = 'block text-[13px] font-semibold text-foreground';

const INPUT_BASE = [
  'w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted',
  'transition-colors focus:outline-none',
].join(' ');

const INPUT_OK = [
  'bg-background border border-line hover:border-muted',
  'focus:border-brand focus:ring-2 focus:ring-brand/20',
].join(' ');

const INPUT_ERROR = [
  'bg-danger/5 border-2 border-danger',
  'focus:border-danger focus:ring-2 focus:ring-danger/20',
].join(' ');

const INPUT_LOCKED = 'bg-surface-muted border border-line text-muted cursor-not-allowed';

const ERROR_TEXT_CLASSES = 'flex items-center gap-1 pt-0.5 text-xs font-medium text-danger';

const NOTICE_CLASSES = [
  'flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/10',
  'p-4 text-xs sm:text-sm text-foreground',
].join(' ');

const ERROR_SUMMARY_CLASSES = [
  'flex items-start gap-3 rounded-2xl border border-danger/40 bg-danger/5',
  'p-4 text-xs sm:text-sm text-foreground animate-fade-in',
].join(' ');

const SUBMIT_CLASSES = [
  'flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl',
  'px-8 py-3.5 text-sm font-bold text-white shadow-md',
  'transition-colors focus-visible:outline-none focus-visible:ring-2',
  'focus-visible:ring-brand focus-visible:ring-offset-2',
  'focus-visible:ring-offset-surface',
].join(' ');

const SUBMIT_IDLE = 'bg-brand-dark hover:bg-brand-dark/90 active:scale-[0.98] cursor-pointer';
const SUBMIT_LOCKED = 'bg-brand-dark/60 cursor-not-allowed';

const RESET_CLASSES = [
  'rounded-xl border-2 border-navy px-6 py-3 text-sm font-semibold text-navy',
  'transition-colors hover:bg-surface-muted active:scale-[0.98] cursor-pointer',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
].join(' ');
export default function FormularioSection() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<FormDataState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  // Bloqueo anti-duplicado: se activa al instante, antes de que React re-renderice
  const submittingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Limpiar el temporizador si el componente se desmonta
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Al terminar el envío, llevar el foco al mensaje de resultado
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const errorCount = Object.keys(errors).length;
  const isLocked = status === 'sending';

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    let value: string | boolean = e.target.value;

    if (type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    } else if (name === 'alumnos') {
      value = (value as string).replace(/\D/g, ''); // solo dígitos
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const focusFirstError = (found: FormErrors) => {
    const order: (FieldName | 'privacidad')[] = [...FIELDS.map((f) => f.name), 'privacidad'];
    const first = order.find((key) => found[key]);
    if (first) document.getElementById(fieldId(first))?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Si ya hay un envío en curso, se ignora (doble clic o Enter repetido)
    if (submittingRef.current) return;

    const found = validateForm(formData);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus('error');
      focusFirstError(found);
      return;
    }

    submittingRef.current = true;
    setErrors({});
    setStatus('sending');

    // TODO (módulo de envío): reemplazar este temporizador por la llamada real
    // (Server Action o route handler) con validación en el servidor, y manejar
    // el estado de error de red. Por ahora SOLO SIMULA el envío.
    timerRef.current = setTimeout(() => {
      setStatus('success');
      submittingRef.current = false;
    }, 1500);
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setStatus('idle');
    requestAnimationFrame(() => document.getElementById(fieldId('institucion'))?.focus());
  };

  const controlClass = (name: string) =>
    `${INPUT_BASE} ${errors[name as keyof FormErrors] ? INPUT_ERROR : isLocked ? INPUT_LOCKED : INPUT_OK}`;

  const describedBy = (field: FieldConfig) => {
    if (errors[field.name]) return `${fieldId(field.name)}-error`;
    if (field.hint) return `${fieldId(field.name)}-hint`;
    return undefined;
  };
    return (
    <section id="formulario" aria-labelledby="formulario-titulo" className={SECTION_CLASSES}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
          <Reveal direction="left" className="lg:col-span-4">
            <div className="space-y-4 text-left">
              <span className={EYEBROW_CLASSES}>Postulación al piloto</span>

              <h2 id="formulario-titulo" className={TITLE_CLASSES}>
                Sumá a tu institución al <span className="text-brand-text">piloto</span>
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-muted">
                Completá los datos de tu institución para postularla. Te pedimos la información
                necesaria para registrar su interés.
              </p>

              <p className="pt-1 text-xs text-muted">
                <span className="text-sm font-bold text-danger" aria-hidden="true">
                  *
                </span>{' '}
                Campo obligatorio
              </p>
            </div>
          </Reveal>

          {/* COLUMNA DERECHA: TARJETA */}
          <Reveal direction="right" delay={100} className="lg:col-span-8">
            <div className={CARD_CLASSES}>
              {status === 'success' ? (
                /* ENVIADO */
                <div className="space-y-6 py-8 text-center sm:py-12 animate-fade-in">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand-text sm:h-20 sm:w-20">
                    <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                  </div>

                  <div className="space-y-2">
                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="text-2xl font-extrabold text-foreground focus:outline-none sm:text-3xl"
                    >
                      {FORM_ENABLED
                        ? 'Recibimos la postulación de tu institución'
                        : 'Formulario de demostración'}
                    </h3>
                    <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                      {FORM_ENABLED
                        ? 'Gracias por tu interés en RedEduca. Registramos los datos que nos enviaste.'
                        : 'Este formulario todavía es una demostración: tus datos no se enviaron ni se guardaron.'}
                    </p>
                  </div>

                  <div className="mx-auto max-w-md space-y-1.5 rounded-2xl border border-line bg-surface-muted p-4 text-left text-xs text-muted sm:p-5 sm:text-sm">
                    <p className="text-base font-bold text-foreground">
                      {formData.institucion}{' '}
                      <span className="font-normal text-muted">· {formData.localidad}</span>
                    </p>
                    <p>
                      Contacto:{' '}
                      <span className="font-medium text-foreground">
                        {formData.contacto} ({formData.rol})
                      </span>
                    </p>
                    <p>
                      Vía: <span className="font-medium text-foreground">{formData.contactoMedio}</span>
                    </p>
                  </div>

                  <button type="button" onClick={handleReset} className={RESET_CLASSES}>
                    Postular otra institución
                  </button>
                </div>
              ) : (
                /* FORMULARIO */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={isLocked}
                  className="space-y-5"
                >
                  {!FORM_ENABLED && (
                    <div className={NOTICE_CLASSES}>
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-text" aria-hidden="true" />
                      <p>
                        <span className="font-bold">Formulario de demostración.</span> Por ahora no
                        se envía ni se guarda ningún dato.
                      </p>
                    </div>
                  )}

                  {status === 'sending' && (
                    <div
                      role="status"
                      className="flex items-center gap-3.5 rounded-2xl border border-brand/30 bg-brand/10 p-4 text-xs sm:text-sm animate-fade-in"
                    >
                      <Loader2
                        className="h-5 w-5 shrink-0 animate-spin text-brand-text"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-bold text-brand-text">Enviando tu postulación…</p>
                        <p className="text-xs text-muted">No cierres ni recargues esta página.</p>
                      </div>
                    </div>
                  )}

                  {status === 'error' && errorCount > 0 && (
                    <div role="alert" className={ERROR_SUMMARY_CLASSES}>
                      <AlertCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-danger"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-bold text-danger">
                          Revisá {errorCount} {errorCount === 1 ? 'campo' : 'campos'} para poder
                          enviar
                        </p>
                        <p className="text-xs text-muted">
                          Corregí lo marcado en rojo. Lo que ya completaste se conserva.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CAMPOS */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {FIELDS.map((field) => {
                      const id = fieldId(field.name);
                      const error = errors[field.name];
                      const common = {
                        id,
                        name: field.name,
                        value: formData[field.name],
                        onChange: handleChange,
                        disabled: isLocked,
                        'aria-invalid': error ? true : undefined,
                        'aria-describedby': describedBy(field),
                        'aria-required': true,
                        className: controlClass(field.name),
                      } as const;

                      return (
                        <div
                          key={field.name}
                          className={`space-y-1.5 text-left ${field.fullWidth ? 'sm:col-span-2' : ''}`}
                        >
                          <label htmlFor={id} className={LABEL_CLASSES}>
                            {field.label}{' '}
                            <span className="text-danger" aria-hidden="true">
                              *
                            </span>
                          </label>

                          {field.kind === 'select' ? (
                            <select
                              {...common}
                              autoComplete={field.autoComplete}
                              className={`${controlClass(field.name)} ${
                                formData.nivel ? '' : 'text-muted'
                              }`}
                            >
                              <option value="" disabled>
                                Seleccionar
                              </option>
                              {NIVELES.map((n) => (
                                <option key={n.value} value={n.value}>
                                  {n.label}
                                </option>
                              ))}
                            </select>
                          ) : field.kind === 'textarea' ? (
                            <textarea
                              {...common}
                              rows={3}
                              maxLength={field.maxLength}
                              placeholder={field.placeholder}
                              autoComplete={field.autoComplete}
                              className={`${controlClass(field.name)} resize-none`}
                            />
                          ) : (
                            <input
                              {...common}
                              type="text"
                              inputMode={field.inputMode}
                              maxLength={field.maxLength}
                              placeholder={field.placeholder}
                              autoComplete={field.autoComplete}
                            />
                          )}

                          {error ? (
                            <p id={`${id}-error`} role="alert" className={ERROR_TEXT_CLASSES}>
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span>{error}</span>
                            </p>
                          ) : (
                            field.hint && (
                              <p id={`${id}-hint`} className="text-[11.5px] text-muted">
                                {field.hint}
                              </p>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* CONSENTIMIENTO */}
                  {/* TODO (revisión legal): texto final del consentimiento, a definir
                      junto con el aviso de privacidad (Ley 25.326). */}
                  <div className="space-y-1.5 pt-2 text-left">
                    <div className="flex items-start gap-3">
                      <input
                        id={fieldId('privacidad')}
                        type="checkbox"
                        name="privacidad"
                        disabled={isLocked}
                        checked={formData.privacidad}
                        onChange={handleChange}
                        aria-invalid={errors.privacidad ? true : undefined}
                        aria-describedby={errors.privacidad ? 'form-privacidad-error' : undefined}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      />
                      <label
                        htmlFor={fieldId('privacidad')}
                        className="cursor-pointer text-xs leading-snug text-muted sm:text-[13px]"
                      >
                        Acepto el{' '}
                        <a
                          href="#privacidad"
                          className="font-semibold text-foreground underline hover:text-brand-text"
                        >
                          aviso de privacidad
                        </a>{' '}
                        de RedEduca.{' '}
                        <span className="text-danger" aria-hidden="true">
                          *
                        </span>
                      </label>
                    </div>
                    {errors.privacidad && (
                      <p id="form-privacidad-error" role="alert" className={ERROR_TEXT_CLASSES}>
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.privacidad}</span>
                      </p>
                    )}
                  </div>

                  {/* BOTÓN */}
                  <div className="flex flex-col items-center gap-4 pt-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isLocked}
                      className={`${SUBMIT_CLASSES} ${isLocked ? SUBMIT_LOCKED : SUBMIT_IDLE}`}
                    >
                      {isLocked ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <span>Enviar solicitud</span>
                      )}
                    </button>
                    {isLocked && (
                      <span className="text-xs text-muted">
                        Tus datos siguen guardados en pantalla.
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}