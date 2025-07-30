import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    sort_description: { type: String, required: true },
    client_logo: { type: String, required: true },
    link: { type: String, required: true },
    status: {
      type: String,
      enum: ["In Production", "Development", "Archived"],
      default: "Development",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Project = model<IProject>("Project", projectSchema);
