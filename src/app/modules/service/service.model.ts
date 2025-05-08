import { Schema, model } from "mongoose";
import { IService } from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    theme_id: { type: Number, required: true },
    content: {
      content: {
        banner: {
          title: String,
          description: String,
          image: String,
          button: {
            text: String,
            link: String,
          },
        },
        featureBanner: {
          title: String,
          description: String,
          image: String,
          button: {
            text: String,
            link: String,
          },
        },
        features: {
          title: String,
          description: String,
          options: [
            {
              title: String,
              description: String,
              image: String,
            },
          ],
        },
        faqs: {
          title: String,
          description: String,
          image: String,
          button: {
            text: String,
            link: String,
          },
          options: [
            {
              question: String,
              answer: String,
            },
          ],
        },
        benefits: {
          title: String,
          description: String,
          options: [
            {
              title: String,
              description: String,
              link: String,
              image: String,
            },
          ],
        },
        price: {
          title: String,
          description: String,
          options: [
            {
              title: String,
              originalPrice: String,
              discountedPrice: String,
              description: String,
              features: [String],
            },
          ],
        },
      },
    },
    seo_content: {
      seo_title: String,
      meta_description: String,
      url_slug: String,
      keywords: String,
    },
  },
  { timestamps: true }
);

export const Service = model<IService>("Service", serviceSchema);
