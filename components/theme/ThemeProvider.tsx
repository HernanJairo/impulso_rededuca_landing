'use client';

import type { ComponentProps } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Wrapper cliente de next-themes.
 * Existe para que app/layout.tsx pueda seguir siendo Server Component.
 */
export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
return <NextThemesProvider {...props} />;
}