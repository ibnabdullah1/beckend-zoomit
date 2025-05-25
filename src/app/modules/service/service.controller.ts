import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { serviceFilterableFields } from "./service.constant";
import { ServiceServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const service = req.body;

  const result = await ServiceServices.createService(service);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service page created successfully",
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

const getSingleService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getSingleService(req.params.slug);
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

export const ServiceControllers = {
  createService,
  getAllService,
  getSingleService,
  updateSingleService,
};
