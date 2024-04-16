"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SignInButon() {
    const supabase = createClient();

    async function handleSignIn() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${origin}/auth/callback` },
        });
    }

    return (
        <Button variant="outline" onClick={handleSignIn}>
            Sign in with Google
        </Button>
    );
}
