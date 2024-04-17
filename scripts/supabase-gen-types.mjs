import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

// Use jiti to import typescript files
const env = createJiti(fileURLToPath(import.meta.url))("../src/data/env").default;
const supabaseProjectId = env.NEXT_PUBLIC_SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

execSync(
    `supabase gen types typescript --project-id "${supabaseProjectId}" --schema public > src/types/supabase.ts && pnpm run format`,
);
