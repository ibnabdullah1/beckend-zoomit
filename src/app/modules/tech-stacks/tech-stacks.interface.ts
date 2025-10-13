
import { Document } from "mongoose";
export interface ITechStack extends Document {
  name: string;
  description?: string;
  logo?: string
}
