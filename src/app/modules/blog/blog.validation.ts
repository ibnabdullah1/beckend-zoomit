import { z } from "zod";

export const blogValidation = {
  create: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required"),
      content: z.string().min(1, "Content is required"),
      category: z.string().min(1, "Category is required"),
    }),
  }),

  update: z.object({
    body: z.object({
      title: z.string().optional(),
      content: z.string().optional(),
      category: z.string().optional(),
    }),
  }),
};
