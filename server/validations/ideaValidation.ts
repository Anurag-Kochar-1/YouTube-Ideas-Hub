import z from "zod";

export const ideaSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  categories: z.array(z.string()).min(1),
  suggestedFor: z.array(z.string()).optional(),
});
