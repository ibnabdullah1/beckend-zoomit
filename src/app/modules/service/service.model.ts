import { Schema, model } from "mongoose";
import { IService } from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true },

    seo_content: {
      meta_title: { type: String },
      meta_description: { type: String },
      canonical_url: { type: String },
      keywords: { type: String },
      og_image: { type: String },
    },

    banner: {
      title: String,
      sub_title: String,
      description: String,
      background_image: String,
      button_text: String,
      button_link: String,
    },

    trusted_top_brands: {
      title: String,
      brands: [
        {
          name: String,
          logo: String,
        },
      ],
    },

    feature_banner: {
      title: String,
      description: String,
      image: String,
      button_text: String,
      button_link: String,
    },

    features: {
      title: String,
      description: String,
      button_text: String,
      button_link: String,
      options: [
        {
          title: String,
          description: String,
        },
      ],
    },

    stats: {
      background_image: String,
      stats: [
        {
          count: Number,
          suffix: String,
          label: String,
        },
      ],
    },

    key_benefits: {
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

    start_project_cta: {
      title: String,
      description: String,
      background_image: String,
      button_text: String,
      button_link: String,
      phone_number: String,
    },

    best_features: {
      title: String,
      description: String,
      options: [
        {
          title: String,
          description: String,
        },
      ],
    },

    tech_stack: {
      title: String,
      description: String,
      techs: [
        {
          name: String,
          url: String,
        },
      ],
    },

    pricing_plan: {
      title: String,
      description: String,
      plans: [
        {
          name: String,
          original_price: String,
          save: String,
          discounted_price: String,
          description: String,
          features: [String],
        },
      ],
    },

    conversion_focused_cta: {
      title: String,
      description: String,
      background_image: String,
      button_text: String,
      button_link: String,
      phone_number: String,
    },

    industries: {
      title: String,
      description: String,
      industries: [
        {
          name: String,
          icon: String,
        },
      ],
    },

    workflow: {
      title: String,
      description: String,
      button_text: String,
      button_link: String,
      steps: [
        {
          title: String,
          description: String,
        },
      ],
    },

    more_info: {
      content: String,
    },

    faqs: {
      title: String,
      description: String,
      image: String,
      options: [
        {
          question: String,
          answer: String,
        },
      ],
    },

    start_project_Form: {
      title: String,
      short_description: String,
      description: String,
      button_text: String,
      button_link: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Service = model<IService>("Service", serviceSchema);
