
import { z } from "zod";

export const registerValidation = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(10, "Name must be 10 characters or less"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


