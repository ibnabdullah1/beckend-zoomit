export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  is_drafted?: boolean;
  is_published?: boolean;
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
