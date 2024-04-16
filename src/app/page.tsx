import { createClient } from "@/lib/supabase/server";

import Shortener from "./_components/shortener";

export default async function Index() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="mx-auto flex h-full w-[92.5%] flex-col items-center justify-center">
            <main className="flex w-full max-w-xl flex-col items-center gap-y-6">
                <h1 className="text-center text-title">Shade Url Shortener</h1>

                <Shortener user={user} />
            </main>
        </div>
    );
}
