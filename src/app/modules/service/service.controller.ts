import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { serviceFilterableFields } from "./service.constant";
import { ServiceServices } from "./service.service";

const updateSlug = catchAsync(async (req, res) => {
  const service = req.body;
  const slug = req.params.slug;
  const result = await ServiceServices.updateSlug(service, slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service slug updated successfully",
    data: result,
  });
});
const createSlug = catchAsync(async (req, res) => {
  const service = req.body;
  const result = await ServiceServices.createSlug(service);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service slug created successfully",
    data: result,
  });
});

const getAllService = catchAsync(async (req, res) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ServiceServices.getAllService(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service pages retrieved successfully",
    data: result,
  });
});

const getAllServicesForCards = catchAsync(async (req, res) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ServiceServices.getAllServicesForCards(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service pages retrieved successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getSingleService(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service page retrieved successfully",
    data: result,
  });
});
const getWebViewSingleService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getWebViewSingleService(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service page retrieved successfully",
    data: result,
  });
});

const updateSingleService = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const result = await ServiceServices.updateSingleService(slug, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service page updated successfully",
    data: result,
  });
});
const updateServiceSerial = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const result = await ServiceServices.updateServiceSerial(slug, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service page serial no. updated successfully",
    data: result,
  });
});
const deleteService = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const result = await ServiceServices.deleteService(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service page deleted successfully",
    data: result,
  });
});

export const ServiceControllers = {
  updateSlug,
  createSlug,
  getAllService,
  getSingleService,
  updateSingleService,
  deleteService,
  getAllServicesForCards,
  updateServiceSerial,
  getWebViewSingleService,
};
