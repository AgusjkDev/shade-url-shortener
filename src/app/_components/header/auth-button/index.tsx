import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/server";

import SignInButon from "./signin-button";

export default async function AuthButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    async function signOut() {
        "use server";

        const supabase = createClient();

        await supabase.auth.signOut();
    }

    if (!user) {
        return <SignInButon />;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <PersonIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild disabled>
                    <Link href="/links">My links</Link>
                </DropdownMenuItem>

                <form action={signOut}>
                    <DropdownMenuItem asChild>
                        <button type="submit" className="w-full">
                            Logout
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
