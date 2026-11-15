'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // "Registro" eliminado; "Contacto" se agregó al final de la lista
  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Problema', href: '#problema' },
    { name: 'Propuesta', href: '#propuesta' },
    { name: 'Comunidad', href: '#comunidad' },
    { name: 'Piloto', href: '#funcionamiento' },
    { name: 'Privacidad', href: '#privacidad' },
  ];

  const contactLink = { name: 'Contacto', href: '#contacto' };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#inicio" className="flex items-center gap-3 group cursor-pointer">
          <Image
            src="/images/logo.webp"
            alt="Logo RedEduca"
            width={52}
            height={44}
            priority
            className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Red<span className="text-blue-500">Educa</span>
          </span>
        </a>

        {/* MENÚ DE NAVEGACIÓN (ESCRITORIO) */}
        <nav className="hidden lg:flex items-center gap-8">
          {[...navLinks, contactLink].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-slate-300 hover:text-blue-400 transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* BOTÓN CTA RÁPIDO */}
        <div className="hidden lg:block">
          <a
            href="#registro"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            Postular Institución
          </a>
        </div>

        {/* BOTÓN MENÚ MÓVIL (HAMBURGUESA) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-2 focus:outline-none cursor-pointer"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-slate-200 hover:text-blue-400 transition-colors py-2"
            >
              {link.name}
            </a>
          ))}

          {/* FOOTER DEL MENÚ: Contacto + CTA */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <a
              href={contactLink.href}
              onClick={() => setIsOpen(false)}
              className="block text-center text-lg font-medium text-slate-200 hover:text-blue-400 transition-colors py-2"
            >
              {contactLink.name}
            </a>
            <a
              href="#registro"
              onClick={() => setIsOpen(false)}
              className="block text-center w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md"
            >
              Postular Institución
            </a>
          </div>
        </div>
      )}
    </header>
  );
}