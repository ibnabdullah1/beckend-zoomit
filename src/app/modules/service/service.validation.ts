import { z } from "zod";

const buttonSchema = z.object({
  text: z.string(),
  link: z.string(),
});

const imageOptionSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

const faqOptionSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const benefitOptionSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  image: z.string(),
});

const priceOptionSchema = z.object({
  title: z.string(),
  originalPrice: z.string(),
  discountedPrice: z.string(),
  description: z.string(),
  features: z.array(z.string()),
});

export const serviceValidation = {
  create: z.object({
    body: z.object({
      theme_id: z.number(),
      content: z.object({
        banner: z.object({
          title: z.string(),
          description: z.string(),
          image: z.string(),
          button: buttonSchema,
        }),
        featureBanner: z.object({
          title: z.string(),
          description: z.string(),
          image: z.string(),
          button: buttonSchema,
        }),
        features: z.object({
          title: z.string(),
          description: z.string(),
          options: z.array(imageOptionSchema),
        }),
        faqs: z.object({
          title: z.string(),
          description: z.string(),
          image: z.string(),
          button: buttonSchema,
          options: z.array(faqOptionSchema),
        }),
        benefits: z.object({
          title: z.string(),
          description: z.string(),
          options: z.array(benefitOptionSchema),
        }),
        price: z.object({
          title: z.string(),
          description: z.string(),
          options: z.array(priceOptionSchema),
        }),
      }),
      seo_content: z.object({
        seo_title: z.string(),
        meta_description: z.string(),
        url_slug: z.string(),
        keywords: z.string(),
      }),
    }),
  }),
};
