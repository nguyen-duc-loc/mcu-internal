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

export const statusOptions = ["proceeding", "completed"] as const;
export const CustomerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Customer name is required." })
    .max(50, { message: "Customer name cannot exceed 50 characters." }),
  status: z.enum(statusOptions, {
    message: `Invalid status. Available statuses are ${statusOptions.join(
      ", "
    )}.`,
  }),

  funding: z.number().min(0, { message: "Funding cannot be negative." }),

  proservice: z.number().min(0, { message: "Proservice cannot be negative." }),

  credit: z.number().min(0, { message: "Credit cannot be negative." }),

  endDate: z.optional(z.string()),

  win: z.boolean(),
});
export type CustomerData = z.infer<typeof CustomerSchema>;

export const roleOptions = ["admin", "editor", "viewer"] as const;
export const UserSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50, { message: "Password cannot exceed 50 characters." }),

  role: z.enum(roleOptions, {
    message: `Invalid role. Available roles are ${roleOptions.join(", ")}.`,
  }),
});
export type UserData = z.infer<typeof UserSchema>;

export const UpdateUserInformationSchema = UserSchema.omit({
  role: true,
  password: true,
});
export type UpdateUserInformationData = z.infer<
  typeof UpdateUserInformationSchema
>;

export const UpdatePasswordSchema = UserSchema.pick({
  password: true,
})
  .extend({
    confirmPassword: UserSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>;

export const AppearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
});
export type AppearanceData = z.infer<typeof AppearanceSchema>;
