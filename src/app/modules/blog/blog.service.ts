import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { generateSlug } from "../../utils/slug";
import { blogSearchableFields } from "./blog.constant";
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

const getAllBlogs = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { keyword, ...filterData } = params;

  // Search condition
  const searchCondition =
    keyword && blogSearchableFields.length > 0
      ? {
          $or: blogSearchableFields.map((field) => ({
            [field]: { $regex: keyword, $options: "i" },
          })),
        }
      : {};

  // Filter condition
  const filterCondition =
    Object.keys(filterData).length > 0
      ? {
          $and: Object.entries(filterData).map(([key, value]) => ({
            [key]: value,
          })),
        }
      : {};

  const whereConditions = {
    ...searchCondition,
    ...filterCondition,
    is_deleted: { $ne: true },
  };

  const data = await Blog.find(whereConditions)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

const getSingleBlog = async (id: string): Promise<IBlog> => {
  const blog = await Blog.findOne({ _id: id, is_deleted: false });
  if (!blog) throw new AppError(StatusCodes.NOT_FOUND, "Blog not found.");
  return blog;
};

const updateBlog = async (id: string, data: Partial<IBlog>): Promise<IBlog> => {
  if (data?.title) {
    data.slug = generateSlug(data.title);
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: id, is_deleted: false },
    data,
    { new: true }
  );

  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Blog not found or already deleted."
    );
  }

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
