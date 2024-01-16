import { z } from "zod";

export const ideaFormSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string().optional(),
  categories: z
    .array(z.string())
    .min(1, { message: "Atleast 1 category is required" }),
  suggestedFor: z.array(z.string()).optional(),
});

export type IdeaFormSchemaType = z.infer<typeof ideaFormSchema>;
