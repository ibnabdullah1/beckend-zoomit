import { paginationHelper } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { inquiriesSearchableFields } from "./inquiries.constant";
import { IContactMessage, IQuotationRequest } from "./inquiries.interface";
import { ContactMessage, QuotationRequest } from "./inquiries.model";

// Contact Message Service

// Create
const createContactMessage = async (
  payload: IContactMessage
): Promise<IContactMessage> => {
  try {
    const result = await ContactMessage.create(payload);
    return result;
  } catch (err) {
    console.error("Error creating contact message:", err);
    throw err;
  }
};

const allContactMessage = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { keyword, ...filterData } = params;

  // Search condition
  const searchCondition =
    keyword && inquiriesSearchableFields.length > 0
      ? {
          $or: inquiriesSearchableFields.map((field) => ({
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

  const data = await ContactMessage.find(whereConditions)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const total = await ContactMessage.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

// Quotation Requests Service
const createQuotationRequest = async (
  payload: IQuotationRequest
): Promise<IQuotationRequest> => {
  try {
    const result = await QuotationRequest.create(payload);
    return result;
  } catch (err) {
    console.error("Error creating quotation request:", err);
    throw err;
  }
};

const allQuotationRequest = async (
  params: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { keyword, ...filterData } = params;

  // Search condition
  const searchCondition =
    keyword && inquiriesSearchableFields.length > 0
      ? {
          $or: inquiriesSearchableFields.map((field) => ({
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

  const data = await QuotationRequest.find(whereConditions)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const total = await QuotationRequest.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

export const inquiriesService = {
  createContactMessage,
  createQuotationRequest,
  allContactMessage,
  allQuotationRequest,
};
