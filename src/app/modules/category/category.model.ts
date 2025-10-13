import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";
const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

export const Category = model<ICategory>("Category", CategorySchema);
