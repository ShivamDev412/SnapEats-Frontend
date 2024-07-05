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

export const MenuItemSchema = z.object({
  image: z.any().refine(
    (value) => {
      if (value instanceof FileList) {
        return value.length > 0;
      }
      return value !== null && value !== undefined;
    },
    {
      message: "Image is required",
    }
  ),
  name: z.string().min(3, "Name is required"),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, "Price must be greater than 0")
      .refine((val) => val > 0, "Price is required and must be greater than 0")
  ),
  description: z.string().min(3, "Description is required"),
  isVeg: z.boolean().optional(),
  prepTime: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, "Preparation time is required")
      .refine((val) => val > 0, "Preparation time must be greater than 0")
  ),
  category: z.string().min(1, "Category is required"),
  options: z
    .array(
      z.object({
        id: z.string().uuid(),
        optionId: z.string().min(1, "Option is required"),
        isRequired: z.boolean().optional(),
        choices: z.array(
          z
            .object({
              choiceId: z.string().optional(),
              id: z.string().uuid(),
              name: z.string().optional(),
              additionalPrice: z.preprocess(
                (val) => Number(val),
                z
                  .number()
                  .min(0, "Additional price must be 0 or greater")
                  .refine(
                    (val) => val >= 0,
                    "Additional price is required and must be 0 or greater"
                  )
              ),
            })
            .refine(
              (data) => {
                return (
                  (data.choiceId && !data.name) || (!data.choiceId && data.name)
                );
              },
              {
                message:
                  "Either predefined choice or custom choice is required, but not both",
                path: ["choiceId"],
              }
            )
        ),
      })
    )
    .optional(),
});

export const StoreTimingSchema = z.object({
  openTime: z.string().min(1, "Open Time is required"),
  closeTime: z.string().min(1, "Close Time is required"),
});


export default RegisterStoreSchema;
