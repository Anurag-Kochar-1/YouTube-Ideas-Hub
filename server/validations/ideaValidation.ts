import z from "zod";
import { IdeaStatus } from "../constants/idea-status.enum";

export const ideaSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000).optional(),
  category: z.string(),
  // status: z.nativeEnum(IdeaStatus),
});
