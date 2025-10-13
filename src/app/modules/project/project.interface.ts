import { Types } from "mongoose";

export interface IProject {
  title: string;
  short_description: string;
  description?: string;
  category?: string;
  client_name?: string;
  client_logo?: string;
  year?: number;
  status: "In Production" | "Development" | "Archived";
  image?: string;
  url?: string;
  features?: string[];
  tech_stacks?: Types.ObjectId[]; // now references TechStack model
  seo?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
  };
  is_deleted?: boolean;
}
