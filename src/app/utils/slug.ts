import slugify from "slugify";

export const generateSlug = (text: string): string => {
  return slugify(text, {
    lower: true,
    strict: false,
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  });
};
