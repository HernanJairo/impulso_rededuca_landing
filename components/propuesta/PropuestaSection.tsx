import {
  MessageSquareShare,
  HeartHandshake,
  FolderKanban,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const PROPUESTA_CONFIG = {
  eyebrow: 'La propuesta',
  titleMain: 'Una comunidad educativa ',
  titleAccent: 'más conectada.',
  description:
    'RedEduca busca contribuir a una mejor organización y comunicación en las instituciones educativas, teniendo en cuenta las necesidades de quienes forman parte de la comunidad: directivos, docentes, estudiantes y familias.',
  ejes: [
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
  ],
};

const SECTION_CLASSES = [
  'w-full font-sans section-lazy',
  'bg-background text-foreground',
  'py-16 sm:py-20 lg:py-24',
].join(' ');

const EYEBROW_CLASSES = [
  'inline-block px-4 py-1.5 rounded-full',
  'bg-brand/10 border border-brand/30 text-brand-text',
  'text-xs sm:text-sm font-semibold tracking-wide',
].join(' ');

const TITLE_CLASSES = [
  'text-3xl sm:text-4xl lg:text-[44px]',
  'font-extrabold tracking-tight text-foreground leading-[1.2]',
].join(' ');

const GRID_CLASSES = [
  'w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4',
  'gap-6 lg:gap-7 items-stretch',
].join(' ');

// Solo se animan sombra y color de borde (nada de transition-all)
const CARD_CLASSES = [
  'group relative overflow-hidden h-full',
  'flex flex-col justify-between rounded-3xl p-7 sm:p-8',
  'bg-surface border border-line hover:border-brand/60',
  'transition-[box-shadow,border-color] duration-300',
  'hover:shadow-xl hover:shadow-brand/5',
].join(' ');

const TOP_BAR_CLASSES = [
  'absolute inset-x-0 top-0 h-1.5',
  'bg-gradient-to-r from-brand to-brand-dark',
  'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
].join(' ');

const ICON_BOX_CLASSES = [
  'w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center',
  'bg-brand/10 border border-brand/20 text-brand-text',
  'transition-colors duration-300',
  'group-hover:bg-brand group-hover:text-white',
].join(' ');

const BADGE_CLASSES = [
  'text-xs font-semibold px-3 py-1 rounded-full truncate',
  'bg-surface-muted text-muted border border-line',
].join(' ');

const CARD_TITLE_CLASSES = [
  'text-2xl font-bold text-foreground',
  'transition-colors group-hover:text-brand-text',
].join(' ');

const IMPACT_CLASSES = [
  'pt-5 mt-6 border-t border-line',
  'flex items-center gap-2.5',
  'text-xs sm:text-[13.5px] text-foreground font-medium',
].join(' ');
export default function PropuestaSection() {
  return (
    <section id="propuesta" className={SECTION_CLASSES}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12">
        {/* ENCABEZADO */}
        <Reveal direction="up">
          <div className="text-left max-w-4xl mb-12 sm:mb-16 space-y-4">
            <div>
              <span className={EYEBROW_CLASSES}>{PROPUESTA_CONFIG.eyebrow}</span>
            </div>

            <h2 className={TITLE_CLASSES}>
              {PROPUESTA_CONFIG.titleMain}
              <span className="text-brand-text">{PROPUESTA_CONFIG.titleAccent}</span>
            </h2>

            <p className="text-muted text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">
              {PROPUESTA_CONFIG.description}
            </p>
          </div>
        </Reveal>

        {/* GRILLA: 1 columna, 2x2 desde md, 4 columnas desde 2xl */}
        <div className={GRID_CLASSES}>
          {PROPUESTA_CONFIG.ejes.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <Reveal
                key={item.title}
                direction="up"
                delay={(index + 1) * 100}
                className="h-full"
              >
                <article className={CARD_CLASSES}>
                  <div className={TOP_BAR_CLASSES} aria-hidden="true" />

                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className={ICON_BOX_CLASSES}>
                        <IconComponent className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <span className={BADGE_CLASSES}>{item.badge}</span>
                    </div>

                    <div className="space-y-3">
                      <h3 className={CARD_TITLE_CLASSES}>{item.title}</h3>
                      <p className="text-muted text-[14.5px] sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className={IMPACT_CLASSES}>
                    <CheckCircle2
                      className="w-4 h-4 text-brand-text shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.impacto}</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}