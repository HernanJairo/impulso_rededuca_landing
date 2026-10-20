'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';

/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA (NAVBAR_CONFIG)
 * ============================================================================
 * Facilita modificar textos, rutas y accesos directos desde un solo lugar
 * sin tener que alterar la estructura del JSX.
 */
const NAVBAR_CONFIG = {
  logo: {
    src: '/images/logo.webp', // Ruta estática optimizada alojada en public/images
    alt: 'Logo RedEduca',
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
    text: 'Quiero que mi institución participe', // Copy oficial definido por MKT
    href: '#formulario',
  },
};

/**
 * Componente de Navegación Principal (Header)
 * 
 * Responsabilidades:
 * - Detección de scroll para aplicar elevación y desenfoque (backdrop-blur).
 * - Control de bloqueo de scroll en el body cuando el menú móvil está abierto.
 * - Navegación accesible (teclado, ARIA labels y contraste apto para auditorías).
 */
export default function Navbar() {
  // Estado para alternar el menú desplegable en dispositivos móviles
  const [isOpen, setIsOpen] = useState(false);

  // Estado que detecta si el usuario hizo scroll para variar la sombra y fondo
  const [isScrolled, setIsScrolled] = useState(false);

  // EFECTO 1: Escucha el scroll de la ventana para estilizar la barra superior
  useEffect(() => {
    const handleScroll = () => {
      // Activa sombra si el usuario desciende más de 15 píxeles
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // EFECTO 2: Bloquea el scroll del fondo cuando el modal móvil está activo
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup: Restaura el comportamiento estándar si el componente se desmonta
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cierra el menú al presionar un enlace de anclaje
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 font-sans ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* ==================================================================
            1. ISOTIPO Y LOGOTIPO DE MARCA
            ================================================================== */}
        <a 
          href="#inicio" 
          onClick={handleLinkClick}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Ir al inicio de RedEduca"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-teal-50 group-hover:scale-105 transition-transform duration-200">
            <Image
              src={NAVBAR_CONFIG.logo.src}
              alt={NAVBAR_CONFIG.logo.alt}
              width={32}
              height={32}
              priority
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#1E3A8A]">
            {NAVBAR_CONFIG.logo.titleMain}
            <span className="text-[#0D9488]">{NAVBAR_CONFIG.logo.titleAccent}</span>
          </span>
        </a>

        {/* ==================================================================
            2. MENÚ DE ENLACES PARA ESCRITORIO (Desktop >= 1024px)
            ================================================================== */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
          {NAVBAR_CONFIG.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-800 hover:text-[#0D9488] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0D9488] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* ==================================================================
            3. BOTÓN CTA PRINCIPAL (Desktop)
            ================================================================== */}
        <div className="hidden lg:block">
          <a
            href={NAVBAR_CONFIG.cta.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] hover:bg-[#0D655E] active:scale-95 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            {NAVBAR_CONFIG.cta.text}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        {/* ==================================================================
            4. BOTÓN DISPARADOR MENÚ MÓVIL (Hamburguesa / Cerrar)
            ================================================================== */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú principal'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* ==================================================================
          5. CONTENEDOR DESPLEGABLE MÓVIL
          ================================================================== */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-xl px-6 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200 max-h-[calc(100vh-65px)] overflow-y-auto">
          <nav className="flex flex-col space-y-2" aria-label="Navegación móvil">
            {NAVBAR_CONFIG.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-base font-medium text-slate-800 hover:text-[#0D9488] hover:bg-teal-50/60 px-3 py-2.5 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Mobile al pie del menú */}
          <div className="pt-4 border-t border-slate-100">
            <a
              href={NAVBAR_CONFIG.cta.href}
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#0F766E] hover:bg-[#0D655E] active:scale-98 text-white font-bold rounded-xl shadow-md text-sm transition-all"
            >
              {NAVBAR_CONFIG.cta.text}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}