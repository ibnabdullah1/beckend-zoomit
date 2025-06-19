import { z } from "zod";

// Enum values for status
const projectStatusEnum = z.enum(["In Production", "Development", "Archived"]);

// Base schema
const baseProjectSchema = {
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description is required"),
  tech_stack: z
    .array(z.string())
    .nonempty("At least one tech stack item is required"),
  client_name: z.string().optional(),
  features: z.array(z.string()).nonempty("At least one feature is required"),
  image: z.string("Image is required"),
  url: z.string().url("URL must be a valid URL"),
  year: z.number().int().min(2000).max(new Date().getFullYear()),
  status: projectStatusEnum,
};

// Create validation schema (all required except client_name)
const create = z.object({
  body: z.object(baseProjectSchema),
});

// Update validation schema (all fields optional, but validated if provided)
const update = z.object({
  body: z.object({
    ...Object.fromEntries(
      Object.entries(baseProjectSchema).map(([key, value]) => [
        key,
        value.optional(),
      ])
    ),
  }),
});

// Export for route/controller use
export const projectValidations = {
  create,
  update,
};
