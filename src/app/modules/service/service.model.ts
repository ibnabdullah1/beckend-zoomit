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
      serial_no: { type: Number, default: 1 },
      is_hidden: { type: Boolean, default: true },
      title: String,
      brands: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
    },

    feature_banner: {
      serial_no: { type: Number, default: 2 },
      is_hidden: { type: Boolean, default: true },
      title: String,
      description: String,
      image: String,
      button_text: String,
      button_link: String,
    },

    features: {
      serial_no: { type: Number, default: 3 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 4 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 5 },
      is_hidden: { type: Boolean, default: true },
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

    portfolio_overview: {
      serial_no: { type: Number, default: 16 },
      is_hidden: { type: Boolean, default: true },
      image: String,
      title: String,
      description: String,
      button_text: String,
      button_link: String,
    },

    start_project_cta: {
      serial_no: { type: Number, default: 6 },
      is_hidden: { type: Boolean, default: true },
      title: String,
      description: String,
      background_image: String,
      button_text: String,
      button_link: String,
      phone_number: String,
    },

    best_features: {
      serial_no: { type: Number, default: 7 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 8 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 9 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 10 },
      is_hidden: { type: Boolean, default: true },
      title: String,
      description: String,
      background_image: String,
      button_text: String,
      button_link: String,
      phone_number: String,
    },

    industries: {
      serial_no: { type: Number, default: 11 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 12 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 13 },
      is_hidden: { type: Boolean, default: true },
      title: { type: String, default: "More Info" },
      description: { type: String, default: "More Info" },
      content: String,
    },

    faqs: {
      serial_no: { type: Number, default: 14 },
      is_hidden: { type: Boolean, default: true },
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
      serial_no: { type: Number, default: 15 },
      is_hidden: { type: Boolean, default: true },
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
