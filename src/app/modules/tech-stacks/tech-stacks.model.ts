import { Schema, model } from 'mongoose';
import { ITechStack } from './tech-stacks.interface';



const techStacksSchema = new Schema<ITechStack>({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String }
});

const techStacksModel = model<ITechStack>('Tech-stacks', techStacksSchema);

export default techStacksModel;
