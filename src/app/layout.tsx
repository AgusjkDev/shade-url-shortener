import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import Providers from "@/components/providers";

import Header from "./_components/header";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Shade Url Shortener",
    description: "Description",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={GeistSans.variable}>
                <Providers>
                    <Header />

                    {children}
                </Providers>
            </body>
        </html>
    );
}
