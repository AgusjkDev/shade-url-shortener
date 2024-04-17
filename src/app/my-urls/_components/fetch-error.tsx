"use client";

import { toast } from "@/components/ui/use-toast";

export default function FetchError() {
    toast({
        description:
            "There was an unexpected error while getting your shortened urls! Please try again...",
        variant: "destructive",
    });

    return null;
}
