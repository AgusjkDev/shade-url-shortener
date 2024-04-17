"use client";

import Link from "next/link";
import type { DialogProps } from "@radix-ui/react-dialog";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CopyToClipboard, { copyToClipboard } from "@/components/copy-to-clipboard";
import { useMounted } from "@/hooks/use-mounted";
import type { Tables } from "@/types/supabase";

interface ShortenerDialogProps extends Required<Pick<DialogProps, "open" | "onOpenChange">> {
    data: Tables<"urls"> | null;
    user: User | null;
}

export default function ShortenerDialog({ data, user, ...props }: Readonly<ShortenerDialogProps>) {
    const mounted = useMounted();

    if (!mounted) return null;

    const shortenedUrl = `${origin}/${data?.id}`;

    return (
        <Dialog {...props}>
            <DialogContent className="w-[92.5%]">
                <DialogHeader>
                    <DialogTitle>Your shortened url</DialogTitle>

                    <DialogDescription>
                        {user ? (
                            <span>
                                You can visit all your shortened urls&nbsp;
                                <Link
                                    className="underline underline-offset-2 transition-colors hover:text-foreground"
                                    href="/my-urls"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    here
                                </Link>
                                &#46;
                            </span>
                        ) : (
                            "Since you are not logged in, this is your only chance to copy the shortened url. Hurry up!"
                        )}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col gap-y-2">
                        <Label>Shortened url</Label>

                        <div className="relative">
                            <div className="flex h-9 items-center rounded-md border px-3 py-1 text-sm">
                                <span>{shortenedUrl}</span>
                            </div>

                            <CopyToClipboard
                                className="absolute right-1.5 top-1/2 -translate-y-1/2"
                                text={shortenedUrl}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label>Original url</Label>

                        <Input disabled value={data?.url} />
                    </div>

                    <Button
                        className="self-start"
                        onClick={() => {
                            copyToClipboard(shortenedUrl);
                            props.onOpenChange(false);
                        }}
                    >
                        Copy and close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
