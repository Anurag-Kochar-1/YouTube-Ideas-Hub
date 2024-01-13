import z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1).max(150),
  lastName: z.string().min(1).max(150),
  email: z.string().email(),
  password: z.string().max(6).max(50),
});

export const loginSchema =  z.object({
    email: z.string().email(),
    password: z.string().max(6).max(50),
});
