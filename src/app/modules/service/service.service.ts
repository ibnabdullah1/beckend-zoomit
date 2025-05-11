import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { serviceSearchableFields } from "./service.constant";
import { IService } from "./service.interface";
import { Service } from "./service.model";

const createService = async (payload: IService) => {
  try {
    const result = await Service.create(payload);
    return result;
  } catch (err) {
    console.error("Error creating service:", err);
    throw err;
  }
};
export const getAllService = async (
  params: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { keyword, ...filterData } = params;

  // Search condition
  const searchCondition =
    keyword && serviceSearchableFields.length > 0
      ? {
          $or: serviceSearchableFields.map((field) => ({
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
  };

  const data = await Service.find(whereConditions)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};
const getSingleService = async (slug: string) => {
  try {
    const result = await Service.findOne({
      "seo_content.url_slug": slug,
    }).select("-__v -createdAt -updatedAt -_id");
    return result;
  } catch (err) {
    console.error("Error fetching service:", err);
    throw err;
  }
};
const updateSingleService = async (slug: string, payload: any) => {
  try {
    const result = await Service.findOneAndUpdate(
      { "seo_content.url_slug": slug },
      // { service_slug: slug },
      payload,
      { new: true }
    ).select("-__v -createdAt -updatedAt -_id");

    if (!result) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    return result;
  } catch (err) {
    console.error("Error updating service:", err);
    throw err;
  }
};

export const ServiceServices = {
  createService,
  getAllService,
  getSingleService,
  updateSingleService,
};
