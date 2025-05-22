import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50, { message: "Password cannot exceed 50 characters." }),
});
export type LoginData = z.infer<typeof LoginSchema>;
