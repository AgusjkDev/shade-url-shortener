"use client";

import { useState } from "react";
import { Link1Icon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface CopyToClipboardProps extends ButtonProps {
    text: string;
}

export function copyToClipboard(text: string, onSuccess?: () => void) {
    try {
        navigator.clipboard.writeText(text);
        toast({ description: "Successfully copied to clipboard." });
        if (onSuccess) onSuccess();
    } catch (_) {
        toast({
            description: "There was an unexpected error trying to copy to clipboard.",
            variant: "destructive",
        });
    }
}

export default function CopyToClipboard({
    className,
    text,
    variant = "outline",
    size = "icon",
    onClick,
    ...props
}: Readonly<CopyToClipboardProps>) {
    const [copied, setCopied] = useState<boolean>(false);

    return (
        <Button
            className={cn("size-6", className)}
            variant={variant}
            size={size}
            onClick={e => {
                copyToClipboard("text", () => setCopied(true));
                if (onClick) onClick(e);
            }}
            {...props}
        >
            {copied ? <Check className="size-3.5" /> : <Link1Icon className="size-3.5" />}
        </Button>
    );
}
