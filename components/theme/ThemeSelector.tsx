'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

const OPTIONS = [
    { value: 'light', label: 'Claro', Icon: Sun },
    { value: 'dark', label: 'Oscuro', Icon: Moon },
    { value: 'system', label: 'Sistema', Icon: Monitor },
] as const;

const BUTTON_CLASSES = [
    'flex flex-col items-center gap-0.5 rounded-lg px-2 py-1',
    'text-foreground transition-colors hover:bg-surface-muted',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
].join(' ');

const MENU_CLASSES = [
    'absolute right-0 top-full z-50 mt-2 w-40 animate-fade-in',
    'rounded-xl border border-line bg-surface p-1 shadow-xl',
].join(' ');

const ITEM_BASE = [
    'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm',
    'transition-colors hover:bg-surface-muted',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
].join(' ');

export default function ThemeSelector() {
const { theme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);
const [open, setOpen] = useState(false);
const wrapperRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);

  // Evita diferencias entre servidor y cliente (hidratación)
useEffect(() => setMounted(true), []);

  // Cerrar al hacer clic afuera o con Escape
useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
        document.removeEventListener('pointerdown', onPointerDown);
        document.removeEventListener('keydown', onKeyDown);
    };
    }, [open]);

const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];
const CurrentIcon = mounted ? current.Icon : Monitor;
return (
    <div ref={wrapperRef} className="relative">
        <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={BUTTON_CLASSES}
        aria-label="Elegir modo de color"
        aria-haspopup="menu"
        aria-expanded={open}
        >
        <CurrentIcon className="h-5 w-5" aria-hidden="true" />
        <span className="text-[11px] font-medium leading-none text-muted">Modos</span>
        </button>

        {open && (
        <div role="menu" aria-label="Modo de color" className={MENU_CLASSES}>
            {OPTIONS.map(({ value, label, Icon }) => {
            const active = theme === value;
            return (
                <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                    setTheme(value);
                    setOpen(false);
                    buttonRef.current?.focus();
                }}
                className={`${ITEM_BASE} ${
                    active ? 'font-semibold text-brand-text' : 'text-foreground'
                }`}
                >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="flex-1 text-left">{label}</span>
                {active && <Check className="h-4 w-4" aria-hidden="true" />}
                </button>
            );
            })}
        </div>
        )}
    </div>
    );
}