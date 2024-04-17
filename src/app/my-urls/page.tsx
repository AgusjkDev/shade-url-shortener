import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { dateTimeAgo } from "@/lib/utils";
import env from "@/data/env";

import CopyToClipboard from "./_components/copy-to-clipboard";
import FetchError from "./_components/fetch-error";

export default async function MyUrls() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/");

    const { data: urls } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (!urls) return <FetchError />;

    return (
        <main className="mx-auto flex w-[92.5%] max-w-xl flex-col gap-y-4 py-8 lg:max-w-2xl">
            {urls.map(({ id, url, created_at }) => {
                const shortenedUrl = `${env.NEXT_PUBLIC_BASE_URL}/${id}`;

                return (
                    <div key={id} className="flex flex-col gap-y-1.5 rounded-lg border p-3">
                        <div className="relative py-1 pr-9">
                            <h3 className="break-words text-sm font-semibold">
                                <Link
                                    className="underline-offset-2 hover:underline"
                                    href={shortenedUrl}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {shortenedUrl}
                                </Link>
                            </h3>

                            <CopyToClipboard text={shortenedUrl} />
                        </div>

                        <Link
                            className="break-words text-xs text-muted-foreground underline-offset-2 hover:underline"
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {url}
                        </Link>

                        <span className="mt-1 text-right text-xs text-muted-foreground">
                            Created {dateTimeAgo(new Date(created_at))}
                        </span>
                    </div>
                );
            })}
        </main>
    );
}
