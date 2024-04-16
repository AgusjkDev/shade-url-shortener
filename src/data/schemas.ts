import { z } from "zod";

import regex from "./regex";

export const shortenFormSchema = z.object({
    url: z.string().regex(regex.url, {
        message: "Invalid URL format!",
    }),
});
