import type { Metadata } from "next";

import Providers from "@/components/providers";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Shade Url Shortener",
    description: "Description",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
