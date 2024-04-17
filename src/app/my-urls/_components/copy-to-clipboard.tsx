"use client";

import { useState } from "react";
import { Link1Icon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface CopyToClipboardProps {
    text: string;
}

export default function CopyToClipboard({ text }: Readonly<CopyToClipboardProps>) {
    const [copied, setCopied] = useState<boolean>(false);

    function copyToClipboard() {
        try {
            navigator.clipboard.writeText(text);
            setCopied(true);
            toast({ description: "Successfully copied to clipboard." });
        } catch (_) {
            toast({
                description: "There was an unexpected error trying to copy to clipboard.",
                variant: "destructive",
            });
        }
    }

    return (
        <Button
            className="absolute right-0 top-1/2 size-6 -translate-y-1/2"
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
        >
            {copied ? <Check className="size-3.5" /> : <Link1Icon className="size-3.5" />}
        </Button>
    );
}
