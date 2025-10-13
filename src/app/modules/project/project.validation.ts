import { z } from "zod";

// Enum values for status
const projectStatusEnum = z.enum(["In Production", "Development", "Archived"]);

// SEO schema
const seoSchema = z.object({
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
});

// Base schema
const baseProjectSchema = {
  title: z.string().min(1, "Title is required"),
  short_description: z.string().min(1, "Short description is required"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(1, "Category is required"),
  tech_stack: z
    .array(z.string())
    .nonempty("At least one tech stack item is required"),
  client_name: z.string().optional(),
  client_logo: z.string().optional(),
  features: z
    .array(z.string())
    .nonempty("At least one feature is required"),
  image: z.string().nonempty("Image is required"),
  url: z.string().url("URL must be a valid URL"),
  year: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear(), "Year must be valid"),
  status: projectStatusEnum,
  seo: seoSchema.optional(),
  is_deleted: z.boolean().optional(),
};

// Create validation schema (all required except optional fields)
const create = z.object({
  body: z.object(baseProjectSchema),
});

// Update validation schema (all fields optional, but validated if provided)
const update = z.object({
  body: z.object(
    Object.fromEntries(
      Object.entries(baseProjectSchema).map(([key, value]) => [key, value.optional()])
    )
  ),
});

// Export for route/controller use
export const projectValidations = {
  create,
  update,
};
