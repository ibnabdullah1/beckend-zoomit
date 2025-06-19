import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { projectFilterableFields } from "./project.constant";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProject(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project page created successfully",
    data: result,
  });
});

const getAllProject = catchAsync(async (req, res) => {
  const filters = pick(req.query, projectFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ProjectServices.getAllProjects(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project pages retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectServices.updateProject(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ProjectServices.getSingleProject(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});
const deleteProject = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ProjectServices.deleteProject(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project page deleted successfully",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProject,
  updateProject,
  deleteProject,
  getSingleProject,
};
