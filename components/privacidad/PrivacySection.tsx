import { ShieldCheck, ClipboardList, MailCheck, UserCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

// TODO (revisión legal): un profesional que conozca la Ley 25.326 de
// Protección de Datos Personales debe validar este texto antes de publicar.
// TODO: completar con datos reales. Mientras estén vacíos, no se muestran.
const PRIVACY_CONFIG = {
  contactEmail: '', // TODO: correo para ejercer derechos sobre los datos
  responsable: '', // TODO: nombre o razón social del responsable de la base de datos
  title: 'Cómo cuidamos tus datos',
  intro:
    'Al postular a tu institución nos compartís datos de contacto. Esto es lo que hacemos con ellos.',
  puntos: [
    {
      id: 'minimos',
      icon: ClipboardList,
      title: 'Pedimos solo lo necesario',
      description:
        'El formulario recoge los datos de la institución y de la persona responsable que hacen falta para contactarte.',
    },
    {
      id: 'finalidad',
      icon: MailCheck,
      title: 'Los usamos para coordinar el piloto',
      description:
        'Usamos la información para comunicarnos con vos e implementar el programa piloto, y para nada más.',
    },
    {
      id: 'comercial',
      icon: ShieldCheck,
      title: 'No vendemos tus datos',
      description:
        'No vendemos ni cedemos tus datos personales con fines comerciales.',
    },
    {
      id: 'derechos',
      icon: UserCheck,
      title: 'Podés pedir acceso, corrección o eliminación',
      description:
        'La ley te reconoce el derecho a consultar tus datos, corregirlos o pedir que los eliminemos.',
    },
  ],
};

const SECTION_CLASSES = [
  'w-full font-sans section-lazy',
  'bg-background text-foreground',
  'py-16 sm:py-20 lg:py-24',
].join(' ');

const LAYOUT_CLASSES = [
  'grid grid-cols-1 gap-10',
  'lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 items-start',
].join(' ');

const TITLE_CLASSES = [
  'text-3xl sm:text-4xl lg:text-[40px]',
  'font-extrabold tracking-tight text-foreground leading-[1.2]',
].join(' ');

const SHIELD_CLASSES = [
  'flex h-12 w-12 items-center justify-center rounded-2xl',
  'bg-brand/10 border border-brand/20 text-brand-text',
].join(' ');

const LIST_CLASSES = 'divide-y divide-line border-y border-line';

const ITEM_CLASSES = 'flex items-start gap-4 py-6 sm:gap-5';

const ITEM_ICON_CLASSES = [
  'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center',
  'rounded-xl bg-brand/10 text-brand-text',
].join(' ');

const MAIL_LINK_CLASSES = [
  'font-semibold text-brand-text underline underline-offset-4',
  'hover:text-brand-dark',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm',
].join(' ');
export default function PrivacySection() {
  const { contactEmail, responsable } = PRIVACY_CONFIG;

  return (
    <section id="privacidad" aria-labelledby="privacidad-titulo" className={SECTION_CLASSES}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12">
        <div className={LAYOUT_CLASSES}>
          {/* Título e introducción */}
          <Reveal direction="up">
            <div className="space-y-5">
              <div className={SHIELD_CLASSES} aria-hidden="true">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 id="privacidad-titulo" className={TITLE_CLASSES}>
                {PRIVACY_CONFIG.title}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted">
                {PRIVACY_CONFIG.intro}
              </p>
            </div>
          </Reveal>

          {/* Puntos de confianza */}
          <div>
            <ul role="list" className={LIST_CLASSES}>
              {PRIVACY_CONFIG.puntos.map((punto, index) => {
                const Icon = punto.icon;

                return (
                  <li key={punto.id}>
                    <Reveal direction="up" delay={index * 100}>
                      <div className={ITEM_CLASSES}>
                        <span className={ITEM_ICON_CLASSES} aria-hidden="true">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="space-y-1.5">
                          <h3 className="text-lg font-bold text-foreground">{punto.title}</h3>
                          <p className="text-base leading-relaxed text-muted">
                            {punto.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            {/* Contacto: solo si hay datos reales cargados */}
            {(contactEmail || responsable) && (
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted">
                {contactEmail && (
                  <>
                    Para ejercer estos derechos, escribinos a{' '}
                    <a href={`mailto:${contactEmail}`} className={MAIL_LINK_CLASSES}>
                      {contactEmail}
                    </a>
                    .{' '}
                  </>
                )}
                {responsable && <>Responsable de la base de datos: {responsable}.</>}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}