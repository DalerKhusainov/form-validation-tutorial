import { z } from "zod";

// creating zod schema
export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    // connecting to confirmPassword field
    // it could be connected to a multiple inputs
    path: ["confirmPassword"],
  });

// creating a typescript type for signUpSchema
export type TSignUpSchema = z.infer<typeof signUpSchema>;
// it will take signUpSchema and basically create a typescript out of that
// and why do we want that type?
// we doing it for type safety.
