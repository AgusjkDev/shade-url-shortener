import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import Providers from "@/components/providers";

import Header from "./_components/header";

import "@/styles/globals.css";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Shade Url Shortener",
    description: "Description",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    GeistSans.variable,
                    "grid h-screen grid-rows-[auto_1fr] bg-background font-sans text-foreground antialiased",
                )}
            >
                <Providers>
                    <Header />

                    <div className="overflow-y-auto scroll-smooth">{children}</div>
                </Providers>
            </body>
        </html>
    );
}
