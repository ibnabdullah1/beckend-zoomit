import { Schema, model, Types } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    short_description: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    client_name: { type: String },
    client_logo: { type: String },
    year: { type: Number },
    status: {
      type: String,
      enum: ["In Production", "Development", "Archived"],
      default: "Development",
    },
    image: { type: String },
    url: { type: String },
    features: { type: [String], default: [] },
    tech_stack: [
      {
        type: Types.ObjectId,
        ref: "Tech-stacks",
      },
    ],
    seo: {
      meta_title: { type: String },
      meta_description: { type: String },
      meta_keywords: { type: String },
    },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Project = model<IProject>("Project", projectSchema);
