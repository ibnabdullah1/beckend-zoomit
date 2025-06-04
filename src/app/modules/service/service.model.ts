import { Schema, model } from "mongoose";
import { IService } from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    theme_id: { type: Number, required: true },
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
            original_price: String,
            discounted_price: String,
            description: String,
            features: [String],
          },
        ],
      },
      more_info: {
        content: String,
      },
    },
    seo_content: {
      seo_title: String,
      meta_description: String,
      canonical_url: String,
      og_image: String,
      service_slug: {
        type: String,
        unique: true,
      },
      keywords: String,
    },
    is_published: { type: Boolean, default: false },
    is_drafted: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    createdBy: String,
  },
  { timestamps: true, versionKey: false }
);

export const Service = model<IService>("Service", serviceSchema);
