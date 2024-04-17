"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";

import type { Tables } from "@/types/supabase";

import ShortenerForm from "./shortener-form";
import ShortenerDialog from "./sortener-dialog";

interface ShortenerProps {
    user: User | null;
}

export default function Shortener({ user }: Readonly<ShortenerProps>) {
    const [data, setData] = useState<Tables<"urls"> | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleSuccess(values: Exclude<typeof data, null>) {
        setData(values);
        setIsOpen(true);
    }

    return (
        <>
            <ShortenerForm onSuccess={handleSuccess} />

            <ShortenerDialog data={data} user={user} open={isOpen} onOpenChange={setIsOpen} />
        </>
    );
}
