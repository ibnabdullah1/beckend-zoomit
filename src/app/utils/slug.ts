import slugify from "slugify";

export const generateSlug = (text: string) => {
 const rawSlug =  slugify(text, {
    lower: true,
    strict: false,
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  });
   return encodeURIComponent(rawSlug);
};
