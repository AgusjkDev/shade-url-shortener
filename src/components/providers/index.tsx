import ThemeProvider from "./theme-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
    return (
        <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
        >
            {children}
        </ThemeProvider>
    );
}
