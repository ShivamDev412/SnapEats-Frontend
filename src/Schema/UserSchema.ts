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
const AddressSchema = z.object({
  apt: z.optional(z.string()),
  block: z.optional(z.string()),
  address: z.string().min(1, "Address is required"),
  type: z.string().min(1, "Type is required"),
  lat: z.number(),
  lon: z.number(),
});
const PhoneNumberSchema = z.object({
  countryCode: z.string().min(1, "Country Code is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .max(10, "Phone Number must of 10 digits"),
});
const UpdateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .regex(/^[a-zA-Z]+$/, "Name should only contain letters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .regex(/^[a-zA-Z]+$/, "Name should only contain letters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  profilePicture: z.any().optional(),
});
export {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  AddressSchema,
  PhoneNumberSchema,
  UpdateProfileSchema,
};
