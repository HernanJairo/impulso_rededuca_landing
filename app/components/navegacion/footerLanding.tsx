import React from 'react';
import Image from 'next/image';

const FacebookIcon = ({ className }: { className?: string }) => (
<svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
</svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
<svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
</svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
<svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.9 5.86L2.5 21.5l3.78-1.35C7.88 21.32 9.88 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.83 0-3.53-.55-4.95-1.49l-.35-.23-2.23.8.8-2.18-.26-.38A7.94 7.94 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.23-6.02c-.23-.12-1.38-.68-1.59-.76-.21-.08-.37-.12-.52.12-.16.23-.61.76-.75.92-.14.16-.28.18-.51.06-.23-.12-.98-.36-1.87-1.15-.69-.62-1.16-1.38-1.29-1.61-.14-.23-.01-.36.1-.47.1-.1.23-.28.35-.41.12-.14.16-.23.23-.39.08-.16.04-.3-.02-.42s-.52-1.26-.72-1.73c-.19-.45-.39-.39-.52-.4h-.45c-.16 0-.42.06-.64.3-.23.23-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.38-.56 1.58-1.1.2-.54.2-.1.14-.23-.06-.12-.23-.2-.46-.32z" clipRule="evenodd" />
</svg>
);

const XIcon = ({ className }: { className?: string }) => (
<svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
</svg>
);

export default function FooterLanding() {
const currentYear = new Date().getFullYear();

const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com', icon: FacebookIcon, hoverClass: 'hover:text-[#1877F2]' },
    { name: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon, hoverClass: 'hover:text-[#E4405F]' },
    { name: 'WhatsApp', href: 'https://www.whatsapp.com', icon: WhatsAppIcon, hoverClass: 'hover:text-[#25D366]' },
    { name: 'X', href: 'https://x.com', icon: XIcon, hoverClass: 'hover:text-white' },
];

return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-10">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* GRID DE 4 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">

          {/* COLUMNA 1: LOGO E INFO */}
        <div className="space-y-4">
            <a href="#inicio" className="inline-flex items-center gap-3 group">
            <Image
                src="/images/logo.webp"
                alt="Logo RedEduca"
                width={52}
                height={44}
                className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Red<span className="text-blue-500">Educa</span>
            </span>
            </a>
            <p className="text-base text-slate-400 leading-relaxed">
            Plataforma y ecosistema educativo inteligente para conectar toda tu comunidad escolar.
            </p>
        </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
        <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest text-slate-200 font-bold">Navegación</h3>
            <ul className="space-y-2.5 text-base">
                <li><a href="#inicio" className="text-slate-400 hover:text-blue-400 transition-colors">Inicio</a></li>
                <li><a href="#problema" className="text-slate-400 hover:text-blue-400 transition-colors">El Problema</a></li>
                <li><a href="#propuesta" className="text-slate-400 hover:text-blue-400 transition-colors">Propuesta de Valor</a></li>
                <li><a href="#comunidad" className="text-slate-400 hover:text-blue-400 transition-colors">Comunidad Educativa</a></li>
                <li><a href="#funcionamiento" className="text-slate-400 hover:text-blue-400 transition-colors">Cómo funciona</a></li>
            </ul>
        </div>

          {/* COLUMNA 3: CONTACTO (ancla del navbar) */}
        <div id="contacto" className="space-y-4 scroll-mt-24">
            <h3 className="text-sm uppercase tracking-widest text-slate-200 font-bold">Contacto</h3>
            <div className="space-y-2 text-base text-slate-400">
                <p>
                <a href="mailto:contacto@rededuca.com" className="hover:text-blue-400 transition-colors">
                contacto@rededuca.com
                </a>
            </p>
            <p>Soporte institucional activo</p>
            </div>
            <div className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Síguenos</span>
                <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`text-slate-400 transition-all duration-200 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 hover:scale-110 ${social.hoverClass}`}
                    >
                    <IconComponent className="w-6 h-6" />
                    </a>
                );
                })}
            </div>
            </div>
        </div>

          {/* COLUMNA 4: LEGALES / PRIVACIDAD */}
        <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest text-slate-200 font-bold">Legales</h3>
            <ul className="space-y-2.5 text-base">
                <li><a href="#privacidad" className="text-slate-400 hover:text-blue-400 transition-colors">Aviso de Privacidad</a></li>
                <li><a href="#terminos" className="text-slate-400 hover:text-blue-400 transition-colors">Términos y Condiciones</a></li>
                <li><a href="#cookies" className="text-slate-400 hover:text-blue-400 transition-colors">Política de Cookies</a></li>
            </ul>
        </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 text-center text-sm text-slate-400 font-medium">
            <p>RedEduca © {currentYear}. Todos los derechos reservados.</p>
        </div>

    </div>
    </footer>
);
}