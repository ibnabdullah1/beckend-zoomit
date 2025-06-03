import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import AppError from "../../errors/appError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { serviceSearchableFields } from "./service.constant";
import { IService } from "./service.interface";
import { Service } from "./service.model";

const createService = async (payload: IService) => {
  try {
    const existing = await Service.findOne({
      "seo_content.service_slug": payload.seo_content.service_slug,
    });
    if (existing) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "A service with this slug already exists."
      );
    }
    const result = await Service.create(payload);
    return result;
  } catch (err) {
    console.error("Error creating service:", err);
    throw err;
  }
};
const saveDraftService = async (payload: IService) => {
  try {
    if (payload?.seo_content) {
      const existing = await Service.findOne({
        "seo_content.service_slug": payload.seo_content.service_slug,
      });
      if (existing) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "A service with this slug already exists."
        );
      }
    }
    const result = await Service.create(payload);
    return result;
  } catch (err) {
    console.error("Error creating service:", err);
    throw err;
  }
};
const getAllService = async (params: any, options: IPaginationOptions) => {
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
    is_deleted: { $ne: true },
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
      "seo_content.service_slug": slug,
    }).select("-__v -createdAt -updatedAt -_id");

    if (!result) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }
    return result;
  } catch (err) {
    console.error("Error fetching service:", err);
    throw err;
  }
};
const singleDraftService = async (id: string) => {
  try {
    const result = await Service.findOne({
      _id: id,
      is_draft: true,
    }).select("-__v -createdAt -updatedAt");

    if (!result) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }
    return result;
  } catch (err) {
    console.error("Error fetching service:", err);
    throw err;
  }
};
const updateDraftSingleService = async (id: string, payload: any) => {
  try {
    // Find existing service by slug
    const existingService = await Service.findOne({
      _id: id,
    });

    if (!existingService) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    // Check for duplicate seo_content.url_slug
    if (payload.seo_content?.service_slug) {
      const duplicateUrlSlug = await Service.findOne({
        "seo_content.service_slug": payload.seo_content.service_slug,
        _id: { $ne: existingService._id },
      });

      if (duplicateUrlSlug) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "Another service with this URL slug already exists."
        );
      }
    }

    // Proceed to update
    const result = await Service.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).select("-__v -createdAt -updatedAt -_id");

    return result;
  } catch (err) {
    console.error("Error updating service:", err);
    throw err;
  }
};
const updateSingleService = async (slug: string, payload: any) => {
  try {
    // Find existing service by slug
    const existingService = await Service.findOne({
      "seo_content.service_slug": slug,
    });

    if (!existingService) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    // Check for duplicate seo_content.url_slug
    if (payload.seo_content?.service_slug) {
      const duplicateUrlSlug = await Service.findOne({
        "seo_content.service_slug": payload.seo_content.service_slug,
        _id: { $ne: existingService._id },
      });

      if (duplicateUrlSlug) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "Another service with this URL slug already exists."
        );
      }
    }

    // Proceed to update
    const result = await Service.findOneAndUpdate(
      { "seo_content.service_slug": slug },
      payload,
      { new: true }
    ).select("-__v -createdAt -updatedAt -_id");

    return result;
  } catch (err) {
    console.error("Error updating service:", err);
    throw err;
  }
};
const deleteService = async (id: string) => {
  try {
    // Find existing service by slug
    const existingService = await Service.findOne({
      _id: new ObjectId(id),
      is_deleted: { $ne: true },
    });

    if (!existingService) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    // Proceed to update
    await Service.findOneAndUpdate(
      { _id: id },
      { is_deleted: true, is_draft: false, is_published: false },
      { new: true }
    ).select("-__v -createdAt -updatedAt -_id");

    return;
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
  saveDraftService,
  singleDraftService,
  updateDraftSingleService,
  deleteService,
};
