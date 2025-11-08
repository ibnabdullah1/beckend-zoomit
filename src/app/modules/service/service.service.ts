import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { serviceSearchableFields } from "./service.constant";
import { IService } from "./service.interface";
import { Service } from "./service.model";

const createSlug = async (payload: IService) => {
  try {
    const existing = await Service.findOne({
      slug: payload.slug,
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
    throw err;
  }
};
const updateSlug = async (payload: any, slug: string) => {
  try {
    const existingService = await Service.findOne({ slug });
    if (!existingService) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Service with the specified slug does not exist."
      );
    }

    if (payload.slug && payload.slug !== slug) {
      const slugExists = await Service.exists({ slug: payload.slug });
      if (slugExists) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "A service with the new slug already exists."
        );
      }
    }

    const updatedService = await Service.findOneAndUpdate({ slug }, payload, {
      new: true,
      runValidators: true,
    });

    return updatedService;
  } catch (error) {
    console.error("Error updating service slug:", error);
    throw error;
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
  // .populate("brand", "logo name");

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

const getAllServicesForCards = async (
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
    is_deleted: { $ne: true },
  };

  const data = await Service.find(whereConditions)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit)
    .select("banner.background_image banner.sub_title banner.description slug");
  // .populate("brand", "logo name");

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
// const getSingleService = async (slug: string) => {
//   try {
//     const result = await Service.findOne({
//       slug,
//     })
//       .select("-__v -createdAt -updatedAt -_id")
//       .populate([
//         { path: "trusted_top_brands.brands", select: "logo name" },
//         {
//           path: "our_projects.projects",
//           select: "project_logo image title short_description",
//         },
//       ]);

//     if (!result) {
//       throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
//     }
//     return result;
//   } catch (err) {
//     console.error("Error fetching service:", err);
//     throw err;
//   }
// };
const getSingleService = async (slug: string) => {
  try {
    const result = await Service.findOne({
      slug,
      is_deleted: { $ne: true },
      status: "active",
    })
      .select("-__v -createdAt -updatedAt -_id")
      .populate([
        { path: "trusted_top_brands.brands", select: "logo name serial_no" },
        {
          path: "our_projects.projects",
          select: "project_logo image title short_description serial_no",
        },
      ]);

    if (!result) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    // Sort arrays by serial_no
    const sortBySerialNo = (arr: any[]) =>
      arr?.sort((a, b) => (a.serial_no || 0) - (b.serial_no || 0));

    if (result.trusted_top_brands?.brands) {
      result.trusted_top_brands.brands = sortBySerialNo(
        result.trusted_top_brands.brands
      );
    }

    if (result.features?.options) {
      result.features.options = sortBySerialNo(result.features.options);
    }

    if (result.stats?.stats) {
      result.stats.stats = sortBySerialNo(result.stats.stats);
    }

    if (result.key_benefits?.options) {
      result.key_benefits.options = sortBySerialNo(result.key_benefits.options);
    }

    if (result.our_projects?.projects) {
      result.our_projects.projects = sortBySerialNo(
        result.our_projects.projects
      );
    }

    return result;
  } catch (err) {
    console.error("Error fetching service:", err);
    throw err;
  }
};

