"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type NextThemesProviderProps = Parameters<typeof NextThemesProvider>[0];

interface ThemeProviderProps extends NextThemesProviderProps {
    children: React.ReactNode;
}

export default function ThemeProvider(props: Readonly<ThemeProviderProps>) {
    return <NextThemesProvider {...props} />;
}
