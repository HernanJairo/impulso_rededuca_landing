'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ✅ Ahora los íconos se importan desde su propia carpeta
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  XIcon,
} from '@/components/icons/SocialIcons';

/**
 * CONFIGURACIÓN CENTRALIZADA (FOOTER_CONFIG)
 */
const FOOTER_CONFIG = {
  brand: {
    name: 'RedEduca',
    tagline: 'Plataforma para acompañar a las comunidades escolares en la organización de su información y comunicación institucional.',
    logoSrc: '/images/logo.webp',
  },
  navigation: [
    { name: 'Inicio', href: '#inicio' },
    { name: 'El Problema', href: '#problema' },
    { name: 'Propuesta de Valor', href: '#propuesta' },
    { name: 'Comunidad Educativa', href: '#comunidad' },
    { name: 'Cómo funciona el piloto', href: '#funcionamiento' },
  ],
  contact: {
    email: 'contacto@rededuca.com',
    supportNotice: 'Soporte institucional activo',
  },
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com', icon: FacebookIcon, hoverColor: 'hover:text-[#1877F2]' },
    { name: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon, hoverColor: 'hover:text-[#E4405F]' },
    { name: 'WhatsApp', href: 'https://www.whatsapp.com', icon: WhatsAppIcon, hoverColor: 'hover:text-[#25D366]' },
    { name: 'X', href: 'https://x.com', icon: XIcon, hoverColor: 'hover:text-white' },
  ],
  legals: [
    { name: 'Aviso de Privacidad', href: '#privacidad' },
    { name: 'Términos y Condiciones', href: '#terminos' },
    { name: 'Política de Cookies', href: '#cookies' },
  ],
};

export default function FooterLanding() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#10151A] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* GRID PRINCIPAL: 4 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">

          {/* COLUMNA 1: IDENTIDAD INSTITUCIONAL */}
          <div className="space-y-4">
            <Link href="#inicio" className="inline-flex items-center gap-3 group">
              <Image
                src={FOOTER_CONFIG.brand.logoSrc}
                alt={`Logo ${FOOTER_CONFIG.brand.name}`}
                width={40}
                height={40}
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-teal-400 transition-colors">
                Red<span className="text-[#0D9488]">Educa</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              {FOOTER_CONFIG.brand.tagline}
            </p>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_CONFIG.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO Y REDES */}
          <div id="contacto" className="space-y-4 scroll-mt-24">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Contacto
            </h3>
            <div className="space-y-1.5 text-sm text-slate-400">
              <p>
                <a 
                  href={`mailto:${FOOTER_CONFIG.contact.email}`} 
                  className="text-slate-300 hover:text-teal-400 transition-colors font-medium"
                >
                  {FOOTER_CONFIG.contact.email}
                </a>
              </p>
              <p className="text-xs text-slate-500">
                {FOOTER_CONFIG.contact.supportNotice}
              </p>
            </div>
            
            <div className="pt-2">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Comunidad
              </span>
              <div className="flex items-center gap-3">
                {FOOTER_CONFIG.social.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Acceder al canal de ${social.name}`}
                      className={`text-slate-400 transition-all duration-200 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:scale-110 ${social.hoverColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMNA 4: MARCO LEGAL */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Legales
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_CONFIG.legals.map((legal) => (
                <li key={legal.name}>
                  <Link href={legal.href} className="text-slate-400 hover:text-teal-400 transition-colors">
                    {legal.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* DERECHOS RESERVADOS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>RedEduca &copy; {currentYear}. Todos los derechos reservados.</p>
          <p className="text-slate-600">Plataforma y ecosistema de gestión escolar</p>
        </div>

      </div>
    </footer>
  );
}