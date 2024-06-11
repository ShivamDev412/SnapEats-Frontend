import { z } from "zod";

const RegisterStoreSchema = z.object({
  name: z
    .string()
    .min(3, "Store Name is required")
    .max(30, "Store Name should be less than 30 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Code is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .max(10, "Phone Number must of 10 digits"),
  address: z.string().min(1, "Address is required"),
  lat: z.number(),
  lon: z.number(),
});
export const UpdateStoreProfileSchema = z.object({
  name: z.string().min(3, "Store Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  image: z.any().optional(),
});
export default RegisterStoreSchema;
