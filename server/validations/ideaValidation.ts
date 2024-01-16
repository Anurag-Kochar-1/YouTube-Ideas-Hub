import z from "zod";

export const ideaSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000).optional(),
  categories: z.array(z.string()),
  suggestedFor: z.array(z.string()).optional(),
});
