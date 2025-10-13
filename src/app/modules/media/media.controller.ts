import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MediaServices } from "./media.service";

const listImages = catchAsync(async (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;

  const result = await MediaServices.listImages(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Images listed successfully (latest first)",
    data: result,
  });
});

const deleteImage = catchAsync(async (req, res) => {
  const fileName = req.params.name;
  await MediaServices.deleteImage(fileName);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Image deleted successfully",
  });
});

const uploadImage = catchAsync(async (req, res) => {
  if (!req.file) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "No file uploaded",
    });
  }

  const data = await MediaServices.uploadImage(req.file, req.body.customName);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Image uploaded successfully",
    data,
  });
});

const renameImage = catchAsync(async (req, res) => {
  const { oldName, newName } = req.body;

  await MediaServices.renameImage(oldName, newName);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "File renamed successfully",
  });
});

export const MediaControllers = {
  listImages,
  deleteImage,
  uploadImage,
  renameImage,
};
