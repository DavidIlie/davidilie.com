import * as z from "zod";

export const commentSchema = z.object({
   slug: z.string(),
   comment: z.string().min(10).max(1000),
});
