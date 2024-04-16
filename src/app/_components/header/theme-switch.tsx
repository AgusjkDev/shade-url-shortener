"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";

export default function ThemeSwitch() {
    const mounted = useMounted();
    const { resolvedTheme, setTheme } = useTheme();

    function handleTheme() {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    }

    if (!mounted) {
        return <Skeleton className="size-9" />;
    }

    return (
        <Button aria-label="Switch theme" variant="outline" size="icon" onClick={handleTheme}>
            {resolvedTheme === "light" ? (
                <MoonIcon className="size-4" />
            ) : (
                <SunIcon className="size-4" />
            )}
        </Button>
    );
}
