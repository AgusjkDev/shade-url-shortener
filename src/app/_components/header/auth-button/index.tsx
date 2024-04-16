import { PersonIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import SignInButon from "./signin-button";

export default async function AuthButton() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <SignInButon />;
    }

    return (
        <Button disabled variant="outline" size="icon">
            <PersonIcon className="size-4" />
        </Button>
    );
}
