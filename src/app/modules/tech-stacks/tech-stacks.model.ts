import { Schema, model } from 'mongoose';
import { ITechStack } from './tech-stacks.interface';

const techStacksSchema = new Schema<ITechStack>({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String }
});

export const TechStack = model<ITechStack>('TechStack', techStacksSchema);

