import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import AppError from "../../errors/appError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { projectSearchableFields } from "./project.constant";
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import { generateSlug } from "../../utils/slug";
const createProject = async (payload: IProject) => {
  try {
    // Create project
    const createdProject = await Project.create({
      ...payload,
      slug: generateSlug(payload.title),
    });

    const populatedProject = await Project.findById(createdProject._id)
      .populate("tech_stacks") // <-- matches the field name in schema
      .select("-__v -createdAt -updatedAt");
    console.log("projects:", populatedProject?.toObject());

    return populatedProject || createdProject;
  } catch (err) {
    throw err;
  }
};

const getAllProjects = async (params: any, options: IPaginationOptions) => {
  const {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  } = paginationHelper.calculatePagination(options);
  const { keyword, ...filterData } = params;

  // Search condition
  const searchCondition =
    keyword && projectSearchableFields.length > 0
      ? {
          $or: projectSearchableFields.map((field) => ({
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

  const data = await Project.find(whereConditions)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit)
    .populate("tech_stacks")
    .select("-__v -createdAt -updatedAt");

  const total = await Project.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};
const updateProject = async (id: string, payload: any) => {
  try {
    const result = await Project.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).select("-__v -createdAt -updatedAt -_id");

    return result;
  } catch (err) {
    throw err;
  }
};
const deleteProject = async (id: string) => {
  try {
    // Find existing service by slug
    const existingProject = await Project.findOne({
      _id: new ObjectId(id),
      is_deleted: { $ne: true },
    });

    if (!existingProject) {
      throw new AppError(StatusCodes.NOT_FOUND, "Project is Not Found!");
    }

    // Proceed to update
    await Project.findOneAndUpdate(
      { _id: id },
      { is_deleted: true, is_drafted: false, is_published: false },
      { new: true }
    ).select("-__v -createdAt -updatedAt -_id");

    return;
  } catch (err) {
    console.error("Error updating service:", err);
    throw err;
  }
};

const getSingleProject = async (id: string) => {
  try {
    const result = await Project.findById(id).select(
      "-__v -createdAt -updatedAt -_id"
    );
    if (!result) {
      throw new AppError(StatusCodes.NOT_FOUND, "Project is Not Found!");
    }
    return result;
  } catch (err) {
    throw err;
  }
};
export const ProjectServices = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getSingleProject,
};
