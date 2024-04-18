import Link from "next/link";
import { redirect } from "next/navigation";

import CopyToClipboard from "@/components/copy-to-clipboard";
import Pagination from "@/components/pagination";
import { createClient } from "@/lib/supabase/server";
import { dateTimeAgo } from "@/lib/utils";
import env from "@/data/env";

import FetchError from "./_components/fetch-error";

const URLS_PER_PAGE = 10;

export default async function MyUrls({
    searchParams,
}: Readonly<{ searchParams: Record<string, string> }>) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/");

    const page = Math.max(parseInt(searchParams.page ?? "") || 1, 1);
    const from = (page - 1) * URLS_PER_PAGE;
    const to = from + URLS_PER_PAGE - 1;

    const { data: urls, count } = await supabase
        .from("urls")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .range(from, to)
        .order("created_at", { ascending: false });

    if (!urls || !count) return <FetchError />;

    return (
        <main className="mx-auto flex w-[92.5%] flex-col items-center gap-y-8 py-8">
            <div className="flex w-full max-w-xl flex-col items-center gap-y-4 lg:max-w-2xl">
                {urls.map(({ id, url, created_at }) => {
                    const shortenedUrl = `${env.NEXT_PUBLIC_BASE_URL}/${id}`;

                    return (
                        <div
                            key={id}
                            className="flex w-full flex-col gap-y-1.5 rounded-lg border p-3"
                        >
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

                                <CopyToClipboard
                                    className="absolute right-0 top-1/2 -translate-y-1/2"
                                    text={shortenedUrl}
                                />
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
            </div>

            <Pagination data={{ count, page, perPage: URLS_PER_PAGE }} />
        </main>
    );
}
