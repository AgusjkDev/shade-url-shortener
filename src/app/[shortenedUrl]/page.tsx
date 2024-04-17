import { notFound, redirect } from "next/navigation";

// Use supabase createClient client version to omit
// auth warnings since we don't need that stuff
import { createClient } from "@/lib/supabase/client";

export default async function ShortenedUrl({
    params: { shortenedUrl },
}: Readonly<{
    params: { shortenedUrl: string };
}>) {
    const supabase = createClient();
    const { data } = await supabase.from("urls").select("url").eq("id", shortenedUrl).single();

    return data ? redirect(data.url) : notFound();
}
