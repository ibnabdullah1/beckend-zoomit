import { Schema, model, Document } from 'mongoose';

export interface ICaseStudiesModel extends Document {
  name: string;
  // add more fields here
}

const caseStudiesSchema = new Schema<ICaseStudiesModel>({
  name: { type: String, required: true },
  // add more fields here
});

const caseStudiesModel = model<ICaseStudiesModel>('Case-studies', caseStudiesSchema);

export default caseStudiesModel;
