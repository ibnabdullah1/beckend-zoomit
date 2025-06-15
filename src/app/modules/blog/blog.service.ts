import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { generateSlug } from "../../utils/slug";
import { blogSearchableFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

import { v4 as uuidv4 } from "uuid";

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const slug = generateSlug(payload.title);
  const uuid = uuidv4();

  const existing = await Blog.findOne({ slug, is_deleted: false });
  if (existing) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "A blog with this title already exists."
    );
  }

  payload.slug = slug;
  payload.uuid = uuid;

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
    .limit(limit)
    .populate({
      path: "author",
      select: "name email role isActive -_id",
    })
    .select("-_id");

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

const getSingleBlog = async (slug: string): Promise<IBlog> => {
  const blog = await Blog.findOne({ slug: slug, is_deleted: false });
  if (!blog) throw new AppError(StatusCodes.NOT_FOUND, "Blog not found.");
  return blog;
};

const updateBlog = async (
  slug: string,
  data: Partial<IBlog>
): Promise<IBlog> => {
  if (data?.title) {
    data.slug = generateSlug(data.title);
  }

  const blog = await Blog.findOneAndUpdate(
    { slug: slug, is_deleted: false },
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

const deleteBlog = async (slug: string): Promise<IBlog> => {
  const blog = await Blog.findOneAndUpdate(
    { slug, is_deleted: false },
    { is_deleted: true, is_drafted: false, is_published: false },
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
  updateBlog,
  getSingleBlog,
  deleteBlog,
};
