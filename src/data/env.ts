import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export default createEnv({
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.string(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    emptyStringAsUndefined: true,
});
