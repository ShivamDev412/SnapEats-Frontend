import z from "zod";
import { passwordComplexity } from "./AuthSchema";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .refine(passwordComplexity, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must match",
    path: ["confirmPassword"],
  });
export { ForgotPasswordSchema, ResetPasswordSchema };
