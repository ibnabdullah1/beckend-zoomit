import { Types } from "mongoose";

export interface IBlog {
  _id?: string;
  uuid?: string;
  title: string;
  sort_description?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  is_drafted?: boolean;
  is_published?: boolean;
  is_deleted?: boolean;
  author: Types.ObjectId | string;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
