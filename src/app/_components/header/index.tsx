import Link from "next/link";
import { Link2Icon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import AuthButton from "./auth-button";
import ThemeSwitch from "./theme-switch";

export default function Header() {
    return (
        <header className="flex items-center justify-between gap-x-1.5 border-b p-3 md:gap-x-2.5 md:px-5">
            <Link
                aria-label="Home"
                className={cn(buttonVariants({ variant: "outline", size: "icon" }), "shrink-0")}
                href="/"
            >
                <Link2Icon className="size-4" />
            </Link>

            <div className="flex gap-x-1.5 md:gap-x-2.5">
                <AuthButton />

                <ThemeSwitch />
            </div>
        </header>
    );
}
