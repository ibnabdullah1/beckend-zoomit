import { z } from "zod";

const createTechStack = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(50, "Name too long"),
    description: z.string().max(255, "Description too long").optional(),
    logo: z.string().max(255, "Logo URL too long").optional(),
  }),
});

const updateTechStack = z.object({
  body: z.object({
    name: z.string().min(1).max(50).optional(),
    description: z.string().max(255).optional(),
    logo: z.string().max(255).optional(),
  }),
});

export const techStacksValidation = {
  createTechStack,
  updateTechStack,
};
