'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
    children: ReactNode;
  /** Desde dónde aparece el contenido. */
    direction?: Direction;
  /** Retraso en ms, útil para escalonar tarjetas (0, 100, 200...). */
    delay?: number;
    className?: string;
}

/**
 * Un único IntersectionObserver compartido por todos los Reveal de la página:
 * es más liviano que crear uno por elemento.
 */
const callbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
    if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
        (entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            callbacks.get(entry.target)?.();
            callbacks.delete(entry.target);
            sharedObserver?.unobserve(entry.target);
        }
        },
        { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );
    }
    return sharedObserver;
}

export default function Reveal({
    children,
    direction = 'up',
    delay = 0,
    className,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se marca por atributo directo en el DOM: no provoca re-render de React.
    const show = () => el.setAttribute('data-revealed', '');

    // Navegadores sin IntersectionObserver: se muestra todo sin animar.
    if (typeof IntersectionObserver === 'undefined') {
        show();
        return;
    }

    const observer = getObserver();
    callbacks.set(el, show);
    observer.observe(el);

    return () => {
        observer.unobserve(el);
        callbacks.delete(el);
    };
    }, []);

const style =
    delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

return (
    <div ref={ref} data-reveal={direction} style={style} className={className}>
        {children}
    </div>
    );
}