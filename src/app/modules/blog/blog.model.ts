import { model } from "mongoose";
import { IBlog } from "./blog.interface";

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
    },
    uuid: {
      type: String,
      unique: true,
      required: true,
    },
    sort_description: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    category: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    is_drafted: {
      type: Boolean,
      default: false,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seo: {
      meta_title: { type: String, default: "" },
      meta_description: { type: String, default: "" },
      meta_keywords: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Blog = model<IBlog>("Blog", blogSchema);
