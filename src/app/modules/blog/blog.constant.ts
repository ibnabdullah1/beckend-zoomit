export const blogStatus = ["draft", "published"] as const;
export const blogFilterableFields = [
  "keyword",
  "is_drafted",
  "is_published",
  "is_deleted",
];
export const blogSearchableFields = ["name", "content"];
