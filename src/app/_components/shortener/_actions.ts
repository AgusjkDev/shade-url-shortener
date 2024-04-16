"use server";

import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { generateRandomId } from "@/lib/utils";
import { shortenFormSchema } from "@/data/schemas";

type ActionResponse<T> = { success: true; data: T } | { success: false; error: string };

export async function createShortenUrl(
    values: z.infer<typeof shortenFormSchema>,
): Promise<ActionResponse<Tables<"urls">>> {
    try {
        const parsed = await shortenFormSchema.safeParseAsync(values);
        if (!parsed.success) {
            return { success: false, error: "Invalid form fields." };
        }

        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from("urls")
            .insert({ id: generateRandomId(), user_id: user?.id, ...parsed.data })
            .select("*")
            .single();

        if (error) {
            return { success: false, error: "An error occurred! Please try again..." };
        }

        return { success: true, data };
    } catch (e) {
        console.error(e);

        return { success: false, error: "There was an unexpected error!" };
    }
}
