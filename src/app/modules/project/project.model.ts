import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    client_name: { type: String, required: false },
    tech_stack: { type: [String], required: true },
    features: { type: [String], required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    year: { type: Number, required: true },
    status: {
      type: String,
      enum: ["In Production", "Development", "Archived"],
      default: "Development",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Project = model<IProject>("Project", projectSchema);
