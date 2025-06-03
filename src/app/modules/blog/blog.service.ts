import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { generateSlug } from "../../utils/slug";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const slug = generateSlug(payload.title);
  const existing = await Blog.findOne({ slug, is_deleted: false });
  if (existing) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "A blog with this title already exists."
    );
  }
  payload.slug = slug;
  return Blog.create(payload);
};

const getAllBlogs = async (): Promise<IBlog[]> => {
  return Blog.find({ is_deleted: false }).sort({ createdAt: -1 });
};

const getSingleBlog = async (id: string): Promise<IBlog> => {
  const blog = await Blog.findOne({ _id: id, is_deleted: false });
  if (!blog) throw new AppError(StatusCodes.NOT_FOUND, "Blog not found.");
  return blog;
};

const updateBlog = async (id: string, data: Partial<IBlog>): Promise<IBlog> => {
  const blog = await Blog.findOneAndUpdate(
    { _id: id, is_deleted: false },
    data,
    { new: true }
  );
  if (!blog)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Blog not found or already deleted."
    );
  return blog;
};

const softDeleteBlog = async (id: string): Promise<IBlog> => {
  const blog = await Blog.findOneAndUpdate(
    { _id: id, is_deleted: false },
    { is_deleted: true },
    { new: true }
  );
  if (!blog)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Blog not found or already deleted."
    );
  return blog;
};

const getBlogBySlug = async (slug: string): Promise<IBlog> => {
  const blog = await Blog.findOne({ slug, is_deleted: false });
  if (!blog) throw new AppError(StatusCodes.NOT_FOUND, "Blog not found.");
  return blog;
};

const updateBlogBySlug = async (
  slug: string,
  data: Partial<IBlog>
): Promise<IBlog> => {
  const blog = await Blog.findOneAndUpdate({ slug, is_deleted: false }, data, {
    new: true,
  });
  if (!blog)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Blog not found or already deleted."
    );
  return blog;
};

const softDeleteBlogBySlug = async (slug: string): Promise<IBlog> => {
  const blog = await Blog.findOneAndUpdate(
    { slug, is_deleted: false },
    { is_deleted: true },
    { new: true }
  );
  if (!blog)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Blog not found or already deleted."
    );
  return blog;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  softDeleteBlog,
  getBlogBySlug,
  updateBlogBySlug,
  softDeleteBlogBySlug,
};
