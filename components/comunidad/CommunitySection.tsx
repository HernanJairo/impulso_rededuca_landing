'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { UserCheck, GraduationCap, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const COMMUNITY_CONFIG = {
  titleMain: 'Diseñado para toda la comunidad educativa',
  intro:
    'Cada rol tiene herramientas pensadas para sus tareas del día a día. Elegí uno para ver qué cambia.',
  panelHeading: 'Qué cambia',
  // TODO: copy provisorio. Validar con el equipo qué funciones están
  // realmente previstas para el piloto antes de publicar.
  roles: [
    {
      id: 'directivos',
      icon: UserCheck,
      title: 'Directivos',
      badge: 'Gestión',
      description:
        'Una visión global de la institución, con información clara para tomar decisiones y organizar el trabajo del equipo.',
      cambios: [
        'Ver en un mismo lugar la información de la institución',
        'Contar con datos ordenados para decidir',
        'Enviar un aviso a toda la comunidad de una sola vez',
      ],
    },
    {
      id: 'docentes',
      icon: GraduationCap,
      title: 'Docentes',
      badge: 'Pedagogía',
      description:
        'Menos carga administrativa para dedicar más tiempo a la enseñanza y al seguimiento pedagógico.',
      cambios: [
        'Registrar asistencias y notas en un solo lugar',
        'Dedicar menos tiempo a planillas y papeles',
        'Consultar el historial de cada estudiante',
      ],
    },
    {
      id: 'estudiantes',
      icon: Users,
      title: 'Estudiantes',
      badge: 'Aprendizaje',
      description:
        'Un entorno ordenado y simple para consultar tareas, horarios y material de estudio.',
      cambios: [
        'Consultar tareas y horarios en un solo lugar',
        'Encontrar el material de estudio sin buscar en varios canales',
        'Recibir los avisos de la escuela de forma clara',
      ],
    },
    {
      id: 'familias',
      icon: HeartHandshake,
      title: 'Familias',
      badge: 'Vinculación',
      description:
        'Un acompañamiento más cercano del recorrido escolar, con comunicación directa y clara con la institución.',
      cambios: [
        'Recibir los avisos oficiales por un canal único',
        'Saber que el comunicado llegó',
        'Comunicarse con la institución sin intermediarios',
      ],
    },
  ],
};

const SECTION_CLASSES = [
  'w-full font-sans section-lazy',
  'bg-surface-muted text-foreground',
  'py-16 sm:py-20 lg:py-24',
].join(' ');

const TITLE_CLASSES = [
  'text-3xl sm:text-4xl lg:text-[44px]',
  'font-extrabold tracking-tight text-foreground leading-[1.2]',
].join(' ');

const LAYOUT_CLASSES = [
  'grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,320px)_1fr]',
  'lg:gap-10 items-start',
].join(' ');

const TABLIST_CLASSES = [
  'grid grid-cols-2 gap-3 sm:grid-cols-4',
  'lg:grid-cols-1 lg:gap-3',
].join(' ');

const TAB_BASE = [
  'flex w-full items-center gap-3 rounded-2xl border p-3 sm:p-4 text-left',
  'transition-colors duration-200 cursor-pointer',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted',
].join(' ');

const TAB_ACTIVE = 'bg-surface border-brand shadow-md';
const TAB_INACTIVE = 'border-line bg-transparent hover:bg-surface';

const TAB_ICON_BASE = [
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
  'transition-colors duration-200',
].join(' ');

const TAB_ICON_ACTIVE = 'bg-brand text-white';
const TAB_ICON_INACTIVE = 'bg-brand/10 text-brand-text';

const PANEL_CLASSES = [
  'relative overflow-hidden rounded-3xl border border-line bg-surface',
  'p-6 sm:p-10 lg:min-h-[440px] animate-fade-in',
].join(' ');

const PANEL_BADGE_CLASSES = [
  'inline-block rounded-full px-3 py-1 text-xs font-semibold',
  'bg-brand/10 border border-brand/30 text-brand-text',
].join(' ');
export default function CommunitySection() {
  const { roles } = COMMUNITY_CONFIG;
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = roles[activeIndex];
  const ActiveIcon = active.icon;

  const selectTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  // Navegación con teclado: flechas, Home y End (patrón WAI-ARIA de pestañas)
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = roles.length - 1;
    let next: number | null = null;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      next = index === last ? 0 : index + 1;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      next = index === 0 ? last : index - 1;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = last;
    }

    if (next !== null) {
      e.preventDefault();
      selectTab(next);
    }
  };

  return (
    <section id="comunidad" className={SECTION_CLASSES}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 xl:px-12">
        {/* ENCABEZADO */}
        <Reveal direction="up">
          <div className="mb-10 sm:mb-14 max-w-3xl space-y-4">
            <h2 className={TITLE_CLASSES}>{COMMUNITY_CONFIG.titleMain}</h2>
            <p className="text-muted text-base sm:text-lg lg:text-xl leading-relaxed">
              {COMMUNITY_CONFIG.intro}
            </p>
          </div>
        </Reveal>

        <div className={LAYOUT_CLASSES}>
          {/* SELECTOR DE ROLES */}
          <Reveal direction="left">
            <div role="tablist" aria-label="Roles de la comunidad" className={TABLIST_CLASSES}>
              {roles.map((role, index) => {
                const Icon = role.icon;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={role.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`comunidad-tab-${role.id}`}
                    aria-selected={isActive}
                    aria-controls="comunidad-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`${TAB_BASE} ${isActive ? TAB_ACTIVE : TAB_INACTIVE}`}
                  >
                    <span
                      className={`${TAB_ICON_BASE} ${isActive ? TAB_ICON_ACTIVE : TAB_ICON_INACTIVE}`}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-bold text-foreground leading-tight">
                        {role.title}
                      </span>
                      <span className="hidden lg:block text-sm text-muted">{role.badge}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* PANEL DEL ROL ELEGIDO */}
          <Reveal direction="right" delay={100}>
            <div
              key={active.id}
              role="tabpanel"
              id="comunidad-panel"
              aria-labelledby={`comunidad-tab-${active.id}`}
              tabIndex={0}
              className={PANEL_CLASSES}
            >
              {/* Ícono grande de fondo, solo decorativo */}
              <ActiveIcon
                className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 text-brand/10"
                aria-hidden="true"
              />

              <div className="relative space-y-6">
                <div className="space-y-3">
                  <span className={PANEL_BADGE_CLASSES}>{active.badge}</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    {active.title}
                  </h3>
                  <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
                    {active.description}
                  </p>
                </div>

                <div className="border-t border-line pt-6">
                  <h4 className="mb-4 text-base font-bold text-foreground">
                    {COMMUNITY_CONFIG.panelHeading}
                  </h4>
                  <ul className="space-y-3">
                    {active.cambios.map((cambio) => (
                      <li
                        key={cambio}
                        className="flex items-start gap-3 text-base leading-relaxed text-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-brand-text"
                          aria-hidden="true"
                        />
                        <span>{cambio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}