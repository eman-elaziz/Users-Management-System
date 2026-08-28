import { z } from "zod";

export const userFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name must be less than 50 characters"),

  email: z.string().email("Please enter a valid email address"),

  gender: z.string().min(1, "Gender is required"),

  country: z.string().optional(),

  age: z
    .number()
    .min(18, "Age must be between 18-100")
    .max(100, "Age must be between 18-100"),

  category: z.string().min(1, "Category is required"),

  interests: z.array(z.string()).min(1, "Please select at least one interest"),
});

export type UserFormInput = z.input<typeof userFormSchema>;
export type UserFormOutput = z.output<typeof userFormSchema>;
