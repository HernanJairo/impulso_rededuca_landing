'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeSelector from '@/components/theme/ThemeSelector';

const NAVBAR_CONFIG = {
  logo: {
    src: '/images/logo.webp',
    alt: '',
    titleMain: 'Red',
    titleAccent: 'Educa',
  },
  links: [
    { name: 'Inicio', href: '#inicio' },
    { name: 'El problema', href: '#problema' },
    { name: 'Propuesta', href: '#propuesta' },
    { name: 'Comunidad', href: '#comunidad' },
    { name: 'Piloto', href: '#funcionamiento' },
    { name: 'Privacidad', href: '#privacidad' },
    { name: 'Contacto', href: '#contacto' },
  ],
  cta: {
    text: 'Postular institución',
    href: '#formulario',
  },
};

const MOBILE_MENU_ID = 'mobile-menu';

const HEADER_BASE = [
  'sticky top-0 z-50 w-full h-[var(--header-h)] font-sans',
  'flex items-center border-b backdrop-blur-md',
  'transition-shadow duration-300',
].join(' ');

const HEADER_TOP = 'bg-background/90 border-line/60';
const HEADER_SCROLLED = 'bg-background/95 border-line shadow-sm';

const CONTAINER_CLASSES = [
  'w-full max-w-7xl mx-auto px-5 sm:px-8 xl:px-12',
  'flex items-center justify-between gap-4 xl:gap-6',
].join(' ');

const LOGO_LINK_CLASSES = [
  'group flex shrink-0 items-center gap-2.5 rounded-lg',
  'focus-visible:outline-none focus-visible:ring-2',
  'focus-visible:ring-brand focus-visible:ring-offset-2',
  'focus-visible:ring-offset-background',
].join(' ');

const LOGO_BOX_CLASSES = [
  'relative flex h-10 w-10 items-center justify-center rounded-xl',
  'bg-brand/10 transition-transform duration-200 group-hover:scale-105',
].join(' ');

const NAV_LINK_CLASSES = [
  'relative whitespace-nowrap py-1 text-sm font-medium text-foreground',
  'transition-colors hover:text-brand-text',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm',
  "after:content-[''] after:absolute after:inset-x-0 after:bottom-0",
  'after:h-0.5 after:bg-brand after:origin-left after:scale-x-0',
  'after:transition-transform after:duration-300',
  'hover:after:scale-x-100',
].join(' ');

const CTA_DESKTOP_CLASSES = [
  'group hidden xl:inline-flex items-center gap-2 whitespace-nowrap rounded-xl',
  'bg-brand-dark px-5 py-2.5 text-sm font-bold text-white shadow-sm',
  'transition-colors duration-200 hover:bg-brand active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
].join(' ');

const CTA_MOBILE_CLASSES = [
  'group flex w-full items-center justify-center gap-2 rounded-xl',
  'bg-brand-dark py-3.5 text-sm font-bold text-white shadow-md',
  'transition-colors hover:bg-brand active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
].join(' ');

const BURGER_CLASSES = [
  'xl:hidden shrink-0 rounded-lg p-2 text-foreground',
  'transition-colors hover:bg-surface-muted',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
].join(' ');

const MOBILE_PANEL_CLASSES = [
  'xl:hidden absolute inset-x-0 top-full animate-slide-down',
  'max-h-[calc(100dvh-var(--header-h))] overflow-y-auto',
  'border-b border-line bg-background shadow-xl px-6 py-6 space-y-4',
].join(' ');

const MOBILE_LINK_CLASSES = [
  'rounded-lg px-3 py-2.5 text-base font-medium text-foreground',
  'transition-colors hover:bg-surface-muted hover:text-brand-text',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
].join(' ');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // EFECTO 1: sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // EFECTO 2: bloquear scroll del body con el menú abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // EFECTO 3: cerrar con Escape y al escalar a pantalla de escritorio (>=1280px)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        burgerRef.current?.focus();
      }
    };

    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      mq.removeEventListener('change', onChange);
    };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <header
      className={`${HEADER_BASE} ${isScrolled || isOpen ? HEADER_SCROLLED : HEADER_TOP}`}
    >
      <div className={CONTAINER_CLASSES}>
        {/* 1. LOGO */}
        <a
          href="#inicio"
          onClick={handleLinkClick}
          className={LOGO_LINK_CLASSES}
          aria-label="Ir al inicio de RedEduca"
        >
          <div className={LOGO_BOX_CLASSES}>
            <Image
              src={NAVBAR_CONFIG.logo.src}
              alt={NAVBAR_CONFIG.logo.alt}
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain"
            />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-navy">
            {NAVBAR_CONFIG.logo.titleMain}
            <span className="text-brand-text">{NAVBAR_CONFIG.logo.titleAccent}</span>
          </span>
        </a>

        {/* 2. MENÚ DESKTOP (>= 1280px) */}
        <nav
          className="hidden xl:flex items-center gap-6 2xl:gap-8"
          aria-label="Navegación principal"
        >
          {NAVBAR_CONFIG.links.map((link) => (
            <a key={link.href} href={link.href} className={NAV_LINK_CLASSES}>
              {link.name}
            </a>
          ))}
        </nav>

        {/* 3. GRUPO DERECHO: Selector de modo + CTA (desktop) + Hamburguesa (mobile/tablet) */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeSelector />

          <a href={NAVBAR_CONFIG.cta.href} className={CTA_DESKTOP_CLASSES}>
            {NAVBAR_CONFIG.cta.text}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={BURGER_CLASSES}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú principal'}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            {isOpen ? (
              <X className="h-7 w-7" aria-hidden="true" />
            ) : (
              <Menu className="h-7 w-7" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* 4. MENÚ MÓVIL (DESPLEGABLE) */}
      {isOpen && (
        <div id={MOBILE_MENU_ID} className={MOBILE_PANEL_CLASSES}>
          <nav className="flex flex-col space-y-1" aria-label="Navegación móvil">
            {NAVBAR_CONFIG.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={MOBILE_LINK_CLASSES}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="border-t border-line pt-4">
            <a
              href={NAVBAR_CONFIG.cta.href}
              onClick={handleLinkClick}
              className={CTA_MOBILE_CLASSES}
            >
              {NAVBAR_CONFIG.cta.text}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}