const updateSingleService = async (slug: string, payload: any) => {
  try {
    const existingService: any = await Service.findOne({ slug });

    if (!existingService) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    if (payload.slug) {
      const duplicateUrlSlug = await Service.findOne({
        slug: payload.slug,
        _id: { $ne: existingService._id },
      });

      if (duplicateUrlSlug) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "Another service with this URL slug already exists."
        );
      }
    }
    // Section list
    const sections = [
      "banner",
      "trusted_top_brands",
      "feature_banner",
      "features",
      "stats",
      "key_benefits",
      "start_project_cta",
      "best_features",
      "tech_stack",
      "pricing_plan",
      "conversion_focused_cta",
      "industries",
      "workflow",
      "more_info",
      "faqs",
      "start_project_Form",
      "our_projects",
    ];

    // Serial Conflict Handling
    const targetSection = sections.find(
      (section) =>
        payload[section] && typeof payload[section].serial_no === "number"
    );

    if (targetSection) {
      const newSerial = payload[targetSection].serial_no;
      const currentSerial = existingService[targetSection]?.serial_no;

      // যদি নতুন serial পুরোনো serial থেকে আলাদা হয়
      if (newSerial !== currentSerial) {
        const conflictSectionKey = sections.find((section) => {
          if (section === targetSection) return false; // নিজের সেকশন বাদ
          const sec = existingService[section];
          return sec && typeof sec === "object" && sec.serial_no === newSerial;
        });

        // যদি conflict পাওয়া যায়, swap করে ফেলো
        if (conflictSectionKey) {
          await Service.updateOne(
            { slug },
            {
              $set: {
                [`${conflictSectionKey}.serial_no`]: currentSerial,
              },
            }
          );
        }
      }
    }

    // Flatten nested objects to dot notation
    const flattenObject = (obj: any, prefix = "") => {
      return Object.keys(obj).reduce((acc, key) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          Object.assign(acc, flattenObject(obj[key], newKey));
        } else {
          acc[newKey] = obj[key];
        }
        return acc;
      }, {} as Record<string, any>);
    };

    const dotNotatedPayload = flattenObject(payload);

    const result = await Service.findOneAndUpdate(
      { slug },
      { $set: dotNotatedPayload },
      { new: true }
    ).select("-__v -createdAt -updatedAt -_id");

    return result;
  } catch (err) {
    console.error("Error updating service:", err);
    throw err;
  }
};
const updateServiceSerial = async (slug: string, payload: any) => {
  try {
    const existingService: any = await Service.findOne({ slug });

    if (!existingService) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    // Section list
    const sections = [
      "banner",
      "pickup_corner",
      "trusted_top_brands",
      "feature_banner",
      "start_project_cta",
      "features",
      "key_benefits",
      "conversion_focused_cta",
      "best_features",
      "success_meters",
      "tech_stack",
      "customer_focused_cta",
      "stats",
      "portfolio_overview",
      "pricing_plan",
      "success_focused_cta",
      "industries",
      "our_projects",
      "workflow",
      "more_info",
      "faqs",
      "start_project_Form",
    ];

    // Collect serial changes from payload
    const serialUpdates: Record<string, number> = {};
    sections.forEach((section) => {
      if (payload[section]?.serial_no !== undefined) {
        serialUpdates[section] = payload[section].serial_no;
      }
    });

    if (Object.keys(serialUpdates).length > 0) {
      const TEMP_OFFSET = 1000;

      // Step 1: Assign temporary serial to avoid conflicts
      const tempSet: any = {};
      Object.keys(serialUpdates).forEach((section) => {
        tempSet[`${section}.serial_no`] = serialUpdates[section] + TEMP_OFFSET;
      });
      await Service.updateOne({ slug }, { $set: tempSet });

      // Step 2: Assign final serials
      const finalSet: any = {};
      Object.keys(serialUpdates).forEach((section) => {
        finalSet[`${section}.serial_no`] = serialUpdates[section];
      });
      await Service.updateOne({ slug }, { $set: finalSet });
    }

    const updatedService = await Service.findOne({ slug }).select(
      "-__v -createdAt -updatedAt -_id"
    );
    return updatedService;
  } catch (err) {
    console.error("Error updating service serials:", err);
    throw err;
  }
};

const deleteService = async (slug: string) => {
  try {
    // Find existing service by slug
    const existingService = await Service.findOne({
      slug,
      is_deleted: { $ne: true },
    });

    if (!existingService) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service is Not Found!");
    }

    // Proceed to update
    // await Service.deleteOne({ slug });

    await Service.updateOne(
      { slug },
      { $set: { is_deleted: true, status: false } }
    ).select("-__v -createdAt -updatedAt -_id");

    return;
  } catch (err) {
    console.error("Error updating service:", err);
    throw err;
  }
};
export const ServiceServices = {
  updateSlug,
  createSlug,
  getAllService,
  getSingleService,
  updateSingleService,
  deleteService,
  getAllServicesForCards,
  updateServiceSerial,
};
