import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AUTHENTICATED = false;

export default function AuthButton() {
    if (!AUTHENTICATED) {
        return (
            <Link className={cn(buttonVariants({ variant: "outline" }), "w-24")} href="/login">
                Log In
            </Link>
        );
    }

    return (
        <Button disabled variant="outline" size="icon">
            <PersonIcon className="size-4" />
        </Button>
    );
}
