"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SignInButon() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = createClient();

    async function handleSignIn() {
        setIsLoading(true);

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${origin}/auth/callback` },
        });
    }

    return (
        <Button className="w-40" disabled={isLoading} variant="outline" onClick={handleSignIn}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 size-4 animate-spin" />

                    <span>Please wait</span>
                </>
            ) : (
                "Sign in with Google"
            )}
        </Button>
    );
}
